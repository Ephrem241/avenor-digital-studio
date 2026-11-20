import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusPill } from "@/components/ui/status-pill";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  /** Passed to next/image `sizes`; depends on the grid the card sits in. */
  sizes?: string;
  className?: string;
};

export function ProjectCard({
  project,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 100vw",
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-ivory-200 bg-white text-charcoal-950 transition-[border-color] duration-200 ease-standard hover:border-gold-500/60",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            className="object-cover object-top-left"
          />
        ) : (
          // No screenshot exists yet: a plain typographic cover, not a mock-up.
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-warm-light p-6 text-center">
            <span className="font-serif text-h4 text-gold-400">{project.name}</span>
            <span className="text-caption tracking-[0.18em] text-ivory-50/70 uppercase">Preview coming soon</span>
          </div>
        )}
        <StatusPill status={project.status} className="absolute bottom-3 left-3" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-h4">{project.name}</h3>
            <p className="text-small text-stone-500">{project.industry}</p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mt-1.5 size-5 shrink-0 text-gold-700 transition-transform duration-200 ease-standard group-hover:translate-x-1"
          />
        </div>
        <p className="text-small text-stone-500">{project.summary}</p>
      </div>
    </Link>
  );
}
