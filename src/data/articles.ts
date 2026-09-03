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
      <p>In August 2025, I was invited back to the College of Information and Computing Sciences (CISC) at Central Mindanao University as a resource speaker for the On-the-Job Training Pre-Deployment Seminar, a two-day orientation for students about to head out into their industry practicum.</p>
      <p>My session focused on two things I wish someone had walked me through before my own OJT: client-side frameworks and API integration. Most students entering the seminar had built static pages and simple CRUD apps in class, but very few had connected a real frontend to a real backend under the kind of constraints a client actually imposes, inconsistent documentation, rate limits, auth tokens that expire mid-demo, and endpoints that change without notice.</p>
      <h2>What we actually covered</h2>
      <p>I walked through how modern client-side frameworks like Vue and React structure state and components, then spent most of the time on the practical side of API integration: reading documentation critically, handling loading and error states instead of assuming the happy path, and structuring requests so a frontend doesn't fall over the moment a backend team changes a response shape.</p>
      <p>I also talked candidly about the gap between classroom exercises and client work, the first week of any real project is usually spent understanding someone else's codebase and conventions, not writing new features. Setting that expectation early tends to save students a lot of unnecessary self-doubt once they're deployed.</p>
      <h2>Why this mattered to me</h2>
      <p>A few years ago I was sitting in the exact same seminar, about to be deployed for my own OJT with no real sense of what "integrating with an API" meant outside of a lecture slide. Coming back to speak to the next batch, this time from the other side of that experience, was a genuinely full-circle moment.</p>
    `,
  },
  "resource-person": {
    accent: "googlegreen",
    bodyHtml: `
      <p>Also in August 2025, I served as a resource person for a training on the Basics of Knowledge Management and IEC (Information, Education, and Communication) Materials Development and Production, organized by NOMCAARRD (the Northern Mindanao Consortium for Agriculture, Aquatic, and Resources Research and Development) at the Northern Mindanao Agricultural Crops and Livestock Research Complex in Dalwangan, Malaybalay City.</p>
      <p>This one was a different kind of audience than I usually work with, researchers and extension workers whose job is to take dense agricultural research and turn it into materials farmers and local communities can actually use. My part of the training focused on the production side: how digital tools and basic design principles can make IEC materials clearer and more accessible, without needing a full design team behind every pamphlet or infographic.</p>
      <h2>Bridging research and design</h2>
      <p>A recurring theme in the session was that knowledge management isn't just about storing information correctly, it's about packaging it so the right person can find and use it at the right moment. I shared practical approaches for structuring content before touching any design tool: outlining the core message first, then layering in visual hierarchy, so the final material serves the reader instead of just looking polished.</p>
      <p>I also demonstrated a few lightweight workflows for producing IEC materials without specialized software, since most participants wouldn't have access to a full design suite day-to-day back at their own stations.</p>
      <h2>Takeaway</h2>
      <p>What stuck with me most was how much overlap there is between good UI/UX practice and good IEC material design, both are ultimately about reducing the distance between what someone knows and what someone else needs to understand.</p>
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
