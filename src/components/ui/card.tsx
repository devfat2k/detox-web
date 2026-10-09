"use client";

import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const CardContext = createContext<boolean>(false);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Thẻ bề mặt nổi nhẹ theo DESIGN.md §5.
 * 'use client' lý do: Cần React Context để phát hiện và cảnh báo chống lồng Card trong Card.
 */
export function Card({ className, children, ref, ...props }: CardProps) {
  const isInsideCard = useContext(CardContext);

  if (process.env.NODE_ENV !== "production" && isInsideCard) {
    console.warn(
      "[Ép Xanh Chữa Lành] Cảnh báo DESIGN.md §5: Tuyệt đối không lồng Card bên trong một Card khác."
    );
  }

  return (
    <CardContext.Provider value={true}>
      <div
        ref={ref}
        data-card-root=""
        className={cn(
          "bg-surface border border-border rounded-xl p-4 sm:p-6",
          isInsideCard && "bg-transparent border-0 p-0 rounded-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}
