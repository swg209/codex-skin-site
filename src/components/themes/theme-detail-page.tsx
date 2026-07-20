import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { getTheme, type ThemeSlug } from "@/content/themes";
import type { Locale } from "@/lib/site";
import { articlePath, routePath, themeIndexPath } from "@/lib/site";

export function ThemeDetailPage({ locale, slug }: { locale: Locale; slug: ThemeSlug }) {
  const theme = getTheme(slug); const copy = theme.copy[locale];
  return <article className="theme-detail container"><header><nav className="breadcrumbs" aria-label={locale === "en" ? "Breadcrumb" : "面包屑"}><Link href={themeIndexPath(locale) as Route}>{locale === "en" ? "Themes" : "主题"}</Link><span>/</span><span>{copy.name}</span></nav><p className="eyebrow">{locale === "en" ? "Original licensed background" : "原创许可背景"}</p><h1>{copy.name}</h1><p className="lead">{copy.description}</p></header><div className="theme-detail__image"><Image src={theme.imagePath} alt={copy.alt} fill priority sizes="100vw" /></div><aside className="theme-rights"><div><strong>{locale === "en" ? "Creator" : "创作者"}</strong><span>{theme.creator}</span></div><div><strong>{locale === "en" ? "Created" : "创作日期"}</strong><span>{theme.creationDate}</span></div><div><strong>{locale === "en" ? "License" : "许可"}</strong><span>{theme.license.id}</span></div><p>{locale === "en" ? "Original generated abstract asset with no people, characters, trademarks, or text." : "原创生成的抽象素材，无人物、角色、商标或文字。"}</p></aside><div className="theme-detail__content">{copy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><div className="button-row"><a className="button button--primary" href={theme.imagePath} download>{locale === "en" ? "Download Original Background" : "下载原创背景"}</a><Link className="button" href={articlePath(locale, "background-image-composition") as Route}>{locale === "en" ? "Read the Background Composition Guide" : "阅读背景图构图指南"}</Link><Link className="button" href={routePath(locale, "customize") as Route}>{locale === "en" ? "Apply with the Customization Guide" : "按定制教程应用"}</Link></div></article>;
}
