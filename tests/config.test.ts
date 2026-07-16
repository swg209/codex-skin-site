import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

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
});
