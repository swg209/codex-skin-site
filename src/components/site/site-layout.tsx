import type { ReactNode } from "react";

import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";

import { SiteAnalytics } from "./analytics";
import { Footer } from "./footer";
import { Header } from "./header";

interface SiteLayoutProps {
  locale: Locale;
  children: ReactNode;
}

export function SiteLayout({ locale, children }: SiteLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {contentByLocale[locale].chrome.skipLabel}
      </a>
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
      <SiteAnalytics />
    </>
  );
}
