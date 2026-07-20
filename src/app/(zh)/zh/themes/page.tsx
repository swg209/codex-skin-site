import type { Metadata } from "next";
import { ThemeIndexPage } from "@/components/themes/theme-index-page";
export const metadata: Metadata = { title: "原创 Codex 主题背景", description: "浏览 CodexSkin 原创且具有完整权利记录的 Codex 背景壁纸。" };
export default function Page() { return <ThemeIndexPage locale="zh" />; }
