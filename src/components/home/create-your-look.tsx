import type { CreateLookContent } from "@/content/types";

export function CreateYourLook({ content }: { content: CreateLookContent }) {
  return (
    <section className="section section--tinted">
      <div className="container create-look">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="button-row">
          <a className="button button--primary" href={content.href}>
            {content.browseLabel}
          </a>
          <button
            aria-label={`${content.createLabel} — ${content.comingSoon}`}
            className="button button--disabled"
            disabled
            type="button"
          >
            {content.createLabel}
            <span>{content.comingSoon}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
