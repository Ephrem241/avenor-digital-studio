import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/work/project-card";
import { revealIndex } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies from Avenor Digital Studio: what each client needed, what we built and the current status of every project.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Selected projects."
        intro="Websites and business tools we have launched or are building now, each with its current status and a list of what we built."
        breadcrumbs={[{ label: "Work", href: "/work" }]}
      />

      <Section tone="light-alt" aria-label="Projects">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug} data-reveal="" suppressHydrationWarning style={revealIndex(index)}>
              <ProjectCard
                project={project}
                headingLevel={2}
                // The first row sits just under the hero on desktop; load those covers immediately.
                loading={index < 3 ? "eager" : undefined}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title="Have a project in mind?" secondary={null} />
    </>
  );
}
