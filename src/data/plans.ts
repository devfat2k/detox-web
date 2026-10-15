export type PlanId = "1-day" | "3-day" | "6-day";

export interface PlanBottle {
  readonly time: string;
  readonly name: string;
  readonly desc?: string;
  readonly drinkSlug: string;
  readonly color?: "green" | "warm" | "soft";
  readonly level?: number;
  readonly bottleType?: "smoothie" | "juice" | "nut_milk" | "herbal_tea";
  readonly slotName?: string;
}

export interface PlanDaySchedule {
  readonly dayNumber: number;
  readonly theme?: string;
  readonly bottles: readonly PlanBottle[];
}

export interface Plan {
  readonly id: PlanId;
  readonly title: string;
  readonly durationDays: number;
  readonly totalBottles?: number;
  readonly kcalRange?: string;
  readonly description?: string;
  readonly tagline?: string;
  readonly suitableFor?: readonly string[];
  readonly notSuitableFor?: readonly string[];
  readonly preparationGuide?: string;
  readonly recoveryGuide?: string;
  readonly days?: readonly PlanDaySchedule[];
}

/**
 * Danh sách rỗng mặc định.
 * Toàn bộ dữ liệu liệu trình chính thức được nạp qua Backend API.
 */
export const PLANS_DATA: readonly Plan[] = [];

export const VALID_PLAN_IDS: readonly PlanId[] = ["1-day", "3-day", "6-day"];

export function isValidPlanId(id: string): id is PlanId {
  return VALID_PLAN_IDS.includes(id as PlanId);
}
