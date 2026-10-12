import React from "react";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { Container, Section, Heading, Card, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";
import { ArrowLeft, BookOpen, Clock, ExternalLink } from "lucide-react";

export interface ArticleDetailProps {
  readonly article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-10">
        {/* Thanh quay lại danh mục bài viết */}
        <nav aria-label="Điều hướng bài viết">
          <Link
            href={routes.articles()}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors group"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>Quay lại danh sách bài viết</span>
          </Link>
        </nav>

        {/* Đầu đề bài viết */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-medium text-primary tracking-wide">
              {article.categoryName}
            </span>
            <span aria-hidden="true" className="text-border">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true" className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <Heading level={1} size="3xl" className="font-medium text-2xl sm:text-3xl lg:text-4xl leading-snug text-text">
            {article.title}
          </Heading>

          {/* Dẫn đề nổi bật */}
          <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed border-l-2 border-primary/40 pl-4 italic">
            {article.excerpt}
          </p>
        </header>

        {/* Nội dung bài viết phân đoạn */}
        <article className="space-y-8 font-body text-base text-text leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              {section.heading && (
                <Heading level={2} size="xl" className="font-medium text-text pt-2">
                  {section.heading}
                </Heading>
              )}
              <p className="text-text/90 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </article>

        {/* Khối Honest Science: Nguồn tài liệu kiểm chứng */}
        <Card className="p-6 sm:p-7 space-y-4 bg-surface border border-border/80 rounded-2xl">
          <div className="flex items-center gap-2.5 text-primary">
            <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            <Heading level={3} size="xl" className="font-medium text-text">
              Nguồn tài liệu tham khảo &amp; Kiểm chứng khoa học
            </Heading>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Mọi bài viết của Ép Xanh Chữa Lành đều được trích xuất từ các tổ chức y tế và dinh dưỡng uy tín nhằm bảo đảm tính chính xác và an toàn cho người đọc:
          </p>
          <ul className="space-y-3 pt-1">
            {article.sources.map((source, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-text-muted flex items-start gap-2">
                <span className="text-primary font-medium select-none" aria-hidden="true">•</span>
                <div className="space-y-0.5">
                  <div className="font-medium text-text">
                    {source.organization}:{" "}
                    <span className="font-normal text-text-muted">{source.title}</span>
                  </div>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2"
                    >
                      <span>Xem tài liệu gốc</span>
                      <ExternalLink className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Lưu ý y tế và CTA */}
        <div className="p-6 bg-accent-soft/30 border border-border/60 rounded-xl space-y-4">
          <p className="text-xs text-text-muted leading-relaxed">
            {FIXED_LABELS.MEDICAL_DISCLAIMER}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40">
            <span className="text-xs text-text font-medium">
              Bạn muốn tìm thực đơn phù hợp với thể trạng cá nhân?
            </span>
            <LinkButton href={routes.consultation()} variant="primary" className="w-full sm:w-auto">
              {FIXED_LABELS.CTA_CONSULTATION}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
