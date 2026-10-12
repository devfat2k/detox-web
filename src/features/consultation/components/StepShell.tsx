import React from "react";
import { Container, Section, Heading, Card, Notice } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";

export interface StepShellProps {
  step: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function StepShell({ step, title, description, children }: StepShellProps) {
  return (
    <Section spacing="md">
      <Container className="max-w-2xl">
        <Card className="space-y-6">
          <header className="space-y-2 border-b border-border pb-4">
            <p className="text-xs font-medium tracking-wide text-primary">
              Bước {step}/4
            </p>
            <Heading level={1} size="2xl">
              {title}
            </Heading>
            <p className="font-body text-sm text-text-muted">{description}</p>
          </header>

          <Notice variant="info">
            {FIXED_LABELS.UNDER_CONSTRUCTION_NOTICE}
          </Notice>

          {children && <div className="space-y-4">{children}</div>}
        </Card>
      </Container>
    </Section>
  );
}
