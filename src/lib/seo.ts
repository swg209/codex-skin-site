import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { contentByLocale } from "@/content";
import type { Locale, RouteKey } from "@/lib/site";
import {
  GITHUB_URL,
  SITE_URL,
  absoluteUrl,
  alternatePaths,
  routePath,
} from "@/lib/site";

function seoCopy(locale: Locale, key: RouteKey) {
  return key === "home"
    ? contentByLocale[locale].home.seo
    : contentByLocale[locale].guides[key].seo;
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
  const hasSocialCard = existsSync(join(process.cwd(), "public", "og.png"));

  return hasSocialCard
    ? [
        {
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: "Codex Dream Skin — Custom Themes for Codex Desktop",
        },
      ]
    : undefined;
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
      siteName: "Codex Dream Skin",
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

export function softwareApplicationSchema(locale: Locale) {
  const home = contentByLocale[locale].home;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Codex Dream Skin",
    description: home.seo.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS",
    isAccessibleForFree: true,
    url: GITHUB_URL,
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
  key: Exclude<RouteKey, "home">,
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
