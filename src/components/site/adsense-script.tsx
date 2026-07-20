import { siteConfig } from "@/config/site";

export function AdSenseHeadScript() {
  if (siteConfig.adsense.reviewMode) {
    return (
      <meta
        name="google-adsense-account"
        content={siteConfig.adsense.publisherId}
      />
    );
  }

  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.publisherId}`}
    />
  );
}
