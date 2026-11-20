import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
