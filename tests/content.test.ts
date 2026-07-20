import { describe, expect, it } from "vitest";

import { contentByLocale } from "@/content";

describe("localized product content", () => {
  it.each(["en", "zh"] as const)(
    "provides five substantial %s trust and policy pages",
    (locale) => {
      const info = (contentByLocale[locale] as unknown as {
        info?: Record<string, { seo: { title: string; description: string }; sections: unknown[] }>;
      }).info;

      expect(Object.keys(info ?? {})).toEqual(
        expect.arrayContaining(["about", "contact", "privacy", "terms", "disclaimer"]),
      );
      expect(Object.keys(info ?? {})).toHaveLength(5);
      for (const page of Object.values(info ?? {})) {
        expect(page.seo.title.length).toBeGreaterThan(12);
        expect(page.seo.description.length).toBeGreaterThan(40);
        expect(page.sections.length).toBeGreaterThanOrEqual(3);
      }
    },
  );

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

  it("reflects the current upstream Windows image-import workflow", () => {
    const content = JSON.stringify(contentByLocale);

    expect(content).not.toMatch(/does not expose the same picker|没有提供相同的选择器|没有同样的图片选择器/);
    expect(JSON.stringify(contentByLocale.en.guides.windows)).toMatch(/image|background/i);
    expect(JSON.stringify(contentByLocale.zh.guides.windows)).toMatch(/图片|背景/);
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

  it.each(["en", "zh"] as const)(
    "defines the complete %s Dream Skin search-intent content",
    (locale) => {
      const localeContent = contentByLocale[locale];
      const dreamSkin = localeContent.dreamSkin;

      expect(dreamSkin.hero.h1).toContain("Codex Dream Skin");
      expect(dreamSkin.faq).toHaveLength(10);
      expect(dreamSkin.guides).toHaveLength(2);
      expect(dreamSkin.whatItems).toHaveLength(3);
      expect(dreamSkin.boundaryItems).toHaveLength(4);
      expect(dreamSkin.identityNotice.length).toBeGreaterThan(30);
      expect(dreamSkin.sourceLabel.length).toBeGreaterThan(10);
      expect(localeContent.chrome.nav.dreamSkin.length).toBeGreaterThan(0);
      expect(localeContent.chrome.dreamSkinLabel.length).toBeGreaterThan(0);

      for (const guide of Object.values(localeContent.guides)) {
        expect(guide.overviewLabel.length).toBeGreaterThan(0);
      }
    },
  );

  it("uses the approved GSC-aligned Dream Skin metadata", () => {
    expect(contentByLocale.en.dreamSkin.seo).toEqual({
      title: "Codex Dream Skin – GitHub, Installation Guide & Themes",
      description:
        "Find the original Codex Dream Skin GitHub repository, Windows and macOS setup guides, safety notes, custom backgrounds and restore instructions.",
    });
    expect(contentByLocale.zh.dreamSkin.seo).toEqual({
      title: "Codex Dream Skin：GitHub地址、安装教程与主题效果",
      description:
        "查看Codex Dream Skin原始GitHub仓库，以及Windows、macOS安装、自定义背景、恢复官方界面和安全注意事项。",
    });
  });

  it.each(["en", "zh"] as const)("publishes complete %s project trust content", (locale) => {
    const dreamSkin = contentByLocale[locale].dreamSkin as typeof contentByLocale.en.dreamSkin & {
      sourceFacts?: unknown[];
      workflowSteps?: string[];
      overviewParagraphs?: string[];
      heroActions?: Record<string, string>;
    };

    expect(dreamSkin.faq).toHaveLength(10);
    expect(dreamSkin.sourceFacts).toHaveLength(4);
    expect(dreamSkin.workflowSteps).toHaveLength(4);
    expect(dreamSkin.overviewParagraphs?.length).toBeGreaterThanOrEqual(2);
    expect(Object.keys(dreamSkin.heroActions ?? {})).toEqual(["source", "windows", "macos"]);
  });

  it("states the Dream Skin site identity without official or ownership claims", () => {
    const english = JSON.stringify(contentByLocale.en.dreamSkin);
    const chinese = JSON.stringify(contentByLocale.zh.dreamSkin);

    expect(english).toContain("not an OpenAI website");
    expect(english).toContain("or the official Codex Dream Skin website");
    expect(english).toContain("do not host, modify, or repackage");
    expect(chinese).toContain("不是 OpenAI 网站");
    expect(chinese).toContain("不是 Codex Dream Skin 官方网站");
    expect(chinese).toContain("不托管、不修改、不重新打包");
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

  it.each(["en", "zh"] as const)(
    "contains complete %s tested source-image guidance",
    (locale) => {
      const guide = contentByLocale[locale].guides.customize;
      const serialized = JSON.stringify(guide);
      const prompt = guide.sections
        .flatMap((section) => section.blocks)
        .find((block) => block.type === "prompt");

      expect(serialized).toContain("20:9");
      expect(serialized).toMatch(/70%.*82%|70%至82%/);
      expect(serialized).toMatch(/35%.*50%|35%至50%/);
      expect(serialized).toContain("45%");
      expect(serialized).toContain("55%");
      expect(serialized).toContain("16:9");
      expect(prompt?.type).toBe("prompt");
      expect(contentByLocale[locale].dreamSkin.materialsPracticeNote).toBeTruthy();
    },
  );

  it("keeps the source-image guide tool-neutral and future capabilities honest", () => {
    const content = JSON.stringify({
      en: contentByLocale.en.guides.customize,
      zh: contentByLocale.zh.guides.customize,
    });

    expect(content).not.toMatch(/Midjourney|Stable Diffusion|Flux|DALL.E/i);
    expect(content).not.toMatch(/currently supports two images|当前支持双图/i);
  });

  it("uses completed contact channels and policy-safe public terminology", () => {
    const content = JSON.stringify(contentByLocale);

    expect(content).toContain("weigensu@gmail.com");
    expect(content).not.toMatch(/Local CDP Injection|本机 CDP 注入/);
    expect(content).not.toMatch(/stop the injector|停止注入器/i);
    expect(content).toMatch(/Local Runtime Styling/);
    expect(content).toMatch(/本机运行时样式层/);
    expect(content).toMatch(/access controls|访问控制/);
  });
});
