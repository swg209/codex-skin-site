import { ThemeIndexPage } from "@/components/themes/theme-index-page";
import { buildThemeIndexMetadata } from "@/lib/seo";
export const metadata = buildThemeIndexMetadata("zh");
export default function Page() { return <ThemeIndexPage locale="zh" />; }
