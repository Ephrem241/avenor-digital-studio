import type { StaticImageData } from "next/image";
import longnileCover from "@/public/work/longnile/cover.webp";
import noahCover from "@/public/work/noah-barbershop/cover.webp";

/**
 * Portfolio data. Status and descriptions follow what has actually been built
 * (see AGENTS.md §9). Never add outcomes, metrics or testimonials that are not verified.
 */
export type ProjectStatus = "live" | "in-development" | "redesign";

export type Project = {
  slug: string;
  name: string;
  /** Short industry label shown on cards. */
  industry: string;
  status: ProjectStatus;
  /** One line describing only what exists. */
  summary: string;
  /** Real screenshot. Omit when none exists; cards render a typographic cover instead. */
  cover?: { src: StaticImageData; alt: string };
  liveUrl?: string;
  featured: boolean;
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
    status: "live",
    summary: "A barbershop site in Bole, Addis Ababa, where clients pick a barber and get in touch to book.",
    cover: {
      src: noahCover,
      alt: "Noah Barbershop homepage: the headline “Your Style. Your Standard.” beside a client checking his fade in a hand mirror.",
    },
    liveUrl: "https://noah-barbershop-9cv3.vercel.app/",
    featured: true,
  },
  {
    slug: "longnile",
    name: "LongNile",
    industry: "Logistics & Trading",
    status: "in-development",
    summary: "A site for a heavy-cargo logistics and trading company on the Djibouti-Ethiopia corridor.",
    cover: {
      src: longnileCover,
      alt: "LongNile homepage preview: the headline “Powering Progress Across Borders.” over a photo of a heavy-haul truck.",
    },
    featured: true,
  },
  {
    slug: "hayat-herbal",
    name: "Hayat Herbal",
    industry: "Product & Brand",
    status: "redesign",
    summary: "A redesign of an herbal products company website, built around its product catalog.",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
