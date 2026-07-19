import type { Route } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";
import { INFO_ROUTES, routePath } from "@/lib/site";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const copy = contentByLocale[locale].chrome;

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="footer-brand">CodexSkin</p>
          <p>{copy.footerDescription}</p>
        </div>
        <nav aria-label={locale === "en" ? "Footer" : "页脚导航"}>
          <Link href={routePath(locale, "dreamSkin") as Route}>{copy.dreamSkinLabel}</Link>
          <a href={siteConfig.upstream.repositoryUrl} rel="noopener noreferrer" target="_blank">{copy.repositoryLabel}</a>
          <Link href={routePath(locale, "windows") as Route}>{copy.guidesLabel}</Link>
          <a href={siteConfig.upstream.issuesUrl} rel="noopener noreferrer" target="_blank">{copy.issueLabel}</a>
          <a href={siteConfig.upstream.licenseUrl} rel="noopener noreferrer" target="_blank">{copy.licenseLabel}</a>
          {INFO_ROUTES.map((key) => (
            <Link key={key} href={routePath(locale, key) as Route}>{copy.infoLabels[key]}</Link>
          ))}
        </nav>
      </div>
      <div id="privacy" className="privacy-note">
        <strong>{copy.privacyTitle}</strong>
        <span>{copy.privacyText}</span>
      </div>
      <p className="footer-disclaimer">{copy.disclaimer}</p>
    </footer>
  );
}
