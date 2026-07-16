import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeGallery } from "@/components/home/theme-gallery";
import { contentByLocale } from "@/content";

describe("ThemeGallery", () => {
  it("opens, navigates, and closes from the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <ThemeGallery
        locale="en"
        items={contentByLocale.en.home.gallery}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Rose Workspace/i }));
    expect(screen.getByRole("dialog")).toBeVisible();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      /Golden Workday/i,
    );

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders all theme previews with descriptive images", () => {
    render(
      <ThemeGallery
        locale="zh"
        items={contentByLocale.zh.home.gallery}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(8);
    expect(screen.getByAltText(/红白科幻 Codex 桌面主题/)).toBeVisible();
  });
});
