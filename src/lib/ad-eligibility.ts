import { siteConfig } from "@/config/site";
import { ARTICLE_KEYS } from "@/content/articles/types";
import { THEME_SLUGS } from "@/content/themes/types";
import { articlePath, themePath, type Locale } from "@/lib/site";

const locales: Locale[] = ["en", "zh"];

const coreGuidePaths = locales.flatMap((locale) => {
  const prefix = locale === "zh" ? "/zh" : "";
  return [
    `${prefix}/install/windows`,
    `${prefix}/install/macos`,
    `${prefix}/guide/customize`,
    `${prefix}/guide/restore`,
  ];
});

const articlePaths = ARTICLE_KEYS.flatMap((key) =>
  locales.map((locale) => articlePath(locale, key)),
);

const themeDetailPaths = THEME_SLUGS.flatMap((slug) =>
  locales.map((locale) => themePath(locale, slug)),
);

const eligibleContentPaths = new Set([
  ...coreGuidePaths,
  ...articlePaths,
  ...themeDetailPaths,
]);

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function isAdEligiblePath(
  pathname: string,
  options: { reviewMode?: boolean } = {},
): boolean {
  const reviewMode = options.reviewMode ?? siteConfig.adsense.reviewMode;

  if (reviewMode) return false;

  return eligibleContentPaths.has(normalizePath(pathname));
}
