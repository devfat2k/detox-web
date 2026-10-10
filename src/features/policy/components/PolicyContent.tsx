import React from "react";
import { Container, Section, Heading, Card, Notice, LinkButton } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";

export function PolicyContent() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl space-y-8">
        <header className="space-y-2">
          <Heading level={1} size="3xl">
            {FIXED_LABELS.PAGE_POLICY_TITLE}
          </Heading>
          <p className="font-body text-base text-text-muted">
            {FIXED_LABELS.PAGE_POLICY_DESC}
          </p>
        </header>

        <Notice variant="warning">
          {FIXED_LABELS.MEDICAL_DISCLAIMER}
        </Notice>

        <Card className="space-y-4">
          <Heading level={2} size="xl">
            1. Miễn trừ trách nhiệm y tế
          </Heading>
          <p className="font-body text-sm text-text-muted">
            {FIXED_LABELS.MEDICAL_DISCLAIMER}
          </p>

          <Heading level={2} size="xl" className="pt-2">
            2. Quyền riêng tư & Bảo vệ dữ liệu
          </Heading>
          <p className="font-body text-sm text-text-muted">
            Website hoạt động theo tiêu chuẩn Zero-Backend: Toàn bộ quá trình tính toán và khảo sát diễn ra trên trình duyệt của bạn. Website không thu thập, không lưu trữ thông tin cá nhân trên máy chủ và không sử dụng cookie hay công cụ theo dõi bên thứ ba.
          </p>

          <div className="pt-4 border-t border-border">
            <LinkButton href={routes.home()} variant="secondary">
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
