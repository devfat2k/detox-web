export type DrinkCategory = "smoothie_green" | "juice" | "nut_milk_tea";

export interface Drink {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly category?: DrinkCategory;
  readonly categoryName?: string;
  readonly description?: string;
  readonly ingredients?: readonly string[];
  readonly benefit?: string; // Công dụng nhanh
  readonly color?: "green" | "warm" | "soft";
  readonly level?: number;
  readonly isDetoxCore?: boolean; // Món chủ lực trong các set Detox
  readonly calories?: number;
  readonly imageUrl?: string;
}

export const DRINK_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "smoothie_green", label: "Sinh tố xanh" },
  { id: "juice", label: "Nước ép tươi & mix" },
  { id: "nut_milk_tea", label: "Sữa hạt & Trà" },
] as const;

/**
 * Dữ liệu mock dự phòng duy nhất (1 món mẫu) phòng trường hợp API gặp sự cố.
 * Toàn bộ dữ liệu thực đơn chính thức được nạp qua Backend API.
 */
export const INITIAL_DRINKS: readonly Drink[] = [
  {
    id: "1",
    slug: "sinh-to-xanh-healthy",
    name: "Sinh Tố Xanh Healthy",
    category: "smoothie_green",
    categoryName: "Sinh tố xanh",
    description: "Hỗn hợp diệp lục và chất xơ đậm đặc từ cải bó xôi, cải kale kết hợp chuối và hạt chia giàu Omega-3.",
    ingredients: ["Cải bó xôi", "Cải kale", "Chuối", "Hạt chia", "Hạt lanh"],
    benefit: "Bổ sung chất xơ hòa tan đậm đặc, êm dịu dạ dày, tạo cảm giác no lâu tự nhiên",
    color: "green",
    level: 85,
    isDetoxCore: true,
    calories: 145,
  },
] as const;

export const DRINKS_DATA: readonly Drink[] = INITIAL_DRINKS;
