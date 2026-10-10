import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDrinkBySlug, getDrinks } from "@/services/drinks.service";
import { DrinkDetail } from "@/features/drinks";

export async function generateStaticParams() {
  const drinks = await getDrinks();
  return drinks.map((drink) => ({ slug: drink.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const drink = await getDrinkBySlug(slug);
  if (!drink) {
    return {};
  }
  return {
    title: drink.name,
    description: drink.description,
  };
}

export default async function DrinkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drink = await getDrinkBySlug(slug);

  if (!drink) {
    notFound();
  }

  return (
    <main>
      <DrinkDetail drink={drink} />
    </main>
  );
}
