"use client";

import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Check, Copy, MessageCircle, ClipboardList } from "lucide-react";
import {
  type ThreadsMessageVariantId,
  THREADS_MESSAGE_VARIANTS,
} from "../constants/threads-message";
import { buildThreadsMessage } from "../utils/threads-message.utils";
import { SITE_CONFIG } from "@/config/site";
import { Toast } from "@/components/ui";

export interface ThreadsMessageModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly name?: string | null;
  readonly heightCm?: number | null;
  readonly weightKg?: number | null;
  readonly bmi?: number | null;
  readonly planTitle: string;
  readonly durationDays?: number;
  readonly totalBottles?: number;
  readonly goalsSummary: string;
  readonly allergies?: readonly string[] | null;
  readonly threadsUrl?: string;
}

export function ThreadsMessageModal({
  isOpen,
  onClose,
  name,
  heightCm,
  weightKg,
  bmi,
  planTitle,
  durationDays,
  totalBottles,
  goalsSummary,
  allergies,
  threadsUrl = SITE_CONFIG.threadsUrl,
}: ThreadsMessageModalProps) {
  const [selectedVariantId, setSelectedVariantId] =
    useState<ThreadsMessageVariantId>("weight_loss");
  const [includeMetrics, setIncludeMetrics] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const currentMessage = useMemo(() => {
    return buildThreadsMessage({
      variantId: selectedVariantId,
      includeMetrics,
      name,
      heightCm,
      weightKg,
      planTitle,
      goalsSummary,
      allergies,
    });
  }, [
    selectedVariantId,
    includeMetrics,
    name,
    heightCm,
    weightKg,
    planTitle,
    goalsSummary,
    allergies,
  ]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentMessage);
      setCopied(true);
      setIsToastOpen(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenThreads = async () => {
    await handleCopy();
    window.open(threadsUrl, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  const hasMetricsData =
    typeof heightCm === "number" && typeof weightKg === "number";
  const bottleCount = totalBottles ?? (durationDays ? durationDays * 5 : undefined);

  const modal = (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="threads-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-text/40 backdrop-blur-md overflow-y-auto animate-fade-in"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="relative w-full max-w-2xl my-auto max-h-[90vh] overflow-y-auto flex flex-col bg-surface rounded-2xl border border-border shadow-2xs p-5 sm:p-6 space-y-4 animate-fade-in-scale">
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text hover:bg-bg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>

          <div className="space-y-1 text-center sm:text-left pr-8">
            <h2
              id="threads-modal-title"
              className="font-heading font-semibold text-lg sm:text-xl text-text"
            >
              Soạn tin nhắn gửi shop
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
              Thông tin tư vấn của bạn đã được chuẩn bị sẵn kèm các mẫu câu hỏi thường gặp để gửi quán qua Threads.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-accent-soft/20 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-primary">
              <ClipboardList className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Tóm tắt tư vấn của bạn</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text">
              <div>
                <span className="text-text-muted">Lộ trình: </span>
                <span className="font-medium">
                  {planTitle}
                  {durationDays ? ` (${durationDays} ngày${bottleCount ? ` · ${bottleCount} chai` : ""})` : ""}
                </span>
              </div>
              {hasMetricsData && (
                <div>
                  <span className="text-text-muted">Thể trạng: </span>
                  <span className="font-medium">
                    {heightCm}cm · {weightKg}kg
                    {typeof bmi === "number" ? ` (BMI: ${bmi.toFixed(1)})` : ""}
                  </span>
                </div>
              )}
              {goalsSummary && (
                <div>
                  <span className="text-text-muted">Mục tiêu: </span>
                  <span className="font-medium">{goalsSummary}</span>
                </div>
              )}
              <div>
                <span className="text-text-muted">Dị ứng: </span>
                <span className="font-medium">
                  {allergies && allergies.length > 0 ? allergies.join(", ") : "Không có tiền sử dị ứng"}
                </span>
              </div>
            </div>

            {hasMetricsData && (
              <div className="pt-1.5 border-t border-border/60">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={includeMetrics}
                  onClick={() => setIncludeMetrics((prev) => !prev)}
                  className="flex items-center gap-2 text-left text-xs text-text cursor-pointer select-none group"
                >
                  <span
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                      includeMetrics
                        ? "bg-primary border-primary text-bg"
                        : "bg-surface border-border group-hover:border-primary/60"
                    }`}
                  >
                    {includeMetrics && (
                      <Check className="w-3 h-3 text-bg" strokeWidth={2.5} />
                    )}
                  </span>
                  <span className="text-text-muted group-hover:text-text transition-colors">
                    Kèm thông số thể trạng ({heightCm}cm / {weightKg}kg) vào nội dung tin nhắn
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-text-muted">
                Chọn chủ đề câu hỏi mẫu ({THREADS_MESSAGE_VARIANTS.length} chủ đề):
              </label>
              <span className="text-[11px] text-text-muted hidden sm:inline">
                Cuộn để xem thêm
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 sm:max-h-60 overflow-y-auto pr-1">
              {THREADS_MESSAGE_VARIANTS.map((variant) => {
                const isSelected = variant.id === selectedVariantId;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`text-left p-3 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-1 ${
                      isSelected
                        ? "border-primary bg-accent-soft/30 ring-1 ring-primary/40"
                        : "border-border bg-bg/40 hover:border-border/90"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text">
                        {variant.shortLabel}
                      </span>
                      {isSelected && (
                        <Check
                          className="w-3.5 h-3.5 text-primary shrink-0"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                    <span className="text-[11px] text-text-muted leading-snug line-clamp-1">
                      {variant.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-medium text-text-muted">
              Nội dung tin nhắn xem trước:
            </label>
            <div className="p-3.5 rounded-xl border border-border bg-bg/50 text-xs sm:text-sm text-text leading-relaxed whitespace-pre-wrap font-body selection:bg-accent-soft">
              {currentMessage}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text text-xs sm:text-sm font-medium hover:bg-bg active:scale-95 transition-all cursor-pointer min-h-11"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-primary" strokeWidth={1.75} />
                  <span>Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
                  <span>Sao chép tin nhắn</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenThreads}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-bg text-xs sm:text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all cursor-pointer min-h-11"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
              <span>Mở threads gửi ngay</span>
            </button>
          </div>
        </div>
      </div>

      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message="Đã sao chép, bạn chỉ cần paste vào khung tin nhắn shop sẽ tư vấn ngay nhé"
      />
    </>
  );

  return typeof document === "undefined"
    ? modal
    : createPortal(modal, document.body);
}
