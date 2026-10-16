import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeHeroSectionV2 } from "./HomeHeroSectionV2";
import { FIXED_LABELS } from "@/config/copy";

describe("HomeHeroSectionV2 component", () => {
  it("renders main heading, shop intro, and natural trust note without badge pills", () => {
    const html = renderToStaticMarkup(<HomeHeroSectionV2 />);
    expect(html).toContain("Nước ép tươi mỗi sáng, vừa vặn với");
    expect(html).toContain("thể trạng của bạn");
    expect(html).toContain("100% rau củ tự nhiên ép chậm, không đường, không nước lọc pha loãng.");
  });

  it("renders both primary and secondary CTA buttons", () => {
    const html = renderToStaticMarkup(<HomeHeroSectionV2 />);
    expect(html).toContain(FIXED_LABELS.CTA_CONSULTATION);
    expect(html).toContain(FIXED_LABELS.ACTION_VIEW_PRICING);
    expect(html).toContain('href="/consultation"');
    expect(html).toContain('href="/pricing"');
  });

  it("renders balanced horizontal bottle tray with all 5 drinks and time slots", () => {
    const html = renderToStaticMarkup(<HomeHeroSectionV2 />);
    expect(html).toContain("Set 5 chai tươi trong ngày");
    expect(html).toContain("07:00");
    expect(html).toContain("Cần tây táo");
    expect(html).toContain("10:00");
    expect(html).toContain("Cà rốt cam");
    expect(html).toContain("13:00");
    expect(html).toContain("Củ dền táo");
    expect(html).toContain("16:00");
    expect(html).toContain("Dưa leo");
    expect(html).toContain("19:00");
    expect(html).toContain("Hạt sen");
  });

  it("does not have horizontal dividing borders or card-in-card boxes", () => {
    const html = renderToStaticMarkup(<HomeHeroSectionV2 />);
    expect(html).not.toContain("border-b border-border/50");
    expect(html).not.toContain("border-t border-border");
  });

  it("does not contain uppercase classes or forbidden AI-slop status tags", () => {
    const html = renderToStaticMarkup(<HomeHeroSectionV2 />);
    expect(html).not.toContain("uppercase");
    expect(html).not.toContain("Hot");
    expect(html).not.toContain("Best Seller");
    expect(html).not.toContain("Bán chạy");
    expect(html).not.toContain("Khuyên dùng");
  });
});
