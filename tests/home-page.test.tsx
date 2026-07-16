import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/components/home/home-page";

describe("HomePage conversion path", () => {
  it("places platform Quick Start after the theme gallery", () => {
    render(<HomePage locale="en" />);

    const gallery = screen.getByRole("heading", {
      name: "Eight moods. One real workspace.",
    });
    const quickStart = screen.getByRole("heading", {
      name: "Choose your platform.",
    });

    expect(
      gallery.compareDocumentPosition(quickStart) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "View macOS Guide" })).toHaveAttribute(
      "href",
      "/install/macos",
    );
    expect(screen.getByRole("link", { name: "View Windows Guide" })).toHaveAttribute(
      "href",
      "/install/windows",
    );
  });

  it("sends repository actions to the verified upstream safely", () => {
    render(<HomePage locale="en" />);

    const upstreamLinks = screen.getAllByRole("link", {
      name: /Get from Original Repository/,
    });

    expect(upstreamLinks).toHaveLength(2);
    expect(upstreamLinks[0]).toHaveAttribute(
      "href",
      "https://github.com/Fei-Away/Codex-Dream-Skin/tree/main/macos",
    );
    expect(upstreamLinks[1]).toHaveAttribute(
      "href",
      "https://github.com/Fei-Away/Codex-Dream-Skin/tree/main/windows",
    );
    for (const link of upstreamLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("links original themes and keeps the generator non-navigating", () => {
    render(<HomePage locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Create Your Own Look" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Browse Themes" })).toHaveAttribute(
      "href",
      "#themes",
    );
    expect(
      screen.getByRole("button", { name: "Create a Skin — Coming Soon" }),
    ).toBeDisabled();
  });
});
