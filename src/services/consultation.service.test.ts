import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  buildConsultationPayload,
  submitConsultation,
  type ConsultationSubmissionInput,
} from "./consultation.service";
import { apiClient } from "@/lib/api-client";
import type { ConsultationResult } from "@/types/api";

describe("consultation.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockInput: ConsultationSubmissionInput = {
    body: {
      name: "Chị Mai",
      gender: "female",
      age: 28,
      heightCm: 160,
      weightKg: 52,
      activityLevel: "moderate",
    },
    safety: {
      pregnantOrNursing: false,
      medicalConditions: false,
      regularMedication: false,
      eatingDisorder: false,
      allergies: false,
    },
    goals: ["weight"],
    experience: {
      level: "never",
      duration: 3,
    },
  };

  it("builds valid ConsultationPayload conforming to backend contract", () => {
    const payload = buildConsultationPayload(mockInput);

    expect(payload.baseline.nickname).toBe("Chị Mai");
    expect(payload.baseline.weightKg).toBe(52);
    expect(payload.baseline.heightCm).toBe(160);
    expect(payload.baseline.activityLevel).toBe("LIGHT");
    expect(payload.goal).toBe("WEIGHT_LOSS");
    expect(payload.preferences?.experienceLevel).toBe("BEGINNER");
    expect(payload.preferences?.durationDays).toBe(3);
    expect(payload.risks?.isPregnantOrNursing).toBe(false);
  });

  it("posts payload and returns consultation result from API", async () => {
    const mockResult: ConsultationResult = {
      bmi: 20.31,
      bmiCategory: "Thể trạng cân đối",
      dailyWaterMl: 2000,
      safetyAlerts: [],
      recommendedPlan: {
        id: "3-day",
        name: "Combo Detox 3 Ngày",
        duration_days: 3,
        total_bottles: 15,
      },
      scheduleRatio: "3:1:1",
      drinks: [],
    };

    vi.spyOn(apiClient, "post").mockResolvedValueOnce(mockResult);

    const result = await submitConsultation(mockInput);
    expect(result).toEqual(mockResult);
    expect(apiClient.post).toHaveBeenCalledWith(
      "/consultation",
      expect.objectContaining({
        goal: "WEIGHT_LOSS",
      })
    );
  });
});
