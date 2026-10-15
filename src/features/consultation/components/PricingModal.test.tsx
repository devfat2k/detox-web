import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PricingModal } from "./PricingModal";

describe("PricingModal", () => {
  it("does not render when isOpen is false", () => {
    const html = renderToStaticMarkup(
      <PricingModal isOpen={false} onClose={vi.fn()} />
    );
    expect(html).toBe("");
  });

  it("renders correctly with 3 combos when isOpen is true", () => {
    const html = renderToStaticMarkup(
      <PricingModal isOpen={true} onClose={vi.fn()} />
    );

    expect(html).toContain('role="dialog"');
    expect(html).toContain("Combo detox 1 ngày");
    expect(html).toContain("Combo detox 3 ngày");
    expect(html).toContain("Combo detox 6 ngày");
    expect(html).toContain("195.000đ");
    expect(html).toContain("570.000đ");
    expect(html).toContain("999.000đ");
    expect(html).toContain("1.110.000đ");
    expect(html).toContain("Chọn combo");
    expect(html).toContain("Đã chọn");
    expect(html).toContain("Bạn đang chọn:");
    expect(html).toContain("Nhắn shop gói này");
  });

  it("highlights the matching user plan duration", () => {
    const html = renderToStaticMarkup(
      <PricingModal isOpen={true} onClose={vi.fn()} selectedDurationDays={3} />
    );

    expect(html).toContain("Gợi ý cho bạn");
    expect(html).toContain("Combo detox 3 ngày");
  });

  it("displays the shop footnote about continuous detox", () => {
    const html = renderToStaticMarkup(
      <PricingModal isOpen={true} onClose={vi.fn()} />
    );

    expect(html).toContain("3 – 6 ngày liên tục");
  });
});
