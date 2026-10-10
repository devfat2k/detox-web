import { DRINKS_DATA, type Drink } from "@/data/drinks";

/**
 * Service truy xuất dữ liệu thức uống.
 * Trả về Promise để tương thích với kiến trúc chuyển đổi sang NestJS API sau này.
 */
export async function getDrinks(): Promise<readonly Drink[]> {
  return Promise.resolve(DRINKS_DATA);
}

export async function getDrinkBySlug(slug: string): Promise<Drink | null> {
  const drink = DRINKS_DATA.find((d) => d.slug === slug);
  return Promise.resolve(drink ?? null);
}
