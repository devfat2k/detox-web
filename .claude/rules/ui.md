---
paths: src/components/**, src/app/**/*.tsx, src/app/globals.css
---

# UI & Design Rules

- Nguồn chuẩn: Tuân thủ toàn diện `DESIGN.md` (tokens, typography, spacing, checklist chống slop) và `docs/product-spec.md` §1A (nguyên tắc trải nghiệm), §3 (routes & nhãn cố định).
- Next.js: Server Components mặc định; chỉ dùng `"use client"` cho luồng khảo sát và interactive widgets.
- Tokens & CSS: Chỉ dùng tokens từ `src/app/globals.css`. Tuyệt đối không dùng mã hex thô, không dùng trắng tinh `#fff`/`#ffffff`, không dùng đen đậm inline (`#000`, `black`), không dùng default Tailwind palette và shadow mặc định.
- Typography & Icon: Duy nhất phông `Be Vietnam Pro` qua `next/font` với phong cách thanh mảnh nhẹ nhàng, không dùng cỡ chữ quá to quá thô và weight quá đậm (không dùng font-bold/700+). Biểu tượng duy nhất từ `lucide-react` nét mảnh (`strokeWidth={1.75}`). Tuyệt đối CẤM emoji và cấm text làm icon. Chi tiết xem `DESIGN.md` §3 & §6.
- Mobile-first: Ưu tiên 390px trước, mở rộng 1280px sau; tap targets ≥ 48px; inputs ≥ 16px; tuân thủ `prefers-reduced-motion`.
- Nhãn & Lời chào: Tuân thủ danh sách nhãn cố định và quy tắc lời chào ngắn không chặn nội dung tại `CLAUDE.md` (Routes & Fixed Labels).
