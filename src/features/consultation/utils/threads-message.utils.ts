import {
  type ThreadsMessageVariantId,
  THREADS_MESSAGE_VARIANTS,
} from "../constants/threads-message";

export interface FormatThreadsMessageParams {
  readonly variantId: ThreadsMessageVariantId;
  readonly includeMetrics: boolean;
  readonly name?: string | null;
  readonly heightCm?: number | null;
  readonly weightKg?: number | null;
  readonly planTitle: string;
  readonly goalsSummary: string;
  readonly allergies?: readonly string[] | null;
}

export function buildAllergyClause(allergies?: readonly string[] | null): string {
  if (allergies && allergies.length > 0) {
    return `mình có dị ứng: ${allergies.join(", ")}`;
  }
  return "mình không có tiền sử dị ứng";
}

export function buildIdentityClause(
  name?: string | null,
  includeMetrics?: boolean,
  heightCm?: number | null,
  weightKg?: number | null,
): string {
  const trimmedName = name?.trim();
  const hasMetrics =
    includeMetrics &&
    typeof heightCm === "number" &&
    typeof weightKg === "number";

  if (trimmedName && hasMetrics) {
    return `mình là ${trimmedName} (${heightCm}cm / ${weightKg}kg)`;
  }
  if (trimmedName) {
    return `mình là ${trimmedName}`;
  }
  if (hasMetrics) {
    return `mình (${heightCm}cm / ${weightKg}kg)`;
  }
  return "mình";
}

export function buildThreadsMessage({
  variantId,
  includeMetrics,
  name,
  heightCm,
  weightKg,
  planTitle,
  goalsSummary,
  allergies,
}: FormatThreadsMessageParams): string {
  const identity = buildIdentityClause(
    name,
    includeMetrics,
    heightCm,
    weightKg,
  );
  const allergyClause = buildAllergyClause(allergies);
  const targetGoal = goalsSummary.trim() || "thanh lọc nhẹ nhàng";
  const cleanPlanTitle = planTitle.trim() || "lộ trình thanh lọc";

  const variant =
    THREADS_MESSAGE_VARIANTS.find((v) => v.id === variantId) ||
    THREADS_MESSAGE_VARIANTS[0];

  switch (variant.id) {
    case "taste_adjustment":
      return `Chào shop, ${identity}. Mình muốn theo lộ trình ${cleanPlanTitle} để ${targetGoal} (${allergyClause}). ${variant.questionTail}`;

    case "morning_delivery":
      return `Chào shop, ${identity}. Mình đang quan tâm ${cleanPlanTitle} cho mục tiêu ${targetGoal} (${allergyClause}). ${variant.questionTail}`;

    case "light_diet":
      return `Chào shop, ${identity}. Mình định theo ${cleanPlanTitle} để ${targetGoal} (${allergyClause}). ${variant.questionTail}`;

    case "beginner_guidance": {
      const guidanceTail = includeMetrics
        ? "Nhờ shop xem thể trạng mình như vậy có cần lưu ý gì trong ngày đầu tiên không nhé!"
        : "Vì mới bắt đầu nên nhờ shop tư vấn xem mình có cần lưu ý gì trong ngày đầu tiên không nhé!";
      return `Chào shop, ${identity}. Đây là lần đầu mình tìm hiểu ${cleanPlanTitle} với mục tiêu ${targetGoal} (${allergyClause}). ${guidanceTail}`;
    }

    case "schedule_shipping":
      return `Chào shop, ${identity}. Mình muốn đăng ký ${cleanPlanTitle} để ${targetGoal} (${allergyClause}). ${variant.questionTail}`;

    default:
      return `Chào shop, ${identity}. Mình quan tâm lộ trình ${cleanPlanTitle} để ${targetGoal} (${allergyClause}). ${variant.questionTail}`;
  }
}
