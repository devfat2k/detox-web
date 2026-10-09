---
paths: src/content/**, content/**
---
# Content & Mock Data Rules

- Nguồn chuẩn: Tuân thủ `src/docs/product-spec.md` §7 (quy tắc nội dung, cụm từ cần tránh) và `CLAUDE.md` (Medical Compliance).
- Dữ liệu định kiểu (`products.ts`, `plans.ts`, `advice.ts`, `sources.ts`, `site.ts`) phải được kiểm thực bởi Zod schema trong `schema.ts` ở thời điểm build.
- Bài viết `content/posts/*.md` phải có frontmatter kiểm thực bằng Zod và bắt buộc có trường `sources`.
- Mọi khẳng định dinh dưỡng/sức khỏe phải gắn ít nhất 1 id từ `sources.ts` (`sourceIds`).
- Mock data: Tối đa 2 đồ uống và 1 liệu trình mock trong `src/content/mock/`, mỗi mục gắn nhãn `MOCK`. Không tự ý viết thêm mock. Không bịa nội dung dinh dưỡng thật.
