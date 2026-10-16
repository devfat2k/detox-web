import React from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, LinkButton } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowRight, Check } from "lucide-react";

export interface PlanListProps {
  readonly plans: readonly Plan[];
}

const DEFAULT_PORTIONS = [
  "3 sinh tố xanh",
  "1 nước ép tươi",
  "1 sữa hạt hoặc trà thảo mộc",
] as const;

export function PlanList({ plans }: PlanListProps) {
  return (
    <Section spacing="lg">
      <Container className="space-y-10 sm:space-y-12">
        <header className="max-w-2xl space-y-3">
          <span className="text-xs font-medium text-primary tracking-normal block">
            Thực đơn nông sản tươi mỗi sáng
          </span>
          <Heading level={1} size="3xl" className="font-semibold text-text tracking-tight">
            Ba lựa chọn theo nhu cầu cơ thể
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Các gói nước ép tươi 1, 3 và 6 ngày từ thực đơn thật của quán. Chuẩn hóa theo quy cách 5 chai mỗi ngày (3 sinh tố xanh + 1 nước ép + 1 sữa hạt hoặc trà thảo mộc).
          </p>
          <p className="font-body text-sm text-text-muted pt-1">
            Chưa rõ gói nào phù hợp với thể trạng?{" "}
            <Link
              href={routes.consultation()}
              className="text-primary font-medium underline underline-offset-4 hover:opacity-85 transition-opacity"
            >
              Làm bài khảo sát nhanh
            </Link>
          </p>
        </header>

        {/* Thông điệp gợi ý từ quán */}
        <div className="p-5 sm:p-6 rounded-3xl bg-accent-soft/30 border border-primary/20 flex items-start gap-3.5">
          <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
          <div className="space-y-0.5">
            <p className="font-body text-xs sm:text-sm text-text leading-relaxed">
              <span className="font-semibold text-primary">Gợi ý từ Ép Xanh:</span> Để đường ruột thích nghi trọn vẹn và đạt cảm giác nhẹ nhõm rõ rệt nhất, quán khuyến khích bạn trải nghiệm liên tục từ <b>3 đến 6 ngày</b> kết hợp chế độ ăn uống thanh nhẹ.
            </p>
          </div>
        </div>

        {/* Danh sách thẻ liệu trình */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {plans.map((plan) => {
            const bottleCount = plan.totalBottles ?? plan.durationDays * 5;

            return (
              <div
                key={plan.id}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 transition-all duration-300 ease-soft hover:-translate-y-1.5 hover:shadow-xs hover:border-primary/40 text-left"
              >
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-primary tracking-normal block">
                      Liệu trình {plan.durationDays} ngày
                    </span>
                    <Heading level={2} size="xl" className="font-heading font-semibold text-xl sm:text-2xl text-text tracking-tight leading-snug">
                      {plan.title}
                    </Heading>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight">
                        {bottleCount} chai
                      </span>
                      <span className="text-xs text-text-muted font-body">
                        / {plan.durationDays} ngày
                      </span>
                    </div>
                    {plan.kcalRange ? (
                      <p className="text-xs text-text-muted/70 font-body">
                        Năng lượng: ~{plan.kcalRange}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-4 pt-1">
                    <div className="space-y-2.5">
                      <p className="text-xs font-medium text-text">
                        Khẩu phần mỗi ngày (5 chai):
                      </p>
                      <ul className="space-y-2 text-xs text-text-muted font-body">
                        {DEFAULT_PORTIONS.map((item) => (
                          <li key={item} className="flex items-center gap-2.5">
                            <span className="h-4 w-4 rounded-full bg-accent-soft/70 flex items-center justify-center shrink-0">
                              <Check
                                className="w-2.5 h-2.5 text-primary"
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.description ? (
                      <div className="space-y-2.5 pt-1">
                        <p className="text-xs font-medium text-text">
                          Cảm nhận thể trạng:
                        </p>
                        <p className="text-xs text-text-muted leading-relaxed font-body">
                          {plan.description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="pt-7">
                  <LinkButton
                    href={routes.plan(plan.id)}
                    variant="secondary"
                    rounded="full"
                    className="w-full text-xs sm:text-sm font-medium justify-center min-h-11 px-5 rounded-full hover:bg-accent-soft/40 hover:border-primary/50 hover:text-primary transition-all duration-200"
                  >
                    <span>Xem chi tiết lộ trình</span>
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
