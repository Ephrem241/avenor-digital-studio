"use client";

import Link from "next/link";
import { useEffect, type RefObject } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { isActivePath, navigation, primaryCta, site } from "@/lib/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const DESKTOP_QUERY = "(min-width: 64rem)";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
  /** Element whose focusable children form the focus trap (header bar + drawer). */
  trapRef: RefObject<HTMLElement | null>;
};

export function MobileMenu({ id, open, onClose, pathname, trapRef }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const background = [document.getElementById("main"), document.getElementById("site-footer")];
    background.forEach((el) => el?.setAttribute("inert", ""));

    // Move focus to the first link once the drawer's visibility transition has started.
    const focusFrame = requestAnimationFrame(() => {
      document.getElementById(id)?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !trapRef.current) return;

      const items = Array.from(trapRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    function onDesktop(event: MediaQueryListEvent) {
      if (event.matches) onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      cancelAnimationFrame(focusFrame);
      root.style.overflow = previousOverflow;
      background.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, onClose, id, trapRef]);

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={cn(
        "fixed inset-x-0 top-(--header-height) bottom-0 overflow-y-auto bg-charcoal-950 lg:hidden",
        "duration-300 ease-standard",
        // Visibility flips instantly on open (so focus can move in) and waits for the fade on close.
        open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]",
      )}
    >
      <nav aria-label="Mobile" className="container-avenor flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <ul className="flex flex-col">
          {navigation.map((item, index) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${80 + index * 40}ms` : "0ms" }}
                className={cn(
                  "border-b border-ivory-50/10 transition-[opacity,translate] duration-500 ease-enter",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center font-serif text-h4 transition-colors hover:text-gold-400",
                    active ? "text-gold-400" : "text-ivory-50",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex flex-col gap-6 pt-10">
          <ButtonLink href={primaryCta.href} onClick={onClose} size="lg" arrow className="w-full">
            {primaryCta.label}
          </ButtonLink>
          <p className="text-small text-stone-300">{site.tagline}</p>
        </div>
      </nav>
    </div>
  );
}
