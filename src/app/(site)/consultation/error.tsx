"use client";

import React from "react";
import { Container, Section, Card, Heading, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export default function ConsultationError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section spacing="md">
      <Container className="max-w-2xl">
        <Card className="space-y-6">
          <header className="space-y-2">
            <Heading level={1} size="2xl">
              {FIXED_LABELS.ERROR_TITLE}
            </Heading>
            <p className="font-body text-sm text-text-muted">
              {FIXED_LABELS.ERROR_DESCRIPTION}
            </p>
          </header>

          <Notice variant="error">
            Đã có sự cố trong quá trình tải bước khảo sát.
          </Notice>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-12 px-6 text-base bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary"
            >
              {FIXED_LABELS.ACTION_RETRY}
            </button>
            <LinkButton href={routes.home()} variant="ghost">
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
