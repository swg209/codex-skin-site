import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { THEMES } from "@/content/themes";
import type { Locale } from "@/lib/site";
import { themePath } from "@/lib/site";

export function ThemeIndexPage({ locale }: { locale: Locale }) {
  return <main className="theme-catalog container"><header><p className="eyebrow">{locale === "en" ? "CodexSkin originals" : "CodexSkin 原创"}</p><h1>{locale === "en" ? "Original Codex Theme Backgrounds" : "原创 Codex 主题背景"}</h1><p className="lead">{locale === "en" ? "Four rights-recorded abstract wallpapers designed around a quiet reading field, safe task crop, and transparent reuse terms." : "四张具有完整权利记录的抽象壁纸，围绕低细节阅读区、任务页安全裁切和透明许可设计。"}</p></header><div className="theme-catalog__grid">{THEMES.map((theme) => { const copy = theme.copy[locale]; return <article key={theme.slug}><div className="theme-catalog__image"><Image src={theme.imagePath} alt={copy.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="theme-catalog__copy"><h2>{copy.name}</h2><p>{copy.description}</p><Link className="button" href={themePath(locale, theme.slug) as Route}>{locale === "en" ? `Explore ${copy.name}` : `查看${copy.name}`}</Link></div></article>; })}</div></main>;
}
