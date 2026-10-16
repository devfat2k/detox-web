import { describe, it, expect } from "vitest";
import { ROUTES, routes } from "./routes";

describe("ROUTES config", () => {
  it("defines all primary route paths starting with slash", () => {
    expect(ROUTES.HOME).toBe("/");
    expect(ROUTES.CONSULTATION).toBe("/consultation");
    expect(ROUTES.PLANS).toBe("/plans");
    expect(ROUTES.PRICING).toBe("/pricing");
    expect(ROUTES.DRINKS).toBe("/drinks");
    expect(ROUTES.ABOUT).toBe("/about");
  });

  it("generates correct dynamic detail routes", () => {
    expect(ROUTES.PLAN_DETAIL("1-day")).toBe("/plans/1-day");
    expect(ROUTES.PLAN_DETAIL("3-day")).toBe("/plans/3-day");
    expect(ROUTES.PLAN_DETAIL("6-day")).toBe("/plans/6-day");
    expect(ROUTES.DRINK_DETAIL("ep-tao-can-tay")).toBe("/drinks/ep-tao-can-tay");
  });

  it("defines consultation sub-routes correctly", () => {
    expect(ROUTES.CONSULTATION_BODY).toBe("/consultation/body");
    expect(ROUTES.CONSULTATION_GOALS).toBe("/consultation/goals");
    expect(ROUTES.CONSULTATION_EXPERIENCE).toBe("/consultation/experience");
    expect(ROUTES.CONSULTATION_SAFETY).toBe("/consultation/safety");
    expect(ROUTES.CONSULTATION_RESULT).toBe("/consultation/result");
    expect(ROUTES.CONSULTATION_INELIGIBLE).toBe("/consultation/ineligible");
  });

  it("provides routes helper functions matching route constants", () => {
    expect(routes.home()).toBe("/");
    expect(routes.consultation()).toBe("/consultation");
    expect(routes.consultationBody()).toBe("/consultation/body");
    expect(routes.consultationGoals()).toBe("/consultation/goals");
    expect(routes.consultationExperience()).toBe("/consultation/experience");
    expect(routes.consultationSafety()).toBe("/consultation/safety");
    expect(routes.consultationResult()).toBe("/consultation/result");
    expect(routes.consultationIneligible()).toBe("/consultation/ineligible");
    expect(routes.plans()).toBe("/plans");
    expect(routes.pricing()).toBe("/pricing");
    expect(routes.plan("3-day")).toBe("/plans/3-day");
    expect(routes.drinks()).toBe("/drinks");
    expect(routes.drink("cam-ca-rot")).toBe("/drinks/cam-ca-rot");
    expect(routes.about()).toBe("/about");
  });
});
