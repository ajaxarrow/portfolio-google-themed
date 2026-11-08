/**
 * Single source of truth for SEO. When a custom domain is attached in Netlify
 * (recommended: jiuaxltabilla.com), set VITE_SITE_URL in the Netlify build env
 * and every canonical, og:url, sitemap entry and JSON-LD url follows.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://jiuaxl.netlify.app').replace(/\/$/, '');

export const PERSON = {
  name: 'Jiu Axl R. Tabilla',
  fullName: 'Jiu Axl Ramos Tabilla',
  /** Every spelling a recruiter might type. Feeds schema.org alternateName. */
  alternateNames: [
    'Jiu Axl Tabilla',
    'Jiu Axl Ramos Tabilla',
    'Jiu Axl R. Tabilla',
    'Axl Tabilla',
    'Jiu Tabilla',
    'Jiu Axl',
    'Axl Ramos Tabilla',
    'ajaxarrow',
    'jiuaxl',
  ],
  jobTitle: 'Full-Stack Software Engineer',
  email: 'axldamnaxl@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/jiu-axl-tabilla-9bb659303/',
    'https://github.com/ajaxarrow',
  ],
  skills: [
    'Python', 'Django', 'Laravel', 'Vue.js', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'PHP',
    'REST API Development', 'PostgreSQL', 'MySQL', 'AWS', 'Azure DevOps', 'Flutter', 'Figma',
    'Full-Stack Development', 'Backend Architecture', 'Database Design', 'Data Engineering',
  ],
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const HOME_TITLE = 'Jiu Axl Tabilla | Full-Stack Software Engineer & Web Developer in the Philippines';
export const HOME_DESCRIPTION =
  'Jiu Axl R. Tabilla is a full-stack software engineer and web developer (Python, Django, Laravel, Vue.js) in Bukidnon, Philippines. Open to remote jobs, freelance and contract work. See projects, résumé and contact.';

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
