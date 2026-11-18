import {SearchItem} from "../interfaces/link.interface.ts";
import nomcaarrd from "../assets/icons/nomcaarrd.webp";
import idmdr from "../assets/images/idmdr.webp?thumb"
import virtualclass from "../assets/icons/virtualclass.png"
import portfolio from "../assets/images/portfolio.webp?thumb"
import mk from "../assets/images/mk.webp?thumb"
import portfolioIcon from "../assets/logo.jpg"
import {getLogoImage, getThumbImage} from "./gallery.ts"

export const projects: SearchItem[] = [
  {
    name: 'LINNKS',
    title: 'LINNKS: data mapping and repository platform',
    link: 'https://idmdr.netlify.app/',
    id: 'linnks',
    description: 'Maps and organizes project data across locations. It is also my capstone Knowledge Management System, built for NOMCAARRD, defended at Central Mindanao University and later presented to NOMCAARRD affiliates. I designed the UI in Figma, then built it.',
    role: 'Frontend developer, API integration and UI design',
    stack: ['Vue.js', 'Figma', 'REST API'],
    tags: ['frontend', 'capstone', 'nomcaarrd', 'mapping', 'knowledge management', 'ui/ux', 'javascript'],
    icon: nomcaarrd,
    image: idmdr,
    featured: true,
  },
  {
    name: 'Virtual Class',
    title: 'Virtual Class: an interactive plant lab',
    link: 'https://mkvirtualclass.com/',
    id: 'virtual-class',
    description: "A virtual lab for plant taxonomy, morphology and ecology, paired with the 'Vascular Plants in Mt. Pigngalngalan' workbook.",
    role: 'Backend developer and data engineer; contributed to UI/UX',
    stack: ['Backend development', 'Data engineering', 'SQL'],
    tags: ['education', 'database', 'sql', 'ui/ux'],
    icon: virtualclass,
    image: mk
  },
  {
    name: 'Profit Desk',
    title: 'Profit Desk: an AI profit dashboard for online stores',
    link: 'https://profit-desk.netlify.app/',
    id: 'profit-desk',
    description: 'Connects a Shopify store, calculates true profit after every cost, and runs a monitor that flags loss-making products and ad campaigns and recommends what to fix. The AI only explains numbers the engine calculated, so it cannot invent figures. A personal product, built end to end.',
    role: 'Sole developer',
    stack: ['Next.js', 'TypeScript', 'Django REST', 'Groq', 'Gemini'],
    tags: ['ai', 'ai automation', 'llm', 'shopify', 'e-commerce', 'dashboard', 'analytics', 'python', 'react', 'tailwind', 'solo', 'product'],
    icon: getLogoImage('profit-desk'),
    image: getThumbImage('profit-desk'),
    visible: true,
    featured: true,
  },
  {
    name: 'SafeRoute',
    title: 'SafeRoute: weather-aware truck routing',
    link: 'https://www.loom.com/share/9fb0d2e11e37433daaa7e9ac41e4be0f',
    id: 'saferoute',
    description: 'Compares up to three truck routes, forecasts the weather at the moment the truck reaches each checkpoint, scores the risk by wind, rain, snow and load weight, and recommends a route. A personal product, built end to end.',
    role: 'Sole developer',
    stack: ['React', 'TypeScript', 'MapLibre', 'Django REST'],
    tags: ['routing', 'logistics', 'trucking', 'weather', 'maps', 'python', 'tailwind', 'solo', 'product'],
    icon: getLogoImage('saferoute'),
    image: getThumbImage('saferoute'),
    visible: true,
    featured: true,
  },
  {
    name: 'SellYoShirt',
    title: 'SellYoShirt: inventory and sales tracker',
    link: 'https://sellyoshit.netlify.app/',
    id: 'sellyoshirt',
    description: 'An inventory and sales tracking app for thrift resellers: a Flutter mobile app, with the website and docs in Next.js. A personal product, built end to end.',
    role: 'Sole developer',
    stack: ['Flutter', 'Next.js'],
    tags: ['inventory', 'solo', 'product'],
    icon: portfolioIcon,
    image: getThumbImage('sellyoshirt'),
    visible: true,
  },
  {
    name: 'Portfolio',
    title: 'This site: a Google-style search results page',
    link: '/',
    id: 'portfolio',
    description: 'A portfolio built as a search results page, with a working search box, knowledge panel and People Also Ask. Designed and built by me.',
    role: 'Designer and developer',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Vuetify'],
    tags: ['frontend', 'ui/ux', 'design', 'netlify', 'javascript'],
    icon: portfolioIcon,
    image: portfolio
  },
];
