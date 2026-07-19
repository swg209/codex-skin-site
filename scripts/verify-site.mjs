import { fileURLToPath } from "node:url";

const PRODUCTION_ORIGIN = "https://codexskin.site";
const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5491343418531814";
const ADSENSE_SELLER_RECORD =
  "google.com, pub-5491343418531814, DIRECT, f08c47fec0942fa0";

function productionUrl(path) {
  return path === "/" ? PRODUCTION_ORIGIN : `${PRODUCTION_ORIGIN}${path}`;
}

function normalizedRootUrl(url) {
  return url === `${PRODUCTION_ORIGIN}/` ? PRODUCTION_ORIGIN : url;
}

export const PUBLIC_PATHS = [
  { path: "/", locale: "en" },
  { path: "/zh", locale: "zh" },
  { path: "/codex-dream-skin", locale: "en" },
  { path: "/zh/codex-dream-skin", locale: "zh" },
  { path: "/install/windows", locale: "en" },
  { path: "/install/macos", locale: "en" },
  { path: "/guide/customize", locale: "en" },
  { path: "/guide/restore", locale: "en" },
  { path: "/zh/install/windows", locale: "zh" },
  { path: "/zh/install/macos", locale: "zh" },
  { path: "/zh/guide/customize", locale: "zh" },
  { path: "/zh/guide/restore", locale: "zh" },
  { path: "/about", locale: "en" },
  { path: "/contact", locale: "en" },
  { path: "/privacy", locale: "en" },
  { path: "/terms", locale: "en" },
  { path: "/disclaimer", locale: "en" },
  { path: "/zh/about", locale: "zh" },
  { path: "/zh/contact", locale: "zh" },
  { path: "/zh/privacy", locale: "zh" },
  { path: "/zh/terms", locale: "zh" },
  { path: "/zh/disclaimer", locale: "zh" },
];

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"))?.[1] ?? null;
}

function linkTags(html) {
  return html.match(/<link\b[^>]*>/gi) ?? [];
}

function metaTags(html) {
  return html.match(/<meta\b[^>]*>/gi) ?? [];
}

export function hasAdsenseHeadScript(html) {
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0] ?? "";
  const scripts = head.match(/<script\b[^>]*>/gi) ?? [];
  return scripts.some((tag) => attribute(tag, "src") === ADSENSE_SCRIPT_URL);
}

function localizedPaths(path, locale) {
  const englishPath = locale === "zh" ? path.replace(/^\/zh(?=\/|$)/, "") || "/" : path;
  const chinesePath = englishPath === "/" ? "/zh" : `/zh${englishPath}`;
  return { englishPath, chinesePath };
}

export function inspectHtml(html, { expectedCanonical, locale }) {
  const errors = [];
  const links = linkTags(html);
  const canonicalTag = links.find((tag) => attribute(tag, "rel")?.toLowerCase() === "canonical");
  const canonical = canonicalTag ? attribute(canonicalTag, "href") : null;

  if (normalizedRootUrl(canonical) !== normalizedRootUrl(expectedCanonical)) {
    errors.push(`canonical mismatch: expected ${expectedCanonical}, received ${canonical ?? "missing"}`);
  }

  const robotsMeta = metaTags(html).find((tag) => attribute(tag, "name")?.toLowerCase() === "robots");
  if (robotsMeta && /noindex/i.test(attribute(robotsMeta, "content") ?? "")) {
    errors.push("public page contains noindex");
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`expected one H1, received ${h1Count}`);

  const alternates = new Map(
    links
      .filter((tag) => attribute(tag, "rel")?.toLowerCase() === "alternate")
      .map((tag) => [attribute(tag, "hreflang"), attribute(tag, "href")]),
  );
  const path = expectedCanonical.slice(PRODUCTION_ORIGIN.length) || "/";
  const { englishPath, chinesePath } = localizedPaths(path, locale);
  const expectedAlternates = {
    en: productionUrl(englishPath),
    "zh-CN": productionUrl(chinesePath),
    "x-default": productionUrl(englishPath),
  };

  for (const [language, href] of Object.entries(expectedAlternates)) {
    if (alternates.get(language) !== href) {
      errors.push(`hreflang ${language} mismatch`);
    }
  }

  if (/https?:\/\/(?:localhost|127\.0\.0\.1)|\.vercel\.app/i.test(`${canonical} ${Array.from(alternates.values()).join(" ")}`)) {
    errors.push("preview or local host leaked into indexable metadata");
  }

  return errors;
}

async function request(origin, path) {
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

export async function verifySite(origin = process.env.SITE_ORIGIN || "http://127.0.0.1:3000") {
  const failures = [];

  for (const entry of PUBLIC_PATHS) {
    const { response, text } = await request(origin, entry.path);
    if (response.status !== 200) {
      failures.push(`${entry.path}: expected 200, received ${response.status}`);
      continue;
    }
    if (!hasAdsenseHeadScript(text)) {
      failures.push(`${entry.path}: missing AdSense script in head`);
    }
    const canonical = productionUrl(entry.path);
    for (const error of inspectHtml(text, { expectedCanonical: canonical, locale: entry.locale })) {
      failures.push(`${entry.path}: ${error}`);
    }
  }

  const sitemap = await request(origin, "/sitemap.xml");
  if (sitemap.response.status !== 200) failures.push(`/sitemap.xml: ${sitemap.response.status}`);
  for (const entry of PUBLIC_PATHS) {
    const url = `${PRODUCTION_ORIGIN}${entry.path}`;
    if (!sitemap.text.includes(url)) failures.push(`/sitemap.xml: missing ${url}`);
  }

  const robots = await request(origin, "/robots.txt");
  if (robots.response.status !== 200) failures.push(`/robots.txt: ${robots.response.status}`);
  if (!robots.text.includes(`${PRODUCTION_ORIGIN}/sitemap.xml`)) failures.push("/robots.txt: missing canonical sitemap");

  const manifest = await request(origin, "/manifest.webmanifest");
  if (manifest.response.status !== 200) failures.push(`/manifest.webmanifest: ${manifest.response.status}`);

  const ads = await request(origin, "/ads.txt");
  if (ads.response.status !== 200) failures.push(`/ads.txt: ${ads.response.status}`);
  if (!ads.text.includes(ADSENSE_SELLER_RECORD)) failures.push("/ads.txt: missing AdSense publisher record");

  const missing = await request(origin, "/definitely-not-a-real-page");
  if (missing.response.status !== 404) failures.push(`/404: expected 404, received ${missing.response.status}`);
  if (!/noindex/i.test(missing.text)) failures.push("/404: missing noindex");

  if (failures.length) throw new Error(`Site verification failed:\n${failures.join("\n")}`);
  return { routes: PUBLIC_PATHS.length, endpoints: 5 };
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  verifySite()
    .then((result) => console.log(`Verified ${result.routes} routes and ${result.endpoints} SEO endpoints.`))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
