import type { Metadata } from "next";
import Link from "next/link";
import { Process } from "@/components/home/process";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceDetail } from "@/components/services/service-detail";
import { CtaSection } from "@/components/shared/cta-section";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { servicesSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Website design and development, booking systems, enquiry management, automation, SEO and website care for hospitality and beauty businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema(services)} />
      <PageHero
        eyebrow="Services"
        title="What we build for your business."
        intro="Six services that work on their own or together, from a new website to the booking and enquiry systems behind it."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      >
        <nav aria-label="Services on this page" className="border-t border-ivory-50/10 pt-6">
          <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`#${service.slug}`}
                  className="group inline-flex min-h-11 items-center gap-3 text-small text-ivory-50/80 transition-colors hover:text-gold-400"
                >
                  <span aria-hidden="true" className="text-caption text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((service, index) => (
        <ServiceDetail
          key={service.slug}
          service={service}
          index={index}
          tone={index % 2 === 0 ? "light" : "light-alt"}
        />
      ))}

      <Process />
      <CtaSection
        title="Not sure which service you need?"
        body="Tell us what is slowing your business down. We'll suggest where to start and what it would involve."
        primary={{ label: "Discuss Your Project", href: "/contact" }}
      />
    </>
  );
}
