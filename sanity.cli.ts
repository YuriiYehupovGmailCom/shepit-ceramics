import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "i26iy2ue",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
