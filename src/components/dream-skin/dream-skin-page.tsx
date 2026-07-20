import type { Route } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Faq } from "@/components/home/faq";
import { JsonLd } from "@/components/site/json-ld";
import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";
import {
  dreamSkinBreadcrumbSchema,
  dreamSkinFaqSchema,
  dreamSkinPageSchema,
} from "@/lib/seo";

export function DreamSkinPage({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].dreamSkin;
  const homeThemes = locale === "en" ? "/#themes" : "/zh#themes";

  return (
    <>
      <JsonLd data={dreamSkinPageSchema(locale)} />
      <JsonLd data={dreamSkinFaqSchema(locale)} />
      <JsonLd data={dreamSkinBreadcrumbSchema(locale)} />
      <article className="dream-skin-page">
        <header className="dream-skin-hero container">
          <nav
            className="breadcrumbs"
            aria-label={locale === "en" ? "Breadcrumb" : "面包屑导航"}
          >
            <Link href={routePath(locale, "home") as Route}>
              {locale === "en" ? "Home" : "首页"}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Codex Dream Skin</span>
          </nav>
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.h1}</h1>
          <p className="lead">{content.hero.summary}</p>
          <aside className="dream-skin-identity">{content.identityNotice}</aside>
          <div className="button-row dream-skin-hero__actions">
            <a
              className="button button--primary"
              href={siteConfig.upstream.repositoryUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {content.heroActions.source}
              <span aria-hidden="true" className="external-mark">↗</span>
            </a>
            <Link className="button" href={routePath(locale, "windows") as Route}>
              {content.heroActions.windows}
            </Link>
            <Link className="button" href={routePath(locale, "macos") as Route}>
              {content.heroActions.macos}
            </Link>
          </div>
        </header>

        <section className="section dream-skin-source-section">
          <div className="container dream-skin-source-card">
            <div className="dream-skin-source-card__copy">
              <p className="eyebrow">GitHub</p>
              <h2>{content.sourceTitle}</h2>
              <p>{content.sourceHint}</p>
              <dl className="dream-skin-source-facts">
                {content.sourceFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a
              className="button button--primary"
              href={siteConfig.upstream.repositoryUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {content.sourceLabel}
              <span aria-hidden="true" className="external-mark">↗</span>
            </a>
          </div>
        </section>

        <section className="section">
          <div className="container dream-skin-two-column">
            <div>
              <div className="section-heading"><h2>{content.whatTitle}</h2></div>
              <div className="dream-skin-overview">
                {content.overviewParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="dream-skin-capabilities">
                {content.whatItems.map((item, index) => (
                  <article key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="dream-skin-boundary">
              <h2>{content.boundaryTitle}</h2>
              <ul>
                {content.boundaryItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </div>
        </section>

        <section className="section dream-skin-workflow-section">
          <div className="container dream-skin-workflow">
            <p className="eyebrow">Workflow</p>
            <h2>{content.workflowTitle}</h2>
            <p className="dream-skin-workflow__flow">{content.workflowSteps.join(" → ")}</p>
            <p>{content.workflowNote}</p>
          </div>
        </section>

        <section className="section section--tinted">
          <div className="container">
            <div className="section-heading"><h2>{content.installTitle}</h2></div>
            <div className="dream-skin-guide-grid">
              {content.guides.map((guide) => (
                <article key={guide.routeKey} className="dream-skin-guide-card">
                  <span className="platform-label">{guide.label}</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                  <Link
                    className="button"
                    href={routePath(locale, guide.routeKey) as Route}
                  >
                    {guide.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container dream-skin-materials">
            <div>
              <p className="eyebrow">Codex skins</p>
              <h2>{content.materialsTitle}</h2>
              <p>{content.materialsDescription}</p>
              <p className="dream-skin-materials__practice">{content.materialsPracticeNote}</p>
              <small>{content.materialsDisclaimer}</small>
            </div>
            <div className="button-row">
              <Link className="button button--primary" href={homeThemes as Route}>
                {content.materialsLabel}
              </Link>
              <Link
                className="button"
                href={routePath(locale, "customize") as Route}
              >
                {content.customizeLabel}
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--tinted">
          <div className="container">
            <div className="section-heading"><h2>{content.faqTitle}</h2></div>
            <Faq items={content.faq} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="final-cta">
              <div>
                <h2>{content.finalTitle}</h2>
                <p>{content.finalDescription}</p>
              </div>
              <a
                className="button button--primary"
                href={siteConfig.upstream.repositoryUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {content.sourceLabel}
                <span aria-hidden="true" className="external-mark">↗</span>
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
