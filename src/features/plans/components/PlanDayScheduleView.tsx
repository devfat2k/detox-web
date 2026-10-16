"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Plan } from "@/data/plans";
import { routes } from "@/config/routes";
import { Card, Heading, DetoxBottle } from "@/components/ui";
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";

export interface PlanDayScheduleViewProps {
  plan: Plan;
  onOpenShopMessage?: () => void;
}

const BOTTLE_TYPE_LABELS: Record<string, string> = {
  smoothie: "Sinh tố xanh",
  juice: "Nước ép tươi",
  nut_milk: "Sữa hạt",
  herbal_tea: "Trà thảo mộc",
};

export function PlanDayScheduleView({
  plan,
  onOpenShopMessage,
}: PlanDayScheduleViewProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const days = plan.days ?? [];
  const totalDays = days.length;
  const currentDay = days[activeDayIndex] ?? days[0];

  const durationGuide = React.useMemo(() => {
    if (totalDays === 1) {
      return "Gợi ý trải nghiệm thanh lọc nhẹ nhàng trong 24 giờ để cơ thể làm quen với nhịp rau củ tươi.";
    }
    if (totalDays === 3) {
      return "Gợi ý thực đơn 3 ngày giúp hệ tiêu hóa được nghỉ ngơi, nhẹ bụng và giải phóng năng lượng êm ái.";
    }
    if (totalDays === 6) {
      return "Gợi ý thực đơn 6 ngày giúp tái tạo dưỡng chất chuyên sâu và nuôi dưỡng thói quen sống xanh lành mạnh.";
    }
    return `Gợi ý thực đơn ${totalDays} ngày thanh lọc nhẹ nhàng cùng nông sản tươi ép chậm mỗi sáng.`;
  }, [totalDays]);

  const handlePrev = () => {
    setActiveDayIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveDayIndex((prev) => Math.min(totalDays - 1, prev + 1));
  };

  if (!currentDay) return null;

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      {/* Header thông tin lịch trình */}
      <div className="space-y-2 border-b border-border/60 pb-5">
        <Heading level={2} size="xl" className="font-semibold text-xl sm:text-2xl text-text">
          {totalDays > 1
            ? `Lịch ngày ${currentDay.dayNumber} · ${currentDay.theme ?? ""}`
            : "Lịch 5 chai phân bổ nhịp nhàng"}
        </Heading>
        <p className="text-xs sm:text-sm text-text-muted font-body leading-relaxed max-w-2xl">
          {durationGuide}
        </p>
        <p className="text-xs text-text-muted/80 font-body leading-relaxed">
          Mỗi ngày gồm 3 chai sinh tố xanh no lâu, 1 chai nước ép bù khoáng và 1 chai sữa hạt ấm bụng cữ tối.
        </p>
      </div>

      {/* Thông tin khung giờ giao nước ép tươi */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-accent-soft/30 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4 text-primary" strokeWidth={1.75} />
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-text">
                Khung giờ giao sáng: 06:30 – 08:30
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                Giao tươi mỗi sáng
              </span>
            </div>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Nước ép được đóng thùng giữ nhiệt và giao tận nơi đầu ngày để kịp lịch làm việc của bạn.
            </p>
          </div>
        </div>
        {onOpenShopMessage ? (
          <button
            type="button"
            onClick={onOpenShopMessage}
            className="text-xs text-primary hover:underline font-medium shrink-0 pl-11 sm:pl-0 cursor-pointer"
          >
            Hỏi giờ giao & phí ship →
          </button>
        ) : (
          <div className="text-[11px] text-text-muted shrink-0 pl-11 sm:pl-0">
            Có thể hẹn giờ linh hoạt khi nhắn shop
          </div>
        )}
      </div>

      {/* Thanh chọn ngày tách biệt hoàn toàn xuống dòng riêng */}
      {totalDays > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-medium text-text-muted select-none mr-1 shrink-0">
              Chọn ngày:
            </span>
            {days.map((day, idx) => (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all duration-200 select-none cursor-pointer shrink-0 ${
                  activeDayIndex === idx
                    ? "bg-primary text-bg font-semibold shadow-2xs"
                    : "bg-surface text-text-muted hover:text-text hover:border-primary/40 border border-border"
                }`}
                aria-label={`Xem thực đơn ngày ${day.dayNumber}`}
              >
                Ngày {day.dayNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-surface shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeDayIndex === 0}
              className="p-1.5 rounded text-text-muted hover:text-text hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Ngày trước đó"
            >
              <ChevronLeft size={16} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeDayIndex === totalDays - 1}
              className="p-1.5 rounded text-text-muted hover:text-text hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Ngày tiếp theo"
            >
              <ChevronRight size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      )}

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
