export type ExperienceLevel = "never" | "experienced_good" | "experienced_tired";
export type DurationChoice = 1 | 3 | 6 | "auto";
export type PlanId = "1-day" | "3-day" | "6-day";

export interface RecommendationInput {
  experienceLevel: ExperienceLevel;
  durationChoice: DurationChoice;
  bmi: number;
}

export interface RecommendationResult {
  planId: PlanId;
  reason: string;
}

export function recommendPlan(input: RecommendationInput): RecommendationResult {
  if (input.durationChoice === 1) {
    return {
      planId: "1-day",
      reason: "Liệu trình 1 ngày theo đúng lựa chọn mong muốn của bạn.",
    };
  }

  if (input.durationChoice === 3) {
    return {
      planId: "3-day",
      reason: "Liệu trình 3 ngày theo đúng lựa chọn mong muốn của bạn.",
    };
  }

  if (input.durationChoice === 6) {
    return {
      planId: "6-day",
      reason: "Liệu trình 6 ngày theo đúng lựa chọn mong muốn của bạn.",
    };
  }

  if (input.experienceLevel === "never") {
    return {
      planId: "3-day",
      reason: "Gói Cân bằng 3 ngày là nhịp độ chuẩn nhất cho người mới bắt đầu làm quen.",
    };
  }

  if (input.experienceLevel === "experienced_tired") {
    return {
      planId: "1-day",
      reason: "Gói Khởi đầu 1 ngày giúp bạn thư giãn đường ruột nhẹ nhàng mà không tạo áp lực mệt mỏi.",
    };
  }

  if (input.experienceLevel === "experienced_good" && input.bmi >= 20) {
    return {
      planId: "6-day",
      reason: "Thể trạng và kinh nghiệm của bạn rất phù hợp để trải nghiệm chu kỳ Chuyên sâu 6 ngày.",
    };
  }

  return {
    planId: "3-day",
    reason: "Gói Cân bằng 3 ngày giúp bạn duy trì năng lượng tích cực và bảo toàn dưỡng chất.",
  };
}
