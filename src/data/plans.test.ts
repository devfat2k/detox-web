import { describe, it, expect } from "vitest";
import { PLANS_DATA, isValidPlanId } from "./plans";
import { DRINKS_DATA } from "./drinks";

describe("plans data fallback", () => {
  it("contains single fallback mock plan", () => {
    expect(PLANS_DATA).toHaveLength(1);
    expect(PLANS_DATA[0].id).toBe("1-day");
  });

  it("validates plan ids correctly", () => {
    expect(isValidPlanId("1-day")).toBe(true);
    expect(isValidPlanId("3-day")).toBe(true);
    expect(isValidPlanId("6-day")).toBe(true);
    expect(isValidPlanId("9-day")).toBe(false);
    expect(isValidPlanId("unknown")).toBe(false);
  });

  it("ensures fallback plan has valid attributes and schedules", () => {
    const validDrinkSlugs = new Set(DRINKS_DATA.map((d) => d.slug));
    const plan = PLANS_DATA[0];

    expect(plan.title).toBeTruthy();
    expect(plan.durationDays).toBe(1);
    expect(plan.days).toBeDefined();
    expect(plan.days?.length).toBe(1);

    const day = plan.days![0];
    expect(day.bottles.length).toBeGreaterThan(0);
    for (const bottle of day.bottles) {
      expect(bottle.time).toMatch(/^\d{2}:\d{2}$/);
      expect(validDrinkSlugs.has(bottle.drinkSlug)).toBe(true);
    }
  });
});
