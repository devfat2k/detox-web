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
import { MAIN_NAV_ITEMS } from "./constants";

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

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-fast select-none pt-[env(safe-area-inset-top)]">
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? "max-w-6xl rounded-full bg-surface px-5 sm:px-7 h-16 sm:h-18 flex items-center justify-between mt-3 border border-border/80 shadow-2xs"
            : "max-w-6xl px-6 py-4 sm:py-5 flex items-center justify-between border-none"
        }`}
      >
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2.5 sm:gap-3 text-primary hover:text-primary/85 transition-colors duration-fast shrink-0 group"
        >
          <div className="relative shrink-0 h-12 w-12 sm:h-14 sm:w-14 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt={SITE_CONFIG.name}
              fill
              sizes="(max-width: 640px) 44px, 52px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-lg sm:text-xl font-heading font-semibold tracking-tight text-primary">
            <span className="sm:hidden">Ép Xanh</span>
            <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 lg:gap-8">
          <nav
            aria-label={FIXED_LABELS.NAV_MAIN_LABEL}
            className="hidden md:flex items-center gap-5 lg:gap-7"
          >
            {MAIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="font-body text-sm sm:text-base text-text-muted hover:text-text py-1.5 select-none font-medium transition-colors"
                activeClassName="text-primary font-semibold"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center ">
            <LinkButton
              href={ROUTES.CONSULTATION}
              variant="primary"
              className="rounded-full text-md sm:text-md font-semibold select-none transition-all duration-300 ease-soft whitespace-nowrap shrink-0 px-5 sm:px-7 py-2.5 sm:py-3 min-h-11 sm:min-h-12 flex items-center gap-2 shadow-sm hover:shadow-md ring-2 ring-primary/25 hover:ring-primary/50 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
            >
              <span>{FIXED_LABELS.CTA_CONSULTATION}</span>
            </LinkButton>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
