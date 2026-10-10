import React from "react";
import { cn } from "@/lib/utils";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "xs" | "sm" | "base" | "xl" | "2xl" | "3xl";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  ref?: React.Ref<HTMLHeadingElement>;
}

const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "base",
  5: "sm",
  6: "xs",
};

const sizeClasses: Record<HeadingSize, string> = {
  xs: "text-xs font-medium",
  sm: "text-sm font-medium",
  base: "text-base font-medium",
  xl: "text-xl font-medium",
  "2xl": "text-2xl font-semibold tracking-tight",
  "3xl": "text-3xl font-semibold tracking-tight",
};

/**
 * Tiêu đề theo thang chữ thanh mảnh Be Vietnam Pro.
 * Server Component mặc định.
 */
export function Heading({
  level = 2,
  size,
  className,
  children,
  ref,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const resolvedSize = size ?? defaultSizes[level];

  return (
    <Tag
      ref={ref}
      className={cn(
        "font-heading text-text",
        sizeClasses[resolvedSize],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
