import {getGalleryImages, getLogoImage, getThumbImages} from "./gallery.ts";
import nomcaarrd from "../assets/icons/nomcaarrd.webp";

/**
 * Content for /case-studies, the client-facing page.
 *
 * Everything here is taken from facts already stated elsewhere on the site.
 * Fields marked OPTIONAL stay hidden until you fill them in with real data:
 *   - CaseStudy.metrics: measured results ("4s to 0.8s load", "10k transactions a month")
 *   - testimonials: real quotes, with the person's permission
 */

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  /** Matches the gallery folder and the entry id in projects / buzzerboy-projects. */
  id: string;
  name: string;
  title: string;
  client: string;
  link: string;
  /** Overrides the default "Visit example.com" link text. */
  linkLabel?: string;
  role: string;
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  /** Demo video, source code and similar. Shown next to the main link. */
  extraLinks?: {label: string; href: string}[];
  /** Shown as a top result on the landing page. */
  featured?: boolean;
  /** OPTIONAL: real, measured numbers. Rendered above the outcome when present. */
  metrics?: CaseStudyMetric[];
  logo?: string;
  images: string[];
  /** 640px twins of `images`, same order, for thumbnail strips. */
  thumbs: string[];
}

const study = (s: Omit<CaseStudy, 'logo' | 'images' | 'thumbs'> & {logo?: string}): CaseStudy => ({
  ...s,
  logo: s.logo ?? getLogoImage(s.id),
  images: getGalleryImages(s.id),
  thumbs: getThumbImages(s.id),
});

export const caseStudies: CaseStudy[] = [
  study({
    id: 'profit-desk',
    name: 'Profit Desk',
    title: 'An AI that watches a store\'s profit and says what to fix next',
    client: 'Self-initiated product',
    link: 'https://profit-desk.netlify.app/',
    role: 'Sole developer, AI automation and full-stack',
    problem: 'Online store owners see revenue, not profit. Ad spend, refunds, fees and product costs sit in different tools, so a campaign can look healthy while it loses money.',
    built: 'A Django REST API that pulls live Shopify data, calculates true profit after every cost, and runs a monitor that detects problems and opportunities and tracks them from detected to approved to fixed. The AI layer falls back from Groq to Gemini and only explains numbers the engine calculated. The Next.js frontend has a command center, an AI note under every chart, an advertising report with Excel export, and a chat.',
    outcome: 'A working product with a public read-only demo. The AI never does the maths, so it cannot invent a figure.',
    stack: ['Next.js', 'TypeScript', 'Django REST', 'Groq', 'Gemini', 'Shopify GraphQL'],
    featured: true,
    extraLinks: [
      {label: 'Watch the walkthrough', href: 'https://www.loom.com/share/aa3cc08bb046461bb8343c96248b106f'},
      {label: 'Frontend code', href: 'https://github.com/ajaxarrow/ai-profit-dashboard-frontend'},
      {label: 'Backend code', href: 'https://github.com/ajaxarrow/ai-profit-dashboard-backend'},
    ],
  }),
  study({
    id: 'saferoute',
    name: 'SafeRoute',
    title: 'Truck routes ranked by the weather the truck will actually meet',
    client: 'Self-initiated product',
    link: 'https://www.loom.com/share/9fb0d2e11e37433daaa7e9ac41e4be0f',
    linkLabel: 'Watch the walkthrough',
    role: 'Sole developer, full-stack',
    problem: 'The fastest truck route is not always the safe one. Wind, rain and snow change hour by hour, and how much wind is too much depends on the weight of the load.',
    built: 'A Django REST API that finds up to three truck routes, forecasts the weather at the hour the truck reaches each checkpoint, scores the risk with fixed thresholds and load-weight rules, and ranks routes by miles at each risk level before travel time. The React frontend draws the routes on a MapLibre map with a 0 to 48 hour weather slider, in separate desktop, tablet and phone layouts.',
    outcome: 'A working product that recommends one route and shows which criterion decided it. Tests cover the risk boundaries, the ranking and the API.',
    stack: ['React', 'TypeScript', 'MapLibre', 'Django REST', 'OpenRouteService', 'Open-Meteo'],
    featured: true,
    extraLinks: [
      {label: 'Frontend code', href: 'https://github.com/ajaxarrow/saferoute-frontend'},
      {label: 'Backend code', href: 'https://github.com/ajaxarrow/saferoute-backend'},
    ],
  }),
  study({
    id: 'straightline',
    featured: true,
    name: 'StraightLine',
    title: 'One guided path from SaaS to AWS Marketplace',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://www.usestraightline.com/welcome/',
    role: 'Lead full-stack Django developer',
    problem: 'Listing a SaaS product on AWS Marketplace means AWS Partner status, a Foundational Technical Review and the listing itself. Each has its own checklist, and teams lose track between them.',
    built: 'I owned the Django backend architecture, designed the relational models and REST APIs, and built the workflow behind every step of the path.',
    outcome: 'In production. A SaaS team follows one flow from AWS Partner status to FTR readiness to a live listing.',
    stack: ['Django', 'REST API', 'PostgreSQL', 'AWS'],
  }),
  study({
    id: 'goironfort',
    name: 'IronFort',
    title: 'Compliance that runs all year, without the spreadsheets',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://www.goironfort.com/',
    role: 'Core full-stack Django developer and data engineer',
    problem: 'Canadian government, healthcare and SaaS teams were tracking compliance in manual spreadsheets and finding the gaps once a year, at audit time.',
    built: 'Django backend modules, plus the data workflows that feed compliance monitoring and reporting.',
    outcome: 'In production. Compliance is checked continuously and reported automatically instead of being rebuilt by hand for each audit.',
    stack: ['Django', 'Data engineering', 'PostgreSQL'],
  }),
  study({
    id: 'techrepnetwork',
    name: 'TechRepNetwork',
    title: 'A marketplace where sales reps and tech companies close deals',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://www.techrepnetwork.com/',
    role: 'Lead full-stack developer',
    problem: 'High-growth tech companies need sales reach without a full sales team, and independent reps need products worth selling on commission.',
    built: 'I led development of the marketplace architecture, the APIs and the business workflows around deals.',
    outcome: 'In production as a two-sided marketplace: companies on one side, commission-based reps on the other.',
    stack: ['Laravel', 'Vue.js', 'REST API'],
  }),
  study({
    id: 'socbridge',
    name: 'SocBridge',
    title: 'SOC 2 in one platform: policies, training, attestations',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://socbridge.com/',
    role: 'Core full-stack developer',
    problem: 'SOC 2 work is usually scattered across policy documents, employee training records and attestation paperwork.',
    built: 'Django and Laravel backend modules across the platform.',
    outcome: 'In production. Policies, employee training and attestations sit in one end-to-end platform.',
    stack: ['Django', 'Laravel'],
  }),
  study({
    id: 'visage',
    name: 'Visage',
    title: 'Creators and startups, with no agency in between',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://joinvisage.com/',
    role: 'Lead full-stack developer',
    problem: 'Startups want authentic short-form video and creators want paid work, but an agency usually sits between them.',
    built: 'Both the frontend and the backend of the marketplace.',
    outcome: 'Launching soon, with the waitlist open to creators and brands. Creators set their own rate and keep all of it; brands pay a small platform fee on top.',
    stack: ['Full-stack', 'Marketplace'],
  }),
  study({
    id: 'linnks',
    logo: nomcaarrd,
    name: 'LINNKS',
    title: 'A knowledge map for a research consortium, from Figma to production',
    client: 'NOMCAARRD, Northern Mindanao',
    link: 'https://idmdr.netlify.app/',
    role: 'UI designer, frontend developer and API integration',
    problem: 'NOMCAARRD needed its project data mapped by location and shared across affiliate organizations, with each contributor deciding who sees their content.',
    built: 'I designed the interface in Figma, then built it in Vue.js against the REST API.',
    outcome: 'After delivery, NOMCAARRD invited our team back to present the system to its affiliates.',
    stack: ['Vue.js', 'Figma', 'REST API'],
  }),
];

/** Speed facts for the converter card. Each one is already documented on the site. */
export interface SpeedFact {
  id: string;
  label: string;
  amount: string;
  unit: string;
  resultAmount: string;
  result: string;
  note: string;
}

export const speedFacts: SpeedFact[] = [
  {
    id: 'landing',
    label: 'Landing page',
    amount: '2',
    unit: 'hours',
    resultAmount: '1',
    result: 'landing page, designed and shipped',
    note: 'EcoTrail, a timed internship challenge.',
  },
  {
    id: 'screens',
    label: 'App screens',
    amount: '2',
    unit: 'days',
    resultAmount: '1',
    result: 'full set of mobile app screens',
    note: 'KahibawHub, built by reusing components from earlier projects. The app went on to a CyberSciTech 2025 paper.',
  },
  {
    id: 'promotion',
    label: 'Promotion',
    amount: '13',
    unit: 'months',
    resultAmount: '1',
    result: 'promotion, part-time to full-time Product Engineer',
    note: 'Buzzerboy Inc, July 2024 to August 2025.',
  },
];

export const trackRecord: {label: string; value: string}[] = [
  {label: 'Remote work', value: 'July 2024 to November 2026, with a team in Ontario, Canada'},
  {label: 'Ownership', value: 'Led three production SaaS products and was core developer on two more'},
  {label: 'Promotion', value: 'Promoted from part-time to full-time within 13 months'},
  {label: 'Repeat invitation', value: 'NOMCAARRD asked our team back to present LINNKS to its affiliates'},
  {label: 'Time zone', value: 'Bukidnon, Philippines (UTC+8), with flexible overlap'},
];

/** OPTIONAL: add real quotes here and the Reviews block appears on the page. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [];

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Case study ids (or a site path) that back the claim. */
  proof: {label: string; to: string}[];
}

export const services: Service[] = [
  {
    id: 'ai-automation',
    title: 'AI automation',
    description: 'Monitors that watch your data, flag what needs attention and recommend the next step, with an AI layer that explains numbers your system calculated instead of making them up.',
    proof: [{label: 'Profit Desk', to: '#profit-desk'}],
  },
  {
    id: 'software-development',
    title: 'Software development: SaaS backends and APIs',
    description: 'Django or Laravel, relational data models in PostgreSQL, REST APIs and deployment to AWS. The same work I did on StraightLine and IronFort.',
    proof: [
      {label: 'StraightLine', to: '#straightline'},
      {label: 'IronFort', to: '#goironfort'},
      {label: 'SafeRoute', to: '#saferoute'},
    ],
  },
  {
    id: 'web-development',
    title: 'Web development: from Figma to production',
    description: 'I design the interface, then build it in Vue.js or React against your API, so nothing is lost between design and code.',
    proof: [
      {label: 'LINNKS', to: '#linnks'},
      {label: 'UI designs', to: '/designs'},
    ],
  },
  {
    id: 'marketplace',
    title: 'Two-sided marketplaces',
    description: 'Accounts for both sides, the deal or booking workflow between them, and the APIs underneath.',
    proof: [
      {label: 'TechRepNetwork', to: '#techrepnetwork'},
      {label: 'Visage', to: '#visage'},
    ],
  },
  {
    id: 'mobile',
    title: 'Cross-platform mobile apps',
    description: 'Flutter apps for Android and iOS from one codebase, including a consultation app built from scratch.',
    proof: [{label: 'Experience', to: '/about'}],
  },
];
