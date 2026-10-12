import React from "react";
import type { Article } from "@/data/articles";
import { Card, Heading, LinkButton } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowRight, BookOpen, Clock, HeartPulse } from "lucide-react";

export interface ArticleCardProps {
  readonly article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isKnowledge = article.category === "knowledge";

  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6 bg-surface hover:border-primary/50 transition-all duration-200 group">
      <div className="space-y-4">
        {/* Khung trực quan chủ đề Hum-07 tỷ lệ aspect-16/10 thanh lịch */}
        <div className="w-full aspect-16/10 rounded-xl bg-accent-soft/30 border border-border/40 flex items-center justify-center p-4">
          {isKnowledge ? (
            <HeartPulse
              className="h-8 w-8 text-primary/70 transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          ) : (
            <BookOpen
              className="h-8 w-8 text-primary/70 transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Nội dung thông tin bài viết */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-medium text-primary tracking-wide">
              {article.categoryName}
            </span>
            <span aria-hidden="true" className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
              <span>{article.readingTime}</span>
            </span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>{article.sources.length} nguồn kiểm chứng</span>
          </div>

          <Heading level={3} size="xl" className="font-medium text-text line-clamp-2">
            {article.title}
          </Heading>

          <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Nút Đọc tiếp toàn chiều rộng */}
      <div className="pt-5 mt-auto">
        <LinkButton
          href={routes.article(article.slug)}
          variant="secondary"
          className="w-full justify-center text-sm font-normal py-2.5 group-hover:bg-accent-soft/40 group-hover:border-primary/40 transition-colors"
        >
          <span>Đọc tiếp</span>
          <ArrowRight
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </LinkButton>
      </div>
    </Card>
  );
}
