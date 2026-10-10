# DESIGN.md — Hướng dẫn Thiết kế & Gu Thẩm mỹ ("Ép Xanh Chữa Lành")

Tài liệu này định hình giao diện, gu thẩm mỹ và các tokens thiết kế cho website "Ép Xanh Chữa Lành". Mọi thiết kế và giao diện phải tuân thủ nghiêm ngặt các quy tắc dưới đây nhằm tránh tình trạng "AI slop" (giao diện nhạt nhẽo, rập khuôn).

---

## 1. Cảm giác thương hiệu

### Bốn tính từ

- **Dịu:** nhìn vào thấy thở được, không bị thúc ép.
- **Ấm:** như một quán nhỏ có người thật đứng sau, không phải một hệ thống.
- **Thoáng:** nhiều khoảng trống, mỗi màn hình chỉ có một ý chính.
- **Tươi nhẹ:** có sức sống từ một màu xanh lá và ảnh thật, không cần rực rỡ.

### Ba điều “không phải”

- **Không phải phòng gym:** không neon, không chữ in hoa gào, không số liệu to khoe thành tích.
- **Không phải phòng khám:** không xanh dương trắng vô trùng, không khung cảnh báo dày, không biểu tượng y tế. Điều này cũng giúp web không có cảm giác “chữa bệnh”.
- **Không phải trang bán hàng giảm giá:** không badge chồng badge, không đỏ cam kêu gọi, không hiệu ứng chớp nháy. Web này miễn phí và không có giao dịch, nên giao diện cũng không nên trông như đang bán.

### Quy tắc cấm bổ sung (Anti-patterns)

- **Cấm tuyệt đối** gradient blob, glassmorphism, bóng đổ nặng, hiệu ứng ánh sáng neon.
- **Cấm tuyệt đối** lưới 3 card "icon trên - tiêu đề giữa - mô tả dưới" lặp lại vô tận.
- **Cấm tuyệt đối** sử dụng badge status nhiều màu sắc chớp nháy hoặc nhiều kiểu chip/badge cùng lúc.
- **Cấm tuyệt đối** badge status không có mục đích (chỉ cho phép tối đa 1 tag "Khuyên dùng" tại đúng 1 lộ trình phù hợp với kết quả khảo sát trong mỗi viewport).
- **Cấm tuyệt đối** sử dụng hình ảnh AI (Midjourney, DALL-E, v.v.) hoặc ảnh stock vô hồn.
- **Cấm tuyệt đối** sử dụng emoji trang trí hoặc làm icon.
- **Cấm tuyệt đối** circle/badge bọc nhiều màu sắc bên ngoài icon.
- **Cấm tuyệt đối** sử dụng màu đen đậm thô inline (`#000`, `black`, `#000000`) và trắng tinh (`#fff`, `white`, `#ffffff`).
- **Cấm tuyệt đối** thẻ có viền màu dày lệch cạnh (side-stripe card 4-6px).
- **Cấm tuyệt đối** dùng font nghiêng (italic) cho tiêu đề/display text.
- **Cấm tuyệt đối** hiệu ứng nhấp nháy, lặp vô hạn, tự chạy (bounce, shimmer, ping).

---

## 2. Thang màu theo vai trò (Tokens)

Tất cả các cặp màu chữ và nền đều đạt chuẩn **WCAG AA** (văn bản thường ≥ 4.5:1, văn bản lớn ≥ 3.0:1). Bảng màu gồm đúng 4 nhóm vai trò màu chính.

| Vai trò | CSS Token | Mã Hex | Ghi chú & Quy tắc |
| :--- | :--- | :--- | :--- |
| **Nền (Background)** | `--color-bg` | `#FBF7F0` | Kem ấm, thay cho trắng tinh. Tuyệt đối không dùng trắng tinh `#FFF` hoặc `#FFFFFF` |
| **Bề mặt (Surface)** | `--color-surface` | `#FFFDF9` | Thẻ và khối nổi nhẹ |
| **Chữ (Text)** | `--color-text` | `#24332B` | Mực xanh than đậm hữu cơ, thay cho đen thuần. Tuyệt đối không dùng `#000000` |
| **Chữ phụ (Muted)** | `--color-text-muted` | `#5E6B63` | Mô tả, ghi chú |
| **Nhấn chính (Primary)** | `--color-primary` | `#4F7A5A` | Xanh lá trầm dịu (sage/forest), chỉ dùng cho hành động chính, tối đa ~10% diện tích |
| **Nhấn nhạt (Soft)** | `--color-accent-soft` | `#E3EDDD` | Nền chip, vùng được chọn |
| **Viền (Border)** | `--color-border` | `#E6DFD2` | Viền mảnh hairline 1px thay cho bóng đổ |
| **Cảnh báo trầm (Notice/Error)** | `--color-error` | `#8F3D30` | Sắc đỏ đất nung trầm tự nhiên, không dùng đỏ/vàng chói gắt |

---

## 3. Chữ (Typography)

Sử dụng duy nhất và chính thức 1 họ phông chữ: **Be Vietnam Pro**.

- **Phong cách:** Thanh mảnh, nhẹ nhàng, tối giản hữu cơ.
- **Trọng số (Weights):** `300` (light), `400` (regular), `500` (medium), `600` (semibold). Tuyệt đối không dùng `bold` (700) hoặc trọng số quá dày thô.
- **Tiêu đề & Nhãn:** Trọng số tối đa `500` hoặc `600`, kích thước vừa phải, thanh thoát.
- **Câu chữ:** Ngắn gọn, súc tích, đơn giản; không viết dài dòng cầu kỳ làm vỡ layout.

- **Thang cỡ chữ (6 bậc):**
  - `xs`: 12px (`0.75rem`) / line-height 1.4 (nhãn micro, kicker)
  - `sm`: 14px (`0.875rem`) / line-height 1.5 (chú thích, mô tả phụ)
  - `base`: 16px (`1rem`) / line-height 1.6 (thân bài, input)
  - `xl`: 20px (`1.25rem`) / line-height 1.4 (tiêu đề nhỏ)
  - `2xl`: 24px (`1.5rem`) / line-height 1.3 (tiêu đề vừa)
  - `3xl`: 30px (`1.875rem`) / line-height 1.2 (tiêu đề lớn nhất, thanh lịch)
- **Giới hạn độ dài dòng:** Tối đa 60–65 ký tự (`max-w-prose`). Chữ trên mobile từ 16px trở lên.
- **Quy tắc câu chữ:** Tiếng Việt sentence case, xưng hô "mình"/"bạn". Không dùng ALL CAPS cho đoạn văn bản dài.
- **Biểu tượng:** Chỉ dùng Lucide React icons với nét mảnh (`strokeWidth={1.75}`). Tuyệt đối CẤM dùng emoji hoặc text để làm icon.

---

## 4. Không gian và hình khối

- **Thang spacing (4-point grid):** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`.
- **Bo góc (2 giá trị):**
  - `rounded-lg` (8px): Dành cho input, nút bấm, chip, kicker.
  - `rounded-xl` (12px): Dành cho thẻ (card), khối container, hộp thông báo (notice).
- **Không dùng bóng đổ (`shadow: none`):** Sử dụng đường viền mảnh 1px (`#E6DFD2`) để phân tách bề mặt.

---

## 5. Thành phần chính (Core Components)

1. **Nút bấm (Button / LinkButton):**
   - *Primary:* Nền Nhấn chính (`#4F7A5A`), chữ Kem ấm (`#FBF7F0`). Tap target ≥ 48px (tối thiểu 44px).
   - *Secondary:* Viền mảnh (`#E6DFD2`), nền Bề mặt (`#FFFDF9`).
   - *Ghost:* Chữ trần không viền.
2. **Thẻ (Card):**
   - Nền Bề mặt (`#FFFDF9`), viền 1px (`#E6DFD2`), bo góc 12px. **Tuyệt đối không card lồng card.**
3. **Chip lựa chọn:**
   - Chỉ 1 kiểu duy nhất trên toàn site: nền `#FBF7F0`, viền `#E6DFD2`; khi chọn: nền Nhấn nhạt (`#E3EDDD`) và viền `#4F7A5A`.
4. **Hộp thông báo (Notice):**
   - Dùng viền hairline toàn phần `#E6DFD2`, nền `#FFFDF9`, biểu tượng và nhãn ngữ nghĩa (không dùng viền lệch dày 4px).
5. **Kicker:**
   - Nhãn nhỏ dẫn dắt dạng "01 · Thông tin cơ thể", font Be Vietnam Pro medium, tracking rộng.
6. **Reveal:**
   - Hiệu ứng xuất hiện khi cuộn bằng IntersectionObserver, chỉ chạy 1 lần duy nhất, tắt khi prefers-reduced-motion.

---

## 6. Icon & Chuyển động

### Bộ Icon chính thức

- Sử dụng duy nhất thư viện `lucide-react`.
- Kích thước `size={18}` hoặc `size={20}`, nét `strokeWidth={1.5}` đến `1.75`.
- Màu sắc kế thừa `currentColor` hoặc token `text-text`, `text-text-muted`.
- **Cấm tuyệt đối:** Circle/badge bọc nhiều màu sắc bên ngoài icon. Icon đứng trần hoặc nằm phẳng trong nút/dòng chữ.

### Chuyển động (Motion Budget)

- Chỉ dùng `opacity` và `transform`, thời gian 200–300ms (`cubic-bezier(0.22, 0.61, 0.36, 1)`).
- **Cấm lặp vô hạn, cấm pulse, bounce, ping, shimmer.**
- Luôn tôn trọng cấu hình `prefers-reduced-motion` (tắt hẳn chuyển động).

---

## 7. Ảnh & Media

- Dùng ảnh thật của sản phẩm/quán ép.
- Khi chưa có ảnh thật: Dùng khối màu Nhấn nhạt (`#E3EDDD`) kết hợp viền (`#E6DFD2`).
- **Cấm tuyệt đối ảnh stock, ảnh AI, hoặc emoji trang trí.**
