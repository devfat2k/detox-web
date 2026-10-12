import React from "react";
import Link, { type LinkProps } from "next/link";
import { ExternalLink } from "lucide-react";
import { FIXED_LABELS } from "@/config/copy";
import { buttonVariants, type ButtonVariant, type ButtonRounded } from "./button";

export interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: LinkProps<string>["href"];
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  isExternal?: boolean;
  showExternalIcon?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * Nút liên kết dùng next/link hoặc thẻ <a> cho liên kết ngoài với cùng giao diện và tap-target như Button.
 * Server Component mặc định.
 */
export function LinkButton({
  href,
  variant = "primary",
  rounded,
  className,
  children,
  isExternal,
  showExternalIcon = true,
  ref,
  ...props
}: LinkButtonProps) {
  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
  const isExt =
    isExternal ??
    (hrefStr.startsWith("http://") ||
      hrefStr.startsWith("https://") ||
      hrefStr.startsWith("//"));

  const content = (
    <>
      {children}
      {isExt ? (
        <>
          <span className="sr-only"> ({FIXED_LABELS.OPEN_IN_NEW_TAB})</span>
          {showExternalIcon ? (
            <ExternalLink
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0"
            />
          ) : null}
        </>
      ) : null}
    </>
  );

  if (isExt) {
    return (
      <a
        ref={ref}
        href={hrefStr}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant, rounded, className })}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={buttonVariants({ variant, rounded, className })}
      {...props}
    >
      {content}
    </Link>
  );
}
