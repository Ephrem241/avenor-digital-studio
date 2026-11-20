import type { IconName } from "@/components/ui/icon";

export type Service = {
  slug: string;
  name: string;
  /** One line on what the service covers. */
  summary: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    summary: "Fast, custom websites built around how your customers decide.",
    icon: "monitor-smartphone",
  },
  {
    slug: "booking-reservation-systems",
    name: "Booking & Reservation Systems",
    summary: "Clear booking flows for rooms, tables, treatments and appointments.",
    icon: "calendar-check",
  },
  {
    slug: "customer-enquiry-management",
    name: "Customer Enquiry Management",
    summary: "Forms and inboxes that capture every enquiry and route it to your team.",
    icon: "inbox",
  },
  {
    slug: "ai-workflow-automation",
    name: "AI & Workflow Automation",
    summary: "Automated replies and reminders that save your staff time.",
    icon: "workflow",
  },
  {
    slug: "seo-performance",
    name: "SEO & Performance Optimization",
    summary: "Technical SEO and page speed work so people can find you and stay.",
    icon: "gauge",
  },
  {
    slug: "website-care",
    name: "Website Care & Optimization",
    summary: "We keep your site updated, monitored and improving after launch.",
    icon: "shield-check",
  },
];
