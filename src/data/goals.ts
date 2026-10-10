export interface HealthGoal {
  id: string;
  label: string;
  description: string;
}

export const HEALTH_GOALS_DATA: readonly HealthGoal[] = [
  {
    id: "giam-day-bung",
    label: "Giảm đầy bụng & nhẹ nhõm",
    description: "Giúp đường tiêu hóa nghỉ ngơi sau chuỗi ngày ăn uống nhiều dầu mỡ.",
  },
  {
    id: "thanh-loc-co-the",
    label: "Thanh lọc & làm mới năng lượng",
    description: "Bổ sung lượng lớn vi chất tự nhiên từ rau củ quả tươi sống.",
  },
  {
    id: "cai-thien-da",
    label: "Hỗ trợ làn da tươi tắn",
    description: "Tăng cường chất chống oxy hóa và cấp nước tự nhiên cho tế bào da.",
  },
  {
    id: "thiet-lap-thoi-quen",
    label: "Tạo thói quen ăn uống lành mạnh",
    description: "Bước đệm để làm quen với lối sống ưu tiên thực vật và rau xanh.",
  },
] as const;
