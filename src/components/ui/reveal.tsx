"use client";

import React, { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: React.ReactNode;
  delay?: number;
  className?: string;
  ref?: React.Ref<HTMLElement>;
}

/**
 * Hiệu ứng xuất hiện khi cuộn màn hình bằng IntersectionObserver (chạy đúng 1 lần).
 * Chỉ dùng transform và opacity, thời lượng 300ms với easing mềm.
 * Tôn trọng hoàn toàn `prefers-reduced-motion` (tắt hẳn chuyển dịch qua CSS motion-reduce).
 */
export function Reveal({
  as: Component = "div",
  children,
  delay = 0,
  className,
  ref: externalRef,
  style,
  ...props
}: RevealProps) {
  const localRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const mergedRef = (node: HTMLElement | null) => {
    (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
    if (typeof externalRef === "function") {
      externalRef(node);
    } else if (externalRef && typeof externalRef === "object") {
      (externalRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  };

  return (
    <Component
      ref={mergedRef}
      className={cn(
        "duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:pointer-events-auto motion-reduce:transition-none",
        className
      )}
      style={{
        ...style,
        transitionProperty: "opacity, transform",
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
