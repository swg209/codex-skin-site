import { contentByLocale } from "@/content";
import { JsonLd } from "@/components/site/json-ld";
import type { Locale } from "@/lib/site";
import { faqSchema, websiteSchema } from "@/lib/seo";

import { Faq } from "./faq";
import { Features } from "./features";
import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { CreateYourLook } from "./create-your-look";
import { QuickStart } from "./quick-start";
import { Safety } from "./safety";
import { ThemeGallery } from "./theme-gallery";

function Heading({ title, intro }: { title: string; intro?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{intro ? <p>{intro}</p> : null}</div>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].home;

  return (
    <>
      <JsonLd data={websiteSchema(locale)} />
      <JsonLd data={faqSchema(locale)} />
      <Hero locale={locale} content={content} />
      <section id="themes" className="section"><div className="container"><Heading title={locale === "en" ? "Original themes with clear rights" : "权利清晰的原创主题"} intro={locale === "en" ? "Four abstract 20:9 backgrounds created specifically for CodexSkin, with source records, reuse terms, and detailed home/task composition notes." : "四张专为 CodexSkin 创作的 20:9 抽象背景，均提供来源记录、再利用条款和首页/任务页构图说明。"} /><ThemeGallery locale={locale} /></div></section>
      <QuickStart locale={locale} content={content.quickStart} />
      <CreateYourLook content={content.createLook} locale={locale} />
      <section id="features" className="section section--tinted"><div className="container"><Heading title={content.featuresTitle} intro={content.featuresIntro} /><Features items={content.features} /></div></section>
      <section className="section"><div className="container"><Heading title={content.stepsTitle} /><HowItWorks items={content.steps} /></div></section>
      <section className="section proof-section"><div className="container proof-section__grid"><div><Heading title={content.proofTitle} intro={content.proofDescription} /></div><div className="proof-section__image composition-preview" role="img" aria-label={locale === "en" ? "Diagram showing a low-detail background with a protected reading area" : "低细节背景与正文安全区示意图"}><div className="composition-preview__quiet">{locale === "en" ? "Quiet reading area" : "低细节阅读区"}</div><div className="composition-preview__focus" aria-hidden="true" /><div className="composition-preview__composer" aria-hidden="true" /></div></div></section>
      <section className="section section--tinted"><div className="container"><Heading title={content.safetyTitle} intro={content.safetyIntro} /><Safety items={content.safety} /></div></section>
      <section id="faq" className="section"><div className="container"><Heading title={content.faqTitle} /><Faq items={content.faq} /></div></section>
      <FinalCta locale={locale} content={content} />
    </>
  );
}
