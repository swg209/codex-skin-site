import { InfoPage } from "@/components/info/info-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("zh", "about");
export default function Page() { return <InfoPage locale="zh" routeKey="about" />; }
