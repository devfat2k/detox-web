---
name: commit-step
description: Chạy typecheck, lint, test rồi tạo một commit conventional cho bước vừa làm. Dùng khi bước hiện tại đã xong.
disable-model-invocation: true
---

1. Chạy `bun run typecheck && bun run lint && bun run test`. Nếu fail thì dừng và báo lỗi.
2. Chạy `git status` và `git diff --stat` để xem tổng quan các thay đổi.
3. Tóm tắt ngắn gọn nội dung thay đổi.
4. Đề xuất commit message chuẩn conventional (`feat:`, `fix:`, `test:`, `chore:`).
5. Đợi người dùng xác nhận đồng ý mới tiến hành commit.
