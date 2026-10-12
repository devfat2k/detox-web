"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Container, Section, Heading, Card, Button } from "@/components/ui";
import { useConsultation } from "../context";
import type { ExperienceLevel, DurationChoice } from "@/domain/recommend";
import { FIXED_LABELS } from "@/config/copy";

interface ExpOption {
  id: ExperienceLevel;
  label: string;
  desc: string;
  isDefault?: boolean;
}

const EXP_OPTIONS: ExpOption[] = [
  {
    id: "never",
    label: "Chưa từng uống detox bao giờ",
    desc: "Đây là lần đầu tiên bạn tìm hiểu — quán sẽ ưu tiên vị thanh mát dễ uống nhất",
    isDefault: true,
  },
  {
    id: "experienced_good",
    label: "Đã từng và cơ thể thích ứng rất tốt",
    desc: "Bạn đã quen với vị rau củ nguyên chất và nhịp thanh lọc cơ thể",
  },
  {
    id: "experienced_tired",
    label: "Đã từng nhưng thấy hơi mệt hoặc bỏ dở",
    desc: "Quán sẽ thiết kế nhịp độ nhẹ nhàng để bạn không bị quá tải hay hụt năng lượng",
  },
];

interface DurationOption {
  id: DurationChoice;
  title: string;
  desc: string;
  isRecommended?: boolean;
}

const DURATION_OPTIONS: DurationOption[] = [
  {
    id: "auto",
    title: "Để quán gợi ý phù hợp nhất",
    desc: "Tự động tính theo kinh nghiệm và BMI của bạn",
    isRecommended: true,
  },
  {
    id: 1,
    title: "1 ngày",
    desc: "Khởi đầu nhẹ nhàng làm quen",
  },
  {
    id: 3,
    title: "3 ngày",
    desc: "Cân bằng & thiết lập lại nhịp sinh học",
  },
  {
    id: 6,
    title: "6 ngày",
    desc: "Chuyên sâu phục hồi năng lượng",
  },
];

export function Step4Form() {
  const router = useRouter();
  const { experience, updateExperience } = useConsultation();

  const [level, setLevel] = useState<ExperienceLevel>(experience?.level ?? "never");
  const [duration, setDuration] = useState<DurationChoice>(experience?.duration ?? "auto");

  const handleFinish = () => {
    updateExperience({ level, duration });
    router.push("/consultation/result");
  };

  return (
    <Section spacing="md">
      <Container className="max-w-xl space-y-6">
        <Card className="p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-medium text-primary tracking-wide block">
              Bước 4/4 · Kinh nghiệm và số ngày
            </span>
            <Heading level={1} size="2xl" className="font-semibold text-2xl sm:text-3xl text-text">
              Kinh nghiệm và thời gian mong muốn
            </Heading>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Bước cuối cùng giúp chọn đúng số lượng chai và nhịp độ uống phù hợp cho bạn.
            </p>
          </div>

          {/* Phần 1: Kinh nghiệm */}
          <div className="space-y-3">
            <label className="font-body text-sm font-medium text-text select-none block">
              Bạn đã từng trải nghiệm nước ép thanh lọc trước đây chưa?
            </label>
            <div className="flex flex-col gap-2.5">
              {EXP_OPTIONS.map((opt) => {
                const isSelected = level === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLevel(opt.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-fast flex items-start gap-3 select-none ${
                      isSelected
                        ? "bg-accent-soft/70 border-primary shadow-2xs"
                        : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? "bg-primary border-primary text-bg"
                          : "border-border bg-bg text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm font-semibold text-text">
                          {opt.label}
                        </span>
                        {opt.isDefault ? (
                          <span className="text-[11px] font-medium text-primary bg-surface px-2 py-0.5 rounded-full border border-border/70">
                            Phổ biến
                          </span>
                        ) : null}
                      </div>
                      <p className="font-body text-xs text-text-muted leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phần 2: Số ngày mong muốn */}
          <div className="space-y-3 pt-2">
            <label className="font-body text-sm font-medium text-text select-none block">
              Số ngày bạn mong muốn trải nghiệm:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DURATION_OPTIONS.map((dOpt) => {
                const isSelected = duration === dOpt.id;
                return (
                  <button
                    key={String(dOpt.id)}
                    type="button"
                    onClick={() => setDuration(dOpt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-fast flex items-start gap-3 select-none ${
                      isSelected
                        ? "bg-accent-soft/70 border-primary shadow-2xs"
                        : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
                    } ${dOpt.isRecommended ? "sm:col-span-2" : ""}`}
                  >
                    <div
                      className={`mt-0.5 h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? "bg-primary border-primary text-bg"
                          : "border-border bg-bg text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm font-semibold text-text flex items-center gap-1.5">
                          {dOpt.isRecommended ? <Sparkles size={13} className="text-primary" /> : null}
                          <span>{dOpt.title}</span>
                        </span>
                        {dOpt.isRecommended ? (
                          <span className="text-[11px] font-medium text-primary bg-surface px-2 py-0.5 rounded-full border border-border/70">
                            Khuyên dùng
                          </span>
                        ) : null}
                      </div>
                      <p className="font-body text-xs text-text-muted leading-relaxed">
                        {dOpt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nút hành động */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              rounded="full"
              type="button"
              onClick={() => router.push("/consultation/goals")}
              className="px-6 min-h-12 text-base font-medium select-none"
            >
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>{FIXED_LABELS.ACTION_BACK}</span>
            </Button>
            <Button
              variant="primary"
              rounded="full"
              type="button"
              onClick={handleFinish}
              className="px-8 min-h-12 text-base font-medium select-none shadow-xs"
            >
              <span>{FIXED_LABELS.ACTION_VIEW_MY_PLAN}</span>
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
