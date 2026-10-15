"use client";

import React from "react";
import { Button, LinkButton, type LinkButtonProps } from "@/components/ui";
import { FIXED_LABELS } from "@/config/copy";
import { Tag } from "lucide-react";

interface ResultActionBarProps {
  readonly copied: boolean;
  readonly threadsUrl?: LinkButtonProps["href"];
  readonly onOpenPricing: () => void;
  readonly onCopySummary: () => void;
  readonly onOpenThreadsModal?: () => void;
}

export function ResultActionBar({
  copied,
  threadsUrl,
  onOpenPricing,
  onCopySummary,
  onOpenThreadsModal,
}: ResultActionBarProps) {
  return (
    <div className="p-6 rounded-3xl bg-accent-soft/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-slow">
      <div className="space-y-1 text-center sm:text-left">
        <h3 className="font-heading font-semibold text-base text-text">
          Bạn muốn trao đổi thêm cùng quán?
        </h3>
        <p className="font-body text-xs text-text-muted">
          Nhắn tin trực tiếp tới Threads của Ép Xanh Chữa Lành để được tư vấn
          theo ngày.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
        <Button
          type="button"
          variant="secondary"
          onClick={onOpenPricing}
          className="rounded-full text-sm min-h-11 px-5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Tag className="w-4 h-4 text-primary" strokeWidth={1.75} />
          <span>{FIXED_LABELS.ACTION_VIEW_PRICING}</span>
        </Button>
        <Button
          variant="secondary"
          onClick={onOpenThreadsModal ?? onCopySummary}
          className="rounded-full text-sm min-h-11 px-5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          {copied ? "Đã sao chép ✓" : FIXED_LABELS.ACTION_COPY_SUMMARY}
        </Button>
        {onOpenThreadsModal ? (
          <Button
            type="button"
            variant="primary"
            onClick={onOpenThreadsModal}
            className="rounded-full text-sm min-h-11 px-6 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            {FIXED_LABELS.ACTION_MESSAGE_THREADS}
          </Button>
        ) : (
          <LinkButton
            href={threadsUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="rounded-full text-sm min-h-11 px-6 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            {FIXED_LABELS.ACTION_MESSAGE_THREADS}
          </LinkButton>
        )}
      </div>
    </div>
  );
}
