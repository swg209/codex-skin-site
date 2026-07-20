import { describe, expect, it } from "vitest";

import { isAdEligiblePath } from "@/lib/ad-eligibility";

describe("AdSense page eligibility", () => {
  it("suppresses every manual ad slot while review mode is enabled", () => {
    expect(
      isAdEligiblePath("/install/windows", { reviewMode: true }),
    ).toBe(false);
    expect(
      isAdEligiblePath("/themes/dark-aurora", { reviewMode: true }),
    ).toBe(false);
  });

  it.each([
    "/install/windows",
    "/zh/install/macos",
    "/guide/customize",
    "/zh/guide/restore",
    "/guides/background-image-composition",
    "/zh/troubleshooting/theme-not-visible",
    "/compatibility/codex-dream-skin",
    "/themes/dark-aurora",
    "/zh/themes/violet-glass",
  ])("allows a complete content detail page when review mode is disabled: %s", (path) => {
    expect(isAdEligiblePath(path, { reviewMode: false })).toBe(true);
  });

  it.each([
    "/",
    "/zh",
    "/about",
    "/zh/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/codex-dream-skin",
    "/themes",
    "/zh/themes",
    "/themes/not-a-theme",
    "/install/not-a-platform",
    "/unknown",
  ])("rejects non-content, index, trust, and unknown routes: %s", (path) => {
    expect(isAdEligiblePath(path, { reviewMode: false })).toBe(false);
  });
});
