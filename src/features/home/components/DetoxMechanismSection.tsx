import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading, LinkButton } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { DetoxMythSlider } from "./DetoxMythSlider";
import { DetoxSimulationCard } from "./DetoxSimulationCard";

export function DetoxMechanismSection() {
  return (
    <Section spacing="lg" className="border-b border-border bg-surface/30">
      <Container className="space-y-12 sm:space-y-16">
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-medium text-primary">
            Cơ chế tự nhiên
          </span>
          <Heading
            level={2}
            size="3xl"
            className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-text leading-tight"
          >
            Tại sao cơ thể nhẹ nhõm hơn sau khi detox?
          </Heading>
          <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
            Detox không phải là nhịn đói hay giảm mỡ thần tốc. Đây là khoảng thời gian
            cho dạ dày tạm nghỉ ngơi, nạp đều vitamin tươi và giải phóng lượng nước thừa
            ứ đọng một cách êm ái.
          </p>
        </div>

        <DetoxMythSlider />

        <DetoxSimulationCard />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-semibold text-base text-text">
              Bạn muốn lắng nghe cơ thể mình?
            </h4>
            <p className="font-body text-xs sm:text-sm text-text-muted">
              Trả lời 4 bước khảo sát thể trạng để nhận thực đơn nước ép phù hợp nhất.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="primary"
              className="min-h-11 px-6 text-xs sm:text-sm font-medium"
            >
              <span>Tư vấn lộ trình</span>
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </LinkButton>
            <Link
              href={ROUTES.PLANS}
              className="text-xs font-medium text-text-muted hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Xem tất cả liệu trình &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
