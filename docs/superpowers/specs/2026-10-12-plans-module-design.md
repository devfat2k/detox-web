# Design Spec: Phân hệ Liệu Trình (`/plans` & `/plans/[planId]`)

- **Ngày tạo:** 12/10/2026
- **Trạng thái:** Đã duyệt thiết kế sơ bộ (Chờ phê duyệt tài liệu)
- **Tác giả:** Claude Code & phathuu26
- **Mục tiêu:** Xây dựng hoàn chỉnh Trang Danh sách Liệu trình (`/plans`) và Trang Chi tiết Liệu trình (`/plans/[planId]`), loại bỏ `UNDER_CONSTRUCTION_NOTICE`, tích hợp lịch 5 chai/ngày tái sử dụng `DetoxBottle`, tuân thủ chuẩn `DESIGN.md` và `docs/product-spec.md` §6.

---

## 1. Nguyên tắc & Ràng buộc cốt lõi

1. **Thương hiệu & Cảm xúc:** "Dịu - Ấm - Thoáng - Tươi nhẹ". Không phong cách phòng gym, không phòng khám, không áp lực thương mại bán hàng.
2. **Quy tắc chống "AI Slop" (Bắt buộc):**
   - Tuyệt đối cấm huy hiệu trạng thái (status badge) vô nghĩa như "Hot", "Best seller", "Khuyên dùng" cố định.
   - Tuyệt đối cấm hiệu ứng nhấp nháy, chớp giật (shimmer, pulse, bounce, ping).
   - Tuyệt đối cấm emoji trang trí hoặc ký tự đặc biệt làm icon.
   - Hạn chế tối đa chữ in hoa toàn bộ (ALL CAPS); chỉ dùng sentence-case hoặc chữ hoa nhỏ tracking rộng cho kicker.
   - Không dùng màu đen thuần `#000` hay trắng tinh `#fff`; chỉ dùng token chuẩn từ `src/app/globals.css`.
3. **Typography & Icon:**
   - Duy nhất phông chữ **Be Vietnam Pro** với trọng số thanh mảnh (`300`, `400`, `500`, `600`). Không dùng `font-bold` (700+).
   - Biểu tượng duy nhất từ thư viện `lucide-react` nét mảnh (`strokeWidth={1.75}`).
4. **Tối giản Dữ liệu (YAGNI):**
   - Chỉ tạo duy nhất 1 lịch trình 5 chai mẫu trong `src/data/plans.ts` và tái sử dụng cho các ngày của 3 gói (1 ngày, 3 ngày, 6 ngày) nhằm tránh mock quá nhiều dữ liệu trước khi mapping API chính thức.
5. **Kiến trúc Kỹ thuật:**
   - 100% Server Components cho cả hai trang (`/plans` và `/plans/[planId]`).
   - Tối ưu SEO và hiệu năng với `generateStaticParams` cho 3 routes: `1-day`, `3-day`, `6-day`.

---

## 2. Mô hình Dữ liệu (`src/data/plans.ts`)

Mở rộng trực tiếp interface và dữ liệu trong `src/data/plans.ts`:

```typescript
export interface PlanBottle {
  readonly time: string;           // "07:00", "10:00", "13:00", "16:00", "19:00"
  readonly name: string;           // Tên thức uống hiển thị
  readonly desc: string;           // Mô tả hương vị và cảm nhận nhẹ bụng
  readonly drinkSlug: string;      // Đường dẫn chi tiết: "ep-can-tay-tao"
  readonly color: "green" | "warm" | "soft"; // Màu chai DetoxBottle
  readonly level: number;          // Mức nước trong chai (60 - 85)
}

export interface PlanDaySchedule {
  readonly dayNumber: number;      // 1, 2, 3...
  readonly theme: string;          // Chủ đề ngày (vd: "Khởi động nhẹ nhàng")
  readonly bottles: readonly PlanBottle[];
}

export interface Plan {
  readonly id: PlanId;             // "1-day" | "3-day" | "6-day"
  readonly title: string;
  readonly durationDays: number;
  readonly totalBottles: number;
  readonly kcalRange: string;      // "850 - 950 kcal/ngày"
  readonly description: string;
  readonly tagline: string;
  readonly suitableFor: readonly string[];
  readonly notSuitableFor: readonly string[];
  readonly preparationGuide: string;
  readonly recoveryGuide: string;
  readonly days: readonly PlanDaySchedule[];
}
```

### Bộ khung 5 chai mẫu (Dùng chung):
1. `07:00` · **Xanh Tươi Cần Tây Táo** (`ep-can-tay-tao`) · Xanh mát, đánh thức tiêu hóa (`green`, 60%)
2. `10:00` · **Cam Cà Rốt Ấm Nồng** (`ep-ca-rot-cam-gung`) · Bổ sung vitamin, ấm bụng (`warm`, 75%)
3. `13:00` · **Xanh Đậm Kale Dưa Leo** (`ep-cai-kale-dua-leo`) · Bổ sung khoáng chất diệp lục (`green`, 70%)
4. `16:00` · **Đỏ Rực Củ Dền Thơm** (`ep-cu-den-dua-thom`) · Giải nhiệt, vị ngọt tự nhiên (`warm`, 80%)
5. `19:00` · **Sữa Hạt Dịu Nhẹ** (`ep-can-tay-tao`) · Béo bùi thanh nhẹ, thư giãn cuối ngày (`soft`, 85%)

---

## 3. Thiết kế Giao diện

### 3.1. Trang Danh sách Liệu trình (`/plans`)

- **Vị trí file:** `src/features/plans/components/PlanList.tsx`
- **Cấu trúc:**
  1. **Header Section:**
     - `Kicker`: `"01 · Lộ trình tham khảo"` (font Be Vietnam Pro, chữ thường thanh mảnh).
     - `Heading` level 1 (`3xl`, weight 500): *"Ba lựa chọn theo nhu cầu cơ thể"*.
     - Mô tả: Giới thiệu ngắn về nguồn gốc menu từ rau củ quả tươi Đà Lạt, hỗ trợ hệ tiêu hóa nghỉ ngơi.
     - Dòng gợi ý: *"Nếu bạn chưa rõ gói nào phù hợp với thể trạng cá nhân, hãy [làm bài khảo sát nhanh](/consultation)."*
  2. **Grid 3 Thẻ Liệu trình (`Card`):**
     - Mobile: 1 cột; Desktop: 3 cột (`grid-cols-1 md:grid-cols-3 gap-6`).
     - Nội dung mỗi thẻ:
       - Thông số gọn gàng dạng văn bản nhỏ: `1 ngày · 5 chai · ~850–950 kcal/ngày` (màu `text-text-muted`).
       - `Heading` level 2 (`xl`, weight 500): Tên liệu trình (vd: *"Khởi đầu 1 ngày"*).
       - Mô tả ngắn gọn (2 dòng).
       - Chân thẻ: `LinkButton` variant `secondary` trỏ sang `/plans/[id]` với nhãn *"Xem chi tiết lộ trình"*.
     - **Không có:** Bất kỳ badge trạng thái hay nhãn "Bán chạy / Khuyên dùng" cố định.

### 3.2. Trang Chi tiết Liệu trình (`/plans/[planId]`)

- **Vị trí file:** `src/features/plans/components/PlanDetail.tsx`
- **Cấu trúc:**
  1. **Thanh điều hướng phụ:**
     - Nút trở về: Link dạng text `"← Quay lại danh sách liệu trình"` dẫn về `/plans`.
  2. **Header Liệu trình:**
     - `Kicker`: `"Liệu trình [X] ngày · Thực đơn nông sản tươi"`.
     - `Heading` level 1 (`3xl`, weight 500): Tên đầy đủ của liệu trình.
     - Thanh tóm tắt thông số tĩnh (ngăn cách bằng `·`): Thời gian, Tổng số chai, Năng lượng ước tính.
     - Mô tả chi tiết liệu trình.
  3. **Lịch uống từng ngày (`Daily Schedule`):**
     - Lặp qua mảng `plan.days`:
       - Tiêu đề ngày: `Heading` level 2 (`xl`, weight 500), ví dụ: *"Ngày [N] · [Chủ đề ngày]"*.
       - Danh sách 5 chai: Grid responsive hiển thị `DetoxBottle` phẳng, mốc giờ uống, tên thức uống, mô tả ngắn, và link sang chi tiết thức uống `/drinks/[slug]`.
  4. **Khối Hướng dẫn & Lưu ý sức khỏe (2 `Card` nền `#FFFDF9`):**
     - **Thẻ 1 - Đối tượng:**
       - Ai nên trải nghiệm (người cần thanh nhẹ sau tiệc, người muốn bổ sung chất xơ).
       - Ai chưa nên thử (phụ nữ mang thai, huyết áp thấp nặng, bệnh thận hoặc dạ dày cấp).
     - **Thẻ 2 - Chuẩn bị & Ăn lại:**
       - Trước liệu trình: 1-2 ngày giảm thịt đỏ, đồ chiên rán, uống đủ nước lọc.
       - Sau liệu trình: Bắt đầu lại bằng cháo súp thanh nhẹ, không ăn no dồn dập.
  5. **Footer & Miễn trừ trách nhiệm:**
     - Nút CTA chuyển tiếp: `LinkButton` variant `primary` trỏ sang `/consultation`: *"Kiểm tra độ phù hợp của bạn"*.
     - Dòng miễn trừ y tế: *"Thông tin mang tính tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa."*

---

## 4. Kế hoạch Kiểm thử & Đảm bảo Chất lượng

1. **Unit Test (`src/features/plans/components/PlanList.test.tsx` & `PlanDetail.test.tsx`):**
   - Kiểm tra render đúng 3 gói trong `PlanList`.
   - Kiểm tra hiển thị đủ các section của `PlanDetail`: Thông số, 5 chai/ngày kèm mốc giờ, hướng dẫn trước/sau, miễn trừ.
   - Kiểm tra không có text rác, không dùng emoji, không có status badge.
2. **Typecheck & Lint:**
   - Chạy `bun run typecheck` và `bun run lint` đảm bảo 100% strict.
3. **Accessibility & Responsive:**
   - Tap targets ≥ 48px cho các nút bấm.
   - Thử nghiệm trên kích thước 390px (mobile) và 1280px (desktop).
