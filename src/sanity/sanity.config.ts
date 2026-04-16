import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { sanityDataset, sanityProjectId, sanityStudioTitle } from "./project";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: sanityStudioTitle,
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/admin",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
