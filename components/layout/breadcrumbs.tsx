import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import type { NavItem } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

type BreadcrumbsProps = {
  /** Trail after Home. The last item is the current page. */
  items: NavItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: NavItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-stone-300">
        {trail.map((item, index) => {
          const current = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-gold-500/60">
                  /
                </span>
              )}
              {current ? (
                <span aria-current="page" className="text-ivory-50">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="inline-flex min-h-6 items-center transition-colors hover:text-gold-400">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(trail)} />
    </nav>
  );
}
