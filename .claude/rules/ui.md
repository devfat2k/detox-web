---
paths: src/components/**, src/app/**/*.tsx, src/app/globals.css
---

# UI & Design Rules

- Server Components mặc định; chỉ dùng `"use client"` cho luồng khảo sát và interactive widgets.
- Chỉ dùng token từ `globals.css`; tuyệt đối không dùng hex thô, không dùng trắng tinh `#fff`/`#ffffff`, không dùng màu đen đậm inline (`#000`, `black`), không dùng default Tailwind palette và shadow mặc định.
- Fonts: Bricolage Grotesque (headings) và Be Vietnam Pro (body) qua `next/font` (`vietnamese` subset). Không dùng Inter, Roboto, Arial.
- Icons: Chỉ dùng `lucide-react` (size 18/20, strokeWidth 1.5-1.75), màu thừa kế `currentColor` hoặc token. Cấm circle/badge bọc nhiều màu sắc bên ngoài icon.
- Cấm: Gradients, hiệu ứng glass/blur, emoji trang trí/làm icon, ảnh AI, ảnh stock, nhãn ALL CAPS, nested cards, badge status nhiều màu sắc chớp nháy hoặc không mục đích.
- Mobile-first tại 390px; tap targets ≥ 48px; inputs 16px; visible focus rõ ràng; tuân thủ `prefers-reduced-motion`.

## Checklist chống "AI Slop"

- **Hành động chính:** Mỗi màn hình tối đa một hành động chính nổi bật (Primary Button); nút phụ dùng kiểu chữ hoặc viền (Secondary/Ghost).
- **Badge/Tag:** Tối đa một badge/tag trên mỗi thẻ; thẻ "Khuyên dùng" chỉ xuất hiện ở một liệu trình duy nhất. Cấm badge status nhiều màu sắc chớp nháy hoặc không mục đích.
- **Hình khối & Bề mặt:** Không card lồng card; không dùng đồng thời viền, bóng và nền khác màu cho cùng một khối.
- **Thang cỡ chữ:** Mỗi màn hình dùng tối đa 4 cỡ chữ. Chữ từ 16px trên mobile, độ tương phản đạt AA.
- **Chuyển động (Motion):** Chỉ dùng `opacity` và `transform`, thời gian dưới 200ms, không lặp vô hạn, không `pulse`, `bounce`, `ping` hay `shimmer`; luôn tôn trọng `prefers-reduced-motion`.
- **Khoảng cách (Spacing):** Chỉ lấy từ thang 4-point grid đã định (4px, 8px, 12px, 16px, 24px, 32px, 48px), không giá trị lẻ.
- **Responsive:** Thiết kế ở 390px trước (mobile-first), rồi mới mở rộng lên 1280px.
