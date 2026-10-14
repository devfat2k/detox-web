import { apiClient } from "@/lib/api-client";
import {
  PLANS_DATA,
  type Plan as UIPlan,
  type PlanId,
  type PlanBottle,
  type PlanDaySchedule,
  isValidPlanId,
} from "@/data/plans";

export interface ApiPlan {
  readonly id: string;
  readonly title?: string;
  readonly name?: string;
  readonly slug?: string;
  readonly duration_days: number;
  readonly total_bottles?: number;
  readonly description?: string;
  readonly tagline?: string;
  readonly price?: number;
  readonly is_recommended?: boolean;
}

const SCHEDULE_ROTATIONS: readonly (readonly PlanBottle[])[] = [
  // Ngày 1
  [
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
      drinkSlug: "ep-tao-can-tay",
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
      name: "Nước Ép Cam + Dứa",
      desc: "Vị chua ngọt thanh mát tiếp thêm năng lượng và vitamin C cho buổi chiều",
      drinkSlug: "ep-cam-dua",
      color: "warm",
      level: 70,
      bottleType: "juice",
      slotName: "Xế chiều",
    },
    {
      time: "19:00",
      name: "Sữa Hạt Điều & Hạnh Nhân",
      desc: "Chất béo lành mạnh giúp phục hồi cơ thể, êm dịu dạ dày và hỗ trợ giấc ngủ sâu",
      drinkSlug: "sua-hat-dieu-hanh-nhan",
      color: "soft",
      level: 75,
      bottleType: "nut_milk",
      slotName: "Bữa tối",
    },
  ],
  // Ngày 2
  [
    {
      time: "07:00",
      name: "Sinh Tố Xanh Nhiệt Đới",
      desc: "Khởi động ngày mới với hương vị thơm mát từ cải bó xôi và trái cây tươi",
      drinkSlug: "sinh-to-xanh-nhiet-doi",
      color: "green",
      level: 80,
      bottleType: "smoothie",
      slotName: "Bữa sáng",
    },
    {
      time: "10:00",
      name: "Nước Ép Dâu Tây + Bưởi + Dứa",
      desc: "Chống oxy hóa, thanh lọc nhẹ nhàng và đánh thức năng lượng cơ thể",
      drinkSlug: "ep-dau-tay-buoi-dua",
      color: "warm",
      level: 75,
      bottleType: "juice",
      slotName: "Bữa phụ sáng",
    },
    {
      time: "13:00",
      name: "Sinh Tố Xanh Healthy",
      desc: "Nạp đẫy chất xơ và diệp lục tươi giúp duy trì cảm giác nhẹ nhàng, dễ chịu",
      drinkSlug: "sinh-to-xanh-healthy",
      color: "green",
      level: 85,
      bottleType: "smoothie",
      slotName: "Bữa trưa",
    },
    {
      time: "16:00",
      name: "Nước Ép Cam + Dâu Tây",
      desc: "Bổ sung vitamin tự nhiên, duy trì sự tỉnh táo và làm dịu cơn thèm ngọt",
      drinkSlug: "ep-cam-dau-tay",
      color: "warm",
      level: 75,
      bottleType: "juice",
      slotName: "Xế chiều",
    },
    {
      time: "19:00",
      name: "Trà Thảo Mộc Thanh Nhiệt",
      desc: "Hoa cúc và kỷ tử dịu mát, giải nhiệt tự nhiên và chuẩn bị cho giấc ngủ an lành",
      drinkSlug: "tra-thao-moc-thanh-nhiet",
      color: "warm",
      level: 50,
      bottleType: "herbal_tea",
      slotName: "Bữa tối",
    },
  ],
  // Ngày 3
  [
    {
      time: "07:00",
      name: "Sinh Tố Xanh Healthy",
      desc: "Bổ sung chất xơ hòa tan đậm đặc, êm dịu dạ dày và tạo cảm giác no lâu tự nhiên",
      drinkSlug: "sinh-to-xanh-healthy",
      color: "green",
      level: 85,
      bottleType: "smoothie",
      slotName: "Bữa sáng",
    },
    {
      time: "10:00",
      name: "Nước Ép Táo + Cần Tây",
      desc: "Bù khoáng kali và thanh lọc nhẹ nhàng, giúp đường tiêu hóa nhẹ nhõm",
      drinkSlug: "ep-tao-can-tay",
      color: "green",
      level: 65,
      bottleType: "juice",
      slotName: "Bữa phụ sáng",
    },
    {
      time: "13:00",
      name: "Sinh Tố Xanh Nhiệt Đới",
      desc: "Tiếp tục duy trì nhịp năng lượng sạch và nuôi dưỡng hệ vi sinh đường ruột",
      drinkSlug: "sinh-to-xanh-nhiet-doi",
      color: "green",
      level: 80,
      bottleType: "smoothie",
      slotName: "Bữa trưa",
    },
    {
      time: "16:00",
      name: "Nước Ép Táo + Cà Rốt + Dâu Tây",
      desc: "Beta-carotene và vitamin tự nhiên làm sáng da và chống mệt mỏi cuối ngày",
      drinkSlug: "ep-tao-ca-rot-dau-tay",
      color: "warm",
      level: 75,
      bottleType: "juice",
      slotName: "Xế chiều",
    },
    {
      time: "19:00",
      name: "Sữa Hạt Điều & Hạnh Nhân",
      desc: "Phục hồi năng lượng tế bào và làm dịu hệ tiêu hóa sau ngày thanh lọc",
      drinkSlug: "sua-hat-dieu-hanh-nhan",
      color: "soft",
      level: 75,
      bottleType: "nut_milk",
      slotName: "Bữa tối",
    },
  ],
];

const THEMES = [
  "Khởi động & Đánh thức đường ruột",
  "Thích nghi & Tăng cường đào thải",
  "Cân bằng & Làm sạch sâu",
  "Bổ sung vi chất tự nhiên",
  "Duy trì thể trạng tươi mới",
  "Phục hồi & Hoàn thiện nhịp sinh học",
];

function generateDaysSchedule(count: number): readonly PlanDaySchedule[] {
  return Array.from({ length: count }, (_, i) => ({
    dayNumber: i + 1,
    theme: THEMES[i] ?? `Ngày trải nghiệm ${i + 1}`,
    bottles: SCHEDULE_ROTATIONS[i % SCHEDULE_ROTATIONS.length] ?? SCHEDULE_ROTATIONS[0],
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

function mapApiPlanToUIPlan(apiPlan: ApiPlan): UIPlan {
  const duration = apiPlan.duration_days;
  const planId: PlanId = duration === 1 ? "1-day" : duration === 3 ? "3-day" : "6-day";

  return {
    id: planId,
    title:
      apiPlan.title ||
      apiPlan.name ||
      (duration === 1
        ? "Combo Detox 1 Ngày"
        : duration === 3
          ? "Combo Detox 3 Ngày"
          : "Combo Detox 6 Ngày"),
    durationDays: duration,
    totalBottles: apiPlan.total_bottles || duration * 5,
    kcalRange: "850 – 950 kcal/ngày",
    description:
      apiPlan.description ||
      `Lộ trình thanh lọc cơ thể trong ${duration} ngày với quy chuẩn 5 chai mỗi ngày từ nguyên liệu tươi nguyên chất.`,
    tagline:
      apiPlan.tagline ||
      (duration === 1
        ? "Khởi đầu nhẹ nhàng, cảm nhận cơ thể tươi mới trong 24 giờ."
        : duration === 3
          ? "3 ngày làm mới năng lượng, thanh lọc sâu và cải thiện tiêu hóa."
          : "Thanh lọc toàn diện, cơ thể nhẹ nhàng và vóc dáng thon gọn rõ rệt."),
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: generateDaysSchedule(duration),
  };
}

export async function getPlans(): Promise<readonly UIPlan[]> {
  try {
    const apiPlans = await apiClient.get<unknown, ApiPlan[]>("/plans");
    if (Array.isArray(apiPlans) && apiPlans.length > 0) {
      return apiPlans.map(mapApiPlanToUIPlan);
    }
    return PLANS_DATA;
  } catch {
    return PLANS_DATA;
  }
}

export async function getPlanById(id: string): Promise<UIPlan | null> {
  const normalizedId = id.trim();
  const durationNumber = Number(normalizedId.replace("-day", ""));

  try {
    const plans = await getPlans();
    const found = plans.find(
      (p) =>
        p.id === normalizedId ||
        p.durationDays === durationNumber ||
        p.id.includes(normalizedId)
    );
    if (found) {
      return found;
    }
  } catch {
    // fallback
  }

  if (isValidPlanId(normalizedId)) {
    const fallback = PLANS_DATA.find((p) => p.id === normalizedId);
    return fallback ?? null;
  }

  return null;
}
