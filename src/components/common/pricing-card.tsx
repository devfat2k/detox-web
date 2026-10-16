"use client";

import React from "react";
import type { LinkProps } from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { type PricingCombo, formatVndPrice } from "@/data/pricing";
import { ROUTES } from "@/config/routes";
import { LinkButton } from "@/components/ui";

export interface PricingCardProps {
  readonly combo: PricingCombo;
  readonly mode?: "page" | "modal";
  readonly isSelected?: boolean;
  readonly onSelect?: (combo: PricingCombo) => void;
  readonly actionHref?: LinkProps<string>["href"];
}

export function PricingCard({
  combo,
  mode = "page",
  isSelected = false,
  onSelect,
  actionHref,
}: PricingCardProps) {
  const isModalMode = mode === "modal";

  const handleCardClick = () => {
    if (isModalMode && onSelect) {
      onSelect(combo);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-surface transition-all duration-300 ease-soft text-left ${
        isModalMode
          ? `cursor-pointer border ${
              isSelected
                ? "border-primary/80 ring-1 ring-primary/25 bg-accent-soft/20 shadow-xs"
                : "border-border/80 hover:border-border hover:bg-surface/90"
            }`
          : "border border-border/80 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-xs"
      }`}
    >
      <div className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-primary tracking-normal block">
            Liệu trình {combo.durationDays} ngày
          </span>
          <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text tracking-tight leading-snug">
            {combo.title}
          </h3>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary tracking-tight">
              {formatVndPrice(combo.price)}
            </span>
            <span className="text-xs text-text-muted font-body">
              / {combo.unit}
            </span>
          </div>
          {combo.originalPrice ? (
            <p className="text-xs text-text-muted/70 line-through font-body">
              Giá gốc: {formatVndPrice(combo.originalPrice)}
            </p>
          ) : null}
        </div>

        <div className="space-y-4 pt-1">
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-text">
              Khẩu phần mỗi ngày (5 chai):
            </p>
            <ul className="space-y-2 text-xs text-text-muted font-body">
              {combo.itemsSummary.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="h-4 w-4 rounded-full bg-accent-soft/70 flex items-center justify-center shrink-0">
                    <Check
                      className="w-2.5 h-2.5 text-primary"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-medium text-text">
              Cảm nhận thể trạng:
            </p>
            <ul className="space-y-2 text-xs text-text-muted font-body">
              {combo.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary/70 mt-1.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-7">
        {isModalMode ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(combo);
            }}
            className={`w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 min-h-11 cursor-pointer ${
              isSelected
                ? "bg-primary text-bg font-semibold shadow-2xs"
                : "bg-surface border border-border text-text hover:bg-accent-soft/30 hover:border-border/90"
            }`}
          >
            {isSelected ? (
              <>
                <Check
                  className="w-3.5 h-3.5 text-bg"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>Đã chọn gói này</span>
              </>
            ) : (
              <span>Chọn combo này</span>
            )}
          </button>
        ) : (
          <LinkButton
            href={actionHref ?? ROUTES.PLAN_DETAIL(combo.id)}
            variant="secondary"
            rounded="full"
            className="w-full text-xs sm:text-sm font-medium justify-center min-h-11 px-5 rounded-full hover:bg-accent-soft/40 hover:border-primary/50 hover:text-primary transition-all duration-200"
          >
            <span>Xem chi tiết thực đơn</span>
            <ArrowRight
              className="w-3.5 h-3.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </LinkButton>
        )}
      </div>
    </div>
  );
}
