import React from "react";
import type { Article } from "@/data/articles";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export interface ArticleListProps {
  articles: readonly Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <Section spacing="lg">
      <Container className="space-y-8">
        <header className="space-y-2">
          <Heading level={1} size="3xl">
            {FIXED_LABELS.PAGE_ARTICLES_TITLE}
          </Heading>
          <p className="font-body text-base text-text-muted">
            {FIXED_LABELS.PAGE_ARTICLES_DESC}
          </p>
        </header>

        <Notice variant="info">
          {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
        </Notice>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug} className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="font-semibold uppercase tracking-wider text-accent">
                    {article.categoryName}
                  </span>
                  <span>{article.readingTime}</span>
                </div>
                <Heading level={2} size="xl">
                  {article.title}
                </Heading>
                <p className="font-body text-sm text-text-muted">{article.excerpt}</p>
              </div>

              <div className="pt-2">
                <LinkButton href={routes.article(article.slug)} variant="secondary" className="w-full">
                  Đọc tiếp
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
