export interface ActivityOption {
  id: "low" | "moderate" | "high";
  label: string;
  desc: string;
}

export const ACTIVITY_OPTIONS: readonly ActivityOption[] = [
  {
    id: "low",
    label: "Ít vận động",
    desc: "Làm việc văn phòng, ít đi lại hoặc tập luyện nhẹ dưới 1 buổi/tuần",
  },
  {
    id: "moderate",
    label: "Vận động vừa phải",
    desc: "Đi lại thường xuyên hoặc tập thể dục nhẹ nhàng 2–3 buổi/tuần",
  },
  {
    id: "high",
    label: "Năng động",
    desc: "Chơi thể thao thường xuyên, lao động thể chất hoặc tập gym 4+ buổi/tuần",
  },
] as const;

// ponytail: derive từ ACTIVITY_OPTIONS, mở rộng khi thêm option mới
export const ACTIVITY_LABELS: Record<string, string> = Object.fromEntries(
  ACTIVITY_OPTIONS.map((o) => [o.id, o.label]),
);

export const GOAL_LABELS: Record<string, string> = {
  digestion: "nặng bụng, đầy hơi, khó tiêu",
  weight: "hỗ trợ giảm mỡ & nhẹ nhõm vòng eo",
  heat: "nóng trong, tích tụ dầu mỡ",
  acne: "da sạm, mệt mỏi, thiếu năng lượng",
  sleep: "uể oải, khó ngủ sâu giấc",
  other: "thanh lọc định kỳ & duy trì lối sống xanh",
};

export const GOAL_SHORT_NAMES: Record<string, string> = {
  digestion: "Tiêu hóa & Nhẹ bụng",
  weight: "Giảm mỡ & Vòng eo",
  heat: "Thanh nhiệt & Giảm nóng",
  acne: "Sáng da & Năng lượng",
  sleep: "Ngủ sâu & Tĩnh dưỡng",
  other: "Lối sống xanh định kỳ",
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  never: "Mới bắt đầu",
  experienced_good: "Đã quen, thích ứng tốt",
  experienced_tired: "Đã từng nhưng thấy mệt",
};

export const AGE_PRESETS = [20, 22, 25, 28, 30, 35, 40, 50] as const;
export const HEIGHT_PRESETS = [145, 150, 155, 158, 160, 165, 170, 175] as const;
export const WEIGHT_PRESETS = [45, 48, 50, 52, 55, 58, 62, 68] as const;
