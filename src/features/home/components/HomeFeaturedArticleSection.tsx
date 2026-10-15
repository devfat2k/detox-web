import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Container, Section, Heading, Card } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { type Article } from "@/data/articles";

export interface HomeFeaturedArticleSectionProps {
  readonly article: Article;
}

export function HomeFeaturedArticleSection({ article }: HomeFeaturedArticleSectionProps) {
  return (
    <Section spacing="md" className="border-b border-border bg-surface/30">
      <Container className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1">
            <Heading
              level={2}
              size="2xl"
              className="font-semibold text-xl sm:text-2xl text-text tracking-tight"
            >
              Kiến thức chăm sóc cơ thể
            </Heading>
            <p className="text-sm text-text-muted font-body">
              Kiến thức dinh dưỡng tổng hợp từ các nguồn nghiên cứu uy tín.
            </p>
          </div>

          <Link
            href={ROUTES.ARTICLES}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline select-none"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>

        <Card className="hover:border-primary/40 transition-colors shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-3 text-xs text-text-muted font-body">
                <span className="font-medium text-primary">
                  {article.categoryName}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
                  {article.readingTime}
                </span>
              </div>

              <Heading
                level={3}
                size="xl"
                className="font-semibold text-lg sm:text-xl text-text"
              >
                <Link
                  href={ROUTES.ARTICLE_DETAIL(article.slug)}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </Heading>

              <p className="text-sm text-text-muted font-body leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <Link
              href={ROUTES.ARTICLE_DETAIL(article.slug)}
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline pt-1 select-none"
            >
              <span>Đọc bài viết</span>
              <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
