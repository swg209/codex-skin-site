import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/articles/article-page";
import { articleKeyForRoute, articleKeysForCategory, articlesByLocale } from "@/content/articles";
import { buildArticleMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return articleKeysForCategory("guides").map((key) => ({ slug: articlesByLocale.zh[key].slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const key = articleKeyForRoute("guides", slug); return key ? buildArticleMetadata("zh", key) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const key = articleKeyForRoute("guides", slug); if (!key) notFound(); return <ArticlePage locale="zh" articleKey={key} />; }
