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
            Các gói nước ép tươi 1, 3 và 6 ngày từ thực đơn thật của quán. Được chuẩn bị mỗi sáng từ rau củ quả tươi sạch để hỗ trợ hệ tiêu hóa nghỉ ngơi tự nhiên.
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col justify-between space-y-6 p-6 sm:p-7">
              <div className="space-y-4">
                <div className="text-xs font-normal tracking-wide text-text-muted">
                  {plan.durationDays} ngày · {plan.totalBottles} chai · {plan.kcalRange}
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
                  className="w-full justify-center group"
                >
                  <span>Xem chi tiết lộ trình</span>
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
