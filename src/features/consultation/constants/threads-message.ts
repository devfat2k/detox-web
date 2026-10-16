export type ThreadsMessageVariantId =
  | "weight_loss"
  | "diet_and_hunger"
  | "morning_delivery"
  | "sensitive_stomach"
  | "first_day_symptoms"
  | "office_storage"
  | "workout_routine"
  | "coffee_and_meds"
  | "taste_adjustment"
  | "post_detox_diet";

export interface ThreadsMessageVariantOption {
  readonly id: ThreadsMessageVariantId;
  readonly shortLabel: string;
  readonly description: string;
  readonly questionTail: string;
}

export const THREADS_MESSAGE_VARIANTS: readonly ThreadsMessageVariantOption[] = [
  {
    id: "weight_loss",
    shortLabel: "Giảm cân & Vòng eo",
    description: "Hỏi mức giảm cân ước tính và cách duy trì sau khi hết gói",
    questionTail:
      "Shop cho mình hỏi theo lộ trình này thì thông thường giảm được khoảng bao nhiêu cân và giảm bụng có rõ không ạ? Sau khi hết liệu trình có dễ bị tăng cân trở lại không shop?",
  },
  {
    id: "diet_and_hunger",
    shortLabel: "Có được ăn thêm không",
    description: "Hỏi các món ăn nhẹ được phép ăn kèm nếu bị đói",
    questionTail:
      "Trong những ngày detox mình có được ăn thêm gì không shop? Nếu giữa các cữ uống mà thấy đói hoặc cồn cào thì mình nên ăn nhẹ món gì để không làm giảm hiệu quả thanh lọc ạ?",
  },
  {
    id: "morning_delivery",
    shortLabel: "Khung giờ & Phí ship",
    description: "Hỏi giờ giao mỗi sáng, cách giữ nhiệt và phí vận chuyển",
    questionTail:
      "Shop cho mình hỏi lộ trình này quán sẽ giao vào mấy giờ mỗi ngày và giao như thế nào để đảm bảo giữ lạnh vậy ạ? Chi phí ship đến khu vực của mình tính như thế nào shop nhỉ?",
  },
  {
    id: "sensitive_stomach",
    shortLabel: "Dạ dày & Xót ruột",
    description: "Hỏi độ êm bụng cho người có tiền sử đau bao tử",
    questionTail:
      "Dạ dày mình hơi nhạy cảm, dễ bị xót nếu uống đồ chua thì theo lộ trình này có an toàn và êm bụng không shop? Quán có hỗ trợ gia giảm vị chua cho mình không ạ?",
  },
  {
    id: "first_day_symptoms",
    shortLabel: "Biểu hiện ngày đầu",
    description: "Hỏi cách xử lý khi cơ thể bắt đầu thích nghi và thải độc",
    questionTail:
      "Lần đầu uống thanh lọc thì ngày đầu tiên có hay bị mệt mỏi, đau đầu nhẹ hay đi vệ sinh nhiều không shop? Nếu gặp tình trạng đó thì mình cần làm gì ạ?",
  },
  {
    id: "office_storage",
    shortLabel: "Bảo quản tại công ty",
    description: "Hỏi thời gian bảo quản ngoài nhiệt độ phòng và cách giữ lạnh",
    questionTail:
      "Mình mang nước ép đi làm văn phòng cả ngày thì bảo quản thế nào ạ? Nếu chỗ làm không có tủ lạnh thì chai để nhiệt độ phòng được tối đa mấy tiếng vậy shop?",
  },
  {
    id: "workout_routine",
    shortLabel: "Tập gym & Vận động",
    description: "Hỏi về việc duy trì tập thể dục trong những ngày detox",
    questionTail:
      "Trong những ngày đang uống liệu trình này thì mình có tập gym/yoga/chạy bộ như bình thường được không, hay phải tạm nghỉ hoặc giảm cường độ shop nhỉ?",
  },
  {
    id: "coffee_and_meds",
    shortLabel: "Cà phê & Thuốc uống",
    description: "Hỏi cách uống thuốc hoặc cà phê trong thời gian detox",
    questionTail:
      "Trong đợt detox này mình có được uống cà phê sáng hay uống các loại vitamin/thuốc định kỳ không shop? Nếu có thì nên uống cách cữ nước ép bao lâu ạ?",
  },
  {
    id: "taste_adjustment",
    shortLabel: "Đổi vị theo khẩu vị",
    description: "Yêu cầu thay đổi các món có nguyên liệu khó uống",
    questionTail:
      "Nếu trong menu có món nào chứa nguyên liệu mình khó uống (như cần tây/mướp đắng/cải xoăn) thì quán có hỗ trợ đổi sang món nước ép khác cùng nhóm công dụng không shop?",
  },
  {
    id: "post_detox_diet",
    shortLabel: "Ăn uống sau detox",
    description: "Hướng dẫn chế độ ăn nhẹ sau khi hoàn thành số ngày",
    questionTail:
      "Sau khi kết thúc liệu trình thì những ngày tiếp theo mình nên ăn uống lại ra sao để giữ được cảm giác nhẹ bụng và không làm đường ruột bị sốc thức ăn ạ?",
  },
];
