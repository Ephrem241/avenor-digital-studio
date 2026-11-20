# Enquiry form setup

The contact form saves each enquiry in Sanity and sends two emails through Resend: a notification to Avenor and a confirmation to the visitor. You manage enquiries in Sanity Studio, which lives in `studio/`.

Until the environment variables below are set, the form shows "We couldn't send your enquiry just now" and saves nothing. That is deliberate.

## 1. Sanity project and private dataset

1. Create a free project at https://www.sanity.io/manage (or run `npx sanity@latest init --bare` inside `studio/`). Note the **project ID**.
2. Create a **private** dataset for enquiries:

   ```sh
   cd studio
   npx sanity dataset create enquiries --visibility private
   ```

   It has to be private. A public dataset lets anyone who knows the project ID read every enquiry.
3. Check it: in Manage → Datasets, `enquiries` should say **Private**.

## 2. Write token for the website

Manage → API → Tokens → Add API token:

- Name: `website-enquiries`
- Permissions: **Editor**
- Copy the token into `SANITY_API_WRITE_TOKEN`. It is shown once.

The token stays on the server. Never give it a `NEXT_PUBLIC_` prefix.

## 3. Studio

```sh
cd studio
cp .env.example .env        # set SANITY_STUDIO_PROJECT_ID
npm install
npm run dev                 # http://localhost:3333
npm run deploy              # hosts it at https://<name>.sanity.studio
```

- Put the deployed Studio URL in `SANITY_STUDIO_URL` so notification emails link to the enquiry.
- Access: invite people under Manage → Members. Only members can sign in to the Studio.
- In the Studio: open an enquiry, change its **Status** (New, Contacted, Qualified, Proposal Sent, Won, Lost) and add **Internal notes**. The submitted fields are read-only. The lists in the left column filter by status, and the search box covers name, business, email and reference.

## 4. Resend

1. Create an account at https://resend.com and add your domain under Domains. Add the DNS records it shows and wait for "Verified".
2. Create an API key with "Sending access" → `RESEND_API_KEY`.
3. `RESEND_FROM_EMAIL`: a sender on the verified domain, for example `Avenor Digital Studio <enquiries@yourdomain.com>`.
4. `ENQUIRY_NOTIFY_EMAIL`: the inbox that should receive new enquiries.

Before the domain is verified, Resend's test sender (`onboarding@resend.dev`) only delivers to the address you signed up with. Confirmation emails to visitors won't arrive until the domain is verified.

## 5. Secret

`ENQUIRY_SECRET` signs the form's timestamp and hashes IP addresses. Use at least 32 random characters:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Changing it later is safe. Forms open at that moment have to be reloaded, and the rate limit starts again from zero.

## 6. Local and Vercel environment

- Local: copy `.env.example` to `.env.local` and fill it in.
- Vercel: Project → Settings → Environment Variables. Add every variable for Production and Preview. Previews then write to the same dataset, so test enquiries from previews show up in the Studio. Delete them there, or use a separate dataset for Preview.

## How the form protects itself

- The server checks every field again. The browser checks are only a convenience.
- A hidden field that people never see. If it's filled in, the submission is refused.
- A signed "form opened at" time. Submissions sent less than 3 seconds after the page loads, or more than 24 hours after, are refused.
- Rate limits: 3 enquiries per hour from one connection, 5 per day from one email address. They are counted from saved enquiries, so no extra service is needed. If spam still gets through, Cloudflare Turnstile is the next step (ask first).
- If an email fails, the enquiry is still saved, and the Studio's **System → Emails** field says which email failed.
- Logs record the reference and the type of error only, never the message, email or phone number.
