"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { NavLink } from "./nav-link";
import { LinkButton } from "@/components/ui";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Auto-close menu on route change without triggering cascading effect renders
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Handle Escape key to close menu and restore focus to toggle button
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { href: ROUTES.CONSULTATION, label: FIXED_LABELS.NAV_CONSULTATION },
    { href: ROUTES.PLANS, label: FIXED_LABELS.NAV_PLANS },
    { href: ROUTES.DRINKS, label: FIXED_LABELS.NAV_DRINKS },
    { href: ROUTES.ARTICLES, label: FIXED_LABELS.NAV_ARTICLES },
  ];

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={
          isOpen
            ? FIXED_LABELS.MOBILE_NAV_TOGGLE_CLOSE
            : FIXED_LABELS.MOBILE_NAV_TOGGLE_OPEN
        }
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-text border border-border bg-surface hover:bg-bg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        {isOpen ? (
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div
          id="mobile-nav-menu"
          className="absolute left-0 right-0 top-full border-b border-border bg-surface p-4 shadow-none transition-all duration-fast ease-default motion-reduce:transition-none"
        >
          <nav
            aria-label={FIXED_LABELS.NAV_MAIN_LABEL}
            className="flex flex-col space-y-3"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center min-h-12 px-4 rounded-lg font-body text-base text-text hover:bg-bg"
                activeClassName="bg-accent-soft font-semibold text-primary"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-border">
              <LinkButton
                href={ROUTES.CONSULTATION}
                variant="primary"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                {FIXED_LABELS.CTA_CONSULTATION}
              </LinkButton>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
