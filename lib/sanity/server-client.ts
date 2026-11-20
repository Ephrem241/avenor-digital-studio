import "server-only";
import { createClient, type SanityClient } from "@sanity/client";
import type { EnquiryConfig } from "@/lib/enquiry/config";

export const SANITY_API_VERSION = "2026-11-01";

/**
 * Authenticated Sanity client for server-side writes. Never import from a client
 * component: it carries the write token.
 */
export function createServerClient(config: EnquiryConfig): SanityClient {
  return createClient({
    projectId: config.sanityProjectId,
    dataset: config.sanityDataset,
    apiVersion: SANITY_API_VERSION,
    token: config.sanityToken,
    useCdn: false,
    perspective: "raw",
  });
}
