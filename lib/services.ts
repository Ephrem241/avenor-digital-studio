import type { IconName } from "@/components/ui/icon";

export type Service = {
  slug: string;
  name: string;
  /** One line on what the service covers (homepage list). */
  summary: string;
  /** A short paragraph for the services page. */
  description: string;
  /** What the client receives. */
  deliverables: string[];
  /** What changes for the business. Plain description, never a number. */
  value: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    summary: "Fast, custom websites built around how your customers decide.",
    description:
      "We design and build your website from scratch, starting with what your customers need to see before they get in touch. Every page is written, designed and tested on phones first, then on larger screens.",
    deliverables: [
      "Site structure and page plan",
      "Custom design for desktop, tablet and mobile",
      "Development, content entry and launch",
      "Basic SEO setup and analytics",
    ],
    value:
      "Visitors see what you offer and how to reach you on the first screen, and the site looks as good as the service you provide.",
    icon: "monitor-smartphone",
  },
  {
    slug: "booking-reservation-systems",
    name: "Booking & Reservation Systems",
    summary: "Clear booking flows for rooms, tables, treatments and appointments.",
    description:
      "We build the path from “I'm interested” to a confirmed booking. That might be a full reservation flow, or a simpler one where clients pick a service and a staff member and contact them directly.",
    deliverables: [
      "Booking journey designed around your real process",
      "Service, room or staff selection",
      "Confirmation messages to you and your client",
      "Connection to the tools you already use, where possible",
    ],
    value: "Fewer back-and-forth messages before a booking, and fewer people giving up halfway.",
    icon: "calendar-check",
  },
  {
    slug: "customer-enquiry-management",
    name: "Customer Enquiry Management",
    summary: "Forms and inboxes that capture every enquiry and route it to your team.",
    description:
      "We set up enquiry forms that ask the right questions, check the answers on the server and send each enquiry to the right person with a reference number.",
    deliverables: [
      "Enquiry and quote forms with clear validation",
      "Spam protection and rate limiting",
      "Email notifications to your team",
      "Automatic acknowledgement for the visitor",
    ],
    value: "Enquiries arrive with the details your team needs, and each one goes straight to the person who handles it.",
    icon: "inbox",
  },
  {
    slug: "ai-workflow-automation",
    name: "AI & Workflow Automation",
    summary: "Automated replies and reminders that save your staff time.",
    description:
      "We look at the repetitive work around your enquiries and bookings, then automate the parts that don't need a person: replies to common questions, reminders and moving information between tools.",
    deliverables: [
      "Review of your current admin workflow",
      "Automated replies, reminders and follow-ups",
      "Integrations between your website and other tools",
      "Documentation so your team knows what runs automatically",
    ],
    value: "Your staff spend less time on copy-and-paste work and more time with customers.",
    icon: "workflow",
  },
  {
    slug: "seo-performance",
    name: "SEO & Performance Optimization",
    summary: "Technical SEO and page speed work so people can find you and stay.",
    description:
      "We fix the technical issues that stop search engines from understanding your site, and make the pages load quickly on ordinary phone connections.",
    deliverables: [
      "Technical SEO audit and fixes",
      "Page titles, descriptions and structured data",
      "Image and code optimisation for speed",
      "Before-and-after Lighthouse reports",
    ],
    value: "People searching for a business like yours have a better chance of finding you, and fewer leave while a page loads.",
    icon: "gauge",
  },
  {
    slug: "website-care",
    name: "Website Care & Optimization",
    summary: "We keep your site updated, monitored and improving after launch.",
    description:
      "After launch we keep the site secure and up to date, fix problems when they appear and make small improvements based on how people actually use it.",
    deliverables: [
      "Updates and security patches",
      "Uptime and error monitoring",
      "Content changes on request",
      "Regular improvement suggestions",
    ],
    value: "Your website stays reliable and current without you having to manage it.",
    icon: "shield-check",
  },
];

export function getServices(slugs: string[]): Service[] {
  return slugs.flatMap((slug) => services.filter((service) => service.slug === slug));
}
