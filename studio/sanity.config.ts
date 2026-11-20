import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "avenor",
  title: "Avenor Enquiries",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    // Enquiries arrive from the website only. Nobody creates or duplicates them here.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "enquiry"),
    actions: (prev, context) =>
      context.schemaType === "enquiry"
        ? prev.filter(({ action }) => action !== "duplicate")
        : prev,
  },
});
