export interface WelcomeGreetingConfig {
  readonly brandName: string;
  readonly locationNotice: string;
  readonly baseMessage: string;
  readonly textStartDelayMs: number;
  readonly charTypingMs: number;
  readonly skipHint: string;
}

export function getTimeGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return "Chào buổi sáng bạn,";
  if (hour >= 11 && hour < 14) return "Chào buổi trưa bạn,";
  if (hour >= 14 && hour < 18) return "Chào buổi chiều bạn,";
  return "Chào buổi tối bạn,";
}

export const WELCOME_GREETING_CONFIG: WelcomeGreetingConfig = {
  brandName: "Ép Xanh Chữa Lành",
  locationNotice: "Giao tươi mỗi sáng tại TP. Hồ Chí Minh",
  baseMessage:
    "Một tiệm nhỏ chuẩn bị nước ép từ rau củ quả tươi tự nhiên mỗi sáng sớm, gửi gắm chút thanh lành và dịu êm đến cơ thể bạn sau những bộn bề. Tụi mình chuẩn bị chu đáo và giao tươi trong ngày đến bạn tại khu vực TP. Hồ Chí Minh. Mong bạn luôn tìm thấy sự nhẹ nhõm, an yên và được vỗ về mỗi ngày nhé.",
  textStartDelayMs: 600,
  charTypingMs: 26,
  skipHint: "Nhấn để đọc toàn bộ",
} as const;
