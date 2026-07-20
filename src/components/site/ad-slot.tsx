"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/site";
import { isAdEligiblePath } from "@/lib/ad-eligibility";

type AdSlotProps = {
  locale: Locale;
  slot: string;
};

export function AdSlot({ locale, slot }: AdSlotProps) {
  const pathname = usePathname();
  const eligible = isAdEligiblePath(pathname);

  useEffect(() => {
    if (!eligible) return;

    const adsWindow = window as typeof window & { adsbygoogle?: object[] };
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
    adsWindow.adsbygoogle.push({});
  }, [eligible, pathname, slot]);

  if (!eligible) return null;

  return (
    <aside className="ad-slot" aria-label={locale === "zh" ? "广告" : "Advertisement"}>
      <span>{locale === "zh" ? "广告" : "Advertisement"}</span>
      <ins
        className="adsbygoogle"
        data-ad-client={siteConfig.adsense.publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
