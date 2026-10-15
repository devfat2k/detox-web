"use client";

import React from "react";
import { Button } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { Tag } from "lucide-react";

interface ResultPricingBannerProps {
  readonly title: string;
  readonly durationDays: number;
  readonly totalBottles?: number;
  readonly onOpenPricing: () => void;
}

export function ResultPricingBanner({
  title,
  durationDays,
  totalBottles,
  onOpenPricing,
}: ResultPricingBannerProps) {
  const bottleCount = totalBottles ?? durationDays * 5;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 shadow-2xs">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-primary block">
          {title} ({durationDays} ngày · {bottleCount} chai)
        </span>
        <p className="font-body text-xs sm:text-sm text-text-muted">
          Xem bảng giá công khai và quyền lợi các combo detox tươi của quán.
        </p>
      </div>
      <Button
        type="button"
        variant="primary"
        onClick={onOpenPricing}
        className="w-full sm:w-auto rounded-full text-xs sm:text-sm min-h-11 px-5 shrink-0 flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <Tag className="w-4 h-4" strokeWidth={1.75} />
        <span>{FIXED_LABELS.ACTION_VIEW_PRICING}</span>
      </Button>
    </div>
  );
}
