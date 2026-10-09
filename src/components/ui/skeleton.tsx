import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Khối giữ chỗ tĩnh theo token màu của DESIGN.md.
 * Tuyệt đối KHÔNG shimmer, KHÔNG pulse, KHÔNG lặp chuyển động.
 * Server Component mặc định.
 */
export function Skeleton({ className, ref, ...props }: SkeletonProps) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "bg-accent-soft/60 border border-border rounded-lg select-none",
        className
      )}
      {...props}
    />
  );
}
