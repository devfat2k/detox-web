---
paths: src/app/consultation/**, src/domain/**, src/services/**, src/features/consultation/**
---
# Privacy & Data Collection Rules

- **Nguồn chuẩn quyền riêng tư:** Tuân thủ `docs/product-spec.md` §9 và luồng khảo sát tại §4.
- **Tuyệt đối KHÔNG thu thập dữ liệu nhạy cảm:**
  - Không thu thập số CCCD/CMND, hộ chiếu, mã định danh cá nhân.
  - Không thu thập số điện thoại, email cá nhân, địa chỉ nhà riêng.
  - Không thu thập tài khoản ngân hàng, thông tin thanh toán, thẻ tín dụng.
  - Không yêu cầu tạo tài khoản (No Auth, No Login, No Registration).
- **Phạm vi thông tin sinh hoạt được phép thu thập:**
  - Chỉ xin các thông tin sinh hoạt và thể trạng cơ bản: tuổi, chiều cao, cân nặng, giới tính (để tính chỉ số BMR/BMI), mức độ vận động hàng ngày, mục tiêu cải thiện sức khỏe (giảm mỡ, tiêu hóa, đẹp da, thanh lọc), kinh nghiệm uống nước ép, khẩu vị (chịu được vị đắng/nồng hay không), và tiền sử dị ứng nguyên liệu/dạ dày nhạy cảm.
  - Mục đích duy nhất: Tính toán và cá nhân hóa lộ trình nước ép, cảnh báo an toàn thực phẩm.
- **Tính chất phiên làm việc (Session-scoped):**
  - Dữ liệu gửi lên API qua `POST /api/consultation` là hoàn toàn ẩn danh, phục vụ phân tích thể trạng tức thì theo phiên.
  - Không lưu cookie theo dõi danh tính, không dùng analytics hoặc script bên thứ ba để theo dõi hành vi người dùng.
  - Tải lại trang hoặc đóng trình duyệt thì dữ liệu phiên tự động được giải phóng.
- **Giao diện:** Bước 1 hiển thị 1 câu thông báo ngắn gọn về quyền riêng tư và cam kết không thu thập thông tin cá nhân nhạy cảm, không dùng màn hình chặn xin đồng ý phức tạp.
