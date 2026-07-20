import { notFound } from "next/navigation";
import { ThemeDetailPage } from "@/components/themes/theme-detail-page";
import { THEME_SLUGS, getTheme, isThemeSlug } from "@/content/themes";
export const dynamicParams = false;
export function generateStaticParams() { return THEME_SLUGS.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!isThemeSlug(slug)) return {}; const copy = getTheme(slug).copy.en; return { title: `${copy.name} – Original Codex Background`, description: copy.description }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!isThemeSlug(slug)) notFound(); return <ThemeDetailPage locale="en" slug={slug} />; }
