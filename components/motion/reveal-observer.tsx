"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements once as they enter the viewport.
 * Mounted once in the root layout; sections stay Server Components and only carry the attribute.
 * Until this runs, `html` has no `data-reveal-ready`, so nothing is hidden without JavaScript.
 *
 * This effect can run before streamed page content below the layout has hydrated, so
 * `data-revealed` may land on an element React hasn't hydrated yet. Every `[data-reveal]`
 * element therefore carries `suppressHydrationWarning`; React keeps the extra attribute.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.setAttribute("data-reveal-ready", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
