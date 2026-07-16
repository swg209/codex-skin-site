export function Safety({ items }: { items: string[] }) {
  return <ul className="safety-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
