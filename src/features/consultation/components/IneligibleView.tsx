"use client";

import {
  Container,
  Section,
  Heading,
  Card,
  Notice,
  LinkButton,
} from "@/components/ui";
import { useConsultation } from "../context";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";

export function IneligibleView() {
  const { ineligibleReason, reset } = useConsultation();

  const message =
    ineligibleReason ??
    "Theo nguyên tắc an toàn, thể trạng hiện tại của bạn chưa phù hợp để áp dụng chế độ nhịn ăn chỉ uống nước ép nhiều ngày liên tục.";

  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Lưu ý an toàn sức khỏe
            </span>
            <Heading
              level={1}
              size="2xl"
              className="font-semibold text-2xl sm:text-3xl text-text"
            >
              {FIXED_LABELS.PAGE_CONSULTATION_INELIGIBLE_TITLE}
            </Heading>
          </div>

          <Notice variant="warning">{message}</Notice>

          <div className="space-y-3 font-body text-sm text-text-muted leading-relaxed">
            <p>
              Sức khỏe và sự an toàn của bạn luôn là ưu tiên hàng đầu tại Ép
              Xanh Chữa Lành. Chúng mình không khuyến khích việc ép cơ thể theo
              bất kỳ chế độ kiêng khem nào khi thể trạng chưa sẵn sàng.
            </p>
            <p>
              Bạn vẫn có thể ghé quán hoặc tự thưởng cho mình một ly nước ép rau
              củ tươi sau bữa ăn chính để bổ sung vitamin và khoáng chất tự
              nhiên một cách an toàn nhất!
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="ghost"
              onClick={reset}
              className="px-6 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              {FIXED_LABELS.ACTION_RETRY}
            </LinkButton>
            <LinkButton
              href={ROUTES.HOME}
              variant="secondary"
              className="px-6 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              {FIXED_LABELS.ACTION_BACK_TO_HOME}
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
