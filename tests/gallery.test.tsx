import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeGallery } from "@/components/home/theme-gallery";

describe("ThemeGallery", () => {
  it("links all original English previews to theme details", () => {
    render(<ThemeGallery locale="en" />);
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByRole("link", { name: /Dark Aurora/ })).toHaveAttribute("href", "/themes/dark-aurora");
  });

  it("renders localized previews without archived demonstration images", () => {
    const { container } = render(<ThemeGallery locale="zh" />);
    expect(screen.getByAltText(/翡翠极光集中在右侧/)).toBeVisible();
    expect(container.innerHTML).not.toMatch(/\/themes\/skin-0/);
  });
});
