import type { MetadataRoute } from "next";
import { PLANS_DATA } from "@/data/plans";
import { DRINKS_DATA } from "@/data/drinks";
import { ARTICLES_DATA } from "@/data/articles";
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
    routes.articles(),
    routes.policy(),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const planEntries: MetadataRoute.Sitemap = PLANS_DATA.map((plan) => ({
    url: `${BASE_URL}${routes.plan(plan.id)}`,
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

  const articleEntries: MetadataRoute.Sitemap = ARTICLES_DATA.map((article) => ({
    url: `${BASE_URL}${routes.article(article.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...planEntries, ...drinkEntries, ...articleEntries];
}
