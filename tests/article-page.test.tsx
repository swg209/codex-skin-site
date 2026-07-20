import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArticlePage } from "@/components/articles/article-page";

describe("ArticlePage", () => {
  it("renders semantic authorship, contents, evidence, and related links", () => {
    render(<ArticlePage locale="en" articleKey="background-image-composition" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Codex Background Image Composition");
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThanOrEqual(5);
    expect(screen.getByText("Reviewed 20 July 2026")).toBeVisible();
    expect(screen.getByText("CodexSkin Editorial")).toBeVisible();
    expect(screen.getByRole("navigation", { name: "On this page" })).toBeVisible();
    expect(screen.getByText(/First-party practice note/)).toBeVisible();
    expect(screen.getByRole("heading", { name: "Related reading" })).toBeVisible();
  });

  it("renders Chinese labels and localized related paths", () => {
    render(<ArticlePage locale="zh" articleKey="readability-and-contrast" />);
    expect(screen.getByText("CodexSkin 编辑部")).toBeVisible();
    expect(screen.getByRole("navigation", { name: "本页目录" })).toBeVisible();
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href")?.startsWith("/zh/"))).toBe(true);
  });
});
