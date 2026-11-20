import { Eyebrow } from "@/components/ui/eyebrow";

const steps = [
  {
    title: "We read your enquiry",
    body: "A person reads every enquiry. You'll get an email copy with your reference number as soon as you send it.",
  },
  {
    title: "We reply your way",
    body: "We get back to you by email, phone or WhatsApp, whichever you choose, with any questions we have.",
  },
  {
    title: "We suggest where to start",
    body: "Once we understand the project, we'll tell you what we'd build first and what it would involve.",
  },
];

/** Sidebar on the contact page. No promised response time until the owner sets one. */
export function NextSteps({ email }: { email: string | null }) {
  return (
    <aside aria-labelledby="next-steps-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow tone="light">What happens next</Eyebrow>
        <h2 id="next-steps-heading" className="text-h3 text-charcoal-950">
          From enquiry to first conversation
        </h2>
      </div>
      <ol className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 border-t border-charcoal-950/10 pt-6">
            <span aria-hidden="true" className="font-serif text-h4 text-gold-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-sans text-body font-medium text-charcoal-950">{step.title}</h3>
              <p className="text-small text-charcoal-950/75">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      {email && (
        <p className="border-t border-charcoal-950/10 pt-6 text-small text-charcoal-950/75">
          Prefer email? Write to{" "}
          <a href={`mailto:${email}`} className="text-charcoal-950 underline underline-offset-4 hover:text-gold-700">
            {email}
          </a>
          .
        </p>
      )}
    </aside>
  );
}
