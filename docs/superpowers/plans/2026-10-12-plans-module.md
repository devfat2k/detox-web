# Phân Hệ Liệu Trình (`/plans` & `/plans/[planId]`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng hoàn chỉnh Trang Danh sách Liệu trình (`/plans`) và Trang Chi tiết Liệu trình (`/plans/[planId]`) dựa trên menu thật của quán, loại bỏ toàn bộ thông báo giữ chỗ (UNDER_CONSTRUCTION_NOTICE), hiển thị lịch 5 chai/ngày trực quan bằng `DetoxBottle`, tuân thủ nghiêm ngặt `DESIGN.md` và `docs/product-spec.md` §6.

**Architecture:** Sử dụng 100% React Server Components kết hợp Next.js Static Site Generation (`generateStaticParams`). Mở rộng trực tiếp mô hình tĩnh `Plan` trong `src/data/plans.ts` với 1 bộ khung ngày mẫu (5 chai) tái sử dụng cho các ngày theo nguyên tắc YAGNI. Giao diện sử dụng các UI primitives chuẩn (`Card`, `Section`, `Container`, `Heading`, `DetoxBottle`, `LinkButton`).

**Tech Stack:** Next.js 16 App Router (Server Components), TypeScript Strict, Tailwind CSS v4 tokens, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-12-plans-module-design.md`

## Global Constraints

- Không dùng màu đen thuần `#000` hay trắng tinh `#fff`; chỉ dùng token chuẩn từ `src/app/globals.css`.
- Duy nhất phông chữ `Be Vietnam Pro` (weight 300, 400, 500, 600); tuyệt đối không dùng `font-bold` (700+).
- Biểu tượng duy nhất từ `lucide-react` nét mảnh (`strokeWidth={1.75}`). Cấm emoji và ký tự đặc biệt làm icon.
- Tuyệt đối cấm status badge vô nghĩa (Hot, Best Seller, Khuyên dùng cố định), cấm hiệu ứng chớp nháy (shimmer, pulse, bounce).
- Hạn chế tối đa chữ in hoa toàn bộ (ALL CAPS); dùng sentence-case tiếng Việt chuẩn mực xưng hô "mình"/"bạn".
- Không mock thừa thãi; chỉ tạo 1 lịch trình 5 chai mẫu chuẩn để phục vụ render UI.

## Review Focus

- Route param không hợp lệ (`/plans/invalid-id`) → trả về 404 qua `notFound()` mà không crash ứng dụng.
- Render 5 chai mỗi ngày đầy đủ mốc giờ (`07:00` đến `19:00`) và link chi tiết thức uống hợp lệ (`/drinks/[slug]`).
- Kiểm tra không xuất hiện status badge hay hiệu ứng nhấp nháy trên bất kỳ thẻ liệu trình nào.
- Đảm bảo các nút bấm và liên kết đạt tap target tối thiểu 48px trên thiết bị di động (390px).
- Dòng miễn trừ y tế luôn hiển thị rõ ràng tại chân trang chi tiết liệu trình.

---

### Task 1: Mở rộng Model Dữ liệu & Lịch Uống Mẫu trong `src/data/plans.ts`

**Files:**
- Modify: `src/data/plans.ts`
- Create: `src/data/plans.test.ts`

**Interfaces:**
- Produces: `PlanBottle`, `PlanDaySchedule`, `Plan`, `PLANS_DATA`, `isValidPlanId`

- [ ] **Step 1: Viết bài test kiểm thử schema và dữ liệu cho `src/data/plans.ts`**

Tạo file `src/data/plans.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { PLANS_DATA, isValidPlanId, type PlanId } from "./plans";

describe("plans data", () => {
  it("contains exactly 3 plans: 1-day, 3-day, and 6-day", () => {
    expect(PLANS_DATA).toHaveLength(3);
    const ids = PLANS_DATA.map((p) => p.id);
    expect(ids).toEqual(["1-day", "3-day", "6-day"]);
  });

  it("validates plan ids correctly", () => {
    expect(isValidPlanId("1-day")).toBe(true);
    expect(isValidPlanId("3-day")).toBe(true);
    expect(isValidPlanId("6-day")).toBe(true);
    expect(isValidPlanId("9-day")).toBe(false);
    expect(isValidPlanId("unknown")).toBe(false);
  });

  it("ensures each plan has rich metadata and daily schedules", () => {
    for (const plan of PLANS_DATA) {
      expect(plan.title).toBeTruthy();
      expect(plan.durationDays).toBeGreaterThan(0);
      expect(plan.totalBottles).toBe(plan.durationDays * 5);
      expect(plan.kcalRange).toContain("kcal");
      expect(plan.suitableFor.length).toBeGreaterThan(0);
      expect(plan.notSuitableFor.length).toBeGreaterThan(0);
      expect(plan.preparationGuide).toBeTruthy();
      expect(plan.recoveryGuide).toBeTruthy();
      expect(plan.days).toHaveLength(plan.durationDays);

      // Kiểm tra mỗi ngày có đủ 5 chai
      for (const day of plan.days) {
        expect(day.bottles).toHaveLength(5);
        for (const bottle of day.bottles) {
          expect(bottle.time).toMatch(/^\d{2}:\d{2}$/);
          expect(bottle.drinkSlug).toBeTruthy();
          expect(["green", "warm", "soft"]).toContain(bottle.color);
          expect(bottle.level).toBeGreaterThanOrEqual(50);
        }
      }
    }
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại**

Run: `bun run test src/data/plans.test.ts`
Expected: FAIL do các trường `totalBottles`, `kcalRange`, `days` chưa tồn tại trong `PLANS_DATA`.

- [ ] **Step 3: Cập nhật `src/data/plans.ts` với đầy đủ kiểu dữ liệu và 1 bộ lịch 5 chai mẫu**

Sửa `src/data/plans.ts`:

```typescript
export type PlanId = "1-day" | "3-day" | "6-day";

export interface PlanBottle {
  readonly time: string;
  readonly name: string;
  readonly desc: string;
  readonly drinkSlug: string;
  readonly color: "green" | "warm" | "soft";
  readonly level: number;
}

export interface PlanDaySchedule {
  readonly dayNumber: number;
  readonly theme: string;
  readonly bottles: readonly PlanBottle[];
}

export interface Plan {
  readonly id: PlanId;
  readonly title: string;
  readonly durationDays: number;
  readonly totalBottles: number;
  readonly kcalRange: string;
  readonly description: string;
  readonly tagline: string;
  readonly suitableFor: readonly string[];
  readonly notSuitableFor: readonly string[];
  readonly preparationGuide: string;
  readonly recoveryGuide: string;
  readonly days: readonly PlanDaySchedule[];
}

const SAMPLE_BOTTLES: readonly PlanBottle[] = [
  {
    time: "07:00",
    name: "Xanh Tươi Cần Tây Táo",
    desc: "Vị thanh mát, đánh thức tiêu hóa nhẹ nhàng đầu ngày",
    drinkSlug: "ep-can-tay-tao",
    color: "green",
    level: 60,
  },
  {
    time: "10:00",
    name: "Cam Cà Rốt Ấm Nồng",
    desc: "Bổ sung vitamin tự nhiên, điểm chút gừng ấm bụng giữa buổi",
    drinkSlug: "ep-ca-rot-cam-gung",
    color: "warm",
    level: 75,
  },
  {
    time: "13:00",
    name: "Xanh Đậm Kale Dưa Leo",
    desc: "Dồi dào diệp lục và khoáng chất thực vật thanh khiết",
    drinkSlug: "ep-cai-kale-dua-leo",
    color: "green",
    level: 70,
  },
  {
    time: "16:00",
    name: "Đỏ Rực Củ Dền Thơm",
    desc: "Vị ngọt dịu từ dứa thơm và củ dền giúp giải nhiệt buổi chiều",
    drinkSlug: "ep-cu-den-dua-thom",
    color: "warm",
    level: 80,
  },
  {
    time: "19:00",
    name: "Sữa Hạt Dịu Nhẹ",
    desc: "Chất béo lành tính từ hạt, giúp êm bụng và thư giãn giấc ngủ",
    drinkSlug: "ep-can-tay-tao",
    color: "soft",
    level: 85,
  },
] as const;

function createDays(count: number): readonly PlanDaySchedule[] {
  const themes = [
    "Khởi động nhẹ nhàng",
    "Thích nghi và thanh lọc",
    "Cân bằng năng lượng",
    "Tăng cường khoáng chất",
    "Duy trì thể trạng tươi mới",
    "Phục hồi và hoàn thiện",
  ];

  return Array.from({ length: count }, (_, i) => ({
    dayNumber: i + 1,
    theme: themes[i] ?? `Ngày trải nghiệm ${i + 1}`,
    bottles: SAMPLE_BOTTLES,
  }));
}

const COMMON_SUITABLE = [
  "Người muốn cho hệ tiêu hóa nghỉ ngơi sau chuỗi ngày ăn uống nhiều dầu mỡ",
  "Người cần bổ sung thêm rau củ tươi và nước tự nhiên vào thói quen hàng ngày",
  "Người mong muốn khởi đầu một lối sống ăn uống thanh nhẹ, lành mạnh",
] as const;

const COMMON_NOT_SUITABLE = [
  "Phụ nữ đang mang thai hoặc trong giai đoạn cho con bú",
  "Người có tiền sử huyết áp thấp nặng, bệnh thận hoặc viêm loét dạ dày cấp",
  "Người đang trong quá trình điều trị y khoa đặc biệt cần hỏi ý kiến bác sĩ",
] as const;

const COMMON_PREP =
  "Trước khi bắt đầu 1–2 ngày, bạn nên uống nhiều nước lọc, giảm dần lượng thịt đỏ, đồ chiên rán và các loại thức uống có cồn hay caffeine để cơ thể chuyển tiếp nhẹ nhàng.";

const COMMON_RECOVERY =
  "Sau khi kết thúc liệu trình, hãy bắt đầu lại bằng các món ấm loãng như cháo yến mạch, súp rau củ hoặc trái cây mềm trong 1–2 bữa đầu. Tránh ăn no dồn dập ngay lập tức.";

export const PLANS_DATA: readonly Plan[] = [
  {
    id: "1-day",
    title: "Liệu trình Khởi đầu 1 ngày",
    durationDays: 1,
    totalBottles: 5,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Thanh lọc nhẹ nhàng trong 1 ngày, thích hợp cho người mới bắt đầu làm quen với nước ép tươi.",
    tagline: "Khởi đầu nhẹ nhàng, cảm nhận cơ thể tươi mới trong 24 giờ.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: createDays(1),
  },
  {
    id: "3-day",
    title: "Liệu trình Cân bằng 3 ngày",
    durationDays: 3,
    totalBottles: 15,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Lộ trình cân bằng 3 ngày giúp hệ tiêu hóa được nghỉ ngơi và hỗ trợ giảm cảm giác nặng bụng.",
    tagline: "3 ngày làm mới năng lượng và hỗ trợ thanh lọc cơ thể.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: createDays(3),
  },
  {
    id: "6-day",
    title: "Liệu trình Chuyên sâu 6 ngày",
    durationDays: 6,
    totalBottles: 30,
    kcalRange: "850 – 950 kcal/ngày",
    description: "Liệu trình trải nghiệm toàn diện 6 ngày dành cho người đã có kinh nghiệm dùng nước ép xanh.",
    tagline: "Trải nghiệm chuyên sâu, duy trì thói quen dinh dưỡng thực vật lành mạnh.",
    suitableFor: COMMON_SUITABLE,
    notSuitableFor: COMMON_NOT_SUITABLE,
    preparationGuide: COMMON_PREP,
    recoveryGuide: COMMON_RECOVERY,
    days: createDays(6),
  },
] as const;

export const VALID_PLAN_IDS: readonly PlanId[] = ["1-day", "3-day", "6-day"];

export function isValidPlanId(id: string): id is PlanId {
  return VALID_PLAN_IDS.includes(id as PlanId);
}
```

- [ ] **Step 4: Chạy lại test để đảm bảo PASS**

Run: `bun run test src/data/plans.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/plans.ts src/data/plans.test.ts
git commit -m "feat(plans): expand plan model with schedules and guides"
```

---

### Task 2: Cải tiến Giao diện Trang Danh sách Liệu trình (`PlanList.tsx`)

**Files:**
- Modify: `src/features/plans/components/PlanList.tsx`
- Create: `src/features/plans/components/PlanList.test.tsx`

**Interfaces:**
- Consumes: `PLANS_DATA`, `Plan`, `PlanListProps`
- Produces: `PlanList` React Component

- [ ] **Step 1: Viết test cho `PlanList.tsx`**

Tạo file `src/features/plans/components/PlanList.test.tsx`:

```typescript
import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PlanList } from "./PlanList";
import { PLANS_DATA } from "@/data/plans";
import { FIXED_LABELS } from "@/config/copy";

describe("PlanList component", () => {
  it("renders header with kicker and titles without under-construction notice", () => {
    const html = renderToStaticMarkup(<PlanList plans={PLANS_DATA} />);
    expect(html).toContain("Ba lựa chọn theo nhu cầu cơ thể");
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
    expect(html).toContain("/consultation");
  });

  it("renders all 3 plans with duration, bottle count and kcal details", () => {
    const html = renderToStaticMarkup(<PlanList plans={PLANS_DATA} />);
    expect(html).toContain("1 ngày");
    expect(html).toContain("3 ngày");
    expect(html).toContain("6 ngày");
    expect(html).toContain("5 chai");
    expect(html).toContain("15 chai");
    expect(html).toContain("30 chai");
    expect(html).toContain("850 – 950 kcal/ngày");
  });

  it("does not render any forbidden AI-slop status badges (Hot, Best seller)", () => {
    const html = renderToStaticMarkup(<PlanList plans={PLANS_DATA} />);
    expect(html).not.toContain("Hot");
    expect(html).not.toContain("Best Seller");
    expect(html).not.toContain("Bán chạy");
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại**

Run: `bun run test src/features/plans/components/PlanList.test.tsx`
Expected: FAIL do component cũ vẫn chứa `UNDER_CONSTRUCTION_NOTICE` và thiếu các trường mới.

- [ ] **Step 3: Cập nhật `src/features/plans/components/PlanList.tsx`**

Viết lại `src/features/plans/components/PlanList.tsx`:

```tsx
import React from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, Card, Kicker, LinkButton } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowRight } from "lucide-react";

export interface PlanListProps {
  plans: readonly Plan[];
}

export function PlanList({ plans }: PlanListProps) {
  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        <header className="max-w-2xl space-y-3">
          <Kicker>01 · Lộ trình tham khảo</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            Ba lựa chọn theo nhu cầu cơ thể
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Các gói nước ép tươi 1, 3 và 6 ngày từ thực đơn thật của quán. Được chuẩn bị mỗi sáng từ rau củ quả tươi sạch để hỗ trợ hệ tiêu hóa nghỉ ngơi tự nhiên.
          </p>
          <p className="font-body text-sm text-text-muted pt-1">
            Chưa rõ gói nào phù hợp với thể trạng?{" "}
            <Link
              href={routes.consultation()}
              className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Làm bài khảo sát nhanh
            </Link>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col justify-between space-y-6 p-6 sm:p-7">
              <div className="space-y-4">
                <div className="text-xs font-normal tracking-wide text-text-muted">
                  {plan.durationDays} ngày · {plan.totalBottles} chai · {plan.kcalRange}
                </div>

                <div className="space-y-2">
                  <Heading level={2} size="xl" className="font-medium text-text">
                    {plan.title}
                  </Heading>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/60">
                <LinkButton
                  href={routes.plan(plan.id)}
                  variant="secondary"
                  className="w-full justify-center group"
                >
                  <span>Xem chi tiết lộ trình</span>
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Chạy test để đảm bảo PASS**

Run: `bun run test src/features/plans/components/PlanList.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/plans/components/PlanList.tsx src/features/plans/components/PlanList.test.tsx
git commit -m "feat(plans): redesign plan list without placeholders"
```

---

### Task 3: Cải tiến Giao diện Trang Chi tiết Liệu trình (`PlanDetail.tsx`)

**Files:**
- Modify: `src/features/plans/components/PlanDetail.tsx`
- Create: `src/features/plans/components/PlanDetail.test.tsx`

**Interfaces:**
- Consumes: `Plan`, `DetoxBottle`, `Card`, `Container`, `Section`, `Heading`, `LinkButton`, `Kicker`
- Produces: `PlanDetail` React Component

- [ ] **Step 1: Viết test cho `PlanDetail.tsx`**

Tạo file `src/features/plans/components/PlanDetail.test.tsx`:

```typescript
import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PlanDetail } from "./PlanDetail";
import { PLANS_DATA } from "@/data/plans";
import { FIXED_LABELS } from "@/config/copy";

describe("PlanDetail component", () => {
  const plan = PLANS_DATA[1]; // Gói 3 ngày

  it("renders plan title, summary metrics, and removes construction notice", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain(plan.title);
    expect(html).toContain("3 ngày");
    expect(html).toContain("15 chai");
    expect(html).toContain(plan.kcalRange);
    expect(html).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("renders daily schedules with bottles and times", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain("Ngày 1");
    expect(html).toContain("Ngày 2");
    expect(html).toContain("Ngày 3");
    expect(html).toContain("07:00");
    expect(html).toContain("10:00");
    expect(html).toContain("19:00");
    expect(html).toContain("Xanh Tươi Cần Tây Táo");
  });

  it("renders health guides, preparation, recovery, and medical disclaimer", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain("Đối tượng phù hợp");
    expect(html).toContain("Trường hợp cần thận trọng");
    expect(html).toContain("Chuẩn bị trước liệu trình");
    expect(html).toContain("Ăn nhẹ sau liệu trình");
    expect(html).toContain("tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa");
  });

  it("provides back link and consultation CTA button", () => {
    const html = renderToStaticMarkup(<PlanDetail plan={plan} />);
    expect(html).toContain('href="/plans"');
    expect(html).toContain('href="/consultation"');
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại**

Run: `bun run test src/features/plans/components/PlanDetail.test.tsx`
Expected: FAIL do `PlanDetail` cũ vẫn chứa thông báo giữ chỗ.

- [ ] **Step 3: Cập nhật `src/features/plans/components/PlanDetail.tsx`**

Viết lại `src/features/plans/components/PlanDetail.tsx`:

```tsx
import React from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, Card, Kicker, LinkButton, DetoxBottle } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export interface PlanDetailProps {
  plan: Plan;
}

export function PlanDetail({ plan }: PlanDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl space-y-12">
        {/* Navigation link quay lại */}
        <div>
          <Link
            href={routes.plans()}
            className="inline-flex items-center text-sm font-normal text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" strokeWidth={1.75} />
            Quay lại danh sách liệu trình
          </Link>
        </div>

        {/* Header liệu trình */}
        <header className="space-y-4">
          <Kicker>Liệu trình {plan.durationDays} ngày · Thực đơn nông sản tươi</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            {plan.title}
          </Heading>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-normal text-text-muted">
            <span>Thời lượng: {plan.durationDays} ngày</span>
            <span>·</span>
            <span>Quy cách: {plan.totalBottles} chai</span>
            <span>·</span>
            <span>Năng lượng: ~{plan.kcalRange}</span>
          </div>

          <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
            {plan.description}
          </p>
        </header>

        {/* Lịch uống từng ngày */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Kicker>Lịch uống chi tiết</Kicker>
            <Heading level={2} size="2xl" className="font-medium text-text">
              Thực đơn 5 chai mỗi ngày
            </Heading>
            <p className="font-body text-sm text-text-muted">
              Uống cách nhau khoảng 2,5 đến 3 tiếng. Kết hợp uống thêm nước ấm rải rác trong ngày.
            </p>
          </div>

          <div className="space-y-10">
            {plan.days.map((day) => (
              <div key={day.dayNumber} className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-border/70 pb-2">
                  <Heading level={3} size="xl" className="font-medium text-text">
                    Ngày {day.dayNumber} · {day.theme}
                  </Heading>
                  <span className="text-xs text-text-muted">5 chai / ngày</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {day.bottles.map((bottle, idx) => (
                    <Card
                      key={`${day.dayNumber}-${bottle.time}-${idx}`}
                      className="flex flex-col items-center text-center p-4 space-y-3 bg-surface hover:border-primary/40 transition-colors"
                    >
                      <span className="text-xs font-medium text-text-muted tracking-wider">
                        {bottle.time}
                      </span>

                      <div className="py-1">
                        <DetoxBottle
                          color={bottle.color}
                          size="sm"
                          level={bottle.level}
                          className="mx-auto"
                        />
                      </div>

                      <div className="space-y-1 w-full">
                        <Link
                          href={routes.drink(bottle.drinkSlug)}
                          className="font-body text-sm font-medium text-text hover:text-primary transition-colors line-clamp-1 block"
                        >
                          {bottle.name}
                        </Link>
                        <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-2">
                          {bottle.desc}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hướng dẫn & Lưu ý sức khỏe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Card 1: Đối tượng */}
          <Card className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-medium text-base">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
                <span>Đối tượng phù hợp</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted font-body leading-relaxed list-disc list-inside">
                {plan.suitableFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2 text-error font-medium text-base">
                <AlertCircle className="h-4 w-4" strokeWidth={1.75} />
                <span>Trường hợp cần thận trọng</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted font-body leading-relaxed list-disc list-inside">
                {plan.notSuitableFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Card 2: Chuẩn bị & Ăn lại */}
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Heading level={3} size="xl" className="font-medium text-text">
                Chuẩn bị trước liệu trình
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {plan.preparationGuide}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <Heading level={3} size="xl" className="font-medium text-text">
                Ăn nhẹ sau liệu trình
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {plan.recoveryGuide}
              </p>
            </div>
          </Card>
        </div>

        {/* Điều hướng khảo sát & Miễn trừ */}
        <div className="pt-8 border-t border-border/70 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1 max-w-md">
            <p className="font-body text-sm font-medium text-text">
              Bạn muốn biết liệu trình này có thực sự hợp với mình?
            </p>
            <p className="font-body text-xs text-text-muted">
              Mọi thông tin chỉ mang tính tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa.
            </p>
          </div>

          <LinkButton href={routes.consultation()} variant="primary" className="group">
            <span>Kiểm tra độ phù hợp của bạn</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Chạy test để đảm bảo PASS**

Run: `bun run test src/features/plans/components/PlanDetail.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/plans/components/PlanDetail.tsx src/features/plans/components/PlanDetail.test.tsx
git commit -m "feat(plans): redesign plan detail with daily bottles and guides"
```

---

### Task 4: Kiểm tra Tích hợp Trang Tĩnh, Typecheck và Full Test Suite

**Files:**
- Verify: `src/app/(site)/plans/page.tsx`
- Verify: `src/app/(site)/plans/[planId]/page.tsx`

- [ ] **Step 1: Chạy toàn bộ bộ test unit**

Run: `bun run test`
Expected: Tất cả các file test (bao gồm `plans.test.ts`, `PlanList.test.tsx`, `PlanDetail.test.tsx`, `app-screens.test.tsx`) đều PASS.

- [ ] **Step 2: Chạy Typecheck**

Run: `bun run typecheck`
Expected: 0 errors.

- [ ] **Step 3: Chạy Lint**

Run: `bun run lint`
Expected: 0 warnings, 0 errors.

- [ ] **Step 4: Kiểm tra trang 404 cho planId không hợp lệ**

Đảm bảo `src/app/(site)/plans/[planId]/page.tsx` gọi `notFound()` khi `planId` không hợp lệ và metadata trả về an toàn.

- [ ] **Step 5: Commit tổng kết**

```bash
git add .
git commit -m "test(plans): verify static routes and full test suite coverage"
```
