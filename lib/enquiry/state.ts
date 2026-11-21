import type { EnquiryValues, FieldErrors } from "./fields";

/** What the enquiry Server Action returns to the form. Only what the UI renders. */
export type EnquiryState =
  | { status: "idle" }
  | { status: "success"; reference: string }
  | {
      status: "error";
      /** Validation errors are shown per field; other failures use only `message`. */
      kind: "validation" | "rejected" | "unavailable";
      message: string;
      fieldErrors: FieldErrors;
      values: EnquiryValues;
    };

export const initialEnquiryState: EnquiryState = { status: "idle" };
