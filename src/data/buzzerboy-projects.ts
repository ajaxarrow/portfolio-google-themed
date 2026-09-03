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
    name: 'Artichoke',
    title: 'HIPAA Training Built Around Your Practice',
    link: 'https://artichokellc.com/',
    id: 'artichoke',
    description: 'Artichoke replaces generic annual HIPAA videos with compliance training built directly from a practice\'s own risk assessments, policies, and workflows, so staff actually retain and apply what they learn.',
    icon: badge('artichoke'),
    image: thumbnail('artichoke'),
    visible: true,
  },
  {
    name: 'BroadConduit',
    title: 'BroadConduit',
    link: 'https://broadconduit.com/',
    id: 'broadconduit',
    description: 'BroadConduit connects edge IoT sensors to machine learning models that detect water main leaks, pressure anomalies, and grid faults, giving municipalities advance warning instead of forcing emergency response.',
    icon: badge('broadconduit'),
    image: thumbnail('broadconduit'),
    visible: true,
  },
  {
    name: 'TechRepNetwork',
    title: 'TechRepNetwork',
    link: 'https://techrepnetwork.com/',
    id: 'techrepnetwork',
    description: 'TechRepNetwork connects independent sales talent with high-growth tech companies through commission-based remote roles, letting reps represent multiple brands and earn on every deal they close.',
    icon: badge('techrepnetwork'),
    image: thumbnail('techrepnetwork'),
    visible: true,
  },
  {
    name: 'StraightLine',
    title: 'Turn Your SaaS Into an AWS Marketplace Revenue Engine',
    link: 'https://www.usestraightline.com/welcome/',
    id: 'straightline',
    description: 'StraightLine helps SaaS companies become AWS Partners and launch on AWS Marketplace, handling FTR readiness, funding-program access, and go-to-market so they can turn a Marketplace listing into real enterprise revenue.',
    icon: badge('straightline'),
    image: thumbnail('straightline'),
    visible: true,
  },
  {
    name: 'SocBridge',
    title: 'Your SOC 2, Completely Done For You',
    link: 'https://socbridge.com/',
    id: 'socbridge',
    description: 'SocBridge manages the entire SOC 2 process end to end, platform, policies, employee training, and attestations, backed by CISSP-certified specialists and cloud-certified architects, so a company gets its report in 4 to 6 months without figuring out compliance alone.',
    icon: badge('socbridge'),
    image: thumbnail('socbridge'),
    visible: true,
  },
  {
    name: 'Visage',
    title: 'Visage',
    link: 'https://joinvisage.com/',
    id: 'visage',
    description: 'Visage connects everyday people who are comfortable on camera directly with tech startups that need authentic short-form video content, cutting out the agency middleman.',
    icon: badge('visage'),
    image: thumbnail('visage'),
    visible: true,
  },
  {
    name: 'Iron Fort',
    title: 'Iron Fort',
    link: 'https://www.goironfort.com/',
    id: 'goironfort',
    description: 'Iron Fort replaces manual compliance spreadsheets and expensive annual consultant reviews with a continuous, automated compliance platform built for Canadian government, healthcare, and SaaS teams.',
    icon: badge('goironfort'),
    image: thumbnail('goironfort'),
    visible: true,
  },
  {
    name: 'GTMBridge',
    title: 'We Install a Working GTM System for Technical Founders',
    link: 'https://gtmbridge.co/',
    id: 'gtmbridge',
    description: 'GTMBridge installs a complete go-to-market system for technical founders, CRM, outbound, booking flows, lead routing, positioning, and analytics, fully set up within 30 days.',
    icon: badge('gtmbridge'),
    image: thumbnail('gtmbridge'),
    visible: true,
  },
  {
    name: 'FounderBridge',
    title: 'Connecting Founders to the People They Actually Need',
    link: 'https://founderbridge.net/',
    id: 'founderbridge',
    description: 'FounderBridge is a curated network that connects SaaS founders with the customers, partners, investors, and peer support they actually need, cutting through generic networking noise.',
    icon: badge('founderbridge'),
    image: thumbnail('founderbridge'),
    visible: true,
  },
  {
    name: 'Klaai',
    title: 'Bookkeeping Your AI Runs, Books You Can Trust',
    link: 'https://klaai.co/',
    id: 'klaai',
    description: 'Klaai brings proper double-entry bookkeeping to AI-run businesses, recording invoices, receipts, and payments for review and approval so every entry balances by design.',
    icon: badge('klaai'),
    image: thumbnail('klaai'),
    visible: true,
  },
];
