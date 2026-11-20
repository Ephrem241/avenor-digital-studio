import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { legalLinks, navigation, site } from "@/lib/site";

async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCopyrightYear();

  return (
    <footer id="site-footer" className="border-t border-ivory-50/10 bg-charcoal-950 text-ivory-50">
      <Container>
        <div className="flex flex-col gap-10 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <Logo />
            <p className="max-w-[22ch] text-small text-stone-300">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-small text-ivory-50/80 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory-50/10 py-6 text-caption text-stone-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-gold-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
