# Codex Dream Skin Website

The bilingual, static-first website for [Codex Dream Skin](https://github.com/swg209/Codex-Dream-Skin), built with Next.js App Router, TypeScript, and Tailwind CSS.

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
- `/install/windows` and `/zh/install/windows`
- `/install/macos` and `/zh/install/macos`
- `/guide/customize` and `/zh/guide/customize`
- `/guide/restore` and `/zh/guide/restore`
- `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`

Product claims and installation commands come from the product repository. The site does not host an unofficial installer or modify the theme tool.

See [docs/deployment.md](docs/deployment.md) for Vercel, domain, analytics, and Google Search Console setup.
