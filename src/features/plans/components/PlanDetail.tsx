import React from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { Container, Section, Heading, Card, Kicker, LinkButton, DetoxBottle } from "@/components/ui";
import { routes } from "@/config/routes";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export interface PlanDetailProps {
  plan: Plan;
}

export function PlanDetail({ plan }: PlanDetailProps) {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl space-y-12">
        {/* Navigation link quay lại */}
        <div>
          <Link
            href={routes.plans()}
            className="inline-flex items-center text-sm font-normal text-text-muted hover:text-text transition-colors group"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" strokeWidth={1.75} />
            Quay lại danh sách liệu trình
          </Link>
        </div>

        {/* Header liệu trình */}
        <header className="space-y-4">
          <Kicker>Liệu trình {plan.durationDays} ngày · Thực đơn nông sản tươi</Kicker>
          <Heading level={1} size="3xl" className="font-medium text-text">
            {plan.title}
          </Heading>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-normal text-text-muted">
            <span>Thời lượng: {plan.durationDays} ngày</span>
            <span>·</span>
            <span>Quy cách: {plan.totalBottles} chai</span>
            <span>·</span>
            <span>Năng lượng: ~{plan.kcalRange}</span>
          </div>

          <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
            {plan.description}
          </p>
        </header>

        {/* Lịch uống từng ngày */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Kicker>Lịch uống chi tiết</Kicker>
            <Heading level={2} size="2xl" className="font-medium text-text">
              Thực đơn 5 chai mỗi ngày
            </Heading>
            <p className="font-body text-sm text-text-muted">
              Uống cách nhau khoảng 2,5 đến 3 tiếng. Kết hợp uống thêm nước ấm rải rác trong ngày.
            </p>
          </div>

          <div className="space-y-10">
            {plan.days.map((day) => (
              <div key={day.dayNumber} className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-border/70 pb-2">
                  <Heading level={3} size="xl" className="font-medium text-text">
                    Ngày {day.dayNumber} · {day.theme}
                  </Heading>
                  <span className="text-xs text-text-muted">5 chai / ngày</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {day.bottles.map((bottle, idx) => (
                    <Card
                      key={`${day.dayNumber}-${bottle.time}-${idx}`}
                      className="flex flex-col items-center text-center p-4 space-y-3 bg-surface hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-2xs transition-all duration-200 ease-soft group"
                    >
                      <span className="text-xs font-medium text-text-muted tracking-wider">
                        {bottle.time}
                      </span>

                      <div className="py-1">
                        <DetoxBottle
                          color={bottle.color}
                          size="sm"
                          level={bottle.level}
                          className="mx-auto transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-1 w-full">
                        <Link
                          href={routes.drink(bottle.drinkSlug)}
                          className="font-body text-sm font-medium text-text hover:text-primary transition-colors line-clamp-1 block"
                        >
                          {bottle.name}
                        </Link>
                        <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-2">
                          {bottle.desc}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hướng dẫn & Lưu ý sức khỏe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Card 1: Đối tượng */}
          <Card className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-medium text-base">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
                <span>Đối tượng phù hợp</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted font-body leading-relaxed list-disc list-inside">
                {plan.suitableFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2 text-error font-medium text-base">
                <AlertCircle className="h-4 w-4" strokeWidth={1.75} />
                <span>Trường hợp cần thận trọng</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted font-body leading-relaxed list-disc list-inside">
                {plan.notSuitableFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Card 2: Chuẩn bị & Ăn lại */}
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Heading level={3} size="xl" className="font-medium text-text">
                Chuẩn bị trước liệu trình
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {plan.preparationGuide}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <Heading level={3} size="xl" className="font-medium text-text">
                Ăn nhẹ sau liệu trình
              </Heading>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {plan.recoveryGuide}
              </p>
            </div>
          </Card>
        </div>

        {/* Điều hướng khảo sát & Miễn trừ */}
        <div className="pt-8 border-t border-border/70 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1 max-w-md">
            <p className="font-body text-sm font-medium text-text">
              Bạn muốn biết liệu trình này có thực sự hợp với mình?
            </p>
            <p className="font-body text-xs text-text-muted">
              Mọi thông tin chỉ mang tính tham khảo dinh dưỡng, không thay thế chẩn đoán y khoa.
            </p>
          </div>

          <LinkButton href={routes.consultation()} variant="primary" className="group">
            <span>Kiểm tra độ phù hợp của bạn</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
