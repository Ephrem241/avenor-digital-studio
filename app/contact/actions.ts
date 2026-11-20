"use server";

import { headers } from "next/headers";
import { readEnquiryConfig } from "@/lib/enquiry/config";
import { sendEnquiryEmails } from "@/lib/enquiry/emails";
import { createReference } from "@/lib/enquiry/reference";
import { parseEnquiry, readEnquiryValues, type EnquiryValues } from "@/lib/enquiry/schema";
import {
  checkFormToken,
  clientIp,
  hashIp,
  HONEYPOT_FIELD,
  RATE_LIMITS,
  TOKEN_FIELD,
} from "@/lib/enquiry/spam";
import type { EnquiryState } from "@/lib/enquiry/state";
import { createServerClient } from "@/lib/sanity/server-client";

const HOUR = 60 * 60 * 1000;

function failure(
  kind: "rejected" | "unavailable",
  message: string,
  values: EnquiryValues,
): EnquiryState {
  return { status: "error", kind, message, fieldErrors: {}, values };
}

const UNAVAILABLE =
  "We couldn't send your enquiry just now. Nothing was saved. Please try again in a few minutes.";
const REJECTED = "We couldn't send your enquiry. Please reload the page and try again.";

export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = readEnquiryValues(formData);

  // 1. Validate. Field errors go back with the visitor's values so nothing is lost.
  const parsed = parseEnquiry(values);
  if (!parsed.success) {
    return {
      status: "error",
      kind: "validation",
      message: "Some details need attention.",
      fieldErrors: parsed.fieldErrors,
      values,
    };
  }
  const enquiry = parsed.data;

  // 2. Configuration. Without it we can't save, so we say so instead of pretending.
  const configResult = readEnquiryConfig();
  if (!configResult.ok) {
    console.warn(`[enquiry] Form unavailable, missing env: ${configResult.missing.join(", ")}`);
    return failure("unavailable", UNAVAILABLE, values);
  }
  const config = configResult.config;

  // 3. Spam checks: hidden field and the signed "form opened at" token.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn("[enquiry] Rejected: honeypot filled");
    return failure("rejected", REJECTED, values);
  }
  const token = formData.get(TOKEN_FIELD);
  const tokenCheck = checkFormToken(config.secret, typeof token === "string" ? token : "");
  if (tokenCheck === "expired") {
    return failure(
      "rejected",
      "This page has been open for a long time. Please reload it and send your enquiry again.",
      values,
    );
  }
  if (tokenCheck !== "ok") {
    console.warn(`[enquiry] Rejected: form token ${tokenCheck}`);
    return failure("rejected", REJECTED, values);
  }

  const client = createServerClient(config);
  const ipHash = hashIp(config.secret, clientIp(await headers()));
  const now = new Date();

  try {
    // 4. Rate limit, counted from saved enquiries.
    const counts = await client.fetch<{ byIp: number; byEmail: number }>(
      `{
        "byIp": count(*[_type == "enquiry" && ipHash == $ipHash && submittedAt > $hourAgo]),
        "byEmail": count(*[_type == "enquiry" && email == $email && submittedAt > $dayAgo])
      }`,
      {
        ipHash,
        email: enquiry.email,
        hourAgo: new Date(now.getTime() - HOUR).toISOString(),
        dayAgo: new Date(now.getTime() - 24 * HOUR).toISOString(),
      },
    );
    if (counts.byIp >= RATE_LIMITS.perIpPerHour || counts.byEmail >= RATE_LIMITS.perEmailPerDay) {
      console.warn("[enquiry] Rejected: rate limit");
      return failure(
        "rejected",
        "We've already received several enquiries from you recently. Please wait an hour and try again.",
        values,
      );
    }

    // 5. Save. The success state depends on this write, nothing else.
    const reference = createReference(now);
    const created = await client.create({
      _type: "enquiry",
      reference,
      status: "new",
      submittedAt: now.toISOString(),
      // Optional fields left empty are not stored.
      ...Object.fromEntries(Object.entries(enquiry).filter(([, value]) => value !== "")),
      ipHash,
      source: "contact-form",
      emailStatus: "pending",
    });

    // 6. Emails. A failure is recorded on the enquiry, not shown as a failed submit.
    const emails = await sendEnquiryEmails(config, enquiry, reference, created._id);
    const emailStatus =
      emails.notification && emails.acknowledgement
        ? "sent"
        : !emails.notification && !emails.acknowledgement
          ? "both-failed"
          : !emails.notification
            ? "notification-failed"
            : "acknowledgement-failed";
    if (emailStatus !== "sent") console.error(`[enquiry] ${reference}: email ${emailStatus}`);

    try {
      await client.patch(created._id).set({ emailStatus }).commit();
    } catch {
      console.error(`[enquiry] ${reference}: could not record email status`);
    }

    return { status: "success", reference };
  } catch (error) {
    const name = error instanceof Error ? error.name : "UnknownError";
    console.error(`[enquiry] Storage error (${name})`);
    return failure("unavailable", UNAVAILABLE, values);
  }
}
