import { InfoPage } from "@/components/info/info-page";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("en", "about");
export default function Page() { return <InfoPage locale="en" routeKey="about" />; }
