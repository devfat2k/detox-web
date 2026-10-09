---
paths: src/app/consultation/**, src/domain/**
---
# Privacy & Zero-Backend Rules

- Dữ liệu khảo sát không bao giờ gửi ra ngoài trình duyệt và không được lưu trữ bền vững.
- Cấm: fetch/XHR gửi dữ liệu khảo sát, database, cookies, localStorage, sessionStorage, query params chứa dữ liệu, analytics, log giá trị form.
- State khảo sát chỉ lưu trên bộ nhớ trong React Context tại `src/app/consultation/layout.tsx` (tải lại trang mất dữ liệu là đúng chủ đích).
- Không script bên thứ 3. Bước 1 hiển thị 1 câu thông báo quyền riêng tư, không dùng màn hình chặn xin đồng ý.
