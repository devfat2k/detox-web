import React from "react";
import Link, { type LinkProps } from "next/link";
import { buttonVariants, type ButtonVariant } from "./button";

export interface LinkButtonProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  variant?: ButtonVariant;
  ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * Nút liên kết dùng next/link với cùng giao diện và tap-target như Button.
 * Server Component mặc định. React 19: ref truyền như prop.
 */
export function LinkButton({
  variant = "primary",
  className,
  children,
  ref,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      ref={ref}
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {children}
    </Link>
  );
}
