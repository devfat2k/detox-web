import { describe, it, expect } from "vitest";
import { calculateBmi, evaluateSafety, evaluateBody } from "./screening";

describe("Domain Screening", () => {
  it("calculates BMI correctly", () => {
    expect(calculateBmi(160, 50)).toBe(19.5);
    expect(calculateBmi(0, 50)).toBe(0);
  });

  it("blocks high-risk conditions in safety evaluation", () => {
    expect(
      evaluateSafety({
        pregnantOrNursing: true,
        medicalConditions: false,
        regularMedication: false,
        eatingDisorder: false,
        allergies: false,
      }).isEligible
    ).toBe(false);

    expect(
      evaluateSafety({
        pregnantOrNursing: false,
        medicalConditions: false,
        regularMedication: false,
        eatingDisorder: false,
        allergies: true,
      }).isEligible
    ).toBe(true);
  });

  it("screens age and BMI in body evaluation", () => {
    expect(evaluateBody({ age: 16, heightCm: 160, weightKg: 50 }).isEligible).toBe(false);
    expect(evaluateBody({ age: 25, heightCm: 165, weightKg: 40 }).isEligible).toBe(false);

    const normal = evaluateBody({ age: 25, heightCm: 160, weightKg: 52 });
    expect(normal.isEligible).toBe(true);
    expect(normal.hasWarning).toBe(false);

    const senior = evaluateBody({ age: 62, heightCm: 160, weightKg: 55 });
    expect(senior.isEligible).toBe(true);
    expect(senior.hasWarning).toBe(true);
  });
});
