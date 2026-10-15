"use client";

import React from "react";
import { Container, Section, Heading, Card, LinkButton } from "@/components/ui";
import { routes } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { RotateCcw } from "lucide-react";

interface ResultSessionExpiredProps {
  readonly onReset: () => void;
}

export function ResultSessionExpired({ onReset }: ResultSessionExpiredProps) {
  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-6 text-center bg-surface border-border shadow-2xs animate-fade-in-slow">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-primary flex items-center justify-center">
              <RotateCcw className="w-6 h-6" strokeWidth={1.75} />
            </div>
          </div>
          <div className="space-y-2">
            <Heading
              level={1}
              className="text-xl sm:text-2xl font-semibold text-text"
            >
              Phiên tư vấn đã được làm mới
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Vì mục tiêu bảo vệ quyền riêng tư, Ép Xanh không lưu trữ thông
              tin thể trạng của bạn trên trình duyệt khi tải lại trang. Hãy
              thực hiện lại khảo sát để nhận thực đơn phù hợp nhất nhé!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <LinkButton
              href={routes.consultation()}
              variant="primary"
              onClick={onReset}
              className="w-full sm:w-auto min-h-11 px-6"
            >
              Tư vấn lộ trình mới
            </LinkButton>
            <LinkButton
              href={routes.home()}
              variant="secondary"
              className="w-full sm:w-auto min-h-11 px-6"
            >
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
