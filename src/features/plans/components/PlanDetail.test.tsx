import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PlanDetail } from "./PlanDetail";
import type { Plan } from "@/data/plans";
import { FIXED_LABELS } from "@/config/copy";

const testPlan: Plan = {
  id: "3-day",
  title: "Liệu trình Cân bằng 3 ngày",
  durationDays: 3,
  totalBottles: 15,
  kcalRange: "850 – 950 kcal/ngày",
  description: "Cân bằng năng lượng và tái tạo đường ruột êm ái.",
  tagline: "3 ngày làm mới năng lượng, thanh lọc sâu và cải thiện tiêu hóa.",
  suitableFor: ["Người muốn cho hệ tiêu hóa nghỉ ngơi", "Đối tượng phù hợp"],
  notSuitableFor: ["Trường hợp cần thận trọng"],
  preparationGuide: "Chuẩn bị trước liệu trình",
  recoveryGuide: "Ăn nhẹ sau liệu trình",
  days: [
    {
      dayNumber: 1,
      theme: "Khởi động & Đánh thức đường ruột",
      bottles: [
        {
          time: "07:00",
          name: "Sinh Tố Xanh Healthy",
          desc: "Chất xơ thô từ cải kale",
          drinkSlug: "sinh-to-xanh-healthy",
          color: "green",
          level: 85,
          bottleType: "smoothie",
          slotName: "Bữa sáng",
        },
        {
          time: "10:00",
          name: "Nước Ép Táo + Cần Tây",
          desc: "Khoáng kali",
          drinkSlug: "ep-tao-can-tay",
          color: "green",
          level: 65,
          bottleType: "juice",
          slotName: "Bữa phụ sáng",
        },
        {
          time: "19:00",
          name: "Sữa Hạt Điều",
          desc: "Chất béo lành mạnh",
          drinkSlug: "sua-hat-dieu",
          color: "soft",
          level: 75,
          bottleType: "nut_milk",
          slotName: "Bữa tối",
        },
      ],
    },
    {
      dayNumber: 2,
      theme: "Thích nghi & Tăng cường đào thải",
      bottles: [],
    },
    {
      dayNumber: 3,
      theme: "Cân bằng & Làm sạch sâu",
      bottles: [],
    },
  ],
};

describe("PlanDetail component", () => {
  it("renders plan title, summary metrics, and removes construction notice", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={testPlan} />);
    expect(html).toContain(testPlan.title);
    expect(html).toContain("3 ngày");
    expect(html).toContain("15 chai");
    expect(html).toContain(testPlan.kcalRange);
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("renders daily schedules with bottles and times", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={testPlan} />);
    expect(html).toContain("Ngày 1");
    expect(html).toContain("Ngày 2");
    expect(html).toContain("Ngày 3");
    expect(html).toContain("07:00");
    expect(html).toContain("10:00");
    expect(html).toContain("19:00");
    expect(html).toContain("Sinh Tố Xanh Healthy");
  });

  it("renders health guides, preparation, recovery, and medical disclaimer", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={testPlan} />);
    expect(html).toContain("Đối tượng phù hợp");
    expect(html).toContain("Trường hợp cần thận trọng");
    expect(html).toContain("Chuẩn bị trước liệu trình");
    expect(html).toContain("Ăn nhẹ sau liệu trình");
    expect(html).toContain("tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa");
  });

  it("provides back link and consultation CTA button", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={testPlan} />);
    expect(html).toContain('href="/plans"');
    expect(html).toContain('href="/consultation"');
  });
});
