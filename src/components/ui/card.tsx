import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Thẻ bề mặt nổi nhẹ theo DESIGN.md §5.
 * Server Component mặc định.
 * Tự động loại bỏ viền, nền, padding thừa khi lồng nhau qua CSS selector [data-card] [data-card].
 */
export function Card({ className, children, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      data-card=""
      className={cn(
        "bg-surface border border-border rounded-xl p-4 sm:p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
