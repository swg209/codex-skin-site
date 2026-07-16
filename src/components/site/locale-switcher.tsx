"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";
import { routeKeyFromPath, routePath } from "@/lib/site";

interface LocaleSwitcherProps {
  locale: Locale;
  onNavigate?: () => void;
}

export function LocaleSwitcher({ locale, onNavigate }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "en" ? "zh" : "en";
  const routeKey = routeKeyFromPath(pathname || routePath(locale, "home"));
  const href = routePath(nextLocale, routeKey) as Route;

  return (
    <Link className="locale-link" href={href} hrefLang={nextLocale === "zh" ? "zh-CN" : "en"} onClick={onNavigate}>
      {contentByLocale[locale].chrome.localeLabel}
    </Link>
  );
}
