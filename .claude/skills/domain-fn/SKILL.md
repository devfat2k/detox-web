---
name: domain-fn
description: >-
  Viết hoặc chỉnh sửa hàm pure TypeScript trong src/domain/ theo chuẩn TDD (Red-Green-Refactor) và test vitest cạnh file. Dùng khi: "viết hàm domain", "thêm logic screening", "tính calo/năng lượng", "hàm tính cân nặng", "domain logic". KHÔNG dùng cho UI React, routes Next.js, hoặc mock data.
---

1. **Đọc rules & spec**:
   - Đọc `.claude/rules/domain.md` và `.claude/rules/testing.md`.
   - Đọc quy tắc nghiệp vụ liên quan trong `docs/product-spec.md`.
2. **Red (Test trước)**:
   - Tạo file test `src/domain/<name>.test.ts` cạnh hàm domain.
   - Viết các test case (đầu vào hợp lệ, biên, lỗi).
   - Chạy `bun run test` và xác nhận test fail.
3. **Green (Code tối thiểu)**:
   - Viết implementation tại `src/domain/<name>.ts`.
   - Đảm bảo hàm thuần (pure TypeScript, không React, không fetch, không side effects).
   - Chạy `bun run test` và xác nhận test pass.
4. **Refactor & Gate check**:
   - Tối ưu hóa code nếu cần.
   - Chạy `bun run typecheck && bun run lint && bun run test`.
