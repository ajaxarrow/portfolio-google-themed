import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import LandingView from "../views/LandingView.vue";
// @ts-ignore
import AboutView from "../views/AboutView.vue";
// @ts-ignore
import AllView from "../views/AllView.vue";
// @ts-ignore
import ProjectsView from "../views/ProjectsView.vue";
// @ts-ignore
import DesignsView from "../views/DesignsView.vue";
// @ts-ignore
import SocialsView from "../views/SocialsView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/all',
      name: 'all',
      component: AllView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/designs',
      name: 'designs',
      component: DesignsView
    },
    {
      path: '/socials',
      name: 'socials',
      component: SocialsView
    }
  ]
})

export default router