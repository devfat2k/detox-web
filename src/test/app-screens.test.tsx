import React from "react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Bricolage_Grotesque: () => ({
    variable: "--font-bricolage",
    className: "font-bricolage",
  }),
  Be_Vietnam_Pro: () => ({
    variable: "--font-be-vietnam-pro",
    className: "font-be-vietnam-pro",
  }),
}));

import { renderToStaticMarkup } from "react-dom/server";
import NotFound from "@/app/not-found";
import ErrorPage from "@/app/error";
import GlobalError from "@/app/global-error";
import Loading from "@/app/loading";
import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";

describe("System Screens (Stage C)", () => {
  describe("NotFound", () => {
    it("renders brand name, 404 title, description, and back-to-home button", () => {
      const html = renderToStaticMarkup(<NotFound />);
      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(FIXED_LABELS.NOT_FOUND_TITLE);
      expect(html).toContain(FIXED_LABELS.NOT_FOUND_DESCRIPTION);
      expect(html).toContain(FIXED_LABELS.ACTION_BACK_TO_HOME);
      expect(html).toContain('href="/"');
    });
  });

  describe("ErrorPage", () => {
    it("renders brand name, error title, description, retry button, and does not leak raw error details", () => {
      const resetFn = vi.fn();
      const rawError = new Error("Sensitive internal error details");
      const html = renderToStaticMarkup(
        <ErrorPage error={rawError} reset={resetFn} />
      );

      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(FIXED_LABELS.ERROR_TITLE);
      expect(html).toContain(FIXED_LABELS.ERROR_DESCRIPTION);
      expect(html).toContain(FIXED_LABELS.ACTION_RETRY);
      expect(html).toContain(FIXED_LABELS.ACTION_BACK_TO_HOME);
      expect(html).not.toContain("Sensitive internal error details");
    });
  });

  describe("GlobalError", () => {
    it("renders html, body, brand name, error title, and retry button", () => {
      const resetFn = vi.fn();
      const html = renderToStaticMarkup(
        <GlobalError error={new Error("Root layout crash")} reset={resetFn} />
      );

      expect(html).toContain('<html lang="vi"');
      expect(html).toContain("<body");
      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain(FIXED_LABELS.ERROR_TITLE);
      expect(html).toContain(FIXED_LABELS.ACTION_RETRY);
    });
  });

  describe("Loading", () => {
    it("renders status role, sr-only loading text, and static skeleton placeholders", () => {
      const html = renderToStaticMarkup(<Loading />);

      expect(html).toContain(SITE_CONFIG.name);
      expect(html).toContain('role="status"');
      expect(html).toContain("sr-only");
      expect(html).toContain(FIXED_LABELS.LOADING_TEXT);
      expect(html).toContain("bg-accent-soft/60");
    });
  });
});
