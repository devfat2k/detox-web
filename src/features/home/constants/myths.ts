export interface MythData {
  readonly id: number;
  readonly shortLabel: string;
  readonly myth: string;
  readonly realitySummary: string;
  readonly explanation: string;
  readonly keyTakeaway: string;
}

export const MYTHS_LIST: readonly MythData[] = [
  {
    id: 1,
    shortLabel: "01. Bỏ đói cơ thể?",
    myth: "Detox là nhịn ăn hoàn toàn, bỏ đói cơ thể?",
    realitySummary: "Không bỏ đói — Nạp đều 5 cữ dinh dưỡng lỏng sạch",
    explanation:
      "Cơ thể bạn vẫn tiếp nhận liên tục vitamin, khoáng chất và enzym thực vật tự nhiên từ 5 chai nước ép chia đều mỗi 2,5 - 3 tiếng. Đây là cách giúp dạ dày và gan tạm nghỉ ngơi sau chuỗi ngày tiêu hóa đạm và dầu mỡ nặng bụng.",
    keyTakeaway: "Dạ dày tiết kiệm 4-5 tiếng co bóp thức ăn nặng, ruột hấp thu nhanh trong 20 phút.",
  },
  {
    id: 2,
    shortLabel: "02. Giảm mỡ cấp tốc?",
    myth: "Chỉ cần uống nước ép là giảm mỡ thừa thần tốc?",
    realitySummary: "Giảm 0.5 - 1.5kg là giải phóng nước thừa và cặn bã",
    explanation:
      "Mỡ thừa tích tụ lâu năm không thể biến mất sau vài ngày. Cân nặng giảm ban đầu là do cơ thể đào thải lượng muối thừa gây sưng phù và xả cặn tiêu hóa ứ đọng, giúp vòng bụng xẹp xuống tự nhiên.",
    keyTakeaway: "Vòng bụng phẳng rõ rệt khi cài nút quần, người nhẹ bẫng chứ không phải mất cơ hay kiệt sức.",
  },
  {
    id: 3,
    shortLabel: "03. Chai siêu thị?",
    myth: "Nước ép đóng chai sẵn ở siêu thị cũng dùng để detox được?",
    realitySummary: "Phải là nước ép chậm tươi sống, nguyên chất 100%",
    explanation:
      "Nước ép công nghiệp thường qua xử lý nhiệt thanh trùng làm mất hầu hết enzym sống và vitamin nhạy cảm, đồng thời pha thêm đường hoặc chất bảo quản để bảo quản 6-12 tháng.",
    keyTakeaway: "Chỉ nước ép tươi ép chậm trong ngày mới giữ trọn vẹn vitamin và dưỡng chất sống cho hệ vi sinh đường ruột.",
  },
  {
    id: 4,
    shortLabel: "04. Uống càng lâu càng tốt?",
    myth: "Uống liên tục càng nhiều ngày thì càng khỏe và giảm cân nhanh?",
    realitySummary: "Nhịp độ chuẩn khoa học là chu kỳ 1 - 3 ngày",
    explanation:
      "Detox quá dài mà không có chỉ định y khoa dễ gây thiếu hụt đạm và chất béo thiết yếu. Với người sinh hoạt và làm việc bình thường, chu kỳ 1-3 ngày vừa đủ để thanh lọc đường ruột mà cơ thể vẫn tràn đầy năng lượng.",
    keyTakeaway: "Khởi đầu 1 hoặc 3 ngày là nhịp độ an toàn và thoải mái nhất cho cơ thể.",
  },
  {
    id: 5,
    shortLabel: "05. Sau detox ăn gì?",
    myth: "Sau khi detox xong có thể ăn uống thả ga bình thường ngay?",
    realitySummary: "Cần ăn dặm nhẹ nhàng 1 - 2 ngày để giữ thành quả",
    explanation:
      "Sau 72 giờ được nghỉ ngơi, dạ dày cần thời gian thích nghi lại với thức ăn cứng. Nên ưu tiên cháo yến mạch, súp rau củ, sinh tố và tránh ngay đồ cay nóng, nhiều dầu mỡ hay rượu bia.",
    keyTakeaway: "Ăn dặm đúng cách giúp duy trì vòng bụng phẳng và không bị tăng cân trở lại.",
  },
] as const;
