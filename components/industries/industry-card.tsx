import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon, IconBadge } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Industry } from "@/lib/industries";

type IndustryCardProps = {
  industry: Industry;
  className?: string;
};

/**
 * One link per card. Mobile: compact row (badge, title, audience, arrow).
 * Tablet and up: tall media panel with the value line and CTA text.
 */
export function IndustryCard({ industry, className }: IndustryCardProps) {
  return (
    <Link
      href={industry.href}
      className={cn(
        "group relative isolate flex min-h-36 items-center gap-4 overflow-hidden rounded-card bg-charcoal-950 p-5 text-ivory-50",
        "md:min-h-[26rem] md:flex-col md:items-start md:justify-between md:rounded-media md:p-8",
        className,
      )}
    >
      {/* Media layer */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {industry.image ? (
          <Image
            src={industry.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div
              className={cn(
                "absolute inset-0 bg-warm-light",
                industry.slug === "beauty-wellness" && "-scale-x-100",
              )}
            />
            <Icon
              name={industry.icon}
              className="absolute -top-6 -right-6 hidden size-56 text-gold-500/10 md:block"
            />
          </>
        )}
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-950/85 to-charcoal-950/30 md:bg-linear-to-t md:from-charcoal-950 md:via-charcoal-950/60 md:to-charcoal-950/10" />
      </div>

      <IconBadge name={industry.icon} className="bg-charcoal-950/40" />

      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-none">
        <h3 className="text-h4 text-ivory-50 md:text-h3">{industry.title}</h3>
        <p className="text-small text-ivory-50/80 md:text-body">{industry.audience}</p>
        <p className="hidden max-w-[32ch] text-small text-stone-300 md:block">{industry.value}</p>
        <span className="mt-3 hidden items-center gap-2 text-small font-medium text-ivory-50 underline decoration-gold-500/60 underline-offset-[6px] group-hover:decoration-gold-400 md:inline-flex">
          {industry.cta}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-1"
          />
        </span>
      </div>

      {/* Mobile arrow */}
      <span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ivory-50/40 md:hidden"
      >
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
