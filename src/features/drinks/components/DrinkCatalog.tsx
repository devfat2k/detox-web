"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section, Heading, Skeleton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { DrinkCard } from "./DrinkCard";
import { useCategoriesQuery, useDrinksQuery } from "../hooks/use-drinks-query";
import { FALLBACK_CATEGORIES } from "@/services/categories.service";

const ITEMS_PER_PAGE = 6;

export function DrinkCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: categories = FALLBACK_CATEGORIES } = useCategoriesQuery();
  const { data: drinks = [], isLoading } = useDrinksQuery();

  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const filteredDrinks = useMemo(() => {
    if (activeCategory === "all") return drinks;
    return drinks.filter(
      (d) =>
        d.category === activeCategory ||
        d.categoryName?.toLowerCase().includes(activeCategory.toLowerCase()),
    );
  }, [drinks, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredDrinks.length / ITEMS_PER_PAGE));
  const paginatedDrinks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDrinks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDrinks, currentPage]);

  return (
    <Section spacing="lg">
      <Container className="space-y-8">
        <header className="max-w-2xl space-y-2">
          <span className="font-body text-xs font-medium text-primary select-none block">
            02 · {FIXED_LABELS.PAGE_DRINKS_TITLE}
          </span>
          <Heading level={1} size="3xl" className="font-heading font-semibold text-2xl sm:text-3xl text-text">
            Thực đơn nước ép tươi mỗi ngày
          </Heading>
          <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
            Các công thức từ nông sản tươi sạch chuẩn VietGAP. Không đường hóa học, không chất bảo quản, giữ trọn vẹn dưỡng chất thực vật nguyên bản.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-primary text-surface shadow-2xs"
                      : "bg-surface/80 hover:bg-surface text-text-muted hover:text-text border border-border/70"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {totalPages > 1 ? (
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 select-none">
              <span className="text-xs text-text-muted">
                Trang {currentPage} / {totalPages} ({filteredDrinks.length} món)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-8 w-8 rounded-full border border-border bg-surface flex items-center justify-center text-text hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={15} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-8 w-8 rounded-full border border-border bg-surface flex items-center justify-center text-text hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Trang sau"
                >
                  <ChevronRight size={15} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 bg-surface border border-border rounded-3xl space-y-4"
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
        ) : paginatedDrinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {paginatedDrinks.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 bg-surface/50 border border-border rounded-2xl animate-fade-in">
            <p className="font-heading font-medium text-base text-text">
              Chưa có thức uống nào
            </p>
            <p className="font-body text-xs sm:text-sm text-text-muted">
              Hiện chưa có dữ liệu thức uống cho danh mục này. Vui lòng quay lại sau nhé.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
