---
paths: src/app/consultation/**, src/domain/**
---
# Privacy & Zero-Backend Rules

- Nguồn chuẩn quyền riêng tư: Tuân thủ `docs/product-spec.md` §9 và luồng khảo sát tại §4.
- Dữ liệu khảo sát 100% client-side, không bao giờ gửi ra ngoài và không lưu trữ bền vững.
- Cấm: fetch/XHR gửi dữ liệu, database, cookies, localStorage, sessionStorage, query params chứa dữ liệu, analytics, log giá trị form, script bên thứ 3.
- State khảo sát chỉ lưu trên bộ nhớ trong React Context tại `src/app/consultation/layout.tsx` (tải lại trang mất dữ liệu là đúng chủ đích).
- Bước 1 hiển thị 1 câu thông báo quyền riêng tư, không dùng màn hình chặn xin đồng ý.
