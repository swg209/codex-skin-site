import type { SeoCopy } from "@/content/types";

export const ARTICLE_KEYS = [
  "background-image-composition",
  "readability-and-contrast",
  "image-rights-and-licensing",
  "theme-not-visible",
  "cdp-port-conflict",
  "macos-permissions",
  "restore-default-appearance",
  "codex-dream-skin-compatibility",
] as const;

export type ArticleKey = (typeof ARTICLE_KEYS)[number];
export type ArticleCategory = "guides" | "troubleshooting" | "compatibility";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

export interface ArticleSection {
  id: string;
  title: string;
  blocks: ArticleBlock[];
}

export interface ArticleContent {
  key: ArticleKey;
  category: ArticleCategory;
  slug: string;
  seo: SeoCopy;
  eyebrow: string;
  h1: string;
  summary: string;
  reviewedDate: "2026-07-20";
  authorLabel: string;
  evidenceLabel: string;
  sections: ArticleSection[];
  related: ArticleKey[];
}
