function requiredEnv(name: keyof ImportMetaEnv) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const configuredSiteUrl = requiredEnv("VITE_SITE_URL").replace(/\/+$/, "");

export function siteUrl(path = "") {
  const normalizedPath = path === "/" ? "" : path;

  return `${configuredSiteUrl}${normalizedPath}`;
}

export const sanityProjectId = requiredEnv("VITE_SANITY_PROJECT_ID");

export const sanityDataset = "production";

export const sanityStudioTitle =
  import.meta.env.VITE_SANITY_STUDIO_TITLE || "Shepit Ceramics Admin";
