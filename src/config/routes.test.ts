import { describe, it, expect } from "vitest";
import { ROUTES } from "./routes";

describe("ROUTES config", () => {
  it("defines all primary route paths starting with slash", () => {
    expect(ROUTES.HOME).toBe("/");
    expect(ROUTES.CONSULTATION).toBe("/consultation");
    expect(ROUTES.PLANS).toBe("/plans");
    expect(ROUTES.DRINKS).toBe("/drinks");
    expect(ROUTES.ARTICLES).toBe("/articles");
    expect(ROUTES.POLICY).toBe("/policy");
  });

  it("generates correct dynamic detail routes", () => {
    expect(ROUTES.PLAN_DETAIL("1-day")).toBe("/plans/1-day");
    expect(ROUTES.PLAN_DETAIL("3-day")).toBe("/plans/3-day");
    expect(ROUTES.PLAN_DETAIL("6-day")).toBe("/plans/6-day");
    expect(ROUTES.DRINK_DETAIL("ep-tao-can-tay")).toBe("/drinks/ep-tao-can-tay");
    expect(ROUTES.ARTICLE_DETAIL("meo-detox-an-toan")).toBe("/articles/meo-detox-an-toan");
  });

  it("defines consultation sub-routes correctly", () => {
    expect(ROUTES.CONSULTATION_BODY).toBe("/consultation/body");
    expect(ROUTES.CONSULTATION_GOALS).toBe("/consultation/goals");
    expect(ROUTES.CONSULTATION_EXPERIENCE).toBe("/consultation/experience");
    expect(ROUTES.CONSULTATION_RESULT).toBe("/consultation/result");
    expect(ROUTES.CONSULTATION_INELIGIBLE).toBe("/consultation/ineligible");
  });
});
