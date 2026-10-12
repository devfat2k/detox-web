import { describe, it, expect } from "vitest";
import { PLANS_DATA, isValidPlanId } from "./plans";

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

      // Kiểm tra mỗi ngày có đủ 5 chai
      for (const day of plan.days) {
        expect(day.bottles).toHaveLength(5);
        for (const bottle of day.bottles) {
          expect(bottle.time).toMatch(/^\d{2}:\d{2}$/);
          expect(bottle.drinkSlug).toBeTruthy();
          expect(["green", "warm", "soft"]).toContain(bottle.color);
          expect(bottle.level).toBeGreaterThanOrEqual(50);
        }
      }
    }
  });
});
