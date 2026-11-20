import { defineArrayMember, defineField, defineType } from "sanity";

/** AGENTS.md §11 statuses. Keep the values stable: the website writes "new". */
export const enquiryStatuses = [
  { title: "New", value: "new" },
  { title: "Contacted", value: "contacted" },
  { title: "Qualified", value: "qualified" },
  { title: "Proposal Sent", value: "proposal-sent" },
  { title: "Won", value: "won" },
  { title: "Lost", value: "lost" },
] as const;

const emailStatuses = [
  { title: "Sending", value: "pending" },
  { title: "Both sent", value: "sent" },
  { title: "Notification to Avenor failed", value: "notification-failed" },
  { title: "Acknowledgement to visitor failed", value: "acknowledgement-failed" },
  { title: "Both failed", value: "both-failed" },
];

/** A field the website fills in. Read-only here so the original enquiry is kept intact. */
const submitted = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: "string", readOnly: true, group: "enquiry", ...extra });

export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  groups: [
    { name: "manage", title: "Manage", default: true },
    { name: "enquiry", title: "Enquiry" },
    { name: "system", title: "System" },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "manage",
      initialValue: "new",
      options: { list: [...enquiryStatuses], layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Internal notes",
      description: "Only visible in this Studio. Never shown to the client.",
      type: "array",
      group: "manage",
      of: [
        defineArrayMember({
          type: "object",
          name: "note",
          fields: [
            defineField({ name: "text", title: "Note", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({
              name: "createdAt",
              title: "Added",
              type: "datetime",
              initialValue: () => new Date().toISOString(),
              readOnly: true,
            }),
          ],
          preview: {
            select: { title: "text", subtitle: "createdAt" },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: subtitle ? new Date(subtitle).toLocaleString() : undefined,
            }),
          },
        }),
      ],
    }),

    submitted("reference", "Reference"),
    defineField({ name: "submittedAt", title: "Submitted", type: "datetime", readOnly: true, group: "enquiry" }),
    submitted("fullName", "Full name"),
    submitted("email", "Business email"),
    submitted("businessName", "Business name"),
    defineField({ name: "website", title: "Website", type: "url", readOnly: true, group: "enquiry" }),
    submitted("country", "Country"),
    submitted("industry", "Industry"),
    submitted("service", "Service"),
    submitted("budget", "Budget range"),
    submitted("timeline", "Timeline"),
    defineField({
      name: "description",
      title: "Project description",
      type: "text",
      rows: 8,
      readOnly: true,
      group: "enquiry",
    }),
    submitted("contactMethod", "Preferred contact method"),
    submitted("phone", "Phone / WhatsApp"),

    defineField({
      name: "emailStatus",
      title: "Emails",
      type: "string",
      readOnly: true,
      group: "system",
      options: { list: emailStatuses },
    }),
    submitted("source", "Source", { group: "system" }),
    submitted("ipHash", "IP hash", {
      group: "system",
      description: "One-way hash used for rate limiting. The IP address itself is not stored.",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "submittedDesc", by: [{ field: "submittedAt", direction: "desc" }] },
    { title: "Oldest first", name: "submittedAsc", by: [{ field: "submittedAt", direction: "asc" }] },
  ],
  preview: {
    select: { business: "businessName", name: "fullName", reference: "reference", status: "status", submittedAt: "submittedAt" },
    prepare: ({ business, name, reference, status, submittedAt }) => {
      const statusTitle = enquiryStatuses.find((item) => item.value === status)?.title ?? status;
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : "";
      return {
        title: business || name || "Enquiry",
        subtitle: [reference, statusTitle, date].filter(Boolean).join(" · "),
      };
    },
  },
});
