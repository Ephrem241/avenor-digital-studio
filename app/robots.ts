import type { MetadataRoute } from "next";
import { isProductionDeployment } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo";

/** Only the production deployment is indexable; previews and local builds disallow everything. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
