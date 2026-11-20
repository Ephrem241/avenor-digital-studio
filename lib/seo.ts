import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Public origin used for canonicals, Open Graph URLs, the sitemap and JSON-LD.
 * 1. NEXT_PUBLIC_SITE_URL: the real domain, once there is one.
 * 2. VERCEL_PROJECT_PRODUCTION_URL: Vercel's production alias (set automatically on Vercel).
 * 3. Local development.
 * Previews resolve to the production origin too, so they never compete with it in search.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Absolute URL for a site path such as `/work`. */
export function absoluteUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  /** Page title. Combined with the site name by the root template unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Site path, e.g. `/services`. */
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  /** ISO date, for articles. */
  publishedTime?: string;
  /** Share image for routes with their own opengraph-image file, e.g. `/work/x/opengraph-image`. */
  image?: { url: string; alt: string };
};

/**
 * Title, description, canonical, Open Graph and Twitter fields for one page.
 * A child's `openGraph` replaces the parent's whole object, so every page sets all of it here.
 * Share image: the root card, or the route's own card passed as `image`.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  image,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  // Setting openGraph here hides inherited and file-based images, so name the image explicitly.
  const card = image ?? { url: "/opengraph-image", alt: `${site.name}: ${site.tagline}` };
  const images = [{ ...card, width: 1200, height: 630 }];
  const openGraphBase = { title: fullTitle, description, url: path, siteName: site.name, locale: "en", images };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph:
      type === "article"
        ? { ...openGraphBase, type: "article", ...(publishedTime ? { publishedTime } : {}) }
        : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
