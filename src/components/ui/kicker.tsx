import React from "react";
import { cn } from "@/lib/utils";

export interface KickerProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div";
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

/**
 * Nhãn nhỏ dẫn dắt theo cấu trúc Narrative Workflow ("01 · Thông tin cơ thể").
 * Server Component mặc định.
 */
export function Kicker({
  as: Component = "p",
  className,
  children,
  ref,
  ...props
}: KickerProps) {
  return (
    <Component
      ref={ref as unknown as React.Ref<HTMLParagraphElement>}
      className={cn(
        "font-body text-xs font-medium uppercase tracking-wider text-text-muted inline-flex items-center gap-2 select-none",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
