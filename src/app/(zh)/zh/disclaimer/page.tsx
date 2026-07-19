import { InfoPage } from "@/components/info/info-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("zh", "disclaimer");
export default function Page() { return <InfoPage locale="zh" routeKey="disclaimer" />; }
