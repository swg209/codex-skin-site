# CodexSkin Original Themes and Custom Services Design

## Goal

Upgrade `codexskin.site` from an installation-guide-led site into an independent website for original Codex visual materials, practical application guides, and custom design services. Visitors can browse and download original backgrounds, learn how to apply them on Windows or macOS through the existing guides, and submit a custom-service inquiry.

The release must preserve the existing independent-site positioning:

- CodexSkin.site is not an OpenAI website and is not affiliated with OpenAI.
- CodexSkin.site is not the official website of Codex Dream Skin or any other third-party customization tool.
- The site supplies original visual materials, independent tutorials, and custom design services.
- The site does not host, modify, proxy, or repackage third-party installers.
- Third-party tool source code remains untouched.

## Product scope

This is a deliberately small, content-first release. It adds:

- an English and Chinese original-theme catalog;
- statically generated bilingual theme detail pages;
- direct downloads of CodexSkin-created background files;
- a bilingual custom-service page;
- one serverless inquiry endpoint that emails submissions through Resend;
- matching navigation, sitemap, metadata, structured data, analytics, privacy copy, and tests.

The release does not add accounts, payments, a CMS, a database, user uploads, an online theme generator, installer hosting, or automated modification of a visitor's Codex installation.

## Chosen architecture

Use the existing Next.js App Router project as a static-first site. Store theme records and localized copy in typed source files, generate the catalog and detail pages from that data, and serve optimized previews plus downloadable originals from `public`. This keeps the browse-and-download path fast, indexable, and operational without a CMS.

The only dynamic component is `POST /api/custom-inquiry`. It validates a small JSON payload, rejects bot submissions through a honeypot, sends one notification email with Resend, and returns a localized status payload. It does not retain submissions in a database.

This architecture is preferred over a CMS or marketplace because the first release contains only four original themes, has one maintainer, and needs the shortest reliable path to production and search indexing.

## Original asset boundary

The launch catalog contains four new abstract themes created specifically for CodexSkin:

1. Neon Current — dark navy with electric cyan and violet motion.
2. Ember Glass — charcoal with warm coral and amber translucent layers.
3. Aurora Field — deep green-blue with soft mint and teal light forms.
4. Lunar Paper — warm off-white with graphite, silver, and restrained blue geometry.

Each theme ships with:

- one preview image optimized for catalog and detail pages;
- one downloadable background at 2560 × 1600 pixels;
- a stable, lowercase kebab-case slug;
- localized name, summary, mood, and usage notes;
- file format, dimensions, dominant colors, and license text;
- a related-theme list.

The new artwork must contain no people, logos, trademarks, copyrighted characters, source-project artwork, or copied third-party imagery. The existing `public/themes/skin-01.jpg` through `skin-08.jpg` files are upstream demonstration composites and must not be relabeled, downloaded, or licensed as CodexSkin originals. They leave the primary home-page theme showcase. Their existing provenance README remains intact.

## License and download policy

Original downloadable backgrounds are free for personal, non-commercial use. Visitors may modify a downloaded background for their own personal Codex setup. Redistribution, resale, sublicensing, inclusion in another asset pack, and use as a commercial or organizational brand asset are not permitted.

Commercial, brand, KOL, creator, community, and campaign usage is routed to the custom-service page. Every theme detail page displays the short license immediately beside the download action and links to the custom-service path for broader rights. The site does not describe the backgrounds as Open Source unless a separate license is intentionally introduced later.

## Information architecture

### Routes

Add these public routes:

| Locale | Catalog | Theme detail | Custom service |
| --- | --- | --- | --- |
| English | `/themes` | `/themes/[slug]` | `/custom` |
| Chinese | `/zh/themes` | `/zh/themes/[slug]` | `/zh/custom` |

Both detail route groups use `generateStaticParams` for the four launch slugs. An unknown slug returns the existing localized not-found experience rather than a generic theme shell.

### Global navigation

The primary navigation changes from anchor-only browsing to product routes:

- Themes points to `/themes` or `/zh/themes`.
- Custom points to `/custom` or `/zh/custom`.
- Install continues to lead visitors to the existing platform quick-start section or guides.
- FAQ remains available from the home-page anchor.
- GitHub continues to point to the CodexSkin website repository, with upstream tool links kept inside the installation context.

The locale switcher maps a theme detail page to the same slug in the other locale. It maps the catalog and custom-service pages to their direct localized equivalents.

### Home page

The home page becomes a product discovery entry point while preserving the existing guide content:

1. Independent-site hero with two primary actions: browse original themes and request a custom theme.
2. A four-card featured-original-theme section using the new catalog data.
3. A compact license statement and link to the full catalog.
4. Existing Windows/macOS Quick Start.
5. A custom-service teaser for KOLs, creators, and developer communities.
6. Existing safety, workflow, FAQ, and final calls to action, edited only where needed for the new positioning.

The previous upstream gallery is removed from the primary theme-discovery flow because it cannot represent downloadable original assets.

## Catalog page

`/themes` and `/zh/themes` use the same structural component with localized copy. The page contains:

- a clear H1 describing original Codex background themes;
- the independent-site and non-affiliation statement near the introduction;
- the four-theme responsive grid;
- theme mood and dominant-color metadata;
- a visible personal-use license summary;
- links to the Windows and macOS application guides;
- a custom-service call to action for commercial or bespoke use.

The MVP does not add search, filters, sorting, pagination, favorites, or client-side catalog state. Four cards are easier to scan directly and remain fully rendered in the initial HTML.

## Theme detail page

Each localized detail page includes:

- breadcrumb navigation;
- a unique localized H1 and summary;
- a large optimized preview;
- a metadata panel containing dimensions, format, mood, and colors;
- a direct download link to the original image, using the HTML `download` attribute;
- the personal-use license beside the download link;
- Windows and macOS application-guide cards;
- a short disclosure that applying the image may require a separately maintained third-party tool;
- a custom-service call to action;
- two related original themes.

The page must never suggest that downloading an image installs or applies a theme automatically. The primary download label explicitly says “Download background” or “下载背景素材,” and the next step points to the independent platform guide.

## Custom-service page

`/custom` and `/zh/custom` position custom work as a scoped design service rather than a self-service generator. No fixed prices appear. Each inquiry receives a project-specific quote after requirements are reviewed.

The page presents three service types:

1. KOL signature theme — original visual direction, desktop background, preview composition, and personal brand usage scope.
2. Creator visual pack — a coordinated background set, color direction, preview assets, and agreed campaign or channel usage scope.
3. Developer community or event theme — community/event visual direction, background variants, launch assets, and agreed organizational usage scope.

The common process is: submit brief, confirm scope and rights, receive quote and schedule, review concept, receive final files. Copy must avoid guaranteeing a turnaround time before the brief is reviewed.

## Inquiry form

### Fields

The client form sends this JSON shape:

```ts
interface CustomInquiryInput {
  locale: "en" | "zh";
  name: string;
  email: string;
  audience: "kol" | "creator" | "community";
  description: string;
  timeline: string;
  referenceUrl: string;
  company: string;
}
```

`company` is a visually hidden honeypot and must remain empty. The visible fields are name, email, audience type, project description, preferred timeline, and optional reference URL.

### Validation

Client validation improves immediate feedback, but the server is authoritative. Server rules are:

- `locale` is exactly `en` or `zh`;
- `name` is trimmed and 2–80 characters;
- `email` is trimmed, lowercased, 5–254 characters, and matches a conservative email pattern;
- `audience` is one of the three allowed values;
- `description` is trimmed and 30–2000 characters;
- `timeline` is trimmed and 0–120 characters;
- `referenceUrl` is empty or an absolute `http`/`https` URL no longer than 500 characters;
- `company` is empty;
- the JSON body is no larger than 16 KB.

Unexpected fields are ignored when composing the email. User strings are treated as plain text and escaped in any HTML representation. Logs must not print the full submission or API key.

### Server flow

1. Parse JSON and reject an unsupported media type or malformed body.
2. Apply the validation rules and return field-safe errors without echoing submitted content.
3. If the honeypot is populated, return the same generic success response used for real submissions without sending email.
4. Verify `RESEND_API_KEY`, `CUSTOM_INQUIRY_TO_EMAIL`, and `CUSTOM_INQUIRY_FROM_EMAIL` are configured.
5. Send one notification email through Resend with a stable subject containing the audience type and sender name.
6. Return JSON with `ok: true` and a localized confirmation message.

No autoresponder is sent in the MVP, which avoids consent, deliverability, and spoofing complexity. The sender uses `CUSTOM_INQUIRY_FROM_EMAIL`; the visitor's email is set as `replyTo`, never as the sender address.

### Error handling

- Validation failures return HTTP 400 and localized actionable form feedback.
- Unsupported media types return HTTP 415.
- Missing server configuration returns HTTP 503 with a generic “service temporarily unavailable” message.
- Resend failures return HTTP 502 with a generic retry-later message and a minimal server log that contains only the provider error identifier when available.
- The submit button is disabled while a request is active to prevent accidental duplicate submissions.
- On success, visible fields are cleared and an `aria-live` confirmation receives focus.
- Network failures preserve the visitor's input and show a retryable localized message.

The endpoint does not claim protection against determined automated abuse. The honeypot, strict payload limit, and Vercel platform protections are sufficient for this low-volume MVP. Rate limiting can be added only if production traffic demonstrates a need.

## Environment configuration

The repository documents but never commits values for:

```text
RESEND_API_KEY
CUSTOM_INQUIRY_TO_EMAIL
CUSTOM_INQUIRY_FROM_EMAIL
```

The production sender must use a domain verified in Resend. Deployment documentation explains that inquiry submission remains unavailable until all three values exist in the Vercel Production environment.

## Content and component boundaries

- A dedicated theme data module owns slugs, file paths, asset metadata, license category, and localized theme copy.
- Shared catalog and detail components render typed theme data and contain no hardcoded theme records.
- Shared custom-service content defines localized service cards, process copy, form labels, and messages.
- A client form component owns field state, pending state, focus movement, and POST requests.
- A pure server validation module parses and validates unknown input without importing React or Resend.
- The API route owns HTTP concerns and calls a small email-sending function.
- Existing site configuration remains the single source for canonical URLs, repository URLs, and upstream links.

These boundaries allow content, validation, email delivery, and page rendering to be tested independently.

## SEO

### Metadata and indexing

All six route groups produce localized titles, descriptions, canonical URLs, Open Graph values, and reciprocal `hreflang` alternates. Theme detail titles include the theme name and “Codex background,” without implying an official OpenAI product.

The sitemap expands its fixed route set to include both catalogs, both custom pages, and all eight localized theme-detail URLs. `robots.ts` continues to allow public crawling and points to the sitemap. Download asset URLs do not need individual sitemap entries.

### Structured data

- Catalog pages emit `CollectionPage` with an `ItemList` of the four themes.
- Theme detail pages emit `CreativeWork` plus `ImageObject`, with CodexSkin as creator and the personal-use conditions linked to that page's `#license` anchor.
- Custom-service pages emit `Service` with the three audience categories in the description and no invented price, rating, offer, or availability claims.
- Existing `BreadcrumbList`, `WebSite`, `WebPage`, and visible FAQ structured data remain where valid.

No page emits `SoftwareApplication` or describes CodexSkin as the publisher of a third-party tool.

## Analytics

Continue using the existing Vercel Analytics integration and optional Google Analytics integration. Add a small analytics helper so interactive components can record consistent names without directly depending on a provider.

Track only these product events:

- `theme_view` with `theme_slug` and `locale`;
- `theme_download` with `theme_slug`, `locale`, and `asset_format`;
- `custom_cta_click` with `source` and `locale`;
- `custom_inquiry_success` with `audience` and `locale`;
- `custom_inquiry_error` with a non-sensitive `error_type` and `locale`.

Do not send names, email addresses, descriptions, reference URLs, or other free-form values to analytics.

## Privacy and accessibility

The existing privacy statement must change because the site will contain a form. It states that submitted inquiry details are transmitted to CodexSkin's email provider for the purpose of responding, are not stored in a site database, and should not include confidential information. It also explains the existing analytics behavior without claiming that no data is collected.

All new pages and interactions must preserve:

- semantic headings and landmarks;
- keyboard-accessible navigation and controls;
- visible focus states;
- descriptive image alternative text;
- sufficient color contrast over artwork;
- form labels, inline error associations, and an `aria-live` result region;
- responsive layouts at 390 px and 1440 px without horizontal scrolling;
- reduced-motion behavior consistent with the existing global styles.

## Testing and verification

Automated coverage includes:

- theme-data integrity: four unique slugs, localized copy, existing asset paths, valid dimensions, and valid related slugs;
- static params and localized metadata for catalog and detail pages;
- catalog and detail rendering, license disclosure, download attributes, guide links, and custom-service links;
- unknown theme slugs returning not found;
- inquiry validation boundaries, URL protocol restrictions, honeypot behavior, malformed JSON, missing configuration, provider failure, and success;
- form pending, validation, success, network-failure, and analytics behavior without personal data;
- sitemap coverage for every new localized page;
- structured-data types and the continued absence of `SoftwareApplication`;
- navigation and locale-switch mappings;
- identity, upstream-source, privacy, and licensing copy.

The release gate is:

```text
npm run lint
npm run typecheck
npm test
npm run build
```

After the automated gate passes, verify the English and Chinese catalog, one detail page in each locale, both custom pages, a successful inquiry against a configured preview environment, one provider-failure response, downloads, locale switching, sitemap, robots, console errors, keyboard navigation, and layouts at 390 px and 1440 px.

## Success criteria

The phase is complete when:

- visitors can discover four clearly original CodexSkin themes in either language;
- every theme has an indexable detail page and downloadable 2560 × 1600 background;
- license and non-affiliation boundaries are visible before or beside the primary actions;
- Windows and macOS guide paths remain clear;
- KOLs, creators, and developer communities can understand deliverables and submit a brief;
- a valid configured submission reaches the designated email through Resend without database persistence;
- every new localized route is present in the sitemap and emits correct metadata;
- existing independent-positioning and third-party source boundaries remain intact;
- the automated and manual release gates pass.
