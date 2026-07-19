import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PromptBlock } from "@/components/guides/prompt-block";

describe("PromptBlock", () => {
  it("copies only the source-image prompt and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <PromptBlock
        text="20:9 source-image prompt"
        copyLabel="Copy prompt"
        copiedLabel="Prompt copied"
        copyFailedLabel="Select and copy the prompt"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Copy prompt" }));
    expect(writeText).toHaveBeenCalledOnce();
    expect(writeText).toHaveBeenCalledWith("20:9 source-image prompt");
    expect(screen.getByRole("status")).toHaveTextContent("Prompt copied");
  });

  it("keeps the prompt selectable when clipboard access fails", () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(
      <PromptBlock
        text="20:9 source-image prompt"
        copyLabel="Copy prompt"
        copiedLabel="Prompt copied"
        copyFailedLabel="Select and copy the prompt"
      />,
    );

    expect(screen.getByText("20:9 source-image prompt")).toBeVisible();
  });

  it("announces the manual-copy fallback when clipboard access fails", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(
      <PromptBlock
        text="20:9 source-image prompt"
        copyLabel="Copy prompt"
        copiedLabel="Prompt copied"
        copyFailedLabel="Select and copy the prompt"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Copy prompt" }));
    expect(screen.getByRole("status")).toHaveTextContent("Select and copy the prompt");
  });
});
