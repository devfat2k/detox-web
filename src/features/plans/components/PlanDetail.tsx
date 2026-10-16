import React from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, LinkButton, DetoxBottle } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export interface PlanDetailProps {
  plan: Plan;
}

export function PlanDetail({ plan }: PlanDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl space-y-10 sm:space-y-12">
        {/* Navigation link quay lại */}
        <div>
          <Link
            href={routes.plans()}
            className="inline-flex items-center text-xs sm:text-sm font-normal text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" strokeWidth={1.75} />
            Quay lại danh sách liệu trình
          </Link>
        </div>

        {/* Header liệu trình */}
        <header className="space-y-4">
          <span className="text-xs font-medium text-primary tracking-normal block">
            Liệu trình {plan.durationDays} ngày · Thực đơn nông sản tươi
          </span>
          <Heading level={1} size="3xl" className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-text tracking-tight">
            {plan.title}
          </Heading>

          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight">
              {plan.totalBottles} chai
            </span>
            <span className="text-xs text-text-muted font-body">
              / {plan.durationDays} ngày
            </span>
            {plan.kcalRange ? (
              <span className="text-xs text-text-muted/70 font-body ml-2">
                (~{plan.kcalRange})
              </span>
            ) : null}
          </div>

          <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl pt-1">
            {plan.description}
          </p>
        </header>

        {/* Lịch uống từng ngày */}
        <div className="space-y-8">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-primary tracking-normal block">
              Lịch uống chi tiết
            </span>
            <Heading level={2} size="2xl" className="font-heading font-semibold text-xl sm:text-2xl text-text tracking-tight">
              Thực đơn 5 chai mỗi ngày
            </Heading>
            <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
              Uống cách nhau khoảng 2,5 đến 3 tiếng. Kết hợp uống thêm nước ấm rải rác trong ngày.
            </p>
          </div>

          <div className="space-y-10">
            {(plan.days ?? []).map((day) => (
              <div key={day.dayNumber} className="space-y-4">
                <div className="flex items-baseline justify-between pb-1">
                  <Heading level={3} size="xl" className="font-heading font-semibold text-base sm:text-lg text-text tracking-tight">
                    Ngày {day.dayNumber} · {day.theme ?? ""}
                  </Heading>
                  <span className="text-xs text-text-muted font-body">5 chai / ngày</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
                  {(day.bottles ?? []).map((bottle, idx) => (
                    <div
                      key={`${day.dayNumber}-${bottle.time}-${idx}`}
                      className="flex flex-col items-center text-center p-4 space-y-3 rounded-2xl bg-surface border border-border/80 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xs transition-all duration-300 ease-soft group"
                    >
                      <span className="text-xs font-medium text-primary tracking-normal">
                        {bottle.time}
                      </span>

                      <div className="py-1">
                        <DetoxBottle
                          color={bottle.color ?? "green"}
                          size="sm"
                          level={bottle.level ?? 80}
                          className="mx-auto transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-1 w-full">
                        <Link
                          href={routes.drink(bottle.drinkSlug)}
                          className="font-body text-xs sm:text-sm font-medium text-text hover:text-primary transition-colors line-clamp-1 block"
                        >
                          {bottle.name}
                        </Link>
                        <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-2">
                          {bottle.desc ?? ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hướng dẫn & Lưu ý sức khỏe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1: Đối tượng */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
                <span>Đối tượng phù hợp</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-text-muted font-body leading-relaxed list-disc list-inside">
                {(plan.suitableFor ?? []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-error font-medium text-sm sm:text-base">
                <AlertCircle className="h-4 w-4" strokeWidth={1.75} />
                <span>Trường hợp cần thận trọng</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-text-muted font-body leading-relaxed list-disc list-inside">
                {(plan.notSuitableFor ?? []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Chuẩn bị & Ăn lại */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 space-y-6">
            <div className="space-y-2">
              <Heading level={3} size="xl" className="font-heading font-semibold text-base sm:text-lg text-text tracking-tight">
                Chuẩn bị trước liệu trình
              </Heading>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                {plan.preparationGuide}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Heading level={3} size="xl" className="font-heading font-semibold text-base sm:text-lg text-text tracking-tight">
                Ăn nhẹ sau liệu trình
              </Heading>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                {plan.recoveryGuide}
              </p>
            </div>
          </div>
        </div>

        {/* Điều hướng khảo sát & Miễn trừ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-accent-soft/30 border border-primary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1 max-w-md">
            <p className="font-body text-sm sm:text-base font-semibold text-text">
              Bạn muốn biết liệu trình này có thực sự hợp với mình?
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Mọi thông tin chỉ mang tính tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa.
            </p>
          </div>

          <LinkButton
            href={routes.consultation()}
            variant="primary"
            rounded="full"
            className="w-full sm:w-auto text-xs sm:text-sm font-medium justify-center min-h-11 px-6 rounded-full group shrink-0"
          >
            <span>Kiểm tra độ phù hợp của bạn</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
