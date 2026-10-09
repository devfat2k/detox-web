---
name: commit-step
description: >-
  Chạy chuỗi kiểm tra typecheck, lint, vitest rồi tạo git commit conventional sau khi hoàn thành một bước làm việc. Dùng khi: "commit bước này", "xong bước rồi commit", "tạo commit", "commit code", "lưu thay đổi bước này". KHÔNG dùng khi đang làm dở công việc hoặc chỉ cần push code, tạo nhánh.
disable-model-invocation: true
---

1. Chạy `bun run typecheck && bun run lint && bun run test`. Nếu fail thì dừng và báo lỗi.
2. Chạy `git status` và `git diff --stat` để xem tổng quan các thay đổi.
3. Tóm tắt ngắn gọn nội dung thay đổi.
4. Đề xuất commit message chuẩn conventional (`feat:`, `fix:`, `test:`, `chore:`).
5. Đợi người dùng xác nhận đồng ý mới tiến hành commit.
