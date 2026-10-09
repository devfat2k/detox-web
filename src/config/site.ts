/**
 * Thông tin cấu hình website "Ép Xanh Chữa Lành".
 */
export const SITE_CONFIG = {
  name: "Ép Xanh Chữa Lành",
  description:
    "Gợi ý liệu trình nước ép detox cá nhân hóa 1, 3, 6 ngày từ menu thật của quán Ép Xanh Chữa Lành.",
  threadsUrl:
    "https://www.threads.com/@ep_xanh_chua_lanh?igshid=NTc4MTIwNjQ2YQ==",
  domain: "",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
