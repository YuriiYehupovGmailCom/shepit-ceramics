type SanityProduct = {
    slug: string;
    _updatedAt: string;
};

type PagesContext = {
    request: Request;
    env: {
        VITE_SANITY_PROJECT_ID?: string;
    };
};

function requiredEnv(env: PagesContext["env"], name: keyof PagesContext["env"]) {
    const value = env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export async function onRequest(context: PagesContext) {
    let sanityProjectId: string;
    const dataset = "production";

    try {
        sanityProjectId = requiredEnv(context.env, "VITE_SANITY_PROJECT_ID");
    } catch (error) {
        return new Response(error instanceof Error ? error.message : "Missing sitemap configuration", {
            status: 500,
        });
    }

    const baseUrl = new URL(context.request.url).origin;

    const query = encodeURIComponent(`
    *[_type == "product" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

    const sanityUrl =
        `https://${sanityProjectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${query}`;

    const res = await fetch(sanityUrl);

    if (!res.ok) {
        return new Response("Failed to fetch sitemap data", {
            status: 500,
        });
    }

    const data = await res.json() as {
        result: SanityProduct[];
    };

    const staticRoutes = [
        "/",
        "/collection",
        "/about",
        "/care",
        "/delivery",
    ];

    const urls = [
        ...staticRoutes.map((path) => ({
            loc: `${baseUrl}${path === "/" ? "" : path}`,
            lastmod: new Date().toISOString().split("T")[0],
        })),

        ...data.result.map((product) => ({
            loc: `${baseUrl}/product/${product.slug}`,
            lastmod: product._updatedAt.split("T")[0],
        })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
        .map(
            (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
        )
        .join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",

            // browser cache
            "Cache-Control":
                "public, max-age=3600, s-maxage=3600",
        },
    });
}
