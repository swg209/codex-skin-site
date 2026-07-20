import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { GITHUB_URL } from "@/lib/site";

describe("deployment configuration", () => {
  it("permanently redirects www to the canonical host", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8"));

    expect(config.redirects).toContainEqual(
      expect.objectContaining({
        source: "/:path*",
        destination: "https://codexskin.site/:path*",
        permanent: true,
        has: [{ type: "host", value: "www.codexskin.site" }],
      }),
    );
  });

  it("documents indexing environment variables", () => {
    const env = readFileSync(".env.example", "utf8");

    expect(env).toContain("NEXT_PUBLIC_SITE_URL=https://codexskin.site");
    expect(env).toContain("NEXT_PUBLIC_GSC_VERIFICATION=");
    expect(env).toContain("NEXT_PUBLIC_GA_ID=");
  });

  it("centralizes the verified original repository", () => {
    const configPath = "src/config/site.ts";

    expect(existsSync(configPath)).toBe(true);
    const source = readFileSync(configPath, "utf8");

    expect(source).toContain("https://github.com/Fei-Away/Codex-Dream-Skin");
    expect(GITHUB_URL).toBe("https://github.com/Fei-Away/Codex-Dream-Skin");
  });

  it("records source trust facts without claiming an untested release", async () => {
    const { siteConfig } = await import("@/config/site");

    expect(siteConfig.upstream).toMatchObject({
      name: "Codex Dream Skin",
      owner: "Fei-Away",
      lastVerifiedAt: "2026-07-20",
      testedVersion: null,
    });
    expect(siteConfig.contactEmail).toBeNull();
  });
});
