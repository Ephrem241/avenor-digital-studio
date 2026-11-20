# Phase 2 — Avenor Design System Foundation

## Objective

Replace the Create Next App boilerplate with the Avenor brand foundation defined in AGENTS.md §4 and shown in `design/Avenor Digital Studio Luxury Homepage (1).png` (desktop) and `design/Avenor Digital Studio Mobile Homepage (1).png` (mobile): tokens, fonts, layout primitives, buttons, header with mobile drawer, footer, and reusable section components.

The full homepage (industry cards, services, portfolio, process, CTA) is Phase 3. This phase ships only a hero section on `/` so the foundation can be reviewed in a browser instead of a blank page.

## Skills and docs consulted

- AGENTS.md §4 (design system), §6.2 (motion tokens), §7 (responsive), §14 (copy), §15 (components).
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` and `03-api-reference/02-components/font.md` (`next/font/google`, `variable` option, variable fonts need no `weight`).
- Memory: owner conventions (humanizer on copy, no hype words, Tailwind v4 CSS-first, `motion` used sparingly with CSS by default), portfolio facts.

## Existing code inspected

| Item | Finding |
|---|---|
| Framework | Next.js 16.4.6, React 19.3.0, TypeScript 5, App Router |
| Styling | Tailwind 4.3.3 through `@tailwindcss/turbopack` loader in `next.config.ts` (no PostCSS config) |
| Config flags | `cacheComponents`, `partialPrefetching`, `experimental.agentFeedback` — left unchanged |
| Routes | Only `app/page.tsx` (boilerplate) and `app/layout.tsx` (Geist fonts, placeholder metadata) |
| Assets | `public/` holds only Next/Vercel SVGs. No logo, no photography |
| Dependencies | No Motion, Lucide, shadcn or `clsx` installed |
| Path alias | `@/*` → `./*` |

Nothing working is removed except the boilerplate page, Geist fonts and the default Next/Vercel SVGs (unused after this change).

## Design decisions

### Tokens (`app/globals.css`, Tailwind v4 `@theme`)

- Colors exactly as AGENTS.md §4.2: `charcoal-950/900/800`, `ivory-50/100/200`, `gold-400/500/700`, `stone-300/500`, `white`. Usable as `bg-charcoal-950`, `text-gold-500`, etc.
- Fonts: `--font-serif` → Playfair Display, `--font-sans` → Inter (both variable, loaded with `next/font/google`, `display: swap`). Manrope not loaded (alternative only; avoids an extra font request).
- Type scale as utilities (`text-display`, `text-h1` … `text-caption`) with fluid `clamp()` from the mobile to the desktop sizes in §4.3, tight line-height on headings.
- Spacing scale `--space-1` … `--space-32` as CSS variables (Tailwind's default 4px scale already matches, so utilities like `p-16` stay usable).
- Radius: `rounded-control` (8px), `rounded-card` (12px), `rounded-media` (20px), `rounded-full` for pills.
- Section spacing: `.section` utility = 64–80px mobile, 80–100px tablet, 112–144px desktop.
- Container: `.container-avenor` max 1440px with 20 / 32 / 64px side padding; `.content` 1240px; `.reading` 720px.
- Light site only. No `prefers-color-scheme` dark swap: the brand alternates dark and light sections deliberately (§4.2).
- Global focus ring: 2px gold-400 outline with offset, visible on dark and light.
- `prefers-reduced-motion`: global rule reducing transitions/animations to near-zero.

### Motion

- `lib/motion.ts` exports `motionTokens` verbatim from §6.2 for later phases.
- No animation library installed in this phase. Header solid-on-scroll and the drawer use CSS transitions. Motion for React gets installed in Phase 4 when the hero entrance and reveals are built.

### Components (`components/`)

| File | Type | Purpose |
|---|---|---|
| `ui/button.tsx` | Server | `ButtonLink` (Next `Link`) and `Button`; variants `primary` (gold pill, charcoal text), `outline-light` (on dark), `outline-dark` (on ivory), `text` (underlined link + arrow). Sizes `md`/`lg`; min touch height 44px |
| `ui/eyebrow.tsx` | Server | Small uppercase tracked label (`DIGITAL GROWTH STUDIO`), gold-on-dark or gold-700-on-ivory for contrast |
| `ui/section-heading.tsx` | Server | Eyebrow + serif heading + optional intro paragraph; `tone="dark" \| "light"`; heading level prop |
| `ui/section.tsx` | Server | `<section>` with tone (`dark` charcoal-950, `dark-alt` charcoal-900, `light` ivory-50, `light-alt` ivory-100) and section spacing |
| `ui/container.tsx` | Server | Wraps `.container-avenor` |
| `brand/logo.tsx` | Server | Inline SVG "A" monogram in gold + "AVENOR / DIGITAL STUDIO" wordmark; `compact` variant for mobile |
| `layout/site-header.tsx` | Client | Fixed header, transparent over hero, solid charcoal after 24px scroll; desktop nav + "Start a Project" pill; hamburger under 1024px |
| `layout/mobile-menu.tsx` | Client | Drawer with staggered link entrance (CSS), Escape closes, focus moves into drawer and returns to the trigger, `inert` on background, body scroll locked only while open, closes on route change |
| `layout/site-footer.tsx` | Server | Logo + tagline, nav, legal links, current-year copyright |
| `home/hero.tsx` | Server | Eyebrow, H1 "Your business deserves a better digital experience.", supporting copy, Start a Project / Explore Our Work, static service line `WEBSITES · BOOKINGS · AUTOMATION · GROWTH` (marquee comes in Phase 4) |

### Data (`lib/`)

- `lib/site.ts`: typed `navigation` (Home, Services, Industries, Work, About, Insights, Contact), `legalLinks`, brand name, tagline. Header and footer read from one source.
- `lib/cn.ts`: tiny class-joining helper (no `clsx` dependency).

### Icons

Install `lucide-react` (AGENTS.md §10 preference) for arrow, menu, close and chevron icons. Only dependency added in this phase.

### Hero imagery

No real photography exists in the repo. The hero uses a charcoal background with a warm gold radial glow and a fine grain, built in CSS. It is structured for a `next/image` background (`priority`, `sizes="100vw"`, dark overlay) so the real image drops in with one prop. I will not use stock resort photos that could pass as client work.

### Layout behavior

- Header: 72px mobile, 88px desktop. Desktop nav ≥1024px. "Start a Project" pill shown in the header from 768px up; on mobile it lives inside the drawer and the hero.
- Hero: min-height `100svh`, content bottom-aligned on mobile and left-column on desktop, headline max ~11ch per line so it breaks like the reference, CTAs stack full-width under 400px and sit side by side above that.
- Footer: stacked on mobile, three-column row on desktop, legal row underneath.

### Social icons

The reference footer shows LinkedIn, Instagram and YouTube. No accounts are known, so they are left out (not rendered as dead links).

## Assumptions

1. "Implement the design system" means AGENTS.md Phase 2, not the full homepage.
2. The gold "A" monogram SVG I draw is a stand-in. If you have a logo file, I will swap it in.
3. Nav links point to the intended routes (`/services`, `/industries`, `/work`, `/about`, `/insights`, `/contact`, `/privacy-policy`, `/terms`). These pages do not exist yet and will 404 until Phase 5. "Industries" is a plain link for now, without the dropdown.
4. Site metadata: title "Avenor Digital Studio", description = the positioning sentence. Full SEO is Phase 7.

## Expected files

New:
- `lib/motion.ts`, `lib/site.ts`, `lib/cn.ts`
- `components/ui/{button,eyebrow,section-heading,section,container}.tsx`
- `components/brand/logo.tsx`
- `components/layout/{site-header,mobile-menu,site-footer}.tsx`
- `components/home/hero.tsx`

Modified:
- `app/globals.css` (replaced with tokens and base styles)
- `app/layout.tsx` (fonts, metadata, header/footer shell, skip link)
- `app/page.tsx` (boilerplate replaced with hero)
- `package.json` / `package-lock.json` (`lucide-react`)

Deleted:
- `public/{file,globe,next,vercel,window}.svg` (boilerplate, unused)

## Security considerations

No user input, no network calls, no secrets. External links (none in this phase) would use `rel="noopener noreferrer"`.

## Accessibility

- Skip-to-content link.
- `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>` landmarks.
- Drawer: `aria-expanded`, `aria-controls`, `role="dialog"` + `aria-modal`, Escape, focus return.
- Gold text only for labels and large type; body text on dark uses ivory/stone-300, on light uses charcoal/stone-500. Small gold text on ivory uses gold-700.
- Touch targets ≥44px.

## Acceptance criteria

- [ ] No Create Next App content remains.
- [ ] All AGENTS.md §4.2 colors available as Tailwind utilities.
- [ ] Playfair Display on headings, Inter on body/nav/buttons, self-hosted via `next/font`.
- [ ] Header transparent over the hero, solid after scrolling.
- [ ] Mobile drawer opens/closes, Escape works, focus is trapped and returned, page does not scroll behind it.
- [ ] Hero matches the reference composition at desktop and mobile with real Avenor copy.
- [ ] Footer matches the reference layout without social icons.
- [ ] Reduced motion disables transitions.
- [ ] No horizontal overflow at 360, 390, 412, 768, 1024, 1440px.

## Checks

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Playwright: screenshots at 360, 390, 412, 768, 1024, 1440; `document.documentElement.scrollWidth <= innerWidth` at each; open/close drawer via keyboard; reduced-motion emulation.

## Manual test instructions

1. `npm run dev`, open http://localhost:3000.
2. Scroll a little: header turns solid charcoal.
3. Narrow the window below 1024px: hamburger appears. Open it, Tab through links, press Escape. Focus returns to the hamburger.
4. Compare the hero and footer with the two reference images.
5. In DevTools → Rendering, enable "prefers-reduced-motion: reduce" and confirm the drawer appears without animation.
