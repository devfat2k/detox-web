# Design Spec: Hero Section Trang Chủ (DNA Hum-07 Bubble)

- **Ngày tạo:** 10/10/2026
- **Trạng thái:** Chờ phê duyệt (Draft)
- **Tác giả:** Claude Code & phathuu26
- **Nguồn cảm hứng:** Hallmark Hum-07 Hero (`6.png`) — 2-column layout, Stage ticker connected, Soft underline accent, Dual pill button pair, Micro-trust uppercase bar, Right visual stack with floating widget.

---

## 1. Cấu trúc Layout Hero Section

Bố cục 2 cột trên Desktop (`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`), 1 cột căn giữa chuẩn 390px trên Mobile.

### Cột Trái (lg:col-span-7)
1. **Stage Ticker kết nối**:
   - 3 nút pill có chấm màu chỉ số: `[● 01 Khởi đầu] — [● 02 Cân bằng] — [● 03 Chuyên sâu]`.
2. **Tiêu đề Display lớn & Nét gạch chân điểm nhấn (Accent Underline)**:
   - *"Nước ép tươi, chọn lộ trình phù hợp với thể trạng của bạn."*
   - Nét gạch chân nhã nhặn màu xanh lá `border-b-2 border-primary/40` dưới cụm từ *"lộ trình phù hợp với thể trạng"*.
3. **Mô tả Subhead súc tích**:
   - 2-3 câu giới thiệu phi thương mại, tôn trọng thể trạng tự nhiên.
4. **Bộ đôi nút bấm Pill Pair (Dual Action Buttons)**:
   - Nút chính (Primary Pill): **"Xem lộ trình của tôi"** (`LinkButton` variant="primary" `rounded-full`).
   - Nút phụ (Secondary Pill): **"Xem 3 giai đoạn lộ trình →"** (`LinkButton` variant="outline" `rounded-full` trỏ tới `#stages`).
5. **Dải Micro-trust chữ hoa nhỏ**:
   - `100% ÉP TƯƠI · KHÔNG TẠO TÀI KHOẢN · TÍNH TOÁN TRÊN MÁY BẠN`.

### Cột Phải (lg:col-span-5)
1. **Khối Visual Thương hiệu**:
   - Khối bo góc mềm `rounded-3xl bg-accent-soft/40 border border-border/80 p-8 flex flex-col items-center shadow-xs`.
   - Ảnh Logo chính thức `/images/logo.png` (avatar tròn 128x128px viền hairline).
2. **Floating Notification Widget**:
   - Hộp thông báo mẫu dạng widget lơ lửng bên dưới logo:
     `● ÉP XANH · TƯ VẤN THỰC TẾ`
     `Uống chậm từng ngụm 250ml — bổ sung chất xơ và vitamin tự nhiên.`

---

## 2. Ràng buộc Kỹ thuật
- Phông chữ: Duy nhất Be Vietnam Pro (300/400/500/600), không `font-bold` (700+).
- Tokens: Màu sắc từ `src/app/globals.css`.
- Không hex thô, không gradients, không backdrop-blur.
