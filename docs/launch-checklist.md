# Launch checklist

These items are placeholders or drafts. Each one needs the owner's input or approval before the site launches. Search the code for `placeholder: true` to find them.

## Contact and business details (`lib/site.ts` → `contact`)

- [ ] Public contact email. Until it's set, the legal pages show "[contact email to be confirmed]".
- [ ] Operator name: the person or company that trades as Avenor Digital Studio. Shown in both legal pages.

## Legal pages (`lib/legal.ts`)

- [ ] Have the Privacy Policy and Terms of Service reviewed by someone qualified in Ethiopian law. The "Draft: pending legal review" notice shows outside production only, so **production shows these pages as final**.
- [ ] Enquiry retention period in the Privacy Policy ("[retention period to be confirmed]").
- [x] Email delivery and enquiry storage providers in the Privacy Policy (Sanity and Resend, added in Phase 6).
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

## Enquiry form (`/contact`, see `docs/enquiries-setup.md`)

- [ ] Create the Sanity project and a **private** `enquiries` dataset. Confirm it shows "Private" in Manage.
- [ ] Set every variable in `.env.example` on Vercel (Production and Preview).
- [ ] Verify the sending domain in Resend; choose `RESEND_FROM_EMAIL` and `ENQUIRY_NOTIFY_EMAIL`.
- [ ] Deploy the Studio (`cd studio && npm run deploy`) and invite only the people who should see enquiries.
- [ ] Budget ranges on the form (`lib/enquiry/options.ts`, USD) are placeholders. Confirm or replace them.
- [ ] "What happens next" (`components/contact/next-steps.tsx`) promises that a person reads every enquiry and that we reply by the chosen method. Confirm, and add a response time if you want to promise one.
- [ ] Send one real test enquiry on production. Check both emails arrive and the enquiry appears in the Studio, then delete it.

## SEO and sharing (Phase 7)

- [ ] Set `NEXT_PUBLIC_SITE_URL` on Vercel (Production) to the final domain, then redeploy. Until then canonicals, the sitemap and share cards use the Vercel production alias.
- [ ] Send the official logo file. The favicon (`app/icon.svg`), Apple touch icon (`app/apple-icon.tsx`), share cards (`lib/og.tsx`) and the Organization `logo` in structured data use the placeholder monogram.
- [ ] Confirm `areaServed: "Worldwide"` in the Organization structured data (`lib/structured-data.ts`), or give the countries you serve.
- [ ] Confirm the darker secondary text grey (`--color-stone-500`, #6B6A64 instead of the brief's #77766F, which fails contrast on ivory).
- [ ] After launch: open `https://<domain>/robots.txt` (should allow) and a preview URL's `/robots.txt` (should disallow), then submit `https://<domain>/sitemap.xml` in Google Search Console.
- [ ] Check the homepage and `/services` in https://validator.schema.org and a share card in a WhatsApp or LinkedIn message.

## Security and QA (Phase 8)

- [ ] Decide whether to add a Content-Security-Policy. Baseline headers are in `next.config.ts`; a CSP needs nonces or hashes for the inline JSON-LD and Next.js scripts, and switches pages to dynamic rendering if nonces are used. Worth doing once third-party scripts (e.g. analytics) are added.
- [ ] On a real phone: open and close the menu, tap every CTA, and send the test enquiry above.
- [ ] Turn on "Reduce motion" in the phone's settings and reload the homepage: nothing should move, nothing should be missing.
