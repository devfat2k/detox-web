import type { MetadataRoute } from "next";
import { VALID_PLAN_IDS } from "@/data/plans";
import { DRINKS_DATA } from "@/data/drinks";
import { routes } from "@/config/routes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://epxanhchualanh.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    routes.home(),
    routes.consultation(),
    routes.consultationBody(),
    routes.consultationGoals(),
    routes.consultationExperience(),
    routes.consultationSafety(),
    routes.plans(),
    routes.drinks(),
    routes.about(),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const planEntries: MetadataRoute.Sitemap = VALID_PLAN_IDS.map((planId) => ({
    url: `${BASE_URL}${routes.plan(planId)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const drinkEntries: MetadataRoute.Sitemap = DRINKS_DATA.map((drink) => ({
    url: `${BASE_URL}${routes.drink(drink.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...planEntries, ...drinkEntries];
}
