# Avenor Digital Studio

Website for Avenor Digital Studio, a studio that builds websites, booking flows and enquiry systems for hospitality and beauty businesses.

The site has public pages (home, services, industries, work, about, insights, contact, legal) and a project enquiry form. Enquiries are saved in Sanity and managed in a separate Sanity Studio. Resend sends the emails.

## Stack

| Part | Version / service |
|---|---|
| Framework | Next.js 16.4 (App Router, `cacheComponents`, Turbopack) |
| UI | React 19.3, Tailwind CSS 4.3 (CSS-first config in `app/globals.css`) |
| Icons | lucide-react |
| Validation | zod 4 |
| Enquiry storage | Sanity (private dataset) via `@sanity/client` |
| Enquiry admin | Sanity Studio 6 in `studio/`, deployed separately |
| Email | Resend |
| Hosting | Vercel |

Motion is plain CSS with one small `IntersectionObserver` component. There is no animation library.

## Local setup

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Every page works without the enquiry variables. Without them the contact form shows a "couldn't send" message instead of saving, which is expected locally.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

### Sanity Studio (enquiry admin)

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # publishes to <name>.sanity.studio
```

The Studio has its own `package.json` and is left out of the website's type check, lint and build.

## Environment variables

All names are listed in [.env.example](.env.example). Set them in `.env.local` for development and in Vercel → Project → Settings → Environment Variables for deployments.

| Variable | Needed for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Enquiry form | Not secret |
| `NEXT_PUBLIC_SANITY_DATASET` | Enquiry form | Must be a **private** dataset |
| `SANITY_API_WRITE_TOKEN` | Enquiry form | Editor token. Server only, never prefix with `NEXT_PUBLIC_` |
| `SANITY_STUDIO_URL` | Optional | Adds an "Open in Studio" link to notification emails |
| `RESEND_API_KEY` | Enquiry emails | |
| `RESEND_FROM_EMAIL` | Enquiry emails | Sender on a domain verified in Resend |
| `ENQUIRY_NOTIFY_EMAIL` | Enquiry emails | Inbox that receives new enquiries |
| `ENQUIRY_SECRET` | Enquiry form | 32+ random characters; signs the form token and hashes IPs |
| `NEXT_PUBLIC_SITE_URL` | SEO | Final domain, e.g. `https://example.com`. Falls back to Vercel's production URL |

The step-by-step setup for Sanity, the Studio and Resend is in [docs/enquiries-setup.md](docs/enquiries-setup.md).

## Deploying to Vercel

1. Import the repository in Vercel. The framework preset (Next.js) and default build settings work as they are.
2. Add the environment variables above for **Production** and **Preview**.
3. Once the domain is connected, set `NEXT_PUBLIC_SITE_URL` for Production and redeploy.
4. Pushes to `main` deploy to production. Other branches get preview URLs.

How production differs from previews and local builds (`VERCEL_ENV`):

- `robots.txt` allows indexing only on the production deployment. Previews and local builds return `Disallow: /`.
- Draft insights articles (`published: false` in `lib/insights.ts`) show in development and previews and return 404 in production.
- The "Draft: pending legal review" notice on the legal pages shows outside production only.

On the Vercel Hobby plan, deployments are blocked unless the commit author is the GitHub account that owns the project. Commit with that account's GitHub `noreply` address.

Before launch, work through [docs/launch-checklist.md](docs/launch-checklist.md). It lists every placeholder and every decision still open.

## Project map

```text
app/          Routes, metadata files (sitemap, robots, icons, share images), Server Action for the form
components/   UI by area: layout, home, services, industries, work, contact, seo, ui (primitives)
lib/          Typed content (services, projects, industries, insights, legal), SEO helpers, enquiry logic
public/       Portfolio screenshots
assets/       Fonts used only for generating share images
studio/       Sanity Studio for managing enquiries (separate app)
docs/         Enquiry setup guide and launch checklist
```

Page content lives in typed files in `lib/`, not in a CMS. Edit those files to change copy, projects or articles.

## Security headers

`next.config.ts` sends `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy` on every route. There is no Content-Security-Policy yet. It needs nonces or hashes for the inline scripts, and it's tracked in the launch checklist.
