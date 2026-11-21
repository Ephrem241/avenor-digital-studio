import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { revealIndex } from "@/lib/motion";
import { featuredProjects } from "@/lib/projects";

export function FeaturedWork() {
  return (
    <Section tone="light-alt" aria-labelledby="work-title">
      <div className="grid gap-10 md:gap-12 xl:grid-cols-12 xl:gap-16">
        <div className="flex flex-col items-start gap-6 xl:col-span-3">
          <SectionHeading
            eyebrow="Our work"
            id="work-title"
            title="Selected digital experiences."
            intro="Websites and business tools we have launched or are building now."
          />
          <ButtonLink href="/work" variant="text-dark" arrow>
            View Portfolio
          </ButtonLink>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:col-span-9">
          {featuredProjects.map((project, index) => (
            <li key={project.slug} data-reveal="" suppressHydrationWarning style={revealIndex(index)}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
