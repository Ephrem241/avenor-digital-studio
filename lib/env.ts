/**
 * True only on the Vercel production deployment. Local dev, local builds and Vercel
 * preview deployments return false, so drafts and review notices stay visible there.
 * Read on the server at build time; never import this into a client component.
 */
export const isProductionDeployment = process.env.VERCEL_ENV === "production";
