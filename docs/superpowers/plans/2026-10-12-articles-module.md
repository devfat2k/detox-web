# Articles Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng hoàn chỉnh phân hệ Bài viết (`/articles` và `/articles/[slug]`) theo DNA Hallmark Hum-07 ("Bubble" / Editorial Calm), loại bỏ hoàn toàn thông báo tạm `UNDER_CONSTRUCTION_NOTICE`, không API, không badge, không chớp nháy, tuân thủ 100% quy chuẩn y tế và nguồn kiểm chứng khoa học.

**Architecture:** Sử dụng Next.js Server Components cho việc render trang và component bài viết; client state tối thiểu cho bộ lọc danh mục tại `ArticleList`. Dữ liệu tĩnh cục bộ được định kiểu chặt chẽ trong `src/data/articles.ts` với tối đa 2 bài viết mẫu chuẩn mực.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, Lucide React (strokeWidth=1.75), Vitest.

**Spec:** `docs/superpowers/specs/2026-10-12-articles-module-design.md`

## Global Constraints

- Không API: 100% dữ liệu cục bộ trong `src/data/articles.ts`, không gọi fetch/REST/GraphQL hay dịch vụ ngoài.
- Dữ liệu mẫu tối thiểu: Đúng 2 bài viết mẫu có cấu trúc `sections` và `sources` khoa học uy tín, cho phép lặp lại.
- Y tế & Khoa học: Không khẳng định chữa bệnh hay cam kết kết quả; bắt buộc có khối "Nguồn tham khảo & Kiểm chứng".
- Chống slop: CẤM mọi loại Badge / Pill status, cấm hiệu ứng chớp nháy/rung lắc (`animate-pulse`).
- Typography: Duy nhất `Be Vietnam Pro` (weights 300/400/500/600; cấm font-bold 700+).
- Icon: Duy nhất `lucide-react` nét mảnh (`strokeWidth={1.75}`), cấm emoji hoặc text làm icon.

## Review Focus

1. Không chứa từ ngữ y tế sai lệch ("thải độc sâu", "đốt mỡ", "chữa bệnh", "cam kết giảm cân") trong cả thẻ và trang chi tiết.
2. Thẻ bài viết `ArticleCard` không render bất kỳ khung viền badge hay hashtag nào.
3. Trang chi tiết `ArticleDetail` render đầy đủ khối nguồn kiểm chứng y khoa với liên kết an toàn (`rel="noopener noreferrer"`).
4. Bộ lọc danh mục trên `ArticleList` chuyển đổi mượt mà giữa các tab và hiển thị đúng số lượng bài.
5. Không còn sự xuất hiện của `UNDER_CONSTRUCTION_NOTICE` trên cả danh sách và chi tiết.

---

### Task 1: Dữ liệu bài viết có cấu trúc & Nguồn kiểm chứng y khoa

**Files:**
- Modify: `src/data/articles.ts`
- Test: `src/data/articles.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `Article`, `ArticleCategory`, `ArticleSource`, `ArticleSection`, `ARTICLES_DATA`, `ARTICLE_CATEGORIES`

- [ ] **Step 1: Viết failing test cho `src/data/articles.test.ts`**

```typescript
import { describe, it, expect } from "vitest";
import { ARTICLES_DATA, ARTICLE_CATEGORIES } from "./articles";

describe("Articles data", () => {
  it("contains exactly 2 curated sample articles", () => {
    expect(ARTICLES_DATA.length).toBe(2);
  });

  it("each article has valid sections and at least one cited medical source", () => {
    for (const article of ARTICLES_DATA) {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.sections.length).toBeGreaterThan(0);
      expect(article.sources.length).toBeGreaterThan(0);
      for (const source of article.sources) {
        expect(source.organization).toBeTruthy();
        expect(source.title).toBeTruthy();
      }
    }
  });

  it("does not contain false medical or detox cure claims", () => {
    const raw = JSON.stringify(ARTICLES_DATA);
    expect(raw).not.toContain("thải độc sâu");
    expect(raw).not.toContain("chữa bệnh");
    expect(raw).not.toContain("đốt mỡ");
    expect(raw).not.toContain("cam kết giảm");
  });

  it("defines 4 category filter items starting with 'all'", () => {
    expect(ARTICLE_CATEGORIES).toHaveLength(4);
    expect(ARTICLE_CATEGORIES[0].id).toBe("all");
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `bun run test src/data/articles.test.ts`
Expected: FAIL vì `articles.ts` chưa có `sections`, `sources`, và `ARTICLE_CATEGORIES`.

- [ ] **Step 3: Cập nhật `src/data/articles.ts` với đầy đủ cấu trúc**

```typescript
export type ArticleCategory = "tips" | "recipes" | "knowledge";

export interface ArticleSource {
  readonly title: string;
  readonly organization: string;
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

export const ARTICLE_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "knowledge", label: "Kiến thức" },
  { id: "tips", label: "Mẹo vặt" },
  { id: "recipes", label: "Công thức" },
] as const;

export const ARTICLES_DATA: readonly Article[] = [
  {
    slug: "hieu-dung-ve-thai-doc-tu-nhien",
    title: "Hiểu đúng về cơ chế tự thải độc của gan và thận",
    category: "knowledge",
    categoryName: "Kiến thức",
    excerpt: "Nước ép rau củ hỗ trợ bổ sung vi chất và nước cho cơ thể, trong khi gan và thận mới là cơ quan đảm nhiệm chính việc lọc và đào thải tự nhiên.",
    publishedAt: "2026-03-20",
    readingTime: "5 phút đọc",
    sections: [
      {
        heading: "Cơ thể con người tự làm sạch như thế nào?",
        content: "Gan là nhà máy sinh hóa lớn nhất, chuyển hóa các chất lạ thành dạng tan trong nước để bài tiết. Thận liên tục lọc máu và bài xuất các sản phẩm chuyển hóa qua nước tiểu. Không có loại nước uống nào có thể thay thế hoàn toàn chức năng của hai cơ quan này.",
      },
      {
        heading: "Vai trò thực tế của nước ép rau củ tươi",
        content: "Nước ép cung cấp dồi dào nước, kali, vitamin C và các hợp chất thực vật (polyphenols). Những dưỡng chất này hỗ trợ màng tế bào và tạo điều kiện thuận lợi cho gan và thận hoạt động ở trạng thái thoải mái nhất.",
      },
      {
        heading: "Lưu ý để tiếp cận an toàn",
        content: "Nên xem nước ép như một phần bổ sung rau củ nhẹ nhàng cho chế độ ăn, không nhịn ăn kéo dài và không kỳ vọng nước ép có tác dụng chữa bệnh hay thay thế điều trị y khoa.",
      },
    ],
    sources: [
      {
        organization: "Harvard Health Publishing",
        title: "The dubious practice of detox (Sự thật về các phương pháp thanh lọc cơ thể)",
        url: "https://www.health.harvard.edu/staying-healthy/the-dubious-practice-of-detox",
      },
      {
        organization: "Viện Dinh dưỡng Quốc gia Việt Nam",
        title: "Khuyến nghị tiêu thụ rau củ quả và lối sống lành mạnh",
        url: "http://viendinhduong.vn",
      },
    ],
  },
  {
    slug: "huong-dan-chuan-bi-truoc-khi-detox",
    title: "Hướng dẫn chuẩn bị cơ thể 2 ngày trước khi detox",
    category: "tips",
    categoryName: "Mẹo vặt",
    excerpt: "Cách ăn nhẹ và giảm dần caffeine từng bước để cơ thể thích ứng tự nhiên với nhịp nước ép, không gây cảm giác đói lả hay choáng váng.",
    publishedAt: "2026-03-15",
    readingTime: "4 phút đọc",
    sections: [
      {
        heading: "Giảm áp lực cho hệ tiêu hóa từ sớm",
        content: "Trước khi bắt đầu bất kỳ lộ trình nước ép nào, hãy dành 2 ngày giảm bớt đạm động vật khó tiêu, đồ chiên rán nhiều dầu mỡ và thực phẩm chế biến sẵn. Ưu tiên các món hấp, luộc và tăng dần lượng rau xanh trong đĩa ăn.",
      },
      {
        heading: "Cắt giảm caffeine một cách êm ái",
        content: "Nếu bạn có thói quen uống nhiều cà phê mỗi ngày, việc dừng đột ngột có thể gây đau đầu nhẹ do thiếu caffeine. Hãy giảm xuống một nửa lượng thường uống và thay thế bằng nước ấm hoặc trà thảo mộc dịu nhẹ.",
      },
      {
        heading: "Lắng nghe tín hiệu từ cơ thể",
        content: "Mục tiêu của việc chuẩn bị là giúp cơ thể thư thái, không phải tạo thêm căng thẳng. Hãy đi ngủ sớm hơn 30 phút và uống đủ nước lọc trong suốt cả ngày.",
      },
    ],
    sources: [
      {
        organization: "Mayo Clinic",
        title: "Juicing: What are the health benefits? (Uống nước ép: Lợi ích dinh dưỡng thực tế)",
        url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/juicing/faq-20058020",
      },
    ],
  },
] as const;
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test src/data/articles.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/articles.ts src/data/articles.test.ts
git commit -m "feat(articles): define structured articles data with medical sources"
```

---

### Task 2: Component `ArticleCard.tsx` (DNA Hallmark Hum-07)

**Files:**
- Create: `src/features/articles/components/ArticleCard.tsx`
- Test: `src/features/articles/components/ArticleCard.test.tsx`
- Modify: `src/features/articles/index.ts`

**Interfaces:**
- Consumes: `Article` từ `@/data/articles`
- Produces: `ArticleCard`

- [ ] **Step 1: Viết failing test `ArticleCard.test.tsx`**

```tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleCard } from "./ArticleCard";
import { ARTICLES_DATA } from "@/data/articles";

describe("ArticleCard component", () => {
  const article = ARTICLES_DATA[0];

  it("renders article title, category, reading time, excerpt, and sources count", () => {
    const html = renderToStaticMarkup(<ArticleCard article={article} />);
    expect(html).toContain(article.title);
    expect(html).toContain(article.categoryName);
    expect(html).toContain(article.readingTime);
    expect(html).toContain(article.excerpt);
    expect(html).toContain("2 nguồn kiểm chứng");
  });

  it("does not render badges or hashtags", () => {
    const html = renderToStaticMarkup(<ArticleCard article={article} />);
    expect(html).not.toContain("badge");
    expect(html).not.toContain("#");
  });

  it("contains clean link to detail route with ArrowRight icon", () => {
    const html = renderToStaticMarkup(<ArticleCard article={article} />);
    expect(html).toContain(`/articles/${article.slug}`);
    expect(html).toContain("Đọc tiếp");
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `bun run test src/features/articles/components/ArticleCard.test.tsx`
Expected: FAIL vì `ArticleCard.tsx` chưa được tạo.

- [ ] **Step 3: Triển khai `ArticleCard.tsx`**

```tsx
import React from "react";
import type { Article } from "@/data/articles";
import { Card, Heading, LinkButton } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowRight, BookOpen, Clock, HeartPulse } from "lucide-react";

export interface ArticleCardProps {
  readonly article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isKnowledge = article.category === "knowledge";

  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6 bg-surface hover:border-primary/50 transition-all duration-200 group">
      <div className="space-y-4">
        {/* Khung trực quan chủ đề Hum-07 tỷ lệ aspect-16/10 thanh lịch */}
        <div className="w-full aspect-16/10 rounded-xl bg-accent-soft/30 border border-border/40 flex items-center justify-center p-4">
          {isKnowledge ? (
            <HeartPulse
              className="h-8 w-8 text-primary/70 transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          ) : (
            <BookOpen
              className="h-8 w-8 text-primary/70 transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Nội dung thông tin bài viết */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-medium text-primary tracking-wide">
              {article.categoryName}
            </span>
            <span aria-hidden="true" className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
              <span>{article.readingTime}</span>
            </span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>{article.sources.length} nguồn kiểm chứng</span>
          </div>

          <Heading level={3} size="xl" className="font-medium text-text line-clamp-2">
            {article.title}
          </Heading>

          <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Nút Đọc tiếp toàn chiều rộng */}
      <div className="pt-5 mt-auto">
        <LinkButton
          href={routes.article(article.slug)}
          variant="secondary"
          className="w-full justify-center text-sm font-normal py-2.5 group-hover:bg-accent-soft/40 group-hover:border-primary/40 transition-colors"
        >
          <span>Đọc tiếp</span>
          <ArrowRight
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </LinkButton>
      </div>
    </Card>
  );
}
```

Cập nhật `src/features/articles/index.ts` để export `ArticleCard`.

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test src/features/articles/components/ArticleCard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/articles/components/ArticleCard.tsx src/features/articles/components/ArticleCard.test.tsx src/features/articles/index.ts
git commit -m "feat(articles): implement ArticleCard with Hallmark Hum-07 editorial styling"
```

---

### Task 3: Component `ArticleList.tsx` (Trang danh mục `/articles`)

**Files:**
- Modify: `src/features/articles/components/ArticleList.tsx`
- Test: `src/features/articles/components/ArticleList.test.tsx`

**Interfaces:**
- Consumes: `ArticleCard`, `ARTICLE_CATEGORIES`, `ARTICLES_DATA`
- Produces: `ArticleList`

- [ ] **Step 1: Viết failing test `ArticleList.test.tsx`**

```tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleList } from "./ArticleList";
import { ARTICLES_DATA } from "@/data/articles";
import { FIXED_LABELS } from "@/config/copy";

describe("ArticleList component", () => {
  it("renders header with kicker and micro-trust bar without construction notice", () => {
    const html = renderToStaticMarkup(<ArticleList articles={ARTICLES_DATA} />);
    expect(html).toContain(FIXED_LABELS.PAGE_ARTICLES_TITLE);
    expect(html).toContain("NGUỒN Y KHOA KIỂM CHỨNG");
    expect(html).toContain("KHÔNG QUẢNG CÁO BÁN HÀNG");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("renders category filters and article cards", () => {
    const html = renderToStaticMarkup(<ArticleList articles={ARTICLES_DATA} />);
    expect(html).toContain("Tất cả");
    expect(html).toContain("Kiến thức");
    expect(html).toContain("Mẹo vặt");
    expect(html).toContain("Hiểu đúng về cơ chế tự thải độc của gan và thận");
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `bun run test src/features/articles/components/ArticleList.test.tsx`
Expected: FAIL vì `ArticleList.tsx` cũ còn `UNDER_CONSTRUCTION_NOTICE` và thiếu micro-trust bar.

- [ ] **Step 3: Cập nhật `ArticleList.tsx` (loại bỏ notice, thêm filter và grid cards)**

```tsx
"use client";

import React, { useState, useMemo } from "react";
import type { Article } from "@/data/articles";
import { ARTICLE_CATEGORIES } from "@/data/articles";
import { Container, Section, Heading, Kicker } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { ArticleCard } from "./ArticleCard";

export interface ArticleListProps {
  readonly articles: readonly Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        {/* Header với Kicker và Micro-trust bar Hum-07 */}
        <header className="max-w-2xl space-y-4">
          <Kicker>03 · {FIXED_LABELS.PAGE_ARTICLES_TITLE}</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            Bài viết &amp; Kiến thức dinh dưỡng{" "}
            <span className="relative inline-block text-primary decoration-primary/40 underline decoration-2 underline-offset-4">
              khoa học
            </span>
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Các ghi chép trung thực dựa trên nguồn kiểm chứng y khoa uy tín. Không thổi phồng công dụng, giúp bạn hiểu rõ cơ thể để nuôi dưỡng thói quen sống bền vững.
          </p>

          {/* Micro-trust bar đặc trưng Hum-07 */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-body text-text-muted pt-1 tracking-wider uppercase">
            <span>NGUỒN Y KHOA KIỂM CHỨNG</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>NỘI DUNG TRUNG THỰC</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>KHÔNG QUẢNG CÁO BÁN HÀNG</span>
          </div>
        </header>

        {/* Thanh lọc danh mục phẳng 1 chạm */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ARTICLE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-accent-soft text-primary font-medium border border-primary/50 shadow-2xs"
                    : "bg-surface text-text-muted hover:text-text border border-border/70 hover:border-border"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Lưới hiển thị bài viết */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 bg-surface/50 border border-border rounded-xl">
            <p className="text-sm text-text-muted">
              Chưa có bài viết nào trong danh mục này.
            </p>
          </div>
        )}

        {/* Chỉ số minh bạch chân trang */}
        <div className="pt-6 border-t border-border/60 text-xs text-text-muted">
          Tổng cộng {filteredArticles.length} bài viết được đối chiếu khoa học
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test src/features/articles/components/ArticleList.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/articles/components/ArticleList.tsx src/features/articles/components/ArticleList.test.tsx
git commit -m "feat(articles): overhaul ArticleList with category filters and Hum-07 header"
```

---

### Task 4: Component `ArticleDetail.tsx` (Trang chi tiết & Nguồn Honest Science)

**Files:**
- Modify: `src/features/articles/components/ArticleDetail.tsx`
- Test: `src/features/articles/components/ArticleDetail.test.tsx`

**Interfaces:**
- Consumes: `Article`, `ArticleSource`, `ArticleSection`
- Produces: `ArticleDetail`

- [ ] **Step 1: Viết failing test `ArticleDetail.test.tsx`**

```tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleDetail } from "./ArticleDetail";
import { ARTICLES_DATA } from "@/data/articles";
import { FIXED_LABELS } from "@/config/copy";

describe("ArticleDetail component", () => {
  const article = ARTICLES_DATA[0];

  it("renders article headline, sections, and Honest Science sources box", () => {
    const html = renderToStaticMarkup(<ArticleDetail article={article} />);
    expect(html).toContain(article.title);
    expect(html).toContain("Cơ thể con người tự làm sạch như thế nào?");
    expect(html).toContain("Nguồn tài liệu tham khảo &amp; Kiểm chứng khoa học");
    expect(html).toContain("Harvard Health Publishing");
    expect(html).toContain("Viện Dinh dưỡng Quốc gia Việt Nam");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("provides back link and consultation CTA button", () => {
    const html = renderToStaticMarkup(<ArticleDetail article={article} />);
    expect(html).toContain('href="/articles"');
    expect(html).toContain('href="/consultation"');
    expect(html).toContain(FIXED_LABELS.CTA_CONSULTATION);
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `bun run test src/features/articles/components/ArticleDetail.test.tsx`
Expected: FAIL vì `ArticleDetail.tsx` cũ đang chứa `UNDER_CONSTRUCTION_NOTICE` và thiếu render sections/sources.

- [ ] **Step 3: Cập nhật `ArticleDetail.tsx`**

```tsx
import React from "react";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { Container, Section, Heading, Card, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";
import { ArrowLeft, BookOpen, Clock, ExternalLink } from "lucide-react";

export interface ArticleDetailProps {
  readonly article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-10">
        {/* Thanh quay lại danh mục bài viết */}
        <nav aria-label="Điều hướng bài viết">
          <Link
            href={routes.articles()}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors group"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>Quay lại danh sách bài viết</span>
          </Link>
        </nav>

        {/* Đầu đề bài viết */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-medium text-primary tracking-wide">
              {article.categoryName}
            </span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <Heading level={1} size="3xl" className="font-medium text-2xl sm:text-3xl lg:text-4xl leading-snug text-text">
            {article.title}
          </Heading>

          {/* Dẫn đề nổi bật */}
          <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed border-l-2 border-primary/40 pl-4 italic">
            {article.excerpt}
          </p>
        </header>

        {/* Nội dung bài viết phân đoạn */}
        <article className="space-y-8 font-body text-base text-text leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              {section.heading && (
                <Heading level={2} size="xl" className="font-medium text-text pt-2">
                  {section.heading}
                </Heading>
              )}
              <p className="text-text/90 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </article>

        {/* Khối Honest Science: Nguồn tài liệu kiểm chứng */}
        <Card className="p-6 sm:p-7 space-y-4 bg-surface border border-border/80 rounded-2xl">
          <div className="flex items-center gap-2.5 text-primary">
            <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            <Heading level={3} size="lg" className="font-medium text-text">
              Nguồn tài liệu tham khảo &amp; Kiểm chứng khoa học
            </Heading>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Mọi bài viết của Ép Xanh Chữa Lành đều được trích xuất từ các tổ chức y tế và dinh dưỡng uy tín nhằm bảo đảm tính chính xác và an toàn cho người đọc:
          </p>
          <ul className="space-y-3 pt-1">
            {article.sources.map((source, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-text-muted flex items-start gap-2">
                <span className="text-primary font-medium select-none" aria-hidden="true">•</span>
                <div className="space-y-0.5">
                  <div className="font-medium text-text">
                    {source.organization}:{" "}
                    <span className="font-normal text-text-muted">{source.title}</span>
                  </div>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2"
                    >
                      <span>Xem tài liệu gốc</span>
                      <ExternalLink className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Lưu ý y tế và CTA */}
        <div className="p-6 bg-accent-soft/30 border border-border/60 rounded-xl space-y-4">
          <p className="text-xs text-text-muted leading-relaxed">
            {FIXED_LABELS.MEDICAL_DISCLAIMER}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40">
            <span className="text-xs text-text font-medium">
              Bạn muốn tìm thực đơn phù hợp với thể trạng cá nhân?
            </span>
            <LinkButton href={routes.consultation()} variant="primary" className="w-full sm:w-auto">
              {FIXED_LABELS.CTA_CONSULTATION}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test src/features/articles/components/ArticleDetail.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/articles/components/ArticleDetail.tsx src/features/articles/components/ArticleDetail.test.tsx
git commit -m "feat(articles): overhaul ArticleDetail with sections, honest science sources and medical disclaimer"
```

---

### Task 5: Cập nhật App Screens Smoke Test & Kiểm tra toàn bộ Test Suite

**Files:**
- Modify: `src/test/app-screens.test.tsx`

**Interfaces:**
- Consumes: All article pages
- Produces: Passing test suite

- [ ] **Step 1: Cập nhật `src/test/app-screens.test.tsx`**

Đảm bảo kiểm tra Articles page và Detail page render chuẩn bài viết mới mà không vướng notice.

- [ ] **Step 2: Chạy toàn bộ test suite**

Run: `bun run test`
Expected: 100% test pass.

- [ ] **Step 3: Commit**

```bash
git add src/test/app-screens.test.tsx
git commit -m "test(articles): update screen smoke tests for articles module"
```
