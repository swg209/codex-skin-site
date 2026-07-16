"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";
import { GITHUB_URL, routePath } from "@/lib/site";

import { LocaleSwitcher } from "./locale-switcher";

interface HeaderProps {
  locale: Locale;
}

interface NavLinksProps {
  locale: Locale;
  onNavigate?: () => void;
}

function NavLinks({ locale, onNavigate }: NavLinksProps) {
  const nav = contentByLocale[locale].chrome.nav;
  const home = routePath(locale, "home");
  const links = [
    { label: nav.themes, href: `${home}#themes` },
    { label: nav.features, href: `${home}#features` },
    { label: nav.install, href: `${home}#install` },
    { label: nav.faq, href: `${home}#faq` },
  ];

  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href as Route} onClick={onNavigate}>
          {link.label}
        </Link>
      ))}
      <a href={GITHUB_URL} rel="noopener noreferrer" target="_blank" onClick={onNavigate}>
        {nav.github}
      </a>
      <LocaleSwitcher locale={locale} onNavigate={onNavigate} />
    </>
  );
}

export function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const nav = contentByLocale[locale].chrome.nav;

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href={routePath(locale, "home") as Route} aria-label="CodexSkin home">
          <span className="brand__mark" aria-hidden="true">CS</span>
          <span>CodexSkin</span>
        </Link>

        <nav className="desktop-nav" aria-label={locale === "en" ? "Desktop" : "桌面导航"}>
          <NavLinks locale={locale} />
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? nav.closeMenu : nav.menu}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label={locale === "en" ? "Mobile" : "移动导航"}>
          <NavLinks locale={locale} onNavigate={() => setOpen(false)} />
        </nav>
      ) : null}
    </header>
  );
}
