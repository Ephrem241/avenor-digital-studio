import "server-only";
import { Resend } from "resend";
import { site } from "@/lib/site";
import type { EnquiryConfig } from "./config";
import {
  budgetOptions,
  contactMethodOptions,
  industryOptions,
  labelFor,
  serviceOptions,
  timelineOptions,
} from "./options";
import type { Enquiry } from "./schema";

type Row = [label: string, value: string];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function summaryRows(enquiry: Enquiry): Row[] {
  const rows: Row[] = [
    ["Name", enquiry.fullName],
    ["Email", enquiry.email],
    ["Business", enquiry.businessName],
    ["Website", enquiry.website || "Not given"],
    ["Country", enquiry.country],
    ["Industry", labelFor(industryOptions, enquiry.industry)],
    ["Service", labelFor(serviceOptions, enquiry.service)],
    ["Budget", labelFor(budgetOptions, enquiry.budget)],
    ["Timeline", labelFor(timelineOptions, enquiry.timeline)],
    ["Contact by", labelFor(contactMethodOptions, enquiry.contactMethod)],
  ];
  if (enquiry.phone) rows.push(["Phone", enquiry.phone]);
  return rows;
}

function textBody(intro: string[], rows: Row[], description: string, outro: string[] = []): string {
  return [
    ...intro,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project description:",
    description,
    ...(outro.length ? ["", ...outro] : []),
  ].join("\n");
}

function htmlBody(intro: string[], rows: Row[], description: string, outro: string[] = []): string {
  const paragraph = (line: string) => `<p style="margin:0 0 12px">${escapeHtml(line)}</p>`;
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#77766f;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#faf8f4;color:#171717;font:15px/1.6 Arial,sans-serif">
<div style="max-width:600px;margin:0 auto">
<p style="margin:0 0 24px;font:600 13px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#806744">${escapeHtml(site.name)}</p>
${intro.map(paragraph).join("")}
<table style="border-collapse:collapse;margin:16px 0 24px">${tableRows}</table>
<p style="margin:0 0 6px;color:#77766f">Project description</p>
<p style="margin:0 0 24px;white-space:pre-wrap">${escapeHtml(description)}</p>
${outro.map(paragraph).join("")}
</div></body></html>`;
}

export type EmailResult = { notification: boolean; acknowledgement: boolean };

/**
 * Sends the agency notification and the visitor acknowledgement. Never throws:
 * a failed email must not undo a saved enquiry.
 */
export async function sendEnquiryEmails(
  config: EnquiryConfig,
  enquiry: Enquiry,
  reference: string,
  documentId: string,
): Promise<EmailResult> {
  const resend = new Resend(config.resendApiKey);
  const rows = summaryRows(enquiry);

  const studioLink = config.sanityStudioUrl
    ? `${config.sanityStudioUrl}/intent/edit/id=${encodeURIComponent(documentId)};type=enquiry`
    : null;
  const notificationIntro = [`New enquiry ${reference} from ${enquiry.businessName}.`];
  const notificationOutro = studioLink ? [`Open in Studio: ${studioLink}`] : [];

  const ackIntro = [
    `Hello ${enquiry.fullName},`,
    `Thank you for telling us about your project. We've received your enquiry, reference ${reference}.`,
    `We'll read it and reply by ${labelFor(contactMethodOptions, enquiry.contactMethod).toLowerCase()}. Here is a copy of what you sent:`,
  ];
  const ackOutro = [
    `If anything here needs correcting, reply to this email and quote ${reference}.`,
    site.name,
  ];

  const [notification, acknowledgement] = await Promise.allSettled([
    resend.emails.send({
      from: config.fromEmail,
      to: config.notifyEmail,
      replyTo: enquiry.email,
      subject: `New enquiry ${reference} from ${enquiry.businessName}`,
      text: textBody(notificationIntro, rows, enquiry.description, notificationOutro),
      html: htmlBody(notificationIntro, rows, enquiry.description, notificationOutro),
    }),
    resend.emails.send({
      from: config.fromEmail,
      to: enquiry.email,
      replyTo: config.notifyEmail,
      subject: `We've received your enquiry (${reference})`,
      text: textBody(ackIntro, rows, enquiry.description, ackOutro),
      html: htmlBody(ackIntro, rows, enquiry.description, ackOutro),
    }),
  ]);

  const succeeded = (result: (typeof notification)) =>
    result.status === "fulfilled" && !result.value.error;

  return { notification: succeeded(notification), acknowledgement: succeeded(acknowledgement) };
}
