import { industries } from "@/lib/industries";
import { services } from "@/lib/services";

/**
 * Option lists for the enquiry form. Safe to import from client components.
 * The server schema accepts only these values.
 */
export type Option = { value: string; label: string };

export const industryOptions: Option[] = [
  ...industries.map((industry) => ({ value: industry.slug, label: industry.title })),
  { value: "other", label: "Other" },
];

export const serviceOptions: Option[] = [
  ...services.map((service) => ({ value: service.slug, label: service.name })),
  { value: "not-sure", label: "Not sure yet" },
];

/** Placeholder ranges in USD, to be confirmed by the owner (docs/launch-checklist.md). */
export const budgetOptions: Option[] = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000–$5,000" },
  { value: "5k-10k", label: "$5,000–$10,000" },
  { value: "over-10k", label: "Over $10,000" },
  { value: "not-sure", label: "Not sure yet" },
];
export const budgetPlaceholder = { placeholder: true } as const;

export const timelineOptions: Option[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "flexible", label: "Flexible" },
];

export const contactMethodOptions: Option[] = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
];

export function values(options: Option[]): [string, ...string[]] {
  return options.map((option) => option.value) as [string, ...string[]];
}

export function labelFor(options: Option[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
