import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export function Select({
  label,
  error,
  className,
  id,
  disabled,
  children,
  ref,
  ...props
}: SelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label ? (
        <label htmlFor={selectId} className="font-body text-sm font-medium text-text select-none">
          {label}
        </label>
      ) : null}

      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={cn(
            "w-full min-h-12 pl-4 pr-10 py-2.5 rounded-lg bg-bg border border-border text-text font-body text-base appearance-none cursor-pointer",
            "transition-all duration-200 ease-soft",
            "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error focus-visible:outline-error",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className="absolute right-3.5 text-text-muted pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {error ? (
        <p className="font-body text-xs text-error animate-fade-in">{error}</p>
      ) : null}
    </div>
  );
}
