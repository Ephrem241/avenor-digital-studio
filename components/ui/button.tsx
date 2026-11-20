import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline-light" | "outline-dark" | "text-light" | "text-dark";
export type ButtonSize = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-[background-color,border-color,color] duration-200 ease-standard disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-full bg-gold-500 text-charcoal-950 hover:bg-gold-400",
  "outline-light":
    "rounded-full border border-ivory-50/40 text-ivory-50 hover:border-gold-400 hover:text-gold-400",
  "outline-dark":
    "rounded-full border border-charcoal-950/25 text-charcoal-950 hover:border-gold-700 hover:text-gold-700",
  "text-light": "text-ivory-50 underline decoration-ivory-50/40 underline-offset-[6px] hover:decoration-gold-400",
  "text-dark":
    "text-charcoal-950 underline decoration-charcoal-950/30 underline-offset-[6px] hover:decoration-gold-700",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-small",
  lg: "min-h-13 px-7 text-body",
};

function classesFor(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const isText = variant.startsWith("text");
  return cn(base, variants[variant], isText ? "min-h-11 text-small" : sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-200 ease-standard group-hover:translate-x-1"
    />
  );
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show a trailing arrow that nudges right on hover. */
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "children">) {
  return (
    <Link className={classesFor(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
