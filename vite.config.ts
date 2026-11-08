import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://jiuaxl.netlify.app').replace(/\/$/, '')

  // Article pages are data-driven (src/data/articles.ts); read their ids so each is prerendered.
  const articleIds = [...readFileSync('src/data/articles.ts', 'utf8').matchAll(/^ {2}"([a-z0-9-]+)": \{/gm)].map((m) => m[1])

  return {
    plugins: [vue(), vuetify({ autoImport: true })],
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
          ['/projects', '0.8', 'monthly'],
          ['/all', '0.7', 'monthly'],
          ['/designs', '0.6', 'monthly'],
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
