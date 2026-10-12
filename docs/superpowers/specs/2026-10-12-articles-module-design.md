# Đặc tả thiết kế phân hệ Bài viết (Articles Module Design Spec)
*Áp dụng DNA thiết kế Hallmark Hum-07 ("Bubble" / Editorial Calm)*

- **Ngày cập nhật:** 2026-10-12
- **Tài liệu tham chiếu gốc:** `docs/product-spec.md` (§3, §7, §10), `DESIGN.md`, `CLAUDE.md`, `docs/superpowers/specs/2026-10-10-hum-07-home-redesign.md`.
- **Trạng thái:** Sẵn sàng phê duyệt & lập kế hoạch triển khai.

---

## 1. Mục tiêu & DNA Thiết kế Hallmark Hum-07

### 1.1. Mục tiêu
- Xây dựng hoàn chỉnh giao diện và luồng xem danh sách bài viết (`/articles`) và chi tiết bài viết (`/articles/[slug]`).
- Xóa bỏ triệt để biển báo tạm `UNDER_CONSTRUCTION_NOTICE`.
- Cung cấp kiến thức dinh dưỡng, mẹo chuẩn bị, và công thức làm tại nhà dựa trên nguồn kiểm chứng y khoa trung thực, khách quan.

### 1.2. Áp dụng Hallmark Hum-07 DNA
1. **Phân cấp Header & Kicker chuẩn Hum-07:**
   - Sử dụng `<Kicker>03 · {FIXED_LABELS.PAGE_ARTICLES_TITLE}</Kicker>`.
   - Tiêu đề chính `H1` phong cách editorial điềm tĩnh kèm gạch chân nhẹ nhấn tone màu chủ đạo (`decoration-primary/40 underline decoration-2 underline-offset-4`).
2. **Micro-trust Bar (Đặc trưng Hum-07):**
   - Thanh nhận diện tin cậy phân tách bằng dấu chấm giữa:
     `NGUỒN Y KHOA KIỂM CHỨNG · NỘI DUNG TRUNG THỰC · KHÔNG QUẢNG CÁO BÁN HÀNG`
3. **Card Sản phẩm & Bài viết Đồng bộ (Hum-07 Card Architecture):**
   - Thẻ bài viết `ArticleCard` kế thừa chuẩn thẻ của `DrinkCard` và `PlanList`:
     - Khung hiển thị trực quan tỷ lệ `aspect-16/10` nền `bg-accent-soft/30 border border-border/40` với biểu tượng minh họa chủ đề bài đọc thanh lịch (`BookOpen`, `HeartPulse`, `Sparkles`).
     - Dải thông tin: Tên danh mục chữ phẳng (`text-xs font-medium text-primary`), thời gian đọc (`Clock` icon nét mảnh + `text-xs text-text-muted`), số lượng nguồn trích dẫn.
     - Nút chân thẻ `w-full` kiểu `secondary` với icon mũi tên nét mảnh `ArrowRight` trượt êm ái khi hover (`group-hover:translate-x-1`).
4. **Honest Science (Khoa học Minh bạch - DNA Hum-07 Honest Math):**
   - Khối trích dẫn nguồn cuối bài đọc với danh mục tổ chức nghiên cứu cụ thể (Harvard Health, Viện Dinh Dưỡng, Mayo Clinic), minh bạch tuyệt đối về giới hạn của nước ép, không che giấu sự thật y khoa.

### 1.3. Ràng buộc bất biến (Hard Constraints)
1. **Không API:** 100% dữ liệu tĩnh cục bộ được định kiểu chặt chẽ trong `src/data/articles.ts`. Không gọi bất kỳ REST/GraphQL API nội bộ hay dịch vụ bên thứ 3 nào.
2. **Mock tối thiểu:** Tối đa đúng 2 bài viết mẫu chuẩn mực. Không tạo nhiều dữ liệu thừa.
3. **Tuân thủ quy chuẩn y tế & khoa học:**
   - Không dùng từ ngữ cam kết y tế hoặc chữa bệnh ("thải độc sâu", "chữa bệnh", "đốt mỡ", "cam kết giảm kg").
   - Bắt buộc có khối "Nguồn tham khảo & Kiểm chứng" ở cuối mỗi bài viết với tổ chức uy tín (Harvard Health, Viện Dinh Dưỡng, Mayo Clinic...).
4. **Không AI-Slop & Chống rác thị giác:**
   - CẤM mọi loại thẻ trạng thái (Status Badge / Pill Badge).
   - CẤM mọi hiệu ứng chớp nháy, rung lắc, nhấp nháy liên tục (`animate-pulse` trên nội dung chính).
   - Phông chữ duy nhất `Be Vietnam Pro` (chỉ dùng trọng số 300, 400, 500, 600; cấm font-bold 700+).
   - Icon duy nhất từ `lucide-react` với `strokeWidth={1.75}`, cấm dùng emoji hoặc ký tự văn bản làm icon.

---

## 2. Mô hình dữ liệu (`src/data/articles.ts`)

```typescript
export type ArticleCategory = "tips" | "recipes" | "knowledge";

export interface ArticleSource {
  readonly title: string;
  readonly organization: string; // "Harvard Health Publishing" | "Viện Dinh dưỡng Quốc gia" | "Mayo Clinic"
  readonly url?: string;
}

export interface ArticleSection {
  readonly heading?: string;
  readonly content: string;
}

export interface Article {
  readonly slug: string;
  readonly title: string;
  readonly category: ArticleCategory;
  readonly categoryName: string;
  readonly excerpt: string;
  readonly publishedAt: string;
  readonly readingTime: string;
  readonly sections: readonly ArticleSection[];
  readonly sources: readonly ArticleSource[];
}
```

### 2 Bài viết mẫu chuẩn:
1. **Slug:** `hieu-dung-ve-thai-doc-tu-nhien`
   - **Tiêu đề:** "Hiểu đúng về cơ chế tự thải độc của gan và thận"
   - **Danh mục:** `knowledge` ("Kiến thức")
   - **Tóm tắt:** "Nước ép rau củ đóng vai trò hỗ trợ cung cấp vi chất và nước, trong khi gan và thận mới là cơ quan đào thải độc tố tự nhiên chính yếu của cơ thể."
   - **Nguồn:**
     - Harvard Health Publishing: "The dubious practice of detox"
     - Viện Dinh dưỡng Quốc gia Việt Nam: "Khuyến nghị tiêu thụ rau củ quả hàng ngày"
2. **Slug:** `huong-dan-chuan-bi-truoc-khi-detox`
   - **Tiêu đề:** "Hướng dẫn chuẩn bị cơ thể 2 ngày trước khi detox"
   - **Danh mục:** `tips` ("Mẹo vặt")
   - **Tóm tắt:** "Cách giảm dần lượng caffeine và thức ăn khó tiêu để cơ thể thích ứng tự nhiên, không gây cảm giác đói lả hay mệt mỏi đột ngột."
   - **Nguồn:**
     - Mayo Clinic: "Juicing: What are the health benefits?"

---

## 3. Kiến trúc giao diện & Thành phần (UI Components)

### 3.1. `ArticleCard.tsx` (Hallmark Hum-07 Card Architecture)
- **Nhiệm vụ:** Thẻ hiển thị bài viết tái sử dụng cho `/articles` và Trang chủ `/`.
- **Bố cục:**
  - Khung minh họa chủ đề tỷ lệ `aspect-16/10` nền `bg-accent-soft/30 border border-border/40 rounded-xl` chứa icon chủ đề thanh lịch (`BookOpen` hoặc `HeartPulse` cỡ `h-8 w-8 text-primary/70`).
  - Dải thông tin:
    - Phân loại: Dòng chữ phẳng (`text-xs font-medium text-primary`), KHÔNG dùng khung viền Badge.
    - Thời gian đọc: Kèm icon `Clock` nét mảnh (`text-xs text-text-muted`).
    - Dấu chấm tách: `·`.
    - Số lượng nguồn: `2 nguồn kiểm chứng`.
  - Tiêu đề: `Heading level={3} size="xl" font-medium text-text line-clamp-2`.
  - Tóm tắt: `text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3`.
  - Nút chân thẻ: `LinkButton` kiểu `secondary` toàn chiều rộng (`w-full`), chữ "Đọc tiếp" kèm icon `ArrowRight` (`strokeWidth={1.75}`) trượt nhẹ khi hover.

### 3.2. `ArticleList.tsx` (Trang danh mục `/articles`)
- **Nhiệm vụ:** Danh sách bài viết toàn diện với nhận diện Hum-07.
- **Bố cục:**
  - Header trang: Kicker `03 · BÀI VIẾT & KIẾN THỨC`, tiêu đề H1 editorial có nét gạch nhấn thương hiệu, mô tả nhẹ nhàng.
  - Micro-trust bar: `NGUỒN Y KHOA KIỂM CHỨNG · NỘI DUNG TRUNG THỰC · KHÔNG QUẢNG CÁO BÁN HÀNG`.
  - Bộ lọc danh mục 1 chạm (Tabs): Tất cả · Mẹo vặt · Công thức · Kiến thức (style phẳng tinh tế, active dùng `bg-accent-soft text-primary font-medium border border-primary/50`).
  - Lưới bài viết: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
  - Đếm số lượng & chỉ số đọc minh bạch ở chân danh mục.

### 3.3. `ArticleDetail.tsx` (Trang chi tiết `/articles/[slug]`)
- **Nhiệm vụ:** Trình bày bài đọc chuyên sâu chuẩn nhịp đọc editorial.
- **Bố cục:**
  - Thanh quay lại: Nút quay lại `/articles` kèm icon `ArrowLeft`.
  - Header bài viết:
    - Kicker phân loại + Ngày đăng + Thời lượng đọc.
    - Tiêu đề H1 lớn, thanh thoát (`text-2xl sm:text-3xl lg:text-4xl font-medium`).
    - Đoạn tóm tắt dẫn đề (`text-base sm:text-lg text-text-muted italic border-l-2 border-primary/40 pl-4`).
  - Thân bài đọc (`max-w-3xl`):
    - Các tiêu đề con H2 (`Heading level={2} size="xl"`).
    - Các đoạn văn bản phân đoạn chuẩn khoảng cách thở.
  - Khối Honest Science ("Nguồn tài liệu tham khảo & Kiểm chứng khoa học"):
    - Hộp nổi bật nền `bg-surface border border-border/80 rounded-2xl p-6 sm:p-7 space-y-4`.
    - Liệt kê cụ thể tên tổ chức, tên nghiên cứu/bài báo, link xem (mở tab an toàn).
  - Khối Lưu ý y tế & CTA đồng hành:
    - Lưu ý trung thực: Không thay thế chẩn đoán bác sĩ.
    - CTA: Nút "Tư vấn lộ trình cá nhân hóa" (`ROUTES.CONSULTATION`).

---

## 4. Kế hoạch kiểm thử (TDD Strategy)

1. **`src/data/articles.test.ts`**:
   - Kiểm tra đúng tối đa 2 bài viết mẫu.
   - Mỗi bài viết có đầy đủ `sections` và `sources` (ít nhất 1 nguồn y khoa uy tín).
   - Tuyệt đối không chứa từ ngữ cam kết sai lệch y tế.
2. **`src/features/articles/components/ArticleCard.test.tsx`**:
   - Render đúng tiêu đề, tóm tắt, danh mục, thời gian đọc, số nguồn.
   - Kiểm tra không có badge, không có hashtag, không chứa từ cấm y tế.
   - Chứa đường dẫn đúng tới `/articles/[slug]`.
3. **`src/features/articles/components/ArticleList.test.tsx`**:
   - Render header Hum-07 với kicker, micro-trust bar, bộ lọc danh mục.
   - Lọc bài viết theo danh mục chính xác.
   - Không chứa `UNDER_CONSTRUCTION_NOTICE`.
4. **`src/features/articles/components/ArticleDetail.test.tsx`**:
   - Render đầy đủ sections và khối Honest Science (trích dẫn nguồn).
   - Render nút quay lại và CTA tư vấn lộ trình.
   - Không chứa `UNDER_CONSTRUCTION_NOTICE`.
