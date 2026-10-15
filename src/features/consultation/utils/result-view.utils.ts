import { calculateBmi } from "@/domain/screening";
import { type Plan, type PlanDaySchedule, type PlanId } from "@/data/plans";
import { type Drink as UIDrink } from "@/data/drinks";
import { routes } from "@/config/routes";
import type { Route } from "next";
import type { ConsultationScheduleDay, ConsultationResult } from "@/types/api";
import type {
  BodyFormData,
  ExperienceFormData,
  SafetyFormData,
} from "../schemas/consultation.schema";
import {
  ACTIVITY_LABELS,
  GOAL_LABELS,
  GOAL_SHORT_NAMES,
  EXPERIENCE_LABELS,
} from "../constants";

export interface StepCardItem {
  readonly step: string;
  readonly title: string;
  readonly detail: string;
  readonly route: Route;
}

export interface ResultViewModel {
  readonly bmi: number;
  readonly honorific: string;
  readonly capitalHonorific: string;
  readonly goalsSummary: string;
  readonly recommendationReason: string;
  readonly displayPlan: Plan | null;
  readonly allWarnings: readonly string[];
  readonly stepCards: readonly StepCardItem[];
}

// ponytail: map trực tiếp lịch uống API vào UI Plan, nâng cấp khi cần đồng bộ chi tiết dinh dưỡng từng chai từ backend
export function mapApiScheduleToPlanDays(
  dailySchedule: readonly ConsultationScheduleDay[],
  drinks: readonly UIDrink[],
): readonly PlanDaySchedule[] {
  return dailySchedule.map((daySchedule, dayIdx) => {
    const dayNumber = daySchedule.day ?? dayIdx + 1;
    const theme =
      daySchedule.title ?? `Ngày ${dayNumber}: Nhịp điệu thanh lọc cân bằng`;

    const bottles = (daySchedule.meals ?? []).map((meal, mealIdx) => {
      const [timePart, slotPart] = (meal.time ?? "").split(" - ");
      const time = timePart?.trim() || "07:00";
      const slotName = slotPart?.trim() || meal.name || `Cữ ${mealIdx + 1}`;
      const suggestedName = meal.suggestedItems?.[0];

      const matchedDrink = suggestedName
        ? drinks.find(
            (d) =>
              d.name.toLowerCase() === suggestedName.toLowerCase() ||
              d.slug === suggestedName.toLowerCase(),
          )
        : undefined;

      const isTea = suggestedName?.toLowerCase().includes("trà");
      const bottleType: "smoothie" | "juice" | "nut_milk" | "herbal_tea" =
        meal.category === "JUICE"
          ? "juice"
          : meal.category === "NUT_MILK_TEA"
            ? (isTea ? "herbal_tea" : "nut_milk")
            : "smoothie";

      const fallbackColor =
        bottleType === "smoothie"
          ? "green"
          : bottleType === "juice"
            ? "warm"
            : "soft";

      return {
        time,
        slotName,
        name: suggestedName || meal.name || "Nước ép dinh dưỡng",
        desc:
          meal.role ||
          matchedDrink?.benefit ||
          "Bổ sung vi chất tự nhiên cho cơ thể",
        drinkSlug:
          matchedDrink?.slug ||
          (bottleType === "smoothie"
            ? "sinh-to-xanh-healthy"
            : bottleType === "juice"
              ? "ep-tao-can-tay"
              : "tra-thao-moc-thanh-nhiet"),
        color: matchedDrink?.color || fallbackColor,
        level: matchedDrink?.level || 80,
        bottleType,
      };
    });

    return { dayNumber, theme, bottles };
  });
}

export function computeResultViewModel({
  body,
  safety,
  experience,
  goals,
  warningMessage,
  apiResult,
  drinks,
}: {
  body: BodyFormData | null;
  safety: SafetyFormData | null;
  experience: ExperienceFormData | null;
  goals: readonly string[];
  warningMessage: string | null;
  apiResult: ConsultationResult | null | undefined;
  drinks: readonly UIDrink[];
}): ResultViewModel {
  const clientBmi = body ? calculateBmi(body.heightCm, body.weightKg) : 21.5;
  const bmi = apiResult?.bmi ?? apiResult?.assessment?.bmi ?? clientBmi;

  const rawName = body?.name?.trim();
  const prefix = body?.gender === "female" ? "chị" : "bạn";
  const honorific = rawName ? `${prefix} ${rawName}` : prefix;
  const capitalPrefix = body?.gender === "female" ? "Chị" : "Bạn";
  const capitalHonorific = rawName
    ? `${capitalPrefix} "${rawName}"`
    : capitalPrefix;

  const goalsSummary =
    goals.length > 0
      ? goals.map((g) => GOAL_LABELS[g] || g).join(", ")
      : "cảm giác đường tiêu hóa cần được nghỉ ngơi nhẹ nhàng";

  let displayPlan: Plan | null = null;
  if (apiResult?.recommendedPlan) {
    const durationDays =
      apiResult.recommendedPlan.duration_days ??
      apiResult.durationDays ??
      experience?.durationDays ??
      3;

    const totalBottles =
      apiResult.recommendedPlan.total_bottles ?? durationDays * 5;
    const title =
      apiResult.recommendedPlan.name ??
      (durationDays === 1
        ? "Combo Detox 1 Ngày"
        : durationDays === 3
          ? "Combo Detox 3 Ngày"
          : "Combo Detox 6 Ngày");

    const days =
      apiResult.dailySchedule && apiResult.dailySchedule.length > 0
        ? mapApiScheduleToPlanDays(apiResult.dailySchedule, drinks)
        : [];

    displayPlan = {
      id: (apiResult.recommendedPlan.id as PlanId) || `${durationDays}-day`,
      title,
      durationDays,
      totalBottles,
      days,
      description: apiResult.recommendedPlan.description,
    };
  }

  const recommendationReason =
    apiResult?.recommendedPlan?.reason ??
    apiResult?.assessment?.recommendationNote ??
    "Lộ trình được cân đối tỉ lệ 3 Sinh tố : 1 Nước ép : 1 Sữa hạt/Trà giúp cơ thể thích nghi êm ái.";

  const allWarnings = [
    ...(warningMessage ? [warningMessage] : []),
    ...(apiResult?.warnings ?? apiResult?.safetyAlerts ?? []),
  ];

  const stepCards: readonly StepCardItem[] = [
    {
      step: "01. Thông tin cơ thể",
      title: `${body?.name || "Bạn"} · ${body?.gender === "male" ? "Nam" : "Nữ"} · ${body?.age ?? "--"} tuổi`,
      detail: `${body?.heightCm ?? "--"}cm · ${body?.weightKg ?? "--"}kg (BMI ~${bmi})${body?.activityLevel ? ` · ${ACTIVITY_LABELS[body.activityLevel]}` : ""}`,
      route: routes.consultation(),
    },
    {
      step: "02. Nhu cầu & Mục tiêu",
      title:
        goals.length > 0
          ? goals.map((g) => GOAL_SHORT_NAMES[g] ?? g).join(", ")
          : "Chưa chọn",
      detail: "",
      route: routes.consultationGoals(),
    },
    {
      step: "03. Kinh nghiệm & Thời gian",
      title: experience?.durationDays
        ? `Gói ${experience.durationDays} ngày`
        : "Chưa chọn",
      detail: experience?.experienceLevel
        ? EXPERIENCE_LABELS[experience.experienceLevel]
        : "Chưa có kinh nghiệm",
      route: routes.consultationExperience(),
    },
    {
      step: "04. Lưu ý & Dị ứng",
      title: safety?.allergies?.length
        ? `Dị ứng: ${safety.allergies.join(", ")}`
        : "Không dị ứng nguyên liệu nào",
      detail:
        safety?.pregnantOrNursing ||
        safety?.medicalConditions ||
        safety?.regularMedication ||
        safety?.eatingDisorder
          ? "Có tiền sử bệnh/thuốc"
          : "Sức khỏe cơ bản ổn định",
      route: routes.consultationSafety(),
    },
  ];

  return {
    bmi,
    honorific,
    capitalHonorific,
    goalsSummary,
    recommendationReason,
    displayPlan,
    allWarnings,
    stepCards,
  };
}

export function buildConsultationSummaryText({
  displayPlan,
  capitalHonorific,
  body,
  bmi,
  apiResult,
  goalsSummary,
  safety,
}: {
  displayPlan: Plan;
  capitalHonorific: string;
  body: BodyFormData | null;
  bmi: number;
  apiResult: ConsultationResult | null | undefined;
  goalsSummary: string;
  safety: SafetyFormData | null;
}): string {
  return `[Ép Xanh Chữa Lành] Thông tin tư vấn cho ${capitalHonorific}:
- Lộ trình đề xuất: ${displayPlan.title} (${displayPlan.durationDays} ngày · ${displayPlan.totalBottles} chai)
- Thể trạng: Chiều cao ${body?.heightCm ?? 160}cm, Cân nặng ${body?.weightKg ?? 52}kg (BMI ~${bmi}${apiResult?.assessment?.category ? ` · ${apiResult.assessment.category}` : ""})
- Mục tiêu quan tâm: ${goalsSummary}
- Dị ứng ghi nhận: ${safety?.allergies?.length ? safety.allergies.join(", ") : "Không có"}
- Cơ cấu mỗi ngày: 5 chai (3 Sinh tố xanh + 1 Nước ép tươi + 1 Sữa hạt/Trà thảo mộc)
*Em gửi shop xem qua thực đơn và hỗ trợ tư vấn chi tiết giúp em nhé!
Ép Xanh Chữa Lành · Nông sản tươi ép chậm mỗi sáng`;
}
