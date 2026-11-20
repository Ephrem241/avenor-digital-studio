import type { Metadata } from "next";
import { IndustryCard } from "@/components/industries/industry-card";
import { IndustrySwitcher } from "@/components/industries/industry-switcher";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/lib/industries";
import { revealIndex } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Websites, booking journeys and enquiry systems for hotels, resorts and tourism operators, and for salons, barbershops, spas and beauty studios.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for hospitality and beauty."
        intro="We focus on two kinds of business, where the website decides whether someone books with you or with the place next door."
        breadcrumbs={[{ label: "Industries", href: "/industries" }]}
      />

      <Section tone="dark-alt" aria-label="Choose an industry">
        <IndustrySwitcher items={industries} />
      </Section>

      <Section tone="light" aria-labelledby="industry-pages-title">
        <div className="flex flex-col gap-10 md:gap-12">
          <SectionHeading
            id="industry-pages-title"
            eyebrow="Industry pages"
            title="See what we build for your kind of business."
          />
          <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
            {industries.map((industry, index) => (
              <li key={industry.slug} data-reveal="" style={revealIndex(index)}>
                <IndustryCard industry={industry} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
