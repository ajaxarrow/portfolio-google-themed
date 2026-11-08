import { SearchItem } from "../interfaces/link.interface.ts";
import figma from "../assets/icons/figma.png";
import sheesh from "../assets/images/sheesh.webp";
import idmdr from "../assets/images/idmdr.webp";
import payroll from "../assets/images/payroll.webp";
import farmaid from "../assets/images/farmaid.webp";
import kahibawhub from "../assets/images/kahibawhub.webp";
import {getGalleryImages} from "./gallery.ts";

export const designs: SearchItem[] = [
  {
    name: 'Sheesh',
    title: 'Sheesh: shoe cleaning and repair app (UI design)',
    link: 'https://www.figma.com/proto/oijvNCjTjdhCSMdEQjh8lo/Sheesh?page-id=0%3A1&node-id=99-659&p=f&viewport=270%2C571%2C0.16&t=WK08MWBLG0c3XuaV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A245',
    id: 'sheesh-ui',
    // TODO(axl): add booking-flow wireframes + before/after iterations for a process case study.
    description: 'Full mobile UI for a shoe cleaning and repair platform, focused on simple booking flows.',
    icon: figma,
    tags: ['figma','ui/ux','design','prototype','mobile','booking','on-demand service','shoe repair'],
    image: sheesh
  },
  {
    name: 'LINNKS',
    title: 'LINNKS: Figma to production (UI design)',
    link: 'https://www.figma.com/proto/AQpMfql8pUects40XKUVwk/Interactive-Mapping-Repository-Distribution?page-id=0%3A1&node-id=42-205&p=f&viewport=332%2C152%2C0.11&t=yGTbFLXKKUI040od-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=42%3A205',
    id: 'linnks-ui',
    description: 'Interface for a data-mapping and repository platform. I then built it as the frontend developer in Vue.js, taking one product from Figma to production.',
    icon: figma,
    tags: ['figma','ui/ux','design','prototype','web','dashboard','mapping','data repository','vue.js'],
    image: idmdr
  },
  {
    name: 'Payroll System',
    title: 'Payroll System (UI design)',
    link: 'https://www.figma.com/proto/tkH1tMXlgEgVEgFMmtJshK/Payroll-System?page-id=0%3A1&node-id=9-428&p=f&viewport=66%2C218%2C0.06&t=I6CFt4slyn0sfBot-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=62%3A1936',
    id: 'payroll-ui',
    description: 'Payroll-management screens built from reusable design-system components, so every layout stays consistent.',
    icon: figma,
    tags: ['figma','ui/ux','design','prototype','web','design system','components','payroll','admin'],
    image: payroll
  },
  {
    name: 'EcoTrail',
    title: 'EcoTrail: a landing page in two hours',
    link: 'https://www.figma.com/proto/nHn1yBgODYM1itkdLCY6D9/EcoTrail---Tabilla--Jiu-Axl?page-id=0%3A1&node-id=1-3&starting-point-node-id=1%3A3&t=S0g8iVuuJfevvEjr-1',
    id: 'eco-trail',
    description: "A travel landing page designed and shipped in two hours as a timed internship challenge, with a light entrance animation that keeps the focus on the destination photography.",
    icon: figma,
    tags: ['figma','ui/ux','design','prototype','landing page','travel','timed challenge','animation'],
    image: getGalleryImages("eco-trail")[0]
  },
  {
    name: 'FarmAid',
    title: 'FarmAid: Innova Hackathon winning concept',
    link: 'https://www.figma.com/proto/6hNbJt7R8c7rpVkfOPUDtW/FarmAid?page-id=0%3A1&node-id=101-15&starting-point-node-id=1%3A3&t=qF70OSTsJar82VJv-1',
    id: 'farm-aid',
    description: "Mobile app UI that gives farmers access to agricultural resources and experts. The concept won the Innova Hackathon, where I was project manager and UI designer.",
    icon: figma,
    tags: ['figma','ui/ux','design','prototype','mobile','hackathon','agriculture','project manager','award'],
    image: farmaid
  },
  {
    name: 'KahibawHub',
    title: 'KahibawHub: app screens in two days',
    link: 'https://www.figma.com/proto/t9hTcWJMbakz41MFpFgXWP/KahibawHub?page-id=0%3A1&node-id=1-2&starting-point-node-id=3%3A35&t=bZeLmY129PW4UHeF-1',
    id: 'kahibawhub',
    description: "App screens designed in two days by adapting components from earlier projects. The app went on to a CyberSciTech 2025 paper.",
    icon: figma,
    tags: ['figma','ui/ux','design','prototype','mobile','education','blockchain','research','paper'],
    image: kahibawhub
  },
];
