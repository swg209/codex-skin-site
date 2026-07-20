import { notFound } from "next/navigation";
import { ThemeDetailPage } from "@/components/themes/theme-detail-page";
import { THEME_SLUGS, isThemeSlug } from "@/content/themes";
import { buildThemeMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return THEME_SLUGS.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return isThemeSlug(slug) ? buildThemeMetadata("en", slug) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!isThemeSlug(slug)) notFound(); return <ThemeDetailPage locale="en" slug={slug} />; }
