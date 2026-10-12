# Đặc tả thiết kế phân hệ Bài viết (Articles Module Design Spec)

- **Ngày tạo:** 2026-10-12
- **Tài liệu tham chiếu gốc:** `docs/product-spec.md` (§3, §7, §10), `DESIGN.md`, `CLAUDE.md`.
- **Trạng thái:** Bản thảo đã duyệt thiết kế sơ bộ, chờ xác nhận triển khai.

---

## 1. Mục tiêu và phạm vi

### 1.1. Mục tiêu
- Xây dựng hoàn chỉnh giao diện và luồng xem danh sách bài viết (`/articles`) và chi tiết bài viết (`/articles/[slug]`).
- Xóa bỏ triệt để biển báo tạm `UNDER_CONSTRUCTION_NOTICE`.
- Cung cấp kiến thức dinh dưỡng, mẹo chuẩn bị, và công thức làm tại nhà dựa trên nguồn kiểm chứng y khoa trung thực, khách quan.

### 1.2. Ràng buộc bất biến (Hard Constraints)
1. **Không API:** 100% dữ liệu tĩnh cục bộ được định kiểu chặt chẽ trong `src/data/articles.ts`. Không gọi bất kỳ REST/GraphQL API nội bộ hay dịch vụ bên thứ 3 nào.
2. **Mock tối thiểu:** Tối đa đúng 2 bài viết mẫu chuẩn mực. Không tạo nhiều dữ liệu thừa.
3. **Tuân thủ quy chuẩn y tế & khoa học:**
   - Không dùng từ ngữ cam kết y tế hoặc chữa bệnh ("thải độc sâu", "chữa bệnh", "đốt mỡ", "cam kết giảm kg").
   - Bắt buộc có khối "Nguồn tham khảo & Kiểm chứng" ở cuối mỗi bài viết với tổ chức uy tín (Harvard Health, Viện Dinh Dưỡng, Mayo Clinic...).
4. **Không AI-Slop & Chống rác thị giác:**
   - CẤM mọi loại thẻ trạng thái (Status Badge / Pill Badge).
   - CẤM mọi hiệu ứng chớp nháy, rung lắc, nhấp nháy liên tục (`animate-pulse` trên nội dung chính, etc.).
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

### 3.1. `ArticleCard.tsx`
- **Nhiệm vụ:** Thẻ hiển thị tóm tắt bài viết có tính tái sử dụng cao, dùng cho trang danh mục `/articles` và khối bài viết mới trên Trang chủ `/`.
- **Bố cục:**
  - Header thẻ: Danh mục hiển thị dạng chữ phẳng (`text-xs text-primary font-medium`) + Thời gian đọc (`text-xs text-text-muted`). Tuyệt đối không dùng khung viền Badge.
  - Tiêu đề: `Heading level={3} size="xl"` với `font-medium text-text line-clamp-2`.
  - Tóm tắt: Đoạn văn ngắn (`text-sm text-text-muted line-clamp-3 leading-relaxed`).
  - Chân thẻ: Nút bấm `LinkButton` kiểu `secondary` toàn chiều rộng (`w-full`), nội dung "Đọc tiếp" kèm icon `ArrowRight` nét mảnh (`strokeWidth={1.75}`).
- **Tương tác:** Hover đổi màu viền nhẹ nhàng (`hover:border-primary/40`), icon mũi tên trượt nhẹ (`group-hover:translate-x-1`).

### 3.2. `ArticleList.tsx`
- **Nhiệm vụ:** Giao diện trang danh sách `/articles`.
- **Bố cục:**
  - Header trang: Kicker cố định `03 · BÀI VIẾT & KIẾN THỨC`, Tiêu đề `H1` và mô tả ngắn.
  - Bộ lọc 1 chạm: Phẳng, gồm 4 nút: `Tất cả`, `Mẹo vặt`, `Công thức`, `Kiến thức`. Trạng thái active: nền `bg-accent-soft text-primary font-medium border border-primary/50`.
  - Lưới bài viết: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
  - Phân trang nhẹ nhàng nếu cần hoặc hiển thị tổng số bài viết.

### 3.3. `ArticleDetail.tsx`
- **Nhiệm vụ:** Giao diện bài đọc chi tiết `/articles/[slug]`.
- **Bố cục:**
  - Thanh quay lại: Nút `Link` quay lại `/articles` kèm icon `ArrowLeft`.
  - Meta bài viết: Tên danh mục dạng chữ phẳng, ngày đăng, thời lượng đọc.
  - Tiêu đề chính: `Heading level={1} size="3xl" font-medium text-text`.
  - Tóm tắt mở đầu: Đoạn mở bài dẫn dắt (`text-base text-text-muted italic`).
  - Thân bài: Duyệt qua `article.sections` hiển thị các tiêu đề con `h2` (`Heading level={2} size="xl"`) và đoạn văn bản phân đoạn chuẩn typography khoảng cách thở.
  - Khối trích dẫn nguồn (`Sources Box`):
    - Tiêu đề: "Nguồn tài liệu tham khảo & Kiểm chứng khoa học" kèm icon `BookOpen` nét mảnh.
    - Danh sách trích dẫn: Tên tổ chức, tiêu đề tài liệu, link nguồn (nếu có) mở tab mới an toàn (`rel="noopener noreferrer"`).
  - Khối lưu ý y tế & CTA:
    - Lưu ý: Thông tin mang tính tham khảo dinh dưỡng, không thay thế chẩn đoán bác sĩ.
    - CTA: Nút "Tư vấn lộ trình cá nhân hóa" dẫn về `/consultation`.

---

## 4. Kế hoạch kiểm thử (TDD Strategy)

1. **`src/data/articles.test.ts`**:
   - Kiểm tra dữ liệu đúng tối đa 2 bài viết mẫu.
   - Kiểm tra mỗi bài viết đều có ít nhất 1 nguồn y khoa uy tín (`sources.length >= 1`).
   - Kiểm tra không chứa từ ngữ cam kết sai lệch y tế.
2. **`src/features/articles/components/ArticleCard.test.tsx`**:
   - Render đúng tiêu đề, tóm tắt, danh mục, thời gian đọc.
   - Xác nhận không có badge, không có hashtag, không chứa từ cấm y tế.
   - Chứa đường dẫn đúng tới trang chi tiết `/articles/[slug]`.
3. **`src/features/articles/components/ArticleList.test.tsx`**:
   - Render tiêu đề trang, bộ lọc danh mục.
   - Lọc bài viết theo danh mục chính xác.
   - Không chứa `UNDER_CONSTRUCTION_NOTICE`.
4. **`src/features/articles/components/ArticleDetail.test.tsx`**:
   - Render đầy đủ các sections của bài viết.
   - Render khối trích dẫn nguồn với tên tổ chức và tiêu đề tài liệu.
   - Chứa nút quay lại và CTA tư vấn lộ trình.
   - Không chứa `UNDER_CONSTRUCTION_NOTICE`.
