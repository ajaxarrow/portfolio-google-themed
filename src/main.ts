import { ViteSSG } from 'vite-ssg'
import './styles/main.css'
import App from './App.vue'
import vuetify from "./plugins/vuetify.ts";
import { routes } from './router'
import { MotionPlugin } from '@vueuse/motion'
import { vReveal } from './directives/reveal'
import { getLenis } from './composables/useSmoothScroll'

// Pre-rendered at build time (vite-ssg): every route ships as real HTML so
// crawlers and link previews see content without running JavaScript.
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return {el: to.hash, top: 16};
      // Same-path navigations (e.g. the Images lightbox syncing ?item= via router.replace)
      // shouldn't yank scroll position; genuine page changes should land at the top.
      if (to.path === from.path) return false;
      // Smooth scrolling runs through Lenis: jump it (not just the window) so no
      // leftover wheel momentum carries onto the new page.
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, {immediate: true, force: true});
        return false;
      }
      return {top: 0};
    },
  },
  ({ app }) => {
    app.use(vuetify);
    app.use(MotionPlugin);
    app.directive('reveal', vReveal);
  },
)
