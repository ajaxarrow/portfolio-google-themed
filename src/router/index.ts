import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import LandingView from "../views/LandingView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    }
  ]
})

export default router