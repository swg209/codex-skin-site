import { GuidePage } from "@/components/guides/guide-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("zh", "restore");
export default function Page() { return <GuidePage locale="zh" routeKey="restore" />; }
