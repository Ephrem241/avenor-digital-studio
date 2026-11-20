import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/services";

const allServices = { label: "View All Services", href: "/services" };

export function ServicesOverview() {
  return (
    <Section tone="dark" aria-labelledby="services-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-center gap-8 text-center lg:col-span-5 lg:items-start lg:text-left">
          <SectionHeading
            tone="dark"
            eyebrow="Our services"
            id="services-title"
            title="Everything your business needs to work better online."
            className="items-center lg:items-start"
          />
          {/* Wrapper does the hiding: the button's own inline-flex would override `hidden`. */}
          <div className="hidden lg:block">
            <ButtonLink href={allServices.href} variant="outline-light" arrow>
              {allServices.label}
            </ButtonLink>
          </div>
        </div>

        {/* Hairlines between items come from the 1px gap showing the list background. */}
        <ul data-reveal="" className="grid grid-cols-2 gap-px overflow-hidden bg-ivory-50/10 lg:col-span-7 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="bg-charcoal-950">
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col gap-4 p-5 transition-colors duration-200 ease-standard hover:bg-charcoal-900 sm:p-6 lg:p-8"
              >
                <Icon name={service.icon} className="size-8 text-gold-500" />
                <h3 className="font-sans text-body font-medium text-ivory-50 transition-colors group-hover:text-gold-400">
                  {service.name}
                </h3>
                <p className="text-small text-stone-300">{service.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <ButtonLink href={allServices.href} variant="outline-light" arrow className="justify-self-center lg:hidden">
          {allServices.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
