export interface HonestStatItem {
  readonly value: string;
  readonly label: string;
  readonly description: string;
}

export const HONEST_STATS: readonly HonestStatItem[] = [
  {
    value: "100%",
    label: "Nông sản tươi ép",
    description:
      "Rau củ quả tươi từ các nông trại Việt Nam, ép chậm nguyên chất mỗi sáng.",
  },
  {
    value: "0",
    label: "Đường cát và phụ gia",
    description:
      "Vị ngọt hoàn toàn tự nhiên từ táo, dứa, cà rốt và củ dền tươi nguyên.",
  },
  {
    value: "3",
    label: "Lộ trình thực tế",
    description:
      "Một, ba hoặc sáu ngày vừa vặn với nhịp sinh hoạt và thể trạng thực tế của bạn.",
  },
] as const;
