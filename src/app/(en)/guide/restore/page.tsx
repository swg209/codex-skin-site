import { GuidePage } from "@/components/guides/guide-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("en", "restore");
export default function Page() { return <GuidePage locale="en" routeKey="restore" />; }
