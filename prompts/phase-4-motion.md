# Phase 4 — Motion system

## Objective

Give the homepage the Avenor motion language from AGENTS.md §6: a cinematic hero entrance, restrained scroll reveals, masked image reveals, a service marquee and refined card hover. Every effect respects `prefers-reduced-motion`, never hides content when JavaScript is unavailable, and adds almost no client JavaScript.

## Skills and docs consulted

- AGENTS.md §6 (motion), §7 (responsive), §15 (components), §16 Phase 4.
- Owner conventions: `motion` used sparingly, CSS reveals by default; no hype words in copy.
- Next.js 16 docs in `node_modules/next/dist/docs/01-app` (Server vs Client Components, `usePathname`).

## Existing code inspected

- `lib/motion.ts`: motion tokens already exist; `app/globals.css` mirrors the easings as `--ease-standard/enter/exit`.
- `app/globals.css`: global reduced-motion rule already shortens all transitions and animations.
- `components/layout/site-header.tsx` + `mobile-menu.tsx`: pattern G (solid-on-scroll header, drawer fade, staggered links, Escape, focus trap, scroll lock) is **already implemented in Phase 2**. No change except the homepage entrance below.
- `components/home/*`, `industry-card.tsx`, `project-card.tsx`, `cta-section.tsx`, `section-heading.tsx`: all Server Components with no motion yet.
- `package.json`: no animation library installed.

## Design decisions

1. **No new dependency.** Everything here is achievable with CSS transitions/keyframes plus one ~40-line IntersectionObserver component. Installing `motion` (~30 kB+) for one-shot reveals is not justified. It stays available for a future case that needs it (e.g. a layout-animated switcher).
2. **One observer, no wrappers.** A single client component `RevealObserver`, mounted once in the root layout, finds `[data-reveal]` elements, sets `data-revealed` when each enters the viewport, then stops observing it. Section components remain Server Components; they only gain a `data-reveal` attribute.
3. **Content is never hidden without JS.** The hidden pre-reveal state applies only under `html[data-reveal-ready]`, which `RevealObserver` sets after it mounts. If JS fails, everything is visible.
4. **Reduced motion.** Pre-reveal hiding also requires `prefers-reduced-motion: no-preference`. Under reduced motion: no reveals, hero appears without movement, marquee becomes a static centred list, hover scale is off.
5. **Industry switcher (§6.3 E) is deferred to Phase 5** for the `/industries` overview page. The homepage keeps the two cards from the reference; adding a switcher here would duplicate them.
6. **Optional 3D (§6.3 H) is not included.** It is optional for the MVP.

## Motion patterns

### A. Hero entrance (CSS keyframes, no JS)

Sequence, total ≈1.6s, all `opacity`/`transform`, `animation-fill-mode: both`:

| t (ms) | Element | Effect |
|---:|---|---|
| 0 | Media layer | fade 0→1, scale 1.06→1 over 1.2s |
| 150 | Overlay | fade in 0.8s |
| 300 | Eyebrow | fade + rise 12px |
| 420 / 540 | Headline lines | each line rises out of an `overflow: clip` mask (translateY 105%→0), 0.8s, ease-enter |
| 800 | Supporting copy | fade + rise 12px |
| 950 | CTA row | fade + rise 12px |
| 1100 | Keyword row + header | fade in |

- The headline becomes two `<span class="block">` lines ("Your business deserves" / "a better digital experience."), each inside a mask. Natural wrapping inside each line is preserved, so mobile still wraps correctly. The accessible name of the `<h1>` is unchanged.
- The header entrance runs only on the homepage, via `html:has([data-hero]) [data-site-header]`.
- Nothing blocks interaction: links are clickable during the sequence.

### B. Editorial scroll reveals

Variant `data-reveal` (default "up"): opacity 0→1, translateY 24px→0, 0.8s, ease-enter. Optional stagger via `style={{"--reveal-index": n}}` (80ms per step, max 5 steps).

Applied to **selected** elements only:

- `SectionHeading` (once per section, through a `reveal` prop that defaults to true).
- Industry cards (stagger 0, 1).
- Service list as one block (not each item).
- Project cards (stagger 0–2).
- Process steps (stagger 0–5, reduced to one block below 1024px so mobile isn't a long chain).
- CTA section content block.

Not animated: body paragraphs, buttons on their own, footer.

### C. Masked image reveal

Variant `data-reveal="mask"` on the project card media and on industry card media (when an image exists): `clip-path: inset(0 0 100% 0)` → `inset(0)` over 1.2s, inner image scale 1.08 → 1. Used for these two card types only.

### D. Service marquee

New `components/home/service-marquee.tsx` (Server Component, pure CSS):

- Copy: WEBSITES · BOOKINGS · AUTOMATION · SEO · GROWTH, from a new `marqueeKeywords` export in `lib/site.ts` (the hero's shorter `serviceKeywords` stays as is).
- Placement: a slim charcoal-900 band between Featured Work (ivory) and Process (dark), where the page needs a transition. Serif `text-h3`, ivory with gold separators.
- Two identical tracks animated with `translateX(-50%)`, linear, ~40s per loop, so the loop has no visible seam and speed is constant.
- Pauses on hover (pointer devices) and on `:focus-within`.
- Accessibility: the first track is a real `<ul aria-label="Services">`; the duplicate is `aria-hidden="true"`, so screen readers hear the list once.
- Reduced motion: animation off, duplicate hidden, list wraps and centres.

### F. Portfolio and industry card hover

Gated by `@media (hover: hover) and (pointer: fine)`, so touch devices never depend on it; all content stays visible without hover.

- Project card: image `scale(1.03)` over 0.55s, a charcoal overlay at 12% opacity, title `translateX(2px)`, arrow `translateX(4px)` (existing).
- Industry card: media layer `scale(1.03)`; existing underline/arrow behaviour kept.

### G. Navigation

Already done in Phase 2. Only the homepage entrance fade is added (see A).

## Expected files

New:

- `components/motion/reveal-observer.tsx` — client component; one IntersectionObserver (`rootMargin: "0px 0px -10% 0px"`, threshold 0.15), re-scans on `pathname` change, sets `data-reveal-ready` on `<html>`.
- `components/home/service-marquee.tsx`.

Changed:

- `app/globals.css` — keyframes, `[data-reveal]` rules, mask variant, marquee, hover rules, reduced-motion overrides. Durations reference the §6.2 token values.
- `app/layout.tsx` — mount `<RevealObserver />`.
- `app/page.tsx` — insert `<ServiceMarquee />`.
- `components/home/hero.tsx` — `data-hero`, line masks, per-element entrance classes.
- `components/layout/site-header.tsx` — `data-site-header` attribute only.
- `components/ui/section-heading.tsx` — `reveal` prop.
- `components/home/intro-industries.tsx`, `services-overview.tsx`, `featured-work.tsx`, `process.tsx`, `components/shared/cta-section.tsx` — `data-reveal` attributes.
- `components/industries/industry-card.tsx`, `components/work/project-card.tsx` — hover/mask hooks.
- `lib/site.ts` — `marqueeKeywords`.

No new dependencies.

## Assumptions

1. A CSS + IntersectionObserver approach satisfies "Motion for React preferred" in spirit: AGENTS.md §6.1 also says CSS for simple interactions and no unnecessary libraries.
2. Browsers without `:has()` (very old) simply skip the header entrance; everything else works.
3. The hero media layer stays the CSS placeholder; the entrance is written so a future `next/image` inside the media layer gets the same fade/scale.

## Performance

- Only `opacity`, `transform` (`translate`/`scale`) and a one-shot `clip-path` animate. No blur, no layout properties.
- Elements are unobserved after revealing; the observer disconnects on unmount.
- Expected client JS added: under 1 kB gzipped.
- No layout shift: hidden states use transforms/opacity only, so boxes keep their size.

## Security considerations

None introduced: no user input, no network calls, no secrets.

## Accessibility

- Reduced motion fully honoured (see decision 4).
- Headline masking does not change the heading's text or reading order.
- Marquee announced once; it can be paused (hover/focus) and is static under reduced motion. The same keywords also appear as static text in the hero.
- No information is conveyed only by motion. Focus rings are unaffected.

## Acceptance criteria

- [ ] Hero plays the entrance in ≈1.6s on first load; links clickable throughout.
- [ ] Section headings, industry cards, services block, project cards, process steps and CTA reveal once on scroll; paragraphs do not animate individually.
- [ ] Project card images reveal through a mask.
- [ ] Marquee loops without a visible seam at constant speed, pauses on hover, is read once by screen readers.
- [ ] Card hover effects appear only on hover-capable pointers; nothing is hidden on touch.
- [ ] With `prefers-reduced-motion: reduce`: no movement, everything visible, marquee static.
- [ ] With JavaScript disabled: all content visible.
- [ ] No horizontal overflow at 360, 390, 412, 768, 1024, 1440px (marquee included).
- [ ] No new dependencies. Type check, lint and production build pass.

## Checks

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Playwright on `npm run start`:
   - Screenshots mid-entrance (≈300ms) and after (2s) at 1440 and 390.
   - Scroll the page; confirm every `[data-reveal]` ends with `data-revealed`.
   - `scrollWidth <= innerWidth` at all six widths.
   - Emulate `prefers-reduced-motion: reduce`: confirm the marquee is static and no element has opacity < 1.
   - Load with JavaScript disabled: confirm no element has opacity < 1.
   - Accessibility snapshot: marquee keywords appear once.

## Manual test instructions

1. `npm run dev`, open http://localhost:3000 and hard-reload: watch the hero sequence (background → eyebrow → headline lines → copy → buttons → header).
2. Scroll slowly: headings and cards rise in once each; scrolling back up does not replay them.
3. Hover a project card on desktop: image zooms slightly, title and arrow shift.
4. Hover the marquee band: it pauses.
5. In DevTools → Rendering, set "prefers-reduced-motion: reduce" and reload: nothing moves, all content is visible, marquee is a static row.
6. Switch to 390px: the entrance still plays, process steps reveal as one block, no sideways scroll.
