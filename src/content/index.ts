import { enContent } from "@/content/en";
import type { LocaleContent } from "@/content/types";
import { zhContent } from "@/content/zh";
import type { GuideRouteKey, Locale } from "@/lib/site";

export const contentByLocale: Record<Locale, LocaleContent> = {
  en: enContent,
  zh: zhContent,
};

export function getHomeContent(locale: Locale) {
  return contentByLocale[locale].home;
}

export function getDreamSkinContent(locale: Locale) {
  return contentByLocale[locale].dreamSkin;
}

export function getGuideContent(locale: Locale, key: GuideRouteKey) {
  return contentByLocale[locale].guides[key];
}

export type {
  FaqItem,
  GalleryItem,
  GuideContent,
  DreamSkinContent,
  GuideSection,
  HomeContent,
  LocaleContent,
} from "@/content/types";
