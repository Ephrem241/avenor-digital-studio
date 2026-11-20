import { randomInt } from "node:crypto";

/** No 0/O or 1/I/L, so a reference read over the phone is unambiguous. */
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export const REFERENCE_PATTERN = /^AVN-\d{4}-[2-9A-HJKMNP-Z]{4}$/;

/** A short reference for the visitor, like AVN-2611-7K3Q (year, month, random). */
export function createReference(date = new Date()): string {
  const yy = String(date.getUTCFullYear()).slice(-2);
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += ALPHABET[randomInt(ALPHABET.length)];
  return `AVN-${yy}${mm}-${suffix}`;
}
