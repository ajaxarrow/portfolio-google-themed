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
    name: 'TechRepNetwork',
    title: 'TechRepNetwork',
    link: 'https://techrepnetwork.com/',
    id: 'techrepnetwork',
    description: 'TechRepNetwork connects independent sales talent with high-growth tech companies through commission-based remote roles, letting reps represent multiple brands and earn on every deal they close. My role: Main full-stack developer.',
    icon: badge('techrepnetwork'),
    image: thumbnail('techrepnetwork'),
    visible: true,
  },
  {
    name: 'StraightLine',
    title: 'Turn Your SaaS Into an AWS Marketplace Revenue Engine',
    link: 'https://www.usestraightline.com/welcome/',
    id: 'straightline',
    description: 'StraightLine helps SaaS companies become AWS Partners and launch on AWS Marketplace, handling FTR readiness, funding-program access, and go-to-market so they can turn a Marketplace listing into real enterprise revenue. My role: Main full-stack developer.',
    icon: badge('straightline'),
    image: thumbnail('straightline'),
    visible: true,
  },
  {
    name: 'SocBridge',
    title: 'Your SOC 2, Completely Done For You',
    link: 'https://socbridge.com/',
    id: 'socbridge',
    description: 'SocBridge manages the entire SOC 2 process end to end, platform, policies, employee training, and attestations, backed by CISSP-certified specialists and cloud-certified architects, so a company gets its report in 4 to 6 months without figuring out compliance alone. My role: One of the main full-stack developers.',
    icon: badge('socbridge'),
    image: thumbnail('socbridge'),
    visible: true,
  },
  {
    name: 'Visage',
    title: 'Visage',
    link: 'https://joinvisage.com/',
    id: 'visage',
    description: 'Visage connects everyday people who are comfortable on camera directly with tech startups that need authentic short-form video content, cutting out the agency middleman. My role: Main full-stack developer.',
    icon: badge('visage'),
    image: thumbnail('visage'),
    visible: true,
  },
  {
    name: 'Iron Fort',
    title: 'Iron Fort',
    link: 'https://www.goironfort.com/',
    id: 'goironfort',
    description: 'Iron Fort replaces manual compliance spreadsheets and expensive annual consultant reviews with a continuous, automated compliance platform built for Canadian government, healthcare, and SaaS teams. My role: One of the main developers, growing from frontend designer to frontend developer, quality assurance, data engineer, and full-stack developer.',
    icon: badge('goironfort'),
    image: thumbnail('goironfort'),
    visible: true,
  },
];
