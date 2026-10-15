"use client";

import { useQuery } from "@tanstack/react-query";
import { getDrinks, getDrinkBySlug, type DrinkFilters } from "@/services/drinks.service";
import { getCategories, FALLBACK_CATEGORIES } from "@/services/categories.service";
import { type Drink } from "@/data/drinks";
import type { Category } from "@/types/api";

export function useCategoriesQuery() {
  return useQuery<readonly Category[]>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    placeholderData: FALLBACK_CATEGORIES,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDrinksQuery(filters?: DrinkFilters) {
  return useQuery<readonly Drink[]>({
    queryKey: ["drinks", filters],
    queryFn: () => getDrinks(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDrinkDetailQuery(slug: string) {
  return useQuery<Drink | null>({
    queryKey: ["drinks", slug],
    queryFn: () => getDrinkBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}
