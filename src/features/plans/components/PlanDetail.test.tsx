import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PlanDetail } from "./PlanDetail";
import { PLANS_DATA } from "@/data/plans";
import { FIXED_LABELS } from "@/config/copy";

describe("PlanDetail component", () => {
  const plan = PLANS_DATA[1]; // Gói 3 ngày

  it("renders plan title, summary metrics, and removes construction notice", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain(plan.title);
    expect(html).toContain("3 ngày");
    expect(html).toContain("15 chai");
    expect(html).toContain(plan.kcalRange);
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("renders daily schedules with bottles and times", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain("Ngày 1");
    expect(html).toContain("Ngày 2");
    expect(html).toContain("Ngày 3");
    expect(html).toContain("07:00");
    expect(html).toContain("10:00");
    expect(html).toContain("19:00");
    expect(html).toContain("Xanh Tươi Cần Tây Táo");
  });

  it("renders health guides, preparation, recovery, and medical disclaimer", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain("Đối tượng phù hợp");
    expect(html).toContain("Trường hợp cần thận trọng");
    expect(html).toContain("Chuẩn bị trước liệu trình");
    expect(html).toContain("Ăn nhẹ sau liệu trình");
    expect(html).toContain("tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa");
  });

  it("provides back link and consultation CTA button", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain('href="/plans"');
    expect(html).toContain('href="/consultation"');
  });
});
