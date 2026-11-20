import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { IntroIndustries } from "@/components/home/intro-industries";
import { Process } from "@/components/home/process";
import { ServicesOverview } from "@/components/home/services-overview";
import { CtaSection } from "@/components/shared/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroIndustries />
      <ServicesOverview />
      <FeaturedWork />
      <Process />
      <CtaSection />
    </>
  );
}
