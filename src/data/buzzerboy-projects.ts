import {SearchItem} from "../interfaces/link.interface.ts";
import {getGalleryImages, getLogoImage} from "./gallery.ts";

/**
 * Each gallery/<id>/ folder holds real (landscape) screenshots plus a `<id>-logo.*`
 * brand mark. The first screenshot works as the result-row thumbnail; the logo works
 * as the small icon next to the title. The logo itself is excluded from getGalleryImages
 * so it never shows up in the Images tab's photo grid.
 */
function thumbnail(id: string): string | undefined {
  return getGalleryImages(id)[0];
}

function badge(id: string): string | undefined {
  return getLogoImage(id);
}

export const buzzerboyProjects: SearchItem[] = [
  {
    name: 'StraightLine',
    title: 'StraightLine: from SaaS to AWS Marketplace',
    link: 'https://www.usestraightline.com/welcome/',
    id: 'straightline',
    description: 'Takes a SaaS company from AWS Partner status through Foundational Technical Review (FTR) readiness to a live AWS Marketplace listing. I owned the Django backend architecture, designed the relational models and REST APIs, and built the workflow behind each step.',
    role: 'Lead full-stack Django developer',
    stack: ['Django', 'REST API', 'AWS'],
    tags: ['python', 'backend', 'saas', 'marketplace', 'ftr', 'architecture'],
    icon: badge('straightline'),
    image: thumbnail('straightline'),
    visible: true,
    featured: true,
  },
  {
    name: 'Iron Fort',
    title: 'IronFort: continuous compliance, no spreadsheets',
    link: 'https://www.goironfort.com/',
    id: 'goironfort',
    description: 'Replaces manual compliance spreadsheets and annual audits with continuous, automated compliance for Canadian government, healthcare and SaaS teams. I built Django backend modules and the data workflows behind compliance monitoring and reporting.',
    role: 'Core full-stack Django developer and data engineer',
    stack: ['Django', 'Data engineering', 'PostgreSQL'],
    tags: ['python', 'backend', 'compliance', 'automation', 'sql', 'saas', 'database design', 'rest api'],
    icon: badge('goironfort'),
    image: thumbnail('goironfort'),
    visible: true,
    featured: true,
  },
  {
    name: 'SocBridge',
    title: 'SocBridge: SOC 2, done for you',
    link: 'https://socbridge.com/',
    id: 'socbridge',
    description: 'An end-to-end SOC 2 platform covering policies, employee training and attestations. I built Django and Laravel backend modules for it.',
    role: 'Core full-stack developer',
    stack: ['Django', 'Laravel'],
    tags: ['python', 'php', 'backend', 'compliance', 'soc 2', 'saas'],
    icon: badge('socbridge'),
    image: thumbnail('socbridge'),
    visible: true,
  },
  {
    name: 'TechRepNetwork',
    title: 'TechRepNetwork: a marketplace for sales reps',
    link: 'https://www.techrepnetwork.com/',
    id: 'techrepnetwork',
    description: 'Connects independent sales reps with high-growth tech companies on commission. I led development of the marketplace architecture, APIs and the business workflows around deals.',
    role: 'Lead full-stack developer',
    stack: ['Laravel', 'Vue.js', 'REST API'],
    tags: ['php', 'marketplace', 'two-sided', 'backend', 'frontend', 'saas'],
    icon: badge('techrepnetwork'),
    image: thumbnail('techrepnetwork'),
    visible: true,
  },
  {
    name: 'Visage',
    title: 'Visage: creators meet startups',
    link: 'https://joinvisage.com/',
    id: 'visage',
    description: 'A marketplace that connects creators with startups needing authentic short-form video, without the agency in between. I built both the frontend and the backend.',
    role: 'Lead full-stack developer',
    stack: ['Full-stack', 'Marketplace'],
    tags: ['marketplace', 'two-sided', 'backend', 'frontend', 'saas', 'video'],
    icon: badge('visage'),
    image: thumbnail('visage'),
    visible: true,
  },
];
