import React from "react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Be_Vietnam_Pro: () => ({
    variable: "--font-be-vietnam-pro",
    className: "font-be-vietnam-pro",
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/consultation",
  useSearchParams: () => new URLSearchParams(),
}));

import { renderToStaticMarkup } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/app/not-found";
import ErrorPage from "@/app/error";
import GlobalError from "@/app/global-error";
import Loading from "@/app/loading";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { DRINKS_DATA } from "@/data/drinks";
import { PLANS_DATA } from "@/data/plans";
import { apiClient } from "@/lib/api-client";

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return renderToStaticMarkup(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("System Screens (Stage C)", () => {
  describe("NotFound", () => {
    it("renders brand name, 404 title, description, and back-to-home button", () => {
      const html = renderToStaticMarkup(<NotFound />);
      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(FIXED_LABELS.NOT_FOUND_TITLE);
      expect(html).toContain(FIXED_LABELS.NOT_FOUND_DESCRIPTION);
      expect(html).toContain(FIXED_LABELS.ACTION_BACK_TO_HOME);
      expect(html).toContain('href="/"');
    });
  });

  describe("ErrorPage", () => {
    it("renders brand name, error title, description, retry button, and does not leak raw error details", () => {
      const resetFn = vi.fn();
      const rawError = new Error("Sensitive internal error details");
      const html = renderToStaticMarkup(
        <ErrorPage error={rawError} reset={resetFn} />
      );

      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(FIXED_LABELS.ERROR_TITLE);
      expect(html).toContain(FIXED_LABELS.ERROR_DESCRIPTION);
      expect(html).toContain(FIXED_LABELS.ACTION_RETRY);
      expect(html).toContain(FIXED_LABELS.ACTION_BACK_TO_HOME);
      expect(html).not.toContain("Sensitive internal error details");
    });
  });

  describe("GlobalError", () => {
    it("renders html, body, brand name, error title, and retry button", () => {
      const resetFn = vi.fn();
      const html = renderToStaticMarkup(
        <GlobalError error={new Error("Root layout crash")} reset={resetFn} />
      );

      expect(html).toContain('<html lang="vi"');
      expect(html).toContain("<body");
      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(FIXED_LABELS.ERROR_TITLE);
      expect(html).toContain(FIXED_LABELS.ACTION_RETRY);
    });
  });

  describe("Loading", () => {
    it("renders status role, sr-only loading text, and static skeleton placeholders", () => {
      const html = renderToStaticMarkup(<Loading />);

      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain('role="status"');
      expect(html).toContain("sr-only");
      expect(html).toContain(FIXED_LABELS.LOADING_TEXT);
      expect(html).toContain("bg-accent-soft/60");
    });
  });
});

import ConsultationStep1Page from "@/app/(site)/consultation/page";
import ConsultationBodyPage from "@/app/(site)/consultation/body/page";
import ConsultationGoalsPage from "@/app/(site)/consultation/goals/page";
import ConsultationExperiencePage from "@/app/(site)/consultation/experience/page";
import ConsultationSafetyPage from "@/app/(site)/consultation/safety/page";
import ConsultationResultPage from "@/app/(site)/consultation/result/page";
import ConsultationIneligiblePage from "@/app/(site)/consultation/ineligible/page";
import PlansPage from "@/app/(site)/plans/page";
import PlanDetailPage from "@/app/(site)/plans/[planId]/page";
import DrinksPage from "@/app/(site)/drinks/page";
import DrinkDetailPage from "@/app/(site)/drinks/[slug]/page";
import ArticlesPage from "@/app/(site)/articles/page";
import ArticleDetailPage from "@/app/(site)/articles/[slug]/page";
import PolicyPage from "@/app/(site)/policy/page";
import HomePage from "@/app/(site)/page";

describe("HomePage Screen", () => {
  it("renders hero headline, action buttons, notification widget, 3 stages, honest math, 2 drinks, 1 article, and notice", () => {
    const html = renderToStaticMarkup(<HomePage />);

    // Hero (Hum-07 2-column layout without stage ticker or uppercase micro-trust bar)
    expect(html).not.toContain("01 Khởi đầu");
    expect(html).not.toContain("100% ÉP TƯƠI");
    expect(html).toContain("Nước ép tươi, chọn");
    expect(html).toContain("lộ trình phù hợp");
    expect(html).toContain(FIXED_LABELS.ACTION_VIEW_MY_PLAN);
    expect(html).toContain("Xem 3 giai đoạn");
    expect(html).toContain("Thực đơn tham khảo mẫu");

    // Hum-07 Stage Progression & 3 Plans
    expect(html).not.toContain("Giai đoạn 1.0");
    expect(html).not.toContain("Giai đoạn 2.0");
    expect(html).not.toContain("Giai đoạn 3.0");
    expect(html).toContain("01");
    expect(html).toContain("02");
    expect(html).toContain("03");
    expect(html).toContain("Tiến trình thích ứng");

    // Hum-07 Honest Math
    expect(html).toContain("Thực tế &amp; Nguyên bản.");
    expect(html).toContain("100%");
    expect(html).toContain("0");

    // Featured drink
    expect(html).toContain(DRINKS_DATA[0].name);

    // 1 Article & Notice
    expect(html).toContain("Hiểu đúng về cơ chế tự thải độc của gan và thận");
    expect(html).toContain(FIXED_LABELS.ACTION_MESSAGE_THREADS);
  });
});

describe("Scaffolded Route Screens Smoke Test", () => {
  it("renders consultation step 1 page", () => {
    const html = renderToStaticMarkup(<ConsultationStep1Page />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP1_TITLE);
  });

  it("renders consultation body page", () => {
    const html = renderToStaticMarkup(<ConsultationBodyPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP1_TITLE);
  });

  it("renders consultation goals page", () => {
    const html = renderToStaticMarkup(<ConsultationGoalsPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP2_TITLE);
  });

  it("renders consultation experience page", () => {
    const html = renderToStaticMarkup(<ConsultationExperiencePage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP3_TITLE);
  });

  it("renders consultation safety page", () => {
    const html = renderToStaticMarkup(<ConsultationSafetyPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP4_TITLE);
  });

  it("renders consultation result page", () => {
    const html = renderWithClient(<ConsultationResultPage />);
    expect(html).toBeDefined();
    expect(html).toContain("Đang phân tích");
  });

  it("renders consultation ineligible page", () => {
    const html = renderToStaticMarkup(<ConsultationIneligiblePage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_INELIGIBLE_TITLE);
  });

  it("renders plans list and detail pages", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValue([
      {
        id: "1-day",
        title: "Combo Detox 1 Ngày",
        duration_days: 1,
        total_bottles: 5,
        description: "Thanh lọc nhẹ nhàng",
      },
    ]);

    const listHtml = renderToStaticMarkup(await PlansPage());
    expect(listHtml).toContain(FIXED_LABELS.PAGE_PLANS_TITLE);

    const detailHtml = renderToStaticMarkup(
      await PlanDetailPage({ params: Promise.resolve({ planId: "1-day" }) })
    );
    expect(detailHtml).toContain("Combo Detox 1 Ngày");
  });

  it("renders drinks list and detail pages", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValue([]);

    const listHtml = renderWithClient(await DrinksPage());
    expect(listHtml).toContain(FIXED_LABELS.PAGE_DRINKS_TITLE);

    const detailHtml = renderToStaticMarkup(
      await DrinkDetailPage({ params: Promise.resolve({ slug: DRINKS_DATA[0].slug }) })
    );
    expect(detailHtml).toContain(DRINKS_DATA[0].name);
  });

  it("renders articles list and detail pages without construction notices", async () => {
    const listHtml = renderToStaticMarkup(await ArticlesPage());
    expect(listHtml).toContain(FIXED_LABELS.PAGE_ARTICLES_TITLE);
    expect(listHtml).toContain("NGUỒN Y KHOA KIỂM CHỨNG");
    expect(listHtml).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);

    const detailHtml = renderToStaticMarkup(
      await ArticleDetailPage({
        params: Promise.resolve({ slug: "huong-dan-chuan-bi-truoc-khi-detox" }),
      })
    );
    expect(detailHtml).toContain("Hướng dẫn chuẩn bị cơ thể 2 ngày trước khi detox");
    expect(detailHtml).toContain("Nguồn tài liệu tham khảo &amp; Kiểm chứng khoa học");
    expect(detailHtml).toContain("Mayo Clinic");
    expect(detailHtml).not.toContain(FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE);
  });

  it("renders policy page", () => {
    const html = renderToStaticMarkup(<PolicyPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_POLICY_TITLE);
    expect(html).toContain(FIXED_LABELS.MEDICAL_DISCLAIMER);
  });
});
