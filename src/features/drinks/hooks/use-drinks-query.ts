"use client";

import { useQuery } from "@tanstack/react-query";
import { getDrinks, getDrinkBySlug, type DrinkFilters } from "@/services/drinks.service";
import { getCategories } from "@/services/categories.service";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}

export function useDrinksQuery(filters?: DrinkFilters) {
  return useQuery({
    queryKey: ["drinks", filters],
    queryFn: () => getDrinks(filters),
  });
}

export function useDrinkDetailQuery(slug: string) {
  return useQuery({
    queryKey: ["drinks", slug],
    queryFn: () => getDrinkBySlug(slug),
    enabled: Boolean(slug),
  });
}
