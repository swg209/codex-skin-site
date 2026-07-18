import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AdSenseHeadScript } from "@/components/site/adsense-script";
import { SiteLayout } from "@/components/site/site-layout";
import { SITE_URL } from "@/lib/site";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "CodexSkin",
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icon", type: "image/png" }] },
  category: "technology",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#111116",
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AdSenseHeadScript />
      </head>
      <body>
        <SiteLayout locale="en">{children}</SiteLayout>
      </body>
    </html>
  );
}
