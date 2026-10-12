import React from "react";
import { cn } from "@/lib/utils";

export interface DisclaimerNoteProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

/**
 * Thành phần hiển thị dòng ghi chú miễn trừ trách nhiệm dùng chung.
 * Thiết kế tối giản, tinh tế, font chữ nhỏ dịu mắt.
 */
export function DisclaimerNote({
  className,
  children = "*Mọi thông tin chỉ mang tính chất tương đối và tham khảo có thể không chính xác",
  ...props
}: DisclaimerNoteProps) {
  return (
    <p
      className={cn(
        "text-xs font-body text-text-muted/80 italic leading-relaxed text-center",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
