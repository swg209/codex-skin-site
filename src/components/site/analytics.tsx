import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";

function validGoogleAnalyticsId(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed && /^G-[A-Z0-9]+$/.test(trimmed) ? trimmed : null;
}

export function SiteAnalytics() {
  const gaId = validGoogleAnalyticsId(process.env.NEXT_PUBLIC_GA_ID);

  return (
    <>
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
