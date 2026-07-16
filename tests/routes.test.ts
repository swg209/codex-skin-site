import { describe, expect, it } from "vitest";

import {
  ROUTES,
  alternatePaths,
  routeKeyFromPath,
  routePath,
} from "@/lib/site";

describe("public route contract", () => {
  it("defines ten unique canonical routes", () => {
    const paths = ROUTES.flatMap((key) => [
      routePath("en", key),
      routePath("zh", key),
    ]);

    expect(paths).toHaveLength(10);
    expect(new Set(paths).size).toBe(10);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/zh",
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

  it("returns reciprocal language alternates", () => {
    expect(alternatePaths("en", "windows")).toEqual({
      en: "/install/windows",
      "zh-CN": "/zh/install/windows",
      "x-default": "/install/windows",
    });
  });

  it("maps localized paths back to their route key", () => {
    expect(routeKeyFromPath("/zh/guide/restore")).toBe("restore");
    expect(routeKeyFromPath("/install/macos")).toBe("macos");
    expect(routeKeyFromPath("/unknown")).toBe("home");
  });
});
