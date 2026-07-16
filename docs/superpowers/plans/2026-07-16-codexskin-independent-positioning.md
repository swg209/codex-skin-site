# CodexSkin Independent Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition CodexSkin as an independent community guide and add a bilingual platform-first installation path without distributing third-party installers.

**Architecture:** Keep the static App Router and typed locale-content model. Add one central site/upstream configuration module, two presentational home components, and shared guide disclosure UI; replace software-product schema with website schema while preserving all existing canonical routes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind/CSS, Vitest, Testing Library.

## Global Constraints

- Original upstream is exactly `https://github.com/Fei-Away/Codex-Dream-Skin`.
- Do not host, modify, repackage, proxy, or automatically download the upstream installer.
- Do not create a fake Release URL or a new themes/generator route.
- Keep all ten existing bilingual routes, canonicals, hreflang entries, sitemap entries, and robots behavior.
- Every external link must use `target="_blank"` and `rel="noopener noreferrer"`.
- Preserve unrelated user changes.

---

### Task 1: Centralize brand/upstream configuration and correct SEO identity

**Files:**
- Create: `src/config/site.ts`
- Modify: `src/lib/site.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/components/home/home-page.tsx`
- Modify: `src/app/(en)/layout.tsx`
- Modify: `src/app/(zh)/zh/layout.tsx`
- Modify: `src/app/manifest.ts`
- Test: `tests/config.test.ts`
- Test: `tests/seo.test.ts`

**Interfaces:**
- Produces: `siteConfig`, `upstreamSourceUrl(platform)`, and `websiteSchema(locale)`.
- Preserves: `SITE_URL`, route helpers, FAQ schema, breadcrumb schema, sitemap, and robots interfaces.

- [ ] Add failing assertions that the verified upstream repository is Fei-Away, metadata site name is CodexSkin, home JSON-LD is `WebSite`, and no exported schema produces `SoftwareApplication`.
- [ ] Run `npm test -- tests/config.test.ts tests/seo.test.ts` and confirm failures reference the old swg209 URL, old site identity, and software schema.
- [ ] Add `siteConfig` with canonical, website-repository, upstream repository/platform/issues/license URLs; make legacy constants delegate to it.
- [ ] Replace `softwareApplicationSchema` with `websiteSchema`, update layout/manifest identity, and mount only `WebSite` plus visible FAQ on home pages.
- [ ] Re-run the focused tests and confirm they pass.

### Task 2: Add bilingual Quick Start and original-content expansion sections

**Files:**
- Create: `src/components/home/quick-start.tsx`
- Create: `src/components/home/create-your-look.tsx`
- Modify: `src/components/home/home-page.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/app/globals.css`
- Test: `tests/content.test.ts`
- Test: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: `siteConfig.upstream.macosUrl`, `siteConfig.upstream.windowsUrl`, and locale route helpers.
- Produces: `HomeContent.quickStart` and `HomeContent.createLook` typed content blocks.

- [ ] Add failing content tests for the supplied English/Chinese metadata, independent hero positioning, two platform cards, gallery-anchor CTA, and `Coming Soon` generator state.
- [ ] Add a failing home render test that expects Quick Start after the gallery, guide links, verified upstream links, and safe external-link attributes.
- [ ] Run the focused tests and confirm they fail because the new content/components are absent.
- [ ] Add typed bilingual copy, render the two sections in the required order, and add responsive two-column/single-column styling with existing focus conventions.
- [ ] Re-run the focused tests and confirm they pass.

### Task 3: Correct guide/footer/header links and add source/safety disclosures

**Files:**
- Modify: `src/components/guides/guide-page.tsx`
- Modify: `src/components/site/header.tsx`
- Modify: `src/components/site/footer.tsx`
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/home/final-cta.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `README.md`
- Test: `tests/navigation.test.tsx`
- Test: `tests/guide-page.test.tsx`

**Interfaces:**
- Consumes: centralized upstream URLs and localized guide disclosure/safety copy.
- Produces: safe, attributed external links and visible third-party source notices on all guide routes.

- [ ] Add failing tests for CodexSkin branding, Fei-Away links, `noopener noreferrer`, guide source disclosure, and the source-review safety warning.
- [ ] Run the focused tests and confirm failures show the old branding/links and missing notices.
- [ ] Update shared components and localized guide content; keep current verified commands while framing them as upstream instructions.
- [ ] Update README to describe the independent site, original upstream source, and no-installer-hosting policy.
- [ ] Re-run the focused tests and confirm they pass.

### Task 4: Full verification and visual/link audit

**Files:**
- Modify only if a verification failure reveals an in-scope defect.

**Interfaces:**
- Produces: a release-ready static build with the unchanged ten-route public contract.

- [ ] Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`; resolve only in-scope failures.
- [ ] Start `npm run start` and run `npm run verify:site` against the local server.
- [ ] Inspect `/`, `/zh`, both English/Chinese Windows pages, and both English/Chinese macOS pages at 390px and 1440px.
- [ ] Confirm no console errors, horizontal overflow, broken internal links, 404 targets, unsafe external-link attributes, or incorrect upstream targets.
- [ ] Request `/sitemap.xml` and `/robots.txt` and confirm successful, canonical production output.
- [ ] Review `git diff` and `git status` to ensure no unrelated files changed.
