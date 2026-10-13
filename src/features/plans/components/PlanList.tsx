import React from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, Card, Kicker, LinkButton } from "@/components/ui";
import { routes } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { ArrowRight } from "lucide-react";

export interface PlanListProps {
  plans: readonly Plan[];
}

export function PlanList({ plans }: PlanListProps) {
  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        <header className="max-w-2xl space-y-3">
          <Kicker>01 · {FIXED_LABELS.PAGE_PLANS_TITLE}</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            Ba lựa chọn theo nhu cầu cơ thể
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed">
            Các gói nước ép tươi 1, 3 và 6 ngày từ thực đơn thật của quán. Chuẩn hóa theo quy cách 5 chai mỗi ngày (3 Sinh tố xanh + 1 Nước ép + 1 Sữa hạt/Trà thảo mộc).
          </p>
          <p className="font-body text-sm text-text-muted pt-1">
            Chưa rõ gói nào phù hợp với thể trạng?{" "}
            <Link
              href={routes.consultation()}
              className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Làm bài khảo sát nhanh
            </Link>
          </p>
        </header>

        {/* Thông điệp gợi ý từ quán */}
        <div className="p-4 sm:p-5 rounded-2xl bg-accent-soft/40 border border-primary/20 flex items-start gap-3">
          <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
          <p className="font-body text-xs sm:text-sm text-text leading-relaxed">
            <b>Gợi ý từ Ép Xanh:</b> Để đường ruột thích nghi trọn vẹn và đạt cảm giác nhẹ nhõm rõ rệt nhất, quán khuyến khích bạn trải nghiệm liên tục từ <b>3 đến 6 ngày</b> kết hợp chế độ ăn uống thanh nhẹ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="flex flex-col justify-between space-y-6 p-6 sm:p-7 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xs transition-all duration-300 ease-soft group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-normal tracking-wide text-text-muted">
                  <span>{plan.durationDays} ngày · {plan.totalBottles} chai</span>
                  <span className="text-primary font-medium">5 chai/ngày</span>
                </div>

                <div className="space-y-2">
                  <Heading level={2} size="xl" className="font-medium text-text">
                    {plan.title}
                  </Heading>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/60">
                <LinkButton
                  href={routes.plan(plan.id)}
                  variant="secondary"
                  className="w-full justify-center group-hover:bg-accent-soft/40 group-hover:border-primary/40 transition-colors"
                >
                  <span>Xem chi tiết lộ trình</span>
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
