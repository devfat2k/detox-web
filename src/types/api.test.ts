import { describe, it, expect } from "vitest";
import type { ApiResponse, ConsultationPayload } from "./api";

describe("API Types Contract", () => {
  it("validates successful envelope structure", () => {
    const response: ApiResponse<{ id: string }> = {
      success: true,
      statusCode: 200,
      message: "Thao tác thành công",
      data: { id: "test-1" },
      timestamp: "2026-10-15T00:00:00.000Z",
      path: "/api/test",
    };

    expect(response.success).toBe(true);
    expect(response.data.id).toBe("test-1");
  });

  it("validates consultation payload without sensitive fields", () => {
    const payload: ConsultationPayload = {
      baseline: {
        age: 25,
        weightKg: 52,
        heightCm: 160,
        activityLevel: "LIGHT",
      },
      goal: "DETOX",
      preferences: {
        experienceLevel: "BEGINNER",
        canDrinkBitterOrEarthy: false,
        durationDays: 3,
      },
      risks: {
        hasStomachPain: false,
        isPregnantOrNursing: false,
        hasDiabetes: false,
        allergies: ["Cần tây"],
      },
    };

    expect(payload.goal).toBe("DETOX");
    expect(payload.baseline.activityLevel).toBe("LIGHT");
    // Verify no sensitive fields exist
    expect((payload as unknown as Record<string, unknown>).phone).toBeUndefined();
    expect((payload as unknown as Record<string, unknown>).idCard).toBeUndefined();
  });
});
