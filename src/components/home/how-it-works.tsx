import type { FeatureItem } from "@/content/types";

export function HowItWorks({ items }: { items: FeatureItem[] }) {
  return <ol className="step-list">{items.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>;
}
