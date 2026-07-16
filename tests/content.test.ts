import { describe, expect, it } from "vitest";

import { contentByLocale } from "@/content";

describe("localized product content", () => {
  it.each(["en", "zh"] as const)(
    "contains complete %s home content",
    (locale) => {
      const home = contentByLocale[locale].home;

      expect(home.gallery).toHaveLength(8);
      expect(home.faq).toHaveLength(10);
      expect(home.features).toHaveLength(6);
      expect(home.hero.h1.length).toBeGreaterThan(15);
    },
  );

  it("does not claim Windows supports custom images", () => {
    const windows = JSON.stringify({
      en: contentByLocale.en.guides.windows,
      zh: contentByLocale.zh.guides.windows,
    }).toLowerCase();

    expect(windows).not.toMatch(
      /use your own image|custom user image|自定义图片|用户选图/,
    );
  });

  it("keeps source-backed platform requirements", () => {
    expect(JSON.stringify(contentByLocale.en.guides.windows)).toContain(
      "Node.js 22",
    );
    expect(JSON.stringify(contentByLocale.en.guides.macos)).toContain(
      "Apple Silicon",
    );
    expect(JSON.stringify(contentByLocale.en.guides.macos)).toContain("Intel");
  });
});
