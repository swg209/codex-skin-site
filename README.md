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
- `/about`, `/contact`, `/privacy`, `/terms`, and `/disclaimer`
- `/zh/about`, `/zh/contact`, `/zh/privacy`, `/zh/terms`, and `/zh/disclaimer`
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, and `/ads.txt`

The Codex Dream Skin landing pages point visitors to the verified original `Fei-Away/Codex-Dream-Skin` source. They are independent project guides, not the upstream project's official website.

The bilingual customize guides include tool-neutral, CodexSkin-tested safe-zone composition guidance and a copyable 20:9 source-image prompt. A dedicated 20:9 home image, separate 16:9 task image, and focal-position control remain future work; the site does not currently claim two-image support.

Third-party behavior claims and installation commands are checked against the original project documentation. CodexSkin's guides and future customization resources remain independently maintained.

See [docs/deployment.md](docs/deployment.md) for Vercel, domain, analytics, Google Search Console, and Google AdSense setup.
