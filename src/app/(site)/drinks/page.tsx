import type { Metadata } from "next";
import { DrinkCatalog } from "@/features/drinks";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_DRINKS_TITLE,
  description: FIXED_LABELS.PAGE_DRINKS_DESC,
};

export default function DrinksPage() {
  return (
    <main>
      <DrinkCatalog />
    </main>
  );
}
