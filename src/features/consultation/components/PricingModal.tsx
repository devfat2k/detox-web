"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, MessageCircle } from "lucide-react";
import {
  PRICING_COMBOS,
  PRICING_FOOTNOTE,
  formatVndPrice,
} from "@/data/pricing";
import { SITE_CONFIG } from "@/config/site";
import { type PlanId } from "@/data/plans";

const DURATION_PLAN_MAP: Record<number, PlanId> = {
  1: "1-day",
  3: "3-day",
  6: "6-day",
};

export interface PricingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedDurationDays?: number;
}

export function PricingModal({
  isOpen,
  onClose,
  selectedDurationDays,
}: PricingModalProps) {
  const initialPlanId =
    (selectedDurationDays && DURATION_PLAN_MAP[selectedDurationDays]) ||
    "6-day";
  const [selectedId, setSelectedId] = useState<PlanId>(initialPlanId);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCombo =
    PRICING_COMBOS.find((c) => c.id === selectedId) || PRICING_COMBOS[2];

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-text/40 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl my-auto max-h-4xl flex flex-col bg-surface rounded-2xl border border-border shadow-2xs p-5 sm:p-7 space-y-5 animate-fade-in-scale">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng bảng giá"
          className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text hover:bg-bg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div className="space-y-1 text-center max-w-xl mx-auto pt-1">
          <h2
            id="pricing-modal-title"
            className="font-heading font-semibold text-xl sm:text-2xl text-text"
          >
            Bảng giá các combo detox nước ép tươi
          </h2>
          <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
            Quy chuẩn 5 chai mỗi ngày từ nông sản sạch ép chậm mỗi sáng. Không
            đường, không nước lọc pha loãng, không chất bảo quản.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING_COMBOS.map((combo) => {
            const isSelected = combo.id === selectedId;
            const isRecommended = selectedDurationDays
              ? combo.durationDays === selectedDurationDays
              : combo.isRecommendedDefault;
            const badgeLabel = selectedDurationDays
              ? "Gợi ý cho bạn"
              : combo.badgeText;

            return (
              <div
                key={combo.id}
                onClick={() => setSelectedId(combo.id)}
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-colors cursor-pointer ${
                  isSelected
                    ? "border-primary bg-accent-soft/30 ring-1 ring-primary/40"
                    : "border-border bg-bg/40 hover:border-border/90"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 min-h-5">
                    <span className="text-xs text-text-muted">
                      Lộ trình {combo.durationDays} ngày
                    </span>
                    {isRecommended && badgeLabel && (
                      <span className="text-[11px] font-medium text-primary bg-accent-soft/60 px-2 py-0.5 rounded-full">
                        {badgeLabel}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-base sm:text-lg text-text">
                      {combo.title}
                    </h3>
                  </div>

                  <div className="pb-3 border-b border-border/70">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-semibold text-primary tracking-tight">
                        {formatVndPrice(combo.price)}
                      </span>
                      <span className="text-xs text-text-muted">
                        / {combo.unit}
                      </span>
                    </div>
                    {combo.originalPrice && (
                      <div className="text-xs text-text-muted line-through pt-0.5">
                        {formatVndPrice(combo.originalPrice)}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-1.5 text-xs text-text-muted">
                    {[...combo.itemsSummary, ...combo.benefits].map((text) => (
                      <li key={text} className="flex items-start gap-2">
                        <Check
                          className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedId(combo.id)}
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary text-bg border-primary font-semibold"
                      : "bg-surface border-border text-text hover:bg-bg"
                  }`}
                >
                  {isSelected ? "Đã chọn" : "Chọn combo"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-accent-soft/20 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="text-sm font-semibold text-text">
              Bạn đang chọn: {currentCombo.title} (
              {formatVndPrice(currentCombo.price)})
            </p>
            <p className="text-xs text-text-muted">*{PRICING_FOOTNOTE}</p>
          </div>

          <a
            href={SITE_CONFIG.threadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-bg text-xs font-medium hover:bg-primary/90 transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Nhắn shop gói này</span>
          </a>
        </div>
      </div>
    </div>
  );

  return typeof document === "undefined"
    ? modal
    : createPortal(modal, document.body);
}
