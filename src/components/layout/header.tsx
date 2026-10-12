"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { LinkButton } from "@/components/ui";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";

/**
 * Header chính của website - Client Component.
 * Scroll-Morph Floating Pill Header (N10 archetype theo thiết kế Bubble Hum-07):
 * - Màu chữ tên thương hiệu: Dùng màu xanh lá tươi dịu text-primary thay vì đen thô.
 * - Loại bỏ viền kẻ ngang đen 100% full-width ở vị trí đầu trang (top = 0) để tạo cảm giác liền mạch.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: ROUTES.CONSULTATION, label: FIXED_LABELS.NAV_CONSULTATION },
    { href: ROUTES.PLANS, label: FIXED_LABELS.NAV_PLANS },
    { href: ROUTES.DRINKS, label: FIXED_LABELS.NAV_DRINKS },
    { href: ROUTES.ARTICLES, label: FIXED_LABELS.NAV_ARTICLES },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-fast select-none pt-[env(safe-area-inset-top)]`}
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? "max-w-5xl rounded-full bg-surface px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between mt-4 border border-border shadow-xs"
            : "max-w-5xl px-4 py-4 sm:px-6 sm:py-6 sm:h-20 flex items-center justify-between"
        }`}
      >
        {/* Logo / Brand Name (Dùng màu xanh lá tươi dịu text-primary) */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2.5 sm:gap-3 text-primary hover:text-primary/80 transition-colors duration-fast shrink-0"
        >
          <div
            className={`relative overflow-hidden rounded-full border border-border/80 bg-surface shrink-0 transition-all duration-fast ${
              scrolled ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9 sm:h-10 sm:w-10"
            }`}
          >
            <Image
              src="/images/logo.png"
              alt={SITE_CONFIG.name}
              fill
              sizes="(max-width: 640px) 36px, 40px"
              className="object-cover"
              priority
            />
          </div>
          <span className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-primary">
            <span className="sm:hidden">Ép Xanh</span>
            <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        {/* Right Group: Nav Links + Pill CTA Button */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Desktop Navigation */}
          <nav
            aria-label={FIXED_LABELS.NAV_MAIN_LABEL}
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="font-body text-base text-text hover:text-primary py-1.5 select-none font-semibold transition-colors"
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
              className={`rounded-full text-xs sm:text-base font-semibold select-none transition-all duration-fast whitespace-nowrap shrink-0 ${
                scrolled
                  ? "px-3.5 sm:px-6 py-2 sm:py-2.5"
                  : "px-3.5 sm:px-7 py-2 sm:py-3"
              }`}
            >
              {FIXED_LABELS.CTA_CONSULTATION}
            </LinkButton>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
