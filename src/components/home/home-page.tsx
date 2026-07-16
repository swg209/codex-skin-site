import Image from "next/image";

import { contentByLocale } from "@/content";
import { JsonLd } from "@/components/site/json-ld";
import type { Locale } from "@/lib/site";
import { faqSchema, softwareApplicationSchema } from "@/lib/seo";

import { Faq } from "./faq";
import { Features } from "./features";
import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Safety } from "./safety";
import { ThemeGallery } from "./theme-gallery";

function Heading({ title, intro }: { title: string; intro?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{intro ? <p>{intro}</p> : null}</div>;
}

export function HomePage({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].home;

  return (
    <>
      <JsonLd data={softwareApplicationSchema(locale)} />
      <JsonLd data={faqSchema(locale)} />
      <Hero locale={locale} content={content} />
      <section id="themes" className="section"><div className="container"><Heading title={content.galleryTitle} intro={content.galleryIntro} /><ThemeGallery locale={locale} items={content.gallery} /><p className="gallery-disclaimer">{content.galleryDisclaimer}</p></div></section>
      <section id="features" className="section section--tinted"><div className="container"><Heading title={content.featuresTitle} intro={content.featuresIntro} /><Features items={content.features} /></div></section>
      <section id="install" className="section"><div className="container"><Heading title={content.stepsTitle} /><HowItWorks items={content.steps} /></div></section>
      <section className="section proof-section"><div className="container proof-section__grid"><div><Heading title={content.proofTitle} intro={content.proofDescription} /></div><div className="proof-section__image"><Image src="/themes/skin-04.jpg" alt={content.gallery[3].description} fill sizes="(max-width: 840px) 100vw, 55vw" /></div></div></section>
      <section className="section section--tinted"><div className="container"><Heading title={content.safetyTitle} intro={content.safetyIntro} /><Safety items={content.safety} /></div></section>
      <section id="faq" className="section"><div className="container"><Heading title={content.faqTitle} /><Faq items={content.faq} /></div></section>
      <FinalCta locale={locale} content={content} />
    </>
  );
}
