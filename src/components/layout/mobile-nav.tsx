"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { NavLink } from "./nav-link";
import { ConsultationCtaButton } from "@/components/common";
import { MAIN_NAV_ITEMS } from "./constants";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

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
        className="inline-flex min-h-11 min-w-11 items-center justify-center text-text hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        {isOpen ? (
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
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
            {MAIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center min-h-11 px-4 rounded-lg font-body text-sm text-text hover:bg-bg"
                activeClassName="bg-accent-soft font-semibold text-primary"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-border">
              <ConsultationCtaButton
                size="md"
                icon="sparkles"
                className="w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                {FIXED_LABELS.CTA_CONSULTATION}
              </ConsultationCtaButton>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
