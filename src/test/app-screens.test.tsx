import React from "react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Newsreader: () => ({
    variable: "--font-newsreader",
    className: "font-newsreader",
  }),
  Bricolage_Grotesque: () => ({
    variable: "--font-bricolage",
    className: "font-bricolage",
  }),
  Be_Vietnam_Pro: () => ({
    variable: "--font-be-vietnam-pro",
    className: "font-be-vietnam-pro",
  }),
}));

import { renderToStaticMarkup } from "react-dom/server";
import NotFound from "@/app/not-found";
import ErrorPage from "@/app/error";
import GlobalError from "@/app/global-error";
import Loading from "@/app/loading";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";

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
import ConsultationResultPage from "@/app/(site)/consultation/result/page";
import ConsultationIneligiblePage from "@/app/(site)/consultation/ineligible/page";
import PlansPage from "@/app/(site)/plans/page";
import PlanDetailPage from "@/app/(site)/plans/[planId]/page";
import DrinksPage from "@/app/(site)/drinks/page";
import DrinkDetailPage from "@/app/(site)/drinks/[slug]/page";
import ArticlesPage from "@/app/(site)/articles/page";
import ArticleDetailPage from "@/app/(site)/articles/[slug]/page";
import PolicyPage from "@/app/(site)/policy/page";

describe("Scaffolded Route Screens Smoke Test", () => {
  it("renders consultation step 1 page", () => {
    const html = renderToStaticMarkup(<ConsultationStep1Page />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP1_TITLE);
  });

  it("renders consultation body page", () => {
    const html = renderToStaticMarkup(<ConsultationBodyPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP2_TITLE);
  });

  it("renders consultation goals page", () => {
    const html = renderToStaticMarkup(<ConsultationGoalsPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP3_TITLE);
  });

  it("renders consultation experience page", () => {
    const html = renderToStaticMarkup(<ConsultationExperiencePage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_STEP4_TITLE);
  });

  it("renders consultation result page", () => {
    const html = renderToStaticMarkup(<ConsultationResultPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_RESULT_TITLE);
  });

  it("renders consultation ineligible page", () => {
    const html = renderToStaticMarkup(<ConsultationIneligiblePage />);
    expect(html).toContain(FIXED_LABELS.PAGE_CONSULTATION_INELIGIBLE_TITLE);
  });

  it("renders plans list and detail pages", async () => {
    const listHtml = renderToStaticMarkup(await PlansPage());
    expect(listHtml).toContain(FIXED_LABELS.PAGE_PLANS_TITLE);

    const detailHtml = renderToStaticMarkup(
      await PlanDetailPage({ params: Promise.resolve({ planId: "1-day" }) })
    );
    expect(detailHtml).toContain("Liệu trình Khởi đầu 1 ngày");
  });

  it("renders drinks list and detail pages", async () => {
    const listHtml = renderToStaticMarkup(await DrinksPage());
    expect(listHtml).toContain(FIXED_LABELS.PAGE_DRINKS_TITLE);

    const detailHtml = renderToStaticMarkup(
      await DrinkDetailPage({ params: Promise.resolve({ slug: "ep-can-tay-tao" }) })
    );
    expect(detailHtml).toContain("Xanh Tươi Cần Tây Táo");
  });

  it("renders articles list and detail pages", async () => {
    const listHtml = renderToStaticMarkup(await ArticlesPage());
    expect(listHtml).toContain(FIXED_LABELS.PAGE_ARTICLES_TITLE);

    const detailHtml = renderToStaticMarkup(
      await ArticleDetailPage({
        params: Promise.resolve({ slug: "huong-dan-chuan-bi-truoc-khi-detox" }),
      })
    );
    expect(detailHtml).toContain("Hướng dẫn chuẩn bị cơ thể 2 ngày trước khi detox");
  });

  it("renders policy page", () => {
    const html = renderToStaticMarkup(<PolicyPage />);
    expect(html).toContain(FIXED_LABELS.PAGE_POLICY_TITLE);
    expect(html).toContain(FIXED_LABELS.MEDICAL_DISCLAIMER);
  });
});
