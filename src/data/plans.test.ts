import { describe, it, expect } from "vitest";
import { PLANS_DATA, isValidPlanId } from "./plans";

describe("plans data fallback", () => {
  it("does not contain mock fallback plans", () => {
    expect(PLANS_DATA).toHaveLength(0);
  });

  it("validates plan ids correctly", () => {
    expect(isValidPlanId("1-day")).toBe(true);
    expect(isValidPlanId("3-day")).toBe(true);
    expect(isValidPlanId("6-day")).toBe(true);
    expect(isValidPlanId("9-day")).toBe(false);
    expect(isValidPlanId("unknown")).toBe(false);
  });
});
