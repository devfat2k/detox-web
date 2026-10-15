"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section, Heading, Skeleton } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { type Drink, DRINKS_DATA } from "@/data/drinks";
import { useDrinksQuery } from "@/features/drinks/hooks/use-drinks-query";
import { DrinkCard } from "@/features/drinks/components/DrinkCard";

export interface HomeFeaturedDrinksSectionProps {
  readonly drinks?: readonly Drink[];
}

export function HomeFeaturedDrinksSection({
  drinks: propDrinks,
}: HomeFeaturedDrinksSectionProps) {
  const { data: apiDrinks, isLoading } = useDrinksQuery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sourceDrinks =
    apiDrinks && apiDrinks.length > 0
      ? apiDrinks
      : propDrinks && propDrinks.length > 0
        ? propDrinks
        : DRINKS_DATA;

  const drinks = sourceDrinks.slice(0, 5);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Section spacing="md" className="border-b border-border">
      <Container className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1">
            <Heading
              level={2}
              size="2xl"
              className="font-semibold text-xl sm:text-2xl text-text tracking-tight"
            >
              Thức uống từ nông sản tươi
            </Heading>
            <p className="text-sm text-text-muted font-body">
              Nước ép nguyên chất không thêm đường cát hay phụ gia công nghiệp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.DRINKS}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline select-none"
            >
              <span>Xem toàn bộ thực đơn</span>
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </Link>

            {drinks && drinks.length > 1 && (
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-border/80">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  className="h-8 w-8 rounded-full border border-border bg-surface flex items-center justify-center text-text hover:text-primary hover:border-primary/50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Xem món trước"
                >
                  <ChevronLeft size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  className="h-8 w-8 rounded-full border border-border bg-surface flex items-center justify-center text-text hover:text-primary hover:border-primary/50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Xem món sau"
                >
                  <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            )}
          </div>
        </div>

        {isLoading && (!drinks || drinks.length === 0) ? (
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none animate-fade-in -mx-4 px-4 sm:mx-0 sm:px-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[320px] shrink-0 p-5 sm:p-6 bg-surface border border-border rounded-3xl space-y-4"
              >
                <Skeleton className="w-full h-44 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-1/4 rounded" />
                  <Skeleton className="h-5 w-3/4 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-4/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : drinks && drinks.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none animate-fade-in -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {drinks.map((drink) => (
              <div
                key={drink.id || drink.slug}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col"
              >
                <DrinkCard drink={drink} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-1.5 bg-surface/50 border border-border rounded-2xl">
            <p className="font-heading font-medium text-base text-text">
              Chưa có thức uống nổi bật
            </p>
            <p className="font-body text-xs sm:text-sm text-text-muted">
              Dữ liệu món tươi sẽ sớm được cập nhật.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
