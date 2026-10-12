import { describe, it, expect } from "vitest";
import { recommendPlan } from "./recommend";

describe("Domain Recommend", () => {
  it("respects explicit duration choices", () => {
    expect(recommendPlan({ experienceLevel: "never", durationChoice: 1, bmi: 22 }).planId).toBe("1-day");
    expect(recommendPlan({ experienceLevel: "never", durationChoice: 6, bmi: 22 }).planId).toBe("6-day");
  });

  it("recommends 3-day for beginners", () => {
    const res = recommendPlan({ experienceLevel: "never", durationChoice: "auto", bmi: 21 });
    expect(res.planId).toBe("3-day");
  });

  it("recommends 1-day for users who experienced fatigue", () => {
    const res = recommendPlan({ experienceLevel: "experienced_tired", durationChoice: "auto", bmi: 22 });
    expect(res.planId).toBe("1-day");
  });

  it("recommends 6-day for experienced users with BMI >= 20", () => {
    const res = recommendPlan({ experienceLevel: "experienced_good", durationChoice: "auto", bmi: 21 });
    expect(res.planId).toBe("6-day");

    const lowBmi = recommendPlan({ experienceLevel: "experienced_good", durationChoice: "auto", bmi: 19 });
    expect(lowBmi.planId).toBe("3-day");
  });
});
