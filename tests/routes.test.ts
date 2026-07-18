import { describe, expect, it } from "vitest";

import {
  GUIDE_ROUTES,
  ROUTES,
  alternatePaths,
  routeKeyFromPath,
  routePath,
} from "@/lib/site";

describe("public route contract", () => {
  it("defines twelve unique canonical routes", () => {
    const paths = ROUTES.flatMap((key) => [
      routePath("en", key),
      routePath("zh", key),
    ]);

    expect(paths).toHaveLength(12);
    expect(new Set(paths).size).toBe(12);
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
      ]),
    );
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
