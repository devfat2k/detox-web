"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui";
import { routes } from "@/config/routes";
import { Pencil, RotateCcw } from "lucide-react";
import type { StepCardItem } from "../utils/result-view.utils";

interface ResultSummaryReviewProps {
  readonly stepCards: readonly StepCardItem[];
  readonly onReset: () => void;
}

export function ResultSummaryReview({
  stepCards,
  onReset,
}: ResultSummaryReviewProps) {
  const router = useRouter();

  const handleRestart = () => {
    onReset();
    router.push(routes.consultation());
  };

  return (
    <div className="animate-fade-in-slow">
      <Card className="p-5 sm:p-6 space-y-4 bg-surface border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <h2 className="font-heading font-semibold text-base sm:text-lg text-text">
              Thông tin bạn đã cung cấp
            </h2>
            <p className="font-body text-xs text-text-muted">
              Bạn có thể chọn chỉnh sửa bất kỳ bước nào mà không làm mất các
              thông tin đã điền.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-danger transition-colors self-start sm:self-auto py-1 px-2 rounded-md hover:bg-danger/10 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Làm lại từ đầu</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stepCards.map((card) => (
            <div
              key={card.step}
              className="p-3.5 rounded-xl border border-border/70 bg-bg/40 flex items-start justify-between gap-3"
            >
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-primary block">
                  {card.step}
                </span>
                <p className="text-text font-medium leading-relaxed">
                  {card.title}
                </p>
                {card.detail && (
                  <p className="text-text-muted">{card.detail}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => router.push(card.route)}
                className="shrink-0 p-1.5 text-xs font-medium text-primary hover:bg-accent-soft rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                aria-label={`Sửa ${card.step}`}
              >
                <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Sửa</span>
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
