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

### Quy tắc cấm bổ sung

- **Cấm tuyệt đối** sử dụng badge status nhiều màu sắc chớp nháy.
- **Cấm tuyệt đối** badge status không có mục đích (chỉ cho phép tối đa 1 tag "Khuyên dùng" tại đúng 1 lộ trình phù hợp với kết quả khảo sát).
- **Cấm tuyệt đối** sử dụng hình ảnh AI (Midjourney, DALL-E, v.v.).
- **Cấm tuyệt đối** sử dụng emoji trang trí hoặc làm icon.
- **Cấm tuyệt đối** circle/badge bọc nhiều màu sắc bên ngoài icon.
- **Cấm tuyệt đối** sử dụng màu đen đậm thô inline (`#000`, `black`, `#000000`).

---

## 2. Thang màu theo vai trò (Tokens)

Tất cả các cặp màu chữ và nền đều đạt chuẩn **WCAG AA** (văn bản thường ≥ 4.5:1, văn bản lớn ≥ 3.0:1).

| Vai trò | CSS Token | Mã Hex | Ghi chú & Quy tắc |
| :--- | :--- | :--- | :--- |
| **Nền (Background)** | `--color-bg` | `#FBF7F0` | Kem ấm, thay cho trắng tinh. Tuyệt đối không dùng trắng tinh `#FFF` hoặc `#FFFFFF` |
| **Bề mặt (Surface)** | `--color-surface` | `#FFFDF9` | Thẻ và khối nổi nhẹ |
| **Chữ (Text)** | `--color-text` | `#24332B` | Xanh than đậm, thay cho đen thuần |
| **Chữ phụ (Muted)** | `--color-text-muted` | `#5E6B63` | Mô tả, ghi chú |
| **Nhấn chính (Primary)** | `--color-primary` | `#4F7A5A` | Xanh lá dịu, chỉ dùng cho hành động chính, tối đa ~10% diện tích |
| **Nhấn nhạt (Soft)** | `--color-accent-soft` | `#E3EDDD` | Nền chip, vùng được chọn |
| **Nhấn phụ (Subtle)** | `--color-accent-subtle` | `#D9A98B` | Đào đất, chỉ cho chi tiết nhỏ. **Không dùng làm màu chữ** |
| **Viền (Border)** | `--color-border` | `#E6DFD2` | Viền mảnh thay cho bóng đổ |
| **Lỗi (Error)** | `--color-error` | `#B24A3A` | Đỏ gạch, không dùng đỏ tươi |

---

## 3. Chữ (Typography)

- **Phông tiêu đề:** `Bricolage Grotesque` (headings).
- **Phông thân bài:** `Be Vietnam Pro` (body).
- **Thang cỡ chữ (6 bậc):**
  - `xs`: 12px / line-height 1.4
  - `sm`: 14px / line-height 1.5
  - `base`: 16px / line-height 1.6
  - `xl`: 20px / line-height 1.4
  - `2xl`: 24px / line-height 1.3
  - `3xl`: 30px / line-height 1.2
- **Giới hạn độ dài dòng:** Tối đa 65 ký tự (`max-w-prose`). Chữ trên mobile từ 16px trở lên.
- **Quy tắc câu chữ:** Tiếng Việt sentence case, xưng hô "mình"/"bạn". Không dùng ALL CAPS.

---

## 4. Không gian và hình khối

- **Thang spacing (4-point grid):** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`.
- **Bo góc (2 giá trị):**
  - `rounded-lg` (8px): Dành cho input, nút bấm, chip.
  - `rounded-xl` (12px): Dành cho thẻ (card), khối container.
- **Không dùng bóng đổ (`shadow: none`):** Sử dụng đường viền mảnh 1px (`#E6DFD2`) để phân tách bề mặt.

---

## 5. Thành phần chính (Core Components)

1. **Nút bấm (Button):**
   - *Primary:* Màu Nhấn chính (`#4F7A5A`) với chữ Kem ấm (`#FBF7F0`). Tap target ≥ 48px.
   - *Secondary:* Viền mảnh (`#E6DFD2`) hoặc chữ trần.
2. **Thẻ (Card):**
   - Nền Bề mặt (`#FFFDF9`), viền 1px (`#E6DFD2`), bo góc 12px. **Tuyệt đối không card lồng card.**
3. **Chip / Radio chọn:**
   - Nền `#FBF7F0`, viền `#E6DFD2`; khi chọn: nền Nhấn nhạt (`#E3EDDD`) và viền `#4F7A5A`.
4. **Bottle Row (5 chai/ngày):**
   - Khối hiển thị 5 chai ép trong ngày, rõ dung tích và màu sắc tự nhiên của từng chai.

---

## 6. Icon & Chuyển động

### Bộ Icon chính thức

- Sử dụng duy nhất thư viện `lucide-react`.
- Kích thước `size={18}` hoặc `size={20}`, nét `strokeWidth={1.5}` đến `1.75`.
- Màu sắc kế thừa `currentColor` hoặc token `text-text`, `text-text-muted`.
- **Cấm tuyệt đối:** Circle/badge bọc nhiều màu sắc bên ngoài icon. Icon đứng trần hoặc nằm phẳng trong nút/dòng chữ.

### Chuyển động (Motion Budget)

- Chỉ dùng `opacity` và `transform`, thời gian dưới 200ms (`150ms ease-out`).
- **Cấm lặp vô hạn, cấm pulse, bounce, ping, shimmer.**
- Luôn tôn trọng cấu hình `prefers-reduced-motion`.

---

## 7. Ảnh & Media

- Dùng ảnh thật của sản phẩm/quán ép.
- Khi chưa có ảnh thật: Dùng khối màu Nhấn nhạt (`#E3EDDD`) kết hợp viền (`#E6DFD2`).
- **Cấm tuyệt đối ảnh stock, ảnh AI, hoặc emoji trang trí.**
