import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { terms } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: terms.title,
  description: terms.description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage document={terms} />;
}
