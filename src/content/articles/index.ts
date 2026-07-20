import { enArticles } from "./en";
import { zhArticles } from "./zh";

export { ARTICLE_KEYS } from "./types";
export type { ArticleBlock, ArticleContent, ArticleKey, ArticleSection } from "./types";

export const articlesByLocale = {
  en: enArticles,
  zh: zhArticles,
} as const;

export function articleKeyForRoute(category: string, slug: string) {
  const match = Object.values(enArticles).find((article) => article.category === category && article.slug === slug);
  return match?.key;
}

export function articleKeysForCategory(category: string) {
  return Object.values(enArticles).filter((article) => article.category === category).map((article) => article.key);
}
