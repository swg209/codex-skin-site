import { InfoPage } from "@/components/info/info-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("en", "privacy");
export default function Page() { return <InfoPage locale="en" routeKey="privacy" />; }
