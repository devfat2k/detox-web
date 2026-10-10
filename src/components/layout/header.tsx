import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { Container, LinkButton } from "@/components/ui";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";

/**
 * Header chính của website - Server Component.
 * Nền đặc theo token (không blur, không bóng), sticky ở đầu trang.
 * Nút "Tư vấn lộ trình" luôn hiển thị ở mọi kích thước màn hình.
 */
export function Header() {
  const navItems = [
    { href: ROUTES.CONSULTATION, label: FIXED_LABELS.NAV_CONSULTATION },
    { href: ROUTES.PLANS, label: FIXED_LABELS.NAV_PLANS },
    { href: ROUTES.DRINKS, label: FIXED_LABELS.NAV_DRINKS },
    { href: ROUTES.ARTICLES, label: FIXED_LABELS.NAV_ARTICLES },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface pt-[env(safe-area-inset-top)]">
      <Container className="flex h-16 sm:h-20 items-center justify-between gap-4">
        {/* Logo / Brand Name */}
        <Link
          href={ROUTES.HOME}
          className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-text hover:text-primary transition-colors duration-fast select-none"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label={FIXED_LABELS.NAV_MAIN_LABEL}
          className="hidden md:flex items-center gap-6"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="font-body text-base text-text hover:text-primary py-2 select-none"
              activeClassName="text-primary font-semibold"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions & Mobile Nav */}
        <div className="flex items-center gap-3">
          <LinkButton
            href={ROUTES.CONSULTATION}
            variant="primary"
            className="text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 select-none"
          >
            {FIXED_LABELS.CTA_CONSULTATION}
          </LinkButton>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
