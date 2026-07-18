import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// @ts-expect-error The production verification script is intentionally plain ESM.
import * as siteVerifier from "../scripts/verify-site.mjs";

const { PUBLIC_PATHS, inspectHtml } = siteVerifier;

describe("production verification helper", () => {
  it("distinguishes a real head script from a preload-only response", () => {
    expect(siteVerifier).toHaveProperty("hasAdsenseHeadScript");

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
  });

  it("verifies the AdSense authorized seller endpoint", () => {
    const source = readFileSync("scripts/verify-site.mjs", "utf8");

    expect(source).toContain('request(origin, "/ads.txt")');
    expect(source).toContain(
      "google.com, pub-5491343418531814, DIRECT, f08c47fec0942fa0",
    );
  });

  it("covers exactly twelve public content routes", () => {
    expect(PUBLIC_PATHS).toHaveLength(12);
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toContain(
      "/codex-dream-skin",
    );
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toContain(
      "/zh/codex-dream-skin",
    );
    expect(PUBLIC_PATHS.map((entry: { path: string }) => entry.path)).toContain(
      "/zh/guide/restore",
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
});
