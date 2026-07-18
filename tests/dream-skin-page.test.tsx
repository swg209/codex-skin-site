import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DreamSkinPage } from "@/components/dream-skin/dream-skin-page";

describe("DreamSkinPage search-intent landing page", () => {
  it("answers the English source and installation intents", () => {
    render(<DreamSkinPage locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Codex Dream Skin: GitHub Source, Install Guides & Themes",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/not an OpenAI website or the official/),
    ).toBeVisible();

    const sourceLinks = screen.getAllByRole("link", {
      name: "Open Original GitHub Repository",
    });
    expect(sourceLinks).toHaveLength(2);
    for (const source of sourceLinks) {
      expect(source).toHaveAttribute(
        "href",
        "https://github.com/Fei-Away/Codex-Dream-Skin",
      );
      expect(source).toHaveAttribute("target", "_blank");
      expect(source).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(
      screen.getByRole("link", { name: "View Windows install guide" }),
    ).toHaveAttribute("href", "/install/windows");
    expect(
      screen.getByRole("link", { name: "View macOS install guide" }),
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
        name: "Codex Dream Skin：原始 GitHub、安装教程与 Codex 皮肤",
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
});
