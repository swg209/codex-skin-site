import type { Metadata } from "next";
import { ThemeIndexPage } from "@/components/themes/theme-index-page";
export const metadata: Metadata = { title: "Original Codex Theme Backgrounds", description: "Browse original rights-recorded Codex background wallpapers by CodexSkin." };
export default function Page() { return <ThemeIndexPage locale="en" />; }
