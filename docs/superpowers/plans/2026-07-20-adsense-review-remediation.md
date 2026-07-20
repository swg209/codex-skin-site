# AdSense Review Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put CodexSkin.site into an AdSense review-safe state, deepen the existing original guides, add a bounded collection of first-party content, and allow future ads only on explicitly eligible editorial pages.

**Architecture:** Keep operational configuration in `siteConfig`, localized editorial data in focused content modules, and route decisions in a single route registry. Introduce a reusable long-form article renderer, a separate original-theme data model with rights metadata, and a pure ad-eligibility policy that is independent from presentation. Review mode suppresses manual inventory while preserving the selected ownership-verification path.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Vitest, Testing Library, static metadata/sitemap generation, Vercel.

## Global Constraints

- Work only in the existing `develop` worktree and preserve unrelated changes.
- Do not modify, mirror, host, or repackage third-party tool code or installers.
- Do not invent upstream behavior, tested versions, licenses, screenshots, or ownership claims.
- Use `weigensu@gmail.com` as the confirmed public contact address.
- Keep `ads.txt` publisher ID `pub-5491343418531814` unchanged.
- Keep Auto ads off during remediation; this dashboard action is verified separately by the owner.
- Do not claim that Google requires 40 URLs or a fixed word count.
- Trust, policy, Contact, error, empty-state, and navigation-only pages are never ad inventory.
- Current `skin-01.jpg` through `skin-08.jpg` composites are not CodexSkin originals and must leave the primary gallery.
- Preserve reciprocal English/Chinese canonical and hreflang behavior.
- Use original wording and first-party evidence; translations must be complete, not title swaps.

---

### Task 1: Review mode, confirmed contact, complete privacy disclosures, and safe terminology

**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/components/site/adsense-script.tsx`
- Modify: `src/components/info/info-page.tsx`
- Modify: `src/content/info.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/content/types.ts`
- Modify: `src/components/site/footer.tsx`
- Test: `tests/adsense.test.tsx`
- Test: `tests/config.test.ts`
- Test: `tests/content.test.ts`
- Test: `tests/navigation.test.tsx`

**Interfaces:**
- Produces: `siteConfig.adsense.reviewMode: boolean`, `siteConfig.contactEmail: "weigensu@gmail.com"`, linked paragraphs in info content, and safe public terminology.
- Consumes: existing publisher ID, site repository URL, upstream repository URL, and localized info renderer.

- [ ] **Step 1: Write failing configuration and content tests**

Add assertions equivalent to:

```ts
expect(siteConfig.contactEmail).toBe("weigensu@gmail.com");
expect(siteConfig.adsense.reviewMode).toBe(true);
expect(JSON.stringify(contentByLocale)).not.toMatch(/Coming Soon|即将上线/);
expect(JSON.stringify(contentByLocale)).not.toMatch(/Local CDP Injection|本机 CDP 注入|stop the injector|停止注入器/);
expect(JSON.stringify(contentByLocale.en.info.contact)).toContain("weigensu@gmail.com");
expect(JSON.stringify(contentByLocale.zh.info.contact)).toContain("weigensu@gmail.com");
```

Privacy tests require both locales to contain Google, third-party vendors, cookies, IP addresses, identifiers, personalized advertising, Google Ads Settings, partner-site data use, EEA/UK/Switzerland consent, and the contact email.

- [ ] **Step 2: Run targeted tests and confirm failure**

Run: `npm test -- tests/config.test.ts tests/content.test.ts tests/adsense.test.tsx tests/navigation.test.tsx`

Expected: failures for null contact email, missing review mode, incomplete privacy disclosures, and old terminology.

- [ ] **Step 3: Implement operational configuration and linked info paragraphs**

Extend configuration:

```ts
contactEmail: "weigensu@gmail.com",
adsense: {
  publisherId: "ca-pub-5491343418531814",
  reviewMode: true,
},
```

Extend `InfoSection` so paragraphs can be either strings or typed rich paragraphs with safe external links. Render `mailto:weigensu@gmail.com`, Google partner-sites information, Ads Settings, and AdSense cookie documentation without `dangerouslySetInnerHTML`.

- [ ] **Step 4: Replace Contact and Privacy copy in both locales**

Contact has three completed sections: direct email contact, public site corrections through the site repository, and third-party project support through the upstream issue tracker. Remove future-contact and placeholder language.

Privacy has ten sections exactly matching the approved design: scope/contact, submitted data, hosting/security logs, Vercel Analytics, conditional Google Analytics, AdSense technologies, personalized/non-personalized ads, regional consent, controls, and retention/external links/children/updates.

- [ ] **Step 5: Replace policy-sensitive routine terminology**

Use these exact public labels:

```ts
"Local Runtime Styling"
"本机运行时样式层"
"theme helper"
"主题辅助进程"
"apply visual CSS at runtime"
"在运行时应用视觉 CSS"
```

Keep one technically transparent CDP paragraph per locale and state that CodexSkin provides no bypass for access controls, licensing, signatures, or security protections.

- [ ] **Step 6: Run targeted tests**

Run: `npm test -- tests/config.test.ts tests/content.test.ts tests/adsense.test.tsx tests/navigation.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/config/site.ts src/components/site/adsense-script.tsx src/components/info/info-page.tsx src/components/site/footer.tsx src/content/info.ts src/content/en.ts src/content/zh.ts src/content/types.ts tests/adsense.test.tsx tests/config.test.ts tests/content.test.ts tests/navigation.test.tsx
git commit -m "feat: add AdSense review-safe trust controls"
```

### Task 2: Remove construction UI and uncertain-rights primary gallery

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/components/home/create-your-look.tsx`
- Modify: `src/components/home/home-page.tsx`
- Modify: `src/components/home/theme-gallery.tsx`
- Modify: `public/themes/README.md`
- Test: `tests/home-page.test.tsx`
- Test: `tests/gallery.test.tsx`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: completed customization CTA and no primary rendering of uncertain-rights composites.
- Consumes: existing `/guide/customize` locale routes.

- [ ] **Step 1: Write failing home and gallery tests**

Tests require the completed CTA labels `Read the Background Composition Guide` / `阅读背景图构图指南`, links to the localized customize route, no disabled button, and no `Coming Soon` / `即将上线`. Tests also require that the home gallery does not render `/themes/skin-01.jpg` through `/themes/skin-08.jpg` as primary theme cards.

- [ ] **Step 2: Run targeted tests and confirm failure**

Run: `npm test -- tests/home-page.test.tsx tests/gallery.test.tsx tests/content.test.ts`

Expected: FAIL on construction label, disabled CTA, and eight current primary gallery items.

- [ ] **Step 3: Implement the completed CTA**

Replace `CreateLookContent` with:

```ts
export interface CreateLookContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
}
```

Render locale-aware `Link` elements to `customize` and `dreamSkin` instead of a disabled button.

- [ ] **Step 4: Remove the uncertain-rights composites from primary presentation**

Do not delete provenance. Retain `public/themes/README.md`, explicitly mark the files archived demonstration references, and stop rendering them on the home page. Replace the gallery section with a first-party editorial preview populated by Task 6 theme data; until Task 6 lands, render a completed composition-guide section rather than an empty gallery.

- [ ] **Step 5: Run targeted tests**

Run: `npm test -- tests/home-page.test.tsx tests/gallery.test.tsx tests/content.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/types.ts src/content/en.ts src/content/zh.ts src/components/home/create-your-look.tsx src/components/home/home-page.tsx src/components/home/theme-gallery.tsx public/themes/README.md tests/home-page.test.tsx tests/gallery.test.tsx tests/content.test.ts
git commit -m "feat: remove construction and artwork provenance risks"
```

### Task 3: Expand the four bilingual core guides

**Files:**
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/content/types.ts`
- Modify: `src/components/guides/guide-section.tsx`
- Create: `src/lib/content-metrics.ts`
- Test: `tests/guide-page.test.tsx`
- Create: `tests/content-metrics.test.ts`

**Interfaces:**
- Produces: `articleWordCount(text: string): number`, `articleHanCharacterCount(text: string): number`, expanded guide sections, and tested-environment/caption block support.
- Consumes: existing `GuideContent`, `GuideSection`, command blocks, and prompt blocks.

- [ ] **Step 1: Write failing metric and depth tests**

Add pure metric tests and guide expectations:

```ts
expect(articleWordCount("One tested guide with clear steps.")).toBe(6);
expect(articleHanCharacterCount("这是完整中文说明。ABC")).toBe(8);
expect(serializedEnglishGuide("windows").wordCount).toBeGreaterThanOrEqual(900);
expect(serializedEnglishGuide("macos").wordCount).toBeGreaterThanOrEqual(900);
expect(serializedEnglishGuide("customize").wordCount).toBeGreaterThanOrEqual(900);
expect(serializedEnglishGuide("restore").wordCount).toBeGreaterThanOrEqual(800);
```

Every guide must expose tested context, prerequisites, verification, troubleshooting, restore or escalation guidance, and source boundaries.

- [ ] **Step 2: Run tests and confirm depth failures**

Run: `npm test -- tests/content-metrics.test.ts tests/guide-page.test.tsx tests/content.test.ts`

Expected: FAIL because the metrics module is absent and current guides are below target.

- [ ] **Step 3: Implement metrics and evidence block types**

Add typed blocks for `evidence` and `callout` with localized label, environment, reviewed date, and source/first-party distinction. Render semantic `<aside>` and `<figure>` structures without inventing screenshot files.

- [ ] **Step 4: Expand Windows and macOS content**

Windows sections: scope, tested context, prerequisites, source verification, installation, launch, expected behavior, background selection, verification, Store updates, common errors, restore, escalation evidence.

macOS sections: scope, tested context, Apple Silicon/Intel distinction, official app/source checks, permissions/Gatekeeper explanation, installation, launch, background selection, verification, updates, common errors, restore, escalation evidence.

- [ ] **Step 5: Expand customization and restore content**

Customization preserves all tested 20:9, 70–82%, 35–50%, 45%, 55%, and 16:9 guidance and adds crop testing, contrast, home/task comparison, one-image limitations, future two-image design, prompt review, and image rights.

Restore adds preparation, Windows and macOS flows, clean-state verification, residual files, repeated symptoms, and issue evidence.

- [ ] **Step 6: Complete Chinese localization**

Chinese sections mirror the factual scope but use natural Chinese explanations. They retain exact command/script names and numeric recommendations.

- [ ] **Step 7: Run guide tests**

Run: `npm test -- tests/content-metrics.test.ts tests/guide-page.test.tsx tests/content.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/content/en.ts src/content/zh.ts src/content/types.ts src/components/guides/guide-section.tsx src/lib/content-metrics.ts tests/content-metrics.test.ts tests/guide-page.test.tsx tests/content.test.ts
git commit -m "feat: deepen bilingual installation and recovery guides"
```

### Task 4: Add a reusable long-form editorial content model

**Files:**
- Create: `src/content/articles/types.ts`
- Create: `src/content/articles/en.ts`
- Create: `src/content/articles/zh.ts`
- Create: `src/content/articles/index.ts`
- Create: `src/components/articles/article-page.tsx`
- Create: `src/components/articles/article-card.tsx`
- Modify: `src/lib/seo.ts`
- Modify: `src/app/globals.css`
- Create: `tests/article-content.test.ts`
- Create: `tests/article-page.test.tsx`

**Interfaces:**
- Produces: `ArticleKey`, `ArticleContent`, `articleByLocale`, `ArticlePage`, and article metadata/schema builders.
- Consumes: existing `Locale`, `JsonLd`, Breadcrumbs visual patterns, and absolute URL helpers.

- [ ] **Step 1: Write failing article model and renderer tests**

The model requires key, route, category, SEO, eyebrow, H1, summary, reviewed date, author label, sections, related keys, and optional evidence list. Renderer tests require one H1, at least four H2 sections, reviewed date, author/editorial label, related internal links, WebPage/Article JSON-LD, and no ad slot in review mode.

- [ ] **Step 2: Run tests and confirm module-not-found failures**

Run: `npm test -- tests/article-content.test.ts tests/article-page.test.tsx`

Expected: FAIL because article modules do not exist.

- [ ] **Step 3: Implement the focused model**

Use discriminated blocks for paragraphs, lists, ordered steps, definition rows, callouts, and internal links. Keep commands in existing guide pages; long-form articles are editorial, not a second installer documentation system.

- [ ] **Step 4: Implement the renderer and SEO schema**

Render semantic article, breadcrumb, table of contents, section anchors, evidence notes, and related cards. Use existing design tokens and responsive containers.

- [ ] **Step 5: Run article tests**

Run: `npm test -- tests/article-content.test.ts tests/article-page.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/articles src/components/articles src/lib/seo.ts src/app/globals.css tests/article-content.test.ts tests/article-page.test.tsx
git commit -m "feat: add long-form editorial article system"
```

### Task 5: Publish eight bilingual original guide, troubleshooting, and compatibility topics

**Files:**
- Modify: `src/content/articles/en.ts`
- Modify: `src/content/articles/zh.ts`
- Create: `src/app/(en)/guides/background-image-composition/page.tsx`
- Create: `src/app/(en)/guides/readability-and-contrast/page.tsx`
- Create: `src/app/(en)/guides/image-rights-and-licensing/page.tsx`
- Create: `src/app/(en)/troubleshooting/theme-not-visible/page.tsx`
- Create: `src/app/(en)/troubleshooting/cdp-port-conflict/page.tsx`
- Create: `src/app/(en)/troubleshooting/macos-permissions/page.tsx`
- Create: `src/app/(en)/troubleshooting/restore-default-appearance/page.tsx`
- Create: `src/app/(en)/compatibility/codex-dream-skin/page.tsx`
- Create matching routes under: `src/app/(zh)/zh/`
- Test: `tests/article-content.test.ts`
- Modify: `tests/routes.test.ts`

**Interfaces:**
- Produces: eight `ArticleKey` topics and sixteen localized static routes.
- Consumes: `ArticlePage`, metadata builder, approved composition data, and verified upstream facts.

- [ ] **Step 1: Add failing route and content completeness tests**

Tests require all sixteen paths, reciprocal alternates, 800–1,500 English words per article, substantial Chinese counterparts, four or more unique sections, and no duplicated H1/summary pairs.

- [ ] **Step 2: Run tests and confirm failures**

Run: `npm test -- tests/article-content.test.ts tests/routes.test.ts`

Expected: FAIL for missing content and routes.

- [ ] **Step 3: Write the three original guidance topics**

Composition covers 20:9 safe areas and prompt practice. Readability covers luminance, contrast, negative space, task composer obstruction, and a repeatable visual check. Rights covers source records, AI-generated output review, trademarks, portraits, redistribution, and a publish/no-publish checklist without presenting legal advice.

- [ ] **Step 4: Write four troubleshooting topics**

Each begins with observable symptoms, separates likely causes, gives reversible checks, defines success, and states what evidence belongs in an upstream issue. No topic recommends bypassing security or altering the signed official installation.

- [ ] **Step 5: Write the compatibility topic**

Separate confirmed repository facts, CodexSkin-tested observations, and unverified/unknown states. Include Windows/macOS distinctions, review date, update caveats, and links to original sources.

- [ ] **Step 6: Add all localized route files**

Each route exports metadata and renders `ArticlePage` with one exact key. No route contains duplicated prose.

- [ ] **Step 7: Run route and article tests**

Run: `npm test -- tests/article-content.test.ts tests/article-page.test.tsx tests/routes.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/content/articles src/app/\(en\)/guides src/app/\(en\)/troubleshooting src/app/\(en\)/compatibility src/app/\(zh\)/zh/guides src/app/\(zh\)/zh/troubleshooting src/app/\(zh\)/zh/compatibility tests/article-content.test.ts tests/article-page.test.tsx tests/routes.test.ts
git commit -m "feat: publish original Codex customization knowledge base"
```

### Task 6: Create original theme assets and publish the bilingual theme catalog

**Files:**
- Create: `src/content/themes/types.ts`
- Create: `src/content/themes/index.ts`
- Create: `src/components/themes/theme-index-page.tsx`
- Create: `src/components/themes/theme-detail-page.tsx`
- Create: `src/app/(en)/themes/page.tsx`
- Create: `src/app/(en)/themes/[slug]/page.tsx`
- Create: `src/app/(zh)/zh/themes/page.tsx`
- Create: `src/app/(zh)/zh/themes/[slug]/page.tsx`
- Create: `public/original-themes/LICENSE.md`
- Create: four owned image assets under `public/original-themes/`
- Modify: `src/components/home/theme-gallery.tsx`
- Modify: `src/components/home/home-page.tsx`
- Test: `tests/theme-catalog.test.tsx`
- Test: `tests/routes.test.ts`

**Interfaces:**
- Produces: `ThemeSlug`, four complete rights records, theme catalog/detail renderers, ten localized theme URLs, and first-party home gallery items.
- Consumes: AI-generated or otherwise owned original assets created specifically for CodexSkin, existing image rendering, and site identity copy.

- [ ] **Step 1: Write failing rights-record and catalog tests**

Each theme requires slug, localized name/description/design notes, creator, creation date, source method, license ID/link, commercial-use flag, redistribution flag, trademark/character/portrait flags, home/task composition notes, image path, and alt text. Tests reject `/themes/skin-0` sources and incomplete rights metadata.

- [ ] **Step 2: Run tests and confirm failures**

Run: `npm test -- tests/theme-catalog.test.tsx tests/routes.test.ts`

Expected: FAIL because the catalog and owned assets do not exist.

- [ ] **Step 3: Generate or create four original abstract wallpapers**

Use four distinct prompts derived from the approved 20:9 composition guidance. Assets contain no people, logos, text, branded characters, copied project artwork, or UI chrome. Required directions are dark aurora, warm graphite, quiet ocean, and violet glass. Save optimized JPG or WebP files with descriptive slugs.

- [ ] **Step 4: Add the public asset license and rights records**

`LICENSE.md` covers only CodexSkin-created files, explicitly excludes OpenAI/Codex, third-party tools, and archived demonstration composites, and states the selected reuse terms. Each theme record matches the generated asset and contains no unverified claim.

- [ ] **Step 5: Implement catalog and detail routes**

The index explains originality and licensing. Each detail page contains 800–1,200 English words and a complete Chinese counterpart covering design intent, palette, composition, readability, home/task usage, generation/source record, license, and application links.

- [ ] **Step 6: Restore a first-party home gallery**

Render only the four owned theme records on the home page. Link cards to localized detail pages instead of using a demonstration lightbox as the primary action.

- [ ] **Step 7: Run theme and route tests**

Run: `npm test -- tests/theme-catalog.test.tsx tests/home-page.test.tsx tests/gallery.test.tsx tests/routes.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/content/themes src/components/themes src/app/\(en\)/themes src/app/\(zh\)/zh/themes public/original-themes src/components/home/theme-gallery.tsx src/components/home/home-page.tsx tests/theme-catalog.test.tsx tests/home-page.test.tsx tests/gallery.test.tsx tests/routes.test.ts
git commit -m "feat: publish original licensed Codex theme collection"
```

### Task 7: Centralize all dynamic routes, sitemap entries, metadata, and internal discovery

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/site/header.tsx`
- Modify: `src/components/site/footer.tsx`
- Modify: `src/components/home/home-page.tsx`
- Modify: `scripts/verify-site.mjs`
- Modify: `tests/routes.test.ts`
- Modify: `tests/seo.test.ts`
- Modify: `tests/navigation.test.tsx`
- Modify: `tests/verify-script.test.ts`

**Interfaces:**
- Produces: localized paths and alternates for fixed articles and theme slugs, complete sitemap entries, discovery navigation, and production route verification.
- Consumes: article keys, theme slugs, current route helpers, and metadata builders.

- [ ] **Step 1: Write failing route, sitemap, navigation, and verifier tests**

Expected production inventory after Tasks 5 and 6 is 48 localized URLs: 22 current URLs, 16 long-form knowledge-base URLs, and 10 theme URLs. Tests require uniqueness, reciprocal alternates, sitemap inclusion, and internal discovery from home, header/footer, catalog, or related-content sections.

- [ ] **Step 2: Run tests and confirm failures**

Run: `npm test -- tests/routes.test.ts tests/seo.test.ts tests/navigation.test.tsx tests/verify-script.test.ts`

Expected: FAIL on new route count and discovery.

- [ ] **Step 3: Extend route helpers without losing type safety**

Keep fixed route keys for existing pages. Add focused helpers for article keys and theme slugs rather than forcing parameterized pages into the old `Record<RouteKey, string>` contract.

- [ ] **Step 4: Extend sitemap and metadata**

Add every article and theme URL, localized alternates, last-reviewed dates, sensible priorities, and article/theme structured data. Do not assign a fake publication history.

- [ ] **Step 5: Add internal discovery**

Header and footer gain Themes and Guides discovery. Home gains original theme and knowledge-base sections. Related content creates contextual links without keyword-stuffed anchors.

- [ ] **Step 6: Expand production verifier**

The verifier checks all 48 routes, five SEO endpoints, trust-link discovery, no construction strings, privacy control links, review-mode inventory absence, and the archived-demo/original-theme separation.

- [ ] **Step 7: Run SEO and route tests**

Run: `npm test -- tests/routes.test.ts tests/seo.test.ts tests/navigation.test.tsx tests/verify-script.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/site.ts src/lib/seo.ts src/app/sitemap.ts src/components/site/header.tsx src/components/site/footer.tsx src/components/home/home-page.tsx scripts/verify-site.mjs tests/routes.test.ts tests/seo.test.ts tests/navigation.test.tsx tests/verify-script.test.ts
git commit -m "feat: integrate original content into site discovery"
```

### Task 8: Add explicit future ad eligibility and neutral manual slot presentation

**Files:**
- Create: `src/lib/ad-eligibility.ts`
- Create: `src/components/site/ad-slot.tsx`
- Modify: `src/config/site.ts`
- Create: `tests/ad-eligibility.test.ts`
- Modify: `tests/adsense.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `isAdEligiblePath(pathname: string): boolean` and `AdSlot({ locale, slot })`.
- Consumes: `siteConfig.adsense.reviewMode`, editorial route helpers, and publisher ID.

- [ ] **Step 1: Write failing policy tests**

Tests require review mode to suppress all slots; permanently deny `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/about`, 404-like paths, and unknown paths; allow only specifically named substantial guide/article/theme-detail paths once review mode is false. Ad labels must be `Advertisement` / `广告`.

- [ ] **Step 2: Run tests and confirm failures**

Run: `npm test -- tests/ad-eligibility.test.ts tests/adsense.test.tsx`

Expected: FAIL because eligibility and manual slot components do not exist.

- [ ] **Step 3: Implement the pure allowlist policy**

The policy has no broad prefix fallback. A route becomes eligible only through the centralized editorial registry and a `contentComplete: true` flag. Theme index, utility pages, and policy pages remain denied.

- [ ] **Step 4: Implement neutral presentation**

The slot reserves layout space, displays a neutral localized label, never resembles a button, and remains separated from action rows by at least 32 pixels. In review mode it returns `null` before initializing `adsbygoogle`.

- [ ] **Step 5: Run ad tests**

Run: `npm test -- tests/ad-eligibility.test.ts tests/adsense.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ad-eligibility.ts src/components/site/ad-slot.tsx src/config/site.ts src/app/globals.css tests/ad-eligibility.test.ts tests/adsense.test.tsx
git commit -m "feat: gate AdSense inventory to eligible articles"
```

### Task 9: Full verification, integration, production deployment, and operator handoff

**Files:**
- Modify as required by failures: only files already in scope
- Update: `README.md`
- Update: `docs/deployment.md`

**Interfaces:**
- Produces: verified develop/main commits, Vercel production deployment, and external dashboard checklist.
- Consumes: all previous tasks.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit 0; build statically produces all intended routes.

- [ ] **Step 2: Run local production verification**

Run `npm start`, then `npm run verify:site` against the local production server.

Expected: 48 routes and five SEO endpoints verified, no construction wording, and no review-mode ad inventory.

- [ ] **Step 3: Perform browser verification**

At 390×844 and 1440×1000 verify home, Contact, Privacy, both platform guides, one troubleshooting article, theme index, and one theme detail in both locales. Confirm no overflow, missing images, console errors, misleading buttons, advertisement-like CTAs, or inaccessible focus behavior.

- [ ] **Step 4: Update operator documentation**

Document that Auto ads must remain off, the CMP must be published from a Google-certified provider for EEA/UK/Switzerland traffic, `weigensu@gmail.com` must be monitored, and live ads must never be clicked by the owner or collaborators.

- [ ] **Step 5: Commit verification documentation**

```bash
git add README.md docs/deployment.md
git commit -m "docs: add AdSense review operator checklist"
```

- [ ] **Step 6: Merge and push**

Push `develop`, fast-forward `main` to the verified commit, and push `main`. Preserve a clean worktree and confirm both remote refs resolve to the same intended hash.

- [ ] **Step 7: Deploy production and verify the public origin**

Deploy through the linked Vercel project. If Git-triggered production activation stalls but an identical verified deployment is Ready, bind `codexskin.site` and `www.codexskin.site` only after confirming route inventory and commit content. Run:

```bash
SITE_ORIGIN=https://codexskin.site npm run verify:site
```

Expected: all 48 routes and five SEO endpoints pass from the public domain.

- [ ] **Step 8: Report external checks that remain manual**

The owner confirms account age/uniqueness, domain control, site-list status, ownership method, Auto ads off, certified CMP published, legal traffic sources, no self-clicks, contact inbox delivery, GSC sitemap submission, and a clear Policy Center.

## Self-Review Record

- Spec coverage: all approved design sections map to Tasks 1–9.
- Scope: implementation is large but sequential; original content system is established before route content and themes consume it.
- Placeholders: the plan contains no unspecified product decisions; first-party screenshots are required only where genuinely available and are not fabricated.
- Type consistency: `ArticleKey`, `ArticleContent`, `ThemeSlug`, `reviewMode`, `isAdEligiblePath`, and `AdSlot` are introduced once and consumed by later tasks with the same names.
- Deployment: no production claim is made before public-origin verification passes.
