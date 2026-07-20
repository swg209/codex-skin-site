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
    expect(siteConfig.adsense.reviewMode).toBe(true);
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

  it("keeps manual inventory behind an explicit content eligibility gate", () => {
    const component = readFileSync("src/components/site/ad-slot.tsx", "utf8");

    expect(component).toContain("isAdEligiblePath(pathname)");
    expect(component).toContain('locale === "zh" ? "广告" : "Advertisement"');
    expect(component).toContain("data-ad-client={siteConfig.adsense.publisherId}");
    expect(component).not.toMatch(/Install for Windows|Get from Original Repository/);
  });

  it("discloses advertising in both privacy notices", () => {
    expect(contentByLocale.en.chrome.privacyText).toMatch(/Google AdSense/);
    expect(contentByLocale.en.chrome.privacyText).toMatch(/cookies/i);
    expect(contentByLocale.zh.chrome.privacyText).toMatch(/Google AdSense/);
    expect(contentByLocale.zh.chrome.privacyText).toMatch(/Cookie/i);
  });

  it.each(["en", "zh"] as const)(
    "publishes complete %s advertising and consent disclosures",
    (locale) => {
      const privacy = JSON.stringify(contentByLocale[locale].info.privacy);

      expect(privacy).toMatch(/Google/);
      expect(privacy).toMatch(/third-party vendors|第三方供应商/i);
      expect(privacy).toMatch(/cookies|Cookie/i);
      expect(privacy).toMatch(/IP address|IP 地址/i);
      expect(privacy).toMatch(/identifiers|标识符/i);
      expect(privacy).toMatch(/personalized|个性化/i);
      expect(privacy).toMatch(/EEA|欧洲经济区/i);
      expect(privacy).toMatch(/United Kingdom|英国/i);
      expect(privacy).toMatch(/Switzerland|瑞士/i);
      expect(privacy).toContain("weigensu@gmail.com");
    },
  );
});
