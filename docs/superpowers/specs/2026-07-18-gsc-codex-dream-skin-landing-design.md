# GSC Codex Dream Skin Landing Page Design

## Goal

Use the first 24 hours of Google Search Console query data to add a focused bilingual landing page for visitors searching for Codex Dream Skin, its original GitHub repository, installation instructions, and Codex skins or background materials.

Add:

- `/codex-dream-skin`
- `/zh/codex-dream-skin`

The page must capture the observed search intent without changing CodexSkin.site into an upstream-project website or implying ownership of third-party software.

## Source data and intent

The observed query set is led by:

- `codex dream skin`
- `codex-dream-skin`
- `codex dream skin github`
- `github codex dream skin`
- Chinese variants `codex皮肤` and `codex 皮肤`

These queries map to four intents:

1. Understand what Codex Dream Skin is.
2. Find the original source repository.
3. Find Windows or macOS installation guidance.
4. Find Codex skins, themes, and background inspiration.

The landing page addresses the intents in that order. It does not repeat query variants mechanically or use hidden keywords.

## Verified upstream boundary

The verified upstream repository is [`Fei-Away/Codex-Dream-Skin`](https://github.com/Fei-Away/Codex-Dream-Skin).

Verification performed on 2026-07-18 established:

- GitHub API `full_name`: `Fei-Away/Codex-Dream-Skin`
- GitHub API `fork`: `false`
- GitHub API `archived`: `false`
- default branch: `main`
- inspected HEAD: `3af1d6d62f3a0388cc640d2f497ac3100998938e`

The URL remains owned by the existing centralized `siteConfig.upstream.repositoryUrl`. Page components must not hardcode or reconstruct it. The site repository `swg209/codex-skin-site` is the website source and must never be described as the original Codex Dream Skin repository.

## Identity and content boundaries

Every localized landing page states near the first external action:

- CodexSkin.site is an independent tutorial, visual-material, and tool website.
- CodexSkin.site is not an OpenAI website and is not affiliated with OpenAI.
- CodexSkin.site is not the official website of Codex Dream Skin.
- The site maintainer is not the upstream project author.
- Third-party installers are not hosted, modified, proxied, or repackaged here.
- Visitors should inspect source and obtain the project only from the verified original repository.

The page may accurately explain the upstream project's documented behavior, but must use attribution such as “the upstream documentation says” for implementation and security claims. It must not use “our project,” “official download,” “official website,” or other ownership language.

## Information architecture

The shared landing page renders these sections:

1. Hero and query answer
   - English H1: `Codex Dream Skin: GitHub Source, Install Guides & Themes`
   - Chinese H1: `Codex Dream Skin：原始 GitHub、安装教程与 Codex 皮肤`
   - A concise answer explains that it is an independent open-source visual theme layer for the official Codex Desktop application.
   - Primary action: open the original GitHub repository.
   - Secondary actions: Windows guide and macOS guide.

2. Verified source card
   - Shows repository owner/name, platform directories, source-review reminder, and external-link disclosure.
   - Links only through centralized upstream configuration.
   - Visibly labels the destination as a third-party GitHub repository.

3. What it is and what it is not
   - Two short columns distinguish the documented theme-layer behavior from CodexSkin's independent role.
   - No `SoftwareApplication` claims, ratings, version claims, or fabricated release details.

4. Installation path
   - Windows and macOS cards summarize who each existing guide is for.
   - Internal links lead to the current localized guide pages.
   - The source is a separate external action, so a visitor can review guidance before leaving the site.

5. Codex skins and background materials
   - Links to the current localized home `#themes` gallery.
   - Describes those current images as demonstrations from the referenced project, not CodexSkin-owned downloads.
   - Links to the existing customization guide and does not promise Windows user-image support.
   - Future original-theme pages can replace the gallery link without changing this landing page's search role.

6. Focused FAQ
   - What is Codex Dream Skin?
   - Where is the original Codex Dream Skin GitHub repository?
   - Is Codex Dream Skin an official OpenAI product?
   - Does CodexSkin.site maintain or distribute Codex Dream Skin?
   - How do I install it on Windows or macOS?
   - Can I use my own Codex skin or background image?

7. Final source and guide actions
   - Original GitHub is the primary external action.
   - Windows and macOS guides remain prominent internal actions.
   - The independent-site disclosure remains visible.

## Navigation and internal linking

Keep the desktop and mobile navigation at the current item count by replacing the `Features`/`功能` anchor with `Dream Skin` and linking it to the new localized route.

Add internal links from:

- the home hero or an immediately adjacent high-visibility home section;
- the footer navigation;
- the Windows and macOS guide source-disclosure areas.

Do not replace guide-to-guide relationships or remove direct upstream links from installation contexts.

The locale switcher must map `/codex-dream-skin` directly to `/zh/codex-dream-skin` and back. The existing path-to-route-key helper must recognize the new route rather than falling back to home.

## Metadata

Use these localized values:

### English

- Title: `Codex Dream Skin – GitHub, Install Guides & Themes`
- Description: `Learn what Codex Dream Skin is, open the original GitHub repository, and follow independent Windows and macOS install guides from CodexSkin.`
- Canonical: `https://codexskin.site/codex-dream-skin`

### Chinese

- Title: `Codex Dream Skin - GitHub、安装教程与 Codex 皮肤`
- Description: `了解 Codex Dream Skin，访问原始 GitHub 仓库，并查看 CodexSkin 提供的 Windows、macOS 独立安装教程与皮肤素材说明。`
- Canonical: `https://codexskin.site/zh/codex-dream-skin`

Both pages expose reciprocal `en`, `zh-CN`, and `x-default` hreflang values, localized Open Graph values, the existing GSC verification token when configured, and the shared CodexSkin social image.

## Structured data

The landing page emits:

- `WebPage` describing the independent guide page;
- `BreadcrumbList` with Home → Codex Dream Skin;
- `FAQPage` containing only the six visible landing-page questions and answers.

The schema must not emit `SoftwareApplication`, `Product`, `Offer`, `AggregateRating`, or any statement that CodexSkin created or publishes the upstream software.

## Route and sitemap model

Add `dreamSkin` to the typed public `ROUTES` contract with English path `/codex-dream-skin`. Existing localization helpers produce `/zh/codex-dream-skin`.

Because the current `GuideContent` type is incorrectly coupled to every non-home route, introduce a narrow `GUIDE_ROUTES` tuple containing only `windows`, `macos`, `customize`, and `restore`, plus a `GuideRouteKey` type. `GuideContent.key`, guide relationships, and `LocaleContent.guides` use `GuideRouteKey`; public routing and metadata continue to use the broader `RouteKey`. This prevents the new landing page from being mistaken for an installation guide and keeps both domains type-safe.

The sitemap grows from 10 to 12 public content URLs. New entries use:

- `lastModified`: `2026-07-18T00:00:00.000Z`
- `changeFrequency`: `weekly`
- `priority`: `0.9`
- reciprocal localized alternates

The production verification list also grows to 12 routes and continues checking status, one H1, canonical, hreflang, `noindex`, AdSense head script, sitemap inclusion, robots, manifest, ads.txt, and 404 behavior.

## Components and content boundaries

- `src/content/types.ts` defines one `DreamSkinContent` interface with SEO, hero, source, explainer, guide, materials, FAQ, and action copy.
- `src/content/en.ts` and `src/content/zh.ts` provide localized content under `dreamSkin`.
- `src/components/dream-skin/dream-skin-page.tsx` is the shared server-rendered page.
- Small presentational sections may live beside the page only when doing so keeps each component focused.
- Route files only select locale, metadata, and the shared page.
- Existing `siteConfig.upstream` remains the only source of upstream URLs.
- Existing guide commands and third-party code remain unchanged.

`GuideContent` gains one localized `overviewLabel` used by the shared guide source-disclosure area to link back to the new landing page. It does not alter installation commands, steps, or upstream actions.

The page is server-rendered and requires no new client state, data fetching, dependency, database, API route, or environment variable.

## Visual treatment and accessibility

Reuse the current dark visual system, containers, buttons, guide cards, disclosure panels, and responsive breakpoints. Add only focused classes for the landing hero, source card, two-column explanation, intent cards, and compact FAQ.

Requirements:

- exactly one H1;
- semantic section headings in logical order;
- descriptive external-link labels rather than generic “click here” text;
- visible focus states and 44-pixel minimum targets inherited from the site system;
- no text rendered directly over demonstration images;
- no horizontal scrolling at 390px or 1440px;
- safe external attributes `target="_blank" rel="noopener noreferrer"`;
- visible “opens GitHub in a new tab” meaning in localized copy.

## Testing and verification

Automated tests cover:

- 12 unique localized route paths and reciprocal alternates;
- path-to-route-key and locale-switch mappings;
- unique titles and descriptions across six route keys per locale;
- landing-page H1, source disclosure, original repository URL, safe external attributes, guide links, materials link, and six FAQs;
- absence of official-site, ownership, installer-hosting, and Windows user-image claims;
- `WebPage`, `BreadcrumbList`, and visible `FAQPage` schemas;
- absence of `SoftwareApplication`;
- sitemap count, priorities, dates, and alternates;
- navigation, footer, home, and guide internal links;
- production verifier coverage of all 12 URLs.

Release gate:

```text
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:site
```

After deployment, run the verifier against `https://codexskin.site`, inspect both new routes at 390px and 1440px, confirm the upstream link resolves to `Fei-Away/Codex-Dream-Skin`, and submit both new URLs through GSC URL Inspection after live canonical and rendered content are confirmed.

## Success criteria

The phase is complete when:

- both localized landing pages return 200 and are indexable;
- each page answers the four observed search intents without keyword stuffing;
- the verified original GitHub repository is prominent and correctly attributed;
- site identity and third-party boundaries are visible before the main actions;
- both platform guides and the current material gallery are reachable through localized internal links;
- metadata, structured data, sitemap, navigation, and production verification include the new routes;
- no third-party tool code or installer is added or changed;
- automated and production release gates pass.
