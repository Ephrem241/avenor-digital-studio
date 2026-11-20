import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** `dark` = on charcoal surfaces, `light` = on ivory surfaces. */
  tone?: "dark" | "light";
  /** Render inside a subtle pill, as in the hero. */
  pill?: boolean;
  className?: string;
};

export function Eyebrow({ children, tone = "dark", pill = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-sans text-caption font-medium tracking-[0.18em] uppercase",
        tone === "dark" ? "text-gold-400" : "text-gold-700",
        pill && "inline-flex rounded-full px-3 py-1",
        pill && (tone === "dark" ? "bg-gold-500/15" : "bg-gold-500/10"),
        className,
      )}
    >
      {children}
    </p>
  );
}
