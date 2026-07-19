import type { GuideRouteKey, Locale } from "@/lib/site";

export interface SeoCopy {
  title: string;
  description: string;
}

export interface NavCopy {
  themes: string;
  dreamSkin: string;
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

export interface QuickStartPlatformContent {
  platform: "macos" | "windows";
  label: string;
  title: string;
  description: string;
  steps: string[];
  guideLabel: string;
  repositoryLabel: string;
}

export interface QuickStartContent {
  eyebrow: string;
  title: string;
  description: string;
  externalHint: string;
  platforms: QuickStartPlatformContent[];
}

export interface CreateLookContent {
  eyebrow: string;
  title: string;
  description: string;
  browseLabel: string;
  createLabel: string;
  comingSoon: string;
  href: "#themes";
}

export interface HomeContent {
  seo: SeoCopy;
  nav: NavCopy;
  hero: HeroContent;
  galleryTitle: string;
  galleryIntro: string;
  galleryDisclaimer: string;
  gallery: GalleryItem[];
  quickStart: QuickStartContent;
  createLook: CreateLookContent;
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
    dreamSkin: string;
    previous: string;
    next: string;
    close: string;
    viewTheme: string;
  };
}

export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "prompt"; text: string }
  | { type: "code"; code: string; language: "bash" | "powershell" };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
  tone?: "default" | "note" | "warning";
}

export interface GuideContent {
  key: GuideRouteKey;
  seo: SeoCopy;
  eyebrow: string;
  h1: string;
  summary: string;
  sourceNotice: string;
  sourceReviewNotice: string;
  sourceLabel: string;
  overviewLabel: string;
  issueLabel: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  promptCopyLabel: string;
  promptCopiedLabel: string;
  promptCopyFailedLabel: string;
  contentsLabel: string;
  relatedLabel: string;
  sections: GuideSection[];
  related: GuideRouteKey[];
}

export interface DreamSkinGuideCard {
  routeKey: Extract<GuideRouteKey, "windows" | "macos">;
  label: string;
  title: string;
  description: string;
  linkLabel: string;
}

export interface DreamSkinContent {
  seo: SeoCopy;
  hero: {
    eyebrow: string;
    h1: string;
    summary: string;
  };
  identityNotice: string;
  sourceTitle: string;
  sourceLabel: string;
  sourceHint: string;
  whatTitle: string;
  whatItems: FeatureItem[];
  boundaryTitle: string;
  boundaryItems: string[];
  installTitle: string;
  guides: DreamSkinGuideCard[];
  materialsTitle: string;
  materialsDescription: string;
  materialsPracticeNote: string;
  materialsDisclaimer: string;
  materialsLabel: string;
  customizeLabel: string;
  faqTitle: string;
  faq: FaqItem[];
  finalTitle: string;
  finalDescription: string;
}

export interface SiteChromeContent {
  nav: NavCopy;
  localeLabel: string;
  skipLabel: string;
  footerDescription: string;
  repositoryLabel: string;
  dreamSkinLabel: string;
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
  dreamSkin: DreamSkinContent;
  guides: Record<GuideRouteKey, GuideContent>;
}
