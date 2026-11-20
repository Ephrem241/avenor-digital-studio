import type { Metadata } from "next";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { IntroIndustries } from "@/components/home/intro-industries";
import { Process } from "@/components/home/process";
import { ServiceMarquee } from "@/components/home/service-marquee";
import { ServicesOverview } from "@/components/home/services-overview";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaSection } from "@/components/shared/cta-section";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | Websites and booking systems for hospitality and beauty`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <IntroIndustries />
      <ServicesOverview />
      <FeaturedWork />
      <ServiceMarquee />
      <Process />
      <CtaSection />
    </>
  );
}
