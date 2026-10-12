# Design Spec: Section 2 Stages Progression (DNA Hum-07 "Four stages, start to slice")

- **Ngày tạo:** 10/10/2026
- **Trạng thái:** Approved
- **Nguồn cảm hứng:** Hallmark Hum-07 Stages section ("Four stages, start to slice" - `5.png`) — Vertical timeline connected line, numbered badges `1.0`, `2.0`, `3.0`, detailed stage cards with duration pills, and link to detail pages.

---

## 1. Cấu trúc Layout Section 2

### Header Section
- Kicker: `GIAI ĐOẠN LỘ TRÌNH` (`text-xs font-semibold uppercase text-primary tracking-wider`)
- Tiêu đề: **"Ba giai đoạn, từ làm quen đến chuyên sâu."**
- Mô tả: *"Mỗi liệu trình phục vụ một nhu cầu thể trạng riêng biệt. Bạn chỉ cần chọn gói phù hợp — quán chuẩn bị theo menu thật mỗi ngày."*

### Cấu trúc Timeline 3 Giai đoạn
1. **Cột Timeline Trái**:
   - Khối Badge số thứ tự: `1.0`, `2.0`, `3.0` bo góc (`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-soft text-primary font-heading font-semibold text-base sm:text-lg border border-border/80`).
   - Đường kẻ dọc nối liền: `w-0.5 bg-primary/25 min-h-24` giữa các giai đoạn (giai đoạn cuối cùng không có đường kẻ dưới).
2. **Thẻ Giai đoạn Phải**:
   - Kicker: `1.0 · KHỞI ĐẦU · 1 NGÀY LÀM QUEN` / `2.0 · CÂN BẰNG · 3 NGÀY THANH LỌC` / `3.0 · CHUYÊN SÂU · 6 NGÀY PHỤC HỒI`.
   - Tiêu đề và Mô tả chi tiết trải nghiệm thực tế.
   - Thẻ minh họa nhỏ bên phải với icon `Sparkles` mảnh.
   - Thanh metadata dưới chân thẻ:
     - Duration pill: `1 NGÀY · 5 CHAI` (Primary accent pill)
     - Intensity pill: `KHỞI ĐỘNG · 5 MIN/NGỤM` (Neutral pill)
     - Link trỏ tới trang chi tiết: `Xem chi tiết liệu trình →`.

---

## 2. Ràng buộc Kỹ thuật
- Font: Duy nhất Be Vietnam Pro (300/400/500/600), không `font-bold` (700+).
- Tokens: Màu sắc từ `src/app/globals.css`.
- Không hex thô, không gradient, không backdrop-blur.
