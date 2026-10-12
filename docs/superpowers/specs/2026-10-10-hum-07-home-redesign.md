# Design Spec: Màn Hình Trang Chủ & Header Dynamic (DNA Hum-07 / Hallmark)

- **Ngày tạo:** 10/10/2026
- **Trạng thái:** Chờ phê duyệt (Draft)
- **Tác giả:** Claude Code & phathuu26
- **Nguồn cảm hứng:** Hallmark Hum-07 ("Bubble") — Visual Progress Track, Dynamic Header, Micro-trust items, Honest Math.

---

## 1. Bối cảnh & Mục tiêu

Áp dụng DNA thiết kế từ **Hallmark Hum-07** vào Trang Chủ (`/`) và Header của website Ép Xanh Chữa Lành, giữ nguyên 100% nguyên tắc y tế, privacy, zero-backend và font Be Vietnam Pro (weights 300/400/500/600).

---

## 2. Chi tiết Thiết kế Chi tiết

### 2.1. Header Dynamic (`src/components/layout/header.tsx`)
- Thêm client-side scroll listener (`useClient`).
- Khi cuộn xuống > 20px:
  - Chiều cao co nhẹ từ `h-16 sm:h-20` xuống `h-14 sm:h-16`.
  - Nền chuyển `bg-surface/90 backdrop-blur-md` với hiệu ứng chuyển đổi `transition-all duration-fast`.
  - Viền dưới sắc nét hơn nhẹ (`border-border/80 shadow-xs`).
- Giữ vững toàn bộ tính năng accessible, logo, 4 link điều hướng và nút CTA "Tư vấn lộ trình".

### 2.2. Hero Section nâng cấp với Micro-trust Labels
- Giữ logo avatar tròn 64/80px.
- Headline `h1` thanh lịch: *"Lắng nghe cơ thể, chọn lộ trình nước ép dịu lành"*.
- Thêm **Micro-trust bar** phân cách bằng dấu chấm (đặc trưng Hum-07):
  `100% ép tươi · 0 đường cát & phụ gia · Tính toán 100% client-side`

### 2.3. Lộ trình Progress Trực quan (Hum-07 Stage Track)
- Thay thế 3 thẻ rời rạc bằng **Thước đo tiến trình (Progress Track)** kết nối 3 cấp độ `1.0`, `3.0`, `6.0`:
  - **Cấp độ 1.0 (Khởi đầu - 1 ngày · 5 chai)**: Thử nghiệm nhịp sống dịu nhẹ.
  - **Cấp độ 3.0 (Cân bằng - 3 ngày · 15 chai)**: Thanh lọc nhịp nhàng tự nhiên.
  - **Cấp độ 6.0 (Chuyên sâu - 6 ngày · 30 chai)**: Chăm sóc toàn diện thể trạng.
- Hiển thị timeline connector (nối liền 3 gói trên desktop, dạng tiến trình dọc trên mobile 390px).
- Thêm nhãn phụ duration pill + bottle count pill cho từng bước tiến trình.

### 2.4. Khối Thống kê Minh bạch (Honest Math Trio)
- Khối 3 con số minh bạch từ menu thật (không bịa số liệu marketing):
  - **100%** — Nông sản tươi ép nguyên chất.
  - **0** — Phụ gia hay đường công nghiệp.
  - **3** — Cấp độ lộ trình linh hoạt (1, 3, 6 ngày).

### 2.5. Khối Thức uống, Bài viết & Lưu ý y tế
- Đồng bộ style card editorial gọn gàng từ Hum-07.
- Lưu giữ đầy đủ thông báo cam kết y tế và link Threads.

---

## 3. Ràng buộc Kỹ thuật & Accessibility
- **Tokens:** Chỉ dùng token màu trong `src/app/globals.css`.
- **Font:** Duy nhất Be Vietnam Pro (300/400/500/600), cấm font-bold (700+).
- **Responsive:** Mobile 390px first, tap target ≥ 48px.
- **Tests:** `bun run test` 100% pass.
