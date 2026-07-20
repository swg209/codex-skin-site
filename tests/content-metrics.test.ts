import { describe, expect, it } from "vitest";

import { contentByLocale } from "@/content";
import type { GuideBlock, GuideContent } from "@/content/types";
import { articleHanCharacterCount, articleWordCount } from "@/lib/content-metrics";

function blockText(block: GuideBlock): string {
  if (block.type === "list") return block.items.join(" ");
  if (block.type === "evidence") {
    return [block.label, block.environment, block.reviewed, block.distinction].join(" ");
  }
  if (block.type === "callout") return `${block.label} ${block.text}`;
  return "text" in block ? block.text : "";
}

function guideText(guide: GuideContent): string {
  return [
    guide.h1,
    guide.summary,
    ...guide.sections.flatMap((section) => [
      section.title,
      ...section.blocks.map(blockText),
    ]),
  ].join(" ");
}

describe("content depth metrics", () => {
  it("counts English words and Chinese characters deterministically", () => {
    expect(articleWordCount("One tested guide with clear steps.")).toBe(6);
    expect(articleHanCharacterCount("这是完整中文说明。ABC")).toBe(8);
  });

  it.each([
    ["windows", 900],
    ["macos", 900],
    ["customize", 900],
    ["restore", 800],
  ] as const)("keeps the English %s guide substantial", (key, minimum) => {
    expect(articleWordCount(guideText(contentByLocale.en.guides[key]))).toBeGreaterThanOrEqual(minimum);
  });

  it.each(["windows", "macos", "customize", "restore"] as const)(
    "includes first-party context and actionable safety structure in %s",
    (key) => {
      const guide = contentByLocale.en.guides[key];
      expect(guide.sections.some((section) => section.blocks.some((block) => block.type === "evidence"))).toBe(true);
      expect(guide.sections.some((section) => section.blocks.some((block) => block.type === "callout"))).toBe(true);
      expect(guide.sections.length).toBeGreaterThanOrEqual(9);
    },
  );

  it.each(["windows", "macos", "customize", "restore"] as const)(
    "keeps the Chinese %s guide detailed and localized",
    (key) => {
      expect(articleHanCharacterCount(guideText(contentByLocale.zh.guides[key]))).toBeGreaterThanOrEqual(1500);
    },
  );
});
