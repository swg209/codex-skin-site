import type { MetadataRoute } from "next";

import { allPublicPaths, absoluteUrl, localizedAlternatesForPath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPublicPaths().map(({ path }) => {
    const isInfo = /\/(about|contact|privacy|terms|disclaimer)$/.test(path);
    const isHome = path === "/" || path === "/zh";
    const isDreamSkin = (path.replace(/^\/zh(?=\/|$)/, "") || "/") === "/codex-dream-skin";
    const isCoreGuide = /\/(install\/(windows|macos)|guide\/(customize|restore))$/.test(path);
    return {
      url: absoluteUrl(path),
      lastModified: new Date(isDreamSkin ? "2026-07-18T00:00:00.000Z" : isHome ? "2026-07-16T00:00:00.000Z" : "2026-07-20T00:00:00.000Z"),
      changeFrequency: isInfo ? ("yearly" as const) : isHome || isDreamSkin ? ("weekly" as const) : ("monthly" as const),
      priority: isInfo
        ? 0.4
        : isHome
          ? 1
          : isDreamSkin
            ? 0.9
            : isCoreGuide || path === "/themes" || path === "/zh/themes"
              ? 0.8
              : 0.7,
      alternates: { languages: Object.fromEntries(Object.entries(localizedAlternatesForPath(path)).map(([language, value]) => [language, absoluteUrl(value)])) },
    };
  });
}
