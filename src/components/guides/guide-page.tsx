import type { Route } from "next";
import Link from "next/link";

import { contentByLocale } from "@/content";
import { GuideSection } from "@/components/guides/guide-section";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/site/json-ld";
import type { Locale, RouteKey } from "@/lib/site";
import { GITHUB_URL, ISSUE_URL, routePath } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

const sourcePaths: Record<Exclude<RouteKey, "home">, string> = {
  windows: `${GITHUB_URL}/tree/main/windows`,
  macos: `${GITHUB_URL}/tree/main/macos`,
  customize: `${GITHUB_URL}/blob/main/macos/README.md#image-guidelines`,
  restore: GITHUB_URL,
};

export function GuidePage({ locale, routeKey }: { locale: Locale; routeKey: Exclude<RouteKey, "home"> }) {
  const localeContent = contentByLocale[locale];
  const content = localeContent.guides[routeKey];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, routeKey)} />
      <article className="guide-page container">
        <header className="guide-hero">
          <Breadcrumbs locale={locale} current={routeKey} />
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.h1}</h1>
          <p className="lead">{content.summary}</p>
          <div className="button-row guide-hero__actions">
            <a className="button button--primary" href={sourcePaths[routeKey]}>{content.sourceLabel}</a>
            <a className="button" href={ISSUE_URL}>{content.issueLabel}</a>
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
