# Design Spec: Trang Chủ & Tích Hợp Logo ("Ép Xanh Chữa Lành")

- **Ngày tạo:** 10/10/2026
- **Trạng thái:** Chờ phê duyệt (Draft)
- **Tác giả:** Claude Code & phathuu26
- **Mục tiêu:** Xây dựng giao diện Trang chủ (`/`) chuẩn mực theo `docs/product-spec.md` §1A & §3, áp dụng chuẩn `DESIGN.md`, tích hợp logo chính thức và đảm bảo hệ thống typography duy nhất Be Vietnam Pro.

---

## 1. Bối cảnh & Ràng buộc cốt lõi

1. **Thương hiệu & Cảm xúc:** "Dịu - Ấm - Thoáng - Tươi nhẹ". Không mang tính chất phòng khám y tế, không phòng gym, không trang bán hàng thương mại.
2. **Typography:** Duy nhất phông chữ **Be Vietnam Pro**. Trọng số thanh mảnh nhẹ nhàng (`300`, `400`, `500`, `600`). Tuyệt đối không dùng `font-bold` (700+), không display font khổng lồ thô kệch.
3. **Biểu tượng & Hình ảnh:**
   - Logo chính thức: `public/images/logo.png` (Detox Juice & Smoothies - Ép Xanh).
   - Biểu tượng hệ thống: Chỉ dùng `lucide-react` nét mảnh (`strokeWidth={1.75}`).
   - Cấm tuyệt đối: Emoji và text giả lập icon.
4. **Dữ liệu:** Sử dụng dữ liệu tĩnh có sẵn từ `src/data/` (tối đa 2 thức uống, 3 liệu trình, 1 bài viết). Tuyệt đối không fetch API, không mock data phức tạp.
5. **Quyền riêng tư:** 100% tính toán trên trình duyệt, không lưu trữ thông tin người dùng.

---

## 2. Kiến trúc & Cấu trúc Giao diện Trang Chủ (`/`)

### 2.1. Tích hợp Logo vào Header & Footer

- **Header (`src/components/layout/header.tsx`):**
  - Hiển thị logo chính thức dạng ảnh tròn cạnh chữ thương hiệu (kích thước `h-9 w-9 sm:h-10 sm:w-10`).
  - Tên thương hiệu: "Ép Xanh Chữa Lành", font Be Vietnam Pro semibold (`font-semibold text-lg sm:text-xl`).
- **Footer (`src/components/layout/footer.tsx`):**
  - Logo chính thức đi kèm thông tin mô tả ngắn của quán và đường dẫn Threads.

### 2.2. Chi tiết các Section trên Trang Chủ (`src/app/(site)/page.tsx`)

#### Section 1: Hero & Lời chào ("Tư vấn lộ trình")

- **Container:** `Section` spacing `md` (`py-8 sm:py-12`).
- **Logo Điểm nhấn:** Khối avatar tròn thanh lịch hiển thị logo `public/images/logo.png` (kích thước `h-16 w-16 sm:h-20 sm:w-20`), bo tròn mềm mại với viền hairline `#E6DFD2`.
- **Kicker:** `"Ép Xanh Chữa Lành · Trải nghiệm tự nhiên"`.
- **Tiêu đề `h1`:** Cỡ `3xl` (`1.875rem` / `30px`), font-weight `500`: *"Lắng nghe cơ thể, chọn lộ trình nước ép dịu lành"*.
- **Mô tả:** Font body 16px, text-muted, tối đa 2 dòng: *"Tự khám phá thực đơn 1, 3 hoặc 6 ngày phù hợp với thể trạng từ menu thật của quán. Hoàn toàn miễn phí."*
- **Nút hành động chính (Primary CTA):** `LinkButton` trỏ tới `/consultation`, nhãn chuẩn: **"Xem lộ trình của tôi"**, kèm icon `ArrowRight` (size 18, stroke 1.75), tap target ≥ 48px.
- **Dòng ghi chú riêng tư:** Cỡ `xs` (`12px`), text-muted: *"Tính toán 100% trên trình duyệt · Không lưu trữ thông tin cá nhân"*.

#### Section 2: Khối 3 Liệu trình (1, 3, 6 ngày)

- **Tiêu đề:** Kicker `"01 · Liệu trình gợi ý"`, Tiêu đề `h2` cỡ `2xl` font-weight `500`: *"Liệu trình thanh lọc"*.
- **Mô tả dẫn nhập:** Ngắn gọn 1 dòng về các gói từ menu thật.
- **Lưới hiển thị:** 1 cột trên mobile 390px, 3 cột trên desktop (`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6`).
- **Thẻ `Card` (3 gói từ `PLANS_DATA`):**
  - Chip thời gian: Nền nhạt `#E3EDDD`, chữ xanh trầm `#4F7A5A` (vd: "1 ngày · 5 chai", "3 ngày · 15 chai", "6 ngày · 30 chai").
  - Tiêu đề gói: `h3` cỡ `xl` font-weight `500`.
  - Mô tả: 1-2 câu súc tích.
  - Nút link: "Xem chi tiết" dẫn sang `/plans/[id]`.

#### Section 3: Khối Thức uống nổi bật (2 món mẫu)

- **Tiêu đề:** Kicker `"02 · Thức uống tươi"`, Tiêu đề `h2`: *"Thức uống từ nông sản tươi"*.
- **Dữ liệu tĩnh (2 món từ `DRINKS_DATA`):**
  1. *Xanh Tươi Cần Tây Táo* (`ep-can-tay-tao`) - Nước ép xanh thanh mát.
  2. *Cam Cà Rốt Ấm Nồng* (`ep-ca-rot-cam-gung`) - Củ quả giàu vitamin và gừng sẻ ấm bụng.
- **Thẻ hiển thị:**
  - Tên món (`h3` cỡ `xl`, font-medium).
  - Thể loại (text-muted 12px).
  - Danh sách nguyên liệu dạng danh sách thẻ nhỏ tinh gọn.
  - Mô tả vị giác thanh nhẹ.
  - Link "Xem thức uống" dẫn về `/drinks/[slug]`.
- **Liên kết danh mục:** Nút link "Xem toàn bộ thực đơn" dẫn tới `/drinks`.

#### Section 4: Khối Bài viết tham khảo (1 bài mẫu có nguồn)

- **Tiêu đề:** Kicker `"03 · Góc kiến thức"`, Tiêu đề `h2`: *"Hiểu đúng để chăm sóc cơ thể"*.
- **Dữ liệu mẫu (1 bài từ `ARTICLES_DATA`):**
  - *Hiểu đúng về cơ chế tự thải độc của gan và thận* (`hieu-dung-ve-thai-doc-tu-nhien`).
  - Trích dẫn: Thời gian đọc (5 phút đọc), nguồn kiến thức y khoa uy tín.
  - Link dẫn tới `/articles/[slug]`.

#### Section 5: Hộp thông báo Lưu ý & Cam kết y tế

- **Thành phần:** `Notice` viền hairline toàn phần `#E6DFD2`, nền `#FFFDF9`.
- **Nội dung:** Nhắc nhở trung thực theo spec: Nước ép đóng góp vitamin, chất xơ và khoáng chất tự nhiên; không phải thần dược chữa bệnh hay cam kết giảm cân cấp tốc.
- **Hành động phụ:** Liên kết mở Threads của quán để nhắn tin nếu cần tư vấn thêm.

---

## 3. Quy chuẩn Thiết kế & Trợ năng (Accessibility)

1. **Tokens màu sắc:**
   - Nền trang: `--color-bg` (`#FBF7F0`).
   - Nền thẻ: `--color-surface` (`#FFFDF9`).
   - Viền: `--color-border` (`#E6DFD2`).
   - Chữ chính: `--color-text` (`#24332B`).
   - Chữ phụ: `--color-text-muted` (`#5E6B63`).
   - Điểm nhấn: `--color-primary` (`#4F7A5A`), `--color-accent-soft` (`#E3EDDD`).
2. **Kích thước chạm (Tap Targets):** Mọi nút và thẻ bấm trên mobile đều đạt tối thiểu 48x48px.
3. **Độ tương phản:** Đạt WCAG AA (chữ chính 11.6:1, chữ phụ 4.8:1 trên nền kem).
4. **Không giật lag / Không hiệu ứng nhấp nháy:** Chỉ sử dụng chuyển đổi êm dịu `duration-fast` (200ms), tuân thủ `prefers-reduced-motion`.

---

## 4. Kế hoạch Kiểm thử & Đánh giá

- `bun run typecheck`: Vượt qua 100%.
- `bun run lint`: Không phát hiện vi phạm lint hay styling.
- `bun run test`: Toàn bộ unit tests pass.
- Đảm bảo responsive hiển thị mượt mà trên cả 390px (mobile) và 1280px (desktop).
