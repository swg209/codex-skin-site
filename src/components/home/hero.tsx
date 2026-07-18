import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import type { HomeContent } from "@/content";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";

export function Hero({ locale, content }: { locale: Locale; content: HomeContent }) {
  return (
    <section className="hero section">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.h1}</h1>
          <p className="lead">{content.hero.description}</p>
          <div className="button-row hero__actions">
            <Link className="button button--primary" href={routePath(locale, "windows") as Route}>{content.labels.windows}</Link>
            <Link className="button" href={routePath(locale, "macos") as Route}>{content.labels.macos}</Link>
            <Link className="button" href={routePath(locale, "dreamSkin") as Route}>{content.labels.dreamSkin}</Link>
          </div>
          <ul className="proof-list" aria-label={locale === "en" ? "Product support" : "产品支持"}>
            {content.hero.proofLabels.map((label) => <li key={label}>{label}</li>)}
          </ul>
        </div>
        <div className="hero__visual">
          <Image src="/themes/skin-03.jpg" alt={content.gallery[2].description} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
