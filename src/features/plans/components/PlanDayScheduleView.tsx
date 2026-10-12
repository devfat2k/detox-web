"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { routes } from "@/config/routes";
import { Card, Heading, DetoxBottle } from "@/components/ui";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface PlanDayScheduleViewProps {
  plan: Plan;
}

export function PlanDayScheduleView({ plan }: PlanDayScheduleViewProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const totalDays = plan.days.length;
  const currentDay = plan.days[activeDayIndex] ?? plan.days[0];

  const handlePrev = () => {
    setActiveDayIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveDayIndex((prev) => Math.min(totalDays - 1, prev + 1));
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      {/* Header & Bộ điều hướng ngày */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-medium text-primary tracking-wide block">
            Thực đơn mẫu trong ngày
          </span>
          <Heading level={2} size="xl" className="font-semibold text-xl text-text">
            {totalDays > 1
              ? `Lịch ngày ${currentDay.dayNumber} · ${currentDay.theme}`
              : "Lịch 5 chai nước ép phân bổ nhịp nhàng"}
          </Heading>
          <p className="text-xs text-text-muted font-body">
            Nước ép tươi ép chậm mỗi sáng, uống chậm rãi từng ngụm cách nhau 2,5 đến 3 tiếng.
          </p>
        </div>

        {/* Nút lùi/tiến ngày khi lộ trình có nhiều ngày */}
        {totalDays > 1 && (
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <div className="flex items-center gap-1 mr-1">
              {plan.days.map((day, idx) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                    activeDayIndex === idx
                      ? "bg-primary text-white"
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
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeDayIndex === totalDays - 1}
                className="p-1.5 rounded text-text-muted hover:text-text hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Ngày tiếp theo"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Danh sách 5 chai nước ép trong ngày đang chọn */}
      <div className="flex flex-col gap-3">
        {currentDay.bottles.map((item, idx) => (
          <div
            key={`${currentDay.dayNumber}-${item.time}-${idx}`}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-bg border border-border/80 hover:border-primary/40 hover:bg-surface transition-all duration-200 ease-soft hover:-translate-y-0.5 group"
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
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-heading font-semibold bg-accent-soft text-primary transition-colors duration-200 group-hover:bg-accent-soft/80">
                  {item.time}
                </span>
                <span className="font-body text-sm sm:text-base font-semibold text-text truncate">
                  {item.name}
                </span>
              </div>
              <p className="text-xs text-text-muted font-body truncate mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Link xem chi tiết giảm ưu tiên ở chân card */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-text-muted">
        <span>Gói {plan.durationDays} ngày · Tổng {plan.totalBottles} chai</span>
        <Link
          href={routes.plan(plan.id)}
          className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors font-normal"
        >
          <span>Xem lưu ý chi tiết</span>
          <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
