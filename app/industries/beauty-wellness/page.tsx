import type { Metadata } from "next";
import { IndustryPage } from "@/components/industries/industry-page";

export const metadata: Metadata = {
  title: "Beauty & Wellness",
  description:
    "Websites for salons, barbershops, spas and beauty studios: show your services and staff, and make booking a visit easy on a phone.",
};

export default function BeautyWellnessPage() {
  return <IndustryPage slug="beauty-wellness" />;
}
