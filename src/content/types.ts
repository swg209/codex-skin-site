import type { Locale, RouteKey } from "@/lib/site";

export interface SeoCopy {
  title: string;
  description: string;
}

export interface NavCopy {
  themes: string;
  features: string;
  install: string;
  faq: string;
  github: string;
  menu: string;
  closeMenu: string;
}

export interface LinkCopy {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface GalleryItem {
  name: string;
  description: string;
  src: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroContent {
  eyebrow: string;
  h1: string;
  description: string;
  proofLabels: string[];
}

export interface HomeContent {
  seo: SeoCopy;
  nav: NavCopy;
  hero: HeroContent;
  galleryTitle: string;
  galleryIntro: string;
  galleryDisclaimer: string;
  gallery: GalleryItem[];
  featuresTitle: string;
  featuresIntro: string;
  features: FeatureItem[];
  stepsTitle: string;
  steps: FeatureItem[];
  proofTitle: string;
  proofDescription: string;
  safetyTitle: string;
  safetyIntro: string;
  safety: string[];
  faqTitle: string;
  faq: FaqItem[];
  finalTitle: string;
  finalDescription: string;
  labels: {
    windows: string;
    macos: string;
    github: string;
    previous: string;
    next: string;
    close: string;
    viewTheme: string;
  };
}

export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language: "bash" | "powershell" };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
  tone?: "default" | "note" | "warning";
}

export interface GuideContent {
  key: Exclude<RouteKey, "home">;
  seo: SeoCopy;
  eyebrow: string;
  h1: string;
  summary: string;
  sourceLabel: string;
  issueLabel: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  contentsLabel: string;
  relatedLabel: string;
  sections: GuideSection[];
  related: Exclude<RouteKey, "home">[];
}

export interface SiteChromeContent {
  nav: NavCopy;
  localeLabel: string;
  skipLabel: string;
  footerDescription: string;
  repositoryLabel: string;
  guidesLabel: string;
  issueLabel: string;
  licenseLabel: string;
  privacyTitle: string;
  privacyText: string;
  disclaimer: string;
}

export interface LocaleContent {
  locale: Locale;
  chrome: SiteChromeContent;
  home: HomeContent;
  guides: Record<Exclude<RouteKey, "home">, GuideContent>;
}
