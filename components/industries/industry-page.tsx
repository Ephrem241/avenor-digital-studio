import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { getIndustry, type Industry } from "@/lib/industries";
import { revealIndex } from "@/lib/motion";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { primaryCta } from "@/lib/site";

/** Shared template for /industries/hospitality and /industries/beauty-wellness. */
export function IndustryPage({ slug }: { slug: Industry["slug"] }) {
  const industry = getIndustry(slug);
  const relatedServices = getServices(industry.serviceSlugs);
  const relatedProjects = getProjects(industry.projectSlugs);

  return (
    <>
      <PageHero
        eyebrow={industry.title}
        title={industry.value}
        intro={industry.intro}
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: industry.title, href: industry.href },
        ]}
        actions={
          <>
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#what-we-build" variant="text-light">
              What we build
            </ButtonLink>
          </>
        }
      />

      <Section tone="light" aria-labelledby="challenges-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="challenges-title"
            eyebrow="What gets in the way"
            title="Where customers drop off."
            intro={industry.audience}
            className="lg:col-span-4"
          />
          <ol className="grid gap-px overflow-hidden rounded-card bg-ivory-200 md:grid-cols-3 lg:col-span-8">
            {industry.challenges.map((challenge, index) => (
              <li
                key={challenge.title}
                data-reveal=""
                style={revealIndex(index)}
                className="flex flex-col gap-3 bg-ivory-50 p-6 lg:p-8"
              >
                <span aria-hidden="true" className="text-caption font-medium tracking-[0.18em] text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h4 text-charcoal-950">{challenge.title}</h3>
                <p className="text-small text-stone-500">{challenge.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="what-we-build" tone="dark" aria-labelledby="build-title">
        <div className="flex flex-col gap-10 md:gap-12">
          <SectionHeading
            tone="dark"
            id="build-title"
            eyebrow="What we build"
            title={`Services for ${industry.title.toLowerCase()} businesses.`}
          />
          <ul data-reveal="" className="grid gap-px overflow-hidden bg-ivory-50/10 sm:grid-cols-2">
            {relatedServices.map((service) => (
              <li key={service.slug} className="bg-charcoal-950">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col gap-4 p-6 transition-colors duration-200 ease-standard hover:bg-charcoal-900 lg:p-8"
                >
                  <Icon name={service.icon} className="size-8 text-gold-500" />
                  <h3 className="flex items-center gap-2 font-sans text-body font-medium text-ivory-50 transition-colors group-hover:text-gold-400">
                    {service.name}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 transition-transform duration-200 ease-standard group-hover:translate-x-1"
                    />
                  </h3>
                  <p className="text-small text-stone-300">{service.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light-alt" aria-labelledby="industry-work-title">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="industry-work-title" eyebrow="Our work" title="Projects in this industry." />
            <ButtonLink href="/work" variant="text-dark" arrow>
              View all work
            </ButtonLink>
          </div>
          {relatedProjects.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <li key={project.slug} data-reveal="" style={revealIndex(index)}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="reading-width text-body-lg text-stone-500">
              {industry.title} projects will appear here as they launch. In the meantime, our other work shows how we
              plan and build.
            </p>
          )}
        </div>
      </Section>

      <CtaSection
        title={`Planning a new site for your ${industry.slug === "hospitality" ? "property" : "studio"}?`}
        primary={{ label: "Discuss Your Project", href: primaryCta.href }}
      />
    </>
  );
}
