import type { MetadataRoute } from "next";
import { articles } from "@/lib/insights";
import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/services",
  "/industries",
  "/industries/hospitality",
  "/industries/beauty-wellness",
  "/work",
  "/about",
  "/insights",
  "/contact",
  "/privacy-policy",
  "/terms",
];

/**
 * Public routes only. Draft articles are left out (they're noindex and 404 in production).
 * `lastModified` is set only where a real date exists, never to the build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...projects.map((project) => ({ url: absoluteUrl(`/work/${project.slug}`) })),
    ...articles
      .filter((article) => article.published)
      .map((article) => ({ url: absoluteUrl(`/insights/${article.slug}`), lastModified: article.date })),
  ];
}
