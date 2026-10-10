import React from "react";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export interface PlanDetailProps {
  plan: Plan;
}

export function PlanDetail({ plan }: PlanDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent">
            Liệu trình {plan.durationDays} ngày
          </span>
          <Heading level={1} size="3xl">
            {plan.title}
          </Heading>
          <p className="font-body text-base text-text-muted">{plan.description}</p>
        </header>

        <Notice variant="info">
          {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
        </Notice>

        <Card className="space-y-4">
          <Heading level={2} size="xl">
            Lịch uống mẫu
          </Heading>
          <p className="font-body text-sm text-text-muted">
            Chi tiết thành phần từng chai và thời gian uống trong ngày sẽ được cập nhật tại giai đoạn hoàn thiện nội dung.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <LinkButton href={routes.plans()} variant="ghost">
              Quay lại danh sách
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
