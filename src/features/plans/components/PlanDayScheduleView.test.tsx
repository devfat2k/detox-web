import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PlanDayScheduleView } from "./PlanDayScheduleView";
import type { Plan } from "@/data/plans";

const mockPlan6Day: Plan = {
  id: "6-day",
  title: "Combo Detox 6 Ngày Chuyên Sâu",
  durationDays: 6,
  totalBottles: 30,
  kcalRange: "850 – 950 kcal/ngày",
  description: "Liệu trình chuyên sâu tái tạo cơ thể",
  tagline: "6 ngày thay đổi lối sống",
  suitableFor: ["Người muốn thanh lọc sâu"],
  notSuitableFor: ["Phụ nữ mang thai"],
  preparationGuide: "Ăn nhẹ",
  recoveryGuide: "Ăn cháo loãng",
  days: [
    {
      dayNumber: 1,
      theme: "Khởi động nhẹ nhàng",
      bottles: [
        {
          time: "07:00",
          name: "Sinh Tố Xanh Khởi Động",
          desc: "Bổ sung năng lượng tươi",
          drinkSlug: "sinh-to-xanh-khoi-dong",
          color: "green",
          level: 80,
          bottleType: "smoothie",
          slotName: "Cữ sáng",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Thanh lọc đường ruột",
      bottles: [
        {
          time: "07:00",
          name: "Nước Ép Cần Tây Tươi",
          desc: "Đào thải muối và nước thừa",
          drinkSlug: "nuoc-ep-can-tay-tuoi",
          color: "green",
          level: 90,
          bottleType: "juice",
          slotName: "Cữ sáng",
        },
      ],
    },
  ],
};

describe("PlanDayScheduleView", () => {
  it("does not render 'Thực đơn 5 chai mỗi ngày'", () => {
    const html = renderToStaticMarkup(<PlanDayScheduleView plan={mockPlan6Day} />);
    expect(html).not.toContain("Thực đơn 5 chai mỗi ngày");
  });

  it("renders the morning delivery schedule UI", () => {
    const html = renderToStaticMarkup(<PlanDayScheduleView plan={mockPlan6Day} />);
    expect(html).toContain("Khung giờ giao sáng: 06:30 – 08:30");
    expect(html).toContain("Giao tươi mỗi sáng");
    expect(html).toContain("Nước ép được đóng thùng giữ nhiệt");
  });

  it("renders day selector buttons for multi-day plans", () => {
    const html = renderToStaticMarkup(<PlanDayScheduleView plan={mockPlan6Day} />);
    expect(html).toContain("Ngày 1");
    expect(html).toContain("Ngày 2");
    expect(html).toContain("Sinh Tố Xanh Khởi Động");
  });

  it("renders trigger button when onOpenShopMessage is provided", () => {
    const html = renderToStaticMarkup(
      <PlanDayScheduleView
        plan={mockPlan6Day}
        onOpenShopMessage={() => {}}
      />
    );
    expect(html).toContain("Hỏi giờ giao &amp; phí ship →");
  });
});
