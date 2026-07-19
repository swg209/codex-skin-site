import { enContent } from "@/content/en";
import type { LocaleContent } from "@/content/types";
import { zhContent } from "@/content/zh";
import type { GuideRouteKey, InfoRouteKey, Locale } from "@/lib/site";

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

export function getInfoContent(locale: Locale, key: InfoRouteKey) {
  return contentByLocale[locale].info[key];
}

export type {
  FaqItem,
  GalleryItem,
  GuideContent,
  DreamSkinContent,
  GuideSection,
  HomeContent,
  InfoPageContent,
  LocaleContent,
} from "@/content/types";
