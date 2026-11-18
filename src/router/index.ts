import type {RouteRecordRaw} from 'vue-router'
import LandingView from "../views/LandingView.vue";
import MainLayout from "../layouts/MainLayout.vue";

export const routes: RouteRecordRaw[] = [

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
          meta: {side: 'profile', title: 'About Jiu Axl Tabilla | Software Engineer, Skills, Experience & Education', description: 'About Jiu Axl R. Tabilla: full-stack software engineer in Bukidnon, Philippines. 2+ years building SaaS with Python, Django, Laravel and Vue.js. Magna Cum Laude BSIT, DIGIMC 2025 champion. Available for remote work.'}
        },
        {
          path: 'all',
          name: 'all',
          component: () => import("../views/AllView.vue"),
          meta: {h1: 'Everything by Jiu Axl Tabilla', side: 'hire', title: 'Everything by Jiu Axl Tabilla | Projects, Experience, Awards & UI Designs', description: 'Search all of Jiu Axl Tabilla\'s work: production SaaS projects, web and mobile apps, UI/UX designs, hackathon wins, research and talks.'}
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import("../views/ProjectsView.vue"),
          meta: {side: 'hire', h1: 'Projects by Jiu Axl Tabilla', title: 'Projects | Jiu Axl Tabilla, Full-Stack Developer Portfolio', description: 'Software projects by Jiu Axl Tabilla: Django and Laravel SaaS platforms, Vue.js web apps, REST APIs, AWS Marketplace tooling and Flutter mobile apps.'}
        },
        {
          path: 'case-studies',
          name: 'case-studies',
          component: () => import("../views/CaseStudiesView.vue"),
          meta: {fullWidth: true, title: 'Case Studies | Hire Jiu Axl Tabilla, Full-Stack Developer for SaaS', description: 'Case studies from Jiu Axl Tabilla: production SaaS, compliance platforms and two-sided marketplaces. The problem, what was built, the outcome, and how to start a project.'}
        },
        {
          path: 'designs',
          name: 'designs',
          component: () => import("../views/DesignsView.vue"),
          meta: {side: 'hire', h1: 'UI/UX designs by Jiu Axl Tabilla', title: 'UI/UX Designs | Jiu Axl Tabilla', description: 'UI/UX design work by Jiu Axl Tabilla: Figma prototypes and interfaces for web and mobile products.'}
        },
        {
          path: 'socials',
          name: 'socials',
          component: () => import("../views/SocialsView.vue"),
          meta: {side: 'hire', h1: 'Jiu Axl Tabilla on LinkedIn, GitHub and more', title: 'Socials | Jiu Axl Tabilla on LinkedIn and GitHub', description: 'Find Jiu Axl Tabilla on LinkedIn and GitHub, download the résumé, or go to the contact form.'}
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import("../views/ContactView.vue"),
          meta: {fullWidth: true, title: 'Contact | Start a Project with Jiu Axl Tabilla', description: 'Contact Jiu Axl Tabilla about AI automation, software development and web development projects. Send a message with the contact form or by email.'}
        },
        {
          path: 'images',
          name: 'images',
          component: () => import("../views/ImagesView.vue"),
          meta: {h1: 'Photos of Jiu Axl Tabilla', fullWidth: true, title: 'Photos | Jiu Axl Tabilla', description: 'Photos from events, hackathons, talks and trips by Jiu Axl Tabilla.'}
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
          component: () => import("../views/NotFoundView.vue"),
          meta: {side: 'hire', h1: 'Page not found', noindex: true, title: 'Page not found | Jiu Axl Tabilla', description: 'This page does not exist. Head back to the portfolio of Jiu Axl Tabilla, full-stack software engineer.'}
        },
      ]
    },
]
