import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Placeholder monogram until the official Avenor logo file is supplied.
 * An open "A" with a crossing stroke, drawn in gold.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" aria-hidden="true" className={cn("text-gold-500", className)}>
      <path d="M20 2 L37 34 H30.5 L20 13.5 L9.5 34 H3 Z" fill="currentColor" />
      <path d="M13.5 26 H29" stroke="var(--color-charcoal-950)" strokeWidth="2.4" />
      <path d="M11 27.2 C16 22.5 23 21.5 31 23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type LogoProps = {
  /** Smaller wordmark for tight spaces. */
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <Link href="/" aria-label="Avenor Digital Studio, home" className={cn("inline-flex items-center gap-3", className)}>
      <Monogram className={compact ? "h-7 w-8" : "h-8 w-9"} />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className={cn("font-serif tracking-[0.2em] text-ivory-50", compact ? "text-lg" : "text-xl")}>AVENOR</span>
        <span className="mt-1 font-sans text-[0.5625rem] tracking-[0.32em] text-gold-400">DIGITAL STUDIO</span>
      </span>
    </Link>
  );
}
