import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

describe("Header", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("exposes navigation and the matching locale alternative", async () => {
    const user = userEvent.setup();
    render(<Header locale="en" />);

    expect(screen.getByRole("link", { name: "CodexSkin home" })).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Dream Skin" })[0]).toHaveAttribute(
      "href",
      "/codex-dream-skin",
    );
    expect(screen.getAllByRole("link", { name: "Themes" })[0]).toHaveAttribute("href", "/themes");
    expect(screen.getAllByRole("link", { name: "Guides" })[0]).toHaveAttribute("href", "/guides/background-image-composition");
    expect(screen.getAllByRole("link", { name: "GitHub" })[0]).toHaveAttribute(
      "href",
      "https://github.com/Fei-Away/Codex-Dream-Skin",
    );
    expect(screen.getAllByRole("link", { name: "GitHub" })[0]).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.getAllByRole("link", { name: "中文" })[0]).toHaveAttribute(
      "href",
      "/zh",
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
  });

  it("links the localized Dream Skin overview from the footer", () => {
    render(<Footer locale="zh" />);

    expect(screen.getByRole("link", { name: "了解 Codex Dream Skin" })).toHaveAttribute(
      "href",
      "/zh/codex-dream-skin",
    );
    expect(screen.getByRole("link", { name: "关于本站" })).toHaveAttribute("href", "/zh/about");
    expect(screen.getByRole("link", { name: "联系我们" })).toHaveAttribute("href", "/zh/contact");
    expect(screen.getByRole("link", { name: "隐私政策" })).toHaveAttribute("href", "/zh/privacy");
    expect(screen.getByRole("link", { name: "使用条款" })).toHaveAttribute("href", "/zh/terms");
    expect(screen.getByRole("link", { name: "免责声明" })).toHaveAttribute("href", "/zh/disclaimer");
    expect(screen.getByRole("link", { name: "原创主题" })).toHaveAttribute("href", "/zh/themes");
    expect(screen.getByRole("link", { name: "背景图构图指南" })).toHaveAttribute("href", "/zh/guides/background-image-composition");
    expect(screen.getByRole("link", { name: "CodexSkin 网站源码" })).toHaveAttribute(
      "href",
      "https://github.com/swg209/codex-skin-site",
    );
  });
});
