import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";

import { siteConfig } from "@/config/site";

function validGoogleAnalyticsId(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed && /^G-[A-Z0-9]+$/.test(trimmed) ? trimmed : null;
}

export function SiteAnalytics() {
  const gaId = validGoogleAnalyticsId(process.env.NEXT_PUBLIC_GA_ID);
  const adsenseSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.publisherId}`;

  return (
    <>
      <Script
        async
        crossOrigin="anonymous"
        src={adsenseSrc}
        strategy="afterInteractive"
      />
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}
      <VercelAnalytics />
    </>
  );
}
