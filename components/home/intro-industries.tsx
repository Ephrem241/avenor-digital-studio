import { IndustryCard } from "@/components/industries/industry-card";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/lib/industries";
import { revealIndex } from "@/lib/motion";

export function IntroIndustries() {
  return (
    <Section tone="light" aria-labelledby="intro-title">
      <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:col-span-4">
          <SectionHeading
            eyebrow="More than a website"
            id="intro-title"
            title="A better way to do business."
            intro="We plan and build websites that bring in more customers and take routine admin off your team."
          />
          <ButtonLink href="/about" variant="text-dark" arrow>
            How we work
          </ButtonLink>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:col-span-8" aria-label="Industries we serve">
          {industries.map((industry, index) => (
            <li key={industry.slug} data-reveal="" style={revealIndex(index)}>
              <IndustryCard industry={industry} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
