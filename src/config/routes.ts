/**
 * Hằng số định tuyến (Routes) 100% tiếng Anh theo đặc tả spec v1.2 (§3) và CLAUDE.md.
 */
export const ROUTES = {
  HOME: "/",
  CONSULTATION: "/consultation",
  CONSULTATION_BODY: "/consultation/body",
  CONSULTATION_GOALS: "/consultation/goals",
  CONSULTATION_EXPERIENCE: "/consultation/experience",
  CONSULTATION_RESULT: "/consultation/result",
  CONSULTATION_INELIGIBLE: "/consultation/ineligible",
  PLANS: "/plans",
  PLAN_DETAIL: (slug: "1-day" | "3-day" | "6-day" | string) => `/plans/${slug}`,
  DRINKS: "/drinks",
  DRINK_DETAIL: (slug: string) => `/drinks/${slug}`,
  ARTICLES: "/articles",
  ARTICLE_DETAIL: (slug: string) => `/articles/${slug}`,
  POLICY: "/policy",
} as const;

export type RoutePath = typeof ROUTES[keyof Omit<typeof ROUTES, "PLAN_DETAIL" | "DRINK_DETAIL" | "ARTICLE_DETAIL">];
