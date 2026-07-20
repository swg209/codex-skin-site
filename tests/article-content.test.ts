import { describe, expect, it } from "vitest";

import { ARTICLE_KEYS, articlesByLocale } from "@/content/articles";
import { articleHanCharacterCount, articleWordCount } from "@/lib/content-metrics";
import { articlePath } from "@/lib/site";

function articleText(locale: "en" | "zh", key: (typeof ARTICLE_KEYS)[number]) {
  const article = articlesByLocale[locale][key];
  return [article.h1, article.summary, ...article.sections.flatMap((section) => [section.title, ...section.blocks.flatMap((block) => block.type === "list" ? block.items : [block.text])])].join(" ");
}

describe("original editorial articles", () => {
  it("defines eight unique bilingual topics and sixteen paths", () => {
    expect(ARTICLE_KEYS).toHaveLength(8);
    const paths = ARTICLE_KEYS.flatMap((key) => [articlePath("en", key), articlePath("zh", key)]);
    expect(new Set(paths).size).toBe(16);
  });

  it.each(ARTICLE_KEYS)("keeps %s original and substantial in both locales", (key) => {
    const english = articlesByLocale.en[key];
    const chinese = articlesByLocale.zh[key];

    expect(articleWordCount(articleText("en", key))).toBeGreaterThanOrEqual(800);
    expect(articleHanCharacterCount(articleText("zh", key))).toBeGreaterThanOrEqual(1200);
    expect(english.sections.length).toBeGreaterThanOrEqual(5);
    expect(chinese.sections.length).toBe(english.sections.length);
    expect(english.reviewedDate).toBe("2026-07-20");
    expect(chinese.reviewedDate).toBe("2026-07-20");
    expect(english.related.length).toBeGreaterThanOrEqual(2);
  });

  it("does not reuse H1 and summary pairs", () => {
    for (const locale of ["en", "zh"] as const) {
      const pairs = ARTICLE_KEYS.map((key) => `${articlesByLocale[locale][key].h1}\n${articlesByLocale[locale][key].summary}`);
      expect(new Set(pairs).size).toBe(ARTICLE_KEYS.length);
    }
  });
});
