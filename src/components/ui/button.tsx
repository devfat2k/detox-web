import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  ref?: React.Ref<HTMLButtonElement>;
}

export function buttonVariants({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
}): string {
  const baseClasses =
    "inline-flex items-center justify-center font-body font-medium text-base rounded-lg transition-colors duration-fast min-h-12 px-6 py-3 gap-2 select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary text-bg hover:opacity-90 active:opacity-100",
    secondary:
      "bg-surface text-text border border-border hover:bg-bg active:bg-accent-soft",
    ghost: "bg-transparent text-text hover:bg-accent-soft/50 active:bg-accent-soft px-4",
  };

  return cn(baseClasses, variantClasses[variant], className);
}

/**
 * Server Component mặc định.
 * React 19: `ref` truyền thẳng như prop, không dùng `forwardRef`.
 */
export function Button({
  variant = "primary",
  className,
  children,
  ref,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {children}
    </button>
  );
}
