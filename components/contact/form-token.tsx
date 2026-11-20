import { connection } from "next/server";
import { readEnquirySecret } from "@/lib/enquiry/config";
import { createFormToken, TOKEN_FIELD } from "@/lib/enquiry/spam";

/**
 * Signed "form opened at" timestamp, rendered per request (not at build time) inside a
 * Suspense boundary so the rest of the page stays static.
 */
export async function FormToken() {
  await connection();
  const secret = readEnquirySecret();
  if (!secret) return null;
  return <input type="hidden" name={TOKEN_FIELD} value={createFormToken(secret)} />;
}
