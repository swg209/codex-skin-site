# AdSense Review Remediation Design

**Date:** 2026-07-20

**Status:** Approved direction — Option A

## Objective

Prepare CodexSkin.site for a safer Google AdSense review without sacrificing the existing search traffic for Codex Dream Skin. The site will enter a review-safe state first, remove construction and rights-provenance risks, deepen its original editorial content, and only then allow ads on explicitly eligible article pages.

This design treats page counts and word counts as internal quality targets, not as published Google approval guarantees. Google does not publish a fixed minimum of 40 URLs or 1,000 words per page.

## Current Verified State

The July 19 third-party preflight report describes an older deployment in several places. The current production site has:

- 22 sitemap URLs rather than 12;
- live bilingual About, Contact, Privacy, Terms, and Disclaimer routes;
- discoverable trust-page links in the home-page footer;
- an English home page and English Codex Dream Skin page with more than 1,300 Latin-script words each;
- a globally loaded AdSense publisher script and no hard-coded display-ad slots;
- a live `ads.txt` record for `pub-5491343418531814`.

The following current risks remain:

- the home page renders `Coming Soon` / `即将上线`;
- the Contact page describes the lack of a public email and contains wording that automated tools can classify as placeholder content;
- English Windows, macOS, customize, and restore guides contain approximately 501, 410, 749, and 322 Latin-script words respectively;
- the eight current gallery composites have incomplete artwork rights provenance and must not be presented as CodexSkin originals;
- privacy copy does not yet contain every Google-required advertising-cookie disclosure and control link;
- repeated `injection` / `injector` terminology can be misclassified even though the documented workflow is a local visual customization layer;
- the AdSense dashboard's Auto ads and consent-message state cannot be established from source code.

## Selected Approach

Option A is a staged review-safe rollout:

1. Stop actual ad serving during remediation while preserving a valid site-ownership path.
2. Remove construction language and replace the Contact placeholder with a working public support channel.
3. Strengthen privacy, advertising, trademark, third-party software, and artwork provenance disclosures.
4. Expand the four high-intent guide topics with original editorial detail and first-party evidence.
5. Add a bounded first collection of original guide, troubleshooting, compatibility, and theme pages.
6. Re-enable ads only on an explicit allowlist of substantial editorial pages after content and layout verification.

## Scope Boundaries

### Included

- English and Simplified Chinese content.
- Existing home, Dream Skin, installation, customization, restore, trust, policy, sitemap, and footer surfaces.
- New original editorial routes defined in this document.
- Ad eligibility rules, neutral ad labels, and layout separation.
- Privacy disclosures and a Google-certified consent-management path for EEA, UK, and Swiss visitors.
- Rights-provenance metadata for all gallery and downloadable artwork.
- Automated content, route, SEO, privacy, and ad-eligibility tests.

### Excluded

- Repackaging, mirroring, modifying, or distributing Codex Dream Skin.
- Changes to the third-party tool repository or its code.
- A user image-upload service, account system, payment system, or private support form.
- Inventing a public email address before a real site-owned mailbox exists.
- Claiming an AdSense approval guarantee or a Google-mandated page/word minimum.
- Enabling an uncertified custom cookie banner as a substitute for a Google-certified CMP.

## Information Architecture

### Existing routes to deepen

- `/install/windows` and `/zh/install/windows`
- `/install/macos` and `/zh/install/macos`
- `/guide/customize` and `/zh/guide/customize`
- `/guide/restore` and `/zh/guide/restore`
- `/privacy` and `/zh/privacy`
- `/contact` and `/zh/contact`

The four guide topics target 900–1,400 English words and equivalent complete Chinese coverage. The privacy policy targets 800–1,200 English words and a complete Chinese counterpart because it needs substantive disclosure, not SEO padding. Contact remains concise because it is a utility page and will never be ad inventory.

### New first-party content routes

The first collection adds 13 editorial topics and 26 localized URLs:

1. `/themes` — original theme catalog
2. Four `/themes/[slug]` original theme detail pages
3. `/guides/background-image-composition`
4. `/guides/readability-and-contrast`
5. `/guides/image-rights-and-licensing`
6. `/troubleshooting/theme-not-visible`
7. `/troubleshooting/cdp-port-conflict`
8. `/troubleshooting/macos-permissions`
9. `/troubleshooting/restore-default-appearance`
10. `/compatibility/codex-dream-skin`

Every English editorial page targets 800–1,500 words. Chinese pages provide complete localized coverage rather than mechanically matching English token counts. Each topic must contain topic-specific evidence such as first-party screenshots, tested environment details, measurable contrast guidance, failure symptoms, verification steps, or a rights record.

## Ad Serving Architecture

### Review mode

`siteConfig.adsense.reviewMode` will default to `true` during remediation. Review mode means:

- no manual display-ad slot is rendered;
- Auto ads is turned off in the AdSense dashboard by the site owner;
- `ads.txt` remains published;
- the existing head verification script remains only if it is the active ownership-verification method;
- if the AdSense dashboard confirms another verification method, the head script may be disabled until resubmission.

The implementation must not claim that the presence of a publisher script alone proves an ad was served. Production verification checks visible/requested ad inventory separately from ownership markup.

### Eligible inventory after review mode

Auto ads remains disabled. A manual `AdSlot` renders only when both conditions are true:

1. `reviewMode` is `false`.
2. The route is in an explicit editorial allowlist.

Trust pages, policy pages, Contact, error pages, empty states, navigation-only surfaces, and any article below its content-completeness threshold are permanently excluded.

Eligible articles may contain at most two initial slots:

- one after the second or third substantial section;
- one before related content near the end.

Each slot uses `Advertisement` / `广告`, remains at least 32 pixels away from installation, GitHub, download, copy, and restore controls, and never uses sticky, overlay, interstitial, or auto-playing media behavior.

## Construction and Contact Remediation

The home `Create Your Own Look` block becomes a completed editorial CTA. It links to the existing customization guide and no longer contains a `comingSoon` field or badge.

Until a real domain mailbox is verified, Contact uses the public CodexSkin site repository as the working channel for broken links, factual corrections, accessibility problems, and translation feedback. It does not say that a channel will arrive later and does not contain the word `placeholder`.

Third-party installation failures and feature requests continue to point to the original Fei-Away/Codex-Dream-Skin issue tracker. The two responsibilities are visually and textually separated.

Private submissions are not accepted. Visitors are warned not to post passwords, API keys, authentication material, or private images in public issues.

## Privacy and Consent Design

The privacy policy contains these sections:

1. Scope and site operator.
2. Information visitors actively provide.
3. Hosting, request, and security logs.
4. Vercel Analytics.
5. Conditional Google Analytics behavior.
6. Google AdSense, third-party vendors, cookies, web beacons, IP addresses, and identifiers.
7. Personalized and non-personalized advertising.
8. EEA, UK, and Switzerland consent handling.
9. Browser, Google Ads Settings, and consent-withdrawal controls.
10. Retention, security, external links, children, and policy updates.

The policy links directly to:

- `https://policies.google.com/technologies/partner-sites`
- `https://adssettings.google.com/`
- `https://support.google.com/adsense/answer/7549925`

For EEA, UK, and Swiss traffic, the owner will publish a Google-certified CMP message from AdSense Privacy & messaging or another Google-certified CMP. A locally designed informational banner must not be described as satisfying that requirement.

No precise-location API, user account, upload, private form, or payment flow is introduced by this work. If any of those capabilities are added later, the privacy policy and consent design require a new review before deployment.

## Trademark and Independence Design

The footer and Disclaimer state that OpenAI and Codex are names and marks used by OpenAI; CodexSkin is independent and is not affiliated with, endorsed by, sponsored by, or operated by OpenAI. Third-party project code and assets remain with their respective owners and contributors.

The site does not call itself an official website, describe the upstream tool as its own project, or imply that OpenAI or Fei-Away reviewed CodexSkin content.

The footer retains direct links to the original repository, the site repository, Privacy, Contact, Terms, and Disclaimer.

## Third-Party Tool Wording

The site remains technically honest while reducing ambiguous policy-sensitive language:

- `Local CDP Injection` becomes `Local Runtime Styling`.
- `本机 CDP 注入` becomes `本机运行时样式层`.
- `injector` becomes `theme helper`.
- `注入器` becomes `主题辅助进程`.
- routine `inject CSS` phrasing becomes `apply CSS at runtime`.

One transparent technical explanation remains on the Dream Skin overview and relevant guides: the referenced third-party tool connects to a user-launched local Codex session through a loopback-only Chrome DevTools Protocol endpoint and applies visual CSS at runtime. CodexSkin does not provide methods for bypassing access controls, licensing, signatures, or security protections and does not host or repackage the tool.

## Artwork Provenance

The current `skin-01.jpg` through `skin-08.jpg` composites are removed from the primary home gallery during remediation. Their provenance file already says they may contain third-party artwork, so they cannot be relabeled as original or downloadable CodexSkin assets.

Replacement theme entries require all of the following metadata:

- title and slug;
- creator or generation owner;
- creation date;
- source-file path;
- license identifier and human-readable license link;
- whether commercial reuse and redistribution are permitted;
- whether the preview contains third-party trademarks, characters, portraits, or likenesses;
- first-party Codex home and task-view screenshots;
- image composition and contrast notes.

The repository includes a public original-asset license document. Any asset missing a complete rights record is excluded from the site and sitemap.

## Editorial Depth Requirements

### Windows guide

Adds tested environment, Microsoft Store prerequisite checks, source verification, install/start sequence, expected output, theme verification, image application, update behavior, common errors, restore, and escalation criteria.

### macOS guide

Adds Apple Silicon and Intel distinctions, official-app checks, download provenance, Gatekeeper and permission explanations, install/start sequence, verification, image application, update behavior, common errors, restore, and escalation criteria.

### Customization guide

Adds the tested 20:9 composition method, home/task safe areas, subject placement, prompt patterns, readability checks, crop testing, one-image compromise, optional two-image future workflow, and artwork-rights guidance.

### Restore guide

Adds symptoms that justify restore, preparation, Windows and macOS procedures, verification of a clean official appearance, residual-file interpretation, and issue-reporting evidence.

Each guide uses first-party screenshots or diagrams. A caption names the tested platform and date. Screenshots must not contain credentials, private conversations, personal paths, or account identifiers.

## Component and Data Boundaries

- `src/config/site.ts` owns review mode, publisher identity, upstream links, site repository, and verified contact configuration.
- localized content files own editorial copy but not operational URLs duplicated elsewhere.
- route registries own sitemap and locale counterparts.
- theme data owns asset-rights metadata separately from page rendering.
- `AdSlot` only renders presentation; `ad-eligibility` decides whether the route is eligible.
- the CMP is configured through the certified provider rather than recreated as a local imitation.

## Testing Strategy

Automated tests must verify:

- no `Coming Soon`, `即将上线`, `placeholder`, or future-contact language remains in rendered production content;
- Privacy and footer contain required trust links and advertising disclosures in both locales;
- policy and utility routes are excluded from ad inventory;
- review mode renders no manual ad slots;
- eligible route allowlisting is explicit and tested;
- no ad slot is adjacent to installation, repository, copy, or restore controls in component structure;
- route and sitemap coverage includes every localized editorial page;
- each theme entry contains a complete rights record;
- current third-party composites are not labeled original or downloadable;
- disallowed branding and high-risk wording does not reappear;
- every page has one H1, canonical URL, reciprocal hreflang, and valid structured data where applicable;
- all routes render without 404/5xx, horizontal overflow, or console errors at desktop and mobile widths.

A content-audit test records English article word counts and Chinese character counts as review signals. It does not present those numbers as Google policy requirements.

## Deployment and Verification

Changes land on `develop`, pass unit tests, lint, type checking, production build, route verification, and browser checks, then fast-forward to `main` and deploy to Vercel production.

Production verification includes:

- sitemap URL count and route status;
- home trust-link discovery;
- privacy disclosure and external control links;
- absence of construction language;
- absence of visible/requested ads in review mode;
- artwork source and license rendering;
- mobile and desktop ad-layout checks after review mode is later disabled.

After content deployment, the owner resubmits the sitemap in Google Search Console and waits for meaningful crawling/indexing before requesting another AdSense review. No approval or indexing timeline is promised.

## External Operator Checklist

The site owner must perform these dashboard and account checks because source code cannot verify them:

- applicant is at least 18 years old;
- only one AdSense publisher account exists for the owner;
- the domain and DNS are controlled by the applicant;
- `codexskin.site` is present in the AdSense Sites list;
- the active ownership-verification method matches production;
- Auto ads is off during remediation;
- a Google-certified CMP message is published for EEA, UK, and Swiss traffic;
- traffic is not purchased, exchanged, incentivized, or generated by spam;
- the owner and collaborators never click or test live ads;
- Policy Center has no unresolved enforcement before resubmission.

## Acceptance Criteria

The remediation is ready for an AdSense recheck when:

1. Production contains no construction or future-contact language.
2. Contact exposes a functioning public channel without inventing an email.
3. Privacy contains complete Google advertising and consent disclosures.
4. The current uncertain-rights composites are no longer primary gallery inventory.
5. All replacement theme assets have complete rights records.
6. The four core guides meet their editorial completeness targets and contain first-party evidence.
7. The new original content collection is live, localized, linked, and included in the sitemap.
8. Review mode prevents manual ad slots and Auto ads is confirmed off.
9. Trust and policy pages are never eligible advertising inventory.
10. Tests, lint, type checking, production build, route verification, and browser checks pass.
11. GSC receives the updated sitemap and can crawl every intended indexable route.
12. The external operator checklist is completed and recorded by the owner.

## Authoritative References

- Google-served ads on screens without publisher content: `https://support.google.com/publisherpolicies/answer/11112688?hl=en`
- Google Publisher Policies and privacy disclosures: `https://support.google.com/adsense/answer/10502938?hl=en`
- AdSense required privacy content: `https://support.google.com/adsense/answer/1348695?hl=en`
- Google-certified CMP requirements: `https://support.google.com/adsense/answer/13554116?hl=en`
- How AdSense uses cookies: `https://support.google.com/adsense/answer/7549925?hl=en`
- OpenAI brand guidelines: `https://openai.com/brand/`
