import React from "react";
import { cn } from "@/lib/utils";

export type BottleColor = "green" | "warm" | "soft";
export type BottleSize = "sm" | "md" | "lg" | "xl";

export interface DetoxBottleProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: BottleColor;
  size?: BottleSize;
  level?: number; // Tỷ lệ nước ép trong chai: 0 - 100%
  bubbles?: boolean;
  label?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const COLOR_CLASSES: Record<BottleColor, { liquid: string; lid: string }> = {
  green: {
    liquid: "bg-primary",
    lid: "bg-accent-subtle",
  },
  warm: {
    liquid: "bg-accent-subtle",
    lid: "bg-primary",
  },
  soft: {
    liquid: "bg-accent-soft",
    lid: "bg-accent-subtle",
  },
};

const SIZE_CLASSES: Record<
  BottleSize,
  {
    container: string;
    jar: string;
    lidTop: string;
    lidRim: string;
    border: string;
    bubbleLg: string;
    bubbleSm: string;
  }
> = {
  sm: {
    container: "w-16 h-22",
    jar: "w-12 h-16 rounded-t-lg rounded-b-xl",
    lidTop: "w-6 h-1.5 rounded-t-sm",
    lidRim: "w-8 h-2 rounded-sm",
    border: "border-[1.5px] border-text",
    bubbleLg: "w-1 h-1",
    bubbleSm: "w-0.5 h-0.5",
  },
  md: {
    container: "w-24 h-32",
    jar: "w-20 h-24 rounded-t-xl rounded-b-2xl",
    lidTop: "w-10 h-2 rounded-t-sm",
    lidRim: "w-14 h-3 rounded-sm",
    border: "border-2 border-text",
    bubbleLg: "w-1.5 h-1.5",
    bubbleSm: "w-1 h-1",
  },
  lg: {
    container: "w-36 sm:w-40 h-48 sm:h-52",
    jar: "w-28 sm:w-32 h-36 sm:h-40 rounded-t-2xl rounded-b-3xl",
    lidTop: "w-16 sm:w-18 h-3 sm:h-3.5 rounded-t-md",
    lidRim: "w-22 sm:w-24 h-4 sm:h-4.5 rounded-md",
    border: "border-[2.5px] border-text",
    bubbleLg: "w-2 h-2",
    bubbleSm: "w-1.5 h-1.5",
  },
  xl: {
    container: "w-52 sm:w-60 h-68 sm:h-76",
    jar: "w-40 sm:w-48 h-52 sm:h-60 rounded-t-3xl rounded-b-[2rem]",
    lidTop: "w-22 sm:w-26 h-4 sm:h-4.5 rounded-t-md",
    lidRim: "w-30 sm:w-36 h-5 sm:h-5.5 rounded-md",
    border: "border-[3px] border-text",
    bubbleLg: "w-2.5 h-2.5",
    bubbleSm: "w-1.5 h-1.5",
  },
};

/**
 * Component DetoxBottle dùng chung:
 * Mô phỏng minh họa chai/hũ nước ép Detox theo chuẩn DNA Hum-07 (Starter Jar).
 * - Sử dụng thuần CSS & token hệ thống, không dùng gradient blob hay thư viện ngoài.
 * - Tuân thủ WCAG accessibility (role="img", aria-label đầy đủ).
 */
export function DetoxBottle({
  color = "green",
  size = "md",
  level = 60,
  bubbles = true,
  label = "Chai nước ép tươi",
  className,
  ref,
  ...props
}: DetoxBottleProps) {
  const sizeConfig = SIZE_CLASSES[size];
  const colorConfig = COLOR_CLASSES[color];
  const clampedLevel = Math.max(0, Math.min(100, level));

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-end select-none shrink-0 relative",
        sizeConfig.container,
        className
      )}
      {...props}
    >
      {/* Nắp chai 2 tầng đặc trưng Hum-07 */}
      <div className="flex flex-col items-center shrink-0 z-10 -mb-[1px]">
        {/* Tầng chóp nắp */}
        <span
          className={cn(
            sizeConfig.lidTop,
            sizeConfig.border,
            colorConfig.lid,
            "block shadow-2xs"
          )}
          aria-hidden="true"
        />
        {/* Tầng vành nắp */}
        <span
          className={cn(
            sizeConfig.lidRim,
            sizeConfig.border,
            colorConfig.lid,
            "block shadow-2xs"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Thân chai / Hũ thủy tinh */}
      <div
        className={cn(
          "relative overflow-hidden bg-surface/80 flex items-end justify-center",
          sizeConfig.jar,
          sizeConfig.border
        )}
        aria-hidden="true"
      >
        {/* Lớp nước ép bên trong */}
        <div
          className={cn(
            "w-full transition-all duration-normal relative",
            colorConfig.liquid
          )}
          style={{ height: `${clampedLevel}%` }}
        >
          {/* Đường mặt thoáng nước ép */}
          <div className="w-full h-1 bg-surface/20" />

          {/* Bọt khí tự nhiên bên trong hũ */}
          {bubbles && clampedLevel > 20 ? (
            <>
              <span
                className={cn(
                  "absolute rounded-full bg-surface/80 right-[25%] bottom-[40%]",
                  sizeConfig.bubbleLg
                )}
              />
              <span
                className={cn(
                  "absolute rounded-full bg-surface/70 left-[30%] bottom-[60%]",
                  sizeConfig.bubbleSm
                )}
              />
            </>
          ) : null}
        </div>

        {/* Vệt bóng phản chiếu thân kính nhẹ nhàng */}
        <div className="absolute inset-y-2 left-2 w-1 rounded-full bg-surface/30 pointer-events-none" />
      </div>
    </div>
  );
}
