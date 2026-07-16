import type { FaqItem } from "@/content";

export function Faq({ items }: { items: FaqItem[] }) {
  return <div className="faq-list">{items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}
