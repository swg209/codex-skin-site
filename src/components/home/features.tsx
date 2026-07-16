import type { FeatureItem } from "@/content/types";

export function Features({ items }: { items: FeatureItem[] }) {
  return <div className="feature-grid">{items.map((item, index) => <article className="feature-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>;
}
