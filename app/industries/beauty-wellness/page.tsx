import type { Metadata } from "next";
import { IndustryPage } from "@/components/industries/industry-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Beauty & Wellness",
  description:
    "Websites for salons, barbershops, spas and beauty studios: show your services and staff, and make booking a visit easy on a phone.",
  path: "/industries/beauty-wellness",
});

export default function BeautyWellnessPage() {
  return <IndustryPage slug="beauty-wellness" />;
}
