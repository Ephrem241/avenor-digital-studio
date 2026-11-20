import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
};

export default function TermsPage() {
  return <LegalPage document={terms} />;
}
