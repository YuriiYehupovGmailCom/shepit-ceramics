import { createClient } from "@sanity/client";
import { sanityDataset, sanityProjectId } from "@/lib/config";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2025-02-19",
  useCdn: true,
  perspective: "published",
});
