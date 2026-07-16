import type { Route } from "next";
import Link from "next/link";

import { upstreamSourceUrl } from "@/config/site";
import type { QuickStartContent } from "@/content/types";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";

export function QuickStart({
  locale,
  content,
}: {
  locale: Locale;
  content: QuickStartContent;
}) {
  return (
    <section id="install" className="section quick-start-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="quick-start-grid">
          {content.platforms.map((platform) => (
            <article className="quick-start-card" key={platform.platform}>
              <span className="platform-label">{platform.label}</span>
              <h3>{platform.title}</h3>
              <p>{platform.description}</p>
              <ol>
                {platform.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="quick-start-card__actions">
                <Link
                  className="button button--primary"
                  href={routePath(locale, platform.platform) as Route}
                >
                  {platform.guideLabel}
                </Link>
                <a
                  aria-label={`${platform.repositoryLabel} — ${content.externalHint}`}
                  className="button"
                  href={upstreamSourceUrl(platform.platform)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {platform.repositoryLabel}
                  <span aria-hidden="true" className="external-mark">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
