import type { MetadataRoute } from "next";

import { ROUTES, absoluteUrl, alternatePaths, routePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((key) =>
    (["en", "zh"] as const).map((locale) => ({
      url: absoluteUrl(routePath(locale, key)),
      lastModified: new Date("2026-07-16T00:00:00.000Z"),
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: key === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternatePaths(locale, key)).map(([language, path]) => [
            language,
            absoluteUrl(path),
          ]),
        ),
      },
    })),
  );
}
