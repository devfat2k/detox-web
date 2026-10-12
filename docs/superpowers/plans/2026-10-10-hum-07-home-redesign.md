# Plan: Tái thiết kế Trang Chủ & Dynamic Header theo DNA Hum-07

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp Header thành Dynamic Scroll Header và tái cấu trúc Trang Chủ với Progress Track 1.0 - 3.0 - 6.0 và Honest Math theo phong cách Hallmark Hum-07.

**Architecture:** `"use client"` cho Header scroll listener; Trang Chủ tiếp tục là Server Component rendering static data từ `src/data/`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, Lucide React icons, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-10-hum-07-home-redesign.md`

## Global Constraints
- Không dùng `font-bold` (700+), duy nhất Be Vietnam Pro.
- Chỉ dùng token từ `src/app/globals.css`.
- Không emoji, không text giả lập icon.
- `bun run test` (Vitest) 100% pass.

---

### Task 1: Nâng cấp Header thành Dynamic Header (Scroll-reactive)

**Files:**
- Modify: `src/components/layout/header.tsx`
- Test: `src/components/layout/layout.test.tsx`

- [ ] **Step 1: Cập nhật Header với client-side scroll hook**
- [ ] **Step 2: Chạy unit tests xác minh Header vẫn render chuẩn SSR & pass tests**

```bash
bun run test
```

---

### Task 2: Redesign Trang Chủ với Progress Track 1.0 - 3.0 - 6.0 & Honest Math (Hum-07 DNA)

**Files:**
- Modify: `src/app/(site)/page.tsx`
- Test: `src/test/app-screens.test.tsx`

- [ ] **Step 1: Viết test cho Progress Track & Honest Math trên Trang Chủ**
- [ ] **Step 2: Cập nhật `src/app/(site)/page.tsx` với Progress Track, Micro-trust labels và Honest Math**
- [ ] **Step 3: Chạy test và lint kiểm tra**

```bash
bun run typecheck && bun run lint && bun run test
```

---

### Task 3: Kiểm tra Build & Accessibility

- [ ] **Step 1: Kiểm tra build sản phẩm**

```bash
bun run build
```
