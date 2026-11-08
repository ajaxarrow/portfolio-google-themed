import {SearchItem} from "../interfaces/link.interface.ts";
import nomcaarrd from "../assets/icons/nomcaarrd.png";
import idmdr from "../assets/images/idmdr.png"
import virtualclass from "../assets/icons/virtualclass.png"
import portfolio from "../assets/images/portfolio.png"
import mk from "../assets/images/mk.png"
import portfolioIcon from "../assets/logo.jpg"
import {getGalleryImages} from "./gallery.ts"

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
    stack: ['Backend', 'Data engineering'],
    tags: ['education', 'database', 'sql', 'ui/ux'],
    icon: virtualclass,
    image: mk
  },
  {
    name: 'SellYoShirt',
    title: 'SellYoShirt: inventory and sales tracker',
    link: 'https://sellyoshit.netlify.app/',
    id: 'sellyoshirt',
    description: 'A mobile inventory and sales tracker for new garment resellers. A personal product, built end to end.',
    role: 'Sole developer',
    stack: ['Mobile'],
    tags: ['inventory', 'solo', 'product'],
    icon: portfolioIcon,
    image: getGalleryImages('sellyoshirt')[0],
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
