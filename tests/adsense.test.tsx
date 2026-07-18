import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { contentByLocale } from "@/content";

describe("Google AdSense integration", () => {
  it("places a native publisher script inside both root heads", () => {
    const componentPath = "src/components/site/adsense-script.tsx";
    expect(existsSync(componentPath)).toBe(true);

    const component = readFileSync(componentPath, "utf8");
    expect(siteConfig.adsense.publisherId).toBe("ca-pub-5491343418531814");
    expect(component).toContain("siteConfig.adsense.publisherId");
    expect(component).toContain("<script");
    expect(component).not.toContain('from "next/script"');
    expect(component).toContain("async");
    expect(component).toContain('crossOrigin="anonymous"');

    for (const layout of [
      "src/app/(en)/layout.tsx",
      "src/app/(zh)/zh/layout.tsx",
    ]) {
      const source = readFileSync(layout, "utf8");
      expect(source).toMatch(
        /<head>\s*<AdSenseHeadScript \/>\s*<\/head>/,
      );
    }

    expect(readFileSync("src/components/site/analytics.tsx", "utf8")).not.toContain(
      "adsbygoogle",
    );
  });

  it("publishes the matching authorized digital seller record", () => {
    expect(existsSync("public/ads.txt")).toBe(true);
    expect(readFileSync("public/ads.txt", "utf8").trim()).toBe(
      "google.com, pub-5491343418531814, DIRECT, f08c47fec0942fa0",
    );
  });

  it("discloses advertising in both privacy notices", () => {
    expect(contentByLocale.en.chrome.privacyText).toMatch(/Google AdSense/);
    expect(contentByLocale.en.chrome.privacyText).toMatch(/cookies/i);
    expect(contentByLocale.zh.chrome.privacyText).toMatch(/Google AdSense/);
    expect(contentByLocale.zh.chrome.privacyText).toMatch(/Cookie/i);
  });
});
