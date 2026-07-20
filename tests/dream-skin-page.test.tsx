import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DreamSkinPage } from "@/components/dream-skin/dream-skin-page";

describe("DreamSkinPage search-intent landing page", () => {
  it("answers the English source and installation intents", () => {
    render(<DreamSkinPage locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Codex Dream Skin: GitHub & Installation Guide",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/not an OpenAI website or the official/),
    ).toBeVisible();

    const sourceLinks = screen.getAllByRole("link", {
      name: "View Original GitHub Repository",
    });
    expect(sourceLinks).toHaveLength(3);
    for (const source of sourceLinks) {
      expect(source).toHaveAttribute(
        "href",
        "https://github.com/Fei-Away/Codex-Dream-Skin",
      );
      expect(source).toHaveAttribute("target", "_blank");
      expect(source).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(
      screen.getByRole("link", { name: "Windows Installation Guide" }),
    ).toHaveAttribute("href", "/install/windows");
    expect(
      screen.getByRole("link", { name: "macOS Installation Guide" }),
    ).toHaveAttribute("href", "/install/macos");
    expect(
      screen.getByRole("link", { name: "Browse Codex skin examples" }),
    ).toHaveAttribute("href", "/#themes");
  });

  it("localizes every primary destination for Chinese searchers", () => {
    render(<DreamSkinPage locale="zh" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Codex Dream Skin：GitHub与安装指南",
      }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "查看 Windows 安装教程" })).toHaveAttribute(
      "href",
      "/zh/install/windows",
    );
    expect(screen.getByRole("link", { name: "查看 macOS 安装教程" })).toHaveAttribute(
      "href",
      "/zh/install/macos",
    );
    expect(screen.getByRole("link", { name: "查看 Codex 皮肤示例" })).toHaveAttribute(
      "href",
      "/zh#themes",
    );
  });

  it("shows verified source facts without inventing a tested version", () => {
    render(<DreamSkinPage locale="en" />);

    expect(screen.getByText("Fei-Away/Codex-Dream-Skin")).toBeVisible();
    expect(screen.getByText("Fei-Away")).toBeVisible();
    expect(screen.getByText(/macOS studio: MIT/)).toBeVisible();
    expect(screen.getByText("July 20, 2026")).toBeVisible();
    expect(screen.queryByText(/tested version/i)).toBeNull();
    expect(screen.getByText("Codex Desktop → Local CDP connection → Runtime theme/background injection → Customized appearance")).toBeVisible();
  });

  it.each([
    ["en", "One source image serves both the home banner and task background", "Get the usable source-image prompt", "/guide/customize"],
    ["zh", "同一张原图会同时用于首页横幅和任务页背景", "获取可用原图提示词", "/zh/guide/customize"],
  ] as const)("links %s visitors to the tested source-image guide", (locale, note, label, href) => {
    render(<DreamSkinPage locale={locale} />);
    expect(screen.getByText(new RegExp(note))).toBeVisible();
    expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
  });
});
