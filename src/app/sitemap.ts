import type { MetadataRoute } from "next";

import { ROUTES, absoluteUrl, alternatePaths, isInfoRoute, routePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((key) =>
    (["en", "zh"] as const).map((locale) => {
      const isDreamSkin = key === "dreamSkin";
      const isCustomize = key === "customize";
      const isInfo = isInfoRoute(key);

      return {
        url: absoluteUrl(routePath(locale, key)),
        lastModified: new Date(
          isInfo || isCustomize
            ? "2026-07-20T00:00:00.000Z"
            : isDreamSkin
              ? "2026-07-18T00:00:00.000Z"
              : "2026-07-16T00:00:00.000Z",
        ),
        changeFrequency: isInfo
          ? ("yearly" as const)
          : key === "home" || isDreamSkin
            ? ("weekly" as const)
            : ("monthly" as const),
        priority: isInfo ? 0.4 : key === "home" ? 1 : isDreamSkin ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(alternatePaths(locale, key)).map(([language, path]) => [
              language,
              absoluteUrl(path),
            ]),
          ),
        },
      };
    }),
  );
}
