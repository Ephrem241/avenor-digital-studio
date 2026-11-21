import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Surface the heading sits on. */
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  /** Id for the heading, so a section can point aria-labelledby at it. */
  id?: string;
  /** Rise in once on scroll (see RevealObserver). Default true. */
  reveal?: boolean;
};

const sizeFor = { h1: "text-h1", h2: "text-h2", h3: "text-h3" } as const;

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  as: Heading = "h2",
  align = "left",
  className,
  id,
  reveal = true,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal={reveal ? "" : undefined} suppressHydrationWarning
      className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading id={id} className={cn(sizeFor[Heading], "max-w-[18ch]", tone === "dark" ? "text-ivory-50" : "text-charcoal-950")}>
        {title}
      </Heading>
      {intro && (
        <p className={cn("reading-width text-body-lg", tone === "dark" ? "text-stone-300" : "text-stone-500")}>
          {intro}
        </p>
      )}
    </div>
  );
}
