# Vercel deployment and Google indexing

## 1. Import the repository

Import `swg209/codex-skin-site` as a new Vercel project. Vercel detects Next.js automatically. Keep the standard build command `npm run build` and use Node.js 20.9 or newer.

## 2. Set environment variables

Add these values for Production and Preview as appropriate:

```env
NEXT_PUBLIC_SITE_URL=https://codexskin.site
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
```

Leave the Google values empty until those services are configured. `NEXT_PUBLIC_GA_ID` must be a Measurement ID beginning with `G-`. `NEXT_PUBLIC_GSC_VERIFICATION` is only the HTML verification token, not an entire meta tag.

Enable Web Analytics in the Vercel project dashboard, then redeploy so the analytics routes are active.

## 3. Connect the domain

Add both domains in Vercel:

- `codexskin.site` — primary production domain
- `www.codexskin.site` — redirected domain

Use the exact DNS records Vercel displays for the project. DNS values differ by account and configuration, so do not copy guessed A or CNAME values from another site. After Vercel verifies both domains, `vercel.json` permanently redirects every `www` path to the same path on `https://codexskin.site`.

## 4. Verify the production deployment

Check these URLs return HTTP 200:

- `https://codexskin.site/`
- `https://codexskin.site/zh`
- `https://codexskin.site/sitemap.xml`
- `https://codexskin.site/robots.txt`
- `https://codexskin.site/manifest.webmanifest`

Confirm `https://www.codexskin.site/install/macos` returns a permanent redirect to `https://codexskin.site/install/macos`. Inspect the public pages and verify canonical tags use the non-`www` HTTPS origin, each language pair has reciprocal `en`, `zh-CN`, and `x-default` hreflang links, and no public page contains `noindex`.

## 5. Configure Google Search Console

1. Add `https://codexskin.site` as a URL-prefix property, or add the entire domain as a Domain property.
2. Use Google's current verification method. For HTML-tag verification, place only the token in `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, and complete verification.
3. Open **Sitemaps** and submit `https://codexskin.site/sitemap.xml`.
4. Use URL Inspection for the English and Chinese home pages, then request indexing after the live canonical and rendered content are correct.
5. Monitor Pages/Indexing for blocked, duplicate, alternate-page, soft-404, or redirect errors. Do not submit the `www` host or Vercel preview URLs.

## 6. Google Analytics

Create a GA4 web data stream for `https://codexskin.site`, add its `G-...` Measurement ID to `NEXT_PUBLIC_GA_ID`, and redeploy. The tracking script is omitted when the value is empty or malformed.
