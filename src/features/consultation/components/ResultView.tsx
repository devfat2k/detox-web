"use client";

import React, { useState } from "react";
import { Container, Section, Heading, Card, Notice, Button, LinkButton, DetoxBottle } from "@/components/ui";
import { useConsultation } from "../context";
import { recommendPlan } from "@/domain/recommend";
import { calculateBmi } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { PLANS_DATA } from "@/data/plans";
import { SITE_CONFIG } from "@/config/site";

const DAILY_SCHEDULE = [
  { time: "07:00", name: "Xanh Cần Tây Táo", desc: "Đánh thức tiêu hóa, thanh mát nhẹ bụng", color: "green" as const, level: 60 },
  { time: "10:00", name: "Cam Cà Rốt Gừng", desc: "Bổ sung vitamin, ấm bụng giữa buổi", color: "warm" as const, level: 75 },
  { time: "13:00", name: "Xanh Đậm Kale Dưa Leo", desc: "Cung cấp khoáng chất diệp lục dồi dào", color: "green" as const, level: 70 },
  { time: "16:00", name: "Đỏ Rực Củ Dền Thơm", desc: "Hỗ trợ tuần hoàn, vị ngọt tự nhiên", color: "warm" as const, level: 80 },
  { time: "19:00", name: "Sữa Hạt Ấm Dịu", desc: "Chất béo tốt lành tính, giúp thư giãn giấc ngủ", color: "soft" as const, level: 85 },
];

export function ResultView() {
  const { body, experience, goals, warningMessage, reset } = useConsultation();
  const [copied, setCopied] = useState(false);

  const bmi = body ? calculateBmi(body.heightCm, body.weightKg) : 21.5;
  const recommendation = recommendPlan({
    experienceLevel: experience?.level ?? "never",
    durationChoice: experience?.duration ?? "auto",
    bmi,
  });

  const matchedPlan = PLANS_DATA.find((p) => p.id === recommendation.planId) ?? PLANS_DATA[1];
  const greetingName = body?.name ? `bạn ${body.name}` : "bạn";

  const handleCopySummary = async () => {
    const summaryText = `[Ép Xanh Chữa Lành] Lộ trình tư vấn cho ${greetingName}:
- Gợi ý: ${matchedPlan.title} (${matchedPlan.durationDays} ngày)
- Lý do: ${recommendation.reason}
- Thể trạng: ${body?.gender === "female" ? "Nữ" : "Nam"}, ${body?.age ?? 25} tuổi, BMI ${bmi}
- Nhịp độ: 5 chai nước ép tươi/ngày
Ép Xanh Chữa Lành · Tư vấn dinh dưỡng thực tế`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section spacing="md">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-primary font-heading font-medium text-xs border border-border">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Kết quả cá nhân hóa
          </div>
          <Heading level={1} size="3xl" className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text">
            Lộ trình gợi ý dành cho {greetingName}
          </Heading>
          <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
            {recommendation.reason}
          </p>
        </div>

        {warningMessage ? (
          <Notice variant="warning">
            {warningMessage}
          </Notice>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1">
            <span className="text-xs font-medium text-primary block">Thời gian</span>
            <span className="text-xl font-heading font-semibold text-text block">{matchedPlan.durationDays} ngày</span>
            <span className="text-xs text-text-muted">Nhịp sinh học nhẹ</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1">
            <span className="text-xs font-medium text-primary block">Số lượng</span>
            <span className="text-xl font-heading font-semibold text-text block">{matchedPlan.durationDays * 5} chai</span>
            <span className="text-xs text-text-muted">5 chai mỗi ngày</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1">
            <span className="text-xs font-medium text-primary block">Năng lượng</span>
            <span className="text-xl font-heading font-semibold text-text block">~850</span>
            <span className="text-xs text-text-muted">kcal mỗi ngày</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border space-y-1">
            <span className="text-xs font-medium text-primary block">Ước tính nhẹ</span>
            <span className="text-xl font-heading font-semibold text-text block">0.5 - 1.5 kg</span>
            <span className="text-xs text-text-muted">Chủ yếu nước & tiêu hóa</span>
          </div>
        </div>

        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Lịch 5 chai mẫu trong ngày
            </span>
            <Heading level={2} size="xl" className="font-semibold text-xl text-text">
              Thực đơn phân bổ nhịp nhàng từ sáng đến tối
            </Heading>
            <p className="text-xs text-text-muted font-body">
              Các chai nước ép được ép tươi chậm, uống chậm rãi từng ngụm cách nhau 2–3 tiếng.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {DAILY_SCHEDULE.map((item) => (
              <div
                key={item.time}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-bg border border-border/80 hover:border-primary/40 transition-colors"
              >
                <div className="shrink-0">
                  <DetoxBottle size="sm" color={item.color} level={item.level} label={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-heading font-semibold bg-accent-soft text-primary">
                      {item.time}
                    </span>
                    <span className="font-body text-sm sm:text-base font-semibold text-text truncate">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-body truncate mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {goals.length > 0 ? (
          <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
            <span className="text-xs font-medium text-primary block">
              Lời khuyên dành cho mục tiêu của bạn
            </span>
            <p className="text-sm text-text font-body leading-relaxed">
              Bạn đang quan tâm đến việc cải thiện thể trạng. Hãy uống thêm ít nhất 1.5 - 2 lít nước lọc ấm mỗi ngày, hạn chế đồ uống có cồn và ngủ đủ 7 tiếng để cơ thể hấp thu tối ưu lượng vitamin từ rau củ tươi.
            </p>
          </div>
        ) : null}

        <div className="p-6 rounded-3xl bg-accent-soft/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading font-semibold text-base text-text">
              Bạn muốn trao đổi thêm cùng quán?
            </h3>
            <p className="font-body text-xs text-text-muted">
              Nhắn tin trực tiếp tới Threads của Ép Xanh Chữa Lành để được tư vấn theo ngày.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={handleCopySummary}
              className="rounded-full text-sm min-h-11 px-5"
            >
              {copied ? "Đã sao chép ✓" : FIXED_LABELS.ACTION_COPY_SUMMARY}
            </Button>
            <LinkButton
              href={SITE_CONFIG.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="rounded-full text-sm min-h-11 px-6"
            >
              {FIXED_LABELS.ACTION_MESSAGE_THREADS}
            </LinkButton>
          </div>
        </div>

        <p className="text-xs text-text-muted font-body text-center leading-relaxed max-w-xl mx-auto">
          {FIXED_LABELS.MEDICAL_DISCLAIMER}
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <LinkButton
            href={ROUTES.CONSULTATION}
            variant="ghost"
            onClick={reset}
            className="text-xs font-medium text-text-muted hover:text-text"
          >
            {FIXED_LABELS.ACTION_RETRY}
          </LinkButton>
          <span className="text-border" aria-hidden="true">·</span>
          <LinkButton
            href={ROUTES.HOME}
            variant="ghost"
            className="text-xs font-medium text-text-muted hover:text-text"
          >
            {FIXED_LABELS.ACTION_BACK_TO_HOME}
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
