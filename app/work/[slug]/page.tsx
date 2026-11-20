import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudySection } from "@/components/work/case-study-section";
import { ProjectCard } from "@/components/work/project-card";
import { ProjectFacts } from "@/components/work/project-facts";
import { ProjectGallery } from "@/components/work/project-gallery";
import { cn } from "@/lib/cn";
import { revealIndex } from "@/lib/motion";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: `${project.summary} Status: ${project.status === "live" ? "live" : "in progress"}.`,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <PageHero
        eyebrow="Case study"
        title={project.name}
        intro={project.summary}
        breadcrumbs={[
          { label: "Work", href: "/work" },
          { label: project.name, href: `/work/${project.slug}` },
        ]}
        actions={
          project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 text-small font-medium text-ivory-50 underline decoration-gold-500/60 underline-offset-[6px] transition-colors hover:text-gold-400 hover:decoration-gold-400"
            >
              Visit live site
              <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )
        }
      >
        <ProjectFacts project={project} />
      </PageHero>

      <section aria-label="Project overview" className="bg-ivory-50 pb-16 text-charcoal-950 md:pb-24 lg:pb-32">
        {/* Cover overlaps the hero edge, then the story reads underneath. */}
        <div className="bg-linear-to-b from-charcoal-950 from-50% to-ivory-50 to-50%">
          <Container>
            <div
              data-reveal="mask"
              className={cn(
                "relative overflow-hidden rounded-media bg-charcoal-900",
                project.cover ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[16/9] md:aspect-[16/5]",
              )}
            >
              <div data-reveal-media="" className="absolute inset-0">
                <div data-reveal-zoom="" className="absolute inset-0">
                  {project.cover ? (
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      priority
                      sizes="(min-width: 1440px) 1312px, 100vw"
                      className="object-cover object-top-left"
                    />
                  ) : (
                    // No screenshot yet; the status note in the hero explains why.
                    <div className="absolute inset-0 flex items-center justify-center bg-warm-light p-6 text-center">
                      <span className="font-serif text-h2 text-gold-400">{project.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container className="pt-12 md:pt-16">
          <div className="content-width">
            <CaseStudySection label="The challenge">
              <p>{project.challenge}</p>
            </CaseStudySection>
            <CaseStudySection label="Our approach">
              <p>{project.strategy}</p>
            </CaseStudySection>
            <CaseStudySection label={project.solutionHeading ?? "What we built"}>
              <ul className="flex flex-col gap-3 text-body">
                {project.solution.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          </div>
        </Container>
      </section>

      {project.gallery.length > 0 && (
        <Section tone="light-alt" aria-labelledby="gallery-title">
          <div className="flex flex-col gap-10 md:gap-12">
            <SectionHeading id="gallery-title" eyebrow="Gallery" title="Inside the project." />
            <ProjectGallery images={project.gallery} />
          </div>
        </Section>
      )}

      {(project.deliverables.length > 0 || project.technology.length > 0) && (
        <Section tone="dark" aria-label="Deliverables and technology">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {project.deliverables.length > 0 && (
              <div data-reveal="" className="flex flex-col gap-5">
                <h2 className="text-h3 text-ivory-50">What we delivered</h2>
                <ul className="flex flex-col border-t border-ivory-50/10">
                  {project.deliverables.map((item) => (
                    <li key={item} className="border-b border-ivory-50/10 py-4 text-body text-ivory-50/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.technology.length > 0 && (
              <div data-reveal="" style={revealIndex(1)} className="flex flex-col gap-5">
                <h2 className="text-h3 text-ivory-50">Built with</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.technology.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-gold-500/40 px-4 py-2 text-small text-ivory-50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="light" aria-labelledby="related-title">
        <div className="flex flex-col gap-10 md:gap-12">
          <SectionHeading id="related-title" eyebrow="More work" title="Other projects." />
          <ul className="grid gap-6 md:grid-cols-2">
            {related.map((item, index) => (
              <li key={item.slug} data-reveal="" style={revealIndex(index)}>
                <ProjectCard project={item} sizes="(min-width: 768px) 45vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection title="Want something like this for your business?" secondary={null} />
    </>
  );
}
