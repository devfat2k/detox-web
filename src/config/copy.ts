/**
 * Các nhãn cố định theo quy định tại CLAUDE.md và spec v1.2.
 * Tuyệt đối không thêm câu chữ ngoài danh sách này.
 */
export const FIXED_LABELS = {
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
} as const;

export type FixedLabel = typeof FIXED_LABELS[keyof typeof FIXED_LABELS];
