# Kế Hoạch Triển Khai Giai Đoạn 3: Tích Hợp & Mapping API (Axios + TanStack Query)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tích hợp API Backend (NestJS) vào hệ sinh thái frontend `detox-web` sử dụng **Axios** và **TanStack Query (`@tanstack/react-query`)**, mang lại khả năng caching tự động, retry exponential backoff và fallback mượt mà.

**Architecture:** Cấu hình `QueryProvider` bao bọc ứng dụng. `apiClient` (Axios) phụ trách tầng truyền tải HTTP với timeout 10s. TanStack Query quản lý server state, tự động retry 2 lần khi gặp sự cố mạng hoặc 5xx và cache dữ liệu danh mục/món uống (staleTime 5 phút). Mọi service và hook đều tích hợp cơ chế fallback về dữ liệu cục bộ (`DRINKS_DATA`, `PLANS_DATA`) và thuật toán client (`recommendPlan`).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Axios (`^1.7.0`), TanStack Query (`@tanstack/react-query ^5.0.0`), Vitest.

**Spec:** [docs/frontend-integration-guide.md](docs/frontend-integration-guide.md)

## Global Constraints

- **Dependency Limits**: Chỉ cài đặt `axios` và `@tanstack/react-query`. Tuyệt đối không cài thêm UI kit, form library hay analytics.
- **Privacy & Không Thu Thập Dữ Liệu Nhạy Cảm**:
  - Tuyệt đối KHÔNG thu thập các thông tin định danh cá nhân nhạy cảm: CCCD/CMND, số điện thoại, email, địa chỉ nhà, thông tin tài chính/thanh toán.
  - Chỉ thu thập các thông tin sinh hoạt và thể trạng cơ bản: tuổi, chiều cao, cân nặng, mức độ vận động hàng ngày, mục tiêu dinh dưỡng, khẩu vị, tiền sử dạ dày nhạy cảm và dị ứng nguyên liệu.
  - Toàn bộ hoạt động theo phiên ẩn danh (session-scoped).
- **Fail-Safe / Graceful Degradation**: Mọi query/mutation khi thất bại đều có fallback về dữ liệu tĩnh hoặc thuật toán client, website không bao giờ bị trắng trang hay đứt đoạn.
- **Strict Typing**: Khai báo đầy đủ TypeScript types tương thích 100% với đặc tả tại mục §4 trong [frontend-integration-guide.md](docs/frontend-integration-guide.md).
- **Retry Policy**: TanStack Query tự động retry tối đa 2 lần với exponential backoff cho lỗi mạng/5xx; không retry lỗi 4xx (validation error).

## Review Focus

1. **Mất mạng hoặc BE timeout > 10s khi submit khảo sát**: TanStack Query kích hoạt fallback client-side (`recommendPlan`), hiển thị kết quả bình thường kèm badge thông báo chế độ ngoại tuyến.
2. **Chuyển đổi qua lại giữa các tab danh mục thức uống**: Nhờ TanStack Query cache (`staleTime: 5 phút`), các tab đã xem hiển thị tức thì 0ms, không bị giật hay loading lại.
3. **Phản hồi lỗi 400 Validation từ BE**: Bóc tách chính xác mảng `errors` từ envelope `ApiErrorResponse` để hiển thị cảnh báo cho người dùng, không gây crash ứng dụng.
4. **Hydration và tương thích React 19 / Next.js 16**: `QueryProvider` được cấu hình là Client Component riêng biệt, bọc ngoài `src/app/layout.tsx` an toàn.
5. **Dữ liệu trả về từ BE thiếu trường UI**: Tầng Adapter mapper tự động bù đắp các giá trị an toàn (`color`, `level`, `benefit`) để các UI primitives (`DetoxBottle`) hoạt động hoàn hảo.

---

### Task 1: Cài Đặt Axios, TanStack Query, Khai Báo API Types & Dọn Dẹp Mock Data

**Files:**
- Modify: `package.json`
- Create: `src/types/api.ts`
- Modify: `src/data/drinks.ts`
- Modify: `src/data/plans.ts`
- Test: `src/types/api.test.ts`

**Interfaces:**
- Produces: `ApiResponse<T>`, `ApiErrorResponse`, `ActivityLevel`, `HealthGoal`, `ExperienceLevel`, `ConsultationPayload`, `Drink`, `Category`, `Plan`, `ConsultationResult`, cleaned fallback mock (duy nhất 1 mẫu an toàn với optional `?:`)

- [ ] **Step 1: Cài đặt axios và @tanstack/react-query**

Run:
```bash
bun add axios @tanstack/react-query
```

- [ ] **Step 2: Viết test cho types hợp đồng API**

Create `src/types/api.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import type { ApiResponse, ConsultationPayload, ConsultationResult } from "./api";

describe("API Types Contract", () => {
  it("validates successful envelope structure", () => {
    const response: ApiResponse<{ id: string }> = {
      success: true,
      statusCode: 200,
      message: "Thao tác thành công",
      data: { id: "test-1" },
      timestamp: "2026-10-15T00:00:00.000Z",
      path: "/api/test",
    };

    expect(response.success).toBe(true);
    expect(response.data.id).toBe("test-1");
  });

  it("validates consultation payload without sensitive fields", () => {
    const payload: ConsultationPayload = {
      baseline: {
        age: 25,
        weightKg: 52,
        heightCm: 160,
        activityLevel: "LIGHT",
      },
      goal: "DETOX",
      preferences: {
        experienceLevel: "BEGINNER",
        canDrinkBitterOrEarthy: false,
        durationDays: 3,
      },
      risks: {
        hasStomachPain: false,
        isPregnantOrNursing: false,
        hasDiabetes: false,
        allergies: ["Cần tây"],
      },
    };

    expect(payload.goal).toBe("DETOX");
    expect(payload.baseline.activityLevel).toBe("LIGHT");
    // Verify no sensitive fields exist
    expect((payload as any).phone).toBeUndefined();
    expect((payload as any).idCard).toBeUndefined();
  });
});
```

- [ ] **Step 3: Tạo `src/types/api.ts` chuẩn theo spec mục §4**

Create `src/types/api.ts`:
```typescript
export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp: string;
  path: string;
}

export type ActivityLevel = "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY_ACTIVE";
export type HealthGoal = "DETOX" | "WEIGHT_LOSS" | "BEAUTY_SKIN" | "DIGESTION";
export type ExperienceLevel = "BEGINNER" | "EXPERIENCED";

// Chỉ thu thập thông tin sinh hoạt và thể trạng cơ bản, không có dữ liệu định danh nhạy cảm
export interface Baseline {
  nickname?: string;
  age: number;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface Preferences {
  experienceLevel?: ExperienceLevel;
  canDrinkBitterOrEarthy?: boolean;
  durationDays?: 1 | 3 | 6;
}

export interface HealthRisks {
  hasStomachPain?: boolean;
  isPregnantOrNursing?: boolean;
  hasDiabetes?: boolean;
  allergies?: string[];
}

export interface ConsultationPayload {
  baseline: Baseline;
  goal: HealthGoal;
  preferences?: Preferences;
  risks?: HealthRisks;
}

export interface Drink {
  id: string;
  name: string;
  slug: string;
  description?: string;
  calories?: number;
  target_goal?: HealthGoal;
  is_detox_core?: boolean;
  image_url?: string;
  ingredients?: string[];
  category_id?: string;
  category_name?: string;
  time_slot?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  duration_days: number;
  description?: string;
}

export interface ConsultationResult {
  bmi: number;
  bmiCategory: string;
  dailyWaterMl: number;
  safetyAlerts: string[];
  recommendedPlan?: Plan;
  scheduleRatio: string;
  drinks: Drink[];
}
```

- [ ] **Step 4: Dọn dẹp mock data & Đảm bảo tất cả các trường dữ liệu đều có `?:` phòng ngừa undefined**

Cập nhật `src/data/drinks.ts`:

- Khai báo các trường mở rộng trong interface `Drink` dùng `?:` (`benefit?: string`, `level?: number`, `color?: "green" | "warm" | "soft"`, `categoryName?: string`, `description?: string`, `ingredients?: readonly string[]`, `isDetoxCore?: boolean`).
- Giữ lại đúng **1 món mẫu duy nhất** trong `INITIAL_DRINKS` (ví dụ: `Sinh Tố Xanh Healthy`) làm fallback an toàn khi API không phản hồi.

Cập nhật `src/data/plans.ts`:

- Đảm bảo các trường con của `Plan` và `PlanBottle` có `?:` (`slotName?: string`, `bottleType?: string`, `kcalRange?: string`, `tagline?: string`).
- Tinh giản danh sách mock data, chỉ giữ cấu trúc mẫu tối thiểu phục vụ fallback.

- [ ] **Step 5: Chạy test kiểm tra**

Run: `bun run test src/types/api.test.ts`
Expected: PASS

- [ ] **Step 6: Commit task 1**

```bash
git add package.json bun.lock src/types/api.ts src/types/api.test.ts src/data/drinks.ts src/data/plans.ts
git commit -m "feat(api): install dependencies, declare api types and clean mock data with optional fields"
```

---

### Task 2: Xây Dựng `apiClient` & Thiết Lập `QueryProvider`

**Files:**
- Create: `src/lib/api-client.ts`
- Create: `src/providers/query-provider.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/lib/api-client.test.ts`

**Interfaces:**
- Consumes: `ApiResponse<T>`, `ApiErrorResponse`
- Produces: `apiClient`, `<QueryProvider>`

- [ ] **Step 1: Viết test cho `apiClient`**

Create `src/lib/api-client.test.ts`:
```typescript
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { apiClient } from "./api-client";

describe("apiClient", () => {
  it("unwraps standard ApiResponse envelope automatically", async () => {
    const mockData = { id: "123", name: "Sinh tố Cần Tây" };
    vi.spyOn(axios.Axios.prototype, "request").mockResolvedValueOnce({
      data: {
        success: true,
        statusCode: 200,
        message: "OK",
        data: mockData,
        timestamp: "2026-10-15T00:00:00Z",
        path: "/api/drinks",
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    const result = await apiClient.get("/drinks");
    expect(result).toEqual(mockData);
  });

  it("extracts validation errors on 400", async () => {
    vi.spyOn(axios.Axios.prototype, "request").mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          success: false,
          statusCode: 400,
          message: "Dữ liệu không hợp lệ",
          errors: ["Độ tuổi tối thiểu là 15"],
          timestamp: "2026-10-15T00:00:00Z",
          path: "/api/consultation",
        },
      },
    });

    await expect(apiClient.post("/consultation", {})).rejects.toThrow("Độ tuổi tối thiểu là 15");
  });
});
```

- [ ] **Step 2: Viết code `src/lib/api-client.ts`**

Create `src/lib/api-client.ts`:
```typescript
import axios, { type AxiosError } from "axios";
import type { ApiResponse, ApiErrorResponse } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://detox-api-black.vercel.app/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === "object" && body.success === true && "data" in body) {
      return (body as ApiResponse<unknown>).data;
    }
    return body;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const errorData = error.response?.data;
    const message =
      errorData?.errors && errorData.errors.length > 0
        ? errorData.errors.join(", ")
        : errorData?.message || error.message || "Có lỗi kết nối, vui lòng thử lại";

    return Promise.reject(new Error(message));
  }
);
```

- [ ] **Step 3: Tạo `src/providers/query-provider.tsx` với cấu hình Retry & Cache**

Create `src/providers/query-provider.tsx`:
```typescript
"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 phút cache
            gcTime: 10 * 60 * 1000,   // 10 phút dọn cache
            retry: (failureCount, error) => {
              // Không retry lỗi validation 4xx
              if (error.message.includes("400") || error.message.includes("404")) {
                return false;
              }
              return failureCount < 2; // Retry tối đa 2 lần cho lỗi mạng/5xx
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000), // 1s, 2s
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

- [ ] **Step 4: Bọc `QueryProvider` vào `src/app/layout.tsx`**

Modify `src/app/layout.tsx` để thêm `<QueryProvider>` bao ngoài `children`.

- [ ] **Step 5: Chạy test kiểm tra**

Run: `bun run test src/lib/api-client.test.ts`
Expected: PASS

- [ ] **Step 6: Commit task 2**

```bash
git add src/lib/api-client.ts src/lib/api-client.test.ts src/providers/query-provider.tsx src/app/layout.tsx
git commit -m "feat(api): implement apiClient and configure QueryProvider with retry backoff"
```

---

### Task 3: Phân Hệ Thức Uống & Danh Mục Với Custom Hooks TanStack Query

**Files:**
- Create: `src/services/categories.service.ts`
- Modify: `src/services/drinks.service.ts`
- Create: `src/features/drinks/hooks/use-drinks-query.ts`
- Modify: `src/features/drinks/components/DrinkCatalog.tsx`
- Test: `src/services/drinks.service.test.ts`

**Interfaces:**
- Produces: `getCategories()`, `getDrinks(filters?)`, `useCategoriesQuery()`, `useDrinksQuery(filters)`

- [ ] **Step 1: Viết test cho `drinks.service`**

Create `src/services/drinks.service.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDrinks, getDrinkBySlug } from "./drinks.service";
import { apiClient } from "@/lib/api-client";
import { DRINKS_DATA } from "@/data/drinks";

describe("drinks.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns mapped drinks when API succeeds", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValueOnce([
      {
        id: "d1",
        name: "Sinh tố Cần Tây",
        slug: "sinh-to-can-tay",
        category_name: "Sinh tố xanh",
        calories: 130,
        ingredients: ["Cần tây", "Táo"],
        is_detox_core: true,
      },
    ]);

    const drinks = await getDrinks();
    expect(drinks[0].slug).toBe("sinh-to-can-tay");
    expect(drinks[0].color).toBe("green");
  });

  it("falls back to DRINKS_DATA when API fails", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(new Error("Network Error"));
    const drinks = await getDrinks();
    expect(drinks.length).toBe(DRINKS_DATA.length);
  });
});
```

- [ ] **Step 2: Viết `src/services/categories.service.ts` và `src/services/drinks.service.ts`**

Tạo `categories.service.ts` lấy danh mục từ `GET /api/categories`.
Cập nhật `drinks.service.ts` mapping dữ liệu API sang `Drink` UI model và tự động fallback về `DRINKS_DATA`.

- [ ] **Step 3: Tạo custom hook `useDrinksQuery` và `useCategoriesQuery`**

Create `src/features/drinks/hooks/use-drinks-query.ts`:
```typescript
import { useQuery } from "@tanstack/react-query";
import { getDrinks, type DrinkFilters } from "@/services/drinks.service";
import { getCategories } from "@/services/categories.service";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}

export function useDrinksQuery(filters?: DrinkFilters) {
  return useQuery({
    queryKey: ["drinks", filters],
    queryFn: () => getDrinks(filters),
  });
}
```

- [ ] **Step 4: Cập nhật `DrinkCatalog.tsx` sử dụng hooks TanStack Query**

Thay thế `useState` và fake `setTimeout` bằng `useCategoriesQuery()` và `useDrinksQuery()`. Khi chuyển tab, dữ liệu được tải từ cache 0ms.

- [ ] **Step 5: Chạy test kiểm tra**

Run: `bun run test src/services/drinks.service.test.ts`
Expected: PASS

- [ ] **Step 6: Commit task 3**

```bash
git add src/services/categories.service.ts src/services/drinks.service.ts src/services/drinks.service.test.ts src/features/drinks/hooks/use-drinks-query.ts src/features/drinks/components/DrinkCatalog.tsx
git commit -m "feat(drinks): integrate categories and drinks with tanstack query hooks"
```

---

### Task 4: Phân Hệ Lộ Trình (Plans Service & Query Hook)

**Files:**
- Modify: `src/services/plans.service.ts`
- Create: `src/features/plans/hooks/use-plans-query.ts`
- Create: `src/services/plans.service.test.ts`

**Interfaces:**
- Produces: `getPlans()`, `getPlanById(id)`, `usePlansQuery()`, `usePlanDetailQuery(id)`

- [ ] **Step 1: Viết test cho `plans.service`**

Create `src/services/plans.service.test.ts` kiểm tra cả luồng fetch thành công và fallback `PLANS_DATA`.

- [ ] **Step 2: Cập nhật `src/services/plans.service.ts`**

Kết nối `GET /api/plans` và `GET /api/plans/:slug`, mapping danh sách ngày và chai uống, fallback về `PLANS_DATA`.

- [ ] **Step 3: Tạo hook `src/features/plans/hooks/use-plans-query.ts`**

- [ ] **Step 4: Chạy test kiểm tra**

Run: `bun run test src/services/plans.service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit task 4**

```bash
git add src/services/plans.service.ts src/services/plans.service.test.ts src/features/plans/hooks/use-plans-query.ts
git commit -m "feat(plans): integrate plans endpoint with mapping and query hooks"
```

---

### Task 5: Phân Hệ Tư Vấn & Khảo Sát Với `useMutation` (Consultation Flow)

**Files:**
- Create: `src/services/consultation.service.ts`
- Create: `src/features/consultation/hooks/use-consultation-mutation.ts`
- Modify: `src/features/consultation/components/ResultView.tsx`
- Create: `src/services/consultation.service.test.ts`

**Interfaces:**
- Produces: `submitConsultation(payload)`, `useConsultationMutation()`

- [ ] **Step 1: Viết test cho `consultation.service`**

Create `src/services/consultation.service.test.ts` kiểm tra submit thành công và fallback an toàn khi lỗi mạng.

- [ ] **Step 2: Viết `src/services/consultation.service.ts`**

Kết nối `POST /api/consultation`.

- [ ] **Step 3: Tạo hook `useConsultationMutation`**

Create `src/features/consultation/hooks/use-consultation-mutation.ts`:
```typescript
import { useMutation } from "@tanstack/react-query";
import { submitConsultation } from "@/services/consultation.service";
import type { ConsultationPayload } from "@/types/api";

export function useConsultationMutation() {
  return useMutation({
    mutationFn: (payload: ConsultationPayload) => submitConsultation(payload),
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 3000),
  });
}
```

- [ ] **Step 4: Cập nhật `ResultView.tsx`**

- Gọi `useConsultationMutation()` khi load trang kết quả.
- Hiển thị skeleton loading trong khi `isPending`.
- Nếu có dữ liệu từ BE, render chỉ số BMI, lượng nước `dailyWaterMl`, `safetyAlerts`, lộ trình và thức uống do BE tính toán.
- Nếu `isError` hoặc kết quả `null`, tự động hiển thị kết quả từ thuật toán client (`recommendPlan`) và thông báo nhẹ *"Đang hiển thị chế độ tính toán ngoại tuyến"*.

- [ ] **Step 5: Chạy test kiểm tra**

Run: `bun run test src/services/consultation.service.test.ts`
Expected: PASS

- [ ] **Step 6: Commit task 5**

```bash
git add src/services/consultation.service.ts src/features/consultation/hooks/use-consultation-mutation.ts src/features/consultation/components/ResultView.tsx src/services/consultation.service.test.ts
git commit -m "feat(consultation): integrate consultation mutation with automatic client fallback"
```

---

### Task 6: Kiểm Tra Sức Khỏe API, Sửa Test Cũ & Nghiệm Thu Toàn Bộ

**Files:**
- Create: `src/services/health.service.ts`
- Modify: Sửa các test cũ bị lệch text tại `src/data/articles.test.ts`, `DrinkDetail.test.tsx`, `DrinkCatalog.test.tsx`

- [ ] **Step 1: Tạo `src/services/health.service.ts` gọi `GET /api/health`**
- [ ] **Step 2: Sửa các assertion test cũ trong test suite**
- [ ] **Step 3: Chạy toàn bộ kiểm thử**

Run:
```bash
bun run typecheck
bun run lint
bun run test
```
Expected: All pass 100%.

- [ ] **Step 4: Commit task 6**

```bash
git add src/services/health.service.ts src/data/articles.test.ts src/features/drinks/components/*.test.tsx
git commit -m "chore: add health service and fix all test suite assertions"
```

---

## Self-Review Checklist

- [x] **Spec coverage**: Hỗ trợ đầy đủ các endpoints: Categories (§3.2), Drinks (§3.2), Plans (§3.3), Consultation (§3.1), Health (§3.4).
- [x] **Privacy Rule**: Đã làm rõ và cô lập tuyệt đối, chỉ thu thập thông tin sinh hoạt và thể trạng cơ bản theo phiên; cấm thu thập CCCD, SĐT, Email hay dữ liệu tài chính.
- [x] **TanStack Query & Axios**: Đã tích hợp đầy đủ QueryProvider, caching (staleTime 5m), và retry exponential backoff 2 lần.
- [x] **Fallback Protection**: Mọi luồng đều có lớp phòng thủ cuối cùng về dữ liệu cục bộ, đảm bảo tính liên tục của trải nghiệm người dùng.
