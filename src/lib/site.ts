import { siteConfig } from "@/config/site";

export const SITE_URL = siteConfig.url;
export const GITHUB_URL = siteConfig.upstream.repositoryUrl;
export const ISSUE_URL = siteConfig.upstream.issuesUrl;

export const ROUTES = [
  "home",
  "windows",
  "macos",
  "customize",
  "restore",
] as const;

export type RouteKey = (typeof ROUTES)[number];
export type Locale = "en" | "zh";

const englishPaths: Record<RouteKey, string> = {
  home: "/",
  windows: "/install/windows",
  macos: "/install/macos",
  customize: "/guide/customize",
  restore: "/guide/restore",
};

export function routePath(locale: Locale, key: RouteKey): string {
  const path = englishPaths[key];

  if (locale === "en") {
    return path;
  }

  return path === "/" ? "/zh" : `/zh${path}`;
}

export function alternatePaths(_locale: Locale, key: RouteKey) {
  return {
    en: routePath("en", key),
    "zh-CN": routePath("zh", key),
    "x-default": routePath("en", key),
  };
}

export function routeKeyFromPath(pathname: string): RouteKey {
  const normalized = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const match = ROUTES.find((key) => englishPaths[key] === normalized);

  return match ?? "home";
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
