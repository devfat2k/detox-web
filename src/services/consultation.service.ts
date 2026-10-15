import { apiClient } from "@/lib/api-client";
import { calculateBmi, getAsianBmiAssessment } from "@/domain/screening";
import { recommendPlan, type ExperienceLevel as DomainExpLevel } from "@/domain/recommend";
import type {
  ConsultationPayload,
  ConsultationResult,
  HealthGoal,
  ActivityLevel,
  ExperienceLevel,
  ConsultationScheduleDay,
} from "@/types/api";
import type {
  BodyFormData,
  ExperienceFormData,
  SafetyFormData,
} from "@/features/consultation/schemas/consultation.schema";

export interface ConsultationSubmissionInput {
  body: BodyFormData | null;
  safety: SafetyFormData | null;
  goals: string[];
  experience: ExperienceFormData | null;
}

const FALLBACK_SCHEDULE_ROTATIONS = [
  [
    {
      slot: 1,
      time: "07:00 - Bữa sáng",
      name: "Sinh Tố Xanh Healthy",
      role: "Chất xơ thô từ cải kale, bó xôi và hạt chia giúp êm bụng, no lâu đầu ngày",
      category: "SMOOTHIE",
      suggestedItems: ["Sinh Tố Xanh Healthy"],
    },
    {
      slot: 2,
      time: "10:00 - Bữa phụ sáng",
      name: "Nước Ép Táo + Cần Tây",
      role: "Bổ sung khoáng kali và vitamin tự nhiên, thanh lọc êm dịu giữa buổi sáng",
      category: "JUICE",
      suggestedItems: ["Nước Ép Táo + Cần Tây"],
    },
    {
      slot: 3,
      time: "13:00 - Bữa trưa",
      name: "Sinh Tố Xanh Nhiệt Đới",
      role: "Dứa chín và cải bó xôi tươi cung cấp enzyme bromelain hỗ trợ tiêu hóa",
      category: "SMOOTHIE",
      suggestedItems: ["Sinh Tố Xanh Nhiệt Đới"],
    },
    {
      slot: 4,
      time: "16:00 - Xế chiều",
      name: "Nước Ép Cam + Dứa",
      role: "Vị chua ngọt thanh mát tiếp thêm năng lượng và vitamin C cho buổi chiều",
      category: "JUICE",
      suggestedItems: ["Nước Ép Cam + Dứa"],
    },
    {
      slot: 5,
      time: "19:00 - Bữa tối",
      name: "Sữa Hạt Điều & Hạnh Nhân",
      role: "Chất béo lành mạnh giúp phục hồi cơ thể, êm dịu dạ dày và hỗ trợ giấc ngủ sâu",
      category: "NUT_MILK_TEA",
      suggestedItems: ["Sữa Hạt Điều & Hạnh Nhân"],
    },
  ],
  [
    {
      slot: 1,
      time: "07:00 - Bữa sáng",
      name: "Sinh Tố Xanh Nhiệt Đới",
      role: "Khởi động ngày mới với hương vị thơm mát từ cải bó xôi và trái cây tươi",
      category: "SMOOTHIE",
      suggestedItems: ["Sinh Tố Xanh Nhiệt Đới"],
    },
    {
      slot: 2,
      time: "10:00 - Bữa phụ sáng",
      name: "Nước Ép Dâu Tây + Bưởi + Dứa",
      role: "Chống oxy hóa, thanh lọc nhẹ nhàng và đánh thức năng lượng cơ thể",
      category: "JUICE",
      suggestedItems: ["Nước Ép Dâu Tây + Bưởi + Dứa"],
    },
    {
      slot: 3,
      time: "13:00 - Bữa trưa",
      name: "Sinh Tố Xanh Healthy",
      role: "Nạp đẫy chất xơ và diệp lục tươi giúp duy trì cảm giác nhẹ nhàng, dễ chịu",
      category: "SMOOTHIE",
      suggestedItems: ["Sinh Tố Xanh Healthy"],
    },
    {
      slot: 4,
      time: "16:00 - Xế chiều",
      name: "Nước Ép Cam + Dâu Tây",
      role: "Bổ sung vitamin tự nhiên, duy trì sự tỉnh táo và làm dịu cơn thèm ngọt",
      category: "JUICE",
      suggestedItems: ["Nước Ép Cam + Dâu Tây"],
    },
    {
      slot: 5,
      time: "19:00 - Bữa tối",
      name: "Trà Thảo Mộc Thanh Nhiệt",
      role: "Hoa cúc và kỷ tử dịu mát, giải nhiệt tự nhiên và chuẩn bị cho giấc ngủ an lành",
      category: "NUT_MILK_TEA",
      suggestedItems: ["Trà Thảo Mộc Thanh Nhiệt"],
    },
  ],
  [
    {
      slot: 1,
      time: "07:00 - Bữa sáng",
      name: "Sinh Tố Xanh Healthy",
      role: "Bổ sung chất xơ hòa tan đậm đặc, êm dịu dạ dày và tạo cảm giác no lâu tự nhiên",
      category: "SMOOTHIE",
      suggestedItems: ["Sinh Tố Xanh Healthy"],
    },
    {
      slot: 2,
      time: "10:00 - Bữa phụ sáng",
      name: "Nước Ép Táo + Cần Tây",
      role: "Bù khoáng kali và thanh lọc nhẹ nhàng, giúp đường tiêu hóa nhẹ nhõm",
      category: "JUICE",
      suggestedItems: ["Nước Ép Táo + Cần Tây"],
    },
    {
      slot: 3,
      time: "13:00 - Bữa trưa",
      name: "Sinh Tố Xanh Nhiệt Đới",
      role: "Tiếp tục duy trì nhịp năng lượng sạch và nuôi dưỡng hệ vi sinh đường ruột",
      category: "SMOOTHIE",
      suggestedItems: ["Sinh Tố Xanh Nhiệt Đới"],
    },
    {
      slot: 4,
      time: "16:00 - Xế chiều",
      name: "Nước Ép Táo + Cà Rốt + Dâu Tây",
      role: "Beta-carotene và vitamin tự nhiên làm sáng da và chống mệt mỏi cuối ngày",
      category: "JUICE",
      suggestedItems: ["Nước Ép Táo + Cà Rốt + Dâu Tây"],
    },
    {
      slot: 5,
      time: "19:00 - Bữa tối",
      name: "Sữa Hạt Điều & Hạnh Nhân",
      role: "Phục hồi năng lượng tế bào và làm dịu hệ tiêu hóa sau ngày thanh lọc",
      category: "NUT_MILK_TEA",
      suggestedItems: ["Sữa Hạt Điều & Hạnh Nhân"],
    },
  ],
];

const FALLBACK_THEMES = [
  "Khởi động & Đánh thức đường ruột",
  "Thích nghi & Tăng cường đào thải",
  "Cân bằng & Làm sạch sâu",
  "Bổ sung vi chất tự nhiên",
  "Duy trì thể trạng tươi mới",
  "Phục hồi & Hoàn thiện nhịp sinh học",
];

export function createFallbackConsultationResult(
  input: ConsultationSubmissionInput,
): ConsultationResult {
  const { body, safety, experience } = input;
  const heightCm = body?.heightCm ?? 160;
  const weightKg = body?.weightKg ?? 52;
  const bmi = calculateBmi(heightCm, weightKg);
  const assessment = getAsianBmiAssessment(heightCm, weightKg);

  let expLevel: DomainExpLevel = "never";
  if (experience?.experienceLevel === "experienced_good") {
    expLevel = "experienced_good";
  } else if (experience?.experienceLevel === "experienced_tired") {
    expLevel = "experienced_tired";
  }

  const durationChoice = experience?.durationDays ?? "auto";
  const recommendation = recommendPlan({
    experienceLevel: expLevel,
    durationChoice,
    bmi,
  });

  const durationDays =
    recommendation.planId === "1-day" ? 1 : recommendation.planId === "6-day" ? 6 : 3;
  const totalBottles = durationDays * 5;

  const dailySchedule: ConsultationScheduleDay[] = Array.from(
    { length: durationDays },
    (_, i) => ({
      day: i + 1,
      title: FALLBACK_THEMES[i] ?? `Ngày trải nghiệm ${i + 1}`,
      meals:
        FALLBACK_SCHEDULE_ROTATIONS[i % FALLBACK_SCHEDULE_ROTATIONS.length] ??
        FALLBACK_SCHEDULE_ROTATIONS[0],
    }),
  );

  const title =
    durationDays === 1
      ? "Combo Detox 1 Ngày"
      : durationDays === 3
        ? "Combo Detox 3 Ngày"
        : "Combo Detox 6 Ngày";

  return {
    bmi,
    bmiCategory: assessment?.category ?? "Thể trạng cân đối",
    dailyWaterMl: Math.round(weightKg * 35),
    safetyAlerts:
      safety?.allergies && safety.allergies.length > 0
        ? [`Nguyên liệu cần lưu ý: ${safety.allergies.join(", ")}`]
        : [],
    recommendedPlan: {
      id: recommendation.planId,
      name: title,
      slug: recommendation.planId,
      duration_days: durationDays,
      total_bottles: totalBottles,
      reason: recommendation.reason,
      description: `Lộ trình thanh lọc cơ thể trong ${durationDays} ngày với quy chuẩn 5 chai mỗi ngày từ nguyên liệu tươi nguyên chất.`,
    },
    assessment: {
      bmi,
      category: assessment?.category,
      recommendationNote: assessment?.recommendation,
    },
    scheduleRatio: "3:1:1",
    dailySchedule,
    durationDays,
    nickname: body?.name?.trim() || "Bạn",
    warnings: [],
    disclaimer:
      "Mọi thông tin và lộ trình nước ép chỉ mang tính chất tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa.",
  };
}

export function buildConsultationPayload(
  input: ConsultationSubmissionInput
): ConsultationPayload {
  const { body, safety, goals, experience } = input;

  let activityLevel: ActivityLevel = "LIGHT";
  if (body?.activityLevel === "low") {
    activityLevel = "SEDENTARY";
  } else if (body?.activityLevel === "moderate") {
    activityLevel = "LIGHT";
  } else if (body?.activityLevel === "high") {
    activityLevel = "MODERATE";
  }

  let goal: HealthGoal = "DETOX";
  if (goals.includes("weight")) {
    goal = "WEIGHT_LOSS";
  } else if (goals.includes("heat") || goals.includes("acne")) {
    goal = "BEAUTY_SKIN";
  } else if (goals.includes("digestion")) {
    goal = "DIGESTION";
  }

  const experienceLevel: ExperienceLevel =
    experience?.experienceLevel === "never" ? "BEGINNER" : "EXPERIENCED";

  const durationDays = experience?.durationDays;

  return {
    baseline: {
      nickname: body?.name?.trim() || "Bạn",
      age: body?.age ?? 28,
      weightKg: Math.max(30, Math.min(200, Math.round(body?.weightKg ?? 52))),
      heightCm: Math.max(100, Math.min(250, Math.round(body?.heightCm ?? 160))),
      activityLevel,
    },
    goal,
    preferences: {
      experienceLevel,
      canDrinkBitterOrEarthy: experience?.experienceLevel === "experienced_good",
      ...(durationDays ? { durationDays } : {}),
    },
    risks: {
      hasStomachPain: safety?.medicalConditions ?? false,
      isPregnantOrNursing: safety?.pregnantOrNursing ?? false,
      hasDiabetes: false,
      allergies: safety?.allergies ?? [],
    },
  };
}

export async function submitConsultation(
  input: ConsultationSubmissionInput
): Promise<ConsultationResult> {
  try {
    const payload = buildConsultationPayload(input);
    return await apiClient.post<unknown, ConsultationResult>("/consultation", payload);
  } catch {
    return createFallbackConsultationResult(input);
  }
}
