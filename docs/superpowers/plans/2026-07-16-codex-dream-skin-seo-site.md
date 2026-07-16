# Codex Dream Skin SEO Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a bilingual, static-first Next.js website that presents Codex Dream Skin accurately and gives Google ten crawlable, canonical content routes.

**Architecture:** Next.js 16 App Router uses separate English and Chinese root-layout route groups so the server-rendered `<html lang>` value is correct. Typed content modules feed shared home and guide templates; pure SEO helpers generate metadata and JSON-LD, while only the mobile menu, gallery lightbox, command copy button, and analytics require client behavior. All public content is build-time local data and local images.

**Tech Stack:** Next.js 16.2+, React 19.2+, TypeScript 5.9+, Tailwind CSS 4, Vitest 4, Testing Library, ESLint 9, Vercel Analytics 2, Vercel deployment.

## Global Constraints

- The canonical production origin is exactly `https://codexskin.site`; `www.codexskin.site` permanently redirects to it.
- Implement exactly the ten routes in the approved spec; do not add a CMS, database, auth, uploads, payments, or a blog.
- Product claims and commands must match `swg209/Codex-Dream-Skin` at verified commit `170b84439e021d3adc10c2459a45606f899f299d` or a newer rechecked commit.
- Windows requires Node.js 22 or newer and must not be described as supporting the macOS user-image workflow.
- Do not create a fake download or Release URL; use the repository/platform directory while Releases remain empty.
- Use the eight repository-provided gallery composites with neutral captions and the visible rights disclaimer.
- Use Next.js `Image`, explicit sizes, one prioritized hero image, and lazy gallery images.
- Every public page has one H1, correct canonical and hreflang, and no `noindex`; 404 is the only noindex page.
- Keep client JavaScript limited to menu, lightbox, copy, GA, and Vercel Analytics.
- No model-authored SVG, heavy component library, webfont, carousel, autoplay, large gradient, or particle effect.

---

### Task 1: Project foundation and typed route contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/routes.test.ts`
- Create: `src/lib/site.ts`
- Create: `src/content/types.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `Locale = "en" | "zh"`, `RouteKey`, `ROUTES`, `routePath(locale, key)`, `alternatePaths(locale, key)`, `SITE_URL`, and `GITHUB_URL`.
- Consumes: approved route list and canonical-domain constraint.

- [ ] **Step 1: Add the deterministic toolchain and test runner**

Create `package.json` with these scripts and dependency families, then run `npm install` so `package-lock.json` records the exact resolved versions:

```json
{
  "name": "codex-dream-skin-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vercel/analytics": "^2.0.0",
    "next": "^16.2.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@types/node": "^24.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.2.0",
    "jsdom": "^26.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.9.0",
    "vitest": "^4.0.0"
  }
}
```

Configure TypeScript strict mode, `@/* -> ./src/*`, the Tailwind PostCSS plugin, flat Next.js ESLint config, and Vitest with `jsdom`, `tests/setup.ts`, and the same alias. Enable `experimental.globalNotFound` and `typedRoutes` in `next.config.ts`.

- [ ] **Step 2: Write the failing route-contract test**

```ts
import { describe, expect, it } from "vitest";
import { ROUTES, alternatePaths, routePath } from "@/lib/site";

describe("public route contract", () => {
  it("defines ten unique canonical routes", () => {
    const paths = ROUTES.flatMap((key) => [routePath("en", key), routePath("zh", key)]);
    expect(paths).toHaveLength(10);
    expect(new Set(paths).size).toBe(10);
    expect(paths).toEqual(expect.arrayContaining([
      "/", "/zh", "/install/windows", "/install/macos",
      "/guide/customize", "/guide/restore", "/zh/install/windows",
      "/zh/install/macos", "/zh/guide/customize", "/zh/guide/restore"
    ]));
  });

  it("returns reciprocal language alternates", () => {
    expect(alternatePaths("en", "windows")).toEqual({
      en: "/install/windows",
      "zh-CN": "/zh/install/windows",
      "x-default": "/install/windows"
    });
  });
});
```

- [ ] **Step 3: Run the test and confirm RED**

Run: `npm test -- tests/routes.test.ts`

Expected: FAIL because `@/lib/site` does not exist.

- [ ] **Step 4: Implement the route and content types**

`src/lib/site.ts` defines five route keys and locale-safe paths:

```ts
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://codexskin.site").replace(/\/$/, "");
export const GITHUB_URL = "https://github.com/swg209/Codex-Dream-Skin";
export const ISSUE_URL = `${GITHUB_URL}/issues`;
export const ROUTES = ["home", "windows", "macos", "customize", "restore"] as const;
export type RouteKey = (typeof ROUTES)[number];
export type Locale = "en" | "zh";

const english: Record<RouteKey, string> = {
  home: "/",
  windows: "/install/windows",
  macos: "/install/macos",
  customize: "/guide/customize",
  restore: "/guide/restore"
};

export function routePath(locale: Locale, key: RouteKey) {
  const path = english[key];
  return locale === "zh" ? (path === "/" ? "/zh" : `/zh${path}`) : path;
}

export function alternatePaths(_locale: Locale, key: RouteKey) {
  return { en: routePath("en", key), "zh-CN": routePath("zh", key), "x-default": routePath("en", key) };
}
```

`src/content/types.ts` exports concrete types for `SeoCopy`, `NavCopy`, `FaqItem`, `GalleryItem`, `HomeContent`, `GuideSection`, `GuideContent`, and `LocaleContent`. No optional field is used for required visible content.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test -- tests/routes.test.ts && npm run typecheck && npm run lint`

Expected: route tests pass; TypeScript and ESLint exit 0.

Commit: `chore: scaffold Next.js SEO site`

---

### Task 2: Bilingual content and source-backed product claims

**Files:**
- Create: `tests/content.test.ts`
- Create: `src/content/en.ts`
- Create: `src/content/zh.ts`
- Create: `src/content/index.ts`

**Interfaces:**
- Consumes: content types and route helpers from Task 1.
- Produces: `contentByLocale`, `getHomeContent(locale)`, and `getGuideContent(locale, key)`.

- [ ] **Step 1: Write failing content integrity tests**

```ts
import { describe, expect, it } from "vitest";
import { contentByLocale } from "@/content";

describe("localized product content", () => {
  it.each(["en", "zh"] as const)("contains complete %s home content", (locale) => {
    const home = contentByLocale[locale].home;
    expect(home.gallery).toHaveLength(8);
    expect(home.faq).toHaveLength(10);
    expect(home.features).toHaveLength(6);
    expect(home.hero.h1.length).toBeGreaterThan(20);
  });

  it("does not claim Windows supports custom images", () => {
    const windows = JSON.stringify({
      en: contentByLocale.en.guides.windows,
      zh: contentByLocale.zh.guides.windows
    }).toLowerCase();
    expect(windows).not.toMatch(/use your own image|custom user image|自定义图片|用户选图/);
  });

  it("keeps source-backed platform requirements", () => {
    expect(JSON.stringify(contentByLocale.en.guides.windows)).toContain("Node.js 22");
    expect(JSON.stringify(contentByLocale.en.guides.macos)).toContain("Apple Silicon");
    expect(JSON.stringify(contentByLocale.en.guides.macos)).toContain("Intel");
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/content.test.ts`

Expected: FAIL because locale content modules do not exist.

- [ ] **Step 3: Implement complete English and Chinese content**

Add the supplied home title/description and natural Chinese equivalent. Define eight neutral gallery captions mapped to `/themes/skin-01.jpg` through `/themes/skin-08.jpg`: Rose Workspace/粉色空间, Golden Workday/金色工作台, Red-White Future/红白未来, Clear Daylight/清透日光, Cosmic Muse/灵感宇宙, Violet Night/紫夜限定, Virtual Stage/虚拟舞台, and Black-Gold Stage/黑金舞台.

Define all six visible features and the ten FAQ questions from the approved brief. Answers must include: unofficial status; no `.app`, `app.asar`, or WindowsApps modification; Apple Silicon and Intel support; macOS user-image support; restore launchers/scripts; possible post-update reapplication; unchanged API keys/Base URL/provider; and the GitHub Issues destination.

Guide content must contain these real commands/entry points exactly:

```text
# macOS source workflow
./tests/run-tests.sh
./scripts/install-dream-skin-macos.sh --no-launch
~/.codex/codex-dream-skin-studio/scripts/customize-theme-macos.sh
./Install\ Menu\ Bar.command

# macOS custom image CLI
~/.codex/codex-dream-skin-studio/scripts/customize-theme-macos.sh \
  --image "/path/to/image.png" \
  --name "My theme" \
  --accent "#7cff46" \
  --secondary "#36d7e8" \
  --highlight "#642a8c"

# Windows repository workflow
powershell -ExecutionPolicy Bypass -File .\scripts\install-dream-skin.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-dream-skin.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\verify-dream-skin.ps1 -ScreenshotPath "$env:USERPROFILE\Desktop\codex-dream-skin.png"
powershell -ExecutionPolicy Bypass -File .\scripts\restore-dream-skin.ps1
```

The Windows guide explicitly labels the last three PowerShell commands according to the repository scripts and tells users to download/clone the repository's `windows/` directory, not a nonexistent Release. The macOS guide explains the double-click `Install Codex Dream Skin.command`, Start, Verify, Customize, and Restore launchers. Customize guidance includes PNG/JPEG/HEIC/TIFF/WebP, source ≤50 MB, prepared file ≤16 MB, width ≥2000px recommended, and a calm left side. Restore content explains that themes do not remove threads, projects, pets/plugins, or authentication state.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- tests/content.test.ts && npm run typecheck`

Expected: all content tests pass.

Commit: `feat: add bilingual source-backed content`

---

### Task 3: Metadata, structured data, sitemap, robots, and manifest

**Files:**
- Create: `tests/seo.test.ts`
- Create: `src/lib/seo.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/manifest.ts`
- Create: `src/components/site/json-ld.tsx`

**Interfaces:**
- Consumes: `contentByLocale`, `SITE_URL`, route helpers.
- Produces: `buildMetadata(locale, key)`, `softwareApplicationSchema(locale)`, `faqSchema(locale)`, `breadcrumbSchema(locale, key)`, sitemap, robots, manifest.

- [ ] **Step 1: Write failing SEO tests**

```ts
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

describe("SEO output", () => {
  it("emits canonical and reciprocal hreflang", () => {
    const metadata = buildMetadata("zh", "windows");
    expect(metadata.alternates?.canonical).toBe("https://codexskin.site/zh/install/windows");
    expect(metadata.alternates?.languages).toMatchObject({
      en: "https://codexskin.site/install/windows",
      "zh-CN": "https://codexskin.site/zh/install/windows",
      "x-default": "https://codexskin.site/install/windows"
    });
  });

  it("lists all ten canonical routes", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(10);
    expect(entries.every((entry) => entry.url.startsWith("https://codexskin.site/"))).toBe(true);
    expect(entries.some((entry) => entry.url.includes("www."))).toBe(false);
  });

  it("allows crawling and publishes the sitemap", () => {
    expect(robots()).toMatchObject({ sitemap: "https://codexskin.site/sitemap.xml" });
  });

  it("keeps JSON-LD synchronized with visible content", () => {
    expect(faqSchema("en").mainEntity).toHaveLength(10);
    expect(breadcrumbSchema("en", "restore").itemListElement.at(-1)?.name).toMatch(/Restore/);
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/seo.test.ts`

Expected: FAIL because SEO modules and metadata routes do not exist.

- [ ] **Step 3: Implement metadata and schemas**

`buildMetadata` returns a unique title/description, absolute canonical, absolute `en`/`zh-CN`/`x-default` alternates, Open Graph locale/alternateLocale, and X `summary_large_image`. It adds `verification.google` only when `NEXT_PUBLIC_GSC_VERIFICATION` is non-empty and adds `/og.png` only after the verified file exists.

`softwareApplicationSchema` uses `@type: "SoftwareApplication"`, the visible product name/description, `applicationCategory: "DeveloperApplication"`, `operatingSystem: "Windows, macOS"`, `isAccessibleForFree: true`, and the GitHub repository as `url`; it omits ratings, offers, versions, and fake downloads. `faqSchema` maps the visible FAQ exactly. `breadcrumbSchema` maps Home and the current guide exactly.

`sitemap()` maps all ten `ROUTES × locales` to absolute canonical URLs and language alternates. `robots()` allows `/`, includes the absolute sitemap, and uses the canonical host. `manifest()` defines the product name, short name, `/`, `standalone`, background `#09090b`, theme `#111116`, and generated `/icon` PNG sizes.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- tests/seo.test.ts && npm run typecheck`

Expected: SEO tests pass.

Commit: `feat: add crawlable SEO metadata`

---

### Task 4: Shared shell, language-correct layouts, and analytics

**Files:**
- Create: `tests/navigation.test.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/(en)/layout.tsx`
- Create: `src/app/(zh)/zh/layout.tsx`
- Create: `src/components/site/site-layout.tsx`
- Create: `src/components/site/header.tsx`
- Create: `src/components/site/footer.tsx`
- Create: `src/components/site/analytics.tsx`
- Create: `src/components/site/locale-switcher.tsx`

**Interfaces:**
- Consumes: locale content and route helpers.
- Produces: `SiteLayout({ locale, children })`, accessible global navigation, locale switcher, footer privacy disclosure, conditional analytics.

- [ ] **Step 1: Write failing navigation tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/header";

describe("Header", () => {
  it("exposes navigation and locale alternative", async () => {
    const user = userEvent.setup();
    render(<Header locale="en" routeKey="home" />);
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute("href", expect.stringContaining("github.com/swg209"));
    expect(screen.getByRole("link", { name: /中文/ })).toHaveAttribute("href", "/zh");
    await user.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/navigation.test.tsx`

Expected: FAIL because the Header component does not exist.

- [ ] **Step 3: Implement layouts and shell**

The English root layout emits `<html lang="en">`; Chinese emits `<html lang="zh-CN">`. Both import `globals.css`, export locale-appropriate root metadata, and render `SiteLayout`. `SiteLayout` includes a skip link, Header, `<main id="main-content">`, Footer, GA, and Vercel Analytics.

The mobile menu is a client component with `aria-expanded`, closes on Escape and after navigation, and has no focus-obscuring overlay. The locale switch uses `routePath` for the matching route. The footer includes `id="privacy"`, repository, guides, issue, MIT license, and the required independent-project disclaimer.

`Analytics` renders Google `gtag.js` only when `NEXT_PUBLIC_GA_ID` is present and always includes `@vercel/analytics/next`'s `<Analytics />`. Use Next Script with `afterInteractive`; never interpolate unvalidated HTML outside the fixed gtag snippet.

Global CSS defines the restrained charcoal/violet system, responsive containers, focus rings, reduced-motion behavior, 44px controls, sticky-header scroll margin, and no large gradients.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- tests/navigation.test.tsx && npm run typecheck && npm run lint`

Expected: navigation test passes, TypeScript and ESLint exit 0.

Commit: `feat: add bilingual accessible site shell`

---

### Task 5: Home pages, gallery lightbox, and FAQ schemas

**Files:**
- Create: `tests/gallery.test.tsx`
- Create: `src/components/home/home-page.tsx`
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/theme-gallery.tsx`
- Create: `src/components/home/features.tsx`
- Create: `src/components/home/how-it-works.tsx`
- Create: `src/components/home/safety.tsx`
- Create: `src/components/home/faq.tsx`
- Create: `src/components/home/final-cta.tsx`
- Create: `src/app/(en)/page.tsx`
- Create: `src/app/(zh)/zh/page.tsx`
- Create: `public/themes/skin-01.jpg` through `public/themes/skin-08.jpg`
- Create: `public/themes/README.md`

**Interfaces:**
- Consumes: `HomeContent`, JSON-LD schemas, route helpers, local images.
- Produces: `HomePage({ locale })` and keyboard-accessible `ThemeGallery`.

- [ ] **Step 1: Copy repository assets with provenance**

Copy exactly the eight files from `work/Codex-Dream-Skin-swg209/docs/images/gallery/` to `public/themes/`. Add `public/themes/README.md` identifying the source commit, source paths, and that gallery composites may contain third-party artwork and are demonstration-only.

- [ ] **Step 2: Write the failing lightbox test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeGallery } from "@/components/home/theme-gallery";
import { contentByLocale } from "@/content";

describe("ThemeGallery", () => {
  it("opens, navigates, and closes from the keyboard", async () => {
    const user = userEvent.setup();
    render(<ThemeGallery locale="en" items={contentByLocale.en.home.gallery} />);
    await user.click(screen.getByRole("button", { name: /Rose Workspace/i }));
    expect(screen.getByRole("dialog")).toBeVisible();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("dialog")).toHaveAccessibleName(/Golden Workday/i);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test and confirm RED**

Run: `npm test -- tests/gallery.test.tsx`

Expected: FAIL because ThemeGallery does not exist.

- [ ] **Step 4: Implement the complete home templates**

The hero uses `skin-03.jpg`, `priority`, `sizes`, the exact supplied English/Chinese H1 and descriptions, guide CTAs, and four proof labels. The gallery renders all eight images as lazy Next Images in a two-column desktop/one-column mobile grid. Its dialog traps focus, labels itself with the current item, closes on Escape/backdrop/close, supports ArrowLeft/ArrowRight, restores trigger focus, and locks page scroll only while open.

Render the six typed features, three steps, repository-provided visual proof, six safety bullets, ten FAQ items, final CTA, and visible rights disclaimer. Mount `SoftwareApplication` and `FAQPage` JSON-LD beside the visible content. Do not render a fake “before” screenshot.

Both route pages export `buildMetadata(locale, "home")` and render `HomePage`.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test -- tests/gallery.test.tsx tests/content.test.ts tests/seo.test.ts && npm run typecheck && npm run lint`

Expected: all selected tests and static checks pass.

Commit: `feat: build bilingual theme landing pages`

---

### Task 6: Eight guide routes and resilient command copy

**Files:**
- Create: `tests/command-block.test.tsx`
- Create: `src/components/guides/guide-page.tsx`
- Create: `src/components/guides/command-block.tsx`
- Create: `src/components/guides/guide-section.tsx`
- Create: `src/components/site/breadcrumbs.tsx`
- Create: `src/app/(en)/install/windows/page.tsx`
- Create: `src/app/(en)/install/macos/page.tsx`
- Create: `src/app/(en)/guide/customize/page.tsx`
- Create: `src/app/(en)/guide/restore/page.tsx`
- Create: `src/app/(zh)/zh/install/windows/page.tsx`
- Create: `src/app/(zh)/zh/install/macos/page.tsx`
- Create: `src/app/(zh)/zh/guide/customize/page.tsx`
- Create: `src/app/(zh)/zh/guide/restore/page.tsx`

**Interfaces:**
- Consumes: `GuideContent`, `buildMetadata`, `breadcrumbSchema`, route helpers.
- Produces: shared `GuidePage`, accessible `CommandBlock`, eight static guide routes.

- [ ] **Step 1: Write failing copy behavior tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommandBlock } from "@/components/guides/command-block";

describe("CommandBlock", () => {
  it("copies a real command and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const user = userEvent.setup();
    render(<CommandBlock code="npm run build" copyLabel="Copy" copiedLabel="Copied" />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("npm run build");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  it("keeps selectable text when clipboard is unavailable", async () => {
    Object.assign(navigator, { clipboard: undefined });
    render(<CommandBlock code="npm run build" copyLabel="Copy" copiedLabel="Copied" />);
    expect(screen.getByText("npm run build")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/command-block.test.tsx`

Expected: FAIL because CommandBlock does not exist.

- [ ] **Step 3: Implement guide templates and route wrappers**

`GuidePage` renders one H1, summary, visible breadcrumb navigation, table of contents, typed sections, code blocks, platform callouts, related-guide links, GitHub source/Issue actions, and `BreadcrumbList` JSON-LD. `CommandBlock` catches clipboard failure, keeps the `<code>` selectable, announces success/failure politely, and resets its label after two seconds.

Each of the eight route wrappers exports its exact `buildMetadata(locale, key)` result and calls `GuidePage` with the matching content. No route fetches data at runtime. Confirm every local related link is generated by `routePath`.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- tests/command-block.test.tsx tests/content.test.ts tests/routes.test.ts && npm run typecheck && npm run lint`

Expected: guide tests and checks pass.

Commit: `feat: add bilingual installation guides`

---

### Task 7: Favicon, OG card, global 404, redirect, and deployment guide

**Files:**
- Create: `tests/config.test.ts`
- Create: `src/app/icon.tsx`
- Create: `src/app/global-not-found.tsx`
- Create: `public/og.png`
- Create: `.env.example`
- Create: `vercel.json`
- Create: `README.md`
- Create: `docs/deployment.md`

**Interfaces:**
- Consumes: approved domain, site palette, verified safe abstract asset, Vercel target.
- Produces: favicon endpoint, verified OG image, custom 404, canonical-host redirect, configuration and deployment documentation.

- [ ] **Step 1: Write failing config tests**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("deployment configuration", () => {
  it("permanently redirects www to the canonical host", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8"));
    expect(config.redirects).toContainEqual(expect.objectContaining({
      source: "/:path*",
      destination: "https://codexskin.site/:path*",
      permanent: true
    }));
  });

  it("documents indexing environment variables", () => {
    const env = readFileSync(".env.example", "utf8");
    expect(env).toContain("NEXT_PUBLIC_SITE_URL=https://codexskin.site");
    expect(env).toContain("NEXT_PUBLIC_GSC_VERIFICATION=");
    expect(env).toContain("NEXT_PUBLIC_GA_ID=");
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/config.test.ts`

Expected: FAIL because `vercel.json` and `.env.example` do not exist.

- [ ] **Step 3: Implement config, icon, 404, and docs**

Generate the icon with Next `ImageResponse`: 64×64 near-black rounded square, violet border, and white “DS” letters. `global-not-found.tsx` imports global CSS, returns a complete English HTML document, one “404” H1, and links to English home, Chinese home, Windows guide, and macOS guide; Next supplies `noindex` for the 404.

Create `.env.example` with the three specified keys. `vercel.json` uses a host condition so only `www.codexskin.site` redirects:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.codexskin.site" }],
      "destination": "https://codexskin.site/:path*",
      "permanent": true
    }
  ]
}
```

`README.md` documents local install/dev/test/build and the ten routes. `docs/deployment.md` documents GitHub import to Vercel, Node 20.9+ requirement, environment variables, primary/redirect domains, provider-generated DNS values, production verification, Vercel Analytics enablement, Search Console verification, and submitting `https://codexskin.site/sitemap.xml`.

- [ ] **Step 4: Generate and validate exactly one social card**

Use the image generation workflow once with the finished brand brief: 1200×630, dark restrained tech layout, “Codex Dream Skin”, “Custom Themes for Codex Desktop”, Windows + macOS, muted violet accent, and the safe abstract visual language of `macos/assets/portal-hero.png`. Inspect it for exact text and absence of invented logos/claims; save the accepted raster as `public/og.png`. If it is unusable, retry only once; otherwise omit image metadata.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test -- tests/config.test.ts && npm run typecheck && npm run lint`

Expected: config test and checks pass.

Commit: `feat: add social metadata and deployment config`

---

### Task 8: Production build and full crawl/browser verification

**Files:**
- Create: `scripts/verify-site.mjs`
- Create: `tests/verify-script.test.ts`
- Modify: `package.json`
- Modify: `docs/deployment.md` only if verification discovers a missing production step.

**Interfaces:**
- Consumes: a running local production server and ten-route contract.
- Produces: repeatable `npm run verify:site` crawl check and recorded final verification evidence.

- [ ] **Step 1: Write the failing verification-script test**

The test imports `PUBLIC_PATHS` and `inspectHtml` from `scripts/verify-site.mjs`, asserts exactly ten routes, and feeds sample HTML to confirm `inspectHtml` rejects missing canonical, missing hreflang, `noindex`, and H1 counts other than one.

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm test -- tests/verify-script.test.ts`

Expected: FAIL because the verification module does not exist.

- [ ] **Step 3: Implement the verification crawler**

`scripts/verify-site.mjs` requests every canonical route plus `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, and an unknown route. For public pages it requires HTTP 200, one H1, canonical URL equal to the expected non-`www` URL, reciprocal hreflang, no `noindex`, and no localhost/Vercel-preview metadata. It requires the unknown route to return 404 and `noindex`, sitemap to list all ten URLs, and robots to reference the canonical sitemap. Add `"verify:site": "node scripts/verify-site.mjs"`.

- [ ] **Step 4: Verify GREEN, then run all automated gates**

Run: `npm test && npm run lint && npm run typecheck && npm run build`

Expected: all tests pass, lint/typecheck exit 0, and Next reports ten static content pages plus metadata endpoints without build errors.

- [ ] **Step 5: Run the production-equivalent crawl**

Run `npm run start` in a retained session, then run `SITE_ORIGIN=http://localhost:3000 npm run verify:site` while preserving expected production canonicals.

Expected: ten routes, sitemap, robots, manifest, and 404 checks pass.

- [ ] **Step 6: Perform desktop and mobile browser verification**

At 1440×900 and 390×844, verify: English and Chinese home, both install guides, locale switches, sticky/mobile navigation, all eight gallery cards, lightbox keyboard close/navigation, code copy, internal links, footer privacy anchor, responsive images, no horizontal overflow, no console errors, and custom 404. Record any issue as a failing regression test before fixing it.

- [ ] **Step 7: Re-run final gates and commit**

Run: `npm test && npm run lint && npm run typecheck && npm run build`

Expected: all commands exit 0 after browser fixes.

Commit: `test: verify production SEO site`

---

## Plan self-review result

- Spec coverage: all ten routes, bilingual content, gallery, platform-safe claims, interactions, metadata, JSON-LD, sitemap, robots, manifest, favicon, 404, analytics, Vercel redirect, deployment, Search Console, and desktop/mobile verification map to a task.
- Placeholder scan: no implementation placeholder or undefined “similar to” step remains.
- Type consistency: `Locale`, `RouteKey`, `routePath`, `contentByLocale`, `buildMetadata`, `HomePage`, and `GuidePage` names are stable across producer/consumer tasks.
- Scope: all work is a single static marketing/content site; no independent subsystem requires a separate plan.
