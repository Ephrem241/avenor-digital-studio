import type { ContentBlock, Inline } from "@/lib/content-blocks";
import { contact } from "@/lib/site";

/**
 * Privacy Policy and Terms of Service. Written for "Avenor Digital Studio" as a trading
 * name under Ethiopian law. Drafts pending legal review: see docs/launch-checklist.md.
 */
export type LegalDocument = {
  slug: "privacy-policy" | "terms";
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  updated: string;
  blocks: ContentBlock[];
  placeholder: true;
};

const email: Inline = contact.email
  ? { text: contact.email, href: `mailto:${contact.email}` }
  : { placeholder: "contact email to be confirmed" };

const operator: Inline = contact.operatorName ?? { placeholder: "operator name to be confirmed" };

const whoWeAre: ContentBlock = {
  type: "p",
  text: [
    "Avenor Digital Studio is a trading name used by ",
    operator,
    `, based in ${contact.country}. In this document, “we” and “us” mean Avenor Digital Studio. You can reach us at `,
    email,
    ".",
  ],
};

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "What personal information Avenor Digital Studio collects through this website, why, who handles it and how to ask us to change or delete it.",
  updated: "2026-11-21",
  placeholder: true,
  blocks: [
    {
      type: "p",
      text: "This policy explains what personal information Avenor Digital Studio collects through this website, why we collect it and what we do with it.",
    },
    { type: "h2", text: "Who we are" },
    whoWeAre,
    { type: "h2", text: "When you visit the site" },
    {
      type: "p",
      text: "When you load a page, our hosting provider, Vercel, records standard technical information such as your IP address, your browser type, the page you asked for and the time of the request. We use this to keep the site running and secure, and not to identify you.",
    },
    {
      type: "p",
      text: "The site does not use analytics, advertising or tracking cookies. If we add analytics, we will update this policy first.",
    },
    { type: "h2", text: "When you contact us" },
    {
      type: "p",
      text: "When you send us an enquiry, through our enquiry form or by email, we collect the information you give us. On the enquiry form that is:",
    },
    {
      type: "ul",
      items: [
        "your name and business email address",
        "your business name and, if you give it, your website address",
        "your country and industry",
        "the service you're interested in, your budget range and your timeline",
        "a description of your project",
        "how you'd like us to contact you, and a phone or WhatsApp number if you choose either",
      ],
    },
    {
      type: "p",
      text: "We use this information to reply to you, to discuss and plan your project, and to keep a record of our conversation. We don't sell it, and we don't send you marketing unless you ask us to.",
    },
    { type: "h2", text: "Who else handles your information" },
    { type: "p", text: "We use a small number of service providers to run the site and handle enquiries:" },
    {
      type: "ul",
      items: [
        "Vercel, which hosts this website",
        "Sanity, which stores the enquiries you send through the form",
        "Resend, which delivers our notification and the confirmation email we send you",
      ],
    },
    {
      type: "p",
      text: "Some of these providers store or process information on servers outside Ethiopia. We choose providers that publish their own security and privacy commitments.",
    },
    { type: "h2", text: "How long we keep it" },
    {
      type: "p",
      text: [
        "We keep an enquiry for as long as we need it to discuss your project. If no project goes ahead, we delete it ",
        { placeholder: "retention period to be confirmed" },
        " after our last contact. If we work together, we keep project records for as long as our agreement and the law require.",
      ],
    },
    { type: "h2", text: "Your rights" },
    {
      type: "p",
      text: [
        "Under Ethiopia's Personal Data Protection Proclamation No. 1321/2024, you can ask to see the personal information we hold about you, ask us to correct or delete it, and object to how we use it. To make a request, email ",
        email,
        ". We may need to confirm your identity before we act on it.",
      ],
    },
    { type: "h2", text: "Security" },
    {
      type: "p",
      text: "Only the people who need to reply to an enquiry can see it, and they have to sign in to do so. The passwords and keys for our systems are kept out of the website's code.",
    },
    {
      type: "p",
      text: "To stop spam, the form limits how many enquiries can be sent from one connection. For this we keep a scrambled, one-way code made from your IP address, not the address itself.",
    },
    { type: "h2", text: "Changes to this policy" },
    {
      type: "p",
      text: "If we change how we handle personal information, we will update this page and the date at the top.",
    },
  ],
};

export const terms: LegalDocument = {
  slug: "terms",
  title: "Terms of Service",
  description:
    "The terms for using the Avenor Digital Studio website, including content ownership, links, liability and governing law.",
  updated: "2026-11-21",
  placeholder: true,
  blocks: [
    {
      type: "p",
      text: "These terms apply to your use of the Avenor Digital Studio website. By using the site, you agree to them.",
    },
    { type: "h2", text: "Who we are" },
    whoWeAre,
    { type: "h2", text: "Using the site" },
    {
      type: "p",
      text: "You can browse the site, read its content and contact us through it. Please don't try to disrupt the site, reach parts of it that aren't public, or use it to send spam or harmful content.",
    },
    { type: "h2", text: "Content and intellectual property" },
    {
      type: "p",
      text: "Unless we say otherwise, the text, design and graphics on this site belong to Avenor Digital Studio. The names, screenshots and content of client projects belong to those clients.",
    },
    {
      type: "p",
      text: "You're welcome to link to our pages. Please ask us before you copy or republish our content.",
    },
    { type: "h2", text: "Project work" },
    {
      type: "p",
      text: "This site describes our services in general terms. Nothing on it is an offer or a contract. Every project we take on is covered by a separate written agreement, and that agreement applies over anything on this site.",
    },
    { type: "h2", text: "Links to other sites" },
    {
      type: "p",
      text: "Some pages link to websites we don't control, including live client sites. We aren't responsible for their content or for how they handle your information.",
    },
    { type: "h2", text: "No guarantees" },
    {
      type: "p",
      text: "We work to keep the site accurate and available, but we can't promise that it will always be free of errors or online. Its content is general information and isn't professional advice for your business.",
    },
    { type: "h2", text: "Limitation of liability" },
    {
      type: "p",
      text: "As far as the law allows, we aren't liable for any loss that results from using this site or relying on its content. Nothing in these terms limits any liability that can't be limited under Ethiopian law.",
    },
    { type: "h2", text: "Governing law" },
    {
      type: "p",
      text: "These terms are governed by the laws of the Federal Democratic Republic of Ethiopia. Any dispute about them will be decided by the competent courts of Ethiopia.",
    },
    { type: "h2", text: "Changes to these terms" },
    { type: "p", text: "We may update these terms. The date at the top shows when they last changed." },
    { type: "h2", text: "Contact" },
    { type: "p", text: ["Questions about these terms can be sent to ", email, "."] },
  ],
};
