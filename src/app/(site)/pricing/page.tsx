import type { Metadata } from "next";
import { Container, Section, Heading, LinkButton } from "@/components/ui";
import { PricingCard } from "@/components/common";
import { PRICING_COMBOS, PRICING_FOOTNOTE } from "@/data/pricing";
import { SITE_CONFIG } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Bảng giá combo nước ép tươi",
  description:
    "Bảng giá các combo detox nước ép tươi 1, 3, 6 ngày ép chậm nguyên chất mỗi sáng từ nông sản sạch Việt Nam.",
};

export default function PricingPage() {
  return (
    <Section spacing="md">
      <Container className="space-y-10 sm:space-y-14">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <Heading level={1} size="3xl" className="font-semibold text-text tracking-tight">
            Bảng giá combo nước ép tươi mỗi sáng
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Quy chuẩn 5 chai mỗi ngày từ nông sản sạch ép chậm mỗi sáng. Không
            đường, không nước lọc pha loãng, không chất bảo quản.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {PRICING_COMBOS.map((combo) => (
            <PricingCard key={combo.id} combo={combo} mode="page" />
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xs">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="font-heading font-semibold text-lg text-text">
              Bạn chưa rõ thể trạng mình phù hợp với gói nào?
            </h3>
            <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
              {PRICING_FOOTNOTE} Làm bài khảo sát 1 phút để nhận gợi ý lộ trình phù hợp với mục tiêu của bạn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="primary"
              rounded="full"
              className="w-full sm:w-auto min-h-11 px-6 text-xs sm:text-sm font-medium justify-center rounded-full"
            >
              <span>{FIXED_LABELS.CTA_CONSULTATION}</span>
              <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={SITE_CONFIG.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              rounded="full"
              className="w-full sm:w-auto min-h-11 px-5 text-xs sm:text-sm font-medium justify-center rounded-full"
            >
              <span>{FIXED_LABELS.ACTION_MESSAGE_THREADS}</span>
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
