import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeDetailPage } from "@/components/themes/theme-detail-page";
import { ThemeIndexPage } from "@/components/themes/theme-index-page";
import { THEMES, THEME_SLUGS } from "@/content/themes";
import { articleHanCharacterCount, articleWordCount } from "@/lib/content-metrics";

describe("original theme catalog", () => {
  it("publishes four owned assets with complete rights records", () => {
    expect(THEME_SLUGS).toHaveLength(4);
    for (const theme of THEMES) {
      expect(theme.imagePath).toMatch(/^\/original-themes\/.+\.jpg$/);
      expect(theme.imagePath).not.toMatch(/\/themes\/skin-0/);
      expect(fs.existsSync(path.join(process.cwd(), "public", theme.imagePath))).toBe(true);
      expect(theme.creator).toBe("CodexSkin Editorial");
      expect(theme.creationDate).toBe("2026-07-20");
      expect(theme.sourceMethod).toMatch(/generated.*CodexSkin/i);
      expect(theme.license.id).toBe("CodexSkin-Theme-1.0");
      expect(theme.license.href).toBe("/original-themes/LICENSE.md");
      expect(theme.commercialUse).toBe(true);
      expect(theme.redistribution).toBe(true);
      expect(theme.flags).toEqual({ trademark: false, character: false, portrait: false });
      expect(articleWordCount(theme.copy.en.sections.flatMap((section) => [section.title, ...section.paragraphs]).join(" "))).toBeGreaterThanOrEqual(800);
      expect(articleHanCharacterCount(theme.copy.zh.sections.flatMap((section) => [section.title, ...section.paragraphs]).join(" "))).toBeGreaterThanOrEqual(1100);
    }
  });

  it("renders an index with localized detail links", () => {
    render(<ThemeIndexPage locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "Original Codex Theme Backgrounds" })).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByRole("link", { name: /Explore Dark Aurora/ })).toHaveAttribute("href", "/themes/dark-aurora");
  });

  it("renders rights, source, and application guidance on a detail page", () => {
    render(<ThemeDetailPage locale="zh" slug="violet-glass" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("紫晶玻璃");
    expect(screen.getByRole("link", { name: "CodexSkin-Theme-1.0" })).toHaveAttribute(
      "href",
      "/original-themes/LICENSE.md",
    );
    expect(screen.getByText(/无人物、角色、商标或文字/)).toBeVisible();
    expect(screen.getByRole("link", { name: "阅读背景图构图指南" })).toHaveAttribute("href", "/zh/guides/background-image-composition");
  });
});
