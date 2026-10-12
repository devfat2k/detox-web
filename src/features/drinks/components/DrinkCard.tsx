import React from "react";
import type { Drink } from "@/data/drinks";
import { Card, Heading, LinkButton, DetoxBottle } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowRight } from "lucide-react";

export interface DrinkCardProps {
  readonly drink: Drink;
}

export function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6 bg-surface hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xs transition-all duration-300 ease-soft group">
      <div className="space-y-4">
        {/* Khối minh họa chai nước ép thoáng đãng, cân đối */}
        <div className="w-full aspect-4/3 rounded-xl bg-background/70 border border-border/40 flex items-center justify-center p-4">
          <DetoxBottle
            color={drink.color}
            size="md"
            level={drink.level}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Nội dung thông tin sản phẩm */}
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-xs font-medium text-primary tracking-wide block">
              {drink.categoryName}
            </span>
            <Heading level={3} size="xl" className="font-medium text-text">
              {drink.name}
            </Heading>
          </div>

          {/* Thành phần nông sản dạng chuỗi tự nhiên */}
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-text-muted/80 font-medium block">
              Thành phần
            </span>
            <p className="font-body text-xs text-text leading-relaxed">
              {drink.ingredients.join(" · ")}
            </p>
          </div>

          {/* Công dụng nhanh nhẹ nhàng */}
          <div className="space-y-1 pt-1 border-t border-border/40">
            <span className="text-[11px] uppercase tracking-wider text-text-muted/80 font-medium block">
              Cảm nhận cơ thể
            </span>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              {drink.benefit}
            </p>
          </div>
        </div>
      </div>

      {/* Nút Xem chi tiết trọn vẹn, không bị ép chữ */}
      <div className="pt-5 mt-auto">
        <LinkButton
          href={routes.drink(drink.slug)}
          variant="secondary"
          className="w-full justify-center text-sm font-normal py-2.5 group-hover:bg-accent-soft/40 group-hover:border-primary/40 transition-colors"
        >
          <span>Xem chi tiết</span>
          <ArrowRight
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.75}
          />
        </LinkButton>
      </div>
    </Card>
  );
}
