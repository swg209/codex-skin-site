import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandBlock } from "@/components/guides/command-block";

describe("CommandBlock", () => {
  it("copies a real command and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(
      <CommandBlock
        code="npm run build"
        copyLabel="Copy"
        copiedLabel="Copied"
        copyFailedLabel="Select and copy"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("npm run build");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  it("keeps selectable text when clipboard is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    render(
      <CommandBlock
        code="npm run build"
        copyLabel="Copy"
        copiedLabel="Copied"
        copyFailedLabel="Select and copy"
      />,
    );

    expect(screen.getByText("npm run build")).toBeVisible();
  });
});
