# Original Themes and Custom Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual catalog of four original CodexSkin backgrounds, indexable theme detail pages, and a Resend-backed custom-service inquiry path while preserving the site's independent identity and third-party source boundaries.

**Architecture:** Keep product content in typed local modules and statically generate every catalog and detail page with the existing Next.js App Router. Serve CodexSkin-owned previews and 2560 × 1600 downloads from `public`; isolate the only dynamic behavior in a validated `POST /api/custom-inquiry` route that sends one email and stores nothing in a database.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript 5.9, CSS, Vitest 4, Testing Library, Vercel Analytics, optional Google Analytics, Resend Node.js SDK, Vercel Functions.

## Global Constraints

- CodexSkin.site is not an OpenAI website and is not affiliated with OpenAI.
- CodexSkin.site is not the official website of Codex Dream Skin or any other third-party customization tool.
- The site supplies original visual materials, independent tutorials, and custom design services.
- The site does not host, modify, proxy, or repackage third-party installers.
- Do not modify any third-party tool code or remove the existing upstream provenance in `public/themes/README.md`.
- The four new artworks contain no people, logos, trademarks, copyrighted characters, source-project artwork, or copied third-party imagery.
- Downloads are free for personal, non-commercial use; redistribution, resale, sublicensing, asset-pack inclusion, and commercial or organizational brand use are prohibited.
- No accounts, payments, CMS, database, user uploads, online generator, installer hosting, or automated modification of Codex.
- No fixed service prices or guaranteed turnaround claims.
- Do not commit Resend credentials or other secrets.
- Never send names, emails, descriptions, or reference URLs to analytics.

---

### Task 1: Create original assets and the typed theme catalog

**Files:**
- Create: `public/themes/original/neon-current.png`
- Create: `public/themes/original/ember-glass.png`
- Create: `public/themes/original/aurora-field.png`
- Create: `public/themes/original/lunar-paper.png`
- Create: `public/themes/original/previews/neon-current.jpg`
- Create: `public/themes/original/previews/ember-glass.jpg`
- Create: `public/themes/original/previews/aurora-field.jpg`
- Create: `public/themes/original/previews/lunar-paper.jpg`
- Create: `public/themes/original/LICENSE.md`
- Create: `src/content/themes.ts`
- Create: `tests/themes-data.test.ts`

**Interfaces:**
- Produces: `THEME_SLUGS`, `ThemeSlug`, `ThemeLocaleCopy`, `ThemeRecord`, `THEMES`, `getTheme(slug)`, and `themePath(locale, slug)`.
- Consumed by: catalog routes, detail routes, home-page featured themes, sitemap, SEO schema, and analytics.

- [ ] **Step 1: Write the failing theme-data contract test**

Create `tests/themes-data.test.ts`:

```ts
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { THEMES, THEME_SLUGS, getTheme, themePath } from "@/content/themes";

function pngDimensions(path: string) {
  const bytes = readFileSync(path);
  expect(bytes.subarray(1, 4).toString()).toBe("PNG");
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

describe("original theme catalog", () => {
  it("contains four complete, unique, bilingual original themes", () => {
    expect(THEMES).toHaveLength(4);
    expect(new Set(THEME_SLUGS).size).toBe(4);
    for (const theme of THEMES) {
      expect(theme.copy.en.name.length).toBeGreaterThan(2);
      expect(theme.copy.zh.name.length).toBeGreaterThan(2);
      expect(theme.colors).toHaveLength(3);
      expect(theme.related).toHaveLength(2);
      expect(theme.related).not.toContain(theme.slug);
      expect(theme.related.every((slug) => THEME_SLUGS.includes(slug))).toBe(true);
    }
  });

  it("references existing 2560 by 1600 PNG downloads and previews", () => {
    for (const theme of THEMES) {
      const download = `public${theme.downloadSrc}`;
      expect(existsSync(download)).toBe(true);
      expect(existsSync(`public${theme.previewSrc}`)).toBe(true);
      expect(pngDimensions(download)).toEqual({ width: 2560, height: 1600 });
    }
  });

  it("looks up themes and builds localized detail paths", () => {
    expect(getTheme("neon-current")?.copy.en.name).toBe("Neon Current");
    expect(getTheme("missing")).toBeUndefined();
    expect(themePath("en", "neon-current")).toBe("/themes/neon-current");
    expect(themePath("zh", "neon-current")).toBe("/zh/themes/neon-current");
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails because the catalog does not exist**

Run: `npm test -- tests/themes-data.test.ts`

Expected: FAIL with a resolution error for `@/content/themes`.

- [ ] **Step 3: Generate four clearly distinct abstract backgrounds with the imagegen skill**

Invoke the `imagegen` skill and generate one image per prompt. Do not use the existing upstream composites as references.

```text
Neon Current: Original abstract 16:10 desktop background, deep navy field, flowing electric cyan and violet currents, calm low-detail left third for readable UI, layered translucent light, premium technical atmosphere, no text, no logo, no people, no characters, no interface screenshot, no brand marks.

Ember Glass: Original abstract 16:10 desktop background, charcoal field, warm coral and amber translucent glass planes, restrained highlights, calm low-detail left third for readable UI, sophisticated studio atmosphere, no text, no logo, no people, no characters, no interface screenshot, no brand marks.

Aurora Field: Original abstract 16:10 desktop background, deep green-blue field, soft mint and teal aurora ribbons, subtle depth and grain, calm low-detail left third for readable UI, quiet futuristic atmosphere, no text, no logo, no people, no characters, no interface screenshot, no brand marks.

Lunar Paper: Original abstract 16:10 desktop background, warm off-white paper field, graphite and silver geometric folds with restrained blue accents, calm low-detail left third for readable UI, editorial minimalism, no text, no logo, no people, no characters, no interface screenshot, no brand marks.
```

Save the generated masters to the four `public/themes/original/*.png` paths. Normalize each to exactly 2560 × 1600 and create a 1280 × 800 JPEG preview at quality 82:

```bash
sips --resampleHeightWidth 1600 2560 public/themes/original/neon-current.png
sips -s format jpeg -s formatOptions 82 --resampleHeightWidth 800 1280 public/themes/original/neon-current.png --out public/themes/original/previews/neon-current.jpg
sips --resampleHeightWidth 1600 2560 public/themes/original/ember-glass.png
sips -s format jpeg -s formatOptions 82 --resampleHeightWidth 800 1280 public/themes/original/ember-glass.png --out public/themes/original/previews/ember-glass.jpg
sips --resampleHeightWidth 1600 2560 public/themes/original/aurora-field.png
sips -s format jpeg -s formatOptions 82 --resampleHeightWidth 800 1280 public/themes/original/aurora-field.png --out public/themes/original/previews/aurora-field.jpg
sips --resampleHeightWidth 1600 2560 public/themes/original/lunar-paper.png
sips -s format jpeg -s formatOptions 82 --resampleHeightWidth 800 1280 public/themes/original/lunar-paper.png --out public/themes/original/previews/lunar-paper.jpg
```

Inspect every master and preview before continuing. Reject and regenerate any result containing lettering, recognizable IP, people, logos, interface chrome, or insufficient empty space on the left.

- [ ] **Step 4: Add the asset license**

Create `public/themes/original/LICENSE.md` with this exact policy:

```markdown
# CodexSkin Original Background License

Copyright © 2026 CodexSkin.site.

These background images may be downloaded, displayed, and modified for personal, non-commercial use in your own Codex Desktop setup.

You may not redistribute, resell, sublicense, include the images in another asset pack, or use them as a commercial, organizational, campaign, creator-brand, or KOL-brand asset without written permission.

For commercial or custom rights, use https://codexskin.site/custom.

CodexSkin.site is independent and is not affiliated with OpenAI. This license covers only the original files in this directory; it does not cover Codex, third-party customization tools, or the upstream demonstration images in the parent directory.
```

- [ ] **Step 5: Implement the typed catalog**

Create `src/content/themes.ts` with these exact public types and records:

```ts
import type { Locale } from "@/lib/site";

export const THEME_SLUGS = [
  "neon-current",
  "ember-glass",
  "aurora-field",
  "lunar-paper",
] as const;

export type ThemeSlug = (typeof THEME_SLUGS)[number];

export interface ThemeLocaleCopy {
  name: string;
  summary: string;
  mood: string;
  alt: string;
  usageNote: string;
}

export interface ThemeRecord {
  slug: ThemeSlug;
  previewSrc: string;
  downloadSrc: string;
  format: "PNG";
  width: 2560;
  height: 1600;
  colors: readonly [string, string, string];
  copy: Record<Locale, ThemeLocaleCopy>;
  related: readonly [ThemeSlug, ThemeSlug];
}

export const THEMES: readonly ThemeRecord[] = [
  {
    slug: "neon-current",
    previewSrc: "/themes/original/previews/neon-current.jpg",
    downloadSrc: "/themes/original/neon-current.png",
    format: "PNG", width: 2560, height: 1600,
    colors: ["#07111F", "#35E6F2", "#8B5CF6"],
    copy: {
      en: { name: "Neon Current", summary: "Electric cyan and violet currents across a quiet midnight field.", mood: "Focused · Electric", alt: "Abstract navy background with cyan and violet flowing light", usageNote: "Its calm left edge leaves room for native Codex titles." },
      zh: { name: "霓虹流", summary: "电光青与紫色流线穿过安静的午夜底色。", mood: "专注 · 电光", alt: "深蓝底色上流动着青色与紫色光线的抽象背景", usageNote: "左侧留白较安静，适合承载 Codex 原生标题。" },
    },
    related: ["aurora-field", "ember-glass"],
  },
  {
    slug: "ember-glass",
    previewSrc: "/themes/original/previews/ember-glass.jpg",
    downloadSrc: "/themes/original/ember-glass.png",
    format: "PNG", width: 2560, height: 1600,
    colors: ["#151217", "#FB7185", "#F59E0B"],
    copy: {
      en: { name: "Ember Glass", summary: "Warm coral and amber planes layered over charcoal glass.", mood: "Warm · Cinematic", alt: "Abstract charcoal background with coral and amber glass layers", usageNote: "Warm highlights frame the workspace without filling the text zone." },
      zh: { name: "余烬玻璃", summary: "珊瑚红与琥珀色透明层叠在炭黑玻璃之上。", mood: "温暖 · 电影感", alt: "炭黑底色上叠加珊瑚红与琥珀色玻璃层的抽象背景", usageNote: "暖色高光围绕工作区，同时避开主要文字区域。" },
    },
    related: ["neon-current", "lunar-paper"],
  },
  {
    slug: "aurora-field",
    previewSrc: "/themes/original/previews/aurora-field.jpg",
    downloadSrc: "/themes/original/aurora-field.png",
    format: "PNG", width: 2560, height: 1600,
    colors: ["#06242A", "#5EEAD4", "#2DD4BF"],
    copy: {
      en: { name: "Aurora Field", summary: "Soft mint and teal light suspended in a deep green-blue field.", mood: "Quiet · Atmospheric", alt: "Abstract deep green-blue background with mint and teal aurora light", usageNote: "Diffuse light keeps the composition immersive but readable." },
      zh: { name: "极光场", summary: "薄荷绿与青绿色柔光悬浮在深绿蓝空间中。", mood: "安静 · 氛围感", alt: "深绿蓝底色上带有薄荷绿与青绿极光的抽象背景", usageNote: "柔和漫射光兼顾沉浸感与界面可读性。" },
    },
    related: ["neon-current", "lunar-paper"],
  },
  {
    slug: "lunar-paper",
    previewSrc: "/themes/original/previews/lunar-paper.jpg",
    downloadSrc: "/themes/original/lunar-paper.png",
    format: "PNG", width: 2560, height: 1600,
    colors: ["#EEEAE2", "#535761", "#4F7CAC"],
    copy: {
      en: { name: "Lunar Paper", summary: "Graphite and silver folds on warm paper with a restrained blue accent.", mood: "Minimal · Editorial", alt: "Warm paper abstract background with graphite silver and blue geometry", usageNote: "The light composition suits restrained, low-noise workspaces." },
      zh: { name: "月面纸", summary: "石墨与银色折面落在暖白纸张上，并带有克制的蓝色点缀。", mood: "极简 · 编辑感", alt: "暖白纸张质感上带有石墨银与蓝色几何形状的抽象背景", usageNote: "明亮而低噪，适合偏克制的工作空间。" },
    },
    related: ["ember-glass", "aurora-field"],
  },
] as const;

export function getTheme(slug: string): ThemeRecord | undefined {
  return THEMES.find((theme) => theme.slug === slug);
}

export function themePath(locale: Locale, slug: ThemeSlug): string {
  return `${locale === "zh" ? "/zh" : ""}/themes/${slug}`;
}
```

- [ ] **Step 6: Run the focused test and inspect asset sizes**

Run: `npm test -- tests/themes-data.test.ts`

Expected: PASS, 3 tests.

Run: `du -h public/themes/original/*.png public/themes/original/previews/*.jpg`

Expected: all eight files are listed; each preview is smaller than its corresponding PNG.

- [ ] **Step 7: Commit the original asset domain**

```bash
git add public/themes/original src/content/themes.ts tests/themes-data.test.ts
git commit -m "feat: add original CodexSkin theme assets"
```

### Task 2: Add product routing, localized product copy, and navigation

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Create: `src/content/product.ts`
- Modify: `src/components/site/header.tsx`
- Modify: `src/components/site/locale-switcher.tsx`
- Modify: `src/components/site/footer.tsx`
- Modify: `tests/routes.test.ts`
- Modify: `tests/navigation.test.tsx`
- Modify: `tests/config.test.ts`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Produces: `PRODUCT_ROUTES`, `ProductRouteKey`, `productRoutePath(locale, key)`, `localizedPath(pathname, locale)`, and `productContentByLocale`.
- Consumes: `ThemeSlug` and existing `Locale`/guide routing.
- Consumed by: pages, metadata, sitemap, home calls to action, and the locale switcher.

- [ ] **Step 1: Extend route and navigation tests first**

Add these assertions to `tests/routes.test.ts`:

```ts
import { localizedPath, productRoutePath } from "@/lib/site";

expect(productRoutePath("en", "themes")).toBe("/themes");
expect(productRoutePath("zh", "custom")).toBe("/zh/custom");
expect(localizedPath("/themes/neon-current", "zh")).toBe("/zh/themes/neon-current");
expect(localizedPath("/zh/themes/neon-current", "en")).toBe("/themes/neon-current");
```

Update `tests/navigation.test.tsx` so the English header must expose links to `/themes`, `/custom`, `/#install`, and `/#faq`, the locale link maps `/themes/neon-current` to `/zh/themes/neon-current`, and GitHub points to `https://github.com/swg209/codex-skin-site`.

Update `tests/config.test.ts`:

```ts
expect(GITHUB_URL).toBe("https://github.com/swg209/codex-skin-site");
expect(source).toContain("https://github.com/Fei-Away/Codex-Dream-Skin");
```

Update `tests/content.test.ts` so both locales require `nav.custom`, product catalog/custom copy, and privacy text that mentions form submission and no site database.

- [ ] **Step 2: Run the routing/navigation/content tests and verify failure**

Run: `npm test -- tests/routes.test.ts tests/navigation.test.tsx tests/config.test.ts tests/content.test.ts`

Expected: FAIL because product routes, custom nav copy, and product content do not exist and GitHub still resolves to the upstream repository.

- [ ] **Step 3: Implement path helpers without changing guide route keys**

Add to `src/lib/site.ts`:

```ts
export const PRODUCT_ROUTES = ["themes", "custom"] as const;
export type ProductRouteKey = (typeof PRODUCT_ROUTES)[number];

export function productRoutePath(locale: Locale, key: ProductRouteKey): string {
  return `${locale === "zh" ? "/zh" : ""}/${key}`;
}

export function localizedPath(pathname: string, locale: Locale): string {
  const englishPath = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  if (locale === "en") return englishPath;
  return englishPath === "/" ? "/zh" : `/zh${englishPath}`;
}
```

Change only the exported website GitHub constant:

```ts
export const GITHUB_URL = siteConfig.repositoryUrl;
```

Keep all `siteConfig.upstream.*` fields and installation links unchanged.

- [ ] **Step 4: Define complete localized product copy**

Create `src/content/product.ts` with typed English and Chinese sections for:

```ts
export type Audience = "kol" | "creator" | "community";

export interface ProductContent {
  themes: {
    seo: { title: string; description: string };
    eyebrow: string; h1: string; intro: string; disclosure: string;
    licenseTitle: string; licenseShort: string; viewTheme: string;
    download: string; details: string; colors: string; format: string;
    dimensions: string; usageTitle: string; guideTitle: string;
    windowsGuide: string; macosGuide: string; customCta: string;
    customDescription: string; relatedTitle: string;
  };
  custom: {
    seo: { title: string; description: string };
    eyebrow: string; h1: string; intro: string; quoteNotice: string;
    servicesTitle: string; processTitle: string; formTitle: string;
    privacyNotice: string; services: Array<{ audience: Audience; title: string; description: string; deliverables: string[] }>;
    process: Array<{ title: string; description: string }>;
    form: { name: string; email: string; audience: string; description: string; timeline: string; referenceUrl: string; submit: string; submitting: string; success: string; invalid: string; unavailable: string; retry: string; audienceOptions: Record<Audience, string> };
  };
}

export const productContentByLocale: Record<Locale, ProductContent> = {
  en: englishProductContent,
  zh: chineseProductContent,
};
```

Use these exact page claims:

| Field | English | Chinese |
| --- | --- | --- |
| Themes H1 | Original backgrounds for your Codex workspace | 为你的 Codex 工作区打造原创背景 |
| Themes disclosure | CodexSkin creates these visual materials independently. It is not affiliated with OpenAI and does not distribute third-party installers. | 这些视觉素材由 CodexSkin 独立创作。本站与 OpenAI 无隶属关系，也不分发第三方安装程序。 |
| License short | Free for personal, non-commercial use. No redistribution or resale. Commercial and brand use requires written permission. | 可免费用于个人非商业用途；禁止再分发或转售。商业与品牌用途需取得书面许可。 |
| Custom H1 | Custom Codex themes for creators and communities | 面向创作者与社群的 Codex 定制主题 |
| Quote notice | Scope, usage rights, schedule, and price are confirmed after we review your brief. | 我们会在审核需求后确认范围、使用权、排期与报价。 |
| Privacy notice | Your inquiry is sent through our email provider so we can reply. It is not stored in a site database. Do not include confidential information. | 你的需求会通过邮件服务商发送给我们以便回复，不会保存到本站数据库。请勿提交机密信息。 |

Use these exact SEO values:

| Page | English | Chinese |
| --- | --- | --- |
| Themes title | Original Codex Background Themes | CodexSkin | Codex 原创背景主题 | CodexSkin |
| Themes description | Browse and download original Codex workspace backgrounds from CodexSkin, with independent Windows and macOS application guides. | 浏览并下载 CodexSkin 原创 Codex 工作区背景素材，并查看独立的 Windows 与 macOS 应用教程。 |
| Custom title | Custom Codex Themes for Creators & Communities | CodexSkin | 创作者与社群 Codex 定制主题 | CodexSkin |
| Custom description | Request original Codex theme design for KOL brands, creator projects, developer communities, and events. | 为 KOL 品牌、创作者项目、开发者社群与活动申请原创 Codex 主题设计。 |

Use these exact service records:

| Audience | English description and deliverables | Chinese description and deliverables |
| --- | --- | --- |
| `kol` | A recognizable Codex visual direction for your personal brand. Deliverables: Original visual direction; 2560 × 1600 background; Codex preview composition; Agreed personal-brand usage scope. | 为个人品牌建立具有辨识度的 Codex 视觉方向。交付：原创视觉方向；2560 × 1600 背景；Codex 效果预览；约定的个人品牌使用范围。 |
| `creator` | A coordinated visual pack for a channel, series, or launch. Deliverables: Coordinated background set; Color direction; Preview assets; Agreed channel or campaign usage scope. | 为频道、内容系列或发布活动制作协调一致的视觉主题包。交付：成套背景素材；色彩方向；预览素材；约定的频道或活动使用范围。 |
| `community` | A shared theme system for a developer community or event. Deliverables: Community or event visual direction; Background variants; Launch assets; Agreed organizational usage scope. | 为开发者社群或活动制作统一的主题系统。交付：社群或活动视觉方向；背景变体；发布素材；约定的组织使用范围。 |

Use these exact process records in both locales: `Submit your brief / 提交需求`, `Confirm scope and rights / 确认范围与使用权`, `Receive quote and schedule / 获取报价与排期`, and `Review concept and receive files / 审核方案并接收文件`.

Use these form messages: success `Thanks — your brief has been sent. We will reply by email. / 已收到你的需求，我们会通过邮件回复。`; invalid `Please check the highlighted fields. / 请检查标记的字段。`; unavailable `Inquiry service is temporarily unavailable. Please try again later. / 需求提交服务暂时不可用，请稍后重试。`; retry `We could not send your brief. Your entries are preserved; please try again. / 暂时无法发送，你填写的内容已保留，请重试。`.

Use exactly three service records: `KOL signature theme / KOL 标志性主题`, `Creator visual pack / 创作者视觉主题包`, and `Developer community or event theme / 开发者社群或活动主题`. Each has the deliverables from the approved design: original direction, background files/variants, preview or launch assets, and an agreed usage-rights scope. Use four process records: submit brief, confirm scope and rights, receive quote and schedule, review concept and receive final files.

- [ ] **Step 5: Update shared navigation and privacy copy**

Change `NavCopy` to replace `features` with `custom`. Update both locale `nav` objects. In `Header`, use:

```ts
const links = [
  { label: nav.themes, href: productRoutePath(locale, "themes") },
  { label: nav.custom, href: productRoutePath(locale, "custom") },
  { label: nav.install, href: `${home}#install` },
  { label: nav.faq, href: `${home}#faq` },
];
```

Change `LocaleSwitcher` to:

```ts
const href = localizedPath(pathname || routePath(locale, "home"), nextLocale) as Route;
```

Update footer privacy text to the exact privacy notices above plus the existing analytics disclosure. Keep the independent disclaimer and upstream links. Add localized footer links for original themes and custom service before the existing guide link.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- tests/routes.test.ts tests/navigation.test.tsx tests/config.test.ts tests/content.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit product routing and copy**

```bash
git add src/lib/site.ts src/content src/components/site tests/routes.test.ts tests/navigation.test.tsx tests/config.test.ts tests/content.test.ts
git commit -m "feat: add product routes and localized copy"
```

### Task 3: Build statically generated catalog and detail pages with SEO

**Files:**
- Create: `src/components/themes/theme-card.tsx`
- Create: `src/components/themes/theme-catalog-page.tsx`
- Create: `src/components/themes/theme-detail-page.tsx`
- Create: `src/app/(en)/themes/page.tsx`
- Create: `src/app/(en)/themes/[slug]/page.tsx`
- Create: `src/app/(zh)/zh/themes/page.tsx`
- Create: `src/app/(zh)/zh/themes/[slug]/page.tsx`
- Modify: `src/lib/seo.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/globals.css`
- Create: `tests/theme-pages.test.tsx`
- Modify: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `THEMES`, `ThemeRecord`, `ThemeSlug`, `getTheme`, `themePath`, `productContentByLocale`, route helpers, `JsonLd`, and existing guide paths.
- Produces: `buildProductMetadata`, `buildThemeMetadata`, `collectionPageSchema`, `themeSchema`, `serviceSchema`, and ten new indexable pages (two catalogs plus eight detail pages; custom pages arrive in Task 6).

- [ ] **Step 1: Write page and SEO tests before components**

Create `tests/theme-pages.test.tsx` that renders `ThemeCatalogPage` and `ThemeDetailPage` and asserts:

```ts
expect(screen.getByRole("heading", { level: 1, name: "Original backgrounds for your Codex workspace" })).toBeVisible();
expect(screen.getAllByRole("link", { name: /View theme/ })).toHaveLength(4);
expect(screen.getByText(/not affiliated with OpenAI/i)).toBeVisible();

expect(screen.getByRole("heading", { level: 1, name: "Neon Current" })).toBeVisible();
expect(screen.getByRole("link", { name: "Download background" })).toHaveAttribute("href", "/themes/original/neon-current.png");
expect(screen.getByRole("link", { name: "Download background" })).toHaveAttribute("download", "codexskin-neon-current.png");
expect(screen.getByText(/personal, non-commercial/i)).toBeVisible();
expect(screen.getByRole("link", { name: /Windows/ })).toHaveAttribute("href", "/install/windows");
expect(screen.getByRole("link", { name: /macOS/ })).toHaveAttribute("href", "/install/macos");
expect(screen.getByRole("link", { name: /custom/i })).toHaveAttribute("href", "/custom");
```

Also import the English detail route and assert that an unknown slug rejects with the Next.js 404 error. This verifies the route calls `notFound()` instead of rendering an empty shell:

```ts
await expect(
  EnglishThemeDetailPage({ params: Promise.resolve({ slug: "missing" }) }),
).rejects.toMatchObject({ digest: "NEXT_HTTP_ERROR_FALLBACK;404" });
```

Extend `tests/seo.test.ts` to assert catalog canonical/hreflang, `Neon Current` detail metadata, `CollectionPage`, `ItemList`, `CreativeWork`, `ImageObject`, `#license`, and sitemap entries for all four slugs in both locales. The sitemap total at this task is 20: existing 10 + catalogs 2 + theme details 8; custom pages are added later.

- [ ] **Step 2: Run the new page and SEO tests and confirm failure**

Run: `npm test -- tests/theme-pages.test.tsx tests/seo.test.ts`

Expected: FAIL because theme page components, metadata builders, schemas, and sitemap entries do not exist.

- [ ] **Step 3: Implement metadata and schema helpers**

In `src/lib/seo.ts`, add:

```ts
export function buildProductMetadata(locale: Locale, key: ProductRouteKey): Metadata;
export function buildThemeMetadata(locale: Locale, theme: ThemeRecord): Metadata;
export function collectionPageSchema(locale: Locale): Record<string, unknown>;
export function themeSchema(locale: Locale, theme: ThemeRecord): Record<string, unknown>[];
export function serviceSchema(locale: Locale): Record<string, unknown>;
```

Reuse the existing `socialImages`, canonical, and language-alternate patterns. `buildThemeMetadata` must alternate to the same slug and use the theme preview as its social image. `themeSchema` returns a `CreativeWork` and an `ImageObject`; both use CodexSkin as creator, the detail URL as page URL, the absolute PNG URL as content URL, and `${detailUrl}#license` as license. Do not add offers, price, ratings, or `SoftwareApplication`.

- [ ] **Step 4: Implement shared catalog and detail components**

`ThemeCard` is a server component with a linked `next/image` preview, localized name, summary, mood, and three accessible color swatches. `ThemeCatalogPage` renders one H1, the disclosure, four cards, the personal-use license summary, platform-guide links, and a custom CTA.

`ThemeDetailPage` renders `JsonLd` for both theme schemas, a home → themes → current breadcrumb, preview, dimensions/format/mood/colors, the download anchor with `download={\`codexskin-${theme.slug}.png\`}`, a visible `<section id="license">`, platform guide cards, the third-party-tool disclosure, custom CTA, and two related `ThemeCard` items.

Use `next/link` for internal navigation. The download remains a normal `<a>` because it uses the `download` attribute.

- [ ] **Step 5: Add route modules with static params and not-found behavior**

Each catalog route exports `metadata = buildProductMetadata(locale, "themes")`. Each detail route implements:

```ts
export function generateStaticParams() {
  return THEME_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const theme = getTheme((await params).slug);
  return theme ? buildThemeMetadata("en", theme) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const theme = getTheme((await params).slug);
  if (!theme) notFound();
  return <ThemeDetailPage locale="en" theme={theme} />;
}
```

Use `"zh"` in the Chinese file. Do not duplicate rendering logic in route files.

- [ ] **Step 6: Extend the sitemap**

Keep existing guide entries and add catalog plus detail entries. Every entry has reciprocal `en`, `zh-CN`, and `x-default` alternates. Use `2026-07-17T00:00:00.000Z` for new content, `weekly` for catalogs, `monthly` for detail pages, priority `0.9` for catalogs and `0.8` for details.

- [ ] **Step 7: Add responsive theme-page styles**

Add focused classes for `.product-hero`, `.original-theme-grid`, `.original-theme-card`, `.theme-detail`, `.theme-detail__preview`, `.theme-meta`, `.color-list`, `.license-panel`, `.platform-guide-grid`, and `.related-themes`. Use existing variables, button styles, `--max-width`, 18–20px radii, and existing 680px/900px breakpoints. Ensure the grid is two columns on desktop and one at 680px, previews use `aspect-ratio: 16 / 10`, images use `object-fit: cover`, and no text is placed directly over artwork.

- [ ] **Step 8: Run focused tests, lint, and typecheck**

Run: `npm test -- tests/theme-pages.test.tsx tests/seo.test.ts`

Expected: PASS.

Run: `npm run lint && npm run typecheck`

Expected: both commands exit 0.

- [ ] **Step 9: Commit catalog and detail pages**

```bash
git add src/components/themes src/app/'(en)'/themes src/app/'(zh)'/zh/themes src/lib/seo.ts src/app/sitemap.ts src/app/globals.css tests/theme-pages.test.tsx tests/seo.test.ts
git commit -m "feat: publish bilingual original theme catalog"
```

### Task 4: Rebuild the home-page conversion path around original themes

**Files:**
- Modify: `src/components/home/home-page.tsx`
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/home/create-your-look.tsx`
- Modify: `src/components/home/final-cta.tsx`
- Delete: `src/components/home/theme-gallery.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/app/globals.css`
- Modify: `tests/home-page.test.tsx`
- Delete: `tests/gallery.test.tsx`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Consumes: `THEMES`, `ThemeCard`, `productRoutePath`, guide routes, and localized home/product copy.
- Produces: a home-page discovery path from original themes to downloads/guides/custom service.

- [ ] **Step 1: Replace old gallery expectations with conversion expectations**

Update `tests/home-page.test.tsx` to assert this order: hero → original themes → Quick Start → custom-service teaser. Require four theme links, `/themes`, `/custom`, both guide links, independent disclosure, and no disabled generator button. Update `tests/content.test.ts` to stop requiring eight gallery records and instead require home copy for original themes and custom services.

- [ ] **Step 2: Run home/content tests and verify failure**

Run: `npm test -- tests/home-page.test.tsx tests/content.test.ts`

Expected: FAIL against the current upstream gallery and disabled generator.

- [ ] **Step 3: Update home content types and localized copy**

Remove `GalleryItem`, `HomeContent.gallery`, lightbox labels, and `CreateLookContent.comingSoon`. Change `CreateLookContent` to carry `browseHref` and `customHref`. Keep the existing Quick Start and safety copy, but make the home hero actions:

- English: `Browse original themes`, `Request a custom theme`, `View installation guides`.
- Chinese: `浏览原创主题`, `申请定制主题`, `查看安装教程`.

Use the exact independent disclosure from Task 2 in the original-theme section. Change any home phrase implying the upstream project is “our” software to third-party wording.

- [ ] **Step 4: Replace the upstream showcase with original theme cards**

Render the first four `THEMES` through `ThemeCard`. Use `neon-current` as the hero image and `lunar-paper` for the proof section. Keep `public/themes/skin-01.jpg` through `skin-08.jpg` and their README unchanged on disk, but remove all imports and visible home references to them.

Turn `CreateYourLook` into the custom-service teaser with two links (`/themes`, `/custom`), and update `FinalCta` to prioritize themes/custom while preserving guide access. Remove `ThemeGallery` and its test because detail pages now own full-size discovery.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/home-page.test.tsx tests/content.test.ts`

Expected: PASS.

Run: `rg -n "skin-0[1-8]|Coming Soon|即将上线|our project|Official Website" src`

Expected: no upstream gallery assets or misleading/disabled-generator copy in rendered source.

- [ ] **Step 6: Commit the home conversion update**

```bash
git add src/components/home src/content src/app/globals.css tests/home-page.test.tsx tests/content.test.ts tests/gallery.test.tsx
git commit -m "feat: center home page on original themes"
```

### Task 5: Add validated Resend inquiry delivery

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/lib/custom-inquiry.ts`
- Create: `src/lib/send-custom-inquiry.ts`
- Create: `src/app/api/custom-inquiry/route.ts`
- Create: `tests/custom-inquiry.test.ts`
- Create: `tests/custom-inquiry-route.test.ts`
- Modify: `.env.example`
- Modify: `docs/deployment.md`
- Modify: `tests/config.test.ts`

**Interfaces:**
- Produces: `CustomInquiryInput`, `ValidatedCustomInquiry`, `validateCustomInquiry(value)`, `sendCustomInquiry(input, env)`, and `POST(request)`.
- Consumed by: custom inquiry form and API route tests.

- [ ] **Step 1: Write pure validation tests**

Create `tests/custom-inquiry.test.ts` covering a valid payload, trimmed/lowercased values, every length boundary, invalid audience, non-HTTP URL, honeypot, and unknown fields. Use this valid fixture:

```ts
const valid = {
  locale: "en",
  name: "Ada Lovelace",
  email: "ADA@example.com",
  audience: "creator",
  description: "I need an original background set for a technical video series.",
  timeline: "Next month",
  referenceUrl: "https://example.com/brief",
  company: "",
};
```

In `src/lib/custom-inquiry.ts`, import `Audience` from `src/content/product.ts` and define:

```ts
export interface CustomInquiryInput {
  locale: "en" | "zh";
  name: string;
  email: string;
  audience: Audience;
  description: string;
  timeline: string;
  referenceUrl: string;
  company: string;
}

export type ValidatedCustomInquiry = Omit<CustomInquiryInput, "company">;

export interface InquiryEmailEnv {
  apiKey: string;
  to: string;
  from: string;
}
```

The result is a discriminated union:

```ts
type ValidationResult =
  | { ok: true; data: ValidatedCustomInquiry; bot: boolean }
  | { ok: false; field: keyof CustomInquiryInput; code: "required" | "invalid" | "too_short" | "too_long" };
```

- [ ] **Step 2: Run validation tests and confirm failure**

Run: `npm test -- tests/custom-inquiry.test.ts`

Expected: FAIL because `src/lib/custom-inquiry.ts` does not exist.

- [ ] **Step 3: Implement pure validation**

Implement the exact design limits: name 2–80, email 5–254 with a conservative pattern, description 30–2000, timeline 0–120, reference URL empty or absolute HTTP/HTTPS up to 500, locale `en|zh`, audience `kol|creator|community`, and `company` as the honeypot. Trim all strings, lowercase email, ignore unexpected keys, and never throw for unknown input.

- [ ] **Step 4: Run validation tests**

Run: `npm test -- tests/custom-inquiry.test.ts`

Expected: PASS.

- [ ] **Step 5: Install Resend and write API route tests**

Run: `npm install resend`

Create `tests/custom-inquiry-route.test.ts`. Mock `@/lib/send-custom-inquiry` and cover:

- valid request → 200 `{ ok: true }` and one send call;
- populated honeypot → 200 and zero send calls;
- `text/plain` → 415;
- malformed JSON → 400;
- body larger than 16 KB → 413;
- validation error → 400;
- missing env → 503;
- provider failure → 502 without echoing the submission.

Save and restore `process.env` in `beforeEach`/`afterEach`. Do not make a real network call.

- [ ] **Step 6: Run route tests and confirm failure**

Run: `npm test -- tests/custom-inquiry-route.test.ts`

Expected: FAIL because the API route and sender do not exist.

- [ ] **Step 7: Implement email delivery and the route**

`src/lib/send-custom-inquiry.ts` uses the current official Resend Node SDK shape:

```ts
const resend = new Resend(env.apiKey);
const { data, error } = await resend.emails.send({
  from: env.from,
  to: [env.to],
  replyTo: input.email,
  subject: `[CodexSkin custom inquiry] ${input.audience} — ${input.name}`,
  text: buildPlainTextInquiry(input),
});
if (error) throw new InquiryDeliveryError(error.name);
return data?.id ?? null;
```

`buildPlainTextInquiry` includes locale, audience, name, email, timeline or `Not supplied`, reference URL or `Not supplied`, and description. Do not produce raw HTML.

The route reads `request.text()` before JSON parsing so it can enforce 16 KB, checks `content-type` for `application/json`, returns localized generic messages based on a valid `locale` when possible, treats a honeypot submission as success, verifies all three env values before calling the sender, and logs only `custom inquiry delivery failed` plus the provider error name.

- [ ] **Step 8: Document deployment configuration**

Append empty keys to `.env.example`:

```text
RESEND_API_KEY=
CUSTOM_INQUIRY_TO_EMAIL=
CUSTOM_INQUIRY_FROM_EMAIL=
```

Add a “Custom inquiry email” section to `docs/deployment.md`: verify the sender domain in Resend, set all three variables for Vercel Production and Preview, redeploy, submit a non-sensitive test brief, and confirm receipt. State explicitly that the site stores no inquiry database record.

Extend `tests/config.test.ts` to require all three names in `.env.example` and the Resend/Vercel setup in deployment docs.

- [ ] **Step 9: Run backend/config tests and typecheck**

Run: `npm test -- tests/custom-inquiry.test.ts tests/custom-inquiry-route.test.ts tests/config.test.ts`

Expected: PASS.

Run: `npm run typecheck`

Expected: exit 0.

- [ ] **Step 10: Commit inquiry delivery**

```bash
git add package.json package-lock.json src/lib/custom-inquiry.ts src/lib/send-custom-inquiry.ts src/app/api/custom-inquiry tests/custom-inquiry.test.ts tests/custom-inquiry-route.test.ts .env.example docs/deployment.md tests/config.test.ts
git commit -m "feat: deliver custom inquiries with Resend"
```

### Task 6: Build bilingual custom-service pages, form behavior, analytics, and privacy

**Files:**
- Create: `src/lib/analytics.ts`
- Create: `src/components/site/product-events.tsx`
- Create: `src/components/custom/custom-inquiry-form.tsx`
- Create: `src/components/custom/custom-page.tsx`
- Create: `src/app/(en)/custom/page.tsx`
- Create: `src/app/(zh)/zh/custom/page.tsx`
- Modify: `src/components/themes/theme-card.tsx`
- Modify: `src/components/themes/theme-detail-page.tsx`
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/home/create-your-look.tsx`
- Modify: `src/components/home/final-cta.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/globals.css`
- Create: `tests/custom-page.test.tsx`
- Create: `tests/custom-inquiry-form.test.tsx`
- Modify: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `productContentByLocale`, `Audience`, `CustomInquiryInput`, product routes, `serviceSchema`, and the existing analytics providers.
- Produces: `trackProductEvent(name, properties)`, accessible custom pages, form state flow, and two final sitemap entries.

- [ ] **Step 1: Write custom page and form tests**

`tests/custom-page.test.tsx` requires one H1, three service cards, four process steps, no currency amounts or fixed price tiers, the quote notice, privacy notice, and the form.

`tests/custom-inquiry-form.test.tsx` mocks `fetch` and `trackProductEvent`, then covers:

```ts
expect(screen.getByLabelText("Name")).toBeRequired();
expect(screen.getByLabelText("Email")).toBeRequired();
expect(screen.getByLabelText("Project description")).toBeRequired();
```

It submits valid values, checks the button changes to `Sending…`, validates the exact JSON payload, checks fields clear and the `aria-live` success message receives focus, and asserts `custom_inquiry_success` receives only `audience` and `locale`. A rejected fetch preserves inputs and emits `custom_inquiry_error` with only `error_type` and `locale`. A second click while pending must not create a duplicate request.

Extend `tests/seo.test.ts` so custom metadata/schema has `Service`, no `Offer`, and the sitemap final total is 22.

- [ ] **Step 2: Run custom UI/SEO tests and confirm failure**

Run: `npm test -- tests/custom-page.test.tsx tests/custom-inquiry-form.test.tsx tests/seo.test.ts`

Expected: FAIL because the pages, form, tracking helper, and custom sitemap entries do not exist.

- [ ] **Step 3: Implement privacy-safe analytics**

Create a client-only `trackProductEvent` helper that accepts only these typed events:

```ts
export type ProductEvent =
  | { name: "theme_view"; properties: { theme_slug: ThemeSlug; locale: Locale } }
  | { name: "theme_download"; properties: { theme_slug: ThemeSlug; locale: Locale; asset_format: "PNG" } }
  | { name: "custom_cta_click"; properties: { source: "home_hero" | "home_teaser" | "home_final" | "catalog" | "theme_detail"; locale: Locale } }
  | { name: "custom_inquiry_success"; properties: { audience: Audience; locale: Locale } }
  | { name: "custom_inquiry_error"; properties: { error_type: "validation" | "network" | "server"; locale: Locale } };
```

Call `window.gtag?.("event", name, properties)` when GA is present and `track(name, properties)` from `@vercel/analytics` for Vercel Analytics. Add a global declaration for `window.gtag`. The type must make personal/free-form fields impossible to pass.

Create `src/components/site/product-events.tsx` as the only UI bridge to that helper:

```tsx
"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { trackProductEvent, type ProductEvent } from "@/lib/analytics";

export function ProductEventOnMount({ event }: { event: ProductEvent }) {
  const initialEvent = useRef(event);
  useEffect(() => {
    const value = initialEvent.current;
    trackProductEvent(value.name, value.properties);
  }, []);
  return null;
}

export function TrackedAction({
  event,
  children,
}: {
  event: ProductEvent;
  children: (onClick: MouseEventHandler<HTMLElement>) => ReactNode;
}) {
  return <>{children(() => trackProductEvent(event.name, event.properties))}</>;
}
```

`ProductEventOnMount` deliberately captures the initial event in a ref so `theme_view` fires once rather than after every server-component hydration render.

- [ ] **Step 4: Implement the accessible inquiry form**

Use controlled inputs for the seven visible/hidden fields, native `required`, `minLength`, `maxLength`, `type="email"`, and `type="url"` attributes matching server rules. The honeypot is named `company`, wrapped in `.form-honeypot`, has `tabIndex={-1}` and `autoComplete="off"`.

Submit JSON to `/api/custom-inquiry` with `content-type: application/json`. Disable the button while pending. Map 400 to validation, 502/503 to server, and thrown fetch failures to network. Clear visible values only on success. Render field-safe feedback and a focusable `role="status" aria-live="polite" tabIndex={-1}` result element; focus it after completion.

- [ ] **Step 5: Implement custom page and routes**

`CustomPage` renders `serviceSchema`, H1/intro/quote notice, three service cards with deliverable lists, four process steps, privacy notice, and `CustomInquiryForm`. Both route files export `buildProductMetadata(locale, "custom")` and render the shared page.

- [ ] **Step 6: Instrument only approved interactions**

Use a tiny client link wrapper where needed. Record `theme_view` once when a detail component mounts, `theme_download` on the download click, and `custom_cta_click` with the exact source union. Never instrument guide/source links with product events. Never pass visible form values except the audience enum.

- [ ] **Step 7: Add custom pages to sitemap and styles**

Add `/custom` and `/zh/custom` with reciprocal alternates, weekly change frequency, priority `0.9`, and last modified `2026-07-17T00:00:00.000Z`.

Add `.service-grid`, `.service-card`, `.process-grid`, `.custom-form`, `.form-grid`, `.form-field`, `.form-field--wide`, `.form-error`, `.form-status`, and `.form-honeypot`. Use two columns for the form on desktop and one below 680px. Inputs use the existing dark surfaces, at least 48px control height, visible focus outlines, and error text using `--danger`.

- [ ] **Step 8: Run focused tests and accessibility-oriented assertions**

Run: `npm test -- tests/custom-page.test.tsx tests/custom-inquiry-form.test.tsx tests/seo.test.ts`

Expected: PASS.

Run: `npm run lint && npm run typecheck`

Expected: both exit 0.

- [ ] **Step 9: Commit the custom-service experience**

```bash
git add src/lib/analytics.ts src/components/site/product-events.tsx src/components/custom src/app/'(en)'/custom src/app/'(zh)'/zh/custom src/components/themes src/components/home src/app/sitemap.ts src/app/globals.css tests/custom-page.test.tsx tests/custom-inquiry-form.test.tsx tests/seo.test.ts
git commit -m "feat: add bilingual custom theme inquiries"
```

### Task 7: Expand production verification and run the release gate

**Files:**
- Modify: `scripts/verify-site.mjs`
- Modify: `tests/verify-script.test.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: the final public route set, sitemap, robots, manifest, and built application.
- Produces: repeatable full-site verification for 22 public content routes plus four SEO endpoints.

- [ ] **Step 1: Update verification tests first**

Change `tests/verify-script.test.ts` to expect 22 public content routes and require:

```ts
expect(paths).toContain("/themes");
expect(paths).toContain("/themes/neon-current");
expect(paths).toContain("/zh/themes/lunar-paper");
expect(paths).toContain("/custom");
expect(paths).toContain("/zh/custom");
```

Keep the canonical, hreflang, noindex, and one-H1 checks.

- [ ] **Step 2: Run the verification helper test and confirm failure**

Run: `npm test -- tests/verify-script.test.ts`

Expected: FAIL because `PUBLIC_PATHS` still has ten entries.

- [ ] **Step 3: Expand `PUBLIC_PATHS` deterministically**

Add two catalogs, eight detail pages, and two custom pages to `scripts/verify-site.mjs`. Keep explicit `{ path, locale }` records so a reviewer can see every production URL. The checker must continue verifying 200, canonical, reciprocal hreflang, one H1, absence of `noindex`, sitemap inclusion, robots, manifest, and a 404 with `noindex`.

- [ ] **Step 4: Update the README product description and operating notes**

State that CodexSkin supplies original visual materials, independent tutorials, and custom services; link the original asset license; list the six route families; document that third-party installers remain external; and point deployment operators to `docs/deployment.md` for Resend configuration.

- [ ] **Step 5: Run all automated release gates**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: every command exits 0; tests cover 22 routes; the build lists static catalog/detail/custom pages and the dynamic `/api/custom-inquiry` endpoint.

- [ ] **Step 6: Run the production-style verifier locally**

Start the production server in one terminal:

```bash
npm run start
```

Run in another terminal:

```bash
npm run verify:site
```

Expected: `Verified 22 routes and 4 SEO endpoints.`

- [ ] **Step 7: Perform browser verification**

Use the `vercel:agent-browser-verify` skill against the local production build. At both 390px and 1440px, inspect `/`, `/zh`, `/themes`, `/zh/themes/neon-current`, `/custom`, and `/zh/custom`. Confirm no horizontal scroll, one visible H1, working locale switches, readable focus states, four theme cards, successful downloads, no console errors, and form values preserved on a simulated server error.

With Resend preview environment variables configured, submit one non-sensitive English test inquiry and confirm receipt. Temporarily use an invalid API key in Preview, confirm the form shows the retry message without losing inputs, then restore the correct Preview key. Do not run this mutation against Production.

- [ ] **Step 8: Inspect the final diff and identity boundaries**

Run:

```bash
git diff --check
rg -n "Official Website|our project|SoftwareApplication|skin-0[1-8]" src README.md
rg -n "Fei-Away/Codex-Dream-Skin" src/config/site.ts src/content docs README.md
git status --short
```

Expected: no whitespace errors; no misleading official/ownership wording or upstream gallery usage in rendered source; the verified upstream URL remains centralized and disclosed; only intended files are changed.

- [ ] **Step 9: Commit verification and documentation**

```bash
git add scripts/verify-site.mjs tests/verify-script.test.ts README.md
git commit -m "test: verify original themes and custom services"
```

- [ ] **Step 10: Request code review before publishing**

Invoke `superpowers:requesting-code-review`, address only evidence-backed issues, rerun the full release gate, then use `superpowers:finishing-a-development-branch` to choose push/PR/merge handling. Do not deploy or push until the user authorizes that external action in the execution session.
