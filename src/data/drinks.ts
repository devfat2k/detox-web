export type DrinkCategory = "green" | "root" | "citrus" | "nut-milk";

export interface Drink {
  slug: string;
  name: string;
  category: DrinkCategory;
  categoryName: string;
  description: string;
  ingredients: readonly string[];
}

export const DRINKS_DATA: readonly Drink[] = [
  {
    slug: "ep-can-tay-tao",
    name: "Xanh Tươi Cần Tây Táo",
    category: "green",
    categoryName: "Nước ép xanh",
    description: "Vị thanh mát dễ uống kết hợp giữa cần tây Đà Lạt tươi và táo giòn ngọt tự nhiên.",
    ingredients: ["Cần tây", "Táo xanh", "Dưa chuột", "Chanh tươi"],
  },
  {
    slug: "ep-ca-rot-cam-gung",
    name: "Cam Cà Rốt Ấm Nồng",
    category: "root",
    categoryName: "Củ quả giàu vitamin",
    description: "Sắc cam tự nhiên giàu beta-carotene, điểm chút gừng tươi ấm bụng và tăng sức đề kháng.",
    ingredients: ["Cà rốt", "Cam tươi", "Gừng sẻ", "Táo đỏ"],
  },
  {
    slug: "ep-cu-den-dua-thom",
    name: "Đỏ Rực Củ Dền Thơm",
    category: "root",
    categoryName: "Củ quả giàu vitamin",
    description: "Vị ngọt dịu từ củ dền kết hợp dứa thơm chín cây, hỗ trợ tuần hoàn và giải nhiệt.",
    ingredients: ["Củ dền", "Dứa chín", "Dưa hấu", "Chanh vàng"],
  },
  {
    slug: "ep-cai-kale-dua-leo",
    name: "Xanh Đậm Kale Dưa Leo",
    category: "green",
    categoryName: "Nước ép xanh",
    description: "Hàm lượng diệp lục dồi dào từ cải xoăn kale hữu cơ, bổ sung khoáng chất tự nhiên.",
    ingredients: ["Cải xoăn Kale", "Dưa leo", "Bạc hà", "Táo xanh"],
  },
] as const;
