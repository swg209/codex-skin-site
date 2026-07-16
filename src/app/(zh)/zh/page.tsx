import { HomePage } from "@/components/home/home-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("zh", "home");

export default function ChineseHomePage() {
  return <HomePage locale="zh" />;
}
