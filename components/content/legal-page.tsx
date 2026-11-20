import { DraftPill } from "@/components/content/draft-pill";
import { RichText } from "@/components/content/rich-text";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { formatDate } from "@/lib/content-blocks";
import { isProductionDeployment } from "@/lib/env";
import type { LegalDocument } from "@/lib/legal";

/** Shared template for the Privacy Policy and Terms of Service. */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={document.title}
        breadcrumbs={[{ label: document.title, href: `/${document.slug}` }]}
        className="lg:pb-20"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-stone-300">
          <p>
            Last updated <time dateTime={document.updated}>{formatDate(document.updated)}</time>
          </p>
          {!isProductionDeployment && <DraftPill label="Draft: pending legal review" />}
        </div>
      </PageHero>

      <Section tone="light">
        <RichText blocks={document.blocks} size="legal" />
      </Section>
    </>
  );
}
