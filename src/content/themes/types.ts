export const THEME_SLUGS = ["dark-aurora", "warm-graphite", "quiet-ocean", "violet-glass"] as const;
export type ThemeSlug = (typeof THEME_SLUGS)[number];
export interface ThemeSection { title: string; paragraphs: string[] }
export interface ThemeCopy { name: string; description: string; alt: string; homeCompositionNotes: string; taskCompositionNotes: string; sections: ThemeSection[] }
export interface ThemeRecord {
  slug: ThemeSlug; imagePath: string; creator: "CodexSkin Editorial"; creationDate: "2026-07-20"; sourceMethod: string;
  license: { id: "CodexSkin-Theme-1.0"; href: "/original-themes/LICENSE.md" };
  commercialUse: true; redistribution: true; flags: { trademark: false; character: false; portrait: false };
  copy: { en: ThemeCopy; zh: ThemeCopy };
}
