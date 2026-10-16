import { type PlanId } from "./plans";

export interface PricingCombo {
  readonly id: PlanId;
  readonly title: string;
  readonly durationDays: number;
  readonly totalBottles: number;
  readonly originalPrice?: number;
  readonly price: number;
  readonly unit: string;
  readonly isRecommendedDefault?: boolean;
  readonly badgeText?: string;
  readonly itemsSummary: readonly string[];
  readonly benefits: readonly string[];
}

export function formatVndPrice(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export const PRICING_COMBOS: readonly PricingCombo[] = [
  {
    id: "1-day",
    title: "Combo detox 1 ngày",
    durationDays: 1,
    totalBottles: 5,
    price: 195000,
    unit: "5 chai",
    itemsSummary: [
      "3 sinh tố xanh",
      "1 nước ép",
      "1 sữa hạt hoặc trà thảo mộc",
    ],
    benefits: [
      "Khởi động làm quen với nước ép tươi",
      "Nhẹ bụng, thanh nhiệt nhanh trong 24 giờ",
    ],
  },
  {
    id: "3-day",
    title: "Combo detox 3 ngày",
    durationDays: 3,
    totalBottles: 15,
    price: 570000,
    unit: "15 chai",
    itemsSummary: [
      "3 sinh tố xanh",
      "1 nước ép",
      "1 sữa hạt hoặc trà thảo mộc",
    ],
    benefits: [
      "Liệu trình thanh lọc chuyên sâu",
      "Hỗ trợ giảm mỡ – cải thiện tiêu hoá",
    ],
  },
  {
    id: "6-day",
    title: "Combo detox 6 ngày",
    durationDays: 6,
    totalBottles: 30,
    originalPrice: 1110000,
    price: 999000,
    unit: "30 chai",
    itemsSummary: [
      "3 sinh tố xanh",
      "1 nước ép",
      "1 sữa hạt hoặc trà thảo mộc",
    ],
    benefits: [
      "Thanh lọc sâu – giảm mỡ rõ rệt",
      "Cơ thể nhẹ nhàng – da sáng hơn",
    ],
  },
] as const;

export const PRICING_FOOTNOTE =
  "Detox nên uống 3 – 6 ngày liên tục để đạt hiệu quả tốt nhất.";
