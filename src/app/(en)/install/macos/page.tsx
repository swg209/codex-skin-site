import { GuidePage } from "@/components/guides/guide-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("en", "macos");
export default function Page() { return <GuidePage locale="en" routeKey="macos" />; }
