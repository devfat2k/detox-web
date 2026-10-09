"use client";

import { RotateCcw } from "lucide-react";
import { fontVariables } from "./fonts";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { Container, Heading, Button, LinkButton } from "@/components/ui";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center justify-center py-12 bg-bg text-text">
        <main id="main-content" className="w-full">
          <Container className="max-w-md text-center space-y-6">
            <span className="inline-block text-xs font-medium text-text-muted">
              {SITE_CONFIG.name}
            </span>
            <div className="space-y-2">
              <Heading level={1} size="2xl">
                {FIXED_LABELS.ERROR_TITLE}
              </Heading>
              <p className="text-text-muted font-body text-base leading-relaxed">
                {FIXED_LABELS.ERROR_DESCRIPTION}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" onClick={() => reset()}>
                <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>{FIXED_LABELS.ACTION_RETRY}</span>
              </Button>
              <LinkButton href={ROUTES.HOME} variant="secondary">
                {FIXED_LABELS.ACTION_BACK_TO_HOME}
              </LinkButton>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
