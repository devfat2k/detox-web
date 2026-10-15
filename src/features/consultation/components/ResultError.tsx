"use client";

import React from "react";
import {
  Container,
  Section,
  Heading,
  Card,
  Button,
  LinkButton,
} from "@/components/ui";
import { routes } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ResultErrorProps {
  readonly errorMessage?: string;
  readonly onRetry: () => void;
  readonly onReset: () => void;
}

export function ResultError({
  errorMessage,
  onRetry,
  onReset,
}: ResultErrorProps) {
  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-6 text-center bg-surface border-border shadow-2xs">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center">
              <AlertCircle className="w-6 h-6" strokeWidth={2} />
            </div>
          </div>
          <div className="space-y-2">
            <Heading
              level={1}
              className="text-xl sm:text-2xl font-semibold text-text"
            >
              Không thể tải kết quả phân tích
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              {errorMessage ||
                "Đã xảy ra sự cố kết nối tới máy chủ khi tổng hợp lộ trình. Vui lòng thử lại."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={onRetry}
              className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-11 px-5"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={2} />
              <span>Thử lại</span>
            </Button>
            <LinkButton
              href={routes.consultation()}
              variant="secondary"
              onClick={onReset}
              className="w-full sm:w-auto min-h-11 px-5"
            >
              {FIXED_LABELS.ACTION_RETRY}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
