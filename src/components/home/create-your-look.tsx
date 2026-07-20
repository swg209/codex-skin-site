import type { Route } from "next";
import Link from "next/link";

import type { CreateLookContent } from "@/content/types";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";

export function CreateYourLook({ content, locale }: { content: CreateLookContent; locale: Locale }) {
  return (
    <section className="section section--tinted">
      <div className="container create-look">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="button-row">
          <Link className="button button--primary" href={routePath(locale, content.primaryRoute) as Route}>
            {content.browseLabel}
          </Link>
          <Link className="button" href={routePath(locale, content.secondaryRoute) as Route}>
            {content.createLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
