import { GuidePage } from "@/components/guides/guide-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("zh", "macos");
export default function Page() { return <GuidePage locale="zh" routeKey="macos" />; }
