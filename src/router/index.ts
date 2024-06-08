import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import LandingView from "../views/LandingView.vue";
// @ts-ignore
import AboutView from "../views/AboutView.vue";


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
    }
  ]
})

export default router