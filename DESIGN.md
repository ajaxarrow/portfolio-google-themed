---
name: jiuaxl. — The Knowledge Panel
description: A Google Search Results Page pastiche portfolio for Jiu Axl Tabilla, UI/UX designer and frontend developer.
colors:
  base: "#2D2D2D"
  googleblue: "#4285F4"
  googlered: "#EA4335"
  googlegreen: "#34A853"
  googleyellow: "#FBBC05"
  google-link: "#1A73E8"
  ink: "#202124"
  meta: "#5F6368"
  grey-50: "#F8F9FA"
  grey-100: "#F1F3F4"
  grey-200: "#E8EAED"
  grey-300: "#DADCE0"
  grey-400: "#BDC1C6"
  gs90: "#CCCBCB"
typography:
  display:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "clamp(2.5rem, 3rem + 4vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.1
  title:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.25
  article-display:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(2rem, 1.6rem + 1.6vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "9999px"
spacing:
  unit: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  chip-suggestion:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  chip-suggestion-hover:
    backgroundColor: "{colors.grey-300}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  card-result:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 0 24px 0"
  card-knowledge-panel:
    backgroundColor: "{colors.grey-50}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  nav-link-active:
    textColor: "{colors.googleblue}"
    typography: "{typography.body}"
---

# Design System: jiuaxl. — The Knowledge Panel

## 1. Overview

**Creative North Star: "The Knowledge Panel"**

The premise: Jiu Axl is notable enough that searching his name surfaces the real Google apparatus, a search bar, a results list, "People Also Ask," a "People Also Search For" rail, a Knowledge Panel, right down to a "did you mean" 404. The whole site is that Knowledge Panel, expanded outward into a full portfolio. It's a playful, obviously-a-wink pastiche rather than a deadpan forgery: the fun is in how convincingly well-crafted the joke is, not in fooling anyone into thinking it's really google.com. Precision and craft carry the personality; the page never winks with a caption explaining the joke, it just executes the bit extremely well.

This system explicitly rejects the generic AI/template portfolio look: no glassy SaaS cards, no gradient hero sections, no glassmorphism-by-default, no identical icon-card grids, no tiny uppercase eyebrows, no 01/02/03 section scaffolding, no card-hover-lift shadows. It also stops short of impersonating Google's actual proprietary brand assets (no "Google Sans"/"Product Sans" forgery); the look is carried by real Google Material color and Search layout conventions, not by counterfeiting a typeface.

**Key Characteristics:**
- Flat, shadowless surfaces throughout (real Google Search has almost no elevation)
- Google's own documented Material grey scale and text colors, used verbatim
- One typeface family (Satoshi) doing all the work through weight and scale contrast
- SERP furniture (search box, result rows, chips, knowledge panel) is real navigational structure, not decoration
- Motion is restrained and functional: it mimics real Google micro-interactions (instant suggestions, tab underlines, app-launcher stagger), not generic marketing-site flourish

## 2. Colors

The palette pairs the five brand "wordmark" colors (used only on the `jiuaxl.` letters and as functional accents) against Google's real, publicly documented Material grey scale and text colors, which is what most of the interface actually runs on.

### Primary
- **Google Blue** (#4285F4): the "j"/"x" wordmark letters, the active nav-tab underline, the menu icon's active state, the "Search" quick-link accent.
- **Google Link Blue** (#1A73E8): reserved specifically for result-link/URL-style text, kept distinct from Google Blue so the wordmark accent and "this is a clickable result" signal never collide.

### Secondary
- **Google Red** (#EA4335): "i"/"l" wordmark letters.
- **Google Green** (#34A853): "u" wordmark letter, and any icon explicitly marked as the "Search" action inside the app-launcher menu (previously a stray unrelated green, now this same token).
- **Google Yellow** (#FBBC05): "a"/"." wordmark letters.

### Neutral
- **Ink** (#202124): primary body/heading text. Replaces the old `base`/`#2D2D2D` as the default text color; darker and matches Google's real documented primary-text grey.
- **Meta** (#5F6368): secondary/meta text (URLs, timestamps, descriptions, placeholder text). Replaces the previous inconsistent `#8C8C8C` / `#666464` pair.
- **Grey 50** (#F8F9FA): subtle surface fill, used for the Knowledge Panel card background.
- **Grey 100** (#F1F3F4): chip/pill background ("People Also Search For" suggestion pills).
- **Grey 200** (#E8EAED): hover surface for chips, suggestion-dropdown rows, and the "People Also Ask" accordion row.
- **Grey 300** (#DADCE0): borders and dividers (result thumbnail border, Knowledge Panel divider, search-box outline).
- **Grey 400** (#BDC1C6): stronger/active border state (delete-icon hover fill, icon-container border).
- **gs90** (#CCCBCB): secondary text used specifically on dark/inverted surfaces (the profile tooltip's dark background). Kept separate from the light-mode neutral scale above because its role is inverted-surface text, not a light-mode fill.

### Named Rules
**The Flat Palette Rule.** Every neutral above is a real, documented Google Material grey. When in doubt about a new grey, don't invent one; borrow from Google's own published scale.

## 3. Typography

**Display Font:** Satoshi (with `sans-serif` fallback)
**Body Font:** Satoshi (with `sans-serif` fallback)

**Character:** One family carrying the entire SERP system through weight and size contrast (400 to 800) rather than font pairing. This is a deliberate choice, not a gap: sourcing a Google-look-alike display face would tip into brand impersonation (see Overview), so the "Google" feeling is built from layout, color, and interaction instead.

**Article Font:** Literata (with `Georgia, serif` fallback), used exclusively inside `ArticleView` (headline + h2 subheadings). One deliberate second family, staying under the 3-family cap, to mark the article/blog surface as a genuinely different reading mode than the SERP shell around it, a serif+sans contrast pairing per the brand register's typography guidance. Literata was picked specifically because Google designed it for long-form on-screen reading (originally for Play Books), not as a decorative display face; body copy inside articles stays in Satoshi so the reading experience doesn't fully disconnect from the rest of the site.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 3rem + 4vw, 6rem)`, 1.05 line-height, -0.02em tracking): the Landing view's `jiuaxl.` wordmark. Currently implemented as three fixed breakpoints (96px / 72px / 64px); should migrate to the fluid clamp above so it scales continuously instead of stepping.
- **Headline** (800, 36px, 1.1 line-height): the topbar wordmark logo.
- **Title** (500, 20px, 1.3 line-height): SERP result titles, Knowledge Panel name.
- **Body** (400, 14px, 1.5 line-height): result descriptions, Knowledge Panel bio/skills text.
- **Label** (500, 12px, 1.25 line-height): result URLs, tooltip meta text, suggestion-chip labels.
- **Article Display** (Literata 600, `clamp(2rem, 1.6rem + 1.6vw, 2.75rem)`, 1.15 line-height, -0.01em tracking): article H1 titles only. Article H2 subheadings use Literata 500 italic at 24px, a classic editorial "section break" convention distinct from the H1 weight.

### Named Rules
**The Truncation Rule.** Result descriptions cap at 80 characters plus an ellipsis (see `SearchLinkItem`'s `truncateString`); this is the de facto "line length" control for this card-based layout in place of a prose 65-75ch measure.

**The One Reading Font Rule.** Literata appears only in `ArticleView`'s headline and h2 elements, never in the SERP shell (nav, results, chips, knowledge panel). If a new component needs serif treatment outside an article page, that's a sign it should become an article, not a reason to spread the font wider.

## 4. Elevation

Flat by default, everywhere. There is no `box-shadow` anywhere in the current system; the only depth cue is the search box's 1px inset ring (`box-shadow: 0 0 0 1px`, functioning as a border, not a shadow). This is a deliberate match to real Google Search, whose own surfaces are almost entirely shadowless. Depth, where it exists at all, comes from flat tonal contrast (a grey-50/grey-100 card sitting on white) rather than elevation.

### Named Rules
**The No-Shadow Rule.** Never add `box-shadow` for decorative depth. If a surface needs to read as "raised," use a tonal fill (Grey 50/100) or a 1px Grey 300 border instead.

## 5. Components

### Search Input
- **Style:** pill-shaped (25px radius, functionally `rounded.lg`), 1px Grey 300 outline via `box-shadow: 0 0 0 1px`, white/`overlay` background for the suggestions panel.
- **Focus:** currently no visible focus transition; add a border-color shift + subtle scale on focus (Phase 1 motion pass).
- **Suggestions dropdown:** rows use Grey 200 on hover; currently pops in with no transition (Phase 1 adds a fade + slide).

### Chips (People Also Search For)
- **Style:** Grey 100 background, `rounded.md` (16px), medium-weight label text.
- **Hover:** background shifts to Grey 300, label underlines.

### Cards / Containers
- **SERP Result Row (signature component):** not a bordered card, a plain stacked block (icon avatar + name/url row, bold title link, description). No border, no shadow, no hover-lift, matches real Google result rows exactly. Hover state: title underlines and/or row background tints to Grey 200, never a lift.
- **Knowledge Panel Card:** Grey 50 background, `rounded.md` (16px), 24px internal padding, houses the avatar, name/role, bio, and skills list. Currently uses a bare 1px `border-left` divider instead of a real card shell; Phase 1 converts this to the tonal-fill treatment described here (side-stripe borders are an explicit anti-pattern, see Do's and Don'ts).

### Inputs / Fields
- Same as Search Input above; this system has no other form fields.

### Navigation
- **Style:** flat text links with icon prefix, Grey/Ink default state.
- **Active:** Google Blue text + (currently) a static 3px bottom border. Phase 1 replaces the static border with an animated sliding indicator between tab positions.
- **Mobile:** collapses into the dedicated `SearchView` full-screen layout rather than a hamburger menu.

### Signature Component: App-Launcher Menu (Dot Grid)
A 3-per-row icon grid inside a rounded (24px) `VSheet`, opened from a 9-dot icon, exactly mirroring Google's own app switcher. Icons render in each destination's brand color at `weight="duotone"`.

### Signature Component: Article / Blog Post
The one surface that steps outside the SERP metaphor entirely, a centered 680px reading column (`route.meta.centered`, bypassing the rail-offset/knowledge-panel layout MainLayout uses everywhere else), with `scrollBehavior` resetting to top on every route change so arriving at an article never lands mid-scroll. Structure: a kicker chip (Grey 100 pill, small colored dot + Ink text, category label), the Literata H1, a byline row (date, reading time, author), a 56px accent-colored rule, a full-width hero photo, Satoshi body copy at 17px/1.7 with Literata-italic H2 section breaks, and an "In photos" horizontal filmstrip for any remaining gallery photos. One choreographed entrance (header, then body, via `fadeUpOnce`), not per-paragraph reveals.

**Per-article accent.** Each `ArticleEntry` in `src/data/articles.ts` carries an `accent` field (one of the four wordmark colors). It colors only the kicker dot and the rule, small, decorative, never text-on-color, so contrast is never a concern. This is how "every article is different" without touching layout or type: the accent is the one thing that varies, the system stays fixed.

## 6. Do's and Don'ts

### Do:
- **Do** use Google's real documented greys (Grey 50/100/200/300/400, Ink #202124, Meta #5F6368) for all neutral UI, not invented hex values.
- **Do** keep every surface flat; depth comes from tonal fills or a 1px Grey 300 border, never a shadow.
- **Do** let SERP furniture (search box, result rows, chips, knowledge panel, "did you mean" 404) carry real content and navigation, not decoration.
- **Do** treat motion as a Google-authenticity anchor: instant-suggestion fades, app-launcher stagger, sliding tab underlines.
- **Do** provide a `prefers-reduced-motion` fallback for every animation added.

### Don't:
- **Don't** use glassy SaaS cards, gradient hero sections, or glassmorphism-by-default (PRODUCT.md anti-reference).
- **Don't** build identical icon-card grids, tiny uppercase tracked eyebrows, or 01/02/03 numbered section scaffolding (PRODUCT.md anti-reference).
- **Don't** add a card-hover-lift shadow to result rows; real Google results tint or underline, they never lift.
- **Don't** use `border-left`/`border-right` as a colored accent stripe (the Knowledge Panel's current divider is being replaced for exactly this reason).
- **Don't** source or forge "Google Sans"/"Product Sans" to chase authenticity; that crosses from pastiche into brand impersonation (PRODUCT.md anti-reference).
- **Don't** apply the same scroll-fade-in to whole section wrappers; stagger belongs to individual result rows within a list, not the list container.
