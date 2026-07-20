import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InfoPage } from "@/components/info/info-page";

describe("trust and policy pages", () => {
  it.each(["en", "zh"] as const)("renders the confirmed %s contact email", (locale) => {
    render(<InfoPage locale={locale} routeKey="contact" />);

    expect(screen.getByRole("link", { name: "weigensu@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:weigensu@gmail.com",
    );
  });

  it.each(["en", "zh"] as const)("links the required %s privacy controls", (locale) => {
    render(<InfoPage locale={locale} routeKey="privacy" />);

    expect(screen.getByRole("link", { name: /Google.*partner|Google.*合作伙伴/i })).toHaveAttribute(
      "href",
      "https://policies.google.com/technologies/partner-sites",
    );
    expect(screen.getByRole("link", { name: /Ads Settings|广告设置/i })).toHaveAttribute(
      "href",
      "https://adssettings.google.com/",
    );
  });
});
