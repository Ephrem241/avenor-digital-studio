import type { Article } from "@/lib/insights";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import type { Service } from "@/lib/services";
import { contact, site, type NavItem } from "@/lib/site";

/**
 * schema.org builders. Only facts we can stand behind: no ratings, reviews, client
 * logos, street address or social profiles (none are confirmed). See AGENTS.md §13.
 */

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: siteUrl,
    // Placeholder monogram until the official logo is supplied (docs/launch-checklist.md).
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    slogan: site.tagline,
    areaServed: "Worldwide",
    knowsAbout: ["Website design", "Booking systems", "Enquiry management", "Workflow automation", "SEO"],
    ...(contact.email ? { email: contact.email } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: siteUrl,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
}

/** `trail` is the full breadcrumb trail, Home first. */
export function breadcrumbSchema(trail: NavItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function servicesSchema(services: Service[]) {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/services")}#${service.slug}`,
    name: service.name,
    description: service.summary,
    url: `${absoluteUrl("/services")}#${service.slug}`,
    provider: { "@id": organizationId },
    areaServed: "Worldwide",
    audience: { "@type": "BusinessAudience", name: "Hospitality and beauty businesses" },
  }));
}

export function articleSchema(article: Article) {
  const url = absoluteUrl(`/insights/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    inLanguage: "en",
    author: { "@id": organizationId, "@type": "Organization", name: site.name },
    publisher: { "@id": organizationId },
  };
}
