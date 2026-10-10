import type { Metadata } from "next";
import { getDrinks } from "@/services/drinks.service";
import { DrinkList } from "@/features/drinks";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_DRINKS_TITLE,
  description: FIXED_LABELS.PAGE_DRINKS_DESC,
};

export default async function DrinksPage() {
  const drinks = await getDrinks();

  return (
    <main>
      <DrinkList drinks={drinks} />
    </main>
  );
}
