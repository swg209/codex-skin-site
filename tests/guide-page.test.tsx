import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GuidePage } from "@/components/guides/guide-page";

describe("GuidePage source attribution", () => {
  it("identifies the English install guide as independent", () => {
    render(<GuidePage locale="en" routeKey="windows" />);

    expect(
      screen.getByText(
        "This guide references a third-party open-source project. CodexSkin.site is not the project developer and does not host or modify its installer.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Before running third-party scripts, review the source code and confirm that you are downloading from the original repository.",
      ),
    ).toBeVisible();

    const source = screen.getByRole("link", {
      name: "Get from Original Repository",
    });
    expect(source).toHaveAttribute(
      "href",
      "https://github.com/Fei-Away/Codex-Dream-Skin/tree/main/windows",
    );
    expect(source).toHaveAttribute("target", "_blank");
    expect(source).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("link", { name: "About Codex Dream Skin" }),
    ).toHaveAttribute("href", "/codex-dream-skin");
  });

  it("shows the localized disclosure on the Chinese macOS guide", () => {
    render(<GuidePage locale="zh" routeKey="macos" />);

    expect(
      screen.getByText(
        "本教程引用第三方开源项目。CodexSkin.site 不是该项目开发者，也不托管或修改其安装包。",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "运行第三方脚本前，请检查源代码，并确认文件来自原始仓库。",
      ),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "前往原始仓库" })).toHaveAttribute(
      "href",
      "https://github.com/Fei-Away/Codex-Dream-Skin/tree/main/macos",
    );
    expect(
      screen.getByRole("link", { name: "了解 Codex Dream Skin" }),
    ).toHaveAttribute("href", "/zh/codex-dream-skin");
  });

  it("renders the customize prompt as prose rather than a shell command", () => {
    render(<GuidePage locale="zh" routeKey="customize" />);

    const prompt = screen.getByText(/20:9 超宽电影感桌面壁纸/);
    expect(prompt.closest(".prompt-block")).not.toBeNull();
    expect(prompt.closest(".command-block")).toBeNull();
    expect(screen.getByRole("button", { name: "复制提示词" })).toBeVisible();
  });

  it("labels first-party review context separately from upstream facts", () => {
    render(<GuidePage locale="en" routeKey="windows" />);

    expect(screen.getAllByText("Editorial review context").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/First-party editorial review/)).toBeVisible();
    expect(screen.getByText("Safety boundary")).toBeVisible();
  });
});
