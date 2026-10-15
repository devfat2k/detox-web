import { describe, it, expect } from "vitest";
import {
  mapApiScheduleToPlanDays,
  computeResultViewModel,
  buildConsultationSummaryText,
} from "./result-view.utils";
import { DRINKS_DATA } from "@/data/drinks";
import type { ConsultationScheduleDay, ConsultationResult } from "@/types/api";

describe("result-view.utils", () => {
  describe("mapApiScheduleToPlanDays", () => {
    it("maps daily schedule to UI plan days correctly", () => {
      const mockSchedule: ConsultationScheduleDay[] = [
        {
          day: 1,
          title: "Ngày 1: Thanh lọc nhẹ nhàng",
          meals: [
            {
              time: "07:00 - Sáng",
              name: "Nước ép cần tây",
              category: "JUICE",
              suggestedItems: ["Ép Táo Cần Tây"],
              role: "Đào thải độc tố",
            },
            {
              time: "09:30 - Phụ sáng",
              name: "Sinh tố xanh",
              category: "SMOOTHIE",
              suggestedItems: ["Sinh Tố Xanh Healthy"],
            },
            {
              time: "15:00 - Chiều",
              name: "Trà thảo mộc",
              category: "NUT_MILK_TEA",
              suggestedItems: ["Trà Thảo Mộc Thanh Nhiệt"],
            },
          ],
        },
      ];

      const days = mapApiScheduleToPlanDays(mockSchedule, DRINKS_DATA);
      expect(days).toHaveLength(1);
      expect(days[0].dayNumber).toBe(1);
      expect(days[0].theme).toBe("Ngày 1: Thanh lọc nhẹ nhàng");
      expect(days[0].bottles).toHaveLength(3);

      const [b1, b2, b3] = days[0].bottles;
      expect(b1.time).toBe("07:00");
      expect(b1.slotName).toBe("Sáng");
      expect(b1.bottleType).toBe("juice");
      expect(b1.name).toBe("Ép Táo Cần Tây");

      expect(b2.bottleType).toBe("smoothie");
      expect(b2.name).toBe("Sinh Tố Xanh Healthy");

      expect(b3.bottleType).toBe("herbal_tea");
      expect(b3.name).toBe("Trà Thảo Mộc Thanh Nhiệt");
    });

    it("applies fallbacks when meal fields are missing", () => {
      const mockSchedule: ConsultationScheduleDay[] = [
        {
          day: 2,
          meals: [
            {
              category: "JUICE",
            },
          ],
        },
      ];

      const days = mapApiScheduleToPlanDays(mockSchedule, DRINKS_DATA);
      expect(days[0].bottles[0].time).toBe("07:00");
      expect(days[0].bottles[0].slotName).toBe("Cữ 1");
      expect(days[0].bottles[0].name).toBe("Nước ép dinh dưỡng");
      expect(days[0].bottles[0].bottleType).toBe("juice");
    });
  });

  describe("computeResultViewModel", () => {
    it("computes default values when body and result are empty", () => {
      const vm = computeResultViewModel({
        body: null,
        safety: null,
        experience: null,
        goals: [],
        warningMessage: null,
        apiResult: null,
        drinks: DRINKS_DATA,
      });

      expect(vm.bmi).toBe(21.5);
      expect(vm.honorific).toBe("bạn");
      expect(vm.capitalHonorific).toBe("Bạn");
      expect(vm.displayPlan).toBeNull();
      expect(vm.allWarnings).toHaveLength(0);
      expect(vm.stepCards).toHaveLength(4);
    });

    it("computes honorific, bmi, and display plan when data is present", () => {
      const mockApiResult: ConsultationResult = {
        bmi: 22.2,
        durationDays: 3,
        recommendedPlan: {
          id: "3-day",
          name: "Combo Detox 3 Ngày",
          duration_days: 3,
          total_bottles: 15,
          reason: "Tối ưu cho mục tiêu nhẹ bụng",
        },
        assessment: {
          category: "Bình thường",
          recommendationNote: "Khuyên dùng 3 ngày",
        },
        warnings: ["Cần uống đủ nước"],
      };

      const vm = computeResultViewModel({
        body: {
          name: "Lan",
          gender: "female",
          age: 26,
          heightCm: 160,
          weightKg: 52,
          activityLevel: "moderate",
        },
        safety: {
          allergies: ["cần tây"],
          pregnantOrNursing: false,
          medicalConditions: false,
          regularMedication: false,
          eatingDisorder: false,
        },
        experience: {
          durationDays: 3,
          experienceLevel: "experienced_good",
        },
        goals: ["digestion", "weight"],
        warningMessage: "Lưu ý dạ dày",
        apiResult: mockApiResult,
        drinks: DRINKS_DATA,
      });

      expect(vm.honorific).toBe("chị Lan");
      expect(vm.capitalHonorific).toBe('Chị "Lan"');
      expect(vm.bmi).toBe(22.2);
      expect(vm.displayPlan?.title).toBe("Combo Detox 3 Ngày");
      expect(vm.displayPlan?.durationDays).toBe(3);
      expect(vm.displayPlan?.totalBottles).toBe(15);
      expect(vm.allWarnings).toEqual(["Lưu ý dạ dày", "Cần uống đủ nước"]);
      expect(vm.stepCards[0].title).toBe("Lan · Nữ · 26 tuổi");
      expect(vm.stepCards[3].title).toBe("Dị ứng: cần tây");
    });
  });

  describe("buildConsultationSummaryText", () => {
    it("formats summary string accurately", () => {
      const text = buildConsultationSummaryText({
        displayPlan: {
          id: "3-day",
          title: "Combo Detox 3 Ngày",
          durationDays: 3,
          totalBottles: 15,
          days: [],
        },
        capitalHonorific: 'Chị "Lan"',
        body: {
          name: "Lan",
          gender: "female",
          age: 26,
          heightCm: 160,
          weightKg: 52,
          activityLevel: "moderate",
        },
        bmi: 20.3,
        apiResult: {
          assessment: { category: "Cân đối" },
        },
        goalsSummary: "nặng bụng, đầy hơi, khó tiêu",
        safety: {
          allergies: ["dứa"],
          pregnantOrNursing: false,
          medicalConditions: false,
          regularMedication: false,
          eatingDisorder: false,
        },
      });

      expect(text).toContain('Thông tin tư vấn cho Chị "Lan":');
      expect(text).toContain("Combo Detox 3 Ngày (3 ngày · 15 chai)");
      expect(text).toContain("Chiều cao 160cm, Cân nặng 52kg (BMI ~20.3 · Cân đối)");
      expect(text).toContain("Mục tiêu quan tâm: nặng bụng, đầy hơi, khó tiêu");
      expect(text).toContain("Dị ứng ghi nhận: dứa");
      expect(text).toContain("Ép Xanh Chữa Lành · Nông sản tươi ép chậm mỗi sáng");
    });
  });
});
