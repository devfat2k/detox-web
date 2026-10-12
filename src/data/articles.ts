export type ArticleCategory = "tips" | "recipes" | "knowledge";

export interface ArticleSource {
  readonly title: string;
  readonly organization: string;
  readonly url?: string;
}

export interface ArticleSection {
  readonly heading?: string;
  readonly content: string;
}

export interface Article {
  readonly slug: string;
  readonly title: string;
  readonly category: ArticleCategory;
  readonly categoryName: string;
  readonly excerpt: string;
  readonly publishedAt: string;
  readonly readingTime: string;
  readonly sections: readonly ArticleSection[];
  readonly sources: readonly ArticleSource[];
}

export const ARTICLE_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "knowledge", label: "Kiến thức" },
  { id: "tips", label: "Mẹo vặt" },
  { id: "recipes", label: "Công thức" },
] as const;

export const ARTICLES_DATA: readonly Article[] = [
  {
    slug: "hieu-dung-ve-thai-doc-tu-nhien",
    title: "Hiểu đúng về cơ chế tự thải độc của gan và thận",
    category: "knowledge",
    categoryName: "Kiến thức",
    excerpt: "Nước ép rau củ hỗ trợ bổ sung vi chất và nước cho cơ thể, trong khi gan và thận mới là cơ quan đảm nhiệm chính việc lọc và đào thải tự nhiên.",
    publishedAt: "2026-03-20",
    readingTime: "5 phút đọc",
    sections: [
      {
        heading: "Cơ thể con người tự làm sạch như thế nào?",
        content: "Gan là nhà máy sinh hóa lớn nhất, chuyển hóa các chất lạ thành dạng tan trong nước để bài tiết. Thận liên tục lọc máu và bài xuất các sản phẩm chuyển hóa qua nước tiểu. Không có loại nước uống nào có thể thay thế hoàn toàn chức năng của hai cơ quan này.",
      },
      {
        heading: "Vai trò thực tế của nước ép rau củ tươi",
        content: "Nước ép cung cấp dồi dào nước, kali, vitamin C và các hợp chất thực vật (polyphenols). Những dưỡng chất này hỗ trợ màng tế bào và tạo điều kiện thuận lợi cho gan và thận hoạt động ở trạng thái thoải mái nhất.",
      },
      {
        heading: "Lưu ý để tiếp cận an toàn",
        content: "Nên xem nước ép như một phần bổ sung rau củ nhẹ nhàng cho chế độ ăn, không nhịn ăn kéo dài và không kỳ vọng nước ép có tác dụng chữa bệnh hay thay thế điều trị y khoa.",
      },
    ],
    sources: [
      {
        organization: "Harvard Health Publishing",
        title: "The dubious practice of detox (Sự thật về các phương pháp thanh lọc cơ thể)",
        url: "https://www.health.harvard.edu/staying-healthy/the-dubious-practice-of-detox",
      },
      {
        organization: "Viện Dinh dưỡng Quốc gia Việt Nam",
        title: "Khuyến nghị tiêu thụ rau củ quả và lối sống lành mạnh",
        url: "http://viendinhduong.vn",
      },
    ],
  },
  {
    slug: "huong-dan-chuan-bi-truoc-khi-detox",
    title: "Hướng dẫn chuẩn bị cơ thể 2 ngày trước khi detox",
    category: "tips",
    categoryName: "Mẹo vặt",
    excerpt: "Cách ăn nhẹ và giảm dần caffeine từng bước để cơ thể thích ứng tự nhiên với nhịp nước ép, không gây cảm giác đói lả hay choáng váng.",
    publishedAt: "2026-03-15",
    readingTime: "4 phút đọc",
    sections: [
      {
        heading: "Giảm áp lực cho hệ tiêu hóa từ sớm",
        content: "Trước khi bắt đầu bất kỳ lộ trình nước ép nào, hãy dành 2 ngày giảm bớt đạm động vật khó tiêu, đồ chiên rán nhiều dầu mỡ và thực phẩm chế biến sẵn. Ưu tiên các món hấp, luộc và tăng dần lượng rau xanh trong đĩa ăn.",
      },
      {
        heading: "Cắt giảm caffeine một cách êm ái",
        content: "Nếu bạn có thói quen uống nhiều cà phê mỗi ngày, việc dừng đột ngột có thể gây đau đầu nhẹ do thiếu caffeine. Hãy giảm xuống một nửa lượng thường uống và thay thế bằng nước ấm hoặc trà thảo mộc dịu nhẹ.",
      },
      {
        heading: "Lắng nghe tín hiệu từ cơ thể",
        content: "Mục tiêu của việc chuẩn bị là giúp cơ thể thư thái, không phải tạo thêm căng thẳng. Hãy đi ngủ sớm hơn 30 phút và uống đủ nước lọc trong suốt cả ngày.",
      },
    ],
    sources: [
      {
        organization: "Mayo Clinic",
        title: "Juicing: What are the health benefits? (Uống nước ép: Lợi ích dinh dưỡng thực tế)",
        url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/juicing/faq-20058020",
      },
    ],
  },
] as const;
