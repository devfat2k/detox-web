import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading, LinkButton, DetoxBottle } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { PLAN_STAGES } from "../constants/stages";

export function HomeStagesSection() {
  return (
    <Section id="stages" spacing="md" className="border-b border-border">
      <Container className="space-y-8 sm:space-y-12">
        <div className="space-y-3 max-w-2xl">
          <Heading
            level={2}
            size="2xl"
            className="font-semibold text-2xl sm:text-3xl text-text tracking-tight"
          >
            Ba giai đoạn, từ làm quen đến phục hồi chuyên sâu
          </Heading>
          <p className="text-base text-text-muted font-body leading-relaxed max-w-xl">
            Mỗi liệu trình phục vụ một nhu cầu thể trạng riêng biệt. Bạn chỉ
            cần chọn gói phù hợp — quán chuẩn bị theo thực đơn nông sản tươi mỗi sáng.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {PLAN_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8 hover:border-primary/40 transition-colors shadow-2xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-primary">
                      Giai đoạn {stage.stageNumber} · {stage.phaseName}
                    </span>
                    <Heading
                      level={3}
                      size="xl"
                      className="font-semibold text-xl sm:text-2xl text-text tracking-tight"
                    >
                      {stage.title}
                    </Heading>
                  </div>

                  <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
                    {stage.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-text font-medium font-body leading-relaxed">
                    {stage.highlight}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={ROUTES.PLAN_DETAIL(stage.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors"
                    >
                      <span>Xem chi tiết liệu trình</span>
                      <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="shrink-0 w-32 h-40 sm:w-44 sm:h-52 rounded-2xl border border-border/60 bg-bg/50 flex items-center justify-center p-4 self-center lg:self-center">
                  <DetoxBottle
                    size="md"
                    color={stage.bottleColor}
                    level={stage.bottleLevel}
                    label={stage.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center lg:text-left max-w-xl">
            <h3 className="font-heading font-semibold text-xl text-text">
              Bạn chưa rõ thể trạng mình phù hợp với gói nào?
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Khảo sát nhanh 1 phút để nhận gợi ý phân bổ 5 chai tươi mỗi ngày vừa vặn với thể trạng của bạn nhất.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="primary"
              className="w-full sm:w-auto min-h-11 px-7 text-sm font-medium justify-center"
            >
              <span>{FIXED_LABELS.CTA_CONSULTATION}</span>
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={ROUTES.PRICING}
              variant="secondary"
              className="w-full sm:w-auto min-h-11 px-6 text-sm font-medium justify-center"
            >
              <span>{FIXED_LABELS.ACTION_VIEW_PRICING}</span>
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
