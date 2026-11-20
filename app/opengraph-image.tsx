import { ogContentType, ogSize, renderOgCard } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    title: site.tagline,
    meta: "Websites, booking and enquiry systems for hospitality and beauty businesses",
  });
}
