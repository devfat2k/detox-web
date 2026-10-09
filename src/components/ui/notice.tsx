import React from "react";
import { Info, AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type NoticeVariant = "info" | "warning" | "error";

export interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NoticeVariant;
  title?: string;
  statusLabel?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const defaultStatusLabels: Record<NoticeVariant, string> = {
  info: "Thông tin",
  warning: "Lưu ý",
  error: "Cảnh báo",
};

/**
 * Hộp thông báo, cảnh báo y tế hoặc miễn trừ trách nhiệm.
 * Thể hiện trạng thái rõ ràng bằng viền và chữ ngữ nghĩa (WCAG 1.4.1), không chỉ bằng màu sắc.
 * Server Component mặc định.
 */
export function Notice({
  variant = "info",
  title,
  statusLabel,
  className,
  children,
  ref,
  ...props
}: NoticeProps) {
  const label = statusLabel ?? defaultStatusLabels[variant];

  const variantStyles: Record<NoticeVariant, string> = {
    info: "border border-border bg-surface text-text",
    warning:
      "border-y border-r border-border border-l-4 border-l-primary bg-surface text-text",
    error:
      "border-y border-r border-border border-l-4 border-l-error bg-surface text-text",
  };

  const IconComponent =
    variant === "info"
      ? Info
      : variant === "warning"
        ? AlertCircle
        : AlertTriangle;

  return (
    <div
      ref={ref}
      role={variant === "error" ? "alert" : "region"}
      aria-label={title ?? label}
      className={cn(
        "rounded-xl p-4 sm:p-6 flex items-start gap-3",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <IconComponent
        size={20}
        strokeWidth={1.5}
        aria-hidden="true"
        className={cn(
          "shrink-0 mt-0.5",
          variant === "error" ? "text-error" : "text-primary"
        )}
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              variant === "error" ? "text-error" : "text-text-muted"
            )}
          >
            {label}
          </span>
          {title ? (
            <span className="font-heading font-semibold text-text text-base">
              {title}
            </span>
          ) : null}
        </div>
        <div className="text-text font-body text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
