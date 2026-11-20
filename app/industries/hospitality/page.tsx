import type { Metadata } from "next";
import { IndustryPage } from "@/components/industries/industry-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hospitality",
  description:
    "Websites, booking flows and enquiry management for hotels, resorts, boutique stays and tourism operators who want more direct bookings.",
  path: "/industries/hospitality",
});

export default function HospitalityPage() {
  return <IndustryPage slug="hospitality" />;
}
