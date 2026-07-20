import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  breadcrumbSchema,
  buildMetadata,
  dreamSkinBreadcrumbSchema,
  dreamSkinFaqSchema,
  dreamSkinPageSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/seo";
import { ROUTES } from "@/lib/site";

describe("SEO output", () => {
  it("emits canonical and reciprocal hreflang", () => {
    const metadata = buildMetadata("zh", "windows");

    expect(metadata.alternates?.canonical).toBe(
      "https://codexskin.site/zh/install/windows",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://codexskin.site/install/windows",
      "zh-CN": "https://codexskin.site/zh/install/windows",
      "x-default": "https://codexskin.site/install/windows",
    });
  });

  it("keeps every route title and description unique by locale", () => {
    for (const locale of ["en", "zh"] as const) {
      const metadata = ROUTES.map((key) => buildMetadata(locale, key));
      expect(new Set(metadata.map((item) => item.title)).size).toBe(ROUTES.length);
      expect(new Set(metadata.map((item) => item.description)).size).toBe(ROUTES.length);
    }
  });

  it("lists all twenty-two canonical routes", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(22);
    expect(
      entries.every((entry) =>
        entry.url.startsWith("https://codexskin.site/"),
      ),
    ).toBe(true);
    expect(entries.some((entry) => entry.url.includes("www."))).toBe(false);

    const dreamSkinEntries = entries.filter((entry) =>
      entry.url.endsWith("/codex-dream-skin"),
    );
    expect(dreamSkinEntries).toHaveLength(2);
    for (const entry of dreamSkinEntries) {
      expect(entry.changeFrequency).toBe("weekly");
      expect(entry.priority).toBe(0.9);
      expect(entry.lastModified).toEqual(
        new Date("2026-07-18T00:00:00.000Z"),
      );
    }

    const customizeEntries = entries.filter((entry) =>
      entry.url.endsWith("/guide/customize"),
    );
    expect(customizeEntries).toHaveLength(2);
    for (const entry of customizeEntries) {
      expect(entry.lastModified).toEqual(
        new Date("2026-07-20T00:00:00.000Z"),
      );
      expect(entry.changeFrequency).toBe("monthly");
      expect(entry.priority).toBe(0.8);
    }

    const policyEntries = entries.filter((entry) =>
      ["/about", "/contact", "/privacy", "/terms", "/disclaimer"].some((path) =>
        entry.url.endsWith(path),
      ),
    );
    expect(policyEntries).toHaveLength(10);
    for (const entry of policyEntries) {
      expect(entry.lastModified).toEqual(new Date("2026-07-20T00:00:00.000Z"));
      expect(entry.changeFrequency).toBe("yearly");
      expect(entry.priority).toBe(0.4);
    }
  });

  it("allows crawling and publishes the sitemap", () => {
    expect(robots()).toMatchObject({
      sitemap: "https://codexskin.site/sitemap.xml",
      rules: { userAgent: "*", allow: "/" },
    });
  });

  it("publishes an installable web manifest", () => {
    expect(manifest()).toMatchObject({
      name: "CodexSkin",
      start_url: "/",
      display: "standalone",
    });
  });

  it("identifies the independent site in metadata", () => {
    const metadata = buildMetadata("en", "home");

    expect(metadata.openGraph?.siteName).toBe("CodexSkin");
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "https://codexskin.site/opengraph-image",
        alt: expect.stringContaining("Independent"),
      }),
    ]);
  });

  it("uses website JSON-LD instead of claiming authorship of software", () => {
    const source = readFileSync("src/lib/seo.ts", "utf8");

    expect(source).toContain("export function websiteSchema");
    expect(source).not.toContain('"@type": "SoftwareApplication"');
    expect(faqSchema("en").mainEntity).toHaveLength(10);
    expect(
      breadcrumbSchema("en", "restore").itemListElement.at(-1)?.name,
    ).toMatch(/Restore/);
    expect(webPageSchema("zh", "windows")).toMatchObject({
      "@type": "WebPage",
      inLanguage: "zh-CN",
      url: "https://codexskin.site/zh/install/windows",
    });
  });

  it("emits Dream Skin page, FAQ, and breadcrumb structured data", () => {
    expect(dreamSkinPageSchema("en")).toMatchObject({
      "@type": "WebPage",
      inLanguage: "en",
      url: "https://codexskin.site/codex-dream-skin",
      mainEntity: {
        "@type": "SoftwareSourceCode",
        codeRepository: "https://github.com/Fei-Away/Codex-Dream-Skin",
      },
    });
    expect(dreamSkinFaqSchema("zh").mainEntity).toHaveLength(10);
    expect(
      dreamSkinBreadcrumbSchema("zh").itemListElement.at(-1)?.item,
    ).toBe("https://codexskin.site/zh/codex-dream-skin");
  });
});
