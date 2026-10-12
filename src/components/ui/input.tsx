import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  unit?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  label,
  error,
  unit,
  className,
  id,
  disabled,
  ref,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label ? (
        <label htmlFor={inputId} className="font-body text-sm font-medium text-text select-none">
          {label}
        </label>
      ) : null}

      <div className="relative flex items-center w-full">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            "w-full min-h-12 px-4 py-2.5 rounded-lg bg-bg border border-border text-text font-body text-base",
            "transition-all duration-200 ease-soft placeholder:text-text-muted/50",
            "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            unit && "pr-12",
            error && "border-error focus-visible:outline-error",
            className
          )}
          {...props}
        />
        {unit ? (
          <span className="absolute right-4 text-sm font-medium text-text-muted select-none pointer-events-none">
            {unit}
          </span>
        ) : null}
      </div>

      {error ? (
        <p className="font-body text-xs text-error animate-fade-in">{error}</p>
      ) : null}
    </div>
  );
}
