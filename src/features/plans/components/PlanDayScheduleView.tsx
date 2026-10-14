"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { routes } from "@/config/routes";
import { Card, Heading, DetoxBottle } from "@/components/ui";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

export interface PlanDayScheduleViewProps {
  plan: Plan;
}

const BOTTLE_TYPE_LABELS: Record<string, string> = {
  smoothie: "Sinh tố xanh",
  juice: "Nước ép tươi",
  nut_milk: "Sữa hạt",
  herbal_tea: "Trà thảo mộc",
};

export function PlanDayScheduleView({ plan }: PlanDayScheduleViewProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const days = plan.days ?? [];
  const totalDays = days.length;
  const currentDay = days[activeDayIndex] ?? days[0];

  const handlePrev = () => {
    setActiveDayIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveDayIndex((prev) => Math.min(totalDays - 1, prev + 1));
  };

  if (!currentDay) return null;

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      {/* Header & Bộ điều hướng ngày */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-soft text-primary font-heading font-medium text-xs border border-border">
            <Sparkles size={11} strokeWidth={1.75} className="text-primary" />
            <span>Quy chuẩn 5 chai/ngày (3:1:1)</span>
          </div>
          <Heading level={2} size="xl" className="font-semibold text-xl text-text">
            {totalDays > 1
              ? `Lịch ngày ${currentDay.dayNumber} · ${currentDay.theme ?? ""}`
              : "Lịch 5 chai phân bổ nhịp nhàng"}
          </Heading>
          <p className="text-xs text-text-muted font-body leading-relaxed max-w-xl">
            Cơ cấu chuẩn: 3 Sinh tố xanh (no lâu, giàu xơ thô) + 1 Nước ép (bù khoáng) + 1 Sữa hạt hoặc Trà thảo mộc (êm bụng cữ tối).
          </p>
        </div>

        {/* Nút lùi/tiến ngày khi lộ trình có nhiều ngày */}
        {totalDays > 1 && (
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <div className="flex items-center gap-1 mr-1">
              {days.map((day, idx) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                    activeDayIndex === idx
                      ? "bg-primary text-surface"
                      : "bg-surface text-text-muted hover:text-text border border-border"
                  }`}
                  aria-label={`Xem ngày ${day.dayNumber}`}
                >
                  Ngày {day.dayNumber}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-surface">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeDayIndex === 0}
                className="p-1.5 rounded text-text-muted hover:text-text hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Ngày trước đó"
              >
                <ChevronLeft size={16} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeDayIndex === totalDays - 1}
                className="p-1.5 rounded text-text-muted hover:text-text hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Ngày tiếp theo"
              >
                <ChevronRight size={16} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Danh sách 5 chai nước ép trong ngày đang chọn */}
      <div className="flex flex-col gap-3">
        {currentDay.bottles.map((item, idx) => {
          const typeLabel = item.bottleType
            ? BOTTLE_TYPE_LABELS[item.bottleType]
            : undefined;

          return (
            <Link
              key={`${currentDay.dayNumber}-${item.time}-${idx}`}
              href={routes.drink(item.drinkSlug)}
              className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-bg border border-border/80 hover:border-primary/40 hover:bg-surface transition-all duration-200 ease-soft hover:-translate-y-0.5 group"
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                <DetoxBottle
                  size="sm"
                  color={item.color}
                  level={item.level}
                  label={item.name}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-heading font-semibold bg-accent-soft text-primary transition-colors duration-200 group-hover:bg-accent-soft/80">
                    {item.time}
                  </span>
                  {item.slotName && (
                    <span className="px-2 py-0.5 rounded text-xs font-heading text-text-muted bg-surface border border-border">
                      {item.slotName}
                    </span>
                  )}
                  {typeLabel && (
                    <span className="text-xs font-heading text-primary/80 hidden sm:inline-block">
                      · {typeLabel}
                    </span>
                  )}
                  <span className="font-body text-sm sm:text-base font-semibold text-text group-hover:text-primary transition-colors truncate">
                    {item.name}
                  </span>
                </div>
                <p className="text-xs text-text-muted font-body truncate mt-1">
                  {item.desc}
                </p>
              </div>
              <div className="shrink-0 text-text-muted group-hover:text-primary transition-colors pr-1">
                <ArrowRight size={14} strokeWidth={1.75} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Thông điệp khuyên dùng & Chân card */}
      <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-muted">
        <p className="font-body">
          Gói {plan.durationDays} ngày · Tổng {plan.totalBottles} chai · Nên dùng liên tục để đạt cảm giác nhẹ nhõm tốt nhất.
        </p>
        <Link
          href={routes.plan(plan.id)}
          className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors font-normal self-start sm:self-auto"
        >
          <span>Xem lưu ý chi tiết</span>
          <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

