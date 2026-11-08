# jiuaxl. — portfolio of Jiu Axl R. Tabilla

A portfolio built as a search results page: a working search box, result rows for projects, designs and awards, a "People Also Ask" FAQ and a Knowledge Panel with the facts a recruiter needs (role, location, availability, résumé, contact). An original pastiche, not a copy of any real product.

Live: https://ajaxarrow.netlify.app

## Stack

Vue 3, TypeScript, Vite, Vuetify (auto-imported, tree-shaken), @vueuse/motion, Phosphor icons. Fonts (Satoshi, Literata) are self-hosted. Deployed on Netlify; `public/_redirects` handles SPA deep links.

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
