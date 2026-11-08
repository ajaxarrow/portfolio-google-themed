import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {useTheme} from 'vuetify';
import {useHead} from '@unhead/vue';
import {findEntryById} from '../utils/entries.ts';
import {aboutQuestions} from '../data/questions.ts';
import {
  absoluteUrl, DEFAULT_OG_IMAGE, HOME_DESCRIPTION, HOME_TITLE, PERSON, SITE_URL,
} from './site.ts';

const stripHtml = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s: string, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

const personNode = {
  '@type': 'Person',
  '@id': personId,
  name: PERSON.name,
  givenName: 'Jiu Axl',
  familyName: 'Tabilla',
  alternateName: PERSON.alternateNames,
  jobTitle: PERSON.jobTitle,
  description: HOME_DESCRIPTION,
  url: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  email: `mailto:${PERSON.email}`,
  nationality: {'@type': 'Country', name: 'Philippines'},
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bukidnon',
    addressRegion: 'Northern Mindanao',
    addressCountry: 'PH',
  },
  alumniOf: {'@type': 'CollegeOrUniversity', name: 'Central Mindanao University'},
  worksFor: {'@type': 'Organization', name: 'Buzzerboy Inc', url: 'https://www.buzzerboy.com/'},
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Developer',
    occupationLocation: {'@type': 'Country', name: 'Philippines'},
    skills: PERSON.skills.join(', '),
  },
  knowsAbout: PERSON.skills,
  sameAs: PERSON.sameAs,
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: `${SITE_URL}/`,
  name: 'Jiu Axl Tabilla',
  alternateName: ['jiuaxl.', 'Jiu Axl Tabilla Portfolio', 'Axl Tabilla Portfolio'],
  inLanguage: 'en',
  publisher: {'@id': personId},
};

const serviceNode = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#service`,
  name: 'Jiu Axl Tabilla - Software Development',
  description: 'Freelance and remote full-stack software development: Python/Django and Laravel backends, Vue.js frontends, REST APIs, AWS deployment.',
  url: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  founder: {'@id': personId},
  email: PERSON.email,
  areaServed: [
    {'@type': 'AdministrativeArea', name: 'Bukidnon'},
    {'@type': 'AdministrativeArea', name: 'Northern Mindanao'},
    {'@type': 'Country', name: 'Philippines'},
    {'@type': 'Place', name: 'Remote / Worldwide'},
  ],
  address: personNode.address,
  knowsAbout: PERSON.skills,
};

export function useRouteHead() {
  const route = useRoute();
  // Vuetify 3.6 can't find unhead v2 (used by vite-ssg), so its generated theme CSS
  // (.text-googleblue etc.) was missing from prerendered HTML. Emit it ourselves.
  const theme = useTheme();

  const page = computed(() => {
    const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '');
    const meta = route.meta as {title?: string; description?: string; noindex?: boolean};
    let title = meta.title ?? HOME_TITLE;
    let description = meta.description ?? HOME_DESCRIPTION;
    let image = DEFAULT_OG_IMAGE;
    let ogType = 'website';

    const q = route.name === 'all' ? String(route.query.q ?? '').trim() : '';
    if (q) title = `${q} | Search Jiu Axl Tabilla's work`;

    if (route.name === 'article') {
      const entry = findEntryById(route.params.id as string);
      if (entry) {
        title = `${entry.title} | Jiu Axl Tabilla`;
        description = clip(stripHtml(entry.description));
        if (entry.image) image = absoluteUrl(entry.image);
        ogType = 'article';
      } else {
        return {path, title: 'Page not found | Jiu Axl Tabilla', description, image, ogType, noindex: true};
      }
    }
    return {path, title, description, image, ogType, noindex: !!meta.noindex};
  });

  const jsonLd = computed(() => {
    const graph: Record<string, unknown>[] = [];
    if (route.name === 'home') graph.push(websiteNode, personNode, serviceNode);
    if (route.name === 'about') {
      graph.push({
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/about#profile`,
        url: `${SITE_URL}/about`,
        name: page.value.title,
        mainEntity: personNode,
        isPartOf: {'@id': websiteId},
      });
      graph.push({
        '@type': 'FAQPage',
        mainEntity: aboutQuestions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {'@type': 'Answer', text: stripHtml(q.answer)},
        })),
      });
    }
    if (route.name !== 'home') {
      const crumbs = [{name: 'Home', url: `${SITE_URL}/`}];
      if (route.name !== 'error404') crumbs.push({name: page.value.title.split(' | ')[0], url: `${SITE_URL}${page.value.path}`});
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({'@type': 'ListItem', position: i + 1, name: c.name, item: c.url})),
      });
    }
    return graph;
  });

  useHead({
    htmlAttrs: {lang: 'en'},
    title: () => page.value.title,
    meta: [
      {name: 'description', content: () => page.value.description},
      {name: 'robots', content: () => (page.value.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1')},
      {name: 'author', content: PERSON.name},
      {property: 'og:type', content: () => page.value.ogType},
      {property: 'og:site_name', content: 'Jiu Axl Tabilla'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: () => page.value.title},
      {property: 'og:description', content: () => page.value.description},
      {property: 'og:url', content: () => absoluteUrl(page.value.path)},
      {property: 'og:image', content: () => page.value.image},
      {property: 'og:image:alt', content: 'Jiu Axl Tabilla, full-stack software engineer'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: () => page.value.title},
      {name: 'twitter:description', content: () => page.value.description},
      {name: 'twitter:image', content: () => page.value.image},
      // Bukidnon, Philippines
      {name: 'geo.region', content: 'PH-BUK'},
      {name: 'geo.placename', content: 'Bukidnon, Philippines'},
    ],
    style: [{id: 'vuetify-theme-stylesheet', innerHTML: () => theme.styles.value}],
    link: () => (page.value.noindex ? [] : [{rel: 'canonical', href: absoluteUrl(page.value.path)}]),
    script: [
      {
        type: 'application/ld+json',
        key: 'jsonld',
        innerHTML: () => JSON.stringify({'@context': 'https://schema.org', '@graph': jsonLd.value}),
      },
    ],
  });
}
