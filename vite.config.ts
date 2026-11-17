import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { imagetools } from 'vite-imagetools'
import purgeCSS from '@fullhuman/postcss-purgecss'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// Run a PostCSS plugin on Vuetify's own stylesheets only. Our SFC styles carry build-generated
// `[data-v-xxxx]` scope attributes that PurgeCSS cannot match against source, so it would drop
// every `:deep()` rule (e.g. the hidden outline on the search field).
const vuetifyOnly = (plugin: any) => ({
  postcssPlugin: 'purge-vuetify-only',
  OnceExit(root: any, helpers: any) {
    return /node_modules[\\/]vuetify/.test(root.source?.input.file ?? '') ? plugin.OnceExit(root, helpers) : undefined
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://jiuaxl.netlify.app').replace(/\/$/, '')

  // Article pages are data-driven (src/data/articles.ts); read their ids so each is prerendered.
  const articleIds = [...readFileSync('src/data/articles.ts', 'utf8').matchAll(/^ {2}"([a-z0-9-]+)": \{/gm)].map((m) => m[1])

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      // `import x from './photo.webp?thumb'` -> a 640px-wide, q70 WebP for list rows and strips.
      imagetools({
        defaultDirectives: (url) =>
          url.searchParams.has('thumb')
            ? new URLSearchParams({ w: '640', format: 'webp', quality: '70' })
            : new URLSearchParams(),
      }),
    ],
    // Vuetify ships ~300 KB of CSS (reset, grid, every utility class). Strip what the app never uses.
    // Anything Vuetify builds at runtime from props (rounded="lg" -> .rounded-lg, elevation, bg-*) is safelisted.
    css: {
      postcss: {
        plugins: mode === 'production' ? [
          vuetifyOnly(purgeCSS({
            content: ['./index.html', './src/**/*.{vue,ts}'],
            safelist: {
              standard: [/^v-/, /^rounded/, /^elevation/, /^bg-/, /^border/, /^position-/, /^text-(start|center|end|left|right)/, /^justify/, /^align/, /^flex/, /^ga-/, /^fill-/, /^h-/, /^w-/],
              greedy: [/data-v-/, /^v-/],
            },
            variables: false,
            keyframes: false,
            fontFace: false,
          })),
        ] : [],
      },
    },
    ssr: { noExternal: ['vuetify', '@vueuse/motion', '@phosphor-icons/vue'] },
    ssgOptions: {
      script: 'async',
      format: 'directory',
      formatting: 'minify',
      // `/404` is rendered to 404.html, which Netlify serves automatically with a real 404 status.
      includedRoutes: (paths: string[]) => [
        ...paths.filter((p) => !p.includes(':') && !p.includes('*')),
        ...articleIds.map((id) => `/article/${id}`),
        '/404',
      ],
      onFinished() {
        const today = new Date().toISOString().slice(0, 10)
        const pages: Array<[string, string, string]> = [
          ['/', '1.0', 'monthly'],
          ['/about', '0.9', 'monthly'],
          ['/case-studies', '0.9', 'monthly'],
          ['/projects', '0.8', 'monthly'],
          ['/all', '0.7', 'monthly'],
          ['/designs', '0.6', 'monthly'],
          ['/contact', '0.8', 'yearly'],
          ['/socials', '0.5', 'yearly'],
          ['/images', '0.4', 'yearly'],
          ...articleIds.map((id): [string, string, string] => [`/article/${id}`, '0.6', 'yearly']),
        ]
        const urls = pages
          .map(([p, prio, freq]) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`)
          .join('\n')
        writeFileSync(join('dist', 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
        writeFileSync(join('dist', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
      },
    },
  }
})
