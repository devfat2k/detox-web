"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Check } from "lucide-react";
import { MYTHS_LIST } from "../constants/myths";
import {
  GraphicMealVsJuice,
  GraphicWaterRetention,
  GraphicFreshVsPackaged,
  GraphicPacingCycles,
  GraphicGentleRecovery,
} from "./MythGraphics";

const GRAPHIC_MAP: Record<number, React.ReactNode> = {
  1: <GraphicMealVsJuice />,
  2: <GraphicWaterRetention />,
  3: <GraphicFreshVsPackaged />,
  4: <GraphicPacingCycles />,
  5: <GraphicGentleRecovery />,
};

export function DetoxMythSlider() {
  const [activeMythIndex, setActiveMythIndex] = useState(0);

  const handlePrev = () => {
    setActiveMythIndex((prev) => (prev > 0 ? prev - 1 : MYTHS_LIST.length - 1));
  };

  const handleNext = () => {
    setActiveMythIndex((prev) => (prev < MYTHS_LIST.length - 1 ? prev + 1 : 0));
  };

  const currentMyth = MYTHS_LIST[activeMythIndex];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-primary">
            Gỡ rối băn khoăn
          </span>
          <h3 className="font-heading font-semibold text-xl text-text">
            5 hiểu lầm phổ biến khi lần đầu detox
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto select-none">
          <span className="text-xs text-text-muted bg-surface px-2.5 py-1 rounded-lg border border-border">
            {activeMythIndex + 1} / {MYTHS_LIST.length}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Xem hiểu lầm trước"
            className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text hover:text-primary hover:border-primary/50 transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Xem hiểu lầm tiếp theo"
            className="h-8 w-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text hover:text-primary hover:border-primary/50 transition-colors"
          >
            <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7 shadow-2xs space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-heading font-semibold text-lg sm:text-xl text-text leading-snug">
              &ldquo;{currentMyth.myth}&rdquo;
            </h4>

            <div className="space-y-2 pt-2 border-t border-border/80">
              <div className="flex items-center gap-2 text-primary font-heading font-medium text-sm sm:text-base">
                <CheckCircle2 size={16} strokeWidth={2} className="shrink-0 text-primary" aria-hidden="true" />
                <span>{currentMyth.realitySummary}</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                {currentMyth.explanation}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-accent-soft/30 border border-border/70 flex items-start gap-2 text-xs text-text font-body leading-relaxed">
              <Check size={14} strokeWidth={2} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <b className="font-semibold text-text">Đúc kết nhanh: </b>
                {currentMyth.keyTakeaway}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            {GRAPHIC_MAP[currentMyth.id]}
          </div>
        </div>
      </div>
    </div>
  );
}
