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

export const AGE_PRESETS = [20, 22, 25, 28, 30, 35, 40, 50] as const;
export const HEIGHT_PRESETS = [145, 150, 155, 158, 160, 165, 170, 175] as const;
export const WEIGHT_PRESETS = [45, 48, 50, 52, 55, 58, 62, 68] as const;
