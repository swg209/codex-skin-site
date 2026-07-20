import { ThemeIndexPage } from "@/components/themes/theme-index-page";
import { buildThemeIndexMetadata } from "@/lib/seo";
export const metadata = buildThemeIndexMetadata("en");
export default function Page() { return <ThemeIndexPage locale="en" />; }
