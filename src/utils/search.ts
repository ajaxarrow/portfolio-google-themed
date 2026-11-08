import {SearchItem} from "../interfaces/link.interface.ts";
import {about} from "../data/about.ts";
import {projects} from "../data/projects.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {designs} from "../data/designs.ts";
import {socialItems} from "../data/social-items.ts";
import {isVisible} from "./entries.ts";

const NAV_PATHS = new Set(['', 'about', 'all', 'projects', 'designs', 'socials', 'images']);

const searchableEntries: SearchItem[] = [...about, ...projects, ...buzzerboyProjects, ...designs, ...socialItems];

export interface SearchDestination {
  path: string;
  query?: Record<string, string>;
}

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
