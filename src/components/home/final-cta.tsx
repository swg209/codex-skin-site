import type { Route } from "next";
import Link from "next/link";

import type { HomeContent } from "@/content";
import type { Locale } from "@/lib/site";
import { GITHUB_URL, routePath } from "@/lib/site";

export function FinalCta({ locale, content }: { locale: Locale; content: HomeContent }) {
  return <section className="section"><div className="container final-cta"><div><p className="eyebrow">CodexSkin</p><h2>{content.finalTitle}</h2><p>{content.finalDescription}</p></div><div className="button-row"><Link className="button button--primary" href={routePath(locale, "windows") as Route}>{content.labels.windows}</Link><Link className="button" href={routePath(locale, "macos") as Route}>{content.labels.macos}</Link><a className="button" href={GITHUB_URL} rel="noopener noreferrer" target="_blank">{content.labels.github}<span aria-hidden="true" className="external-mark">↗</span></a></div></div></section>;
}
