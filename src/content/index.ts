import { enContent } from "@/content/en";
import type { LocaleContent } from "@/content/types";
import { zhContent } from "@/content/zh";
import type { Locale, RouteKey } from "@/lib/site";

export const contentByLocale: Record<Locale, LocaleContent> = {
  en: enContent,
  zh: zhContent,
};

export function getHomeContent(locale: Locale) {
  return contentByLocale[locale].home;
}

export function getGuideContent(
  locale: Locale,
  key: Exclude<RouteKey, "home">,
) {
  return contentByLocale[locale].guides[key];
}

export type {
  FaqItem,
  GalleryItem,
  GuideContent,
  GuideSection,
  HomeContent,
  LocaleContent,
} from "@/content/types";
