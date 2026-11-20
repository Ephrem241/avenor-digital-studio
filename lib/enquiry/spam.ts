import { createHmac, timingSafeEqual } from "node:crypto";

export { HONEYPOT_FIELD, TOKEN_FIELD } from "./spam-fields";

/** Fastest plausible time for a person to fill in the form. */
export const MIN_FILL_MS = 3_000;
/** Older tokens are refused; the visitor reloads the page. */
export const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1000;

export const RATE_LIMITS = {
  perIpPerHour: 3,
  perEmailPerDay: 5,
} as const;

function sign(secret: string, value: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

/** A signed "form opened at" timestamp, rendered into the form as a hidden field. */
export function createFormToken(secret: string, now = Date.now()): string {
  const issued = String(now);
  return `${issued}.${sign(secret, `form:${issued}`)}`;
}

export type TokenCheck = "ok" | "missing" | "invalid" | "too-fast" | "expired";

export function checkFormToken(secret: string, token: string, now = Date.now()): TokenCheck {
  if (!token) return "missing";
  const [issued, signature] = token.split(".");
  if (!issued || !signature || !/^\d{13}$/.test(issued)) return "invalid";

  const expected = Buffer.from(sign(secret, `form:${issued}`));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";

  const age = now - Number(issued);
  if (age < MIN_FILL_MS) return "too-fast";
  if (age > MAX_TOKEN_AGE_MS) return "expired";
  return "ok";
}

/** One-way hash of the visitor's IP, so raw addresses are never stored. */
export function hashIp(secret: string, ip: string): string {
  return sign(secret, `ip:${ip}`).slice(0, 32);
}

/** First address in x-forwarded-for (set by Vercel), else x-real-ip. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
