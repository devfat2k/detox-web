export type PlanId = "1-day" | "3-day" | "6-day";

export interface PlanBottle {
  readonly time: string;
  readonly name: string;
  readonly desc: string;
  readonly drinkSlug: string;
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
  readonly bottleType?: "smoothie" | "juice" | "nut_milk" | "herbal_tea";
  readonly slotName?: string;
}

export interface PlanDaySchedule {
  readonly dayNumber: number;
  readonly theme: string;
  readonly bottles: readonly PlanBottle[];
}

export interface Plan {
  readonly id: PlanId;
  readonly title: string;
  readonly durationDays: number;
  readonly totalBottles: number;
  readonly kcalRange: string;
  readonly description: string;
  readonly tagline: string;
  readonly suitableFor: readonly string[];
  readonly notSuitableFor: readonly string[];
  readonly preparationGuide: string;
  readonly recoveryGuide: string;
  readonly days: readonly PlanDaySchedule[];
}

const DAY_1_BOTTLES: readonly PlanBottle[] = [
  {
    time: "07:00",
    name: "Sinh Tố Xanh Healthy",
    desc: "Chất xơ thô từ cải kale, bó xôi và hạt chia giúp êm bụng, no lâu đầu ngày",
    drinkSlug: "sinh-to-xanh-healthy",
    color: "green",
    level: 85,
    bottleType: "smoothie",
    slotName: "Bữa sáng",
  },
  {
    time: "10:00",
    name: "Nước Ép Táo + Cần Tây",
    desc: "Bổ sung khoáng kali và vitamin tự nhiên, thanh lọc êm dịu giữa buổi sáng",
    drinkSlug: "ep-can-tay-tao",
    color: "green",
    level: 65,
    bottleType: "juice",
    slotName: "Bữa phụ sáng",
  },
  {
    time: "13:00",
    name: "Sinh Tố Xanh Nhiệt Đới",
    desc: "Dứa chín và cải bó xôi tươi cung cấp enzyme bromelain hỗ trợ tiêu hóa",
    drinkSlug: "sinh-to-xanh-nhiet-doi",
    color: "green",
    level: 80,
    bottleType: "smoothie",
    slotName: "Bữa trưa",
  },
  {
    time: "16:00",
    name: "Sinh Tố Xanh Healthy",
    desc: "Giữ đường huyết ổn định, giải nhiệt xế chiều và bổ sung năng lượng thực vật",
    drinkSlug: "sinh-to-xanh-healthy",
    color: "green",
    level: 85,
    bottleType: "smoothie",
    slotName: "Xế chiều",
  },
  {
    time: "19:00",
    name: "Sữa Hạt Điều & Hạnh Nhân",
    desc: "Chất béo lành tính từ hạt tự nhiên giúp êm bụng buổi tối và dưỡng giấc ngủ ngon",
    drinkSlug: "sua-hat-dieu-hanh-nhan",
    color: "soft",
    level: 75,
    bottleType: "nut_milk",
    slotName: "Bữa tối",
  },
] as const;

const DAY_2_BOTTLES: readonly PlanBottle[] = [
  {
    time: "07:00",
    name: "Sinh Tố Xanh Nhiệt Đới",
    desc: "Khởi động ngày mới với enzyme trái cây nhiệt đới và diệp lục thực vật tươi",
    drinkSlug: "sinh-to-xanh-nhiet-doi",
    color: "green",
    level: 80,
    bottleType: "smoothie",
    slotName: "Bữa sáng",
  },
  {
    time: "10:00",
    name: "Nước Ép Cam + Dứa",
    desc: "Dồi dào vitamin C tự nhiên, bừng tỉnh năng lượng và bù nước thanh khiết",
    drinkSlug: "ep-cam-dua",
    color: "warm",
    level: 70,
    bottleType: "juice",
    slotName: "Bữa phụ sáng",
  },
  {
    time: "13:00",
    name: "Sinh Tố Xanh Healthy",
    desc: "Bổ sung chất xơ hòa tan từ hạt lanh và cải xoăn kale giúp duy trì cảm giác no",
    drinkSlug: "sinh-to-xanh-healthy",
    color: "green",
    level: 85,
    bottleType: "smoothie",
    slotName: "Bữa trưa",
  },
  {
    time: "16:00",
    name: "Sinh Tố Xanh Nhiệt Đới",
    desc: "Tiếp tục nhịp đào thải nhẹ nhàng, xua tan cảm giác mệt mỏi buổi chiều",
    drinkSlug: "sinh-to-xanh-nhiet-doi",
    color: "green",
    level: 80,
    bottleType: "smoothie",
    slotName: "Xế chiều",
  },
  {
    time: "19:00",
    name: "Trà Thảo Mộc Thanh Nhiệt",
    desc: "Hương hoa cúc và kỷ tử dịu mát làm dịu gan, thanh nhiệt và hỗ trợ giấc ngủ",
    drinkSlug: "tra-thao-moc-thanh-nhiet",
    color: "warm",
    level: 50,
    bottleType: "herbal_tea",
    slotName: "Bữa tối",
  },
] as const;

const DAY_3_BOTTLES: readonly PlanBottle[] = [
  {
    time: "07:00",
    name: "Sinh Tố Xanh Healthy",
    desc: "Diệp lục đậm đặc và hạt chia giữ năng lượng bền bỉ cho ngày thanh lọc sâu",
    drinkSlug: "sinh-to-xanh-healthy",
    color: "green",
    level: 85,
    bottleType: "smoothie",
    slotName: "Bữa sáng",
  },
  {
    time: "10:00",
    name: "Nước Ép Cam Cà Rốt Gừng",
    desc: "Gừng sẻ ấm bụng kết hợp vitamin A từ cà rốt tươi tăng cường sức đề kháng",
    drinkSlug: "ep-ca-rot-cam-gung",
    color: "warm",
    level: 75,
    bottleType: "juice",
    slotName: "Bữa phụ sáng",
  },
  {
    time: "13:00",
    name: "Sinh Tố Xanh Nhiệt Đới",
    desc: "Tiếp tục nuôi dưỡng hệ vi sinh đường ruột với chất xơ và enzyme thực vật",
    drinkSlug: "sinh-to-xanh-nhiet-doi",
    color: "green",
    level: 80,
    bottleType: "smoothie",
    slotName: "Bữa trưa",
  },
  {
    time: "16:00",
    name: "Sinh Tố Xanh Healthy",
    desc: "Duy trì trạng thái nhẹ nhõm vóc dáng, giảm tích nước và cảm giác ậm ạch",
    drinkSlug: "sinh-to-xanh-healthy",
    color: "green",
    level: 85,
    bottleType: "smoothie",
    slotName: "Xế chiều",
  },
  {
    time: "19:00",
    name: "Sữa Hạt Điều & Hạnh Nhân",
    desc: "Chất béo lành mạnh giúp phục hồi cơ thể sau chuỗi ngày detox trọn vẹn",
    drinkSlug: "sua-hat-dieu-hanh-nhan",
    color: "soft",
    level: 75,
    bottleType: "nut_milk",
    slotName: "Bữa tối",
  },
] as const;

const ROTATING_SCHEDULES: readonly (readonly PlanBottle[])[] = [
  DAY_1_BOTTLES,
  DAY_2_BOTTLES,
  DAY_3_BOTTLES,
];

function createDays(count: number): readonly PlanDaySchedule[] {
  const themes = [
    "Khởi động & Đánh thức đường ruột",
    "Thích nghi & Tăng cường đào thải",
    "Cân bằng & Làm sạch sâu",
    "Bổ sung vi chất tự nhiên",
    "Duy trì thể trạng tươi mới",
    "Phục hồi & Hoàn thiện nhịp sinh học",
  ];

  return Array.from({ length: count }, (_, i) => ({
    dayNumber: i + 1,
    theme: themes[i] ?? `Ngày trải nghiệm ${i + 1}`,
    bottles: ROTATING_SCHEDULES[i % ROTATING_SCHEDULES.length],
  }));
}

const COMMON_SUITABLE = [
  "Người muốn cho hệ tiêu hóa nghỉ ngơi sau chuỗi ngày ăn uống nhiều dầu mỡ",
  "Người cần bổ sung thêm rau củ tươi và nước tự nhiên vào thói quen hàng ngày",
  "Người mong muốn khởi đầu một lối sống ăn uống thanh nhẹ, lành mạnh",
] as const;

const COMMON_NOT_SUITABLE = [
  "Phụ nữ đang mang thai hoặc trong giai đoạn cho con bú",
  "Người có tiền sử huyết áp thấp nặng, bệnh thận hoặc viêm loét dạ dày cấp",
  "Người đang trong quá trình điều trị y khoa đặc biệt cần hỏi ý kiến bác sĩ",
] as const;

const COMMON_PREP =
  "Trước khi bắt đầu 1–2 ngày, bạn nên uống nhiều nước lọc, giảm dần lượng thịt đỏ, đồ chiên rán và các loại thức uống có cồn hay caffeine để cơ thể chuyển tiếp nhẹ nhàng.";

const COMMON_RECOVERY =
  "Sau khi kết thúc liệu trình, hãy bắt đầu lại bằng các món ấm loãng như cháo yến mạch, súp rau củ hoặc trái cây mềm trong 1–2 bữa đầu. Tránh ăn no dồn dập ngay lập tức.";

export const PLANS_DATA: readonly Plan[] = [
  {
    id: "1-day",
    title: "Liệu trình Khởi đầu 1 ngày",
    durationDays: 1,
    totalBottles: 5,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Thanh lọc nhẹ nhàng trong 1 ngày với quy chuẩn 5 chai (3 Sinh tố xanh + 1 Nước ép + 1 Sữa hạt) giúp êm bụng, không đói lả.",
    tagline: "Khởi đầu nhẹ nhàng, cảm nhận cơ thể tươi mới trong 24 giờ.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: createDays(1),
  },
  {
    id: "3-day",
    title: "Liệu trình Cân bằng 3 ngày",
    durationDays: 3,
    totalBottles: 15,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Lộ trình cân bằng 3 ngày thanh lọc chuyên sâu, hỗ trợ giảm mỡ và cải thiện tiêu hóa với thực đơn xoay vòng phong phú.",
    tagline: "3 ngày làm mới năng lượng, thanh lọc sâu và cải thiện tiêu hóa.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: createDays(3),
  },
  {
    id: "6-day",
    title: "Liệu trình Chuyên sâu 6 ngày",
    durationDays: 6,
    totalBottles: 30,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Liệu trình chuyên sâu 6 ngày: thanh lọc sâu, giảm cảm giác tích tụ nặng nề, cơ thể nhẹ nhõm và hỗ trợ vóc dáng rõ rệt khi duy trì liên tục.",
    tagline: "Thanh lọc sâu toàn diện, cơ thể nhẹ nhàng và làn da rạng rỡ.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: createDays(6),
  },
] as const;

export const VALID_PLAN_IDS: readonly PlanId[] = ["1-day", "3-day", "6-day"];

export function isValidPlanId(id: string): id is PlanId {
  return VALID_PLAN_IDS.includes(id as PlanId);
}
