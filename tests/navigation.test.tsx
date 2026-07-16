import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "@/components/site/header";

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

    expect(screen.getAllByRole("link", { name: "GitHub" })[0]).toHaveAttribute(
      "href",
      expect.stringContaining("github.com/swg209"),
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
});
