import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, Heading, Card } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { type Drink } from "@/data/drinks";

export interface HomeFeaturedDrinksSectionProps {
  readonly drinks: readonly Drink[];
}

export function HomeFeaturedDrinksSection({ drinks }: HomeFeaturedDrinksSectionProps) {
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

          <Link
            href={ROUTES.DRINKS}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline select-none"
          >
            <span>Xem toàn bộ thực đơn</span>
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>

        {drinks && drinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {drinks.map((drink) => (
              <Card
                key={drink.slug}
                className="flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors shadow-2xs"
              >
                <div className="space-y-3">
                  <span className="text-xs text-text-muted font-body">
                    {drink.categoryName}
                  </span>

                  <Heading
                    level={3}
                    size="xl"
                    className="font-semibold text-lg sm:text-xl text-text"
                  >
                    {drink.name}
                  </Heading>

                  <p className="text-sm text-text-muted font-body leading-relaxed">
                    {drink.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(drink.ingredients ?? []).map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-0.5 rounded text-xs text-text-muted bg-bg border border-border/70"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <Link
                    href={ROUTES.DRINK_DETAIL(drink.slug)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors select-none"
                  >
                    <span>Xem chi tiết thức uống</span>
                    <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </Card>
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
