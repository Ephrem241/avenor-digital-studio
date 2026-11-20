# Phase 3 — Homepage Sections

## Objective

Complete the homepage below the existing hero, following AGENTS.md §8 (homepage responsibilities) and the two reference images in `design/`:

1. Introduction + industry pathways (ivory)
2. Services (dark)
3. Featured work (ivory)
4. Process (dark)
5. Final CTA (cinematic dark)
6. Footer (already built, unchanged)

Content lives in typed data files so Phase 5 pages (Services, Industries, Work) reuse it instead of duplicating it.

Motion is **not** part of this phase. Sections ship static and fully readable; Phase 4 adds the hero entrance, scroll reveals, masked image reveals, marquee, industry switcher and portfolio hover motion on top. Plain CSS hover states (colour, arrow nudge) are included because the existing buttons already use them.

## Skills and docs consulted

- AGENTS.md §4 (design system), §5 (reference interpretation), §7 (responsive), §8 (homepage), §9 (portfolio integrity), §14 (copy), §15 (components).
- `prompts/phase-2-design-system.md` (tokens, primitives, decisions already made).
- `node_modules/next/dist/docs` — `next/image` API (`sizes`, `fill`, `placeholder`) before adding screenshots.
- Memory: portfolio facts (confirmed 2026-11-17), owner conventions (humanizer on copy, banned hype words, `placeholder: true` flag for unverified data).
- humanizer skill, run on all new copy before it goes into the data files.

## Existing code inspected

| Item | Finding |
|---|---|
| `app/page.tsx` | Renders only `<Hero />` |
| `components/ui/section.tsx` | `Section` with tones `dark`, `dark-alt`, `light`, `light-alt`, standard spacing, container |
| `components/ui/section-heading.tsx` | Eyebrow + serif heading + intro, `tone`, `as`, `align` |
| `components/ui/button.tsx` | `ButtonLink` variants `primary`, `outline-light/dark`, `text-light/dark`, optional arrow |
| `components/ui/eyebrow.tsx` | Gold label, pill option |
| `app/globals.css` | Colour, type scale (`text-display` … `text-caption`), radius (`rounded-card`, `rounded-media`), easing tokens |
| `lib/site.ts` | Nav, CTAs, `serviceKeywords` |
| Dependencies | `lucide-react` only. No animation library, no image assets in `public/` |
| Live sites | `noah-barbershop-9cv3.vercel.app` → 200, `longnile.vercel.app` → 307 (locale redirect) |

Nothing existing is removed. The hero, header, mobile menu and footer stay as they are.

## Portfolio content (from confirmed facts, not from the brief)

AGENTS.md §9 describes LongNile as hospitality with Mapbox and an admin dashboard, and lists Kuriftu. Your confirmed facts override that:

| Project | Status label | Industry label | Image |
|---|---|---|---|
| Noah Barbershop | Live | Beauty & Grooming | Real screenshot of the live site |
| LongNile | In Development | Logistics & Trading | Real screenshot of the preview at longnile.vercel.app |
| Hayat Herbal | Redesign · In Development | Product & Brand | No screenshot exists → typographic cover (project name on a charcoal/gold panel), clearly not a fake mock-up |

Kuriftu Resorts & Spa is left out. Three cards, not four.

Each card shows status pill, name, industry, a one-line summary describing only what is built, and links to `/work/<slug>` (404 until Phase 5). Noah also gets the external "Visit live site" link on its case-study page later, not on the card.

Screenshots: I capture them with Playwright at 1440×900 (desktop crop), save as optimised `.webp` in `public/work/<slug>/cover.webp`, and render with `next/image` and real `alt` text.

## Design decisions

### 1. Introduction + industries (`light`, ivory-50)

- Desktop: 12-column grid. Left 4 columns: eyebrow "More than a website", H2 "A better way to do business.", short paragraph, "Learn more" text link → `/about`. Right 8 columns: two industry cards side by side.
- Industry card: dark media panel (`rounded-media`), gold outlined icon (Lucide `BedDouble` / `Scissors`), serif title, audience line, one-line value statement, "Explore Hospitality" / "Explore Beauty" link → `/industries/hospitality`, `/industries/beauty-wellness`. The whole card is one link with a single accessible name; the visible CTA text is part of it.
- Mobile (reference): the cards become compact horizontal rows (image left area, title + audience, circular arrow at right), stacked under the intro. The decorative arched lounge photo in the mobile reference is dropped because there is no real image for it.
- **Imagery:** no hospitality or beauty photography exists in the repo. Cards use an art-directed CSS treatment (charcoal gradient, warm gold light, the icon as focal point) and accept an optional `image` prop so real photos drop in later. I will not use stock photos that look like client work.

### 2. Services (`dark`, charcoal-950)

- Desktop: left column with eyebrow "Our services", H2 "Everything your business needs to work better online.", "View All Services" outline button → `/services`. Right: the six services in a 3×2 grid (the single-row strip in the reference is too cramped at 1024–1280px), each with a gold Lucide icon, name and one short line of what it covers.
- Services: Website Design & Development, Booking & Reservation Systems, Customer Enquiry Management, AI & Workflow Automation, SEO & Performance Optimization, Website Care & Optimization.
- Tablet and mobile: two-column grid, heading centred above as in the mobile reference, button below.
- Hairline dividers (ivory/10) between items rather than six rounded cards (§4.1: avoid card-everywhere).

### 3. Featured work (`light-alt`, ivory-100)

- Desktop: left column with eyebrow "Our work", H2 "Selected digital experiences.", short intro, "View Portfolio" text link → `/work`. Right: three project cards.
- Card: 4:3 image with status pill overlaid bottom-left, name, industry, arrow. 12px radius, white surface, ivory-200 border.
- Tablet: two columns. Mobile: single column stack (all content visible, no hover dependency).
- Status pill colours: Live = gold-500 on charcoal; In Development / Redesign = ivory on charcoal/70. Text, not colour alone, carries the status.

### 4. Process (`dark`, charcoal-950)

- Eyebrow "Our process", H2 "A clear path from idea to launch."
- Six steps as an ordered list (`<ol>`): Discover, Strategize, Design, Develop, Launch, Optimize. Each has a number, gold outlined icon, name and a short line.
- Desktop: heading left, steps in a horizontal row joined by a thin gold/30 line.
- Tablet/mobile: vertical timeline with the line running down the left side. Readable at 360px.

### 5. Final CTA (`dark`, full-bleed)

- H2 "Ready to improve your digital presence?", one sentence, "Start a Project" primary button → `/contact`, plus a secondary "Explore Our Work" text link.
- Background: same CSS warm-light treatment as the hero (no photo), with a left-weighted dark overlay so text contrast holds. Structured for a `next/image` background later.

### Section rhythm

Hero (dark) → Intro/industries (ivory-50) → Services (charcoal-950) → Work (ivory-100) → Process (charcoal-900, so it separates from the CTA) → CTA (charcoal-950 with light) → Footer. Matches the reference's alternation.

### Left out on purpose

- Wavy section dividers in the mobile reference: decorative, add CSS weight, conflict with the straight edges on desktop.
- Floating chat button in the mobile reference: no chatbot is approved (§18).
- Social icons: still no known accounts.
- Scroll-cue mouse icon in the hero: belongs with Phase 4 motion.

## Data and components

### New data (`lib/`)

| File | Contents |
|---|---|
| `lib/industries.ts` | `Industry` type + Hospitality and Beauty & Wellness: slug, title, audience, value line, CTA label, href, icon key, optional image |
| `lib/services.ts` | `Service` type + six services: slug, name, short line, icon key |
| `lib/projects.ts` | `Project` type + three projects: slug, name, industry, status (`"live" \| "in-development" \| "redesign"`), summary, cover image + alt (optional), `featured` flag |
| `lib/process.ts` | `ProcessStep` type + six steps |

Icons are stored as keys and mapped to Lucide components in one place (`components/ui/icon.tsx`) so data files stay serialisable for a CMS later.

### New components (all Server Components, no client JS)

| File | Purpose |
|---|---|
| `components/ui/icon.tsx` | Key → Lucide icon map, gold outlined icon badge |
| `components/ui/status-pill.tsx` | Project status label |
| `components/home/intro-industries.tsx` | Section 1 |
| `components/industries/industry-card.tsx` | Reusable card (Phase 5 Industries index reuses it) |
| `components/home/services-overview.tsx` | Section 2 |
| `components/home/featured-work.tsx` | Section 3 |
| `components/work/project-card.tsx` | Reusable card (Phase 5 `/work` reuses it) |
| `components/home/process.tsx` | Section 4 |
| `components/shared/cta-section.tsx` | Section 5, props for heading/copy so other pages reuse it |

### Modified

- `app/page.tsx`: compose the sections in order.
- `app/globals.css`: only if a shared utility is missing (e.g. a reusable warm-light background used by both hero and CTA; the hero's inline gradients move into that utility so they are not duplicated).
- `components/home/hero.tsx`: only to use that shared background utility. No visual change.

### New assets

- `public/work/noah-barbershop/cover.webp`
- `public/work/longnile/cover.webp`

## Copy

All headings above come from the reference and AGENTS.md. Supporting lines (service descriptions, process steps, industry value lines, project summaries) are new. I write them plainly, run them through the humanizer skill, and check for banned words (seamless, cutting-edge, world-class, unparalleled, delve, "next level", "passionate"). No statistics, client logos, testimonials or results.

## Assumptions

1. Phase 3 = static sections; Phase 4 = motion. Same split as AGENTS.md §16.
2. Linked routes (`/about`, `/services`, `/industries/*`, `/work`, `/work/*`) do not exist yet and 404 until Phase 5.
3. Screenshots of your own live/preview sites count as "genuine project screenshots" (§5). If the LongNile preview is behind a redirect to a locale or a password, I capture the page it lands on; if it needs auth, I fall back to the typographic cover and tell you.
4. Hayat Herbal has nothing public, so it gets the typographic cover.

## Security considerations

No user input, no secrets, no client-side fetches. Screenshots are static files served from `public/`. Remote images are not used, so `next.config.ts` `images.remotePatterns` stays untouched.

## Accessibility

- One H1 (hero); each section has an H2 with `aria-labelledby`.
- Industry and project cards are single links with clear accessible names; no nested interactive elements.
- Process uses `<ol>` so step order is announced.
- Decorative icons `aria-hidden`; screenshots have descriptive alt text.
- Body text on dark uses ivory/stone-300, on ivory uses charcoal/stone-500; gold only for labels, icons and large type. Small gold labels on ivory use gold-700.
- Touch targets ≥44px; everything visible without hover.

## Acceptance criteria

- [ ] Homepage shows hero, intro + industries, services, featured work, process, CTA, footer in that order.
- [ ] Desktop composition follows the desktop reference; mobile follows the mobile reference (compact industry rows, two-column services).
- [ ] All repeated content comes from typed data files; no duplicated copy between components.
- [ ] Portfolio shows Noah (Live), LongNile (In Development, Logistics & Trading), Hayat Herbal (Redesign, no fake image). No Kuriftu. No invented outcomes.
- [ ] Real screenshots for Noah and LongNile via `next/image` with `sizes` set.
- [ ] No banned words; copy passed through humanizer.
- [ ] No client JavaScript added (all new components are Server Components).
- [ ] No horizontal overflow at 360, 390, 412, 768, 1024, 1440px.
- [ ] Type check, lint and production build pass.

## Checks

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Playwright: full-page screenshots at 360, 390, 412, 768, 1024, 1440; `scrollWidth <= innerWidth` at each; Tab through the page to confirm focus order and visible focus rings on cards; compare against both references.

## Manual test instructions

1. `npm run dev`, open http://localhost:3000.
2. Scroll the full page at desktop width and compare with `design/Avenor Digital Studio Luxury Homepage (1).png`.
3. Switch DevTools to 390px and compare with the mobile reference: industry cards as rows, services in two columns, project cards stacked.
4. Tab through the page: each industry and project card takes one focus stop with a visible gold ring.
5. Check the portfolio labels: Noah "Live", LongNile "In Development", Hayat Herbal "Redesign".
6. Clicking card links leads to 404s for now; that is expected until Phase 5.
