/**
 * Các nhãn cố định theo quy định tại CLAUDE.md và spec v1.2.
 * Tuyệt đối không thêm câu chữ ngoài danh sách này.
 */
export const FIXED_LABELS = {
  // Trợ năng / Accessibility
  SKIP_TO_CONTENT: "Bỏ qua đến nội dung",

  // Nhãn menu điều hướng
  NAV_CONSULTATION: "Tư vấn",
  NAV_PLANS: "Liệu trình",
  NAV_DRINKS: "Thức uống",
  NAV_ARTICLES: "Bài viết",

  // Nút hành động nổi bật
  CTA_CONSULTATION: "Tư vấn lộ trình",

  // Nút cố định luồng
  ACTION_VIEW_MY_PLAN: "Xem lộ trình của tôi",
  ACTION_CONTINUE: "Tiếp tục",
  ACTION_BACK: "Quay lại",
  ACTION_MESSAGE_THREADS: "Nhắn shop trên Threads",
  ACTION_COPY_SUMMARY: "Sao chép tóm tắt để gửi shop",
  ACTION_RETRY: "Thử lại",
  ACTION_BACK_TO_HOME: "Về trang chủ",

  // Màn hình hệ thống / System screens
  NOT_FOUND_TITLE: "Không tìm thấy trang này",
  NOT_FOUND_DESCRIPTION:
    "Đường dẫn có thể đã đổi hoặc không còn nữa. Bạn quay về trang chủ nhé.",
  ERROR_TITLE: "Có chút trục trặc",
  ERROR_DESCRIPTION: "Trang chưa tải được. Bạn thử lại giúp mình nhé.",
  LOADING_TEXT: "Đang tải",

  // Trợ năng điều hướng & Liên kết ngoài
  NAV_MAIN_LABEL: "Điều hướng chính",
  MOBILE_NAV_TOGGLE_OPEN: "Mở menu điều hướng",
  MOBILE_NAV_TOGGLE_CLOSE: "Đóng menu điều hướng",
  OPEN_IN_NEW_TAB: "mở trong thẻ mới",
  NAV_POLICY: "Chính sách và miễn trừ",

  // Miễn trừ trách nhiệm y tế tại Footer
  MEDICAL_DISCLAIMER:
    "Mọi thông tin và lộ trình nước ép trên website chỉ mang tính chất tham khảo, không thay thế chẩn đoán hoặc điều trị y khoa.",
} as const;

export type FixedLabel = typeof FIXED_LABELS[keyof typeof FIXED_LABELS];
