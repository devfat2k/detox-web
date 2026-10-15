import React from "react";
import { describe, it, expect, vi } from "vitest";

// Mock usePathname
vi.mock("next/navigation", () => ({
  usePathname: () => "/plans",
}));

import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./header";
import { Footer } from "./footer";
import { NavLink } from "./nav-link";
import { LinkButton } from "@/components/ui/link-button";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";

describe("Layout Components (Stage E)", () => {
  describe("Header", () => {
    it("renders brand name, logo image, 4 navigation links, and prominent CTA button", () => {
      const html = renderToStaticMarkup(<Header />);

      // Brand link to home with logo
      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain('href="/"');
      expect(html).toContain("logo.png");

      // 4 Navigation items
      expect(html).toContain(FIXED_LABELS.NAV_CONSULTATION);
      expect(html).toContain(FIXED_LABELS.NAV_PLANS);
      expect(html).toContain(FIXED_LABELS.NAV_DRINKS);
      expect(html).toContain(FIXED_LABELS.NAV_ABOUT);

      // Featured CTA
      expect(html).toContain(FIXED_LABELS.CTA_CONSULTATION);
      expect(html).toContain(`href="${ROUTES.CONSULTATION}"`);
    });
  });

  describe("Footer", () => {
    it("renders shop name, logo image, external Threads link, policy link, and medical disclaimer", () => {
      const html = renderToStaticMarkup(<Footer />);

      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(SITE_CONFIG.description);
      expect(html).toContain("logo.png");

      // Threads link
      expect(html).toContain(FIXED_LABELS.ACTION_MESSAGE_THREADS);
      expect(html).toContain(`href="${SITE_CONFIG.threadsUrl}"`);
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain(FIXED_LABELS.OPEN_IN_NEW_TAB);

      // Policy link
      expect(html).toContain(FIXED_LABELS.NAV_POLICY);
      expect(html).toContain(`href="${ROUTES.POLICY}"`);

      // Medical Disclaimer
      expect(html).toContain(FIXED_LABELS.MEDICAL_DISCLAIMER);
    });
  });

  describe("NavLink", () => {
    it("sets aria-current='page' when active route matches pathname", () => {
      const activeHtml = renderToStaticMarkup(
        <NavLink href="/plans">Liệu trình</NavLink>
      );
      expect(activeHtml).toContain('aria-current="page"');
      expect(activeHtml).toContain("text-primary");

      const inactiveHtml = renderToStaticMarkup(
        <NavLink href="/drinks">Thức uống</NavLink>
      );
      expect(inactiveHtml).not.toContain('aria-current="page"');
    });
  });

  describe("LinkButton (External Link Support)", () => {
    it("renders <a> tag with target=_blank, rel, and sr-only new tab text for external links", () => {
      const html = renderToStaticMarkup(
        <LinkButton href="https://threads.net/@shop">
          Nhắn Threads
        </LinkButton>
      );

      expect(html).toContain("<a");
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain(FIXED_LABELS.OPEN_IN_NEW_TAB);
      expect(html).toContain("Nhắn Threads");
    });

    it("renders regular Next.js Link for internal links", () => {
      const html = renderToStaticMarkup(
        <LinkButton href="/consultation">
          Tư vấn
        </LinkButton>
      );

      expect(html).toContain('href="/consultation"');
      expect(html).not.toContain('target="_blank"');
      expect(html).not.toContain(FIXED_LABELS.OPEN_IN_NEW_TAB);
    });
  });
});
