---
name: new-page
description: Dựng route mới mỏng cho Next.js App Router theo Server Component, đối chiếu spec, ui.md và thêm test e2e cơ bản.
---

1. **Đọc tài liệu**:
   - Đọc `.claude/rules/ui.md`.
   - Đọc mục liên quan đến route trong `src/docs/product-spec.md` (chỉ đọc mục liên quan, không đọc cả file).
   - Đọc `DESIGN.md` (nếu có).
2. **Lập plan**:
   - Xác định route slug tiếng Anh (ví dụ: `/consultation`, `/plans`, `/drinks`, `/articles`, `/policy`).
   - Xác định component layout/page: Server Component mặc định (chỉ dùng `"use client"` khi có tương tác/form/khảo sát).
   - Liệt kê UI components dùng tokens từ `globals.css` (không dùng hex).
3. **Triển khai**:
   - Tạo `src/app/<route>/page.tsx` giữ page mỏng.
   - Thêm test Playwright e2e cơ bản kiểm tra route tải thành công và hiển thị đúng tiêu đề.
4. **Kiểm tra**:
   - Chạy `bun run typecheck && bun run lint && bun run test`.
