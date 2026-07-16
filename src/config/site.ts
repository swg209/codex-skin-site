const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://codexskin.site"
).replace(/\/$/, "");

const upstreamRepositoryUrl =
  "https://github.com/Fei-Away/Codex-Dream-Skin";

export const siteConfig = {
  name: "CodexSkin",
  url: siteUrl,
  repositoryUrl: "https://github.com/swg209/codex-skin-site",
  upstream: {
    repositoryUrl: upstreamRepositoryUrl,
    releasesUrl: null,
    macosUrl: `${upstreamRepositoryUrl}/tree/main/macos`,
    windowsUrl: `${upstreamRepositoryUrl}/tree/main/windows`,
    issuesUrl: `${upstreamRepositoryUrl}/issues`,
    licenseUrl: `${upstreamRepositoryUrl}/blob/main/macos/LICENSE`,
  },
} as const;

export type UpstreamPlatform = "macos" | "windows";

export function upstreamSourceUrl(platform: UpstreamPlatform): string {
  return platform === "macos"
    ? siteConfig.upstream.macosUrl
    : siteConfig.upstream.windowsUrl;
}
