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

  // Thông báo giữ chỗ (Placeholder)
  UNDER_CONSTRUCTION_NOTICE: "Đang xây dựng. Nội dung và giao diện chi tiết sẽ sớm được hoàn thiện.",

  // Tiêu đề & mô tả các trang (Pages metadata & copy)
  PAGE_CONSULTATION_STEP1_TITLE: "Lưu ý an toàn",
  PAGE_CONSULTATION_STEP1_DESC: "Khảo sát an toàn sức khỏe trước khi bắt đầu lộ trình nước ép.",
  PAGE_CONSULTATION_STEP2_TITLE: "Thông tin cơ thể",
  PAGE_CONSULTATION_STEP2_DESC: "Cung cấp chỉ số cơ thể để ước tính nhu cầu năng lượng phù hợp.",
  PAGE_CONSULTATION_STEP3_TITLE: "Vấn đề và mục tiêu",
  PAGE_CONSULTATION_STEP3_DESC: "Chọn mục tiêu sức khỏe và cảm nhận cơ thể bạn mong muốn cải thiện.",
  PAGE_CONSULTATION_STEP4_TITLE: "Kinh nghiệm và số ngày",
  PAGE_CONSULTATION_STEP4_DESC: "Chọn kinh nghiệm detox và thời lượng lộ trình bạn mong muốn thực hiện.",
  PAGE_CONSULTATION_RESULT_TITLE: "Kết quả cá nhân hóa",
  PAGE_CONSULTATION_RESULT_DESC: "Lộ trình nước ép gợi ý được tính toán dành riêng cho bạn.",
  PAGE_CONSULTATION_INELIGIBLE_TITLE: "Không phù hợp tham gia",
  PAGE_CONSULTATION_INELIGIBLE_DESC: "Một số điều kiện sức khỏe hiện tại chưa thích hợp để áp dụng detox nước ép.",

  PAGE_PLANS_TITLE: "Danh sách liệu trình",
  PAGE_PLANS_DESC: "Khám phá các liệu trình nước ép tươi 1 ngày, 3 ngày và 6 ngày từ menu quán.",
  PAGE_PLAN_DETAIL_TITLE: "Chi tiết liệu trình",
  PAGE_PLAN_DETAIL_DESC: "Lịch uống chi tiết và thành phần từng chai nước ép trong liệu trình.",

  PAGE_DRINKS_TITLE: "Danh mục thức uống",
  PAGE_DRINKS_DESC: "Khám phá các loại nước ép xanh tươi thanh mát từ rau củ quả tự nhiên.",
  PAGE_DRINK_DETAIL_TITLE: "Chi tiết thức uống",
  PAGE_DRINK_DETAIL_DESC: "Thành phần nguyên liệu và đóng góp dinh dưỡng của thức uống.",

  PAGE_ARTICLES_TITLE: "Bài viết và kiến thức",
  PAGE_ARTICLES_DESC: "Mẹo vặt, công thức và kiến thức dinh dưỡng detox có trích dẫn nguồn uy tín.",
  PAGE_ARTICLE_DETAIL_TITLE: "Chi tiết bài viết",
  PAGE_ARTICLE_DETAIL_DESC: "Nội dung bài viết chia sẻ và tài liệu tham khảo khoa học.",

  PAGE_POLICY_TITLE: "Chính sách và miễn trừ",
  PAGE_POLICY_DESC: "Điều khoản sử dụng, chính sách riêng tư và miễn trừ trách nhiệm y tế.",
} as const;

export type FixedLabel = typeof FIXED_LABELS[keyof typeof FIXED_LABELS];
