# CodexSkin Independent Positioning Design

## Goal

Reposition `codexskin.site` as an independent community website for Codex Desktop themes, customization tools, and setup guides. The site must not imply that it is the official website for Codex Dream Skin, that it is maintained by the upstream developers, or that it owns or distributes the referenced third-party installer.

## Verified source boundary

- The original referenced project is [`Fei-Away/Codex-Dream-Skin`](https://github.com/Fei-Away/Codex-Dream-Skin).
- CodexSkin.site is independently maintained and is not affiliated with OpenAI or the developers of the referenced third-party tools.
- This release links to the original repository and its platform directories. It does not invent a Release URL, host an installer, proxy a download, fetch upstream files automatically, or execute upstream scripts.
- Installation commands and platform requirements remain sourced from the inspected upstream documentation. The site presents them as third-party instructions and tells visitors to review source code before running scripts.

## Information architecture

The existing bilingual route set remains unchanged. The home page order becomes:

1. Independent-site hero
2. Existing theme gallery
3. Quick Start platform selector
4. Original-content expansion teaser
5. Existing feature, workflow, proof, safety, FAQ, and final call-to-action sections

Quick Start contains separate macOS and Windows cards. Each card links first to the matching CodexSkin guide and second to the original upstream platform directory. The expansion teaser links to the existing gallery anchor and renders a disabled `Coming Soon` control for the future generator.

## Central configuration

`src/config/site.ts` owns the CodexSkin brand, canonical origin, website repository, and verified upstream URLs. Components must not assemble upstream URLs locally. External links open in a new tab with `rel="noopener noreferrer"`.

## Installation guides

The four localized installation pages share a prominent source disclosure above their guide actions. They distinguish CodexSkin's original guide from the referenced third-party tool, expose the verified upstream source link, warn visitors to inspect third-party scripts, and retain restore instructions. No current command, version, or platform requirement is expanded beyond the verified upstream documentation.

## SEO and structured data

Home metadata uses the independent CodexSkin positioning supplied in the requirements. Open Graph, Twitter, application names, manifest copy, canonicals, hreflang, sitemap, and robots remain consistent. The misleading `SoftwareApplication` JSON-LD is removed and replaced with `WebSite` on home pages, while visible FAQ and guide breadcrumb schemas remain.

## Verification

Tests cover centralized upstream URLs, independent positioning copy, Quick Start links, guide disclosures, safe external-link attributes, and the absence of `SoftwareApplication`. The release gate is `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`, followed by local checks of all six requested pages at 390px and 1440px, console errors, internal/external links, sitemap, and robots.
