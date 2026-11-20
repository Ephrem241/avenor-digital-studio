import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { privacyPolicy } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
