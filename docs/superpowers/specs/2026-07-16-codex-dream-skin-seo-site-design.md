# Codex Dream Skin SEO Site Design

## Purpose

Build the first public website for Codex Dream Skin at `https://codexskin.site`. The primary success metric is qualified organic search traffic. Secondary actions are reading an installation guide, visiting the GitHub repository, and reporting problems. The site does not collect leads, require accounts, process payments, or host an independent installer.

## Sources of truth

Product claims and installation instructions must match [`swg209/Codex-Dream-Skin`](https://github.com/swg209/Codex-Dream-Skin) at inspected commit `170b84439e021d3adc10c2459a45606f899f299d` or a newer verified commit at implementation time. The authoritative files are:

- `README.md` and `README.en.md`
- `macos/README.md`
- `windows/SKILL.md`
- `docs/platforms.md`
- `docs/images/gallery/`
- the repository's visible release and installation entries

The product is an independent MIT-licensed project and is not affiliated with OpenAI. The website must not imply endorsement, official status, or ownership of Codex/OpenAI trademarks.

At the inspected commit:

- macOS supports Apple Silicon and Intel Macs, user-selected images, install, launch/reapply, verification, and restore;
- Windows supports install, launch/injection, verification, and restore, and requires Node.js 22 or newer;
- Windows does not yet support the repository's user-image customization workflow;
- the project applies themes through loopback-only CDP and does not modify `.app`, `app.asar`, WindowsApps, or the official app signature;
- the project does not automatically change API keys, Base URLs, or model-provider settings;
- no Git tag or downloadable GitHub Release was present, so the website must not invent a release download.

## Scope

### Included

- A static-first bilingual website built with Next.js App Router, TypeScript, and Tailwind CSS.
- Ten indexable routes:
  - `/`
  - `/zh`
  - `/install/windows`
  - `/install/macos`
  - `/zh/install/windows`
  - `/zh/install/macos`
  - `/guide/customize`
  - `/guide/restore`
  - `/zh/guide/customize`
  - `/zh/guide/restore`
- Responsive navigation, mobile menu, theme gallery lightbox, and copyable command blocks.
- Page-specific metadata, canonical URLs, reciprocal hreflang, Open Graph and X cards, sitemap, robots, web manifest, favicon, and a custom 404 page.
- `SoftwareApplication`, `FAQPage`, and `BreadcrumbList` structured data where the matching content is visible.
- Optional Google Analytics, Google Search Console verification, and Vercel Analytics integration.
- A Vercel redirect from `www.codexskin.site` to `codexskin.site`.

### Excluded

- Database, authentication, comments, CMS, billing, user uploads, email capture, search, and admin tools.
- Changes to the theme tool or its installation scripts.
- Direct downloads that are not backed by a verified GitHub Release or repository artifact.
- Claims that Windows supports custom user images until the product repository documents that capability.
- A blog or programmatic keyword pages in the first release.

## Information architecture

### Home pages

The English and Chinese home pages share the same section order:

1. Sticky header: Themes, Features, Install, FAQ, GitHub, and locale switcher.
2. Hero: product name, one H1, concise platform-safe promise, Windows/macOS guide buttons, GitHub link, representative repository gallery image, and four proof labels.
3. Theme gallery: all eight repository gallery composites, neutral captions, accurate alt text, lazy loading, and a rights disclaimer.
4. Features: interactive native interface, macOS custom image support, Windows/macOS support, no official app modification, restore, and local CDP injection.
5. How it works: install, choose/apply an available theme, and launch Codex with the themed session. Platform differences link to guide pages.
6. Visual proof: repository-provided Dream Skin screenshots only. Do not source an unofficial “before” image from the web.
7. Safety and boundaries: loopback scope, unchanged official package, unchanged API configuration, local-software caution, possible update incompatibility, and unofficial status.
8. FAQ: the ten questions specified in the product brief, with repository-backed answers.
9. Final CTA: Windows guide, macOS guide, and GitHub star/repository link.
10. Footer: repository, guides, issue reporting, MIT license, an inline privacy disclosure addressable at `#privacy`, and the trademark disclaimer.

English is the default language. Chinese copy should be idiomatic rather than line-by-line translation. Both pages remain content-equivalent so hreflang pairs represent true alternatives.

### Installation guides

Each platform guide contains one H1, breadcrumbs, a concise support summary, prerequisites, real repository entry points, ordered installation steps, launch, verification, background/theme changes, restore, troubleshooting, safety notes, and an Issue link.

Windows content must state that Node.js 22 or newer is required and must not include a user-image customization procedure. macOS content may document the Finder picker, supported source formats, source/prepared size limits, the recommended wide image shape, the `customize-theme-macos.sh` CLI, verification launcher, and restore launcher. Commands must be copied from the current product docs and displayed in keyboard-accessible copy blocks.

Because no Release exists at the inspected commit, “download” actions point to the product repository or exact platform directory and explain that users should follow the guide. If a verified Release appears before implementation completes, its real URL may replace the repository fallback.

### Customize and restore guides

The customize guide clearly separates confirmed macOS capability from Windows status. General composition advice—wide source, calm left side, sufficient text contrast—is labeled as guidance unless the tool enforces it. The restore guide covers each platform's real restore entry point, what remains untouched, verification after restore, and issue reporting.

## Content model and application structure

Routes are explicit App Router pages so metadata and static generation remain simple. Shared UI components render locale-specific structured content rather than embedding long copy in components.

Proposed responsibilities:

- `app/`: route entry points, layout, global metadata endpoints, redirects-related configuration, 404, sitemap, robots, and manifest.
- `components/site/`: header, footer, locale switcher, analytics, JSON-LD, and breadcrumbs.
- `components/home/`: hero, gallery/lightbox, features, steps, safety, FAQ, and CTA.
- `components/guides/`: guide layout, callouts, platform matrix, command-copy block, and table of contents.
- `content/`: typed English and Chinese home/guide content plus route metadata.
- `lib/`: site constants, locale route mapping, metadata helpers, and schema builders.
- `public/themes/`: optimized copies of repository gallery images and the verified social preview image.
- `tests/`: content, routing, metadata, schema, navigation, and interactive-component tests.

Interactive pieces are small client components; the rest remains server-rendered and statically generated. No runtime fetch is needed for visible content.

## Visual design

The site uses a restrained, dark, high-contrast shell so the theme screenshots remain dominant. The palette is near-black charcoal, cool gray text, a single muted violet accent, and subtle hairline borders. Avoid large gradients, animated particles, autoplay carousels, glass effects on every surface, and decorative motion unrelated to comprehension.

Typography uses a system-first sans-serif stack to avoid render-blocking font dependencies. Headings are compact and editorial; body text remains readable at 16px or larger. Cards use soft 14–18px radii and shallow shadows. The desktop gallery uses two columns for legible screenshots; mobile uses one column. Motion is limited to short opacity/transform feedback and disabled under `prefers-reduced-motion`.

The OG image is a purpose-built landscape social card that reuses the finished site's dark palette, product name, short promise, and the repository's original abstract `macos/assets/portal-hero.png` visual rather than third-party gallery art. It must be inspected for incorrect text before use; if no valid image is available, image metadata is omitted rather than using a generic fallback.

## Interaction and accessibility

- The sticky header preserves a visible focus order and uses a labeled disclosure button on mobile.
- Anchor navigation respects the sticky-header offset and reduced-motion settings.
- The gallery opens a modal with a descriptive accessible name, focus containment, Escape-to-close, backdrop close, and previous/next buttons usable from keyboard and touch.
- Command blocks expose a real button, announce successful copying through a polite live region, and retain selectable text if clipboard access fails.
- All controls meet a 44px touch target where practical.
- Images have meaningful, non-keyword-stuffed alt text; decorative images use empty alt text.
- Every page has exactly one H1, logical heading order, a skip link, landmarks, sufficient contrast, and no color-only status meaning.

## SEO design

- The canonical site origin is `https://codexskin.site`, overridable locally with `NEXT_PUBLIC_SITE_URL` but never emitted as an invalid or trailing-slash-duplicated URL.
- Each route has a unique title and description. The two home titles and descriptions match the supplied brief.
- Every English/Chinese pair emits `en`, `zh-CN`, and `x-default` alternates.
- Sitemap entries cover only canonical, indexable routes and include alternate-language links when supported by Next.js.
- Robots allow public pages and reference the absolute sitemap URL.
- `SoftwareApplication` appears on home pages; `FAQPage` appears only where the same FAQ is visible; `BreadcrumbList` appears on guides with matching on-page breadcrumbs.
- JSON-LD avoids unsupported ratings, pricing, download URLs, or operating-system versions not documented by the product.
- Internal links connect each home to all four guide intents and connect platform/customize/restore guides to one another.
- Neutral gallery captions avoid using third-party character or franchise names as target keywords.

## Privacy and analytics

The footer's `#privacy` disclosure explains that the static site itself accepts no accounts, uploads, or forms, avoiding an extra route outside the agreed ten-route MVP. Google Analytics renders only when `NEXT_PUBLIC_GA_ID` is present. Search Console verification renders only when `NEXT_PUBLIC_GSC_VERIFICATION` is present. Vercel Analytics is enabled using the supported Next.js package without blocking the page. No secret is required in the browser.

## Performance

- Pages are statically generated and contain no runtime API dependency.
- Gallery assets are copied from the product repository, resized into responsive WebP/AVIF derivatives through the build/runtime image pipeline, and rendered with explicit dimensions.
- Only the representative hero image is prioritized; remaining gallery images are lazy loaded.
- Client JavaScript is limited to the mobile menu, lightbox, copy buttons, and optional analytics.
- No heavyweight component library, icon pack, webfont, video, particle engine, or carousel is added.
- The finished build should establish a sound Lighthouse baseline: stable layout, responsive images, semantic markup, and no avoidable render-blocking third-party request.

## Failure and change handling

- Missing clipboard support leaves commands selectable and shows a non-blocking message.
- A missing local image fails the build through static imports rather than producing a broken production URL.
- Unknown routes render the custom 404 with links to the English home, Chinese home, and install guides.
- Product claims are centralized so a future platform-capability change does not require editing scattered components.
- Before launch, installation facts and outbound URLs are rechecked against the current product repository. If a Release remains absent, repository links remain the only download path.

## Verification

Automated checks cover:

- typed content completeness for both locales;
- reciprocal locale route mapping;
- unique metadata, canonical URL, and hreflang output for all ten routes;
- schema builders producing only visible, source-backed data;
- sitemap and robots entries;
- header/mobile-menu accessibility behavior;
- lightbox keyboard behavior;
- command-copy success and graceful fallback;
- absence of accidental Windows custom-image claims;
- internal-link integrity for all local routes.

Release verification runs tests, lint, TypeScript checks, and a production build. A local production-equivalent preview is then checked at desktop and mobile widths for navigation, layout, image loading, gallery interaction, command copying, 404 behavior, console errors, and obvious horizontal overflow.

## Deployment

Vercel is the target platform. The repository includes an environment example for:

```env
NEXT_PUBLIC_SITE_URL=https://codexskin.site
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
```

The production project must bind `codexskin.site` as primary and redirect `www.codexskin.site` permanently to the canonical host. Deployment documentation covers Vercel import, environment variables, DNS records shown by Vercel, domain verification, production deployment, and Search Console sitemap submission without inventing provider-specific DNS values in advance.

## Acceptance criteria

- All ten routes render statically in English and Chinese with one H1 each.
- Every user-facing product claim matches the current product repository.
- All eight gallery images are visible, lazily loaded outside the hero, and covered by the rights disclaimer.
- Platform CTAs lead to real guide or GitHub destinations; no fake release or download exists.
- Canonical, hreflang, social metadata, sitemap, robots, manifest, favicon, 404, and required JSON-LD are present and consistent.
- Desktop and mobile navigation, lightbox, and copy controls are keyboard accessible.
- Tests, lint, type checking, and production build pass with no unresolved errors.
- Deployment and `www` redirect instructions are complete for `codexskin.site`.
