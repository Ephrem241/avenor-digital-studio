import type { StaticImageData } from "next/image";
import longnileCover from "@/public/work/longnile/cover.webp";
import longnileAmharic from "@/public/work/longnile/amharic.webp";
import longnileHomeMobile from "@/public/work/longnile/home-mobile.webp";
import longnileQuote from "@/public/work/longnile/quote.webp";
import longnileQuoteMobile from "@/public/work/longnile/quote-mobile.webp";
import noahCover from "@/public/work/noah-barbershop/cover.webp";
import noahHomeMobile from "@/public/work/noah-barbershop/home-mobile.webp";
import noahLocation from "@/public/work/noah-barbershop/location.webp";
import noahServices from "@/public/work/noah-barbershop/services.webp";
import noahServicesMobile from "@/public/work/noah-barbershop/services-mobile.webp";

/**
 * Portfolio data. Status and descriptions follow what has actually been built
 * (see AGENTS.md §9). Never add outcomes, metrics or testimonials that are not verified.
 */
export type ProjectStatus = "live" | "in-development" | "redesign";

export type ProjectImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Phone-width capture; shown in a narrower frame. */
  mobile?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  /** Short industry label shown on cards. */
  industry: string;
  /** What kind of project it is. */
  type: string;
  status: ProjectStatus;
  /** One line describing only what exists. */
  summary: string;
  challenge: string;
  strategy: string;
  /** What was built. For work not yet built, set `solutionHeading` to say so. */
  solution: string[];
  solutionHeading?: string;
  /** Completed deliverables only. Section is hidden when empty. */
  deliverables: string[];
  /** Section is hidden when empty. */
  technology: string[];
  /** Optional honest note on status, shown under the facts. */
  note?: string;
  /** Real screenshot. Omit when none exists; cards render a typographic cover instead. */
  cover?: ProjectImage;
  gallery: ProjectImage[];
  liveUrl?: string;
  featured: boolean;
  /** Copy written from a brief, not from built work. Owner must confirm before launch. */
  placeholder?: true;
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In Development",
  redesign: "Redesign · In Progress",
};

export const projects: Project[] = [
  {
    slug: "noah-barbershop",
    name: "Noah Barbershop",
    industry: "Beauty & Grooming",
    type: "Website and booking journey",
    status: "live",
    summary: "A barbershop site in Bole, Addis Ababa, where clients pick a barber and get in touch to book.",
    challenge:
      "Clients choose a barbershop by its barbers. Noah needed a site that introduces each barber, lists every service with its price and puts clients in touch with the right person.",
    strategy:
      "The shop books by phone and message, so the site does too. It has no booking calendar. It leads clients from a service to a barber, then to that barber's own contact method: a call, WhatsApp or Telegram.",
    solution: [
      "A service menu with starting prices in birr. Each service opens the barber list with that service already selected.",
      "Barber profiles with a photo, specialities and the ways each barber prefers to be contacted, marked “calls only” or “messages only” where that applies.",
      "WhatsApp links that open with a booking message already written.",
      "Opening hours, a map and directions to the shop near Edna Mall.",
      "Book and Call buttons that stay within reach on phones.",
    ],
    deliverables: [
      "Responsive website design and build",
      "Barber selection and contact journey",
      "Service and price menu",
      "Location and opening hours",
      "Launch on Vercel",
    ],
    technology: ["React", "Vite", "Supabase", "Vercel"],
    cover: {
      src: noahCover,
      alt: "Noah Barbershop homepage: the headline “Your Style. Your Standard.” beside a client checking his fade in a hand mirror.",
    },
    gallery: [
      {
        src: noahServices,
        alt: "Noah Barbershop services section: ten services in two columns, each with a starting price in birr and a Book link.",
        caption: "Every service links straight to the barber list with that service selected.",
      },
      {
        src: noahLocation,
        alt: "Noah Barbershop “Find the shop” section with address, opening hours, phone number and a map of the area near Edna Mall.",
        caption: "Address, hours, directions and a map in one place.",
      },
      {
        src: noahHomeMobile,
        alt: "Noah Barbershop homepage on a phone: a close-up of a fresh fade above the headline and two stacked buttons.",
        mobile: true,
      },
      {
        src: noahServicesMobile,
        alt: "Noah Barbershop services list on a phone, with fixed Book Now and Call buttons at the bottom of the screen.",
        mobile: true,
      },
    ],
    liveUrl: "https://noah-barbershop-9cv3.vercel.app/",
    featured: true,
  },
  {
    slug: "longnile",
    name: "LongNile",
    industry: "Logistics & Trading",
    type: "Bilingual company website",
    status: "in-development",
    summary: "A site for a heavy-cargo logistics and trading company on the Djibouti-Ethiopia corridor.",
    challenge:
      "LongNile moves heavy and oversized cargo, such as excavators, cranes and industrial machinery, between Djibouti and Ethiopia. Its clients need to see quickly whether LongNile can handle their load and how to ask for a price.",
    strategy:
      "We built the site around the quote request. The services and the corridor are explained first, and every page leads to a quote form that collects the cargo details the team needs before it can reply.",
    solution: [
      "An animated map of the Addis Ababa to Djibouti corridor in the homepage hero.",
      "A four-step quote request covering the service, cargo, route and contact details, checked on the server.",
      "A contact form. Both forms send confirmation emails with a reference number.",
      "A hidden spam trap and rate limiting on every form.",
      "Full English and Amharic versions of the site.",
    ],
    deliverables: [
      "Bilingual site structure and design",
      "Quote and contact forms with email delivery",
      "Service pages",
      "Corridor map hero",
    ],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "Resend", "Vercel"],
    note: "In development. Company details are still being confirmed before launch.",
    cover: {
      src: longnileCover,
      alt: "LongNile homepage preview: the headline “Powering Progress Across Borders.” over a photo of a heavy-haul truck.",
    },
    gallery: [
      {
        src: longnileQuote,
        alt: "LongNile quote request page: step one of four, “Service & cargo”, with service options shown as cards.",
        caption: "The quote request is split into four short steps.",
      },
      {
        src: longnileAmharic,
        alt: "LongNile homepage in Amharic, with the headline and navigation in Ge'ez script over a photo of a heavy-haul truck.",
        caption: "Every page is available in English and Amharic.",
      },
      {
        src: longnileHomeMobile,
        alt: "LongNile homepage on a phone: the headline “Powering Progress Across Borders.” above stacked buttons and a WhatsApp link.",
        mobile: true,
      },
      {
        src: longnileQuoteMobile,
        alt: "LongNile quote form on a phone, showing the first step with service options stacked vertically.",
        mobile: true,
      },
    ],
    featured: true,
  },
  {
    slug: "hayat-herbal",
    name: "Hayat Herbal",
    industry: "Product & Brand",
    type: "Website redesign",
    status: "redesign",
    summary: "A redesign of an herbal products company website, built around its product catalog.",
    challenge:
      "Hayat Herbal offers a range of herbal products. The company needs a website that presents the brand clearly and helps people find the product they are looking for.",
    strategy:
      "The redesign is organised around the product catalog, so visitors can browse the range and read about each product. Product information comes from the company's own approved material.",
    solutionHeading: "Planned scope",
    solution: [
      "A product catalog that is easy to browse on a phone.",
      "A clearer presentation of the Hayat Herbal brand.",
      "Ways to find a product without knowing its name.",
    ],
    deliverables: [],
    technology: [],
    note: "The redesign is in progress. Screens will be added here when it is public.",
    gallery: [],
    featured: true,
    placeholder: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjects(slugs: string[]): Project[] {
  return slugs.flatMap((slug) => projects.filter((project) => project.slug === slug));
}
