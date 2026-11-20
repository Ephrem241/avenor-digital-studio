"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { isActivePath, navigation, primaryCta } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

const SCROLL_THRESHOLD = 24;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(SCROLL_THRESHOLD);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Close the drawer after client-side navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  const solid = scrolled || open;

  return (
    <header
      ref={headerRef}
      className={cn(
        // No backdrop-filter here: it would become the containing block for the fixed drawer.
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-standard",
        solid
          ? "border-b border-ivory-50/10 bg-charcoal-950/95"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-avenor flex h-(--header-height) items-center justify-between gap-6">
        <Logo compact />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-small transition-colors duration-200 hover:text-gold-400",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 after:ease-standard",
                      active ? "text-ivory-50 after:scale-x-100" : "text-ivory-50/80 after:scale-x-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-ivory-50/25 text-ivory-50 transition-colors hover:border-gold-400 hover:text-gold-400 lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <MobileMenu id={menuId} open={open} onClose={close} pathname={pathname} trapRef={headerRef} />
    </header>
  );
}
