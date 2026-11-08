export type ArticleAccent = "googleblue" | "googlered" | "googlegreen" | "googleyellow";

export interface ArticleEntry {
  /** Ties each article to one of the site's existing brand colors, giving it its own
   *  character (kicker, rule, accents) while staying inside the established palette. */
  accent: ArticleAccent;
  bodyHtml: string;
}

export const articles: Record<string, ArticleEntry> = {
  "resource-speaker-cisc-training": {
    accent: "googleblue",
    bodyHtml: `
      <p>In August 2025, I returned to the College of Information and Computing Sciences (CISC) at Central Mindanao University as a resource speaker for the On-the-Job Training Pre-Deployment Seminar, a two-day orientation for students about to start their industry practicum.</p>
      <p>As a software development graduate, I remember that in our time the most in-demand skill was client-side frameworks, driven by the rise of single-page applications (SPAs). I shared what I know about client-side frameworks and API integration, along with practical advice on being a good developer and teammate, handling clients, and meeting deadlines.</p>
      <p>I covered the core concepts, then demonstrated the basics of an SPA with Vue.js and showed API implementation and integration with Laravel. I chose this stack because many companies where my classmates did their training used Laravel and Vue.js.</p>
    `,
  },
  "resource-person": {
    accent: "googlegreen",
    bodyHtml: `
      <p>Also in August 2025, I served as a resource person for a training on the Basics of Knowledge Management and IEC (Information, Education, and Communication) Materials Development and Production. It was organized by NOMCAARRD (the Northern Mindanao Consortium for Agriculture, Aquatic, and Resources Research and Development) at the Northern Mindanao Agricultural Crops and Livestock Research Complex in Dalwangan, Malaybalay City.</p>
      <p>I was joined by my co-proponents from our college capstone project: a knowledge management system (KMS) with integrated mapping, built for NOMCAARRD as our client. After we defended the capstone, they invited us to present the system to other affiliates of the organization.</p>
      <p>We gave a basic demonstration of the whole process and flow, what the system can do, and how other organizations can contribute to and access its content. We also explained that contributors control who sees their content and can choose to share it with other affiliates.</p>
      <p>Although our part in the two-day program was small, we also learned from the other resource persons. It was a good experience to share our work and learn from others in return.</p>
    `,
  },
};

export function getArticle(id: string): ArticleEntry | undefined {
  return articles[id];
}

export function getReadingTime(id: string): number {
  const text = articles[id]?.bodyHtml.replace(/<[^>]+>/g, " ") ?? "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
