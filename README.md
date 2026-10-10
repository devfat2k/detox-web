# Detox Experience Web ("Ép Xanh Chữa Lành")

Website tư vấn và trải nghiệm lộ trình nước ép detox cá nhân hóa (1, 3, 6 ngày) từ thực đơn thật của quán "Ép Xanh Chữa Lành".
Dự án phi thương mại, không đăng nhập, không lưu trữ thông tin người dùng lên server (Zero-Backend Privacy).

## Công nghệ sử dụng

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first design tokens trong `src/app/globals.css`)
- **State & Form:** Zustand (in-memory client state), Zod, React Hook Form
- **Package Manager:** Bun
- **Kiểm thử:** Vitest (Unit tests), Playwright (E2E & Accessibility)

## Cấu trúc thư mục

```text
detox-web/
├── docs/                           # Tài liệu đặc tả sản phẩm (product-spec.md)
├── e2e/                            # Kiểm thử Playwright E2E và a11y
├── src/
│   ├── app/                        # Next.js App Router (Chỉ chứa shell page mỏng)
│   │   ├── (site)/                 # Nhóm route dùng chung Header & Footer
│   │   │   ├── page.tsx            # Trang chủ (/)
│   │   │   ├── consultation/       # Khảo sát tư vấn (/consultation, /body, /goals, /experience, /result, /ineligible)
│   │   │   ├── plans/              # Liệu trình (/plans, /plans/[planId])
│   │   │   ├── drinks/             # Thức uống (/drinks, /drinks/[slug])
│   │   │   ├── articles/           # Bài viết (/articles, /articles/[slug])
│   │   │   └── policy/             # Chính sách & miễn trừ (/policy)
│   │   ├── dev-ui/                 # Thư viện xem thử UI components (chỉ dev)
│   │   ├── globals.css             # Design tokens CSS-first
│   │   ├── robots.ts & sitemap.ts  # Cấu hình SEO
│   │   └── layout.tsx, error.tsx, loading.tsx, not-found.tsx
│   ├── components/                 # Thành phần giao diện dùng chung
│   │   ├── layout/                 # Header, Footer, MobileNav, NavLink
│   │   └── ui/                     # Primitives cơ sở (Button, Card, Container, Section, Heading, Chip, Notice, Skeleton)
│   ├── config/                     # Cấu hình routes, copy text, site metadata
│   ├── data/                       # Dữ liệu tĩnh định kiểu (plans, drinks, articles, goals)
│   ├── domain/                     # Nghiệp vụ thuần TypeScript (screening, recommend, calculation)
│   ├── features/                   # Module theo tính năng (consultation, plans, drinks, articles, policy)
│   │   └── [feature]/
│   │       ├── components/         # Giao diện cụ thể của tính năng
│   │       ├── schemas/            # Zod validation schema
│   │       ├── store/              # State quản lý tại client
│   │       ├── hooks/              # Custom hooks nghiệp vụ
│   │       └── index.ts            # Barrel export
│   ├── lib/                        # Tiện ích chung (cn, tailwind merge)
│   ├── services/                   # Lớp truy cập dữ liệu async (trả về Promise)
│   └── test/                       # Test tích hợp màn hình (app-screens.test.tsx)
└── DESIGN.md                       # Quy chuẩn thiết kế và checklist chống "AI Slop"
```

## Quy ước đặt tên & Kiến trúc

1. **Server Components mặc định:** Chỉ dùng `"use client"` cho form tương tác và stepper khảo sát.
2. **Page mỏng:** Mỗi `page.tsx` chỉ export `metadata`, lấy copy từ `config/copy.ts` và render component từ `features/`.
3. **Định tuyến tập trung:** Tuyệt đối không hardcode URL string trong components; luôn gọi qua `routes` trong `config/routes.ts`.
4. **Data Service abstraction:** Mọi truy xuất dữ liệu từ page phải gọi qua `services/*` (trả về Promise) để sẵn sàng mở rộng backend NestJS sau này.
5. **Quyền riêng tư (Zero-Backend):** Khảo sát chạy 100% trên trình duyệt trong bộ nhớ, không gửi ra ngoài, không dùng cookie hay lưu trữ bền vững.

## Lệnh phát triển (Chạy bằng Bun)

> **Lưu ý:** Luôn sử dụng `bun run <script>`. Tuyệt đối không chạy bare `bun test` vì Bun sẽ chạy test runner riêng thay vì Vitest.

```bash
# Cài đặt thư viện
bun install

# Khởi chạy máy chủ phát triển
bun run dev

# Kiểm tra kiểu dữ liệu TypeScript
bun run typecheck

# Kiểm tra lỗi cú pháp (Lint)
bun run lint

# Định dạng mã nguồn
bun run format

# Chạy Unit Tests (Vitest)
bun run test

# Chạy E2E Tests & Accessibility (Playwright)
bun run test:e2e

# Biên dịch sản phẩm (Production Build)
bun run build
```
