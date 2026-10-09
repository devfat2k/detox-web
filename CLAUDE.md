# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Detox Experience Web ("Ép Xanh Chữa Lành")

Free, non-commercial, no-login Vietnamese website for a detox juice shop ("Ép Xanh Chữa Lành"). Visitors do a short survey and get a personalized detox plan (1, 3 or 6 days) built from the shop's real menu, browse plans and drinks, and read articles with cited sources. Contact is a plain link to the shop's Threads page. No prices, no cart, no payment, no accounts, no courses/recipes sales, no transactions.

Spec đầy đủ ở `src/docs/product-spec.md`, chỉ đọc mục liên quan, không đọc cả file mỗi lần. Before any UI work read `DESIGN.md` (if present). Backend (NestJS) will be developed in a separate repository; do not add backend or database to this repository.

## Commands

Always run scripts with `bun run <script>`. NEVER run bare `bun test`: it launches Bun's own runner instead of Vitest.

- `bun run dev` dev server
- `bun run typecheck` TypeScript check (must pass)
- `bun run lint` ESLint (must pass)
- `bun run test` unit tests (Vitest)
- `bun run test:e2e` Playwright (flow + accessibility)
- `bun run build` production build (also validates content)

## Stack

Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 (CSS-first tokens in `src/app/globals.css`). Zod for validation. Content as files. Tests: Vitest, Playwright. Package manager: bun (commit the lockfile); Next.js itself runs on Node (24 LTS). No form library, no state library, no analytics, no UI kit.

## Routes (English slugs)

`/` · `/consultation` (+ `/body`, `/goals`, `/experience`, `/result`, `/ineligible`) · `/plans` and `/plans/[1-day|3-day|6-day]` · `/drinks` and `/drinks/[slug]` · `/articles` and `/articles/[slug]` · `/policy`

## Architecture

- `src/app/` routes only; pages stay thin. Server Components by default; `"use client"` only for the survey flow and interactive widgets.
- `src/domain/` pure TypeScript (screening, energy, recommend, plan, weight-range, summary). No React, no fetch. Unit-tested. The survey calculation runs entirely in the browser.
- `src/content/` typed content data: `products.ts`, `plans.ts`, `advice.ts`, `sources.ts` (registry of cited sources), `site.ts`, validated by Zod schemas in `schema.ts` at build time.
- `content/posts/*.md` articles (frontmatter validated by Zod; `sources` is required).
- `src/services/` `PlanService` interface; only a local implementation exists in this repo.
- `src/components/ui/` primitives; feature components next to them.

## Không tự đoán

- Chưa rõ yêu cầu, ngưỡng hoặc nội dung thì hỏi đúng 1 câu, không tự điền.
- Không tự chọn màu, font, khoảng cách, bo góc ngoài token trong globals.css và DESIGN.md. Thiếu token thì đề xuất thêm và chờ duyệt.
- Không thêm dependency, không đổi cấu trúc thư mục, không đổi chữ ký public của src/domain khi chưa được duyệt.
- Dữ liệu demo chỉ dùng mock theo mục Mock data. Không bịa nội dung dinh dưỡng thật.

## Hard Rules (Chi tiết xem trong .claude/rules/)

- **Privacy & Zero-Backend:** Khảo sát chạy 100% trên client qua React Context trong `src/app/consultation/layout.tsx`. Không lưu trữ, không gửi ra ngoài (chi tiết xem `.claude/rules/privacy.md`).
- **Content & Medical:** Tiếng Việt "mình"/"bạn", phi thương mại 100%. Không cam kết kết quả (ví dụ "đảm bảo giảm 3kg"), không tuyên bố chữa bệnh ("Chữa Lành" thuần túy là tên thương hiệu). Trích dẫn nguồn theo `sourceIds` (chi tiết xem `.claude/rules/content.md`).
- **UI & Design:** Chỉ dùng token từ `globals.css`, font Bricolage Grotesque & Be Vietnam Pro, mobile-first 390px (chi tiết xem `.claude/rules/ui.md`).
- **Domain:** TypeScript thuần 100%, hàm thuần, unit test cạnh file (chi tiết xem `.claude/rules/domain.md`).
- **Testing:** Chạy qua `bun run test` / `bun run test:e2e`, kiểm thử bắt buộc với `src/domain/` và `src/content/schema.ts` (chi tiết xem `.claude/rules/testing.md`).

## Workflow

1. Explore the relevant files first, then propose a short plan; wait for approval on anything touching more than 3 files.
2. Implement in small steps. After each step run `bun run typecheck && bun run lint && bun run test`.
3. For UI work, check 390px and 1280px.
4. Every change in `src/domain/` and `src/content/schema.ts` needs unit tests.
5. One focused conventional commit per step (`feat:`, `fix:`, `test:`, `chore:`).

- Do not add a dependency without saying why and asking first.
- Do not edit `.env*` or commit secrets. Keep `next` on the latest patch release.
