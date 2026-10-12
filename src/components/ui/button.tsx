import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonRounded = "default" | "full" | "lg" | "xl" | "2xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  ref?: React.Ref<HTMLButtonElement>;
}

export function buttonVariants({
  variant = "primary",
  rounded,
  className,
}: {
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  className?: string;
}): string {
  const hasRoundedInClass = className && /\brounded(-\w+)?\b/.test(className);

  let radiusClass = "";
  if (rounded === "full") {
    radiusClass = "rounded-full";
  } else if (rounded === "2xl") {
    radiusClass = "rounded-2xl";
  } else if (rounded === "xl") {
    radiusClass = "rounded-xl";
  } else if (rounded === "lg") {
    radiusClass = "rounded-lg";
  } else if (!hasRoundedInClass) {
    radiusClass = "rounded-full";
  }

  const baseClasses =
    "inline-flex items-center justify-center font-body font-medium text-base transition-all duration-200 ease-soft active:scale-[0.98] min-h-12 px-6 py-3 gap-2 select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary text-bg hover:opacity-90 active:opacity-100",
    secondary:
      "bg-surface text-text border border-border hover:bg-bg active:bg-accent-soft",
    ghost: "bg-transparent text-text hover:bg-accent-soft/50 active:bg-accent-soft px-4",
  };

  return cn(baseClasses, radiusClass, variantClasses[variant], className);
}

/**
 * Server Component mặc định.
 * React 19: `ref` truyền thẳng như prop, không dùng `forwardRef`.
 */
export function Button({
  variant = "primary",
  rounded,
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
      className={buttonVariants({ variant, rounded, className })}
      {...props}
    >
      {children}
    </button>
  );
}
