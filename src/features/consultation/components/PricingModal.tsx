"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle } from "lucide-react";
import {
  PRICING_COMBOS,
  PRICING_FOOTNOTE,
  formatVndPrice,
} from "@/data/pricing";
import { SITE_CONFIG } from "@/config/site";
import { type PlanId } from "@/data/plans";
import { PricingCard } from "@/components/common";

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
      <div className="relative w-full max-w-4xl my-auto max-h-4xl flex flex-col bg-surface rounded-3xl border border-border shadow-2xs p-5 sm:p-8 space-y-6 animate-fade-in-scale">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng bảng giá"
          className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text hover:bg-bg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div className="space-y-1.5 text-center max-w-xl mx-auto pt-1">
          <h2
            id="pricing-modal-title"
            className="font-heading font-semibold text-xl sm:text-2xl text-text tracking-tight"
          >
            Bảng giá các combo detox nước ép tươi
          </h2>
          <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
            Quy chuẩn 5 chai mỗi ngày từ nông sản sạch ép chậm mỗi sáng. Không
            đường, không nước lọc pha loãng, không chất bảo quản.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING_COMBOS.map((combo) => (
            <PricingCard
              key={combo.id}
              combo={combo}
              mode="modal"
              isSelected={combo.id === selectedId}
              onSelect={(selected) => setSelectedId(selected.id)}
            />
          ))}
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-accent-soft/30 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-text">
              Bạn đang chọn:{" "}
              <span className="font-semibold text-primary">
                {currentCombo.title} ({formatVndPrice(currentCombo.price)})
              </span>
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              *{PRICING_FOOTNOTE}
            </p>
          </div>

          <a
            href={SITE_CONFIG.threadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-bg text-xs sm:text-sm font-medium hover:bg-primary/90 transition-all duration-200 shadow-2xs min-h-11 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
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
