import type { Route } from "next";

/**
 * Hằng số định tuyến (Routes) 100% tiếng Anh theo đặc tả spec v1.2 (§3) và CLAUDE.md.
 */
export const ROUTES = {
  HOME: "/" as Route,
  CONSULTATION: "/consultation" as Route,
  CONSULTATION_BODY: "/consultation/body" as Route,
  CONSULTATION_GOALS: "/consultation/goals" as Route,
  CONSULTATION_EXPERIENCE: "/consultation/experience" as Route,
  CONSULTATION_SAFETY: "/consultation/safety" as Route,
  CONSULTATION_RESULT: "/consultation/result" as Route,
  CONSULTATION_INELIGIBLE: "/consultation/ineligible" as Route,
  PLANS: "/plans" as Route,
  PLAN_DETAIL: (slug: "1-day" | "3-day" | "6-day" | string) => `/plans/${slug}` as Route,
  PRICING: "/pricing" as Route,
  DRINKS: "/drinks" as Route,
  DRINK_DETAIL: (slug: string) => `/drinks/${slug}` as Route,
  ARTICLES: "/articles" as Route,
  ARTICLE_DETAIL: (slug: string) => `/articles/${slug}` as Route,
  POLICY: "/policy" as Route,
  ABOUT: "/about" as Route,
} as const;

export type RoutePath = typeof ROUTES[keyof Omit<typeof ROUTES, "PLAN_DETAIL" | "DRINK_DETAIL" | "ARTICLE_DETAIL">];

/**
 * Trình hỗ trợ tạo đường dẫn hàm tiện ích.
 * Cấm hardcode chuỗi URL trong các component.
 */
export const routes = {
  home: () => ROUTES.HOME,
  consultation: () => ROUTES.CONSULTATION,
  consultationBody: () => ROUTES.CONSULTATION_BODY,
  consultationGoals: () => ROUTES.CONSULTATION_GOALS,
  consultationExperience: () => ROUTES.CONSULTATION_EXPERIENCE,
  consultationSafety: () => ROUTES.CONSULTATION_SAFETY,
  consultationResult: () => ROUTES.CONSULTATION_RESULT,
  consultationIneligible: () => ROUTES.CONSULTATION_INELIGIBLE,
  plans: () => ROUTES.PLANS,
  pricing: () => ROUTES.PRICING,
  plan: (planId: "1-day" | "3-day" | "6-day" | string) => ROUTES.PLAN_DETAIL(planId),
  drinks: () => ROUTES.DRINKS,
  drink: (slug: string) => ROUTES.DRINK_DETAIL(slug),
  articles: () => ROUTES.ARTICLES,
  article: (slug: string) => ROUTES.ARTICLE_DETAIL(slug),
  policy: () => ROUTES.POLICY,
  about: () => ROUTES.ABOUT,
} as const;
