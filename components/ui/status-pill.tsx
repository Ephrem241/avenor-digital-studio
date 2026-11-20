import { cn } from "@/lib/cn";
import { statusLabels, type ProjectStatus } from "@/lib/projects";

/** Project status label. The text carries the meaning; colour only reinforces it. */
export function StatusPill({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-medium",
        status === "live" ? "bg-charcoal-950 text-gold-400" : "bg-charcoal-950/75 text-ivory-50",
        className,
      )}
    >
      {status === "live" && <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-400" />}
      {statusLabels[status]}
    </span>
  );
}
