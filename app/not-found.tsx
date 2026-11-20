import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function NotFound() {
  return (
    <Section tone="dark" className="flex flex-1 items-center pt-[calc(var(--header-height)+4rem)]">
      <div className="flex flex-col items-start gap-8">
        <SectionHeading
          as="h1"
          tone="dark"
          eyebrow="Page not found"
          title="This page isn't here yet."
          intro="The link may be out of date, or the page is still being built."
        />
        <ButtonLink href="/" arrow>
          Back to home
        </ButtonLink>
      </div>
    </Section>
  );
}
