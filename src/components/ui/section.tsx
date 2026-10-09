import React from "react";
import { cn } from "@/lib/utils";

export type SectionSpacing = "sm" | "md" | "lg";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  spacing?: SectionSpacing;
  ref?: React.Ref<HTMLElement>;
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-6",
  md: "py-8 sm:py-12",
  lg: "py-12 sm:py-16",
};

/**
 * Khối phân đoạn theo nhịp dọc chuẩn từ DESIGN.md.
 * Server Component mặc định.
 */
export function Section({
  as: Component = "section",
  spacing = "md",
  className,
  children,
  ref,
  ...props
}: SectionProps) {
  return (
    <Component
      ref={ref}
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
