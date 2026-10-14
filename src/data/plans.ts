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

const FALLBACK_BOTTLES: readonly PlanBottle[] = [
  {
    time: "07:00",
    name: "Sinh Tố Xanh Healthy",
    desc: "Chất xơ thô từ cải kale, bó xôi và hạt chia giúp êm bụng, no lâu đầu ngày",
    drinkSlug: "sinh-to-xanh-healthy",
    color: "green",
    level: 85,
    bottleType: "smoothie",
    slotName: "Bữa sáng",
  },
];

const COMMON_SUITABLE = [
  "Người muốn cho hệ tiêu hóa nghỉ ngơi sau chuỗi ngày ăn uống nhiều dầu mỡ",
  "Người cần bổ sung thêm rau củ tươi và nước tự nhiên vào thói quen hàng ngày",
] as const;

const COMMON_NOT_SUITABLE = [
  "Phụ nữ đang mang thai hoặc trong giai đoạn cho con bú",
  "Người có tiền sử huyết áp thấp nặng, bệnh thận hoặc viêm loét dạ dày cấp",
] as const;

const COMMON_PREP =
  "Trước khi bắt đầu 1–2 ngày, bạn nên uống nhiều nước lọc, giảm dần lượng thịt đỏ và đồ chiên rán.";

const COMMON_RECOVERY =
  "Sau khi kết thúc liệu trình, hãy bắt đầu lại bằng các món ấm loãng như cháo yến mạch hoặc súp rau củ.";

/**
 * Dữ liệu mock dự phòng duy nhất (1 gói mẫu) phòng trường hợp API gặp sự cố.
 * Toàn bộ dữ liệu liệu trình chính thức được nạp qua Backend API.
 */
export const PLANS_DATA: readonly Plan[] = [
  {
    id: "1-day",
    title: "Liệu trình Khởi đầu 1 ngày",
    durationDays: 1,
    totalBottles: 5,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Thanh lọc nhẹ nhàng trong 1 ngày với quy chuẩn nước ép và sinh tố xanh giúp êm bụng.",
    tagline: "Khởi đầu nhẹ nhàng, cảm nhận cơ thể tươi mới trong 24 giờ.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: [
      {
        dayNumber: 1,
        theme: "Khởi động & Đánh thức đường ruột",
        bottles: FALLBACK_BOTTLES,
      },
    ],
  },
] as const;

export const VALID_PLAN_IDS: readonly PlanId[] = ["1-day", "3-day", "6-day"];

export function isValidPlanId(id: string): id is PlanId {
  return VALID_PLAN_IDS.includes(id as PlanId);
}
