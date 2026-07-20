# CodexSkin Website

The bilingual, static-first website for independent Codex Desktop themes, customization tools, and setup guides, built with Next.js App Router, TypeScript, and Tailwind CSS.

CodexSkin.site is an independent tutorial and customization website. It is not affiliated with OpenAI or the developers of the third-party tools referenced in its guides. The original Codex Dream Skin source belongs to [Fei-Away and its contributors](https://github.com/Fei-Away/Codex-Dream-Skin).

This website does not host, modify, repackage, proxy, or automatically download the upstream Windows or macOS installers. Visitors are directed to the original repository and should review third-party scripts before running them.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Public routes

- `/` and `/zh`
- `/codex-dream-skin` and `/zh/codex-dream-skin`
- `/install/windows` and `/zh/install/windows`
- `/install/macos` and `/zh/install/macos`
- `/guide/customize` and `/zh/guide/customize`
- `/guide/restore` and `/zh/guide/restore`
- `/guides/[slug]`, `/troubleshooting/[slug]`, and `/compatibility/codex-dream-skin`, with matching `/zh/...` pages
- `/themes` and `/zh/themes`, plus four bilingual original-theme detail pages
- `/about`, `/contact`, `/privacy`, `/terms`, and `/disclaimer`
- `/zh/about`, `/zh/contact`, `/zh/privacy`, `/zh/terms`, and `/zh/disclaimer`
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, and `/ads.txt`

The Codex Dream Skin landing pages point visitors to the verified original `Fei-Away/Codex-Dream-Skin` source. They are independent project guides, not the upstream project's official website.

The bilingual customize guides include tool-neutral, CodexSkin-tested safe-zone composition guidance and a copyable 20:9 source-image prompt. The knowledge base expands this work with image rights, readability, permissions, recovery, compatibility, and troubleshooting articles. The original theme collection uses CodexSkin-created artwork with per-theme provenance and license records.

The public sitemap contains 48 localized URLs. AdSense review mode is enabled in `src/config/site.ts`: a non-serving ownership meta tag and `ads.txt` remain published, while the ad-serving script and manual inventory are suppressed. Even after review mode is intentionally disabled, only complete guide, knowledge-base, and theme-detail pages pass the exact route allowlist.

Third-party behavior claims and installation commands are checked against the original project documentation. CodexSkin's guides and future customization resources remain independently maintained.

See [docs/deployment.md](docs/deployment.md) for Vercel, domain, analytics, Google Search Console, and Google AdSense setup. Use [docs/adsense-review-checklist.md](docs/adsense-review-checklist.md) before requesting AdSense review.
