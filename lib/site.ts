export type NavItem = {
  label: string;
  href: string;
};

export const site = {
  name: "Avenor Digital Studio",
  shortName: "Avenor",
  tagline: "Digital experiences that move business forward.",
  description:
    "We create premium websites, booking experiences and intelligent digital systems for hospitality and beauty businesses.",
} as const;

/**
 * Public contact details. `null` values are still to be supplied by the owner and render
 * as bracketed markers (see docs/launch-checklist.md). Never fill these with guesses.
 */
export const contact: {
  email: string | null;
  /** Person or company that operates the "Avenor Digital Studio" trading name. */
  operatorName: string | null;
  country: string;
  placeholder: true;
} = {
  email: null,
  operatorName: null,
  country: "Ethiopia",
  placeholder: true,
};

export const primaryCta: NavItem = { label: "Start a Project", href: "/contact" };
export const secondaryCta: NavItem = { label: "Explore Our Work", href: "/work" };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

export const serviceKeywords = ["Websites", "Bookings", "Automation", "Growth"] as const;

/** Words in the homepage service marquee (AGENTS.md §6.3 D). */
export const marqueeKeywords = ["Websites", "Bookings", "Automation", "SEO", "Growth"] as const;

/** True when `href` is the current page or one of its children. */
export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
