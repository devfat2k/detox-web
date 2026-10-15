export interface DaySimulationBottle {
  readonly time: string;
  readonly name: string;
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
  readonly benefit: string;
}

export interface DaySimulation {
  readonly day: number;
  readonly title: string;
  readonly focus: string;
  readonly bodyFeeling: string;
  readonly mechanism: string;
  readonly dailyBottles: readonly DaySimulationBottle[];
}

export const THREE_DAY_FLOW: readonly DaySimulation[] = [
  {
    day: 1,
    title: "Ngày 1: Thích ứng và nhẹ bụng",
    focus: "Chuyển giao năng lượng · Giảm tải đường ruột",
    bodyFeeling:
      "Bụng bớt ậm ạch sau bữa trưa, cơ thể đi nhẹ nhiều hơn do cần tây và dưa leo kích thích bài tiết lượng muối và nước thừa.",
    mechanism:
      "Thay vì tốn 3-4 tiếng để co bóp tiêu hóa cơm, thịt, dầu mỡ, dạ dày được nghỉ ngơi. Nước ép rau củ thẩm thấu trực tiếp vào ruột chỉ trong 20 phút.",
    dailyBottles: [
      { time: "07:00", name: "Xanh cần tây táo", color: "green", level: 60, benefit: "Xả muối thừa, khởi động ruột" },
      { time: "10:00", name: "Cam cà rốt gừng", color: "warm", level: 75, benefit: "Giữ ấm bao tử, chống đói" },
      { time: "13:00", name: "Kale dưa leo tươi", color: "green", level: 70, benefit: "Khoáng chất kiềm thanh mát" },
      { time: "16:00", name: "Đỏ củ dền thơm", color: "warm", level: 80, benefit: "Bổ sung năng lượng chiều" },
      { time: "19:00", name: "Sữa hạt ấm dịu", color: "soft", level: 85, benefit: "Chất béo tốt, êm bụng ngủ" },
    ],
  },
  {
    day: 2,
    title: "Ngày 2: Rút nước thừa và vòng bụng gọn",
    focus: "Đào thải ứ đọng · Vòng bụng xẹp tự nhiên",
    bodyFeeling:
      "Cảm nhận rõ nhất khi cài nút quần hoặc đứng trước gương. Cơ thể bớt phù nề ở mặt và bắp chân, không còn cảm giác thèm ngọt hay cồn cào.",
    mechanism:
      "Lượng glycogen dự trữ cùng nước liên kết trong cơ bắp bắt đầu được giải phóng. Men bromelain từ thơm và pectin từ táo giúp làm sạch cặn bã tiêu hóa.",
    dailyBottles: [
      { time: "07:00", name: "Xanh đậm diệp lục", color: "green", level: 65, benefit: "Thanh lọc sâu đường ruột" },
      { time: "10:00", name: "Cam bưởi tươi mát", color: "warm", level: 70, benefit: "Vitamin C tăng đề kháng" },
      { time: "13:00", name: "Cần tây dứa táo", color: "green", level: 75, benefit: "Phân giải cặn đạm thừa" },
      { time: "16:00", name: "Cà rốt củ dền", color: "warm", level: 80, benefit: "Chống oxy hóa, sáng da" },
      { time: "19:00", name: "Sữa hạnh nhân sen", color: "soft", level: 85, benefit: "Thư giãn hệ thần kinh" },
    ],
  },
  {
    day: 3,
    title: "Ngày 3: Thiết lập lại nhịp sinh học",
    focus: "Cơ thể thanh thoát · Phục hồi tươi tỉnh",
    bodyFeeling:
      "Thức dậy sảng khoái, không còn uể oải. Vị giác trở nên nhạy cảm hơn, cảm nhận rõ vị ngọt nguyên bản của rau củ và sẵn sàng ăn uống lành mạnh.",
    mechanism:
      "Chu kỳ 72 giờ hoàn tất giúp hệ vi sinh đường ruột cân bằng lại. Cân nặng giảm 0.5 - 1.5kg là kết quả của việc giải phóng nước ứ và thanh lọc cặn tiêu hóa.",
    dailyBottles: [
      { time: "07:00", name: "Xanh bạc hà táo", color: "green", level: 60, benefit: "Đánh thức mọi giác quan" },
      { time: "10:00", name: "Chanh gừng mật ong", color: "warm", level: 75, benefit: "Làm ấm và ổn định tiêu hóa" },
      { time: "13:00", name: "Rau má táo xanh", color: "green", level: 70, benefit: "Thanh mát từ bên trong" },
      { time: "16:00", name: "Thơm cà rốt tươi", color: "warm", level: 80, benefit: "Cân bằng năng lượng cuối ngày" },
      { time: "19:00", name: "Sữa hạt yến mạch", color: "soft", level: 85, benefit: "Kết thúc liệu trình trọn vẹn" },
    ],
  },
] as const;
