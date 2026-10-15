import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Khối bao căn giữa với padding ngang theo token chuẩn.
 * Server Component mặc định.
 */
export function Container({
  as: Component = "div",
  className,
  children,
  ref,
  ...props
}: ContainerProps) {
  return (
    <Component
      ref={ref}
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
