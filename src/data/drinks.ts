export type DrinkCategory = "green" | "root";

export interface Drink {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly category: DrinkCategory;
  readonly categoryName: string;
  readonly description: string;
  readonly ingredients: readonly string[];
  readonly benefit: string; // Công dụng nhanh
  readonly color: "green" | "warm";
  readonly level: number;
}

export const DRINK_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "green", label: "Nước ép xanh" },
  { id: "root", label: "Củ quả tươi" },
] as const;

export const INITIAL_DRINKS: readonly Drink[] = [
  {
    id: "1",
    slug: "ep-can-tay-tao",
    name: "Xanh Tươi Cần Tây Táo",
    category: "green",
    categoryName: "Nước ép xanh",
    description: "Vị thanh mát dễ uống kết hợp giữa cần tây Đà Lạt tươi và táo giòn ngọt tự nhiên.",
    ingredients: ["Cần tây", "Táo xanh", "Dưa leo", "Chanh tươi"],
    benefit: "Hỗ trợ tiêu hóa nhẹ nhàng, tạo cảm giác thanh mát đầu ngày",
    color: "green",
    level: 60,
  },
  {
    id: "2",
    slug: "ep-ca-rot-cam-gung",
    name: "Cam Cà Rốt Ấm Nồng",
    category: "root",
    categoryName: "Củ quả tươi",
    description: "Sắc cam tự nhiên giàu beta-carotene, điểm chút gừng tươi ấm bụng và tăng sức đề kháng.",
    ingredients: ["Cà rốt", "Cam tươi", "Gừng sẻ", "Táo đỏ"],
    benefit: "Bổ sung vitamin A tự nhiên, ấm bụng giữa các bữa ăn",
    color: "warm",
    level: 75,
  },
  {
    id: "3",
    slug: "ep-cai-kale-dua-leo",
    name: "Xanh Đậm Kale Dưa Leo",
    category: "green",
    categoryName: "Nước ép xanh",
    description: "Hàm lượng diệp lục dồi dào từ cải xoăn kale hữu cơ, bổ sung khoáng chất tự nhiên.",
    ingredients: ["Cải xoăn Kale", "Dưa leo", "Bạc hà", "Táo xanh"],
    benefit: "Cung cấp diệp lục thực vật và khoáng chất tự nhiên",
    color: "green",
    level: 70,
  },
  {
    id: "4",
    slug: "ep-cu-den-dua-thom",
    name: "Đỏ Rực Củ Dền Thơm",
    category: "root",
    categoryName: "Củ quả tươi",
    description: "Vị ngọt dịu từ củ dền kết hợp dứa thơm chín cây, hỗ trợ tuần hoàn và giải nhiệt.",
    ingredients: ["Củ dền", "Dứa chín", "Dưa hấu", "Chanh vàng"],
    benefit: "Hỗ trợ tuần hoàn máu, giải nhiệt buổi chiều nhẹ nhàng",
    color: "warm",
    level: 80,
  },
] as const;

export const DRINKS_DATA: readonly Drink[] = INITIAL_DRINKS;
