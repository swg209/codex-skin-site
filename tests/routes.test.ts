import { describe, expect, it } from "vitest";

import {
  allPublicPaths,
  GUIDE_ROUTES,
  ROUTES,
  alternatePaths,
  routeKeyFromPath,
  routePath,
} from "@/lib/site";

describe("public route contract", () => {
  it("defines twenty-two unique bilingual canonical routes", () => {
    const paths = ROUTES.flatMap((key) => [
      routePath("en", key),
      routePath("zh", key),
    ]);

    expect(paths).toHaveLength(22);
    expect(new Set(paths).size).toBe(22);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/zh",
        "/codex-dream-skin",
        "/zh/codex-dream-skin",
        "/install/windows",
        "/install/macos",
        "/guide/customize",
        "/guide/restore",
        "/zh/install/windows",
        "/zh/install/macos",
        "/zh/guide/customize",
        "/zh/guide/restore",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
        "/disclaimer",
        "/zh/about",
        "/zh/contact",
        "/zh/privacy",
        "/zh/terms",
        "/zh/disclaimer",
      ]),
    );
  });

  it("publishes forty-eight discoverable localized URLs", () => {
    const paths = allPublicPaths().map((entry) => entry.path);
    expect(paths).toHaveLength(48);
    expect(new Set(paths).size).toBe(48);
    expect(paths).toEqual(expect.arrayContaining(["/themes", "/zh/themes", "/themes/dark-aurora", "/zh/themes/violet-glass", "/guides/background-image-composition", "/zh/troubleshooting/macos-permissions", "/compatibility/codex-dream-skin"]));
  });

  it("keeps the project overview separate from procedural guides", () => {
    expect(ROUTES).toContain("dreamSkin");
    expect(GUIDE_ROUTES).toEqual([
      "windows",
      "macos",
      "customize",
      "restore",
    ]);
    expect(GUIDE_ROUTES).not.toContain("dreamSkin");
  });

  it("returns reciprocal language alternates", () => {
    expect(alternatePaths("en", "windows")).toEqual({
      en: "/install/windows",
      "zh-CN": "/zh/install/windows",
      "x-default": "/install/windows",
    });
  });

  it("maps localized paths back to their route key", () => {
    expect(routeKeyFromPath("/codex-dream-skin")).toBe("dreamSkin");
    expect(routeKeyFromPath("/zh/codex-dream-skin")).toBe("dreamSkin");
    expect(routeKeyFromPath("/zh/guide/restore")).toBe("restore");
    expect(routeKeyFromPath("/install/macos")).toBe("macos");
    expect(routeKeyFromPath("/about")).toBe("about");
    expect(routeKeyFromPath("/zh/privacy")).toBe("privacy");
    expect(routeKeyFromPath("/unknown")).toBe("home");
  });

  it("returns reciprocal alternates for the Dream Skin overview", () => {
    expect(alternatePaths("zh", "dreamSkin")).toEqual({
      en: "/codex-dream-skin",
      "zh-CN": "/zh/codex-dream-skin",
      "x-default": "/codex-dream-skin",
    });
  });
});
