export type DrinkCategory = "smoothie_green" | "juice" | "nut_milk_tea";

export interface Drink {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly category: DrinkCategory;
  readonly categoryName: string;
  readonly description: string;
  readonly ingredients: readonly string[];
  readonly benefit: string; // Công dụng nhanh
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
  readonly isDetoxCore?: boolean; // Món chủ lực trong các set Detox
}

export const DRINK_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "smoothie_green", label: "Sinh tố xanh" },
  { id: "juice", label: "Nước ép tươi & mix" },
  { id: "nut_milk_tea", label: "Sữa hạt & Trà" },
] as const;

export const INITIAL_DRINKS: readonly Drink[] = [
  {
    id: "1",
    slug: "sinh-to-xanh-healthy",
    name: "Sinh Tố Xanh Healthy",
    category: "smoothie_green",
    categoryName: "Sinh tố xanh",
    description: "Hỗn hợp diệp lục và chất xơ đậm đặc từ cải bó xôi, cải kale kết hợp vị ngọt dịu của dâu tây, chuối cùng hạt chia, hạt lanh giàu Omega-3.",
    ingredients: ["Cải bó xôi", "Cải kale", "Dâu tây", "Chuối", "Hạt chia", "Hạt lanh"],
    benefit: "Bổ sung chất xơ hòa tan đậm đặc, êm dịu dạ dày, tạo cảm giác no lâu tự nhiên",
    color: "green",
    level: 85,
    isDetoxCore: true,
  },
  {
    id: "2",
    slug: "sinh-to-xanh-nhiet-doi",
    name: "Sinh Tố Xanh Nhiệt Đới",
    category: "smoothie_green",
    categoryName: "Sinh tố xanh",
    description: "Hương vị nhiệt đới bừng tỉnh giác quan từ dứa chín cây, xoài, táo kết hợp cùng cải bó xôi tươi ép chậm và hạt dinh dưỡng.",
    ingredients: ["Cải bó xôi", "Chuối", "Táo", "Xoài", "Dứa", "Hạt chia", "Hạt lanh"],
    benefit: "Cung cấp enzyme bromelain tự nhiên hỗ trợ tiêu hóa thức ăn và giải nhiệt sâu",
    color: "green",
    level: 80,
    isDetoxCore: true,
  },
  {
    id: "3",
    slug: "ep-can-tay-tao",
    name: "Nước Ép Táo + Cần Tây",
    category: "juice",
    categoryName: "Nước ép tươi & mix",
    description: "Cần tây Đà Lạt tươi ép chậm cùng táo xanh giòn ngọt và chút chanh tươi, vị thanh mát đầu ngày.",
    ingredients: ["Cần tây", "Táo xanh", "Dưa leo", "Chanh tươi"],
    benefit: "Hỗ trợ tiêu hóa nhẹ nhàng, bù khoáng kali và thanh lọc êm dịu đầu ngày",
    color: "green",
    level: 65,
    isDetoxCore: true,
  },
  {
    id: "4",
    slug: "ep-cam-dua",
    name: "Nước Ép Cam + Dứa",
    category: "juice",
    categoryName: "Nước ép tươi & mix",
    description: "Vị chua ngọt tự nhiên giàu vitamin C từ cam mọng nước và dứa chín, tiếp thêm sinh lực tức thì.",
    ingredients: ["Cam tươi", "Dứa chín", "Chanh vàng"],
    benefit: "Bổ sung vitamin C tự nhiên, sáng mịn làn da và hỗ trợ chuyển hóa năng lượng",
    color: "warm",
    level: 70,
    isDetoxCore: true,
  },
  {
    id: "5",
    slug: "ep-ca-rot-cam-gung",
    name: "Nước Ép Cam Cà Rốt Gừng",
    category: "juice",
    categoryName: "Nước ép tươi & mix",
    description: "Sắc cam tự nhiên giàu beta-carotene, điểm chút gừng tươi ấm bụng và tăng sức đề kháng.",
    ingredients: ["Cà rốt", "Cam tươi", "Gừng sẻ", "Táo đỏ"],
    benefit: "Bổ sung tiền chất vitamin A, làm ấm dạ dày giữa các bữa ăn",
    color: "warm",
    level: 75,
    isDetoxCore: true,
  },
  {
    id: "6",
    slug: "sua-hat-dieu-hanh-nhan",
    name: "Sữa Hạt Điều & Hạnh Nhân",
    category: "nut_milk_tea",
    categoryName: "Sữa hạt & Trà",
    description: "Vị béo ngậy thanh khiết từ hạt dinh dưỡng tự nhiên ép chậm trong ngày, không cholesterol.",
    ingredients: ["Hạt điều", "Hạnh nhân", "Yến mạch", "Chà là tự nhiên"],
    benefit: "Cung cấp chất béo lành tính, thư giãn dạ dày buổi tối và dưỡng giấc ngủ sâu",
    color: "soft",
    level: 75,
    isDetoxCore: true,
  },
  {
    id: "7",
    slug: "tra-thao-moc-thanh-nhiet",
    name: "Trà Thảo Mộc Thanh Nhiệt",
    category: "nut_milk_tea",
    categoryName: "Sữa hạt & Trà",
    description: "Hương hoa cúc và kỷ tử dịu mát không đường, hỗ trợ thanh nhiệt và giải khát tự nhiên.",
    ingredients: ["Hoa cúc", "Kỷ tử", "Táo đỏ", "Lá sen"],
    benefit: "Làm dịu đường tiêu hóa, thanh nhiệt và hỗ trợ giấc ngủ nhẹ nhàng",
    color: "warm",
    level: 50,
    isDetoxCore: false,
  },
] as const;

export const DRINKS_DATA: readonly Drink[] = INITIAL_DRINKS;
