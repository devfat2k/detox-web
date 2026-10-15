import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { DetoxMythSlider } from "./DetoxMythSlider";

export function HomeFaqMythsSection() {
  return (
    <Section id="faq" spacing="lg" className="border-b border-border">
      <Container className="space-y-8 sm:space-y-12">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-medium text-primary">
            Giải đáp thắc mắc
          </span>
          <Heading
            level={2}
            size="2xl"
            className="font-heading font-semibold text-2xl sm:text-3xl text-text tracking-tight"
          >
            Những câu hỏi thường gặp khi lần đầu detox
          </Heading>
          <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
            Hiểu đúng cơ chế khoa học để an tâm lắng nghe cơ thể, không hoang mang
            trước những hiểu lầm phổ biến hay lời đồn giảm cân thần tốc.
          </p>
        </div>

        <DetoxMythSlider />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-muted font-body">
          <span>
            Bạn có câu hỏi riêng về thể trạng hoặc thực đơn cá nhân?
          </span>
          <Link
            href={ROUTES.CONSULTATION}
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline transition-colors shrink-0"
          >
            <span>Tư vấn thể trạng miễn phí</span>
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
