import React from "react";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export interface PlanListProps {
  plans: readonly Plan[];
}

export function PlanList({ plans }: PlanListProps) {
  return (
    <Section spacing="lg">
      <Container className="space-y-8">
        <header className="space-y-2">
          <Heading level={1} size="3xl">
            {FIXED_LABELS.PAGE_PLANS_TITLE}
          </Heading>
          <p className="font-body text-base text-text-muted">
            {FIXED_LABELS.PAGE_PLANS_DESC}
          </p>
        </header>

        <Notice variant="info">
          {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
        </Notice>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent">
                  {plan.durationDays} ngày
                </span>
                <Heading level={2} size="xl">
                  {plan.title}
                </Heading>
                <p className="font-body text-sm text-text-muted">{plan.description}</p>
              </div>

              <div className="pt-2">
                <LinkButton href={routes.plan(plan.id)} variant="secondary" className="w-full">
                  Xem chi tiết
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
