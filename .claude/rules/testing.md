---
paths: **/*.test.ts, **/*.test.tsx, e2e/**, tests/**
---
# Testing Rules

- Chạy unit test: Luôn dùng `bun run test` (Vitest). TUYỆT ĐỐI KHÔNG chạy bare `bun test`.
- Chạy E2E: Dùng `bun run test:e2e` (Playwright flow + kiểm tra accessibility/a11y).
- File test đặt cạnh file nguồn (`[name].test.ts`).
- Mọi thay đổi trong `src/domain/` và `src/content/schema.ts` bắt buộc phải có unit test đi kèm và vượt qua kiểm tra.
