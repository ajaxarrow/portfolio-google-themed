import {SearchItem} from "../interfaces/link.interface.ts";
import {about} from "../data/about.ts";
import {projects} from "../data/projects.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {designs} from "../data/designs.ts";
import {socialItems} from "../data/social-items.ts";
import {isVisible} from "./entries.ts";
import type {Router} from "vue-router";

const NAV_PATHS = new Set(['', 'about', 'all', 'projects', 'designs', 'socials', 'contact', 'case-studies', 'images']);

const searchableEntries: SearchItem[] = [...about, ...projects, ...buzzerboyProjects, ...designs, ...socialItems];

export interface SearchDestination {
  path: string;
  query?: Record<string, string>;
  hash?: string;
  /** A file or off-site URL to open instead of an in-app route (e.g. the résumé PDF). */
  external?: string;
}

/** Words a client is likely to type that are not page names but have an obvious home.
 *  Without these they would land on an empty "no results" page. */
const SEARCH_ALIASES: Record<string, SearchDestination> = {
  hire: {path: '/contact'},
  'hire me': {path: '/contact'},
  'work with me': {path: '/contact'},
  'start a project': {path: '/contact'},
  'get in touch': {path: '/contact'},
  email: {path: '/contact'},
  'email me': {path: '/contact'},
  quote: {path: '/contact'},
  book: {path: '/contact'},
  'book a call': {path: '/contact'},
  freelance: {path: '/case-studies', hash: '#services'},
  services: {path: '/case-studies', hash: '#services'},
  service: {path: '/case-studies', hash: '#services'},
  'what i offer': {path: '/case-studies', hash: '#services'},
  pricing: {path: '/case-studies', hash: '#services'},
  rates: {path: '/case-studies', hash: '#services'},
  availability: {path: '/case-studies', hash: '#contact'},
  timezone: {path: '/case-studies', hash: '#contact'},
  'case studies': {path: '/case-studies'},
  'case study': {path: '/case-studies'},
  work: {path: '/case-studies'},
  portfolio: {path: '/case-studies'},
  resume: {path: '/', external: '/resume.pdf'},
  'résumé': {path: '/', external: '/resume.pdf'},
  cv: {path: '/', external: '/resume.pdf'},
  photos: {path: '/images'},
  pictures: {path: '/images'},
  home: {path: '/'},
};

/** Resolves what typing a query into the search box should do. An exact nav
 *  name (e.g. "about", "projects") is a shortcut straight to that page,
 *  matching the site's existing "type a page name to jump to it" behavior.
 *  Anything else is treated as a real content search: it lands on /all
 *  filtered to matching entries (or an honest empty state) instead of
 *  silently 404ing just because the text isn't a literal route. */
export function resolveSearchDestination(query: string): SearchDestination {
  const normalized = query.trim().replace(/^\/+/, '').toLowerCase();
  if (NAV_PATHS.has(normalized)) {
    return {path: normalized ? `/${normalized}` : '/'};
  }
  const alias = SEARCH_ALIASES[normalized.replace(/\s+/g, ' ')];
  if (alias) return alias;
  return {path: '/all', query: {q: query.trim()}};
}

export function matchesQuery(item: SearchItem, query: string): boolean {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [item.name, item.title, item.description, item.role, ...(item.stack ?? []), ...(item.tags ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function searchEntries(query: string): SearchItem[] {
  return searchableEntries.filter((item) => isVisible(item) && matchesQuery(item, query));
}

/** Runs a typed query: opens the résumé PDF, or routes in-app. Shared by both search boxes. */
export function goToSearch(router: Router, query: string): void {
  const destination = resolveSearchDestination(query);
  if (destination.external) {
    window.open(destination.external, '_blank', 'noopener');
    return;
  }
  const {external: _external, ...location} = destination;
  router.push(location);
}
