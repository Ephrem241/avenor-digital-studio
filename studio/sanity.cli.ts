import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted at https://<studioHost>.sanity.studio after `npm run deploy`.
  // Set this once you've picked a host name, or the CLI asks on first deploy.
  // studioHost: "avenor-enquiries",
  deployment: { autoUpdates: true },
});
