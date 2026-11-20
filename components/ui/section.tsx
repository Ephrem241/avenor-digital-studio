import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

export type SectionTone = "dark" | "dark-alt" | "light" | "light-alt";

const tones: Record<SectionTone, string> = {
  dark: "bg-charcoal-950 text-ivory-50",
  "dark-alt": "bg-charcoal-900 text-ivory-50",
  light: "bg-ivory-50 text-charcoal-950",
  "light-alt": "bg-ivory-100 text-charcoal-950",
};

type SectionProps = ComponentProps<"section"> & {
  tone?: SectionTone;
  /** Wrap children in the standard container. Default true. */
  contained?: boolean;
  /** Apply standard section padding. Default true. */
  spaced?: boolean;
};

export function Section({
  tone = "light",
  contained = true,
  spaced = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("relative", tones[tone], spaced && "section-spacing", className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

export function isDarkTone(tone: SectionTone) {
  return tone === "dark" || tone === "dark-alt";
}
