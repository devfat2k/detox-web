---
paths: src/domain/**
---
# Domain Layer Rules

- Nguồn chuẩn nghiệp vụ: Tuân thủ `src/docs/product-spec.md` §8 (sàng lọc, gợi ý liệu trình, menu, ước lượng cân nặng).
- TypeScript thuần 100%: không React, không fetch/XHR, toàn bộ là hàm thuần (pure functions).
- Phạm vi: screening, energy, recommend, plan, weight-range, summary. Toàn bộ logic chạy trên trình duyệt.
- Không đổi chữ ký public của `src/domain/` khi chưa được duyệt.
- Kiểm thử: Mỗi file logic phải có unit test đặt ngay cạnh file (`*.test.ts`).
