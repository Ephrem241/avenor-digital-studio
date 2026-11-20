import type { Metadata } from "next";
import { IndustryPage } from "@/components/industries/industry-page";

export const metadata: Metadata = {
  title: "Hospitality",
  description:
    "Websites, booking flows and enquiry management for hotels, resorts, boutique stays and tourism operators who want more direct bookings.",
};

export default function HospitalityPage() {
  return <IndustryPage slug="hospitality" />;
}
