import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDrinkBySlug, getDrinks } from "@/services/drinks.service";
import { DrinkDetail } from "@/features/drinks";
import { DRINKS_DATA } from "@/data/drinks";

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

async function DrinkDetailContent({ slug }: { slug: string }) {
  const drink = await getDrinkBySlug(slug);
  if (!drink) {
    notFound();
  }

  return <DrinkDetail drink={drink} />;
}

export default async function DrinkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallbackDrink = DRINKS_DATA.find((d) => d.slug === slug) ?? null;

  return (
    <main>
      <Suspense fallback={fallbackDrink ? <DrinkDetail drink={fallbackDrink} /> : null}>
        <DrinkDetailContent slug={slug} />
      </Suspense>
    </main>
  );
}
