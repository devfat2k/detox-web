export type PlanId = "1-day" | "3-day" | "6-day";

export interface Plan {
  id: PlanId;
  title: string;
  durationDays: number;
  description: string;
  tagline: string;
}

export const PLANS_DATA: readonly Plan[] = [
  {
    id: "1-day",
    title: "Liệu trình Khởi đầu 1 ngày",
    durationDays: 1,
    description: "Thanh lọc nhẹ nhàng trong 1 ngày, thích hợp cho người mới bắt đầu làm quen với nước ép tươi.",
    tagline: "Khởi đầu nhẹ nhàng, cảm nhận cơ thể tươi mới trong 24 giờ.",
  },
  {
    id: "3-day",
    title: "Liệu trình Cân bằng 3 ngày",
    durationDays: 3,
    description: "Lộ trình cân bằng 3 ngày giúp hệ tiêu hóa được nghỉ ngơi và hỗ trợ giảm cảm giác nặng bụng.",
    tagline: "3 ngày làm mới năng lượng và hỗ trợ thanh lọc cơ thể.",
  },
  {
    id: "6-day",
    title: "Liệu trình Chuyên sâu 6 ngày",
    durationDays: 6,
    description: "Liệu trình trải nghiệm toàn diện 6 ngày dành cho người đã có kinh nghiệm dùng nước ép xanh.",
    tagline: "Trải nghiệm chuyên sâu, duy trì thói quen dinh dưỡng thực vật lành mạnh.",
  },
] as const;

export const VALID_PLAN_IDS: readonly PlanId[] = ["1-day", "3-day", "6-day"];

export function isValidPlanId(id: string): id is PlanId {
  return VALID_PLAN_IDS.includes(id as PlanId);
}
