import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// @ts-expect-error The production verification script is intentionally plain ESM.
import * as siteVerifier from "../scripts/verify-site.mjs";

const { PUBLIC_PATHS, inspectHtml } = siteVerifier;

describe("production verification helper", () => {
  it("distinguishes a real head script from a preload-only response", () => {
    expect(siteVerifier).toHaveProperty("hasAdsenseHeadScript");
    expect(siteVerifier).toHaveProperty("hasAdsenseOwnershipSignal");

    const hasAdsenseHeadScript = (
      siteVerifier as typeof siteVerifier & {
        hasAdsenseHeadScript: (html: string) => boolean;
      }
    ).hasAdsenseHeadScript;

    expect(
      hasAdsenseHeadScript(
        '<head><link rel="preload" href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5491343418531814" as="script" /></head><body></body>',
      ),
    ).toBe(false);
    expect(
      hasAdsenseHeadScript(
        '<head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5491343418531814" crossorigin="anonymous"></script></head><body></body>',
      ),
    ).toBe(true);

    const hasAdsenseOwnershipSignal = (
      siteVerifier as typeof siteVerifier & {
        hasAdsenseOwnershipSignal: (html: string) => boolean;
      }
    ).hasAdsenseOwnershipSignal;

    expect(
      hasAdsenseOwnershipSignal(
        '<head><meta name="google-adsense-account" content="ca-pub-5491343418531814" /></head><body></body>',
      ),
    ).toBe(true);
  });

  it("verifies the AdSense authorized seller endpoint", () => {
    const source = readFileSync("scripts/verify-site.mjs", "utf8");

    expect(source).toContain('request(origin, "/ads.txt")');
    expect(source).toContain(
      "google.com, pub-5491343418531814, DIRECT, f08c47fec0942fa0",
    );
  });

  it("covers exactly forty-eight public content routes", () => {
    expect(PUBLIC_PATHS).toHaveLength(48);
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toContain(
      "/codex-dream-skin",
    );
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toContain(
      "/zh/codex-dream-skin",
    );
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toContain(
      "/zh/guide/restore",
    );
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toEqual(
      expect.arrayContaining([
        "/themes",
        "/themes/dark-aurora",
        "/zh/themes/violet-glass",
        "/guides/background-image-composition",
        "/zh/troubleshooting/theme-not-visible",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
        "/disclaimer",
        "/zh/about",
        "/zh/contact",
        "/zh/privacy",
        "/zh/terms",
        "/zh/disclaimer",
      ]),
    );
  });

  it("rejects incomplete or non-indexable page metadata", () => {
    const expectedCanonical = "https://codexskin.site/install/macos";
    const html = `
      <html><head>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://preview.vercel.app/install/macos" />
      </head><body><h1>One</h1><h1>Two</h1></body></html>
    `;

    expect(inspectHtml(html, { expectedCanonical, locale: "en" })).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/canonical/i),
        expect.stringMatching(/noindex/i),
        expect.stringMatching(/one h1/i),
        expect.stringMatching(/hreflang/i),
      ]),
    );
  });

  it("accepts Next.js root URLs without a trailing slash", () => {
    const html = `
      <html><head>
        <link rel="canonical" href="https://codexskin.site" />
        <link rel="alternate" hrefLang="en" href="https://codexskin.site" />
        <link rel="alternate" hrefLang="zh-CN" href="https://codexskin.site/zh" />
        <link rel="alternate" hrefLang="x-default" href="https://codexskin.site" />
      </head><body><h1>Codex Dream Skin</h1></body></html>
    `;

    expect(
      inspectHtml(html, {
        expectedCanonical: "https://codexskin.site/",
        locale: "en",
      }),
    ).toEqual([]);
  });

  it("rejects construction copy, archived artwork, and manual ads during review", () => {
    const expectedCanonical = "https://codexskin.site/";
    const html = `
      <html><head>
        <link rel="canonical" href="https://codexskin.site" />
        <link rel="alternate" hrefLang="en" href="https://codexskin.site" />
        <link rel="alternate" hrefLang="zh-CN" href="https://codexskin.site/zh" />
        <link rel="alternate" hrefLang="x-default" href="https://codexskin.site" />
      </head><body><h1>Home</h1><p>Coming Soon</p><img src="/themes/skin-01.jpg" /><ins class="adsbygoogle"></ins></body></html>
    `;

    expect(inspectHtml(html, { expectedCanonical, locale: "en" })).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/construction copy/i),
        expect.stringMatching(/archived theme/i),
        expect.stringMatching(/manual AdSense inventory/i),
      ]),
    );
  });
});
