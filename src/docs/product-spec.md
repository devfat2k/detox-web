# Product spec v1.2 — Detox Experience Web ("Ép Xanh Chữa Lành")

Cập nhật ngày 09/10/2026. Thay thế v1.1. Nếu có mâu thuẫn, bản này thắng.

## 1. Mục tiêu và nguyên tắc

**Mục đích:** thay việc chủ shop nhắn tin tư vấn từng khách bằng một website để khách **tự trải nghiệm**: làm khảo sát ngắn, xem liệu trình detox gợi ý theo bản thân, đọc chi tiết từng liệu trình và từng loại thức uống, đọc thêm bài viết tham khảo. Muốn tư vấn thêm thì khách tự mở Threads của shop.

**Nguyên tắc cố định:**

1. Miễn phí hoàn toàn. Không giá, không giỏ hàng, không thanh toán, không bán liệu trình, không bán khóa học, không bán công thức, không bán sách, không kêu gọi ủng hộ hoặc quyên góp, không kêu gọi bán hàng, không seeding bẩn, không phát sinh bất kỳ giao dịch nào.
2. **Không đăng nhập.** Vào là xem được ngay trang chủ, mục tư vấn liệu trình nổi bật ngay đầu trang.
3. **Không thu thập CCCD, email, số điện thoại** của bất kỳ ai. Dữ liệu khảo sát chỉ dùng để tính tại chỗ, không lưu trữ tại Frontend.
4. Nội dung chỉ nói về các sản phẩm shop đang bán, không đi xa hơn. Mọi công thức được chính tác giả trích xuất từ sách có kiểm chứng.
5. **Về ngôn từ và y tế:**
   - Không xây dựng web để tư vấn chữa bệnh hay khẳng định chữa được bệnh.
   - Không khẳng định hay cam kết kết quả, ví dụ "sẽ giảm 3 kg", "đảm bảo giảm cân"; dùng cách nói ước lượng, mang tính tham khảo.
   - "Ép Xanh Chữa Lành" thuần túy là tên thương hiệu, không dùng từ "chữa" để cam kết về y tế.
   - Không cần soi từng từ: ưu tiên diễn đạt trung thực, dễ hiểu; kiểm tra ở bước review nội dung.
6. Mọi thông tin lộ trình chỉ là **ước lượng mang tính chất tham khảo dựa trên cá nhân hoá**, có kiểm chứng, không thay thế chẩn đoán y khoa.
7. Liên hệ: một **đường link** tới Threads của shop (QR bỏ). URL của web đã nằm trong bio Threads nên khách vào web từ Threads, và quay lại Threads khi muốn hỏi thêm.

## 1A. Nguyên tắc trải nghiệm

1. Vào web hiện ngắn lời chào thương hiệu rồi đến Trang chủ ngay, lời chào không chặn nội dung.
2. Thao tác liền mạch, một tay, ít bước, chỉ hỏi điều thực sự cần.
3. Có kịch bản dẫn dắt ở các điểm khách dễ bỏ (đầu Trang chủ, Bước 1, Bước 2, kết quả), mỗi điểm nói rõ lợi ích, không hứa kết quả.
4. Không dùng thủ thuật ép buộc như khan hiếm giả hay đếm ngược.
5. Thông tin ở mức phổ thông, ai cũng hiểu, không làm méo mó.
6. Vì không có analytics, kiểm tra điểm bỏ cuộc bằng cách cho 5 đến 7 người thật dùng thử.

## 2. Người dùng

- Nhóm chính: phụ nữ trẻ, năng động, quan tâm sức khỏe và đặc biệt là cân nặng; nhu cầu tham khảo lộ trình detox xuất phát từ đây.
- Khách quan tâm detox, thường đến từ Threads, dùng điện thoại một tay.
- Khách cũ muốn xem lại thực đơn, mẹo, công thức.
- Chủ shop: giảm tin nhắn hỏi lặp lại, khách đến nhắn với hiểu biết sẵn.

## 3. Sơ đồ trang (Routes - tiếng Anh 100%)

| Route                                     | Trang                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/`                                       | Trang chủ: khối "Tư vấn lộ trình" nổi bật ở đầu, tóm tắt 3 liệu trình, thức uống nổi bật, bài viết mới |
| `/consultation`                           | Bước 1 khảo sát: Lưu ý an toàn                                                                         |
| `/consultation/body`                      | Bước 2: thông tin cơ thể                                                                               |
| `/consultation/goals`                     | Bước 3: vấn đề và mục tiêu                                                                             |
| `/consultation/experience`                | Bước 4: kinh nghiệm và số ngày                                                                         |
| `/consultation/result`                    | Kết quả cá nhân hóa                                                                                    |
| `/consultation/ineligible`                | Không phù hợp                                                                                          |
| `/plans`                                  | Danh sách liệu trình 1, 3, 6 ngày (xem được không cần khảo sát)                                        |
| `/plans/[1-day \| 3-day \| 6-day]`        | Chi tiết liệu trình: từng ngày, từng chai                                                              |
| `/drinks`                                 | Danh mục thức uống theo loại                                                                           |
| `/drinks/[slug]`                          | Chi tiết một thức uống                                                                                 |
| `/articles`                               | Blog: lọc Mẹo vặt / Công thức / Kiến thức                                                              |
| `/articles/[slug]`                        | Bài viết (có danh sách nguồn)                                                                          |
| `/policy`                                 | Chính sách và miễn trừ                                                                                 |

Menu điều hướng: Tư vấn, Liệu trình, Thức uống, Bài viết. Nút nổi bật luôn là "Tư vấn lộ trình".

## 4. Luồng khảo sát (không có màn "đồng ý" chặn)

Vì phần tính toán chạy hoàn toàn trên máy người dùng (mục 8), không cần màn xin đồng ý riêng. Thay bằng **một dòng thông báo** ở Bước 1: "Thông tin chỉ được tính ngay trên máy của bạn, không gửi đi và không lưu lại."

1. **Bước 1/4: Lưu ý an toàn.** Danh sách "đánh dấu nếu đúng với bạn" (mặc định không chọn), một màn duy nhất:
   - Đang mang thai hoặc cho con bú
   - Có bệnh nền (tiểu đường, bệnh thận hoặc sỏi thận, gan, tim mạch, huyết áp thấp, dạ dày nặng)
   - Đang dùng thuốc điều trị thường xuyên
   - Từng hoặc đang có rối loạn ăn uống
   - Dị ứng với hạt, sữa hoặc một số nguyên liệu _(chỉ cảnh báo, không chặn)_
     Chọn bất kỳ mục nào ngoài mục dị ứng → màn "Không phù hợp".
2. **Bước 2/4: Cơ thể.** Tên gọi (không bắt buộc), giới tính, tuổi, chiều cao, cân nặng, mức vận động. Dưới 18 tuổi → "Không phù hợp".
3. **Bước 3/4: Mục tiêu.** Chọn tối đa 3: Giảm cân, Khó tiêu, Nóng trong, Mụn ẩn, Mất ngủ, Rụng tóc, Khác.
4. **Bước 4/4: Kinh nghiệm.** Đã từng detox chưa; nếu rồi thì lần gần nhất thế nào; muốn thử mấy ngày (1/3/6 hoặc "để shop gợi ý").
5. **Kết quả.**

Nút và câu chữ cố định: "Xem lộ trình của tôi", "Tiếp tục", "Quay lại", "Nhắn shop trên Threads", "Sao chép tóm tắt để gửi shop", "Thử lại".

## 5. Trang kết quả (cá nhân hóa)

1. Lời chào + liệu trình gợi ý (kèm lý do một dòng)
2. Khối tóm tắt: số ngày, tổng chai, kcal mỗi ngày, khoảng cân nặng ước tính
3. Thẻ từng ngày: 5 chai (Bottle Row), thành phần, "Hôm nay có thể mang lại" (có nguồn), thử thách nhỏ, khoảng cân nặng của ngày. Mỗi chai là link tới trang chi tiết thức uống.
4. Tổng kết các ngày
5. Cách uống 5 chai trong ngày
6. Lời khuyên theo mục tiêu đã chọn (tối đa 3 khối, có nguồn nếu là kiến thức dinh dưỡng)
7. Liên kết "Xem chi tiết liệu trình" và bài viết liên quan
8. Khối liên hệ: nút link Threads + tên tài khoản dạng chữ + (tùy chọn) "Sao chép tóm tắt để gửi shop"
9. Miễn trừ trách nhiệm

Thẻ "Khuyên dùng" gắn theo **kết quả khảo sát**, không cố định ở một liệu trình.

## 6. Trang chi tiết

**Liệu trình (1, 3, 6 ngày):** tổng quan (số ngày, tổng chai, khoảng kcal/ngày), từng ngày với tên và chủ đề, 5 chai/ngày, ai nên cân nhắc/không nên, cách chuẩn bị và ăn lại sau liệu trình, link sang thức uống.

**Thức uống:** loại (sinh tố xanh, sinh tố, nước ép, sữa hạt, sữa dinh dưỡng, trà thảo mộc), thành phần, vị, khoảng kcal một chai, chất gây dị ứng, "Công dụng" và "Giá trị mang lại" (mục 7), lưu ý, cách uống, các liệu trình có chứa thức uống này.

## 7. Quy tắc nội dung và nguồn (rất quan trọng)

**Điều các nguồn y khoa uy tín nói, và nội dung của web phải trung thực với nó:**

- Chưa có bằng chứng thuyết phục rằng các chương trình detox/cleanse loại bỏ độc tố hoặc cải thiện sức khỏe; cơ thể tự đào thải qua gan và thận.
- Cân nặng giảm trong vài ngày chủ yếu là nước và lượng thức ăn trong ruột, thường quay lại khi ăn bình thường.
- Chỉ uống nước ép nhiều ngày có thể gây đói, mệt, biến động đường huyết.
- Rau nhiều oxalate (cải bó xôi, kale, cà rốt…) cần thận trọng với người có vấn đề về thận.

**Vì vậy:**

1. "Công dụng" được hiểu là **đóng góp dinh dưỡng của nguyên liệu** (chất xơ, vitamin, khoáng chất, chất béo tốt từ hạt) và **trải nghiệm** (vị, cảm giác nhẹ bụng, dễ uống), **không phải** tuyên bố chữa bệnh hay thải độc.
2. "Giá trị mang lại" = thêm rau củ, trái cây, hạt vào ngày ăn; một khoảng nghỉ nhẹ nhàng ngắn hạn; cơ hội khởi đầu thói quen ăn uống tốt hơn. Nói rõ giới hạn: không thay thế bữa ăn cân đối lâu dài.
3. **Mỗi câu về dinh dưỡng/sức khỏe phải gắn nguồn** (id trong danh bạ nguồn). Build thất bại nếu thiếu.
4. **Nguồn ưu tiên:** Viện Dinh dưỡng Quốc gia, Bộ Y tế, WHO, Harvard Health và The Nutrition Source của Harvard, NIH Office of Dietary Supplements, Mayo Clinic, USDA FoodData Central (số liệu dinh dưỡng). Ghi tên tổ chức, tiêu đề, link, ngày xem.
5. **Không sao chép bài báo.** Viết lại bằng lời của shop, tóm tắt ngắn, kèm link tới bài gốc (bản quyền thuộc tác giả).
6. Cụm cần tránh (ví dụ): thải độc, thanh lọc sâu, đốt mỡ, giảm mỡ rõ rệt, chữa, trị, đảm bảo (trừ cụm "Chữa Lành" trong tên thương hiệu). Mục đích là tránh tuyên bố y tế và cam kết kết quả, không phải danh sách cấm máy móc.
7. Số kcal và dinh dưỡng của từng chai nên được tính từ bảng thành phần thực phẩm (Viện Dinh dưỡng hoặc USDA) và **người có chuyên môn dinh dưỡng duyệt** menu và mức kcal.

## 8. Quy tắc nghiệp vụ

**Sàng lọc:** như Bước 1 và Bước 2. Thêm: BMI < 18,5 → không phù hợp; từ 60 tuổi hoặc BMI ≥ 30 → vẫn xem được nhưng có cảnh báo "nên hỏi ý kiến bác sĩ trước".

**Gợi ý liệu trình** (khi chọn "để shop gợi ý"; ngưỡng cần người có chuyên môn duyệt):

| Điều kiện                      | Gợi ý                           |
| ------------------------------ | ------------------------------- |
| Chưa từng detox                | 3 ngày (có tùy chọn thử 1 ngày) |
| Từng detox, thấy ổn            | 3 hoặc 6 ngày                   |
| Từng detox, hơi mệt hoặc bỏ dở | 1 hoặc 3 ngày                   |
| 6 ngày chỉ gợi ý khi           | từng detox ổn **và** BMI ≥ 20   |

**Menu:** đúng menu của shop. 1 ngày = Ngày 1; 3 ngày là Ngày 1 đến 3. 6 ngày là lộ trình riêng do chủ shop tự viết, không lặp hai vòng. 5 chai/ngày: tổng chai 5, 15, 30. Không có lộ trình 9 ngày.

**Khoảng cân nặng:** năng lượng tiêu hao (Mifflin-St Jeor × hệ số vận động) trừ kcal menu, nhân số ngày, chia 7.700 ra phần mỡ; cộng biên độ nước giảm dần theo ngày; hiển thị **khoảng** (làm tròn 0,1 kg) kèm câu "Ước tính tham khảo. Phần lớn là nước và đỡ đầy bụng. Mỗi người một khác." Hệ số nước là đề xuất, cần chuyên gia duyệt. Phần này chưa chốt giữ hay bỏ (xem mục 13). Lưu ý: bỏ phần ước lượng không làm giảm số trường nhập, vì sàng lọc và gợi ý vẫn dùng BMI (chiều cao, cân nặng).

## 9. Quyền riêng tư và Kiến trúc Công nghệ

**Quyền riêng tư:**

- Tính toán chạy trên trình duyệt (client-side), không có yêu cầu mạng nào gửi dữ liệu khảo sát đi.
- Không database ở FE, không cookie, không localStorage/sessionStorage, không query param chứa dữ liệu, không analytics, không log giá trị form.
- Làm mới trang thì mất dữ liệu: đúng ý đồ.

**Kiến trúc công nghệ (FE & BE):**

- **Frontend (Repo hiện tại):** Sử dụng **Next.js**, phát triển theo tiêu chí từ đơn giản và nâng cấp mở rộng dần. Không dùng serverless. Không lưu dữ liệu cá nhân tại FE.
- **Backend (Repo riêng):** Sẽ được xây dựng và phát triển song song bằng **NestJS** ở một repository độc lập, phục vụ dữ liệu/nghiệp vụ khi có nhu cầu trong tương lai.

## 10. Phạm vi

**Có (v1):** trang chủ, khảo sát 4 bước, kết quả cá nhân hóa, trang liệu trình 1/3/6 ngày, danh mục và chi tiết thức uống, blog (mẹo vặt, công thức, kiến thức) có nguồn kiểm chứng, link Threads, chính sách.

**Không (v1):** đăng nhập, thanh toán, giá, QR, đặt hàng, thu thập liên hệ, bán khóa học/công thức/liệu trình, bán sách, kêu gọi ủng hộ hoặc quyên góp, analytics, tính năng AI dành cho người dùng cuối, serverless.

## 11. Giá trị mang lại

**Cho người dùng:** xem được liệu trình và thức uống thật của shop ngay, không cần nhắn trước; hình dung rõ từng ngày; được nhắc về an toàn; kỳ vọng thực tế; đọc thêm có nguồn; riêng tư.

**Cho chủ shop:** bớt tin nhắn hỏi lặp lại; khách đến nhắn đã có hiểu biết và (nếu muốn) đoạn tóm tắt; hình ảnh nhất quán và đáng tin vì nói đúng giới hạn của detox; tài sản nội dung lâu dài (blog, trang thức uống) giúp tìm thấy shop qua Google; chi phí vận hành thấp và rủi ro dữ liệu thấp. Web không bảo đảm tăng doanh thu.

## 12. Nội dung chủ shop cần chuẩn bị

1. Danh sách đầy đủ thức uống: tên, loại, thành phần, thể tích, chất gây dị ứng, ảnh thật
2. Menu từng ngày cho 3 ngày và lộ trình 6 ngày riêng, kcal từng chai đã được tính và duyệt.
3. Với mỗi thức uống và mỗi ngày: 1 đến 3 ý "công dụng/giá trị" kèm nguồn đã kiểm tra
4. Lời khuyên cho từng mục tiêu, cách uống 5 chai trong ngày, chuẩn bị và ăn lại sau liệu trình
5. 5 đến 10 bài viết đầu (mẹo, công thức, kiến thức), tự viết, có link nguồn
6. Link Threads chính thức và tên tài khoản
7. Chính sách và miễn trừ (nên có người am hiểu pháp lý xem)

## 13. Điểm còn mở

- Giữ hay bỏ phần ước lượng cân nặng? Lưu ý: bỏ phần này không bỏ được chiều cao và cân nặng vì sàng lọc dùng BMI.
- Phần dữ liệu (CMS/DB/backend): sẽ nghiên cứu sau; v1 để nội dung dưới dạng file trong dự án.

## 14. Lịch sử thay đổi

### v1.2 (09/10/2026)

- §1: Bổ sung không bán sách, không kêu gọi ủng hộ hoặc quyên góp, không giỏ hàng, không thanh toán, không kêu gọi bán hàng, seeding bẩn.
- §1: Viết lại nguyên tắc ngôn từ và y tế theo hướng diễn đạt trung thực, dễ hiểu, không soi từng từ máy móc.
- Thêm §1A: 6 nguyên tắc trải nghiệm người dùng (lời chào không chặn nội dung, thao tác một tay, kịch bản dẫn dắt, kiểm tra qua 5–7 người dùng thật...).
- §2: Thêm nhóm đối tượng chính (phụ nữ trẻ, năng động, quan tâm sức khỏe và cân nặng).
- §7: Đổi "Từ cấm" thành "Cụm cần tránh (ví dụ)" mang tính định hướng, tránh cam kết y tế/kết quả.
- §8 & §12: Chốt lộ trình 6 ngày là riêng biệt do chủ shop tự viết, không lặp hai vòng.
- §8 & §13: Lưu ý giữ/bỏ ước lượng cân nặng không làm giảm trường nhập vì BMI vẫn dùng chiều cao, cân nặng.
- §10: Bổ sung phạm vi không làm (bán sách, quyên góp, tính năng AI dành cho người dùng cuối).
