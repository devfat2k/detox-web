export interface HeroSampleSchedule {
  readonly time: string;
  readonly name: string;
  readonly role: string;
}

export interface HeroBottleShowcase {
  readonly name: string;
  readonly label: string;
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
}

export const HERO_SAMPLE_SCHEDULE: readonly HeroSampleSchedule[] = [
  { time: "07:00", name: "Cần tây táo xanh", role: "Đánh thức tiêu hóa" },
  { time: "10:00", name: "Cà rốt cam gừng", role: "Năng lượng nhẹ" },
  { time: "13:00", name: "Củ dền táo đỏ", role: "Cân bằng sinh học" },
  { time: "16:00", name: "Dưa leo bạc hà", role: "Thanh mát cơ thể" },
  { time: "19:00", name: "Bí đao hạt sen", role: "Êm dịu đường ruột" },
] as const;

export const HERO_SHOWCASE_BOTTLES: readonly HeroBottleShowcase[] = [
  { name: "Sinh tố xanh", label: "Cần tây kale", color: "green", level: 75 },
  { name: "Nước ép tươi", label: "Cà rốt cam dền", color: "warm", level: 85 },
  { name: "Sữa hạt tối", label: "Hạt sen hạnh nhân", color: "soft", level: 70 },
] as const;
