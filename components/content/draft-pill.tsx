import { cn } from "@/lib/cn";

type DraftPillProps = {
  label?: string;
  /** Surface the pill sits on. */
  tone?: "dark" | "light";
  className?: string;
};

/** Marks unpublished or unreviewed content outside production. The text carries the meaning. */
export function DraftPill({ label = "Draft", tone = "dark", className }: DraftPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-caption font-medium",
        tone === "dark"
          ? "border-gold-500/60 bg-gold-500/15 text-gold-400"
          : "border-gold-700/40 bg-gold-500/10 text-gold-700",
        className,
      )}
    >
      {label}
    </span>
  );
}
