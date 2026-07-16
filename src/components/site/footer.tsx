import type { Route } from "next";
import Link from "next/link";

import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";
import { GITHUB_URL, ISSUE_URL, routePath } from "@/lib/site";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const copy = contentByLocale[locale].chrome;

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="footer-brand">Codex Dream Skin</p>
          <p>{copy.footerDescription}</p>
        </div>
        <nav aria-label={locale === "en" ? "Footer" : "页脚导航"}>
          <a href={GITHUB_URL}>{copy.repositoryLabel}</a>
          <Link href={routePath(locale, "windows") as Route}>{copy.guidesLabel}</Link>
          <a href={ISSUE_URL}>{copy.issueLabel}</a>
          <a href={`${GITHUB_URL}/blob/main/macos/LICENSE`}>{copy.licenseLabel}</a>
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
