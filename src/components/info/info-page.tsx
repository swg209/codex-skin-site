import type { Route } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/site/json-ld";
import { contentByLocale } from "@/content";
import type { InfoRouteKey, Locale } from "@/lib/site";
import { routePath } from "@/lib/site";
import { infoBreadcrumbSchema, infoPageSchema } from "@/lib/seo";

export function InfoPage({ locale, routeKey }: { locale: Locale; routeKey: InfoRouteKey }) {
  const content = contentByLocale[locale].info[routeKey];

  return (
    <>
      <JsonLd data={infoPageSchema(locale, routeKey)} />
      <JsonLd data={infoBreadcrumbSchema(locale, routeKey)} />
      <article className="info-page container">
        <header className="info-hero">
          <nav className="breadcrumbs" aria-label={locale === "en" ? "Breadcrumb" : "面包屑导航"}>
            <Link href={routePath(locale, "home") as Route}>{locale === "en" ? "Home" : "首页"}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{content.h1}</span>
          </nav>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.h1}</h1>
          <p className="lead">{content.summary}</p>
          <p className="info-updated">{content.updatedLabel}: {content.updatedAt}</p>
        </header>

        <div className="info-content">
          {content.sections.map((section) => (
            <section id={section.id} key={section.id} className="info-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
