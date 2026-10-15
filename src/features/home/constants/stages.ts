import { type PlanId } from "@/data/plans";

export interface PlanStageItem {
  readonly id: PlanId;
  readonly stageNumber: string;
  readonly title: string;
  readonly phaseName: string;
  readonly summary: string;
  readonly highlight: string;
  readonly bottleColor: "soft" | "green" | "warm";
  readonly bottleLevel: number;
}

export const PLAN_STAGES: readonly PlanStageItem[] = [
  {
    id: "1-day",
    stageNumber: "1",
    title: "Combo detox 1 ngày",
    phaseName: "Khởi đầu làm quen",
    summary:
      "Năm chai nước ép và sinh tố thanh nhẹ cho ngày nghỉ hoặc lần đầu làm quen với detox.",
    highlight: "Bổ sung chất xơ thô no lâu, giúp đường ruột nghỉ ngơi êm dịu mà không gây đói lả.",
    bottleColor: "soft",
    bottleLevel: 65,
  },
  {
    id: "3-day",
    stageNumber: "2",
    title: "Combo detox 3 ngày",
    phaseName: "Cân bằng thanh lọc",
    summary:
      "Mười lăm chai trải đều ba ngày theo tỷ lệ 3:1:1 chuẩn quán.",
    highlight: "Thực đơn xoay vòng phong phú giữa sinh tố cải kale, nước ép tươi và sữa hạt cữ tối.",
    bottleColor: "green",
    bottleLevel: 80,
  },
  {
    id: "6-day",
    stageNumber: "3",
    title: "Combo detox 6 ngày",
    phaseName: "Chuyên sâu phục hồi",
    summary:
      "Ba mươi chai chia thành hai đợt giao tươi để đảm bảo dưỡng chất tối đa.",
    highlight: "Chu kỳ thanh lọc sâu và hỗ trợ vóc dáng được khuyến khích duy trì liên tục cho kết quả tốt nhất.",
    bottleColor: "warm",
    bottleLevel: 90,
  },
] as const;
