# Hero Section Redesign (Hum-07 DNA) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Section 1 (Hero Section) on Homepage (`/`) matching Hallmark Hum-07 reference `6.png` with a 2-column layout, connected stage pill ticker, accent underline display title, dual pill action buttons, micro-trust bar, and right brand visual card with notification widget.

**Architecture:** Server Component layout in `src/app/(site)/page.tsx` rendering structured static hero elements with strict CSS design tokens from `src/app/globals.css`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, Lucide React icons, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-10-hero-hum-07-spec.md`

## Global Constraints

- **Typography:** Be Vietnam Pro font only (weights 300, 400, 500, 600). NO `font-bold` (700+).
- **Design Tokens:** Strict use of CSS tokens from `src/app/globals.css`. No raw hex (`#...`), no default Tailwind colors, no gradients, no backdrop-blur.
- **Iconography & Copy:** `lucide-react` icons with `strokeWidth={1.75}`. Absolutely NO emojis, NO text used as icons. Honest medical-compliant copy.
- **Testing:** Unit tests executed via `bun run test`. Must pass `bun run typecheck` and `bun run lint`.

## Review Focus

1. **Responsive 390px vs 1280px:** Single column centered layout on mobile (390px), 2-column asymmetric grid on desktop (`lg:grid-cols-12`).
2. **Text Weight Constraint:** No `font-bold` or `font-semibold` exceeding weight 600.
3. **Stage Ticker Visual Continuity:** Stage dots and connecting lines rendered cleanly without broken wrapping.
4. **Button Contrast & Tap Targets:** Both primary solid green pill and secondary outline pill must have min-height 44-48px.
5. **No Visual Blurs or Hex Values:** Ensured through strict compliance with `.claude/hooks/guard-edit.js`.

---

### Task 1: Update Tests for Hero Section Hum-07 Redesign

**Files:**
- Modify: `src/test/app-screens.test.tsx`

**Interfaces:**
- Consumes: `HomePage` component static HTML rendering
- Produces: Updated assertions matching Hum-07 stage ticker text, accent title, dual pill buttons, and notification widget.

- [ ] **Step 1: Update `src/test/app-screens.test.tsx` with expected Hum-07 hero strings**

```tsx
    // Hero & Micro-trust bar & Stage Ticker (Hum-07 2-column layout)
    expect(html).toContain("01 Khởi đầu");
    expect(html).toContain("02 Cân bằng");
    expect(html).toContain("03 Chuyên sâu");
    expect(html).toContain("Nước ép tươi, chọn lộ trình phù hợp với thể trạng của bạn.");
    expect(html).toContain(FIXED_LABELS.ACTION_VIEW_MY_PLAN);
    expect(html).toContain("Xem 3 giai đoạn");
    expect(html).toContain("logo.png");
    expect(html).toContain("100% ÉP TƯƠI");

    // Notification Widget (Hum-07 hallmark)
    expect(html).toContain("ÉP XANH · TƯ VẤN THỰC TẾ");
    expect(html).toContain("Uống chậm từng ngụm 250ml");
```

- [ ] **Step 2: Run tests to verify failure before implementation**

Run: `bun run test`
Expected: FAIL due to string mismatches in Section 1.

- [ ] **Step 3: Commit test update**

```bash
git add src/test/app-screens.test.tsx
git commit -m "test: update homepage screen assertions for Hum-07 hero redesign"
```

---

### Task 2: Implement Hero Section Redesign in Homepage

**Files:**
- Modify: `src/app/(site)/page.tsx`
- Test: `src/test/app-screens.test.tsx`

**Interfaces:**
- Consumes: Design tokens from `globals.css`, `FIXED_LABELS`, `ROUTES`, `SITE_CONFIG`
- Produces: Clean 2-column Hum-07 Section 1 hero layout with connected stage ticker, accent title underline, dual action pill buttons, micro-trust bar, and right visual notification card.

- [ ] **Step 1: Redesign Section 1 in `src/app/(site)/page.tsx`**

Replace Section 1 markup in `src/app/(site)/page.tsx`:
```tsx
      {/* 1. Hero Section (Hum-07 Bubble 2-column layout - Image 6.png) */}
      <Section spacing="lg" className="border-b border-border bg-surface/40 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              {/* Connected Stage Ticker */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs text-text-muted font-body shadow-2xs">
                <span className="flex items-center gap-1.5 text-primary font-medium">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  01 Khởi đầu
                </span>
                <span aria-hidden="true" className="text-border">───</span>
                <span className="flex items-center gap-1.5 text-text-muted font-medium">
                  <span className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
                  02 Cân bằng
                </span>
                <span aria-hidden="true" className="text-border">───</span>
                <span className="flex items-center gap-1.5 text-text-muted font-medium">
                  <span className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
                  03 Chuyên sâu
                </span>
              </div>

              {/* Display Headline with Accent Underline & Subhead */}
              <div className="space-y-4 max-w-2xl">
                <Heading
                  level={1}
                  size="3xl"
                  className="font-medium text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight text-text"
                >
                  Nước ép tươi, chọn{" "}
                  <span className="relative inline-block text-primary decoration-primary/40 underline decoration-2 underline-offset-4">
                    lộ trình phù hợp với thể trạng
                  </span>{" "}
                  của bạn.
                </Heading>
                <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed max-w-prose">
                  Ép Xanh Chữa Lành đồng hành cùng bạn lắng nghe cơ thể, tự khám phá lộ trình
                  1, 3 hoặc 6 ngày từ thực đơn nông sản tươi mỗi ngày của quán.
                </p>
              </div>

              {/* Action Buttons Row (Dual Pill Buttons) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
                <LinkButton
                  href={ROUTES.CONSULTATION}
                  variant="primary"
                  className="rounded-full w-full sm:w-auto min-h-12 text-base px-7 py-3 font-semibold select-none shadow-xs"
                >
                  <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
                  <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  href="#stages"
                  variant="outline"
                  className="rounded-full w-full sm:w-auto min-h-12 text-base px-6 py-3 font-medium select-none text-text hover:text-primary hover:border-primary/50"
                >
                  <span>Xem 3 giai đoạn</span>
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </LinkButton>
              </div>

              {/* Micro-trust Uppercase Bar */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs font-body text-text-muted pt-1 tracking-wider uppercase">
                <span>100% ÉP TƯƠI</span>
                <span aria-hidden="true" className="text-border">·</span>
                <span>KHÔNG TẠO TÀI KHOẢN</span>
                <span aria-hidden="true" className="text-border">·</span>
                <span>TÍNH TOÁN TRÊN MÁY BẠN</span>
              </div>
            </div>

            {/* Right Column (col-span-5) - Brand Visual Stack */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-3xl bg-accent-soft/40 border border-border/80 p-6 sm:p-8 flex flex-col items-center text-center shadow-xs space-y-6">
                {/* Logo Container */}
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border border-border/80 bg-surface p-1.5 shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt={SITE_CONFIG.name}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-cover rounded-full"
                    priority
                  />
                </div>

                {/* Floating Notification Widget Card */}
                <div className="w-full rounded-2xl border border-border bg-surface p-4 text-left shadow-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                    <span>ÉP XANH · TƯ VẤN THỰC TẾ</span>
                  </div>
                  <p className="text-xs text-text font-body leading-relaxed">
                    Uống chậm từng ngụm 250ml — bổ sung chất xơ và khoáng chất tự nhiên cho ngày mới.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
```

- [ ] **Step 2: Run typecheck, lint, and tests to verify implementation**

Run: `bun run typecheck && bun run lint && bun run test`
Expected: ALL PASS with 0 errors.

- [ ] **Step 3: Commit implementation**

```bash
git add src/app/\(site\)/page.tsx
git commit -m "feat(home): redesign hero section with 2-column layout matching Hum-07"
```

---

### Task 3: Production Build & Accessibility Verification

- [ ] **Step 1: Execute production build**

Run: `bun run build`
Expected: Build succeeds cleanly with 0 TypeScript/ESLint warnings or route errors.
