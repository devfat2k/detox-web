import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Drink } from "@/data/drinks";
import { Heading, DetoxBottle } from "@/components/ui";
import { ROUTES } from "@/config/routes";

export interface DrinkCardProps {
  readonly drink: Drink;
}

export function DrinkCard({ drink }: DrinkCardProps) {
  const ingredientsText = (drink.ingredients ?? []).join(" · ");

  return (
    <article className="h-full flex flex-col justify-between p-5 sm:p-6 rounded-3xl border border-border/70 bg-surface hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-2xs transition-all duration-300 ease-soft group">
      <div className="space-y-4">
        <div className="w-full h-44 sm:h-48 flex items-center justify-center p-2 select-none">
          <DetoxBottle
            color={drink.color}
            size="lg"
            level={drink.level}
            className="transition-transform duration-300 ease-soft group-hover:scale-105"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-xs font-medium text-primary block">
              {drink.categoryName}
            </span>
            <Heading level={3} size="xl" className="font-heading font-semibold text-lg sm:text-xl text-text">
              {drink.name}
            </Heading>
          </div>

          {ingredientsText ? (
            <div className="space-y-0.5">
              <span className="text-xs text-text-muted font-medium block">
                Thành phần
              </span>
              <p className="font-body text-xs text-text/90 leading-relaxed line-clamp-2">
                {ingredientsText}
              </p>
            </div>
          ) : null}

          <div className="space-y-0.5">
            <span className="text-xs text-text-muted font-medium block">
              Cảm nhận cơ thể
            </span>
            <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-2">
              {drink.benefit ?? "Cung cấp dinh dưỡng thanh lọc nhẹ nhàng"}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-auto flex items-center justify-between">
        <Link
          href={ROUTES.DRINK_DETAIL(drink.slug)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors py-1 group/link"
        >
          <span>Xem chi tiết</span>
          <ArrowRight
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
