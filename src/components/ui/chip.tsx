import React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "checkbox" | "radio";
  label: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * Chip lựa chọn kiểu toggle dùng input HTML thật (checkbox/radio) ẩn bằng CSS peer selector.
 * Server Component mặc định, 100% Zero Client JS.
 */
export function Chip({
  type = "checkbox",
  label,
  className,
  disabled,
  ref,
  ...props
}: ChipProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center cursor-pointer select-none",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className="sr-only peer"
        {...props}
      />
      <span
        className={cn(
          "bg-bg border border-border text-text min-h-12 px-4 py-2.5 rounded-lg",
          "inline-flex items-center gap-2 font-body text-base transition-colors duration-fast",
          "peer-checked:bg-accent-soft peer-checked:border-primary peer-checked:font-medium",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
        )}
      >
        {label}
      </span>
    </label>
  );
}
