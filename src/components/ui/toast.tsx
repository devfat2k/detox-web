"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  readonly isOpen: boolean;
  readonly message: string;
  readonly onClose: () => void;
  readonly duration?: number;
  readonly className?: string;
}

export function Toast({
  isOpen,
  message,
  onClose,
  duration = 3500,
  className,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-[60] max-w-md mx-auto sm:mx-0 p-4 rounded-2xl bg-surface border border-border shadow-2xs flex items-start gap-3 animate-fade-in",
        className
      )}
    >
      <div className="w-6 h-6 rounded-full bg-accent-soft flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
      </div>
      <p className="font-body text-xs sm:text-sm text-text leading-relaxed flex-1">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng thông báo"
        className="p-1 rounded-full text-text-muted hover:text-text hover:bg-bg transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-4 h-4" strokeWidth={1.75} />
      </button>
    </div>
  );

  return typeof document === "undefined"
    ? content
    : createPortal(content, document.body);
}
