"use client";

import React, { useState, useMemo } from "react";
import { DRINK_CATEGORIES, INITIAL_DRINKS } from "@/data/drinks";
import { Container, Section, Heading, Kicker, Button, Skeleton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { DrinkCard } from "./DrinkCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 3;

export function DrinkCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Xử lý đổi bộ lọc danh mục kèm giả lập loading nhẹ để test UI
  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  };

  // Danh sách sau khi lọc
  const filteredDrinks = useMemo(() => {
    if (activeCategory === "all") return INITIAL_DRINKS;
    return INITIAL_DRINKS.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredDrinks.length / ITEMS_PER_PAGE));
  const paginatedDrinks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDrinks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDrinks, currentPage]);

  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        {/* Header danh mục */}
        <header className="max-w-2xl space-y-3">
          <Kicker>02 · {FIXED_LABELS.PAGE_DRINKS_TITLE}</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            Thực đơn nước ép tươi mỗi ngày
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Các công thức từ nông sản tươi sạch chuẩn VietGAP. Không đường hóa học, không chất bảo quản, giữ trọn vẹn dưỡng chất thực vật nguyên bản.
          </p>
        </header>

        {/* Thanh lọc danh mục 1 chạm tinh tế */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DRINK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-accent-soft text-primary font-medium border border-primary/50 shadow-2xs"
                    : "bg-surface text-text-muted hover:text-text border border-border/70 hover:border-border"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Lưới sản phẩm hoặc Skeleton Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 bg-surface border border-border rounded-xl space-y-4"
              >
                <Skeleton className="w-full aspect-4/3 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-1/4 rounded" />
                  <Skeleton className="h-5 w-3/4 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-5/6 rounded" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg pt-2" />
              </div>
            ))}
          </div>
        ) : paginatedDrinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedDrinks.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 bg-surface/50 border border-border rounded-xl">
            <p className="text-sm text-text-muted">
              Chưa có món nào thuộc danh mục này.
            </p>
          </div>
        )}

        {/* Thanh Phân trang (Pagination) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-border/60">
            <span className="text-xs text-text-muted">
              Trang {currentPage} / {totalPages} · Tổng cộng {filteredDrinks.length} món
            </span>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 disabled:opacity-40"
                aria-label="Trang trước"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 disabled:opacity-40"
                aria-label="Trang sau"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
