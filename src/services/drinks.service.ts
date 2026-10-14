import { apiClient } from "@/lib/api-client";
import { DRINKS_DATA, type Drink as UIDrink, type DrinkCategory } from "@/data/drinks";
import type { Drink as ApiDrink } from "@/types/api";

function mapApiDrinkToUIDrink(apiDrink: ApiDrink): UIDrink {
  const isJuice =
    apiDrink.category_name?.toLowerCase().includes("ép") ||
    apiDrink.slug.includes("ep") ||
    apiDrink.slug.includes("juice");
  const isNutMilk =
    apiDrink.category_name?.toLowerCase().includes("sữa") ||
    apiDrink.category_name?.toLowerCase().includes("trà") ||
    apiDrink.slug.includes("sua") ||
    apiDrink.slug.includes("tra");
  const category: DrinkCategory = isNutMilk ? "nut_milk_tea" : isJuice ? "juice" : "smoothie_green";

  const isGreen =
    category === "smoothie_green" ||
    apiDrink.slug.includes("can-tay") ||
    apiDrink.slug.includes("kale") ||
    apiDrink.slug.includes("xanh");
  const color: "green" | "warm" | "soft" = isGreen
    ? "green"
    : category === "nut_milk_tea"
      ? "soft"
      : "warm";

  return {
    id: apiDrink.id,
    slug: apiDrink.slug,
    name: apiDrink.name,
    category,
    categoryName:
      apiDrink.category_name ||
      (category === "smoothie_green"
        ? "Sinh tố xanh"
        : category === "juice"
          ? "Nước ép tươi & mix"
          : "Sữa hạt & Trà"),
    description: apiDrink.description || "Công thức nước ép dinh dưỡng tự nhiên",
    ingredients: apiDrink.ingredients || [],
    benefit: apiDrink.description || "Hỗ trợ thanh lọc và tái tạo năng lượng nhẹ nhàng",
    color,
    level: 80,
    isDetoxCore: apiDrink.is_detox_core ?? false,
    calories: apiDrink.calories,
    imageUrl: apiDrink.image_url,
  };
}

export interface DrinkFilters {
  categoryId?: string;
  targetGoal?: string;
  isDetoxCore?: boolean;
}

export async function getDrinks(filters?: DrinkFilters): Promise<readonly UIDrink[]> {
  try {
    const params: Record<string, string | boolean> = {};
    if (filters?.categoryId && filters.categoryId !== "all") {
      params.category_id = filters.categoryId;
    }
    if (filters?.targetGoal) {
      params.target_goal = filters.targetGoal;
    }
    if (filters?.isDetoxCore !== undefined) {
      params.is_detox_core = filters.isDetoxCore;
    }

    const apiDrinks = await apiClient.get<unknown, ApiDrink[]>("/drinks", { params });
    if (Array.isArray(apiDrinks) && apiDrinks.length > 0) {
      return apiDrinks.map(mapApiDrinkToUIDrink);
    }
    return DRINKS_DATA;
  } catch {
    return DRINKS_DATA;
  }
}

export async function getDrinkBySlug(slug: string): Promise<UIDrink | null> {
  try {
    const apiDrink = await apiClient.get<unknown, ApiDrink>(`/drinks/${slug}`);
    if (apiDrink && apiDrink.slug) {
      return mapApiDrinkToUIDrink(apiDrink);
    }
  } catch {
    // fallback
  }
  const fallback = DRINKS_DATA.find((d) => d.slug === slug);
  return fallback ?? null;
}
