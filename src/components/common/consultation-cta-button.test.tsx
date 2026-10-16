import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ConsultationCtaButton } from "./consultation-cta-button";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";

describe("ConsultationCtaButton", () => {
  it("renders with default props trỏ tới trang tư vấn", () => {
    const html = renderToStaticMarkup(<ConsultationCtaButton />);
    expect(html).toContain(`href="${ROUTES.CONSULTATION}"`);
    expect(html).toContain(FIXED_LABELS.CTA_CONSULTATION);
    expect(html).toContain("bg-primary");
    expect(html).toContain("min-h-11");
  });

  it("renders large size for hero banner with prominent rings and padding", () => {
    const html = renderToStaticMarkup(
      <ConsultationCtaButton size="lg">
        Tư vấn ngay
      </ConsultationCtaButton>
    );
    expect(html).toContain("min-h-14");
    expect(html).toContain("ring-4");
    expect(html).toContain("sm:min-h-16");
    expect(html).toContain("text-base sm:text-lg");
  });

  it("supports custom children and sparkles icon", () => {
    const html = renderToStaticMarkup(
      <ConsultationCtaButton icon="sparkles">
        Khám phá lộ trình
      </ConsultationCtaButton>
    );
    expect(html).toContain("Khám phá lộ trình");
  });

  it("supports icon none", () => {
    const html = renderToStaticMarkup(
      <ConsultationCtaButton icon="none">
        Tư vấn
      </ConsultationCtaButton>
    );
    expect(html).toContain("Tư vấn");
  });
});
