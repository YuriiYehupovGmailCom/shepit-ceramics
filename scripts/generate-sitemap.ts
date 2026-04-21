import { createClient } from "@sanity/client";
import fs from "fs";

const projectId = process.env.VITE_SANITY_PROJECT_ID || "i26iy2ue";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const baseUrl = process.env.SITE_URL || "https://shepit-ceramics.com";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  useCdn: true,
});

async function generateSitemap() {
  const products = await client.fetch<{ slug: string; name: string }[]>(
    `*[_type == "product" && defined(slug)] { "slug": slug.current, name }`
  );

  const staticRoutes = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/collection", priority: "0.9", changefreq: "weekly" },
    { loc: "/about", priority: "0.6", changefreq: "monthly" },
    { loc: "/care", priority: "0.5", changefreq: "monthly" },
    { loc: "/delivery", priority: "0.4", changefreq: "monthly" },
  ];

  const productRoutes = products.map((p) => ({
    loc: `/product/${p.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  }));

  const urls = [
    ...staticRoutes.map((r) => `  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
    ...productRoutes.map((r) => `  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <lastmod>${r.lastmod}</lastmod>
  </url>`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log(`✅ Sitemap generated with ${products.length} products`);
}

generateSitemap().catch(console.error);
