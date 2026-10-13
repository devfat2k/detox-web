import { describe, it, expect } from "vitest";
import { PLANS_DATA, isValidPlanId } from "./plans";
import { DRINKS_DATA } from "./drinks";

describe("plans data", () => {
  it("contains exactly 3 plans: 1-day, 3-day, and 6-day", () => {
    expect(PLANS_DATA).toHaveLength(3);
    const ids = PLANS_DATA.map((p) => p.id);
    expect(ids).toEqual(["1-day", "3-day", "6-day"]);
  });

  it("validates plan ids correctly", () => {
    expect(isValidPlanId("1-day")).toBe(true);
    expect(isValidPlanId("3-day")).toBe(true);
    expect(isValidPlanId("6-day")).toBe(true);
    expect(isValidPlanId("9-day")).toBe(false);
    expect(isValidPlanId("unknown")).toBe(false);
  });

  it("ensures each plan has rich metadata and daily schedules", () => {
    const validDrinkSlugs = new Set(DRINKS_DATA.map((d) => d.slug));

    for (const plan of PLANS_DATA) {
      expect(plan.title).toBeTruthy();
      expect(plan.durationDays).toBeGreaterThan(0);
      expect(plan.totalBottles).toBe(plan.durationDays * 5);
      expect(plan.kcalRange).toContain("kcal");
      expect(plan.suitableFor.length).toBeGreaterThan(0);
      expect(plan.notSuitableFor.length).toBeGreaterThan(0);
      expect(plan.preparationGuide).toBeTruthy();
      expect(plan.recoveryGuide).toBeTruthy();
      expect(plan.days).toHaveLength(plan.durationDays);

      // Kiểm tra mỗi ngày có đủ 5 chai và tuân thủ quy chuẩn 3:1:1
      for (const day of plan.days) {
        expect(day.bottles).toHaveLength(5);

        const smoothieCount = day.bottles.filter((b) => b.bottleType === "smoothie").length;
        const juiceCount = day.bottles.filter((b) => b.bottleType === "juice").length;
        const eveningCount = day.bottles.filter(
          (b) => b.bottleType === "nut_milk" || b.bottleType === "herbal_tea"
        ).length;

        expect(smoothieCount).toBe(3);
        expect(juiceCount).toBe(1);
        expect(eveningCount).toBe(1);

        for (const bottle of day.bottles) {
          expect(bottle.time).toMatch(/^\d{2}:\d{2}$/);
          expect(bottle.drinkSlug).toBeTruthy();
          // Mọi slug trong lộ trình phải có mặt trong danh sách đồ uống thực tế của shop
          expect(validDrinkSlugs.has(bottle.drinkSlug)).toBe(true);
          expect(["green", "warm", "soft"]).toContain(bottle.color);
          expect(bottle.level).toBeGreaterThanOrEqual(50);
          expect(bottle.slotName).toBeTruthy();
        }
      }
    }
  });
});

