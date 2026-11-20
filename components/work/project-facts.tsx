import { StatusPill } from "@/components/ui/status-pill";
import type { Project } from "@/lib/projects";

/** Industry, type and status for the case study hero. */
export function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    { term: "Industry", value: project.industry },
    { term: "Project type", value: project.type },
  ];

  return (
    <div className="flex flex-col gap-4 border-t border-ivory-50/10 pt-6">
      <dl className="grid gap-x-12 gap-y-4 sm:grid-cols-3 sm:items-start">
        {facts.map((fact) => (
          <div key={fact.term} className="flex flex-col gap-1">
            <dt className="text-caption font-medium tracking-[0.18em] text-gold-400 uppercase">{fact.term}</dt>
            <dd className="text-body text-ivory-50">{fact.value}</dd>
          </div>
        ))}
        <div className="flex flex-col items-start gap-1">
          <dt className="text-caption font-medium tracking-[0.18em] text-gold-400 uppercase">Status</dt>
          <dd>
            <StatusPill status={project.status} className="mt-0.5 border border-ivory-50/15" />
          </dd>
        </div>
      </dl>
      {project.note && <p className="text-small text-stone-300">{project.note}</p>}
    </div>
  );
}
