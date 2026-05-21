import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const distIndexPath = path.join(distDir, "index.html");

const sanityProjectId = process.env.VITE_SANITY_PROJECT_ID || "i26iy2ue";
const sanityDataset = process.env.VITE_SANITY_DATASET || "production";
const sanityApiVersion = "2025-02-19";

const staticRoutes = ["/", "/collection", "/about", "/care", "/delivery"];
const excludedRoutePatterns = [/^\/checkout(?:\/|$)/, /^\/order-confirmation(?:\/|$)/, /^\/admin(?:\/|$)/];

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function fetchProductRoutes() {
  const query = `*[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }`;

  const url = new URL(
    `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}`,
  );
  url.searchParams.set("query", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sanity product route query failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const products = Array.isArray(data.result) ? data.result : [];

  return products
    .map((product) => product?.slug)
    .filter((slug) => typeof slug === "string" && slug.trim().length > 0)
    .map((slug) => `/product/${encodeURIComponent(slug)}`);
}

function isExcludedRoute(route) {
  return excludedRoutePatterns.some((pattern) => pattern.test(route));
}

function routeToOutputPath(route) {
  if (route === "/") {
    return distIndexPath;
  }

  const normalizedRoute = route.replace(/^\/+/, "").replace(/\/+$/, "");
  const outputPath = path.join(distDir, `${normalizedRoute}.html`);
  const relativeOutputPath = path.relative(distDir, outputPath);

  if (relativeOutputPath.startsWith("..") || path.isAbsolute(relativeOutputPath)) {
    throw new Error(`Refusing to write prerendered route outside dist: ${route}`);
  }

  return outputPath;
}

async function fileExists(filePath) {
  try {
    const fileStat = await stat(filePath);
    return fileStat.isFile();
  } catch {
    return false;
  }
}

function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const decodedPathname = decodeURIComponent(requestUrl.pathname);
      const safePathname = path.normalize(decodedPathname).replace(/^(\.\.[/\\])+/, "");
      let filePath = path.join(distDir, safePathname);

      if (!path.relative(distDir, filePath).startsWith("..")) {
        const fileStat = await stat(filePath).catch(() => null);

        if (fileStat?.isDirectory()) {
          filePath = path.join(filePath, "index.html");
        }

        if (await fileExists(filePath)) {
          const body = await readFile(filePath);
          response.writeHead(200, {
            "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
          });
          response.end(body);
          return;
        }
      }

      const body = await readFile(distIndexPath);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(body);
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(error instanceof Error ? error.message : "Internal prerender server error");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Failed to bind prerender server to a local port"));
        return;
      }

      resolve({
        origin: `http://127.0.0.1:${address.port}`,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          }),
      });
    });
  });
}

async function waitForReactRender(page, route) {
  await page.waitForLoadState("networkidle", { timeout: 30_000 });
  await page.waitForFunction(
    () => {
      const root = document.querySelector("#root");
      const bodyText = document.body?.innerText || "";

      return Boolean(root?.children.length) && Boolean(document.title) && !bodyText.includes("Завантаження");
    },
    undefined,
    { timeout: 30_000 },
  );

  if (route.startsWith("/product/")) {
    await page.waitForFunction(
      () => {
        const bodyText = document.body?.innerText || "";

        return !bodyText.includes("Товар не знайдено");
      },
      undefined,
      { timeout: 30_000 },
    ).catch(async () => {
      const title = await page.title();
      const bodyText = await page.locator("body").innerText().catch(() => "");

      throw new Error(
        `Product route did not render a product before timeout: ${route}. Title: "${title}". Body: "${bodyText.slice(0, 300)}"`,
      );
    });
  }
}

async function installSanityRequestProxy(page) {
  const sanityHostPattern = `https://${sanityProjectId}.{api,apicdn}.sanity.io/**`;

  await page.route(sanityHostPattern, async (route) => {
    const request = route.request();
    const response = await fetch(request.url(), {
      method: request.method(),
      headers: {
        accept: request.headers().accept || "application/json",
      },
      body: request.method() === "GET" || request.method() === "HEAD" ? undefined : request.postDataBuffer(),
    });
    const body = Buffer.from(await response.arrayBuffer());

    await route.fulfill({
      status: response.status,
      headers: {
        "access-control-allow-origin": "*",
        "cache-control": response.headers.get("cache-control") || "no-cache",
        "content-type": response.headers.get("content-type") || "application/json; charset=utf-8",
      },
      body,
    });
  });
}

function validateRenderedHtml(html, route) {
  if (!html.includes("<title>") || !html.includes('name="description"')) {
    throw new Error(`Missing title or meta description after rendering ${route}`);
  }

  if (html.includes('<div id="root"></div>')) {
    throw new Error(`React content was not rendered into #root for ${route}`);
  }

  if (route.startsWith("/product/") && html.includes("Товар не знайдено")) {
    throw new Error(`Product route rendered the not-found state: ${route}`);
  }
}

async function normalizeRenderedHead(page) {
  await page.evaluate(() => {
    const helmetDescription = document.head.querySelector('meta[name="description"][data-rh="true"]');

    if (helmetDescription) {
      document.head.querySelectorAll('meta[name="description"]').forEach((meta) => {
        if (meta !== helmetDescription) {
          meta.remove();
        }
      });
    }
  });
}

async function prerenderRoute(browser, origin, route) {
  const page = await browser.newPage();
  const diagnostics = [];

  try {
    page.setDefaultTimeout(30_000);
    await installSanityRequestProxy(page);

    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        diagnostics.push(`console ${message.type()}: ${message.text()}`);
      }
    });
    page.on("requestfailed", (request) => {
      diagnostics.push(`request failed: ${request.method()} ${request.url()} ${request.failure()?.errorText || ""}`);
    });
    page.on("response", (response) => {
      if (response.status() >= 400) {
        diagnostics.push(`response ${response.status()}: ${response.url()}`);
      }
    });

    const url = new URL(route, origin);

    await page.goto(url.href, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await waitForReactRender(page, route);
    await normalizeRenderedHead(page);

    const html = await page.content();
    validateRenderedHtml(html, route);

    const outputPath = routeToOutputPath(route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);

    console.log(`Prerendered ${route} -> ${path.relative(rootDir, outputPath)}`);
  } catch (error) {
    if (diagnostics.length > 0) {
      const diagnosticText = diagnostics.slice(-10).join("\n");
      const message = error instanceof Error ? error.message : String(error);

      throw new Error(`${message}\nRecent browser diagnostics for ${route}:\n${diagnosticText}`);
    }

    throw error;
  } finally {
    await page.close();
  }
}

async function main() {
  await stat(distIndexPath).catch(() => {
    throw new Error("dist/index.html was not found. Run vite build before prerendering.");
  });

  const productRoutes = await fetchProductRoutes();
  const routes = [...new Set([...staticRoutes, ...productRoutes])].filter((route) => !isExcludedRoute(route));

  if (routes.length === 0) {
    throw new Error("No routes were found for prerendering.");
  }

  let server;
  let browser;

  try {
    server = await createStaticServer();
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    console.log(`Prerender server running at ${server.origin}`);
    console.log(`Prerendering ${routes.length} routes`);

    for (const route of routes) {
      console.log(`Prerendering ${route}`);
      await prerenderRoute(browser, server.origin, route);
    }
  } finally {
    if (browser) {
      await browser.close();
    }

    if (server) {
      await server.close();
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
});
