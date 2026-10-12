export type PlanId = "1-day" | "3-day" | "6-day";

export interface PlanBottle {
  readonly time: string;
  readonly name: string;
  readonly desc: string;
  readonly drinkSlug: string;
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
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

const SAMPLE_BOTTLES: readonly PlanBottle[] = [
  {
    time: "07:00",
    name: "Xanh Tươi Cần Tây Táo",
    desc: "Vị thanh mát, đánh thức tiêu hóa nhẹ nhàng đầu ngày",
    drinkSlug: "ep-can-tay-tao",
    color: "green",
    level: 60,
  },
  {
    time: "10:00",
    name: "Cam Cà Rốt Ấm Nồng",
    desc: "Bổ sung vitamin tự nhiên, điểm chút gừng ấm bụng giữa buổi",
    drinkSlug: "ep-ca-rot-cam-gung",
    color: "warm",
    level: 75,
  },
  {
    time: "13:00",
    name: "Xanh Đậm Kale Dưa Leo",
    desc: "Dồi dào diệp lục và khoáng chất thực vật thanh khiết",
    drinkSlug: "ep-cai-kale-dua-leo",
    color: "green",
    level: 70,
  },
  {
    time: "16:00",
    name: "Đỏ Rực Củ Dền Thơm",
    desc: "Vị ngọt dịu từ dứa thơm và củ dền giúp giải nhiệt buổi chiều",
    drinkSlug: "ep-cu-den-dua-thom",
    color: "warm",
    level: 80,
  },
  {
    time: "19:00",
    name: "Sữa Hạt Dịu Nhẹ",
    desc: "Chất béo lành tính từ hạt, giúp êm bụng và thư giãn giấc ngủ",
    drinkSlug: "ep-can-tay-tao",
    color: "soft",
    level: 85,
  },
] as const;

function createDays(count: number): readonly PlanDaySchedule[] {
  const themes = [
    "Khởi động nhẹ nhàng",
    "Thích nghi và thanh lọc",
    "Cân bằng năng lượng",
    "Tăng cường khoáng chất",
    "Duy trì thể trạng tươi mới",
    "Phục hồi và hoàn thiện",
  ];

  return Array.from({ length: count }, (_, i) => ({
    dayNumber: i + 1,
    theme: themes[i] ?? `Ngày trải nghiệm ${i + 1}`,
    bottles: SAMPLE_BOTTLES,
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
    description: "Thanh lọc nhẹ nhàng trong 1 ngày, thích hợp cho người mới bắt đầu làm quen với nước ép tươi.",
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
    description: "Lộ trình cân bằng 3 ngày giúp hệ tiêu hóa được nghỉ ngơi và hỗ trợ giảm cảm giác nặng bụng.",
    tagline: "3 ngày làm mới năng lượng và hỗ trợ thanh lọc cơ thể.",
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
    description: "Liệu trình trải nghiệm toàn diện 6 ngày dành cho người đã có kinh nghiệm dùng nước ép xanh.",
    tagline: "Trải nghiệm chuyên sâu, duy trì thói quen dinh dưỡng thực vật lành mạnh.",
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
