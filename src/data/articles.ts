export type ArticleCategory = "tips" | "recipes" | "knowledge";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  categoryName: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
}

export const ARTICLES_DATA: readonly Article[] = [
  {
    slug: "huong-dan-chuan-bi-truoc-khi-detox",
    title: "Hướng dẫn chuẩn bị cơ thể 2 ngày trước khi detox",
    category: "tips",
    categoryName: "Mẹo vặt",
    excerpt: "Cách ăn nhẹ và giảm caffeine từng bước để cơ thể thích ứng êm ái với lộ trình nước ép.",
    publishedAt: "2026-03-15",
    readingTime: "4 phút đọc",
  },
  {
    slug: "hieu-dung-ve-thai-doc-tu-nhien",
    title: "Hiểu đúng về cơ chế tự thải độc của gan và thận",
    category: "knowledge",
    categoryName: "Kiến thức",
    excerpt: "Nước ép hỗ trợ dinh dưỡng như thế nào cho các cơ quan giải độc tự nhiên của cơ thể.",
    publishedAt: "2026-03-20",
    readingTime: "5 phút đọc",
  },
  {
    slug: "cong-thuc-nuoc-ep-xanh-tai-nha",
    title: "Gợi ý tỷ lệ rau củ cho ly nước ép xanh dễ uống tại nhà",
    category: "recipes",
    categoryName: "Công thức",
    excerpt: "Nguyên tắc cân bằng 80% rau xanh và 20% củ quả ngọt để không làm tăng đường huyết nhanh.",
    publishedAt: "2026-03-28",
    readingTime: "3 phút đọc",
  },
] as const;
