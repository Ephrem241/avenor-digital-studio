"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CircleAlert, LoaderCircle } from "lucide-react";
import { submitEnquiry } from "@/app/contact/actions";
import { cn } from "@/lib/cn";
import {
  budgetOptions,
  contactMethodOptions,
  industryOptions,
  serviceOptions,
  timelineOptions,
  type Option,
} from "@/lib/enquiry/options";
import {
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  enquiryFields,
  type EnquiryField,
  type EnquiryValues,
  type FieldErrors,
} from "@/lib/enquiry/fields";
import { HONEYPOT_FIELD } from "@/lib/enquiry/spam-fields";
import { initialEnquiryState } from "@/lib/enquiry/state";
import { controlClass, describedBy, Field, FieldError, fieldIds, Select } from "./form-field";
import { EnquirySuccess } from "./enquiry-success";

const fieldLabels: Record<EnquiryField, string> = {
  fullName: "Full name",
  email: "Business email",
  businessName: "Business name",
  website: "Website",
  country: "Country",
  industry: "Industry",
  service: "Service you need",
  budget: "Budget range",
  timeline: "Timeline",
  description: "About your project",
  contactMethod: "How should we contact you?",
  phone: "Phone or WhatsApp number",
};

function emptyValues(): EnquiryValues {
  return Object.fromEntries(enquiryFields.map((field) => [field, ""])) as EnquiryValues;
}

function allowed(options: Option[], value: string | null): string {
  return value && options.some((option) => option.value === value) ? value : "";
}

type EnquiryFormProps = {
  /** Hidden signed token, rendered on the server per request. */
  token: ReactNode;
  /** Public contact email, if set, offered when sending fails. */
  fallbackEmail: string | null;
};

export function EnquiryForm({ token, fallbackEmail }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const searchParams = useSearchParams();
  // Remount the fields after each response so they pick up the returned values.
  const [attempt, setAttempt] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setAttempt((count) => count + 1);
  }

  if (state.status === "success") return <EnquirySuccess reference={state.reference} />;

  const values =
    state.status === "error"
      ? state.values
      : {
          ...emptyValues(),
          industry: allowed(industryOptions, searchParams.get("industry")),
          service: allowed(serviceOptions, searchParams.get("service")),
          contactMethod: "email",
        };

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state.status === "error" && (
        <ErrorSummary
          key={attempt}
          message={state.message}
          fieldErrors={state.fieldErrors}
          fallbackEmail={state.kind === "validation" ? null : fallbackEmail}
        />
      )}

      <FormFields key={attempt} values={values} errors={state.status === "error" ? state.fieldErrors : {}} />

      {/* Spam checks. The honeypot is hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {token}

      <div className="flex flex-col gap-4 border-t border-charcoal-950/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-small text-stone-500">
          We use your details only to reply to this enquiry. See our{" "}
          <Link href="/privacy-policy" className="text-charcoal-950 underline underline-offset-4 hover:text-gold-700">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-gold-500 px-7 text-body font-medium text-charcoal-950 transition-colors duration-200 ease-standard hover:bg-gold-400 focus-visible:outline-gold-700 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

function ErrorSummary({
  message,
  fieldErrors,
  fallbackEmail,
}: {
  message: string;
  fieldErrors: FieldErrors;
  fallbackEmail: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const invalid = enquiryFields.filter((field) => fieldErrors[field]);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="flex flex-col gap-3 rounded-card border border-error-700/40 bg-white p-5 focus-visible:outline-gold-700"
    >
      <p className="flex items-start gap-2 font-medium text-error-700">
        <CircleAlert aria-hidden="true" className="mt-1 size-4 shrink-0" />
        {message}
      </p>
      {invalid.length > 0 && (
        <ul className="flex flex-col gap-1 pl-6 text-small">
          {invalid.map((field) => (
            <li key={field}>
              <a
                href={`#${fieldIds(field).input}`}
                className="text-charcoal-950 underline underline-offset-4 hover:text-gold-700"
              >
                {fieldLabels[field]}: {fieldErrors[field]}
              </a>
            </li>
          ))}
        </ul>
      )}
      {fallbackEmail && (
        <p className="pl-6 text-small text-charcoal-950">
          You can also email us at{" "}
          <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4 hover:text-gold-700">
            {fallbackEmail}
          </a>
          .
        </p>
      )}
    </div>
  );
}

function FormFields({ values, errors }: { values: EnquiryValues; errors: FieldErrors }) {
  const [contactMethod, setContactMethod] = useState(values.contactMethod || "email");
  const [descriptionLength, setDescriptionLength] = useState(values.description.length);
  const needsPhone = contactMethod === "phone" || contactMethod === "whatsapp";

  const input = (name: EnquiryField, props: ComponentProps<"input">, hint?: ReactNode) => (
    <input
      id={fieldIds(name).input}
      name={name}
      defaultValue={values[name]}
      aria-invalid={errors[name] ? true : undefined}
      aria-describedby={describedBy(name, hint, errors[name])}
      className={cn(controlClass, "min-h-12")}
      {...props}
    />
  );

  return (
    <>
      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-6 font-serif text-h4 text-charcoal-950">About you</legend>
        <Field name="fullName" label={fieldLabels.fullName} required error={errors.fullName}>
          {input("fullName", { type: "text", autoComplete: "name", required: true, maxLength: 100 })}
        </Field>
        <Field name="email" label={fieldLabels.email} required error={errors.email}>
          {input("email", {
            type: "email",
            autoComplete: "email",
            inputMode: "email",
            required: true,
            maxLength: 200,
          })}
        </Field>
        <Field name="businessName" label={fieldLabels.businessName} required error={errors.businessName}>
          {input("businessName", { type: "text", autoComplete: "organization", required: true, maxLength: 120 })}
        </Field>
        <Field name="website" label={fieldLabels.website} error={errors.website}>
          {input("website", {
            type: "text",
            inputMode: "url",
            autoComplete: "url",
            placeholder: "yourbusiness.com",
            maxLength: 200,
            spellCheck: false,
            autoCapitalize: "none",
          })}
        </Field>
        <Field name="country" label={fieldLabels.country} required error={errors.country}>
          {input("country", { type: "text", autoComplete: "country-name", required: true, maxLength: 80 })}
        </Field>
        <Field name="industry" label={fieldLabels.industry} required error={errors.industry}>
          <Select
            name="industry"
            options={industryOptions}
            defaultValue={values.industry}
            error={errors.industry}
            required
            placeholder="Choose an industry"
          />
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-6 font-serif text-h4 text-charcoal-950">Your project</legend>
        <Field name="service" label={fieldLabels.service} required error={errors.service} className="sm:col-span-2">
          <Select
            name="service"
            options={serviceOptions}
            defaultValue={values.service}
            error={errors.service}
            required
            placeholder="Choose a service"
          />
        </Field>
        <Field name="budget" label={fieldLabels.budget} required error={errors.budget}>
          <Select
            name="budget"
            options={budgetOptions}
            defaultValue={values.budget}
            error={errors.budget}
            required
            placeholder="Choose a range"
          />
        </Field>
        <Field name="timeline" label={fieldLabels.timeline} required error={errors.timeline}>
          <Select
            name="timeline"
            options={timelineOptions}
            defaultValue={values.timeline}
            error={errors.timeline}
            required
            placeholder="Choose a timeline"
          />
        </Field>
        <Field
          name="description"
          label={fieldLabels.description}
          required
          error={errors.description}
          hint={
            <span className="flex flex-wrap justify-between gap-x-4">
              <span>What you need, what you have now, and anything we should know.</span>
              <span className={cn("tabular-nums", descriptionLength > DESCRIPTION_MAX && "text-error-700")}>
                {descriptionLength} / {DESCRIPTION_MAX}
              </span>
            </span>
          }
          className="sm:col-span-2"
        >
          <textarea
            id={fieldIds("description").input}
            name="description"
            defaultValue={values.description}
            required
            minLength={DESCRIPTION_MIN}
            maxLength={DESCRIPTION_MAX}
            rows={6}
            onChange={(event) => setDescriptionLength(event.target.value.length)}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={describedBy("description", true, errors.description)}
            className={cn(controlClass, "min-h-40 resize-y py-3")}
          />
        </Field>
      </fieldset>

      <fieldset
        aria-describedby={errors.contactMethod ? fieldIds("contactMethod").error : undefined}
        className="flex flex-col gap-6"
      >
        <legend className="mb-6 font-serif text-h4 text-charcoal-950">{fieldLabels.contactMethod}</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {contactMethodOptions.map((option) => (
            <label
              key={option.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-control border border-charcoal-950/20 bg-white px-4 text-body text-charcoal-950 transition-colors duration-200 ease-standard hover:border-charcoal-950/40 has-checked:border-gold-700 has-checked:bg-gold-500/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold-700"
            >
              <input
                type="radio"
                name="contactMethod"
                value={option.value}
                checked={contactMethod === option.value}
                onChange={() => setContactMethod(option.value)}
                className="size-4 accent-gold-700 focus-visible:outline-none"
              />
              {option.label}
            </label>
          ))}
        </div>
        <FieldError id={fieldIds("contactMethod").error}>{errors.contactMethod}</FieldError>

        {needsPhone && (
          <Field
            name="phone"
            label={fieldLabels.phone}
            required
            hint="Include the country code."
            error={errors.phone}
            className="sm:max-w-sm"
          >
            {input(
              "phone",
              { type: "tel", autoComplete: "tel", inputMode: "tel", required: true, maxLength: 30 },
              true,
            )}
          </Field>
        )}
      </fieldset>
    </>
  );
}
