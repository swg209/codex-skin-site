import type { Route } from "next";
import Link from "next/link";

import { articlesByLocale, type ArticleKey } from "@/content/articles";
import { JsonLd } from "@/components/site/json-ld";
import type { Locale } from "@/lib/site";
import { articlePath, routePath } from "@/lib/site";
import { articleBreadcrumbSchema, articleSchema } from "@/lib/seo";

export function ArticlePage({ locale, articleKey }: { locale: Locale; articleKey: ArticleKey }) {
  const article = articlesByLocale[locale][articleKey];
  const reviewed = locale === "en" ? "Reviewed 20 July 2026" : "复核日期：2026 年 7 月 20 日";
  const toc = locale === "en" ? "On this page" : "本页目录";
  const related = locale === "en" ? "Related reading" : "相关阅读";

  return (
    <article className="article-page container">
      <JsonLd data={articleSchema(locale, articleKey)} />
      <JsonLd data={articleBreadcrumbSchema(locale, articleKey)} />
      <header className="article-hero">
        <nav aria-label={locale === "en" ? "Breadcrumb" : "面包屑"} className="breadcrumbs">
          <Link href={routePath(locale, "home") as Route}>{locale === "en" ? "Home" : "首页"}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{article.h1}</span>
        </nav>
        <p className="eyebrow">{article.eyebrow}</p>
        <h1>{article.h1}</h1>
        <p className="lead">{article.summary}</p>
        <div className="article-byline"><span>{article.authorLabel}</span><span>{reviewed}</span></div>
        <aside className="article-evidence">{article.evidenceLabel}</aside>
      </header>
      <div className="article-layout">
        <aside className="article-toc">
          <strong>{toc}</strong>
          <nav aria-label={toc}>{article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
        </aside>
        <div className="article-content">
          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.blocks.map((block, index) => {
                if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
                if (block.type === "note") return <aside className="article-note" key={index}>{block.text}</aside>;
                return <p key={index}>{block.text}</p>;
              })}
            </section>
          ))}
        </div>
      </div>
      <section className="article-related">
        <h2>{related}</h2>
        <div>{article.related.map((key) => <Link className="button" href={articlePath(locale, key) as Route} key={key}>{articlesByLocale[locale][key].h1}</Link>)}</div>
      </section>
    </article>
  );
}
