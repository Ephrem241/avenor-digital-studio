"use client";

import { useEffect, useRef } from "react";
import { CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

/** Shown only after the server confirms the enquiry was saved. */
export function EnquirySuccess({ reference }: { reference: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-start gap-6 rounded-card border border-gold-700/30 bg-white p-6 sm:p-10">
      <CircleCheck aria-hidden="true" className="size-8 text-gold-700" />
      <h2 ref={heading} tabIndex={-1} className="text-h3 text-charcoal-950 focus-visible:outline-gold-700">
        Thank you. We have your enquiry.
      </h2>
      <div className="flex flex-col gap-1">
        <p className="text-small text-stone-500">Your reference</p>
        <p className="font-mono text-h4 tracking-wider text-charcoal-950">{reference}</p>
      </div>
      <p className="reading-width text-body text-charcoal-950/80">
        We&apos;ve sent a copy to your email. If it doesn&apos;t arrive in a few minutes, check your spam folder.
        We&apos;ll read your enquiry and reply using the contact method you chose.
      </p>
      <ButtonLink href="/work" variant="outline-dark" arrow>
        Explore Our Work
      </ButtonLink>
    </div>
  );
}
