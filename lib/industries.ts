import type { StaticImageData } from "next/image";
import type { IconName } from "@/components/ui/icon";

export type Industry = {
  slug: "hospitality" | "beauty-wellness";
  title: string;
  /** Who the industry page is for. */
  audience: string;
  /** What Avenor helps these businesses do. */
  value: string;
  cta: string;
  href: string;
  icon: IconName;
  /** Real photography, when supplied. Cards fall back to a CSS treatment without it. */
  image?: { src: StaticImageData; alt: string };
};

export const industries: Industry[] = [
  {
    slug: "hospitality",
    title: "Hospitality",
    audience: "Hotels, resorts, boutique stays and tourism operators.",
    value: "Turn people browsing your rooms into direct enquiries and bookings.",
    cta: "Explore Hospitality",
    href: "/industries/hospitality",
    icon: "bed-double",
  },
  {
    slug: "beauty-wellness",
    title: "Beauty & Wellness",
    audience: "Salons, barbershops, spas and beauty studios.",
    value: "Help clients find you, pick a service and book a visit.",
    cta: "Explore Beauty",
    href: "/industries/beauty-wellness",
    icon: "scissors",
  },
];
