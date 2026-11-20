import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { FormToken } from "@/components/contact/form-token";
import { NextSteps } from "@/components/contact/next-steps";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Avenor Digital Studio about your website, booking or enquiry project. We read every enquiry and reply by email, phone or WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project."
        intro="A few details about your business and what you need. We reply by email, phone or WhatsApp, whichever you prefer."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
        className="lg:pb-20"
      />

      <Section tone="light" aria-label="Project enquiry">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {/* useSearchParams (for ?industry= and ?service=) needs a Suspense boundary. */}
            <Suspense fallback={<FormFallback />}>
              <EnquiryForm
                fallbackEmail={contact.email}
                token={
                  <Suspense fallback={null}>
                    <FormToken />
                  </Suspense>
                }
              />
            </Suspense>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <NextSteps email={contact.email} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FormFallback() {
  return <div aria-hidden="true" className="min-h-[60rem] rounded-card bg-ivory-100" />;
}
