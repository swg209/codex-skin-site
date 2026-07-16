import type { Route } from "next";
import Link from "next/link";

import type { Locale, RouteKey } from "@/lib/site";
import { routePath } from "@/lib/site";

export function Breadcrumbs({ locale, current }: { locale: Locale; current: Exclude<RouteKey, "home"> }) {
  return (
    <nav className="breadcrumbs" aria-label={locale === "en" ? "Breadcrumb" : "面包屑导航"}>
      <Link href={routePath(locale, "home") as Route}>{locale === "en" ? "Home" : "首页"}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current === "windows" ? "Windows" : current === "macos" ? "macOS" : current === "customize" ? (locale === "en" ? "Customize" : "定制") : (locale === "en" ? "Restore" : "恢复")}</span>
    </nav>
  );
}
