# jiuaxl. — portfolio of Jiu Axl R. Tabilla

A portfolio built as a search results page: a working search box, result rows for projects, designs and awards, a "People Also Ask" FAQ and a Knowledge Panel with the facts a recruiter needs (role, location, availability, résumé, contact). An original pastiche, not a copy of any real product.

Live: https://jiuaxl.netlify.app

## Stack

Vue 3, TypeScript, Vite, Vuetify (auto-imported, tree-shaken), @vueuse/motion, Phosphor icons. Fonts (Satoshi, Literata) are self-hosted. Deployed on Netlify. `vite-ssg` prerenders every route to static HTML, and unknown paths fall through to the prerendered `404.html` (see `netlify.toml`).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # vue-tsc + vite build
npm run preview
```

## Where content lives

- `src/data/about.ts`, `projects.ts`, `buzzerboy-projects.ts`, `designs.ts`: result rows. `role`, `stack` and `tags` are shown and/or searchable.
- `src/data/questions.ts`: the FAQ answers.
- `src/components/SideProfile.vue`: the Knowledge Panel. Its skills list mirrors the résumé 1:1.
- `public/resume.pdf`: the résumé every "Résumé" link opens. Replace it when the résumé changes, then re-check the data files.

Design intent lives in `PRODUCT.md` and `DESIGN.md`.

## Images

- Drop photos in `src/assets/gallery/<entry-id>/` as WebP, up to ~1600px on the long edge. Logos are named `<id>-logo.webp`.
- Every gallery image also gets a 640px twin at build time (`?thumb`, via `vite-imagetools` in `vite.config.ts`). Use `getThumbImage(id)` / `getThumbImages(id)` from `src/data/gallery.ts` for list rows and strips, and the full image only for hero and lightbox views.
- Anything that loads an image shows a shimmering placeholder first: `SkeletonImage.vue` for component-managed images, the `.img-skeleton` class (in `main.css`) for plain `<img>` and containers.

## SEO

- `npm run build` runs `vite-ssg`: every route is prerendered to static HTML (crawlers see content without JS).
- Per-page title, description, canonical, Open Graph and JSON-LD live in `src/seo/useRouteHead.ts`; route copy is in `src/router/index.ts`; name variants and the site URL in `src/seo/site.ts`.
- `sitemap.xml` and `robots.txt` are generated at build time (`vite.config.ts`).
- New article pages: add the id to `src/data/articles.ts`; it is picked up automatically.
- Custom domain: set `VITE_SITE_URL` (e.g. `https://jiuaxltabilla.com`) in Netlify's build env.
