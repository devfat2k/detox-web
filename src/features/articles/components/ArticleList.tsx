"use client";

import React, { useState, useMemo } from "react";
import type { Article } from "@/data/articles";
import { ARTICLE_CATEGORIES } from "@/data/articles";
import { Container, Section, Heading, Kicker } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { ArticleCard } from "./ArticleCard";

export interface ArticleListProps {
  readonly articles: readonly Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        {/* Header với Kicker và Micro-trust bar Hum-07 */}
        <header className="max-w-2xl space-y-4">
          <Kicker>03 · {FIXED_LABELS.PAGE_ARTICLES_TITLE}</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            Bài viết &amp; Kiến thức dinh dưỡng{" "}
            <span className="relative inline-block text-primary decoration-primary/40 underline decoration-2 underline-offset-4">
              khoa học
            </span>
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Các ghi chép trung thực dựa trên nguồn kiểm chứng y khoa uy tín. Không thổi phồng công dụng, giúp bạn hiểu rõ cơ thể để nuôi dưỡng thói quen sống bền vững.
          </p>

          {/* Micro-trust bar đặc trưng Hum-07 */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-body text-text-muted pt-1 tracking-wider uppercase">
            <span>NGUỒN Y KHOA KIỂM CHỨNG</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>NỘI DUNG TRUNG THỰC</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>KHÔNG QUẢNG CÁO BÁN HÀNG</span>
          </div>
        </header>

        {/* Thanh lọc danh mục phẳng 1 chạm */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ARTICLE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
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

        {/* Lưới hiển thị bài viết */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 bg-surface/50 border border-border rounded-xl">
            <p className="text-sm text-text-muted">
              Chưa có bài viết nào trong danh mục này.
            </p>
          </div>
        )}

        {/* Chỉ số minh bạch chân trang */}
        <div className="pt-6 border-t border-border/60 text-xs text-text-muted">
          Tổng cộng {filteredArticles.length} bài viết được đối chiếu khoa học
        </div>
      </Container>
    </Section>
  );
}
