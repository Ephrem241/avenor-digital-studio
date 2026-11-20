"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Industry } from "@/lib/industries";

type IndustrySwitcherProps = {
  items: Industry[];
};

/**
 * Hospitality / Beauty & Wellness switcher (AGENTS.md §6.3 E), following the WAI-ARIA tabs
 * pattern with automatic activation: arrow keys, Home and End move between tabs.
 * All panels are in the DOM; inactive ones are `hidden`.
 */
export function IndustrySwitcher({ items }: IndustrySwitcherProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  function select(index: number) {
    setActive(index);
    tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    const next =
      event.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : event.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  }

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <div
        role="tablist"
        aria-label="Industries"
        onKeyDown={onKeyDown}
        className="inline-flex w-full gap-1 self-start rounded-full border border-ivory-50/15 p-1 sm:w-auto"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-small sm:px-5 font-medium whitespace-nowrap transition-colors duration-200 ease-standard sm:flex-none",
                selected ? "bg-gold-500 text-charcoal-950" : "text-ivory-50/80 hover:text-gold-400",
              )}
            >
              <Icon name={item.icon} className="hidden size-4 sm:block" />
              {item.title}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.slug}
          role="tabpanel"
          id={`${baseId}-panel-${item.slug}`}
          aria-labelledby={`${baseId}-tab-${item.slug}`}
          hidden={index !== active}
          className="switcher-panel grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
        >
          <div className="relative isolate aspect-[4/3] overflow-hidden rounded-media bg-charcoal-900 lg:col-span-7 lg:aspect-[16/11]">
            {item.image ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div aria-hidden="true" className="absolute inset-0">
                <div className={cn("absolute inset-0 bg-warm-light", item.slug === "beauty-wellness" && "-scale-x-100")} />
                <Icon
                  name={item.icon}
                  className={cn(
                    "absolute size-[55%] text-gold-500/15",
                    item.slug === "beauty-wellness" ? "-bottom-[8%] -left-[6%]" : "-top-[6%] -right-[6%]",
                  )}
                />
              </div>
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-charcoal-950/70 to-transparent" />
            <p className="absolute right-5 bottom-5 left-5 font-serif text-h4 text-ivory-50 md:right-8 md:bottom-7 md:left-8">
              {item.audience}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:col-span-5">
            <Eyebrow>{item.accent}</Eyebrow>
            <h2 className="text-h2 text-ivory-50">{item.title}</h2>
            <p className="text-body-lg text-stone-300">{item.intro}</p>
            <ButtonLink href={item.href} arrow className="mt-2">
              {item.cta}
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  );
}
