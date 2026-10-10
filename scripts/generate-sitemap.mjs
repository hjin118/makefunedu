// Generates dist/sitemap.xml and dist/robots.txt at build time.
// SITE_URL resolution order: process.env.SITE_URL -> process.env.VITE_SITE_URL -> .env file VITE_SITE_URL.
// index.html uses a __SITE_URL__ placeholder (not %VITE_SITE_URL%, which breaks Vite's
// build-html plugin when undefined): set -> inject the domain; unset -> strip the tags.
// No sitemap is written when the URL is unset (robots.txt gets a placeholder instead).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const ROUTES = [
  "/",
  "/setup",
  "/prompt",
  "/handgen",
  "/gamegen",
  "/coding",
  "/esp32",
  "/microbit",
];

function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return undefined;
  const match = readFileSync(envPath, "utf8").match(
    /^\s*VITE_SITE_URL\s*=\s*(\S+)\s*$/m,
  );
  return match?.[1];
}

function writeSitemap(url) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = ROUTES.map(
    (route) =>
      `  <url>\n    <loc>${route === "/" ? url + "/" : url + route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  writeFileSync(join(dist, "sitemap.xml"), xml);
  console.log(`generate-sitemap: wrote dist/sitemap.xml (${ROUTES.length} routes, SITE_URL=${url})`);
}

function writeRobotsTxt(url) {
  const content = url
    ? `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`
    : `# 실제 배포 도메인 확정 후 .env의 VITE_SITE_URL을 설정하면 Sitemap 라인이 자동으로 추가됩니다.\nUser-agent: *\nAllow: /\n`;
  writeFileSync(join(dist, "robots.txt"), content);
  console.log("generate-sitemap: wrote dist/robots.txt");
}

// 도메인 미설정 시 URL 의존 태그를 제거해 "%VITE_SITE_URL%" 잔여물이 남지 않게 한다.
function postProcessIndexHtml(url) {
  const htmlPath = join(dist, "index.html");
  if (!existsSync(htmlPath)) return;
  let html = readFileSync(htmlPath, "utf8");
  if (url) {
    html = html.replaceAll("__SITE_URL__", url);
  } else {
    html = html
      .replace(/<meta[^>]*property=["']og:url["'][^>]*>/g, "")
      .replace(/<meta[^>]*property=["']og:image["'][^>]*>/g, "")
      .replace(/<meta[^>]*name=["']twitter:image["'][^>]*>/g, "")
      .replace(/<link[^>]*rel=["']canonical["'][^>]*>/g, "");
  }
  writeFileSync(htmlPath, html);
  console.log(
    `generate-sitemap: post-processed dist/index.html (${url ? "URL injected" : "domain-dependent tags removed"})`,
  );
}

const url = siteUrl();
if (!url) {
  console.warn("generate-sitemap: SITE_URL is unset; skipping sitemap.xml");
}
mkdirSync(dist, { recursive: true });
const base = url ? url.replace(/\/+$/, "") : undefined;
if (base) writeSitemap(base);
writeRobotsTxt(base);
postProcessIndexHtml(base);
