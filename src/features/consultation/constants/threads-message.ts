export type ThreadsMessageVariantId =
  | "taste_adjustment"
  | "morning_delivery"
  | "light_diet"
  | "beginner_guidance"
  | "schedule_shipping";

export interface ThreadsMessageVariantOption {
  readonly id: ThreadsMessageVariantId;
  readonly shortLabel: string;
  readonly description: string;
  readonly questionTail: string;
}

export const THREADS_MESSAGE_VARIANTS: readonly ThreadsMessageVariantOption[] = [
  {
    id: "taste_adjustment",
    shortLabel: "Khẩu vị & Đổi món",
    description: "Hỏi về điều chỉnh vị rau củ cho êm và dễ uống",
    questionTail:
      "Nếu có vị rau củ nào hơi khó uống thì quán có hỗ trợ đổi món nhẹ nhàng hơn không shop?",
  },
  {
    id: "morning_delivery",
    shortLabel: "Khung giờ giao sáng",
    description: "Hỏi giờ nhận nước ép tươi mỗi sáng để kịp lịch làm việc",
    questionTail:
      "Quán thường giao nước ép tươi vào khung giờ nào buổi sáng để mình sắp xếp nhận vậy ạ?",
  },
  {
    id: "light_diet",
    shortLabel: "Chế độ ăn kèm",
    description: "Hỏi cách ăn nhẹ thêm để không bị đói hay mệt",
    questionTail:
      "Trong những ngày theo lộ trình, mình có cần ăn nhẹ thêm gì để không bị mệt không shop?",
  },
  {
    id: "beginner_guidance",
    shortLabel: "Người mới bắt đầu",
    description: "Lần đầu thanh lọc, cần shop lưu ý trong ngày đầu",
    questionTail:
      "Vì mới bắt đầu nên nhờ shop tư vấn xem mình có cần lưu ý gì trong ngày đầu tiên không nhé!",
  },
  {
    id: "schedule_shipping",
    shortLabel: "Đặt lịch & Phí ship",
    description: "Hỏi ngày bắt đầu giao sớm nhất và phí vận chuyển",
    questionTail:
      "Shop kiểm tra giúp mình có thể bắt đầu giao từ ngày gần nhất nào và phí ship khu vực mình nhé!",
  },
];
