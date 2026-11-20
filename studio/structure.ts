import type { StructureResolver } from "sanity/structure";
import { enquiryStatuses } from "./schemaTypes/enquiry";

/** Enquiries first, then one list per status, newest first. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Enquiries")
    .items([
      S.listItem()
        .title("All enquiries")
        .id("all-enquiries")
        .child(
          S.documentTypeList("enquiry")
            .title("All enquiries")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
        ),
      S.divider(),
      ...enquiryStatuses.map((status) =>
        S.listItem()
          .title(status.title)
          .id(`status-${status.value}`)
          .child(
            S.documentTypeList("enquiry")
              .title(status.title)
              .filter('_type == "enquiry" && status == $status')
              .params({ status: status.value })
              .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
          ),
      ),
    ]);
