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

  it("uses the approved independent home metadata", () => {
    expect(contentByLocale.en.home.seo).toEqual({
      title: "CodexSkin – Themes, Tools & Guides for Codex Desktop",
      description:
        "Discover independent Codex desktop themes, customization tools and setup guides for Windows and macOS.",
    });
    expect(contentByLocale.zh.home.seo).toEqual({
      title: "CodexSkin - Codex桌面端主题、工具与安装指南",
      description:
        "提供独立的 Codex 桌面端主题素材、个性化工具，以及 Windows 和 macOS 安装使用指南。",
    });
  });

  it("defines two platform quick-start cards and a future-tool teaser", () => {
    const englishHome = contentByLocale.en.home as unknown as {
      quickStart?: { platforms: unknown[] };
      createLook?: { href: string; comingSoon: string };
    };
    const chineseHome = contentByLocale.zh.home as unknown as {
      quickStart?: { platforms: unknown[] };
      createLook?: { href: string; comingSoon: string };
    };

    expect(englishHome.quickStart?.platforms).toHaveLength(2);
    expect(chineseHome.quickStart?.platforms).toHaveLength(2);
    expect(englishHome.createLook).toMatchObject({
      href: "#themes",
      comingSoon: "Coming Soon",
    });
    expect(chineseHome.createLook).toMatchObject({
      href: "#themes",
      comingSoon: "即将上线",
    });
  });

  it("uses the launcher names documented by the current macOS upstream guide", () => {
    const english = JSON.stringify([
      ...contentByLocale.en.guides.macos.sections,
      ...contentByLocale.en.guides.restore.sections,
    ]);
    const chinese = JSON.stringify([
      ...contentByLocale.zh.guides.macos.sections,
      ...contentByLocale.zh.guides.restore.sections,
    ]);

    for (const content of [english, chinese]) {
      expect(content).toContain("Codex Dream Skin.command");
      expect(content).toContain("Codex Dream Skin - Customize.command");
      expect(content).toContain("Codex Dream Skin - Verify.command");
      expect(content).toContain("Codex Dream Skin - Restore.command");
      expect(content).not.toContain("Start Codex Dream Skin.command");
      expect(content).not.toContain("Customize Codex Dream Skin.command");
      expect(content).not.toContain("Verify Codex Dream Skin.command");
      expect(content).not.toContain("Restore Codex Dream Skin.command");
    }
  });
});
