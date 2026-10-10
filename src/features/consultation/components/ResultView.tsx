import React from "react";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export function ResultView() {
  return (
    <Section spacing="md">
      <Container className="max-w-2xl">
        <Card className="space-y-6">
          <header className="space-y-2 border-b border-border pb-4">
            <p className="text-xs font-semibold tracking-wide uppercase text-accent">
              Kết quả khảo sát
            </p>
            <Heading level={1} size="2xl">
              {FIXED_LABELS.PAGE_CONSULTATION_RESULT_TITLE}
            </Heading>
            <p className="font-body text-sm text-text-muted">
              {FIXED_LABELS.PAGE_CONSULTATION_RESULT_DESC}
            </p>
          </header>

          <Notice variant="info">
            {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
          </Notice>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <LinkButton href={routes.consultation()} variant="ghost">
              {FIXED_LABELS.ACTION_RETRY}
            </LinkButton>
            <LinkButton href={routes.home()} variant="secondary">
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
