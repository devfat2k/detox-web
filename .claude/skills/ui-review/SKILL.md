---
name: ui-review
description: Kiểm tra giao diện ở 2 viewport 390px và 1280px bằng Playwright, đối chiếu DESIGN.md và checklist chống slop. Chỉ báo cáo, không sửa code.
---

1. **Kiểm tra kích thước màn hình**:
   - Chạy kiểm tra Playwright ở 2 viewport: Mobile 390px trước, Desktop 1280px sau.

2. **Đối chiếu Checklist chống "AI Slop" (CHỈ BÁO CÁO, KHÔNG SỬA CODE)**:
   - **Hành động chính**: Mỗi màn hình tối đa một hành động chính nổi bật; nút phụ dùng kiểu chữ hoặc viền.
   - **Badge / Tag**: Tối đa một badge/tag trên mỗi thẻ; thẻ "Khuyên dùng" chỉ xuất hiện ở một liệu trình. Cấm badge status nhiều màu sắc chớp nháy hoặc không mục đích.
   - **Icon & Biểu tượng**: Chỉ dùng `lucide-react` (size 18/20, strokeWidth 1.5-1.75). Cấm circle/badge bọc nhiều màu sắc bên ngoài icon. Cấm emoji làm icon.
   - **Khối & Bề mặt**: Không card lồng card; không dùng đồng thời viền, bóng và nền khác màu cho cùng một khối.
   - **Thang cỡ chữ**: Mỗi màn hình dùng tối đa 4 cỡ chữ. Chữ từ 16px trên mobile, tương phản đạt chuẩn WCAG AA.
   - **Chuyển động**: Chỉ dùng `opacity` và `transform`, thời gian dưới 200ms, không lặp vô hạn, không `pulse`, `bounce`, `ping` hay `shimmer`; tôn trọng `prefers-reduced-motion`.
   - **Khoảng cách**: Chỉ lấy từ thang spacing đã định (4px, 8px, 12px, 16px, 24px, 32px, 48px), không giá trị lẻ.
   - **Màu sắc & Token**: Không có mã hex viết trực tiếp; tuyệt đối không dùng trắng tinh `#fff`/`#ffffff` hoặc đen đậm inline (`#000`, `black`); chỉ dùng token từ `globals.css`.
   - **Typography**: Đúng font Bricolage Grotesque (tiêu đề) và Be Vietnam Pro (nội dung).
   - **Kích thước chạm**: Tap target ≥ 48px trên mobile; font-size input ≥ 16px.
   - **Hình ảnh & Media**: Dùng ảnh thật của shop; cấm ảnh AI, cấm ảnh stock.
   - **Nội dung & Y tế**: Tiếng Việt câu chữ sentence case ("mình"/"bạn"), không ALL CAPS, không từ ngữ y tế cam kết sai quy định.

3. **Báo cáo**:
   - Liệt kê chi tiết các điểm đạt và các điểm vi phạm (chỉ rõ file và dòng).
   - Đề xuất hướng xử lý để người dùng quyết định.
