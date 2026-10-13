<div align="center">

# 🌿 Ép Xanh Chữa Lành — Detox Experience Platform

> **Nền tảng tư vấn và trải nghiệm lộ trình nước ép detox cá nhân hoá, thuần tự nhiên, hướng đến lối sống cân bằng và lành mạnh.**  
> Thiết kế theo triết lý **Privacy-First (Zero-Backend)**, **Mobile-First Aesthetic**, và **Evidence-Based Nutrition**.

[📌 Tổng Quan](#-tổng-quan-dự-án-project-overview) • [✨ Tính Năng](#-tính-năng-nổi-bật-key-features) • [🛠️ Kiến Trúc & Công Nghệ](#-kiến-trúc--công-nghệ-tech-stack) • [🚀 Cài Đặt & Chạy](#-hướng-dẫn-cài-đặt--chạy-dự-án-quick-start) • [🌱 Tinh Thần Dự Án](#-tinh-thần-dự-án)

---

</div>

## 📌 Tổng Quan Dự Án (Project Overview)

**Ép Xanh Chữa Lành** là website phi thương mại mang đến trải nghiệm tư vấn lộ trình detox hoàn toàn miễn phí, trực quan và an toàn cho người dùng:

- **Tư vấn thể trạng & Đề xuất cá nhân hoá:** Giúp người dùng nhanh chóng tìm ra lộ trình 1 ngày, 3 ngày hoặc 6 ngày phù hợp nhất dựa trên mục tiêu (thanh lọc, thon gọn, nhẹ bụng) và kinh nghiệm cá nhân.
- **Thực đơn nước ép thực tế:** Xây dựng trực tiếp từ danh mục thức uống nguyên bản của quán, cung cấp đầy đủ thành phần nguyên liệu và công dụng dinh dưỡng.
- **Lịch trình uống khoa học theo giờ:** Phân bổ chi tiết các khung giờ dùng nước ép trong ngày, kèm dự báo cảm nhận cơ thể thực tế theo từng giai đoạn.
- **Kiến thức dinh dưỡng có kiểm chứng:** Mọi nội dung chia sẻ về sức khỏe đều có trích dẫn nguồn tài liệu y khoa và dinh dưỡng rõ ràng (`sourceIds`).
- **Quyền riêng tư tối đa (Zero-Backend Privacy):** 100% thuật toán sàng lọc, tính toán và đề xuất chạy trực tiếp trên trình duyệt bằng TypeScript thuần. Không yêu cầu đăng ký tài khoản, không lưu cookie theo dõi, không gửi dữ liệu ra máy chủ.

---

## ✨ Tính Năng Nổi Bật (Key Features)

### 🎯 1. Khảo Sát & Sàng Lọc Sức Khỏe Thông Minh (`/consultation`)
- Bộ câu hỏi tương tác nhanh về mục tiêu thanh lọc, thói quen vận động và trải nghiệm detox.
- Sàng lọc an toàn tự động: Nhận diện trường hợp chống chỉ định (phụ nữ mang thai, cho con bú, bệnh lý tiêu hoá/chuyển hoá nặng) và đưa ra khuyến cáo phù hợp.
- Tính toán đề xuất tức thì lộ trình tối ưu (1 ngày, 3 ngày hoặc 6 ngày).

### ⏰ 2. Chi Tiết Lộ Trình & Lịch Uống Theo Khung Giờ (`/plans`)
- Khung giờ uống nước ép phân bổ khoa học suốt cả ngày (sáng sớm, giữa buổi, trưa, xế, chiều).
- Dự báo cảm nhận cơ thể thực tế (giai đoạn nhẹ nhõm, điều chỉnh, cân bằng), loại bỏ kỳ vọng sai lệch về giảm cân cấp tốc.
- Bảng tổng hợp thành phần dinh dưỡng và năng lượng tham khảo cho từng ngày.

### 🥗 3. Khám Phá Thực Đơn Thức Uống (`/drinks`)
- Danh mục trực quan các món nước ép nguyên chất từ rau củ quả tươi.
- Chi tiết bảng nguyên liệu, hương vị đặc trưng, độ ngọt tự nhiên và công dụng hỗ trợ sức khỏe.

### 📖 4. Bài Viết Chuyên Sâu Có Dẫn Nguồn (`/articles`)
- Kho bài viết dinh dưỡng, hướng dẫn chuẩn bị trước - trong - sau liệu trình detox.
- 100% khẳng định sức khỏe đều có mã định danh nguồn khoa học (`sourceIds`), minh bạch và đáng tin cậy.

### ⚡ 5. Tiện Ích Một Chạm & Kết Nối Trực Tiếp
- **Sao chép tóm tắt lộ trình:** Định dạng sẵn kết quả khảo sát thành văn bản gọn gàng để lưu lại hoặc gửi đi chỉ với 1 cú click.
- **Kết nối kênh Threads:** Liên kết trực tiếp đến trang cộng đồng của quán để được hỗ trợ và trao đổi kinh nghiệm.

---

## 🛠️ Kiến Trúc & Công Nghệ (Tech Stack)

```text
┌─────────────────────────────────────────────────────────────┐
│                 Client Browser (Zero-Backend)               │
├─────────────────────────────────────────────────────────────┤
│  • Next.js 16 (App Router / Server Components by default)   │
│  • React 19 (Client State & Interactive Stepper Flow)       │
│  • Tailwind CSS v4 (CSS-first Design Tokens: Sage Green)    │
│  • Lucide Icons (Minimalist & Consistent Iconography)       │
├─────────────────────────────────────────────────────────────┤
│                   Pure Domain Engine (TypeScript)           │
│  • Sàng lọc an toàn (Safety Screening Engine)               │
│  • Thuật toán khuyến nghị lộ trình (Plan Recommender)       │
│  • Tính toán năng lượng & cảm nhận (Energy & Body Sense)    │
│  • Zod (Static Data Validation: Menu, Plans, Articles)      │
└─────────────────────────────────────────────────────────────┘
```

### 🧰 Chi Tiết Công Nghệ

| Nhóm | Công nghệ | Phiên bản | Vai trò & Mục đích |
| --- | --- | --- | --- |
| **Core Framework** | Next.js | 16 (App Router) | Server Components mặc định, tối ưu tốc độ render và SEO |
| | React | 19 | Xử lý luồng khảo sát tương tác mượt mà phía client |
| | TypeScript | 5.x (Strict) | Đảm bảo an toàn kiểu dữ liệu tuyệt đối toàn dự án |
| **Styling & UI** | Tailwind CSS | v4 | Hệ thống CSS-first tokens, giao diện mobile-first từ 390px |
| | Lucide React | 1.x | Hệ thống icon tối giản, đường nét thanh mảnh đồng bộ |
| **Validation & Domain** | Zod | 4.x | Xác thực schema tĩnh cho dữ liệu thực đơn, lộ trình và bài viết |
| | Pure Domain | Pure TS | Thuật toán nghiệp vụ độc lập framework, 100% testable |
| **Testing & Quality** | Vitest | 5.x | Unit test tốc độ cao cho toàn bộ domain logic và schema |
| | Playwright | 1.x | Kiểm thử E2E luồng người dùng và chuẩn tiếp cận Accessibility |
| **Runtime & Tooling** | Bun | 1.x | Trình quản lý gói và chạy tác vụ với hiệu năng tối đa |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án (Quick Start)

### 📋 Yêu Cầu Tiền Đề (Prerequisites)

- **Node.js 24 LTS** trở lên
- **Bun** (khuyến nghị v1.2+)

---

### 1️⃣ Clone Dự Án

```bash
git clone https://github.com/phathuu26/detox-web.git
cd detox-web
```

---

### 2️⃣ Cài Đặt Thư Viện

```bash
bun install
```

---

### 3️⃣ Khởi Chạy Môi Trường Phát Triển

```bash
bun run dev
```

Mở trình duyệt truy cập: **[http://localhost:3000](http://localhost:3000)**

---

### 4️⃣ Kiểm Tra Chất Lượng Mã Nguồn

```bash
# Kiểm tra kiểu dữ liệu TypeScript
bun run typecheck

# Kiểm tra linting
bun run lint

# Định dạng code chuẩn
bun run format

# Chạy Unit Tests (Vitest)
bun run test

# Chạy E2E Tests (Playwright)
bun run test:e2e

# Biên dịch bản sản xuất (Production Build)
bun run build
```

> **Lưu ý:** Luôn sử dụng `bun run test` (không chạy lệnh bare `bun test` vì Bun sẽ ưu tiên test runner tích hợp thay vì Vitest).

---

## 🌱 Tinh Thần Dự Án

- **Thuần khiết & Tự nhiên:** Tôn vinh giá trị thực của rau củ tươi, trung thực về tác dụng và không cam kết y khoa quá đà.
- **Tôn trọng quyền riêng tư:** Trải nghiệm trọn vẹn mà không phiền hà về tài khoản, quảng cáo hay theo dõi người dùng.
- **Tối giản & Mượt mà:** Giao diện tinh gọn, phản hồi tức thì và tương thích hoàn hảo trên mọi kích thước màn hình.
