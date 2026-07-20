import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";

import { THEMES } from "@/content/themes";
import type { Locale } from "@/lib/site";
import { themePath } from "@/lib/site";

export function ThemeGallery({ locale }: { locale: Locale }) {
  return <div className="theme-grid">{THEMES.map((theme) => { const copy = theme.copy[locale]; return <article className="theme-card theme-card--link" key={theme.slug}><Link href={themePath(locale, theme.slug) as Route} aria-label={`${locale === "en" ? "Explore" : "查看"} ${copy.name}`}><span className="theme-card__image"><Image src={theme.imagePath} alt={copy.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></span><span className="theme-card__copy"><strong>{copy.name}</strong><span>{copy.description}</span></span></Link></article>; })}</div>;
}
