import { existsSync, readFileSync } from "node:fs";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteAnalytics } from "@/components/site/analytics";
import { contentByLocale } from "@/content";

describe("Google AdSense integration", () => {
  it("loads the publisher script once with anonymous CORS", () => {
    render(<SiteAnalytics />);
    const scripts = document.querySelectorAll(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5491343418531814"]',
    );

    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute("crossorigin", "anonymous");
    expect(scripts[0]).toHaveAttribute("data-nscript", "afterInteractive");
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
