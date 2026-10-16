import React from "react";
import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ResultPricingBanner } from "./ResultPricingBanner";

describe("ResultPricingBanner", () => {
  it("renders plan title, duration, bottle count, and both action buttons", () => {
    const html = renderToStaticMarkup(
      <ResultPricingBanner
        title="Combo detox 3 ngày"
        durationDays={3}
        totalBottles={15}
        onOpenPricing={vi.fn()}
        onOpenShopMessage={vi.fn()}
      />
    );

    expect(html).toContain("Combo detox 3 ngày (3 ngày · 15 chai)");
    expect(html).toContain("Xem bảng giá công khai và quyền lợi các combo detox tươi của quán.");
    expect(html).toContain("Xem bảng giá");
    expect(html).toContain("Nhắn cho Shop");
  });

  it("calculates default bottle count when totalBottles is omitted", () => {
    const html = renderToStaticMarkup(
      <ResultPricingBanner
        title="Combo detox 1 ngày"
        durationDays={1}
        onOpenPricing={vi.fn()}
        onOpenShopMessage={vi.fn()}
      />
    );

    expect(html).toContain("Combo detox 1 ngày (1 ngày · 5 chai)");
  });
});
