import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading, LinkButton } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { HERO_SAMPLE_SCHEDULE } from "../constants/hero";

export function HomeHeroSection() {
  return (
    <Section spacing="md" className="border-b border-border bg-surface/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="space-y-4 max-w-xl">
              <Heading
                level={1}
                size="3xl"
                className="font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-text"
              >
                Nước ép tươi mỗi sáng, vừa vặn với{" "}
                <span className="text-primary font-semibold">
                  thể trạng của bạn
                </span>
              </Heading>

              <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed max-w-xl">
                Khảo sát ngắn để nhận gợi ý phân bổ 5 chai rau củ tươi trong
                ngày, thanh nhẹ đường ruột và phù hợp với nhịp sinh hoạt thực
                tế.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
              <LinkButton
                href={ROUTES.CONSULTATION}
                variant="primary"
                rounded="full"
                className="w-full sm:w-auto min-h-12 text-base px-8 py-3.5 font-medium shadow-xs justify-center"
              >
                <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </LinkButton>

              <LinkButton
                href={ROUTES.PRICING}
                variant="secondary"
                rounded="full"
                className="w-full sm:w-auto min-h-12 text-base px-7 py-3.5 font-medium text-text hover:text-primary hover:border-primary/50 justify-center"
              >
                <span>{FIXED_LABELS.ACTION_VIEW_PRICING}</span>
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="space-y-0.5">
                  <p className="text-xs text-text-muted font-body">
                    Thực đơn mẫu tham khảo
                  </p>
                  <p className="text-sm font-semibold text-text font-heading">
                    Phân bổ 5 chai tươi trong ngày
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 font-body text-xs sm:text-sm">
                {HERO_SAMPLE_SCHEDULE.map((item) => (
                  <div
                    key={item.time}
                    className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-primary font-medium w-11">
                        {item.time}
                      </span>
                      <span className="text-text font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs text-text-muted">{item.role}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-muted">
                <span>Cá nhân hóa theo thể trạng</span>
                <Link
                  href={ROUTES.CONSULTATION}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>Bắt đầu khảo sát</span>
                  <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
