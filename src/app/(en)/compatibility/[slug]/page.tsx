import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/articles/article-page";
import { articleKeyForRoute, articleKeysForCategory, articlesByLocale } from "@/content/articles";
import { buildArticleMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return articleKeysForCategory("compatibility").map((key) => ({ slug: articlesByLocale.en[key].slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const key = articleKeyForRoute("compatibility", slug); return key ? buildArticleMetadata("en", key) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const key = articleKeyForRoute("compatibility", slug); if (!key) notFound(); return <ArticlePage locale="en" articleKey={key} />; }
