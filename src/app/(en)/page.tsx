import { HomePage } from "@/components/home/home-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("en", "home");

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
