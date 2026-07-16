import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  softwareApplicationSchema,
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
      expect(new Set(metadata.map((item) => item.title)).size).toBe(5);
      expect(new Set(metadata.map((item) => item.description)).size).toBe(5);
    }
  });

  it("lists all ten canonical routes", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(10);
    expect(
      entries.every((entry) =>
        entry.url.startsWith("https://codexskin.site/"),
      ),
    ).toBe(true);
    expect(entries.some((entry) => entry.url.includes("www."))).toBe(false);
  });

  it("allows crawling and publishes the sitemap", () => {
    expect(robots()).toMatchObject({
      sitemap: "https://codexskin.site/sitemap.xml",
      rules: { userAgent: "*", allow: "/" },
    });
  });

  it("publishes an installable web manifest", () => {
    expect(manifest()).toMatchObject({
      name: "Codex Dream Skin",
      start_url: "/",
      display: "standalone",
    });
  });

  it("keeps JSON-LD synchronized with visible content", () => {
    expect(faqSchema("en").mainEntity).toHaveLength(10);
    expect(
      breadcrumbSchema("en", "restore").itemListElement.at(-1)?.name,
    ).toMatch(/Restore/);
    expect(softwareApplicationSchema("en")).not.toHaveProperty("aggregateRating");
    expect(softwareApplicationSchema("en")).not.toHaveProperty("downloadUrl");
  });
});
