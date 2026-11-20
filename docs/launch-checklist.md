# Launch checklist

These items are placeholders or drafts. Each one needs the owner's input or approval before the site launches. Search the code for `placeholder: true` to find them.

## Contact and business details (`lib/site.ts` → `contact`)

- [ ] Public contact email. Until it's set, the legal pages show "[contact email to be confirmed]".
- [ ] Operator name: the person or company that trades as Avenor Digital Studio. Shown in both legal pages.

## Legal pages (`lib/legal.ts`)

- [ ] Have the Privacy Policy and Terms of Service reviewed by someone qualified in Ethiopian law. The "Draft: pending legal review" notice shows outside production only, so **production shows these pages as final**.
- [ ] Enquiry retention period in the Privacy Policy ("[retention period to be confirmed]").
- [ ] Email delivery and enquiry storage providers in the Privacy Policy. Fill in during Phase 6, when they are chosen.
- [ ] Ask the reviewer about the data localisation rule in Proclamation No. 1321/2024: the site is hosted by Vercel, outside Ethiopia.
- [ ] Confirm permission from each client to show their name and screenshots on the site.

## About page (`lib/about.ts`)

- [ ] Confirm each of the five working principles is a commitment Avenor keeps, especially "Your site stays yours" (domain, content and accounts in the client's name).

## Insights (`lib/insights.ts`)

Drafts are visible in dev and on Vercel preview deployments, and return 404 in production. Set `published: true` to publish one.

- [ ] What a small hotel website needs before it can take direct enquiries
- [ ] Contact-based or real-time booking for your barbershop or salon
- [ ] What to prepare before you start a website project

## Portfolio (`lib/projects.ts`)

- [ ] Hayat Herbal case study copy is written from the brief, not from built work. Confirm or correct it.
