import type { Route } from "next";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";

export interface NavItem {
  readonly href: Route;
  readonly label: string;
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { href: ROUTES.PRICING, label: FIXED_LABELS.NAV_PRICING },
  { href: ROUTES.PLANS, label: FIXED_LABELS.NAV_PLANS },
  { href: ROUTES.DRINKS, label: FIXED_LABELS.NAV_DRINKS },
  { href: ROUTES.ARTICLES, label: FIXED_LABELS.NAV_ARTICLES },
] as const;
