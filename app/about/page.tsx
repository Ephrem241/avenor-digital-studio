import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Principles } from "@/components/about/principles";
import { Process } from "@/components/home/process";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealIndex } from "@/lib/motion";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Avenor Digital Studio designs and builds websites, booking journeys and enquiry systems for hospitality and beauty businesses. How we work and what we build.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A digital studio for hospitality and beauty businesses."
        intro="Avenor Digital Studio designs and builds websites, booking journeys and enquiry systems for hotels, resorts, tour operators, salons, barbershops and spas."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <Section tone="light" aria-labelledby="what-we-do-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow="What we do"
            id="what-we-do-title"
            title="Built around the moment a customer decides."
            className="lg:col-span-5"
          />
          <div data-reveal="" className="flex flex-col gap-5 text-body-lg text-charcoal-950/85 lg:col-span-7">
            <p>
              Most of our clients sell something people book ahead: a room, a treatment, a haircut with a particular
              barber. We plan each site around that choice, so visitors can see what you offer, what it costs if you
              publish prices, and the quickest way to reach you.
            </p>
            <p>
              We also build the tools behind the website: booking flows, enquiry forms that reach the right person, and
              automations for the admin your team repeats every day.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-1 pt-2">
              <ButtonLink href="/services" variant="text-dark" arrow>
                View Services
              </ButtonLink>
              <ButtonLink href="/industries" variant="text-dark" arrow>
                Explore Industries
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Principles />

      <Process />

      <Section tone="light" aria-labelledby="capabilities-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow="Capabilities"
            id="capabilities-title"
            title="What we can build for you."
            className="lg:col-span-5"
          />
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
            {services.map((service, index) => (
              <li key={service.slug} data-reveal="" style={revealIndex(index)}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex min-h-16 items-center gap-4 border-b border-ivory-200 py-4 text-charcoal-950 transition-colors hover:text-gold-700"
                >
                  <Icon name={service.icon} className="text-gold-700" />
                  <span className="flex-1 text-body font-medium">{service.name}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-gold-700 transition-transform duration-200 ease-standard group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection title="Tell us about your business." />
    </>
  );
}
