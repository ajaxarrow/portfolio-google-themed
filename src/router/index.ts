import {createRouter, createWebHistory} from 'vue-router'
import LandingView from "../views/LandingView.vue";
import MainLayout from "../layouts/MainLayout.vue";
import {findEntryById} from "../utils/entries.ts";

const routeTitles: Record<string, string> = {
  home: 'jiuaxl.',
  about: 'about - jiuaxl.',
  all: 'all - jiuaxl.',
  projects: 'projects - jiuaxl.',
  designs: 'designs - jiuaxl.',
  socials: 'socials - jiuaxl.',
  images: 'images - jiuaxl.',
  error404: 'not found - jiuaxl.',
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return {el: to.hash, top: 16};
    // Same-path navigations (e.g. the Images lightbox syncing ?item= via router.replace)
    // shouldn't yank scroll position; genuine page changes should land at the top.
    if (to.path === from.path) return false;
    return {top: 0};
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'about',
          name: 'about',
          component: () => import("../views/AboutView.vue"),
          meta: {side: 'profile'}
        },
        {
          path: 'all',
          name: 'all',
          component: () => import("../views/AllView.vue"),
          meta: {side: 'aboutPortfolio'}
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import("../views/ProjectsView.vue")
        },
        {
          path: 'designs',
          name: 'designs',
          component: () => import("../views/DesignsView.vue")
        },
        {
          path: 'socials',
          name: 'socials',
          component: () => import("../views/SocialsView.vue")
        },
        {
          path: 'images',
          name: 'images',
          component: () => import("../views/ImagesView.vue"),
          meta: {fullWidth: true}
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import("../views/ArticleView.vue"),
          meta: {side: 'article'}
        },
        {
          path: ':pathMatch(.*)*',
          name: 'error404',
          component: () => import("../views/NotFoundView.vue")
        },
      ]
    },
  ]
})

router.afterEach((to) => {
  if (to.name === 'article') {
    const entry = findEntryById(to.params.id as string);
    document.title = entry ? `${entry.title} - jiuaxl.` : 'article - jiuaxl.';
    return;
  }
  document.title = routeTitles[to.name as string] ?? 'jiuaxl.';
});

export default router
