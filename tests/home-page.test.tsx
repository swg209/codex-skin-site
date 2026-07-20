import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/components/home/home-page";

describe("HomePage conversion path", () => {
  it("places platform Quick Start after the editorial hero", () => {
    render(<HomePage locale="en" />);

    const hero = screen.getByRole("heading", {
      name: "Independent Themes, Tools & Guides for Codex Desktop",
    });
    const quickStart = screen.getByRole("heading", {
      name: "Choose your platform.",
    });

    expect(
      hero.compareDocumentPosition(quickStart) &
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

  it("uses the hero to explain Dream Skin before sending users upstream", () => {
    render(<HomePage locale="en" />);

    const overview = screen.getByRole("link", {
      name: "About Codex Dream Skin",
    });
    expect(overview).toHaveAttribute("href", "/codex-dream-skin");
    expect(overview).not.toHaveAttribute("target", "_blank");
  });

  it("links only to completed resources and removes uncertain demo artwork", () => {
    const { container } = render(<HomePage locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Create Your Own Look" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Read the Background Guide" })).toHaveAttribute(
      "href",
      "/guide/customize",
    );
    expect(screen.getByRole("link", { name: "Understand Dream Skin" })).toHaveAttribute(
      "href",
      "/codex-dream-skin",
    );
    expect(screen.queryByRole("button", { name: /Coming Soon/i })).not.toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/\/themes\/skin-0[1-8]\.jpg/);
  });
});
