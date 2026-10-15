import { describe, it, expect } from "vitest";
import {
  calculateBmi,
  evaluateSafety,
  evaluateBody,
  calculateHealthyWeightRange,
  getAsianBmiAssessment,
} from "./screening";

describe("Domain Screening", () => {
  it("calculates BMI correctly", () => {
    expect(calculateBmi(160, 50)).toBe(19.5);
    expect(calculateBmi(0, 50)).toBe(0);
  });

  it("calculates healthy weight range for Asian adults", () => {
    const range160 = calculateHealthyWeightRange(160);
    // 18.5 * 2.56 = 47.36 -> 47.4 kg, 22.9 * 2.56 = 58.624 -> 58.6 kg
    expect(range160.minKg).toBe(47.4);
    expect(range160.maxKg).toBe(58.6);

    expect(calculateHealthyWeightRange(0)).toEqual({ minKg: 0, maxKg: 0 });
  });

  it("evaluates Asian BMI correctly across categories", () => {
    // Underweight (< 18.5)
    const underweight = getAsianBmiAssessment(160, 45);
    expect(underweight?.statusLabel).toBe("Thiếu cân");
    expect(underweight?.bmi).toBe(17.6);

    // Normal (18.5 - 22.9)
    const normal = getAsianBmiAssessment(160, 52);
    expect(normal?.statusLabel).toBe("Cân đối");
    expect(normal?.bmi).toBe(20.3);

    // Slightly overweight / pre-obese (23.0 - 24.9)
    const slightlyOver = getAsianBmiAssessment(160, 60);
    expect(slightlyOver?.statusLabel).toBe("Hơi đầy đặn");
    expect(slightlyOver?.bmi).toBe(23.4);

    // Overweight (25.0 - 29.9)
    const overweight = getAsianBmiAssessment(160, 70);
    expect(overweight?.statusLabel).toBe("Thừa cân");
    expect(overweight?.bmi).toBe(27.3);

    // Obese (>= 30)
    const obese = getAsianBmiAssessment(160, 80);
    expect(obese?.statusLabel).toBe("Cần lưu ý");
    expect(obese?.bmi).toBe(31.3);

    // Invalid values
    expect(getAsianBmiAssessment(0, 0)).toBeNull();
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
