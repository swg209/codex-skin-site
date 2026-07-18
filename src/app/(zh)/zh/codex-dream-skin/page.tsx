import { DreamSkinPage } from "@/components/dream-skin/dream-skin-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("zh", "dreamSkin");

export default function Page() {
  return <DreamSkinPage locale="zh" />;
}
