import type { StaticImageData } from "next/image";
import type { IconName } from "@/components/ui/icon";

export type IndustryChallenge = {
  title: string;
  body: string;
};

export type Industry = {
  slug: "hospitality" | "beauty-wellness";
  title: string;
  /** Who the industry page is for. */
  audience: string;
  /** What Avenor helps these businesses do. */
  value: string;
  /** Opening paragraph on the industry page. */
  intro: string;
  /** Short line shown in the industries switcher, above the CTA. */
  accent: string;
  /** Plain observations about what gets in the way. No statistics. */
  challenges: IndustryChallenge[];
  /** Services listed under "What we build", in order. */
  serviceSlugs: string[];
  /** Case studies from this industry. Empty until one exists. */
  projectSlugs: string[];
  cta: string;
  href: string;
  icon: IconName;
  /** Real photography, when supplied. Pages fall back to a CSS treatment without it. */
  image?: { src: StaticImageData; alt: string };
};

export const industries: Industry[] = [
  {
    slug: "hospitality",
    title: "Hospitality",
    audience: "Hotels, resorts, boutique stays and tourism operators.",
    value: "Turn people browsing your rooms into direct enquiries and bookings.",
    intro:
      "Guests compare you with every other option before they book. We build websites that show your rooms and experiences properly, answer the questions guests ask before booking, and make it easy to book or enquire with you directly.",
    accent: "Rooms, experiences and direct enquiries",
    challenges: [
      {
        title: "Guests can't picture the stay",
        body: "A few small photos and a long text don't show what makes a property worth choosing. Guests leave to look elsewhere.",
      },
      {
        title: "Enquiries get lost",
        body: "Questions arrive by email, phone, social media and booking platforms. Some get a late reply and some get none.",
      },
      {
        title: "Booking direct is harder than it should be",
        body: "When the path to a direct booking is unclear, guests go back to a third-party platform they already know.",
      },
    ],
    serviceSlugs: [
      "website-design-development",
      "booking-reservation-systems",
      "customer-enquiry-management",
      "seo-performance",
    ],
    projectSlugs: [],
    cta: "Explore Hospitality",
    href: "/industries/hospitality",
    icon: "bed-double",
  },
  {
    slug: "beauty-wellness",
    title: "Beauty & Wellness",
    audience: "Salons, barbershops, spas and beauty studios.",
    value: "Help clients find you, pick a service and book a visit.",
    intro:
      "Clients choose a salon, spa or barbershop by the people who work there, the services on offer and how easy it is to get an appointment. We build sites that show all three and get a booking started in a few taps.",
    accent: "Services, staff and bookings",
    challenges: [
      {
        title: "Clients want to choose their stylist",
        body: "Regulars and new clients alike want to see who will look after them. Many salon sites don't show it.",
      },
      {
        title: "Prices and services are hard to find",
        body: "When the service list lives in an old social media post, people message to ask instead of booking.",
      },
      {
        title: "Booking happens in too many places",
        body: "Calls, WhatsApp and walk-ins are all fine, but clients need one clear starting point that works on their phone.",
      },
    ],
    serviceSlugs: [
      "website-design-development",
      "booking-reservation-systems",
      "ai-workflow-automation",
      "website-care",
    ],
    projectSlugs: ["noah-barbershop"],
    cta: "Explore Beauty",
    href: "/industries/beauty-wellness",
    icon: "scissors",
  },
];

export function getIndustry(slug: Industry["slug"]): Industry {
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) throw new Error(`Unknown industry: ${slug}`);
  return industry;
}
