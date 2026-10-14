import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PlanList } from "./PlanList";
import { PLANS_DATA, type Plan } from "@/data/plans";
import { FIXED_LABELS } from "@/config/copy";

const testPlans: readonly Plan[] = [
  PLANS_DATA[0],
  {
    id: "3-day",
    title: "Combo Detox 3 Ngày",
    durationDays: 3,
    totalBottles: 15,
    kcalRange: "850 – 950 kcal/ngày",
    description: "3 ngày làm mới",
  },
  {
    id: "6-day",
    title: "Combo Detox 6 Ngày",
    durationDays: 6,
    totalBottles: 30,
    kcalRange: "850 – 950 kcal/ngày",
    description: "6 ngày chuyên sâu",
  },
];

describe("PlanList component", () => {
  it("renders header with kicker and titles without under-construction notice", () => {
    const html = renderToStaticMarkup(<PlanList plans={PLANS_DATA} />);
    expect(html).toContain("Ba lựa chọn theo nhu cầu cơ thể");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
    expect(html).toContain("/consultation");
  });

  it("renders all 3 plans with duration, bottle count and kcal details", () => {
    const html = renderToStaticMarkup(<PlanList plans={testPlans} />);
    expect(html).toContain("1 ngày");
    expect(html).toContain("3 ngày");
    expect(html).toContain("6 ngày");
    expect(html).toContain("5 chai");
    expect(html).toContain("15 chai");
    expect(html).toContain("30 chai");
  });

  it("does not render any forbidden AI-slop status badges (Hot, Best seller)", () => {
    const html = renderToStaticMarkup(<PlanList plans={testPlans} />);
    expect(html).not.toContain("Hot");
    expect(html).not.toContain("Best Seller");
    expect(html).not.toContain("Bán chạy");
  });
});
