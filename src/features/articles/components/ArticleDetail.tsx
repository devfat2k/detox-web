import React from "react";
import type { Article } from "@/data/articles";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider text-accent">
              {article.categoryName}
            </span>
            <span>{article.readingTime}</span>
            <span>{article.publishedAt}</span>
          </div>
          <Heading level={1} size="3xl">
            {article.title}
          </Heading>
          <p className="font-body text-base text-text-muted">{article.excerpt}</p>
        </header>

        <Notice variant="info">
          {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
        </Notice>

        <Card className="space-y-4">
          <Heading level={2} size="xl">
            Nội dung bài viết
          </Heading>
          <p className="font-body text-sm text-text-muted">
            Toàn văn bài viết và danh mục tài liệu tham khảo có trích dẫn khoa học sẽ được cập nhật chi tiết.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <LinkButton href={routes.articles()} variant="ghost">
              Quay lại danh sách bài viết
            </LinkButton>
            <LinkButton href={routes.consultation()} variant="primary">
              {FIXED_LABELS.CTA_CONSULTATION}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
