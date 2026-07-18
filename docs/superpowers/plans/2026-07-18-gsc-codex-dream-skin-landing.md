# GSC Codex Dream Skin Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish bilingual, indexable Codex Dream Skin landing pages that answer the first real GSC queries with a verified upstream GitHub link, localized installation paths, and accurate Codex skin/material guidance.

**Architecture:** Extend the typed public route model while separating guide-only routes through `GuideRouteKey`. Localized source content feeds one shared server-rendered landing-page component; existing metadata, JSON-LD, sitemap, navigation, and production verification helpers are extended without adding client state, dependencies, APIs, uploads, or third-party code.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript 5.9, CSS, Vitest 4, Testing Library, static local content, Vercel.

## Global Constraints

- The verified original repository is exactly `https://github.com/Fei-Away/Codex-Dream-Skin` and remains centralized in `siteConfig.upstream.repositoryUrl`.
- GitHub API verified `Fei-Away/Codex-Dream-Skin` as `fork: false`, `archived: false`, default branch `main` on 2026-07-18.
- CodexSkin.site is not an OpenAI website and is not affiliated with OpenAI.
- CodexSkin.site is not the official Codex Dream Skin website, and its maintainer is not the upstream project author.
- Do not host, modify, proxy, repackage, or automatically download any third-party installer.
- Do not modify third-party tool code, existing installation commands, or platform capability claims.
- Use “the upstream documentation says” for upstream behavior or security claims.
- Do not emit `SoftwareApplication`, `Product`, `Offer`, `AggregateRating`, price, version, or fabricated release data.
- Do not mechanically repeat query variants or add hidden keywords.
- Preserve the current AdSense head script, analytics, GSC verification, canonical origin, and unrelated user changes.

---

### Task 1: Separate guide routes and add bilingual landing-page content

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/content/index.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/components/guides/guide-page.tsx`
- Modify: `src/components/site/breadcrumbs.tsx`
- Modify: `tests/routes.test.ts`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Produces: `GUIDE_ROUTES`, `GuideRouteKey`, broader `ROUTES`/`RouteKey`, `DreamSkinContent`, `contentByLocale[locale].dreamSkin`, and `getDreamSkinContent(locale)`.
- Consumed by: guide components, landing routes, metadata/schema helpers, navigation, sitemap, and verification.

- [ ] **Step 1: Write failing route tests for 12 localized public paths**

Update `tests/routes.test.ts` to assert:

```ts
import {
  GUIDE_ROUTES,
  ROUTES,
  alternatePaths,
  routeKeyFromPath,
  routePath,
} from "@/lib/site";

it("separates four guide keys from six public route keys", () => {
  expect(GUIDE_ROUTES).toEqual(["windows", "macos", "customize", "restore"]);
  expect(ROUTES).toEqual([
    "home",
    "dreamSkin",
    "windows",
    "macos",
    "customize",
    "restore",
  ]);
});

it("defines twelve unique localized canonical routes", () => {
  const paths = ROUTES.flatMap((key) => [routePath("en", key), routePath("zh", key)]);
  expect(paths).toHaveLength(12);
  expect(new Set(paths).size).toBe(12);
  expect(paths).toContain("/codex-dream-skin");
  expect(paths).toContain("/zh/codex-dream-skin");
});

it("maps the landing route and reciprocal alternates", () => {
  expect(routeKeyFromPath("/zh/codex-dream-skin")).toBe("dreamSkin");
  expect(alternatePaths("en", "dreamSkin")).toEqual({
    en: "/codex-dream-skin",
    "zh-CN": "/zh/codex-dream-skin",
    "x-default": "/codex-dream-skin",
  });
});
```

Change the existing route-count test name and expected count from 10 to 12.

- [ ] **Step 2: Write failing localized content tests**

Add to `tests/content.test.ts`:

```ts
it.each(["en", "zh"] as const)("defines complete %s Dream Skin content", (locale) => {
  const content = contentByLocale[locale].dreamSkin;
  expect(content.seo.title).toContain("Codex Dream Skin");
  expect(content.h1).toContain("Codex Dream Skin");
  expect(content.faq).toHaveLength(6);
  expect(content.guides).toHaveLength(2);
  expect(content.identityNotice).toMatch(/OpenAI|独立/);
});

it("keeps ownership and platform claims within the approved boundary", () => {
  const landing = JSON.stringify({
    en: contentByLocale.en.dreamSkin,
    zh: contentByLocale.zh.dreamSkin,
  });
  expect(landing).not.toMatch(/Official Website|our project|官方网站|我们的项目/);
  expect(landing).not.toMatch(/Windows.*own image|Windows.*自定义图片/i);
});
```

Also require `overviewLabel` on all eight localized guide records and `dreamSkinLabel` in both chrome records.

- [ ] **Step 3: Run the tests and verify the expected failure**

Run: `npm test -- tests/routes.test.ts tests/content.test.ts`

Expected: FAIL because `GUIDE_ROUTES`, `dreamSkin`, `overviewLabel`, and the two new route paths do not exist.

- [ ] **Step 4: Split the route types in `src/lib/site.ts`**

Replace the current route declarations with:

```ts
export const GUIDE_ROUTES = [
  "windows",
  "macos",
  "customize",
  "restore",
] as const;

export type GuideRouteKey = (typeof GUIDE_ROUTES)[number];

export const ROUTES = ["home", "dreamSkin", ...GUIDE_ROUTES] as const;
export type RouteKey = (typeof ROUTES)[number];
export type Locale = "en" | "zh";

const englishPaths: Record<RouteKey, string> = {
  home: "/",
  dreamSkin: "/codex-dream-skin",
  windows: "/install/windows",
  macos: "/install/macos",
  customize: "/guide/customize",
  restore: "/guide/restore",
};
```

Keep `routePath`, `alternatePaths`, `routeKeyFromPath`, and `absoluteUrl` behavior unchanged beyond recognizing the new key.

- [ ] **Step 5: Add exact content-domain types**

In `src/content/types.ts`:

```ts
import type { GuideRouteKey, Locale } from "@/lib/site";

export interface DreamSkinGuideCard {
  platform: "windows" | "macos";
  title: string;
  description: string;
  label: string;
}

export interface DreamSkinContent {
  seo: SeoCopy;
  eyebrow: string;
  h1: string;
  summary: string;
  identityNotice: string;
  sourceTitle: string;
  sourceDescription: string;
  sourceLabel: string;
  sourceHint: string;
  whatTitle: string;
  whatItems: FeatureItem[];
  boundaryTitle: string;
  boundaryItems: string[];
  installTitle: string;
  installIntro: string;
  guides: DreamSkinGuideCard[];
  materialsTitle: string;
  materialsDescription: string;
  materialsLabel: string;
  customizeLabel: string;
  faqTitle: string;
  faq: FaqItem[];
  finalTitle: string;
  finalDescription: string;
}
```

Add `dreamSkin: string` to `NavCopy` while retaining `features` until Task 3 changes the rendering and removes the obsolete property. Add `dreamSkinLabel: string` to `SiteChromeContent`, `overviewLabel: string` to `GuideContent`, and `dreamSkin: DreamSkinContent` to `LocaleContent`.

Change all guide-specific types:

```ts
export interface GuideContent {
  key: GuideRouteKey;
  // existing fields remain
  related: GuideRouteKey[];
}

export interface LocaleContent {
  locale: Locale;
  chrome: SiteChromeContent;
  home: HomeContent;
  dreamSkin: DreamSkinContent;
  guides: Record<GuideRouteKey, GuideContent>;
}
```

- [ ] **Step 6: Add the exact localized SEO, identity, source, guide, and FAQ copy**

Use these immutable strings in `src/content/en.ts` and `src/content/zh.ts`:

```ts
// English SEO and hero
seo: {
  title: "Codex Dream Skin – GitHub, Install Guides & Themes",
  description: "Learn what Codex Dream Skin is, open the original GitHub repository, and follow independent Windows and macOS install guides from CodexSkin.",
},
eyebrow: "Independent project guide",
h1: "Codex Dream Skin: GitHub Source, Install Guides & Themes",
summary: "Codex Dream Skin is an independent open-source visual theme layer for the official Codex Desktop app. Start with the verified source, then use CodexSkin's independent platform guides.",
identityNotice: "CodexSkin.site is not an OpenAI website or the official Codex Dream Skin website. We are not the upstream author and do not host, modify, or repackage its installer.",

// Chinese SEO and hero
seo: {
  title: "Codex Dream Skin - GitHub、安装教程与 Codex 皮肤",
  description: "了解 Codex Dream Skin，访问原始 GitHub 仓库，并查看 CodexSkin 提供的 Windows、macOS 独立安装教程与皮肤素材说明。",
},
eyebrow: "独立项目指南",
h1: "Codex Dream Skin：原始 GitHub、安装教程与 Codex 皮肤",
summary: "Codex Dream Skin 是面向官方 Codex 桌面端的独立开源视觉主题层。请先核对原始源码，再阅读 CodexSkin 提供的独立平台教程。",
identityNotice: "CodexSkin.site 不是 OpenAI 网站，也不是 Codex Dream Skin 官方网站。本站维护者不是上游作者，不托管、不修改、不重新打包其安装程序。",
```

Use `sourceTitle` values `Verified original GitHub repository` and `已核验的原始 GitHub 仓库`. Source descriptions must name `Fei-Away/Codex-Dream-Skin`, say it opens a third-party repository, and remind visitors to review source before running scripts.

Use these exact action and section labels:

| Field | English | Chinese |
| --- | --- | --- |
| `sourceLabel` | Open Original GitHub Repository | 打开原始 GitHub 仓库 |
| `sourceHint` | Opens the third-party repository in a new tab. Review its source before running scripts. | 将在新标签页打开第三方仓库；运行脚本前请先检查源码。 |
| `whatTitle` | What Codex Dream Skin does | Codex Dream Skin 能做什么 |
| `boundaryTitle` | What this independent site does not claim | 本独立网站不会声称什么 |
| `installTitle` | Choose an independent installation guide | 选择独立安装教程 |
| `materialsTitle` | Codex skins and background materials | Codex 皮肤与背景素材 |
| `materialsLabel` | Browse Codex skin examples | 查看 Codex 皮肤示例 |
| `customizeLabel` | Read the background customization guide | 阅读背景定制教程 |
| `faqTitle` | Codex Dream Skin questions | Codex Dream Skin 常见问题 |

Use three `whatItems`: visual theme layer, native Codex controls remain interactive, and separate Windows/macOS workflows. Each description attributes implementation claims to upstream documentation. Use four `boundaryItems`: not OpenAI-affiliated, not the upstream website/author, no installer hosting or repackaging, and no guarantee that third-party tooling remains compatible after Codex updates.

Use guide labels `View Windows install guide` / `查看 Windows 安装教程` and `View macOS install guide` / `查看 macOS 安装教程`. The Windows description must mention the Store-installed official Codex app and must not promise a user-image picker. The macOS description may mention Apple Silicon, Intel, and the upstream-documented image workflow.

Use materials descriptions that explicitly call the current gallery “demonstration examples from the referenced project” / “引用项目的演示效果”, not CodexSkin-owned downloads. The final title is `Verify the source before you install` / `安装前先核对源码`, and the final description repeats the independent-site boundary without introducing another project claim.

Use these six localized FAQ questions in order:

| English | Chinese |
| --- | --- |
| What is Codex Dream Skin? | Codex Dream Skin 是什么？ |
| Where is the original Codex Dream Skin GitHub repository? | Codex Dream Skin 的原始 GitHub 仓库在哪里？ |
| Is Codex Dream Skin an official OpenAI product? | Codex Dream Skin 是 OpenAI 官方产品吗？ |
| Does CodexSkin.site maintain or distribute Codex Dream Skin? | CodexSkin.site 是否维护或分发 Codex Dream Skin？ |
| How do I install Codex Dream Skin on Windows or macOS? | 如何在 Windows 或 macOS 安装 Codex Dream Skin？ |
| Can I use my own Codex skin or background image? | 可以使用自己的 Codex 皮肤或背景图吗？ |

Answers must use the verified upstream URL only through the page action, not inline hardcoded text. The last answer must say the upstream documentation exposes a macOS image workflow while the current Windows workflow does not document the same picker.

Add `overviewLabel: "About Codex Dream Skin"` / `overviewLabel: "了解 Codex Dream Skin"` to every localized guide record. Add `dreamSkinLabel` with the same localized values to chrome. Add nav `dreamSkin: "Dream Skin"` in both locales while keeping the current `features` value for the independently compilable Task 1 commit.

- [ ] **Step 7: Export the content getter and focused types**

In `src/content/index.ts`:

```ts
export function getDreamSkinContent(locale: Locale) {
  return contentByLocale[locale].dreamSkin;
}

export function getGuideContent(locale: Locale, key: GuideRouteKey) {
  return contentByLocale[locale].guides[key];
}
```

Export `DreamSkinContent` and `DreamSkinGuideCard`. Replace the obsolete `Exclude<RouteKey, "home">` guide signature.

- [ ] **Step 8: Narrow every existing guide consumer and metadata lookup**

Use `GuideRouteKey` for `GuidePage.routeKey`, `sourcePaths`, `Breadcrumbs.current`, `webPageSchema`, and `breadcrumbSchema`. Update `seoCopy` now so broad `RouteKey` remains exhaustive and Task 1 typechecks:

```ts
function seoCopy(locale: Locale, key: RouteKey) {
  if (key === "home") return contentByLocale[locale].home.seo;
  if (key === "dreamSkin") return contentByLocale[locale].dreamSkin.seo;
  return contentByLocale[locale].guides[key].seo;
}
```

- [ ] **Step 9: Run focused tests**

Run: `npm test -- tests/routes.test.ts tests/content.test.ts`

Expected: PASS.

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 10: Commit the route/content domain**

```bash
git add src/lib/site.ts src/content src/lib/seo.ts src/components/guides/guide-page.tsx src/components/site/breadcrumbs.tsx tests/routes.test.ts tests/content.test.ts
git commit -m "feat: add Dream Skin landing content domain"
```

### Task 2: Build the shared landing page, routes, metadata, and schemas

**Files:**
- Create: `src/components/dream-skin/dream-skin-page.tsx`
- Create: `src/app/(en)/codex-dream-skin/page.tsx`
- Create: `src/app/(zh)/zh/codex-dream-skin/page.tsx`
- Modify: `src/lib/seo.ts`
- Modify: `src/app/globals.css`
- Create: `tests/dream-skin-page.test.tsx`
- Modify: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `DreamSkinContent`, `GuideRouteKey`, `siteConfig.upstream`, `routePath`, `JsonLd`, and existing localized guide content.
- Produces: `DreamSkinPage({ locale })`, two public route modules, `dreamSkinPageSchema`, `dreamSkinBreadcrumbSchema`, and `dreamSkinFaqSchema`.

- [ ] **Step 1: Write the failing landing-page rendering test**

Create `tests/dream-skin-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DreamSkinPage } from "@/components/dream-skin/dream-skin-page";

describe("DreamSkinPage", () => {
  it("answers English project, source, install, and material intent", () => {
    render(<DreamSkinPage locale="en" />);

    expect(screen.getByRole("heading", { level: 1, name: "Codex Dream Skin: GitHub Source, Install Guides & Themes" })).toBeVisible();
    expect(screen.getByText(/not an OpenAI website/i)).toBeVisible();

    const source = screen.getByRole("link", { name: "Open Original GitHub Repository" });
    expect(source).toHaveAttribute("href", "https://github.com/Fei-Away/Codex-Dream-Skin");
    expect(source).toHaveAttribute("target", "_blank");
    expect(source).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByRole("link", { name: /Windows install guide/i })).toHaveAttribute("href", "/install/windows");
    expect(screen.getByRole("link", { name: /macOS install guide/i })).toHaveAttribute("href", "/install/macos");
    expect(screen.getByRole("link", { name: /Browse Codex skin examples/i })).toHaveAttribute("href", "/#themes");
    expect(screen.getByRole("link", { name: /background customization guide/i })).toHaveAttribute("href", "/guide/customize");
    for (const question of [
      "What is Codex Dream Skin?",
      "Where is the original Codex Dream Skin GitHub repository?",
      "Is Codex Dream Skin an official OpenAI product?",
      "Does CodexSkin.site maintain or distribute Codex Dream Skin?",
      "How do I install Codex Dream Skin on Windows or macOS?",
      "Can I use my own Codex skin or background image?",
    ]) {
      expect(screen.getByText(question)).toBeVisible();
    }
  });

  it("renders the same source boundary and localized paths in Chinese", () => {
    render(<DreamSkinPage locale="zh" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("原始 GitHub");
    expect(screen.getByText(/不是 Codex Dream Skin 官方网站/)).toBeVisible();
    expect(screen.getByRole("link", { name: /Windows 安装教程/ })).toHaveAttribute("href", "/zh/install/windows");
    expect(screen.getByRole("link", { name: /查看 Codex 皮肤示例/ })).toHaveAttribute("href", "/zh#themes");
  });
});
```

- [ ] **Step 2: Extend SEO tests before implementation**

In `tests/seo.test.ts` require:

```ts
const english = buildMetadata("en", "dreamSkin");
expect(english.alternates?.canonical).toBe("https://codexskin.site/codex-dream-skin");
expect(english.alternates?.languages).toMatchObject({
  en: "https://codexskin.site/codex-dream-skin",
  "zh-CN": "https://codexskin.site/zh/codex-dream-skin",
  "x-default": "https://codexskin.site/codex-dream-skin",
});

expect(dreamSkinPageSchema("en")).toMatchObject({
  "@type": "WebPage",
  url: "https://codexskin.site/codex-dream-skin",
});
expect(dreamSkinFaqSchema("zh").mainEntity).toHaveLength(6);
expect(dreamSkinBreadcrumbSchema("en").itemListElement).toHaveLength(2);
```

Keep the source scan proving `SoftwareApplication` is absent. Change unique metadata expectations from five to six per locale.

- [ ] **Step 3: Run page and SEO tests and verify failure**

Run: `npm test -- tests/dream-skin-page.test.tsx tests/seo.test.ts`

Expected: FAIL because the shared component, route modules, and landing-specific schema helpers do not exist.

- [ ] **Step 4: Add landing-specific schema helpers**

Keep the Task 1 `seoCopy` branch and `buildMetadata` unchanged so canonical, hreflang, Open Graph, Twitter, and GSC verification automatically cover the new key.

Add:

```ts
export function dreamSkinPageSchema(locale: Locale) {
  const copy = contentByLocale[locale].dreamSkin;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seo.title,
    description: copy.seo.description,
    inLanguage: locale === "en" ? "en" : "zh-CN",
    url: absoluteUrl(routePath(locale, "dreamSkin")),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    about: { "@type": "Thing", name: "Codex Dream Skin" },
  };
}

export function dreamSkinFaqSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contentByLocale[locale].dreamSkin.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function dreamSkinBreadcrumbSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "首页", item: absoluteUrl(routePath(locale, "home")) },
      { "@type": "ListItem", position: 2, name: "Codex Dream Skin", item: absoluteUrl(routePath(locale, "dreamSkin")) },
    ],
  };
}
```

- [ ] **Step 5: Implement the shared server-rendered landing page**

`DreamSkinPage` renders three JSON-LD scripts, one article, and sections in the exact design order. Use `siteConfig.upstream.repositoryUrl`, `routePath(locale, "windows")`, `routePath(locale, "macos")`, `routePath(locale, "customize")`, and `${routePath(locale, "home")}#themes`.

The source action is a safe external anchor. Guide/material actions use `next/link`. Render the six visible FAQs through the existing `Faq` component so visible copy and `FAQPage` schema share one content source. Do not import client hooks.

- [ ] **Step 6: Add both route modules**

English:

```tsx
import { DreamSkinPage } from "@/components/dream-skin/dream-skin-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("en", "dreamSkin");

export default function EnglishDreamSkinPage() {
  return <DreamSkinPage locale="en" />;
}
```

Chinese uses `buildMetadata("zh", "dreamSkin")` and `<DreamSkinPage locale="zh" />`.

- [ ] **Step 7: Add focused responsive styles**

Add `.dream-skin-page`, `.dream-skin-hero`, `.dream-source-card`, `.dream-explainer-grid`, `.dream-intent-card`, `.dream-guide-grid`, `.dream-materials`, and `.dream-final`. Reuse current CSS variables, `.container`, `.button`, `.eyebrow`, and `.section` spacing. Use two columns above 820px and one below; source and guide actions wrap; no text overlays images; retain 44px targets and existing focus styles.

- [ ] **Step 8: Run page, SEO, type, and lint tests**

Run: `npm test -- tests/dream-skin-page.test.tsx tests/seo.test.ts tests/guide-page.test.tsx`

Expected: PASS.

Run: `npm run typecheck && npm run lint`

Expected: both exit 0.

- [ ] **Step 9: Commit landing pages and SEO**

```bash
git add src/components/dream-skin src/app/'(en)'/codex-dream-skin src/app/'(zh)'/zh/codex-dream-skin src/lib/seo.ts src/app/globals.css tests/dream-skin-page.test.tsx tests/seo.test.ts
git commit -m "feat: publish bilingual Dream Skin landing pages"
```

### Task 3: Add high-value internal links without changing upstream actions

**Files:**
- Modify: `src/components/site/header.tsx`
- Modify: `src/components/site/footer.tsx`
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/guides/guide-page.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `tests/navigation.test.tsx`
- Modify: `tests/home-page.test.tsx`
- Modify: `tests/guide-page.test.tsx`

**Interfaces:**
- Consumes: `routePath(locale, "dreamSkin")`, localized nav/chrome/home/guide labels, and all existing upstream actions.
- Produces: contextual internal links from global navigation, footer, home hero, and every platform guide.

- [ ] **Step 1: Write failing internal-link tests**

Update tests to require:

```tsx
// Header
expect(screen.getAllByRole("link", { name: "Dream Skin" })[0]).toHaveAttribute(
  "href",
  "/codex-dream-skin",
);
expect(screen.queryByRole("link", { name: "Features" })).not.toBeInTheDocument();

// Home hero
expect(screen.getByRole("link", { name: "About Codex Dream Skin" })).toHaveAttribute(
  "href",
  "/codex-dream-skin",
);

// Guide source actions
expect(screen.getByRole("link", { name: "About Codex Dream Skin" })).toHaveAttribute(
  "href",
  "/codex-dream-skin",
);

// Footer
render(<Footer locale="en" />);
expect(screen.getByRole("link", { name: "About Codex Dream Skin" })).toHaveAttribute(
  "href",
  "/codex-dream-skin",
);
```

Render the Chinese header and guide in separate tests and require `/zh/codex-dream-skin`.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `npm test -- tests/navigation.test.tsx tests/home-page.test.tsx tests/guide-page.test.tsx`

Expected: FAIL because the internal links are not rendered.

- [ ] **Step 3: Replace the Features navigation item**

In `Header`, use:

```ts
const links = [
  { label: nav.themes, href: `${home}#themes` },
  { label: nav.dreamSkin, href: routePath(locale, "dreamSkin") },
  { label: nav.install, href: `${home}#install` },
  { label: nav.faq, href: `${home}#faq` },
];
```

Remove `features` from `NavCopy` and both localized nav objects only in this task, after `Header` no longer consumes it. Keep the external GitHub link unchanged and safe.

- [ ] **Step 4: Add footer and guide links**

In `Footer`, add a `next/link` using `copy.dreamSkinLabel` before the existing guide link. In `GuidePage`, add a secondary internal button using `content.overviewLabel` after the original-repository action and before upstream Issues.

Do not remove or relabel the original repository action.

- [ ] **Step 5: Change the home hero's third action to the internal explainer**

Add `dreamSkin: string` to `HomeContent.labels`. Use `About Codex Dream Skin` / `了解 Codex Dream Skin`. Replace only the hero's external GitHub action with:

```tsx
<Link className="button" href={routePath(locale, "dreamSkin") as Route}>
  {content.labels.dreamSkin}
</Link>
```

Keep the final CTA and both Quick Start repository actions pointing to the verified upstream repository.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- tests/navigation.test.tsx tests/home-page.test.tsx tests/guide-page.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit internal linking**

```bash
git add src/components/site/header.tsx src/components/site/footer.tsx src/components/home/hero.tsx src/components/guides/guide-page.tsx src/content tests/navigation.test.tsx tests/home-page.test.tsx tests/guide-page.test.tsx
git commit -m "feat: link Dream Skin search intent across site"
```

### Task 4: Extend sitemap, production verification, documentation, and release checks

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `scripts/verify-site.mjs`
- Modify: `tests/seo.test.ts`
- Modify: `tests/verify-script.test.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: final `ROUTES`, `routePath`, and language alternates.
- Produces: 12 sitemap entries and production verification of both new routes.

- [ ] **Step 1: Write failing sitemap and verifier tests**

In `tests/seo.test.ts`:

```ts
const entries = sitemap();
expect(entries).toHaveLength(12);
expect(entries).toEqual(
  expect.arrayContaining([
    expect.objectContaining({
      url: "https://codexskin.site/codex-dream-skin",
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date("2026-07-18T00:00:00.000Z"),
    }),
    expect.objectContaining({
      url: "https://codexskin.site/zh/codex-dream-skin",
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  ]),
);
```

In `tests/verify-script.test.ts`, change the public path count from 10 to 12 and require both new paths.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/seo.test.ts tests/verify-script.test.ts`

Expected: FAIL because the sitemap date/priority and explicit production path list do not cover the landing pages.

- [ ] **Step 3: Add route-aware sitemap values**

Use:

```ts
const isHome = key === "home";
const isDreamSkin = key === "dreamSkin";

lastModified: new Date(
  isDreamSkin ? "2026-07-18T00:00:00.000Z" : "2026-07-16T00:00:00.000Z",
),
changeFrequency: isHome || isDreamSkin ? "weekly" : "monthly",
priority: isHome ? 1 : isDreamSkin ? 0.9 : 0.8,
```

Keep reciprocal alternates for every route.

- [ ] **Step 4: Add both explicit production paths**

Insert into `PUBLIC_PATHS`:

```js
{ path: "/codex-dream-skin", locale: "en" },
{ path: "/zh/codex-dream-skin", locale: "zh" },
```

The existing verifier then checks HTTP 200, one H1, canonical, reciprocal hreflang, no `noindex`, AdSense script in `<head>`, sitemap inclusion, robots, manifest, ads.txt, and 404 behavior for both.

- [ ] **Step 5: Update README routes and source boundary**

Add the new route pair under Public routes. State that the landing pages link to the verified `Fei-Away/Codex-Dream-Skin` source and remain independent guides, not an upstream-project website.

- [ ] **Step 6: Run the full automated release gate**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: all commands exit 0; the build lists `/codex-dream-skin` and `/zh/codex-dream-skin` as static pages.

- [ ] **Step 7: Run local production verification**

Start `npm run start`, then run `npm run verify:site` in a second terminal.

Expected: `Verified 12 routes and 5 SEO endpoints.`

- [ ] **Step 8: Perform browser and content-boundary verification**

Use `vercel:agent-browser-verify` at 390px and 1440px for both new pages. Confirm one H1, no horizontal scrolling, working locale switch, keyboard focus, safe GitHub target, platform/material links, and no console errors.

Run:

```bash
rg -n "Official Website|our project|SoftwareApplication|Windows.*own image|Windows.*自定义图片" src
git diff --check
git status --short
```

Expected: no misleading ownership/software/platform claims, no whitespace errors, and only intended files changed.

- [ ] **Step 9: Commit release verification**

```bash
git add src/app/sitemap.ts scripts/verify-site.mjs tests/seo.test.ts tests/verify-script.test.ts README.md
git commit -m "test: verify Dream Skin SEO landing routes"
```

- [ ] **Step 10: Review, push, and verify production**

Invoke `superpowers:requesting-code-review`. Address evidence-backed findings and rerun the release gate. Push `main` only after the user-authorized execution path reaches this step, wait for Vercel, then run:

```bash
SITE_ORIGIN=https://codexskin.site npm run verify:site
```

Expected: `Verified 12 routes and 5 SEO endpoints.` Confirm both live canonicals, then report that the user can submit the two URLs through GSC URL Inspection.
