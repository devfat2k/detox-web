import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { FIXED_LABELS } from "@/config/copy";
import { cn } from "@/lib/utils";

export type ConsultationCtaButtonSize = "md" | "lg";

export interface ConsultationCtaButtonProps {
  readonly size?: ConsultationCtaButtonSize;
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly icon?: "arrow" | "sparkles" | "none";
  readonly onClick?: () => void;
  readonly ariaLabel?: string;
}

export function ConsultationCtaButton({
  size = "md",
  className,
  children,
  icon = "arrow",
  onClick,
  ariaLabel,
}: ConsultationCtaButtonProps) {
  const isLarge = size === "lg";

  const sizeClasses = isLarge
    ? "min-h-14 sm:min-h-16 px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg ring-4 ring-primary/20 hover:ring-primary/35 shadow-sm hover:shadow-md"
    : "min-h-11 sm:min-h-12 px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base ring-2 ring-primary/25 hover:ring-primary/45 shadow-xs hover:shadow-sm";

  return (
    <Link
      href={ROUTES.CONSULTATION}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full select-none cursor-pointer whitespace-nowrap",
        "bg-primary text-surface font-semibold tracking-tight",
        "hover:bg-primary/95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "transition-all duration-normal ease-soft",
        "motion-reduce:transform-none motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        sizeClasses,
        className
      )}
    >
      {icon === "sparkles" ? (
        <Sparkles
          size={isLarge ? 20 : 16}
          strokeWidth={1.75}
          className="shrink-0 text-surface/90 transition-transform duration-normal ease-soft group-hover:rotate-12 motion-reduce:transform-none"
          aria-hidden="true"
        />
      ) : null}

      <span>{children ?? FIXED_LABELS.CTA_CONSULTATION}</span>

      {icon === "arrow" ? (
        <ArrowRight
          size={isLarge ? 20 : 16}
          strokeWidth={1.75}
          className="shrink-0 transition-transform duration-normal ease-soft group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}
