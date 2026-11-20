import { z } from "zod";
import {
  budgetOptions,
  contactMethodOptions,
  industryOptions,
  serviceOptions,
  timelineOptions,
  values,
} from "./options";

export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 3000;

/** The form fields, in display order. Hidden spam fields are handled separately. */
export const enquiryFields = [
  "fullName",
  "email",
  "businessName",
  "website",
  "country",
  "industry",
  "service",
  "budget",
  "timeline",
  "description",
  "contactMethod",
  "phone",
] as const;

export type EnquiryField = (typeof enquiryFields)[number];
export type EnquiryValues = Record<EnquiryField, string>;

/** Adds https:// when the visitor typed a bare domain, then accepts http(s) only. */
function normaliseUrl(value: string): string {
  if (value === "") return "";
  return /^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

const text = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, `Enter your ${label}.`)
    .min(min, `Your ${label} looks too short.`)
    .max(max, `Keep your ${label} under ${max} characters.`);

export const enquirySchema = z
  .object({
    fullName: text("full name", 2, 100),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Enter your business email.")
      .max(200, "That email address is too long.")
      .pipe(z.email("Enter a valid email address, like name@business.com.")),
    businessName: text("business name", 1, 120),
    website: z
      .string()
      .trim()
      .max(200, "Keep the website address under 200 characters.")
      .transform(normaliseUrl)
      .refine((value) => value === "" || isHttpUrl(value), "Enter a website address, like yourbusiness.com."),
    country: text("country", 2, 80),
    industry: z.enum(values(industryOptions), "Choose your industry."),
    service: z.enum(values(serviceOptions), "Choose the service you need, or “Not sure yet”."),
    budget: z.enum(values(budgetOptions), "Choose a budget range, or “Not sure yet”."),
    timeline: z.enum(values(timelineOptions), "Choose a timeline."),
    description: z
      .string()
      .trim()
      .min(1, "Tell us about your project.")
      .min(DESCRIPTION_MIN, `Tell us a little more: at least ${DESCRIPTION_MIN} characters.`)
      .max(DESCRIPTION_MAX, `Keep the description under ${DESCRIPTION_MAX} characters.`),
    contactMethod: z.enum(values(contactMethodOptions), "Choose how you'd like us to contact you."),
    phone: z.string().trim().max(30, "That number is too long."),
  });

export type Enquiry = z.output<typeof enquirySchema>;

export type FieldErrors = Partial<Record<EnquiryField, string>>;

/** Reads the form fields as strings; anything missing becomes "". */
export function readEnquiryValues(formData: FormData): EnquiryValues {
  const entries = enquiryFields.map((field) => {
    const value = formData.get(field);
    return [field, typeof value === "string" ? value : ""] as const;
  });
  return Object.fromEntries(entries) as EnquiryValues;
}

export function parseEnquiry(input: EnquiryValues):
  | { success: true; data: Enquiry }
  | { success: false; fieldErrors: FieldErrors } {
  const result = enquirySchema.safeParse(input);
  const fieldErrors: FieldErrors = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as EnquiryField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
  }

  // A number is only needed for phone and WhatsApp. Checked here, not in a zod
  // refinement, so its error shows together with the others.
  const phoneError = checkPhone(input.contactMethod, input.phone.trim());
  if (phoneError && !fieldErrors.phone) fieldErrors.phone = phoneError;

  if (!result.success || phoneError) return { success: false, fieldErrors };
  const data = result.data.contactMethod === "email" ? { ...result.data, phone: "" } : result.data;
  return { success: true, data };
}

function checkPhone(method: string, phone: string): string | null {
  if (method !== "phone" && method !== "whatsapp") return null;
  if (phone === "") return "Enter the number we should use.";
  if (!/^\+?[\d\s().-]{6,30}$/.test(phone)) {
    return "Enter a phone number with country code, like +251 91 123 4567.";
  }
  return null;
}
