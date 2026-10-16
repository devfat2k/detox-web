import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PricingCard } from "./pricing-card";
import { PRICING_COMBOS } from "@/data/pricing";

describe("PricingCard", () => {
  const sampleCombo = PRICING_COMBOS[1]; // 3-day combo

  it("renders combo details correctly in page mode", () => {
    const html = renderToStaticMarkup(
      <PricingCard combo={sampleCombo} mode="page" />
    );

    expect(html).toContain("Liệu trình 3 ngày");
    expect(html).toContain("Combo detox 3 ngày");
    expect(html).toContain("570.000đ");
    expect(html).toContain("15 chai");
    expect(html).toContain("Khẩu phần mỗi ngày (5 chai):");
    expect(html).toContain("Cảm nhận thể trạng:");
    expect(html).toContain("Xem chi tiết thực đơn");
  });

  it("renders selection button in modal mode when unselected", () => {
    const html = renderToStaticMarkup(
      <PricingCard combo={sampleCombo} mode="modal" isSelected={false} />
    );

    expect(html).toContain("Chọn combo này");
    expect(html).not.toContain("Đã chọn gói này");
  });

  it("renders selected state in modal mode when isSelected is true", () => {
    const html = renderToStaticMarkup(
      <PricingCard combo={sampleCombo} mode="modal" isSelected={true} />
    );

    expect(html).toContain("Đã chọn gói này");
    expect(html).not.toContain("Chọn combo này");
  });

  it("does not have horizontal dividing borders inside the card", () => {
    const html = renderToStaticMarkup(
      <PricingCard combo={sampleCombo} mode="page" />
    );

    expect(html).not.toContain("border-t");
    expect(html).not.toContain("border-b");
  });

  it("does not render any badge or recommendation tag", () => {
    const html = renderToStaticMarkup(
      <PricingCard combo={PRICING_COMBOS[2]} mode="page" />
    );

    expect(html).not.toContain("Khuyên dùng");
    expect(html).not.toContain("Gợi ý cho bạn");
  });
});
