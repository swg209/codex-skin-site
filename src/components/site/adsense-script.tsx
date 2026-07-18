import { siteConfig } from "@/config/site";

export function AdSenseHeadScript() {
  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.publisherId}`}
    />
  );
}
