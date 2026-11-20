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
  /** "What I built", in plain words: the solution and what it does for its users. */
  built: string;
  /** The same work for technical readers: architecture, stack and how it was built. */
  technical: string;
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
    built: 'A profit dashboard that pulls a store\'s numbers from its connected tools into one place and shows what the store really keeps after every cost. An AI agent keeps track of everything: it flags what is losing money and what could earn more, follows each issue until it is fixed, and explains every number in plain words, so the owner always knows what to do next.',
    technical: 'A Django REST API pulls live Shopify data, calculates true profit after every cost, and runs a monitor that tracks each finding from detected to approved to fixed. The AI layer falls back from Groq to Gemini and only explains numbers the engine calculated. The Next.js and TypeScript frontend has a command center, an AI note under every chart, an advertising report with Excel export, and a chat.',
    outcome: 'A working product with a public read-only demo. The AI never does the maths, so it cannot invent a figure.',
    stack: ['Next.js', 'TypeScript', 'Django REST', 'Groq', 'Gemini', 'Shopify'],
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
    built: 'A route planner for truck dispatchers. It compares up to three routes, checks the weather each one will meet at the hour the truck gets there, and recommends the safest one, with the reason shown. A time slider shows how conditions change over the next two days, on desktop, tablet and phone.',
    technical: 'A Django REST API gets routes from OpenRouteService, forecasts the weather at each checkpoint from Open-Meteo, scores the risk with fixed thresholds and load-weight rules, and ranks routes by miles at each risk level before travel time. The React and TypeScript frontend draws the routes on a MapLibre map with a 0 to 48 hour slider, in separate desktop, tablet and phone layouts. Tests cover the risk boundaries, the ranking and the API.',
    outcome: 'A working product that recommends one route and shows which criterion decided it.',
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
    built: 'I built the first version of the platform and its main features: one guided path that takes a SaaS team from AWS Partner status, through the Foundational Technical Review, to a live Marketplace listing, with every checklist and step tracked in one place.',
    technical: 'A server-rendered Django application, with no separate REST API. I designed the relational data models in PostgreSQL and built the views, forms and workflow logic behind every step of the path, deployed on AWS.',
    outcome: 'In production. A SaaS team follows one flow from AWS Partner status to FTR readiness to a live listing.',
    stack: ['Django', 'PostgreSQL', 'AWS'],
  }),
  study({
    id: 'goironfort',
    name: 'IronFort',
    title: 'Compliance that runs all year, without the spreadsheets',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://www.goironfort.com/',
    role: 'UI designer, QA, full-stack developer and data engineer',
    problem: 'Canadian government, healthcare and SaaS teams were tracking compliance in manual spreadsheets and finding the gaps once a year, at audit time.',
    built: 'I designed the interface, built features across the whole platform, tested releases before they shipped, and set up the data flows that keep compliance checked and reported automatically, so teams see their gaps all year instead of at audit time.',
    technical: 'UI design for the platform screens, full-stack development of Django modules and their frontend, QA testing of each release, and data engineering work on the pipelines that feed compliance monitoring and reporting.',
    outcome: 'In production. Compliance is checked continuously and reported automatically instead of being rebuilt by hand for each audit.',
    stack: ['Django', 'PostgreSQL', 'UI design', 'QA', 'Data engineering'],
  }),
  study({
    id: 'techrepnetwork',
    name: 'TechRepNetwork',
    title: 'A marketplace where sales reps and tech companies close deals',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://www.techrepnetwork.com/',
    role: 'Lead developer',
    problem: 'High-growth tech companies need sales reach without a full sales team, and independent reps need products worth selling on commission.',
    built: 'I led and spearheaded development of the platform that connects salespeople with tech companies that need sales reach.',
    technical: 'A Laravel backend with a React frontend. I set the marketplace architecture and built the APIs and the deal workflows between companies and reps.',
    outcome: 'In production as a two-sided marketplace: companies on one side, commission-based reps on the other.',
    stack: ['Laravel', 'React', 'REST API'],
  }),
  study({
    id: 'socbridge',
    name: 'SocBridge',
    title: 'SOC 2 done for you, starting with a free cloud scan',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://socbridge.com/',
    role: 'Frontend developer, website',
    problem: 'Getting SOC 2 ready is a lot of work for a small team: policies, training, attestations and cloud settings an auditor will check. Most teams don\'t know where they stand before they start.',
    built: 'I worked on the frontend of the SocBridge website, the pages that explain the done-for-you SOC 2 service and lead companies to book a call or run a free cloud scan of their AWS or GCP setup.',
    technical: 'A PHP website. I built and styled frontend pages and components, responsive from phone to desktop.',
    outcome: 'Live. A company can run a free scan to see its gaps, then hand the rest of the SOC 2 work to the SocBridge team.',
    stack: ['PHP', 'HTML', 'CSS'],
  }),
  study({
    id: 'visage',
    name: 'Visage',
    title: 'Creators and startups, with no agency in between',
    client: 'Buzzerboy Inc, Ontario, Canada',
    link: 'https://joinvisage.com/',
    role: 'Lead full-stack developer, web and mobile',
    problem: 'Startups want authentic short-form video and creators want paid work, but an agency usually sits between them.',
    built: 'A marketplace, on the web and on mobile, where startups find creators and work with them directly. Creators set their own rate and keep all of it; brands pay a small platform fee on top.',
    technical: 'A Laravel backend and a React frontend. I built both, for the web app and the mobile app.',
    outcome: 'Launching soon, with the waitlist open to creators and brands.',
    stack: ['React', 'Laravel', 'Web', 'Mobile'],
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
    built: 'A knowledge map that places the consortium\'s projects by location and shares them across affiliate organizations, with each contributor deciding who can see their content.',
    technical: 'I designed the interface in Figma, then built it in Vue.js against the REST API.',
    outcome: 'After delivery, NOMCAARRD invited our team back to present the system to its affiliates.',
    stack: ['Vue.js', 'Figma', 'REST API'],
  }),
  study({
    id: 'sellyoshirt',
    name: 'SellYoShirt',
    title: 'Inventory and sales tracking for thrift resellers',
    client: 'Self-initiated product',
    link: 'https://sellyoshit.netlify.app/',
    role: 'Sole developer, design to release',
    problem: 'Thrift resellers buy one-off pieces and sell them across Facebook pages and Carousell, so stock, capital and profit end up spread over notebooks and chat threads.',
    built: 'An inventory and sales tracking app for thrift resellers. They log each piece with photos, mark it sold with the channel and customer, and see how much capital they have recovered, what is still tied up in stock and what they actually made, with milestones and sale streaks to keep them going.',
    technical: 'The mobile app is built in Flutter: inventory, sales, analytics, finance and settings, with backup and restore and Excel and PDF export. The website and the step-by-step user docs are built in Next.js.',
    outcome: 'A working app with a public website and docs that walk through every feature.',
    stack: ['Flutter', 'Next.js'],
  }),
];

/** Speed facts, shown as stat cards on the case studies page. Each one is already documented on the site. */
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
];

export const trackRecord: {label: string; value: string}[] = [
  {label: 'Remote work', value: 'July 2024 to November 2026, with a team in Ontario, Canada'},
  {label: 'Ownership', value: 'Led three production SaaS products and was core developer on two more'},
  {label: 'Promotion', value: 'Promoted from part-time to full-time within 13 months'},
  {label: 'Repeat invitation', value: 'NOMCAARRD asked our team back to present LINNKS to its affiliates'},
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
    description: 'Django or Laravel applications, relational data models in PostgreSQL, REST APIs where they are needed, and deployment to AWS. The same work I did on StraightLine and IronFort.',
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
