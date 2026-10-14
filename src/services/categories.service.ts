import { apiClient } from "@/lib/api-client";
import type { Category } from "@/types/api";

export const FALLBACK_CATEGORIES: readonly Category[] = [
  { id: "all", name: "Tất cả", slug: "all" },
  { id: "smoothie_green", name: "Sinh tố xanh", slug: "sinh-to-xanh" },
  { id: "juice", name: "Nước ép tươi & mix", slug: "nuoc-ep-nguyen-chat" },
  { id: "nut_milk_tea", name: "Sữa hạt & Trà", slug: "sua-hat-tra" },
];

export async function getCategories(): Promise<readonly Category[]> {
  try {
    const data = await apiClient.get<unknown, Category[]>("/categories");
    if (Array.isArray(data) && data.length > 0) {
      return [{ id: "all", name: "Tất cả", slug: "all" }, ...data];
    }
    return FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}
