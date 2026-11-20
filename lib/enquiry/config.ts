import "server-only";

export type EnquiryConfig = {
  sanityProjectId: string;
  sanityDataset: string;
  sanityToken: string;
  /** Optional: used for the "Open in Studio" link in the notification email. */
  sanityStudioUrl: string | null;
  resendApiKey: string;
  fromEmail: string;
  notifyEmail: string;
  secret: string;
};

const required = {
  sanityProjectId: "NEXT_PUBLIC_SANITY_PROJECT_ID",
  sanityDataset: "NEXT_PUBLIC_SANITY_DATASET",
  sanityToken: "SANITY_API_WRITE_TOKEN",
  resendApiKey: "RESEND_API_KEY",
  fromEmail: "RESEND_FROM_EMAIL",
  notifyEmail: "ENQUIRY_NOTIFY_EMAIL",
  secret: "ENQUIRY_SECRET",
} as const;

/** Reads the enquiry settings from the environment. Server only. */
export function readEnquiryConfig(): { ok: true; config: EnquiryConfig } | { ok: false; missing: string[] } {
  const missing: string[] = [];
  const read = (name: string) => {
    const value = process.env[name]?.trim();
    if (!value) missing.push(name);
    return value ?? "";
  };

  const values = Object.fromEntries(
    Object.entries(required).map(([key, envName]) => [key, read(envName)]),
  ) as Omit<EnquiryConfig, "sanityStudioUrl">;

  if (values.secret && values.secret.length < 32) missing.push("ENQUIRY_SECRET (at least 32 characters)");
  if (missing.length > 0) return { ok: false, missing };

  const studioUrl = process.env.SANITY_STUDIO_URL?.trim().replace(/\/+$/, "") || null;
  return { ok: true, config: { ...values, sanityStudioUrl: studioUrl } };
}

/** The secret alone, for signing the form token while rendering the page. */
export function readEnquirySecret(): string | null {
  const secret = process.env.ENQUIRY_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : null;
}
