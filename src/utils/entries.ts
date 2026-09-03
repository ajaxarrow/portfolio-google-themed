import {about} from "../data/about.ts";
import {projects} from "../data/projects.ts";
import {designs} from "../data/designs.ts";
import {buzzerboyProjects} from "../data/buzzerboy-projects.ts";
import {SearchItem} from "../interfaces/link.interface.ts";

export const ARTICLE_LINK_SENTINEL = "article";

export function isArticleItem(item: SearchItem | undefined | null): boolean {
  return item?.link === ARTICLE_LINK_SENTINEL;
}

/** An entry with no `visible` field is treated as visible; only an explicit `false` hides it. */
export function isVisible(item: SearchItem): boolean {
  return item.visible !== false;
}

const allEntries: SearchItem[] = [...about, ...projects, ...buzzerboyProjects, ...designs];
const entriesById = new Map(allEntries.map((item) => [item.id, item]));

export function findEntryById(id: string): SearchItem | undefined {
  return entriesById.get(id);
}

export type EntryCategory = "awards" | "projects" | "designs";

const CATEGORY_LABELS: Record<EntryCategory, string> = {
  awards: "Awards & Research",
  projects: "Projects",
  designs: "UI Designs",
};

const aboutIds = new Set(about.map((item) => item.id));
const projectIds = new Set([...projects, ...buzzerboyProjects].map((item) => item.id));
const designIds = new Set(designs.map((item) => item.id));

export function getEntryCategory(id: string): EntryCategory | undefined {
  if (aboutIds.has(id)) return "awards";
  if (projectIds.has(id)) return "projects";
  if (designIds.has(id)) return "designs";
  return undefined;
}

export function getCategoryLabel(category: EntryCategory): string {
  return CATEGORY_LABELS[category];
}
