# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Detox Experience Web ("Ép Xanh Chữa Lành")

Free, non-commercial, no-login Vietnamese website for a detox juice shop ("Ép Xanh Chữa Lành"). Visitors do a short survey and get a personalized detox plan (1, 3 or 6 days) built from the shop's real menu, browse plans and drinks, and read articles with cited sources. Contact is a plain link to the shop's Threads page. No prices, no cart, no payment, no accounts, no courses/recipes sales, no book sales, no donation appeals, no transactions.

## Source of Truth

- `docs/product-spec.md` là nguồn chuẩn duy nhất cho nghiệp vụ và nội dung.
- `DESIGN.md` là nguồn chuẩn duy nhất cho giao diện, tokens và gu thẩm mỹ.
- `CLAUDE.md` chỉ quy định cách làm việc, câu lệnh, kiến trúc kỹ thuật.
- Không chép lại nội dung spec vào `CLAUDE.md` hay `.claude/rules/`, chỉ trỏ mục tương ứng.
- Nếu có mâu thuẫn, spec và `DESIGN.md` thắng. Khi sửa spec/DESIGN.md phải rà và cập nhật `CLAUDE.md` cùng rules trong cùng một commit.

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

## Routes & Fixed Labels

- Routes (English slugs): `/` · `/consultation` (+ `/goals`, `/experience`, `/safety`, `/result`, `/ineligible`) · `/plans` and `/plans/[1-day|3-day|6-day]` · `/drinks` and `/drinks/[slug]` · `/articles` and `/articles/[slug]` · `/policy`
- Nhãn menu điều hướng: "Tư vấn", "Liệu trình", "Thức uống", "Bài viết". Nút hành động nổi bật: "Tư vấn lộ trình".
- Nút cố định luồng: "Xem lộ trình của tôi", "Tiếp tục", "Quay lại", "Nhắn shop trên Threads", "Sao chép tóm tắt để gửi shop", "Thử lại", "Về trang chủ".
- Lời chào đầu trang: hiện ngắn gọn, không chặn nội dung Trang chủ, không dùng storage hay cookie để nhớ trạng thái.

## Architecture

- `src/app/` routes only; pages stay thin. Server Components by default; `"use client"` only for the survey flow and interactive widgets.
- `src/domain/` pure TypeScript (screening, energy, recommend, plan, weight-range, summary). No React, no fetch. Unit-tested. The survey calculation runs entirely in the browser.
- `src/content/` typed content data: `products.ts`, `plans.ts`, `advice.ts`, `sources.ts` (registry of cited sources), `site.ts`, validated by Zod schemas in `schema.ts` at build time.
- `content/posts/*.md` articles (frontmatter validated by Zod; `sources` is required).
- `src/services/` `PlanService` interface; only a local implementation exists in this repo.
- `src/components/ui/` primitives; feature components next to them.

## Medical Compliance & Principles

- Không tư vấn chữa bệnh hay cam kết kết quả (ví dụ "giảm 3kg", "đảm bảo"). "Ép Xanh Chữa Lành" là tên thương hiệu, không dùng từ "chữa" để cam kết y tế. Ưu tiên diễn đạt trung thực, không soi từng từ máy móc (xem `docs/product-spec.md` §1 & §7).
- Trích dẫn nguồn: Mọi khẳng định dinh dưỡng/sức khỏe phải gắn `sourceIds` hợp lệ từ `sources.ts`.
- "Công dụng": Đóng góp dinh dưỡng của nguyên liệu và cảm nhận vị giác/cơ thể, không phải khẳng định chữa bệnh hay thải độc.
- Khoảng cân nặng: Ước tính tham khảo, phần lớn là nước và giảm đầy bụng.
- Thẻ "Khuyên dùng": Tối đa 1 thẻ, gắn theo kết quả khảo sát, không cố định vào một liệu trình.

## Mock Data

- Tối đa 2 đồ uống và 1 liệu trình mock trong `src/content/mock/`, mỗi mục gắn nhãn `MOCK`. Xóa khi có backend và database. Không tự ý viết thêm mock, không bịa nội dung dinh dưỡng thật.

## Không tự đoán

- Chưa rõ yêu cầu, ngưỡng hoặc nội dung thì hỏi đúng 1 câu, không tự điền.
- Không tự chọn màu, font, khoảng cách, bo góc ngoài token trong globals.css và DESIGN.md. Thiếu token thì đề xuất thêm và chờ duyệt.
- Không thêm dependency, không đổi cấu trúc thư mục, không đổi chữ ký public của src/domain khi chưa được duyệt.
- Dữ liệu demo chỉ dùng mock theo mục Mock data. Không bịa nội dung dinh dưỡng thật.

## Hard Rules (Chi tiết xem trong .claude/rules/)

- **Privacy & Zero-Backend:** Khảo sát chạy 100% trên client qua React Context trong `src/app/consultation/layout.tsx`. Không lưu trữ, không gửi ra ngoài (xem `docs/product-spec.md` §9 & `.claude/rules/privacy.md`).
- **Content & Medical:** Tiếng Việt "mình"/"bạn", phi thương mại 100%. Trích dẫn nguồn theo `sourceIds` (xem `docs/product-spec.md` §7 & `.claude/rules/content.md`).
- **UI & Design:** Chỉ dùng token từ `globals.css`, duy nhất font Be Vietnam Pro thanh mảnh, mobile-first 390px, tuyệt đối không emoji hay text làm icon (xem `DESIGN.md` & `.claude/rules/ui.md`).
- **Domain:** TypeScript thuần 100%, hàm thuần, unit test cạnh file (xem `docs/product-spec.md` §8 & `.claude/rules/domain.md`).
- **Testing:** Chạy qua `bun run test` / `bun run test:e2e`, kiểm thử bắt buộc với `src/domain/` and `src/content/schema.ts` (xem `.claude/rules/testing.md`).

## Workflow

1. Explore the relevant files first, then propose a short plan; wait for approval on anything touching more than 3 files.
2. Implement in small steps. After each step run `bun run typecheck && bun run lint && bun run test`.
3. For UI work, check 390px and 1280px.
4. Every change in `src/domain/` and `src/content/schema.ts` needs unit tests.
5. One focused conventional commit per step (`feat:`, `fix:`, `test:`, `chore:`).

- Do not add a dependency without saying why and asking first.
- Do not edit `.env*` or commit secrets. Keep `next` on the latest patch release.

## Token and context discipline

- Be specific: read only the files and spec sections needed for the current step. Never read node_modules, .next, build output, bun.lock, or the whole product-spec.md; use grep or a section heading.
- One step per session. After a step is committed, tell me whether I should /clear before the next one.
- Delegate verbose work (full test runs, e2e, build logs, fetching docs) to a subagent that returns only failures, file:line, and a short summary.
- Do not paste or restate large file contents or logs; quote only the relevant lines.
- Plan first and wait for approval when a change touches more than 3 files.
- Never skip typecheck, lint, or tests to save tokens. Never guess when a short targeted read answers the question.
- For src/domain and screening rules, take the careful path: read the spec section and existing tests first.
- Do not start background or recurring work (loops, scheduled tasks, goals, agent teams) unless I ask.

# Compact instructions

When compacting, keep: the current plan and step, files changed, decisions and why, failing test output. Drop: exploration logs, rejected approaches, long tool output.

