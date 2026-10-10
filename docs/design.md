# Design Foundation & Hệ Thống Nhận Diện ("Ép Xanh Chữa Lành")

Tài liệu này lưu trữ DNA thiết kế và tokens chính thức cho website "Ép Xanh Chữa Lành" (detox-web), được trích xuất từ DNA Narrative Workflow (hum-07) kết hợp với các ràng buộc khắt khe chống AI-slop.

---

## 1. Nguyên tắc cốt lõi (Core Principles)

- **Ấm và sạch:** Bề mặt kem ấm dịu mắt thay cho màu trắng tinh vô trùng; gợi cảm giác một tiệm nước ép thủ công tử tế, có người thật đứng sau.
- **Bình tĩnh và đáng tin:** Trình bày tuần tự như một lời trò chuyện chân thành; không hối thúc, không giật gân, không cam kết phóng đại.
- **Không y tế, không startup chung chung:** Tuyệt đối tránh giao diện phòng khám (xanh dương - trắng vô trùng) và phong cách wellness-startup bóng bẩy (gradient blob, glassmorphism, 3-card lặp lại).
- **Tiết chế tối đa:** Mỗi màn hình chỉ một thông điệp chính; tối đa một điểm nhấn thị giác trong mỗi viewport; ưu tiên nhịp thở và khoảng trống rộng rãi.
- **Thành thật về chất liệu:** Sử dụng đúng 4 vai trò màu neo, 1 kiểu chip thống nhất, hình ảnh thực tế và biểu tượng trung tính phẳng.

---

## 2. Bảng màu tối giản (4 Token Chính)

Chỉ sử dụng đúng 4 nhóm vai trò màu chính trên toàn site. Mọi cặp tương phản đạt chuẩn WCAG AA (≥ 4.5:1 với văn bản thường, ≥ 3:1 với chữ lớn).

| Vai trò | CSS Token | Mã Hex / Giá trị | Ý nghĩa & Quy tắc |
| :--- | :--- | :--- | :--- |
| **Nền kem ấm** | `--color-bg`<br>`--color-surface` | `#FBF7F0`<br>`#FFFDF9` | Nền tổng thể và bề mặt thẻ nổi nhẹ. Cấm dùng trắng tinh `#FFFFFF`. |
| **Mực gần-đen ấm** | `--color-text`<br>`--color-text-muted` | `#24332B`<br>`#5E6B63` | Chữ chính và mô tả phụ (xanh than đậm hữu cơ). Cấm dùng đen thô `#000000`. |
| **Accent xanh lá trầm** | `--color-primary`<br>`--color-accent-soft` | `#4F7A5A`<br>`#E3EDDD` | Một màu nhấn duy nhất (sage/forest), chiếm tối đa ~10% diện tích. Biến thể soft cho nền chip được chọn. |
| **Đường kẻ / Viền** | `--color-border` | `#E6DFD2` | Viền hairline mảnh 1px thay thế hoàn toàn cho bóng đổ. |

*Lưu ý về hộp cảnh báo/thông báo:* Notice dùng biến thể của chính bảng màu này (viền hairline `#E6DFD2`, bề mặt `#FFFDF9`, biểu tượng và nhãn chữ phân biệt ngữ nghĩa), tuyệt đối không dùng màu vàng chanh hoặc đỏ tươi chói gắt. Trường hợp cảnh báo nghiêm trọng dùng sắc thái đất nung trầm tự nhiên (`#8F3D30`).

---

## 3. Thang chữ (Typography)

Sử dụng duy nhất và chính thức 1 họ phông chữ: **Be Vietnam Pro**.

- **Phong cách:** Thanh mảnh, nhẹ nhàng, tối giản hữu cơ.
- **Trọng số (Weights):** `300` (light), `400` (regular), `500` (medium), `600` (semibold). Tuyệt đối không dùng `bold` (700+) hoặc trọng số quá dày thô.
- **Tiêu đề & Nhãn:** Trọng số tối đa `500` hoặc `600`, thanh thoát, không font size quá to, câu chữ ngắn gọn không làm vỡ layout.
- **Biểu tượng:** Chỉ dùng Lucide React icons (`strokeWidth={1.75}`). Tuyệt đối CẤM dùng emoji hoặc text làm icon.

### Thang cỡ chữ (Type Scale)
- `xs`: `0.75rem` (12px) · line-height `1.4` (nhãn micro, kicker)
- `sm`: `0.875rem` (14px) · line-height `1.5` (chú thích, nhãn phụ)
- `base`: `1rem` (16px) · line-height `1.6` (nội dung thân bài, input)
- `xl`: `1.25rem` (20px) · line-height `1.4` (tiêu đề mục nhỏ)
- `2xl`: `1.5rem` (24px) · line-height `1.3` (tiêu đề mục vừa)
- `3xl`: `1.875rem` (30px) · line-height `1.2` (tiêu đề trang / hero)

---

## 4. Không gian và Khối hình (Spacing, Radius & Border)

- **Hệ thống khoảng cách (4-pt grid):**
  - `--spacing-1`: `0.25rem` (4px)
  - `--spacing-2`: `0.5rem` (8px)
  - `--spacing-3`: `0.75rem` (12px)
  - `--spacing-4`: `1rem` (16px)
  - `--spacing-6`: `1.5rem` (24px)
  - `--spacing-8`: `2rem` (32px)
  - `--spacing-12`: `3rem` (48px)
  - `--spacing-16`: `4rem` (64px)
- **Độ dài dòng tối đa:** `60ch` - `65ch` (`max-w-prose`).
- **Bo góc (Border Radius):**
  - `--radius-lg`: `0.5rem` (8px) — nút bấm, ô nhập liệu, chip chọn, kicker.
  - `--radius-xl`: `0.75rem` (12px) — thẻ bề mặt (card), hộp thông báo (notice).
- **Bóng đổ (Shadow):** Không dùng bóng đổ nặng (`shadow: none`). Phân tách cấu trúc bằng viền mảnh 1px `--color-border`.

---

## 5. Quy tắc chuyển động (Motion Budget)

- **Thuộc tính cho phép:** Chỉ chuyển đổi `opacity` và `transform` (ví dụ: `translateY(8px)` dịch nhẹ về `0`).
- **Thời lượng:** `200ms` đến `300ms` (`--duration-fast: 200ms`, `--duration-normal: 300ms`).
- **Easing:** Easing mềm tự nhiên (`cubic-bezier(0.22, 0.61, 0.36, 1)`).
- **Reveal khi cuộn:** Chỉ chạy đúng 1 lần khi phần tử lọt vào tầm nhìn (`IntersectionObserver`, `triggerOnce: true`).
- **Trợ năng (Reduced Motion):** Khi người dùng kích hoạt `prefers-reduced-motion`, tắt toàn bộ hiệu ứng chuyển dịch, hiển thị nội dung ngay lập tức.
- **Cấm:** Không dùng thư viện animation nặng, không parallax, không pulse, không shimmer/lặp vô hạn.

---

## 6. Danh sách "KHÔNG ĐƯỢC" (Anti-Patterns)

1. **KHÔNG** sử dụng gradient blob, hiệu ứng ánh sáng neon, hay hiệu ứng kính mờ (glassmorphism).
2. **KHÔNG** đổ bóng nặng (heavy shadows) hoặc viền màu dày lệch cạnh (side-stripe card 4-6px).
3. **KHÔNG** dùng emoji làm icon hoặc trang trí giao diện; chỉ dùng icon trung tính phẳng từ `lucide-react` (size 18-20px).
4. **KHÔNG** dựng lưới 3 card "icon trên - tiêu đề giữa - mô tả dưới" lặp lại vô tận.
5. **KHÔNG** dùng nhiều kiểu chip/badge cùng lúc; chỉ duy nhất 1 kiểu chip trên toàn site.
6. **KHÔNG** gắn tag nổi bật bừa bãi; thẻ "Khuyên dùng" là điểm nhấn DUY NHẤT trong mỗi viewport.
7. **KHÔNG** sử dụng font nghiêng (italic) cho tiêu đề hoặc display text.
8. **KHÔNG** lồng thẻ trong thẻ (card-in-card) gây rối mắt.
9. **KHÔNG** dùng màu đen thô (`#000`, `black`) hoặc trắng tinh (`#fff`, `white`).
10. **KHÔNG** dùng các hiệu ứng tự chạy lặp vô hạn (infinite loops, bounce, shimmer, typing cursor).
