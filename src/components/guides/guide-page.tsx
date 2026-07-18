import type { Route } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { contentByLocale } from "@/content";
import { GuideSection } from "@/components/guides/guide-section";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/site/json-ld";
import type { GuideRouteKey, Locale } from "@/lib/site";
import { ISSUE_URL, routePath } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

const sourcePaths: Record<GuideRouteKey, string> = {
  windows: siteConfig.upstream.windowsUrl,
  macos: siteConfig.upstream.macosUrl,
  customize: siteConfig.upstream.macosUrl,
  restore: siteConfig.upstream.repositoryUrl,
};

export function GuidePage({ locale, routeKey }: { locale: Locale; routeKey: GuideRouteKey }) {
  const localeContent = contentByLocale[locale];
  const content = localeContent.guides[routeKey];

  return (
    <>
      <JsonLd data={webPageSchema(locale, routeKey)} />
      <JsonLd data={breadcrumbSchema(locale, routeKey)} />
      <article className="guide-page container">
        <header className="guide-hero">
          <Breadcrumbs locale={locale} current={routeKey} />
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.h1}</h1>
          <p className="lead">{content.summary}</p>
          <aside className="guide-source-notice">
            <p>{content.sourceNotice}</p>
            <p>{content.sourceReviewNotice}</p>
          </aside>
          <div className="button-row guide-hero__actions">
            <a className="button button--primary" href={sourcePaths[routeKey]} rel="noopener noreferrer" target="_blank">{content.sourceLabel}<span aria-hidden="true" className="external-mark">↗</span></a>
            <Link className="button" href={routePath(locale, "dreamSkin") as Route}>{content.overviewLabel}</Link>
            <a className="button" href={ISSUE_URL} rel="noopener noreferrer" target="_blank">{content.issueLabel}<span aria-hidden="true" className="external-mark">↗</span></a>
          </div>
        </header>
        <div className="guide-layout">
          <aside className="guide-toc">
            <strong>{content.contentsLabel}</strong>
            <nav aria-label={content.contentsLabel}>{content.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
          </aside>
          <div className="guide-content">{content.sections.map((section) => <GuideSection key={section.id} section={section} content={content} />)}</div>
        </div>
        <section className="related-guides">
          <h2>{content.relatedLabel}</h2>
          <div>{content.related.map((key) => <Link className="button" key={key} href={routePath(locale, key) as Route}>{localeContent.guides[key].h1}</Link>)}</div>
        </section>
      </article>
    </>
  );
}
