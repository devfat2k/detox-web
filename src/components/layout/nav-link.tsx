"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: LinkProps["href"];
  activeClassName?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * Liên kết điều hướng cấp client hỗ trợ gán aria-current="page".
 * Client Component kích thước tối thiểu để giữ Header/Footer là Server Components.
 */
export function NavLink({
  href,
  className,
  activeClassName = "text-primary font-medium",
  children,
  ref,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";

  const isActive =
    hrefStr === "/" ? pathname === "/" : pathname.startsWith(hrefStr);

  return (
    <Link
      ref={ref}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "transition-colors duration-fast",
        isActive && activeClassName,
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
