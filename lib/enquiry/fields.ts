/**
 * Enquiry field names and limits shared by the form (client) and the schema (server).
 * Kept free of zod so the validation library stays out of the browser bundle.
 */

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
export type FieldErrors = Partial<Record<EnquiryField, string>>;
