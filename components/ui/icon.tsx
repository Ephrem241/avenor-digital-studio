import {
  BedDouble,
  CalendarCheck,
  CodeXml,
  Compass,
  Gauge,
  Inbox,
  Lightbulb,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Scissors,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Icons are referenced by key in the data files (lib/*.ts) so content stays plain data.
 * Add a key here before using it in data.
 */
const icons = {
  "bed-double": BedDouble,
  scissors: Scissors,
  "monitor-smartphone": MonitorSmartphone,
  "calendar-check": CalendarCheck,
  inbox: Inbox,
  workflow: Workflow,
  gauge: Gauge,
  "shield-check": ShieldCheck,
  compass: Compass,
  lightbulb: Lightbulb,
  "pen-tool": PenTool,
  "code-xml": CodeXml,
  rocket: Rocket,
  "trending-up": TrendingUp,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
};

/** Decorative icon. Always hidden from assistive technology; pair it with visible text. */
export function Icon({ name, className }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.4} className={cn("size-6 shrink-0", className)} />;
}

type IconBadgeProps = IconProps & {
  /** Circle diameter. */
  size?: "md" | "lg";
};

/** Gold outlined circle with an icon, used on industry cards and process steps. */
export function IconBadge({ name, size = "md", className }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-gold-500/50 text-gold-400",
        size === "md" ? "size-12" : "size-16",
        className,
      )}
    >
      <Icon name={name} className={size === "md" ? "size-5" : "size-7"} />
    </span>
  );
}
