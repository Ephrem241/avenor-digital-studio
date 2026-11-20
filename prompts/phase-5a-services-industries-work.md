# Phase 5A — Services, Industries and Work pages

## Objective

Build the first half of AGENTS.md Phase 5: the pages the homepage already links to and that need no new facts from the owner.

- `/services`
- `/industries`, `/industries/hospitality`, `/industries/beauty-wellness`
- `/work`, `/work/[slug]` (case studies for Noah Barbershop, LongNile, Hayat Herbal)

**Phase 5B follows:** About, Insights, Contact and the legal pages. Those need owner facts (contact email, legal entity, jurisdiction) and the Contact form needs the Phase 6 backend, so they are split out instead of being filled with guesses. Until then those links keep landing on the existing 404 page.

## Skills and docs consulted

- AGENTS.md §4 (design system), §6.3 B/C/E/F (motion), §7, §8 (page responsibilities), §9 (portfolio integrity), §14 (copy), §15.
- Memory: portfolio facts (Noah live and contact-based; LongNile logistics, in development; Hayat no public assets; Kuriftu excluded) and owner conventions (humanizer pass on copy, no hype words, `placeholder: true` on unverified data).
- Next.js 16 docs in `node_modules/next/dist/docs/01-app`: `generate-static-params.md` (params are a Promise), `page.md` (global `PageProps<'/work/[slug]'>` helper), `route-segment-config/dynamicParams.md` (**not available with `cacheComponents: true`**, which this project enables, so unknown slugs call `notFound()`).

## Existing code inspected

- `lib/services.ts`, `lib/industries.ts`, `lib/projects.ts`, `lib/process.ts`: typed content with short summaries only.
- `components/ui/*` (Section, SectionHeading, ButtonLink, Eyebrow, Icon, StatusPill, Container), `components/shared/cta-section.tsx`, `components/work/project-card.tsx`, `components/industries/industry-card.tsx`, `components/home/process.tsx`: all reusable as-is.
- `components/motion/reveal-observer.tsx`: re-scans on pathname change, so `data-reveal` works on new pages with no changes.
- `app/not-found.tsx`: header-offset pattern `pt-[calc(var(--header-height)+…)]` reused for page heroes.
- `public/work/*/cover.webp`: one real screenshot each for Noah and LongNile; nothing for Hayat.

## Source facts for the case studies (verified 2026-11-20)

**Noah Barbershop**, live site scraped today:
- A single-page site plus a `/barbers` page. Services menu with ETB starting prices; each service's "Book" link opens the barber list with that service preselected (`/barbers?service=…`).
- Barber profiles with photo, specialities and each barber's own contact options (call, WhatsApp with a prefilled message, Telegram), marked "calls only" or "messages only" where that applies.
- Linked Tripadvisor rating and quoted reviews (the client's real reviews, which we cite as *their* content, not as reviews of Avenor), opening hours, map and directions, sticky mobile Book/Call bar, and a staff sign-in.
- Stack seen in the page source: React, Vite, Supabase (barber media), hosted on Vercel.

**LongNile**, from the local repo `Desktop/longnile` (CLAUDE.md, `src/app`):
- Next.js App Router, TypeScript, Tailwind CSS 4, English and Amharic (next-intl), Resend email.
- Quote request form with cargo details and a contact form, both validated on the server, with a honeypot, rate limiting and a reference number in the confirmation emails.
- Animated Addis Ababa–Djibouti corridor map in the hero, services pages and blog drafts.
- Shipment tracking page runs on sample data only, so the case study either leaves it out or labels it as a prototype.

**Hayat Herbal**: AGENTS.md direction only (website redesign, product catalog, brand presentation, product discovery). No public URL, no screenshots.

## Design decisions

1. **One shared page hero.** New `PageHero` (dark charcoal, eyebrow, serif H1, intro, optional breadcrumbs and actions) with header-height top padding. Every new page opens with it, so the pages look like the homepage without copying the cinematic hero.
2. **Breadcrumbs** are a small visual component now (`Home / Work / Noah Barbershop`). BreadcrumbList JSON-LD is left for Phase 7 with the other structured data.
3. **Content stays in typed data files.** I'll extend the existing types rather than hardcode copy in pages:
   - `Service`: `description`, `deliverables: string[]`, `value` (what it changes for the business, no numbers), `industries` (which industry pages list it).
   - `Industry`: `intro`, `challenges: {title, body}[]`, `serviceSlugs`, `projectSlugs`, `accent` (for the switcher).
   - `Project`: `type`, `year?`, `challenge`, `strategy`, `solution: string[]`, `deliverables: string[]`, `technology: string[]`, `gallery: {src, alt, caption?}[]`, `placeholder?: true`.
4. **Services page.** I'll put all six services on one page, each in its own section with an anchor (`/services#booking-reservation-systems`) and alternating ivory and ivory-100 bands. Each section gets an icon, name, description, a "What's included" list, a "What it changes" paragraph and links to the relevant industry pages. The homepage service list items then link to these anchors. The page reuses the `Process` component and ends with the CTA section. Separate per-service routes would be thin pages, so I'm not making them for now.
5. **Industry switcher (§6.3 E)** goes on `/industries`. It's a small client component built on the WAI-ARIA tabs pattern: a `tablist` with two tabs, arrow-key and Home/End navigation, touch-friendly 44px targets. Switching changes the media panel, heading, description, accent line and CTA destination, with a 350ms opacity/translate crossfade (none under reduced motion). Both panels render on the server, and the inactive one is `hidden`, so the content works without JavaScript after the first tab. Below it, the two industry cards stay as plain links.
6. **Industry pages** share one `IndustryPage` template:
   - Hero
   - "What gets in the way": three challenges, each written as a plain observation, no statistics
   - "What we build": the relevant services as cards linking to the `/services` anchors
   - Relevant work
   - CTA ("Discuss Your Project")
   - **Hospitality has no case study yet.** I won't put a non-hospitality project there as if it were one. That section shows a short honest line ("Hospitality projects will appear here as they launch") plus a link to all work. Beauty & Wellness shows Noah.
7. **Work listing.** A single grid of `ProjectCard` with all three projects and an intro line. With three projects, an industry filter would add JavaScript without helping anyone, so there isn't one.
8. **Case study template** (`/work/[slug]`), in the order set in §9:
   1. Hero with breadcrumbs, name, a facts row (industry · type · status pill) and a "Visit live site" link (only when `liveUrl` exists, opens in a new tab with `rel="noopener noreferrer"`)
   2. Cover image in a large media panel (masked reveal)
   3. Challenge / Strategy / Solution as an editorial two-column layout (label left, text right; stacked on mobile)
   4. Gallery
   5. "What we delivered" (completed deliverables only) and "Built with" (technology list)
   6. Related projects (the other two)
   7. CTA

   I'll call `generateStaticParams` from `projects`, and `generateMetadata` gives each page its own title and description. An unknown slug calls `notFound()`.
9. **Gallery images.** I'll capture three to four more real screenshots each for Noah (live site) and LongNile (local `npm run start` of that repo, not the in-development preview, so the captures match the code), desktop and mobile. I'll save them as WebP at most 1600px wide under `public/work/<slug>/`, statically imported so they get sizes and blur placeholders. Hayat shows a typographic panel ("Screens will be added when the redesign is public") and no gallery.
10. **Honest status everywhere.** LongNile says "In Development" and describes only what exists in its repo. Hayat says "Redesign · In Progress", describes the planned scope as planned ("The redesign is built around…"), and gets `placeholder: true` so its copy is easy to find for review. No outcomes, metrics or testimonials anywhere.
11. **Copy.** New English copy follows §14 and goes through the humanizer skill before it lands. Banned words: seamless, cutting-edge, world-class, unparalleled, delve.
12. **No new dependencies.**

## Expected files

New:
- `components/layout/page-hero.tsx`, `components/layout/breadcrumbs.tsx`
- `components/services/service-detail.tsx`
- `components/industries/industry-switcher.tsx` (client), `components/industries/industry-page.tsx`
- `components/work/case-study-section.tsx`, `components/work/project-gallery.tsx`, `components/work/project-facts.tsx`
- `app/services/page.tsx`
- `app/industries/page.tsx`, `app/industries/hospitality/page.tsx`, `app/industries/beauty-wellness/page.tsx`
- `app/work/page.tsx`, `app/work/[slug]/page.tsx`
- `public/work/noah-barbershop/*.webp`, `public/work/longnile/*.webp` (gallery captures)

Changed:
- `lib/services.ts`, `lib/industries.ts`, `lib/projects.ts`: extended types and content as in decision 3
- `components/home/services-overview.tsx`: items link to `/services#<slug>`
- `app/globals.css`: switcher crossfade and gallery rules only if utilities don't cover them

## Assumptions

1. Services work better as one well-anchored page than as six thin routes. If you want per-service pages for SEO later, the data model already supports it.
2. Industry pages use the existing CSS warm-light media treatment until real hospitality and beauty photography is supplied. I won't use stock or generated imagery.
3. Quoting Noah's public Tripadvisor reviews in the Noah case study is fine because they are about Noah, not about Avenor. **I'll leave them out unless you say otherwise**, since a visitor could easily read them as testimonials for Avenor.
4. The case studies say nothing about who built what beyond "Avenor designed and built…". If any of these were team efforts or partly someone else's work, tell me.

## Security considerations

- No user input, forms or secrets in this phase.
- External links (`liveUrl`) are hardcoded in data, rendered with `rel="noopener noreferrer"` and `target="_blank"`, with an accessible "(opens in a new tab)" label.
- Screenshots are checked before committing so they contain no personal data beyond what the client publishes (barber names and public contact numbers already on Noah's site are acceptable only if cropped out or confirmed by you; **I'll crop the barber contact rows out by default**).

## Accessibility

- One H1 per page, logical H2/H3 order, `aria-labelledby` on sections.
- Breadcrumbs: `nav aria-label="Breadcrumb"`, `aria-current="page"` on the last item.
- Switcher: full ARIA tabs pattern, visible focus, works by keyboard and touch, nothing hover-only.
- Every gallery image gets descriptive alt text. Status is shown as text, not colour alone.

## Acceptance criteria

- [ ] `/services`, `/industries`, both industry pages, `/work` and all three `/work/<slug>` pages render; `/work/unknown` shows the 404 page.
- [ ] Every page has a unique title and meta description.
- [ ] The homepage service items link to their `/services` anchors, and the anchors land below the fixed header (`scroll-margin-top`).
- [ ] The industry switcher changes image, heading, description, accent and CTA, works with arrow keys, Home/End and tap, and is still readable with JavaScript disabled.
- [ ] Case studies contain only facts listed above. Hayat is flagged `placeholder: true`. No metrics, testimonials or invented logos.
- [ ] Gallery screenshots are real captures, optimised WebP, lazy-loaded below the fold, with alt text.
- [ ] Reveals and masked image reveals match the homepage. Reduced motion shows everything with no movement.
- [ ] No horizontal overflow at 360, 390, 412, 768, 1024, 1440px on every new page.
- [ ] No new dependencies. Type check, lint and production build pass.

## Checks

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build` (confirm the three `/work/[slug]` pages are prerendered)
4. Playwright on `npm run start`:
   - Visit every new route at 390 and 1440; screenshot; check `scrollWidth <= innerWidth` at all six widths.
   - Switcher: click, ArrowRight/ArrowLeft/Home/End; assert `aria-selected` and visible panel change.
   - Click a homepage service item; confirm it lands on the right `/services` section, not hidden under the header.
   - `/work/unknown` returns 404.
   - Reduced-motion emulation: no element left with opacity < 1.
   - Accessibility snapshot: heading order and breadcrumb markup on a case study.

## Manual test instructions

1. `npm run dev` and open http://localhost:3000.
2. On the homepage, click "Booking & Reservation Systems": you land on that section of `/services`.
3. Open `/industries`, switch between Hospitality and Beauty & Wellness with the mouse, then with Tab + arrow keys. Image, text and button change.
4. Open each industry page. Beauty shows Noah. Hospitality says no case study yet and links to all work.
5. Open `/work`, then each project. Check the status labels: Noah Live, LongNile In Development, Hayat Redesign · In Progress. Check that "Visit live site" appears only on Noah.
6. Resize to 390px and repeat a few pages; nothing should scroll sideways.
7. Read the case-study copy and confirm every claim is true; tell me anything that is wrong.
