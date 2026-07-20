import { siteConfig } from "@/config/site";
import type { ArticleKey } from "@/content/articles/types";

export const SITE_URL = siteConfig.url;
export const GITHUB_URL = siteConfig.upstream.repositoryUrl;
export const ISSUE_URL = siteConfig.upstream.issuesUrl;

export const GUIDE_ROUTES = [
  "windows",
  "macos",
  "customize",
  "restore",
] as const;

export const INFO_ROUTES = [
  "about",
  "contact",
  "privacy",
  "terms",
  "disclaimer",
] as const;

export const ROUTES = ["home", "dreamSkin", ...GUIDE_ROUTES, ...INFO_ROUTES] as const;

export type RouteKey = (typeof ROUTES)[number];
export type GuideRouteKey = (typeof GUIDE_ROUTES)[number];
export type InfoRouteKey = (typeof INFO_ROUTES)[number];
export type Locale = "en" | "zh";

const englishPaths: Record<RouteKey, string> = {
  home: "/",
  dreamSkin: "/codex-dream-skin",
  windows: "/install/windows",
  macos: "/install/macos",
  customize: "/guide/customize",
  restore: "/guide/restore",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/disclaimer",
};

export function isInfoRoute(key: RouteKey): key is InfoRouteKey {
  return INFO_ROUTES.includes(key as InfoRouteKey);
}

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

const articleRoutes: Record<ArticleKey, string> = {
  "background-image-composition": "/guides/background-image-composition",
  "readability-and-contrast": "/guides/readability-and-contrast",
  "image-rights-and-licensing": "/guides/image-rights-and-licensing",
  "theme-not-visible": "/troubleshooting/theme-not-visible",
  "cdp-port-conflict": "/troubleshooting/cdp-port-conflict",
  "macos-permissions": "/troubleshooting/macos-permissions",
  "restore-default-appearance": "/troubleshooting/restore-default-appearance",
  "codex-dream-skin-compatibility": "/compatibility/codex-dream-skin",
};

export function articlePath(locale: Locale, key: ArticleKey): string {
  const path = articleRoutes[key];
  return locale === "en" ? path : `/zh${path}`;
}

export function articleAlternatePaths(key: ArticleKey) {
  return {
    en: articlePath("en", key),
    "zh-CN": articlePath("zh", key),
    "x-default": articlePath("en", key),
  };
}
