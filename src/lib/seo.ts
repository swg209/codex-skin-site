import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { contentByLocale } from "@/content";
import type { GuideRouteKey, InfoRouteKey, Locale, RouteKey } from "@/lib/site";
import {
  SITE_URL,
  absoluteUrl,
  alternatePaths,
  isInfoRoute,
  routePath,
} from "@/lib/site";

function seoCopy(locale: Locale, key: RouteKey) {
  if (key === "home") return contentByLocale[locale].home.seo;
  if (key === "dreamSkin") return contentByLocale[locale].dreamSkin.seo;
  if (isInfoRoute(key)) return contentByLocale[locale].info[key].seo;
  return contentByLocale[locale].guides[key].seo;
}

function languageAlternates(locale: Locale, key: RouteKey) {
  return Object.fromEntries(
    Object.entries(alternatePaths(locale, key)).map(([language, path]) => [
      language,
      absoluteUrl(path),
    ]),
  );
}

function socialImages() {
  return [
    {
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: "CodexSkin — Independent themes, tools, and guides for Codex Desktop",
    },
  ];
}

export function buildMetadata(locale: Locale, key: RouteKey): Metadata {
  const copy = seoCopy(locale, key);
  const canonical = absoluteUrl(routePath(locale, key));
  const images = socialImages();
  const verification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: languageAlternates(locale, key),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: copy.title,
      description: copy.description,
      url: canonical,
      locale: locale === "en" ? "en_US" : "zh_CN",
      alternateLocale: locale === "en" ? ["zh_CN"] : ["en_US"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: images?.map((image) => image.url),
    },
    verification: verification ? { google: verification } : undefined,
  };
}

export function websiteSchema(locale: Locale) {
  const home = contentByLocale[locale].home;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: home.seo.description,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    url: absoluteUrl(routePath(locale, "home")),
  };
}

export function webPageSchema(
  locale: Locale,
  key: GuideRouteKey,
) {
  const copy = contentByLocale[locale].guides[key];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seo.title,
    description: copy.seo.description,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    url: absoluteUrl(routePath(locale, key)),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contentByLocale[locale].home.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  key: GuideRouteKey,
) {
  const content = contentByLocale[locale];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "首页",
        item: absoluteUrl(routePath(locale, "home")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.guides[key].h1,
        item: absoluteUrl(routePath(locale, key)),
      },
    ],
  };
}

export function dreamSkinPageSchema(locale: Locale) {
  const copy = contentByLocale[locale].dreamSkin;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seo.title,
    description: copy.seo.description,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    url: absoluteUrl(routePath(locale, "dreamSkin")),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "SoftwareSourceCode",
      name: "Codex Dream Skin",
      codeRepository: siteConfig.upstream.repositoryUrl,
    },
  };
}

export function dreamSkinFaqSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contentByLocale[locale].dreamSkin.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function dreamSkinBreadcrumbSchema(locale: Locale) {
  const content = contentByLocale[locale].dreamSkin;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "首页",
        item: absoluteUrl(routePath(locale, "home")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.hero.h1,
        item: absoluteUrl(routePath(locale, "dreamSkin")),
      },
    ],
  };
}

export function infoPageSchema(locale: Locale, key: InfoRouteKey) {
  const copy = contentByLocale[locale].info[key];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seo.title,
    description: copy.seo.description,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    url: absoluteUrl(routePath(locale, key)),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function infoBreadcrumbSchema(locale: Locale, key: InfoRouteKey) {
  const copy = contentByLocale[locale].info[key];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "首页",
        item: absoluteUrl(routePath(locale, "home")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.h1,
        item: absoluteUrl(routePath(locale, key)),
      },
    ],
  };
}
