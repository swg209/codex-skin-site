import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteLayout } from "@/components/site/site-layout";
import { SITE_URL } from "@/lib/site";

import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Codex Dream Skin",
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icon", type: "image/png" }] },
  category: "technology",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#111116",
};

export default function ChineseLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteLayout locale="zh">{children}</SiteLayout>
      </body>
    </html>
  );
}
