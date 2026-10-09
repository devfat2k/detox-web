---
name: ui-review
description: Kiểm tra giao diện ở 2 viewport 390px và 1280px bằng Playwright, đối chiếu DESIGN.md và checklist chống slop. Chỉ báo cáo, không sửa code.
---

1. **Kiểm tra kích thước màn hình**:
   - Chạy kiểm tra Playwright ở 2 viewport: Mobile 390px trước, Desktop 1280px sau.

2. **Đối chiếu Checklist chống "AI Slop" (CHỈ BÁO CÁO, KHÔNG SỬA CODE)**:
   - Đọc `.claude/rules/ui.md`, `DESIGN.md`, `CLAUDE.md` (Routes & Fixed Labels, Medical Compliance), và `src/docs/product-spec.md` §1A, §3.
   - Đối chiếu theo `DESIGN.md` (hành động chính, badge/tag, bề mặt & viền, thang cỡ chữ, motion budget, spacing 4-point grid, token màu sắc, typography, mobile-first 390px, icon `lucide-react`, tap target ≥ 48px, input ≥ 16px).
   - Kiểm tra nhãn cố định và quy tắc câu chữ sentence case ("mình"/"bạn"), nguyên tắc y tế & cụm từ cần tránh.

3. **Báo cáo**:
   - Liệt kê chi tiết các điểm đạt và các điểm vi phạm (chỉ rõ file và dòng).
   - Đề xuất hướng xử lý để người dùng quyết định.
