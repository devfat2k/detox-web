import { test, expect } from "@playwright/test";

test.describe("Smoke Tests (Stage F)", () => {
  // 1. 404 Page Verification
  test("1. 404 page returns 404 status and valid navigation", async ({ page }) => {
    const response = await page.goto("/unknown-non-existent-route-404");
    expect(response?.status()).toBe(404);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Không tìm thấy trang này");

    const homeLink = page.getByRole("link", { name: "Về trang chủ" });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL("/");
  });

  // 2. Home Page: Skip Link & Single Main Landmark
  test("2. skip-link is first focusable element, Enter focuses main, exactly one main", async ({
    page,
  }) => {
    await page.goto("/");

    // Exactly one main element
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();

    // Tab into page -> skip-link receives focus
    await page.keyboard.press("Tab");
    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toBeFocused();

    // Press Enter on skip-link -> focus jumps to main#main
    await page.keyboard.press("Enter");
    const activeElementId = await page.evaluate(
      () => document.activeElement?.id
    );
    expect(activeElementId).toBe("main");
  });

  // 3. Header: Prominent CTA
  test("3. header contains prominent CTA linking to /consultation", async ({
    page,
  }) => {
    await page.goto("/");
    const siteHeader = page.locator("header").first();
    const cta = siteHeader.getByRole("link", { name: "Tư vấn lộ trình" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/consultation");
  });

  // 4. Mobile 390px: Menu Toggle, Escape key, No Horizontal Scroll
  test("4. mobile navigation interaction and no horizontal overflow", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile viewport only (390px)");
    await page.goto("/");

    // Verify no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);

    // Menu toggle button
    const menuBtn = page.getByRole("button", { name: /mở menu/i });
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");

    // Open menu
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    const menuPanel = page.locator("#mobile-nav-menu");
    await expect(menuPanel).toBeVisible();

    // Press Escape -> menu closes and returns focus to menu button
    await page.keyboard.press("Escape");
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await expect(menuBtn).toBeFocused();
  });

  // 5. Touch Targets: Minimum 48px height
  test("5. touch targets meet minimum 48px height requirement", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");

    // Header CTA
    const headerCta = page
      .locator("header")
      .first()
      .getByRole("link", { name: "Tư vấn lộ trình" });
    const ctaBox = await headerCta.boundingBox();
    expect(ctaBox).not.toBeNull();
    expect(ctaBox!.height).toBeGreaterThanOrEqual(48);

    if (isMobile) {
      // Mobile menu toggle button
      const menuBtn = page.getByRole("button", { name: /mở menu/i });
      const menuBox = await menuBtn.boundingBox();
      expect(menuBox).not.toBeNull();
      expect(menuBox!.height).toBeGreaterThanOrEqual(48);

      // Open menu and check all nav links
      await menuBtn.click();
      const navLinks = page.locator("#mobile-nav-menu a");
      const count = await navLinks.count();
      expect(count).toBeGreaterThanOrEqual(4);

      for (let i = 0; i < count; i++) {
        const linkBox = await navLinks.nth(i).boundingBox();
        expect(linkBox).not.toBeNull();
        expect(linkBox!.height).toBeGreaterThanOrEqual(48);
      }
    }
  });

  // 6. Motion Budget: prefers-reduced-motion
  test("6. respects prefers-reduced-motion without extensive animations", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile viewport only (390px)");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const menuBtn = page.getByRole("button", { name: /mở menu/i });
    await menuBtn.click();

    const menuPanel = page.locator("#mobile-nav-menu");
    await expect(menuPanel).toBeVisible();

    const transitionDuration = await menuPanel.evaluate(
      (el) => window.getComputedStyle(el).transitionDuration
    );

    const isMotionReduced =
      transitionDuration === "0s" ||
      transitionDuration === "0.00001s" ||
      transitionDuration.includes("0.01ms") ||
      parseFloat(transitionDuration) === 0;

    expect(isMotionReduced).toBe(true);
  });

  // 7. Privacy: Zero Cookies, Empty Local/Session Storage, Same-Origin Requests
  test("7. privacy verification: zero cookies, empty storage, same-origin only", async ({
    page,
    context,
  }) => {
    const thirdPartyRequests: string[] = [];

    page.on("request", (req) => {
      const url = req.url();
      if (
        !url.startsWith("http://127.0.0.1:3000") &&
        !url.startsWith("http://localhost:3000")
      ) {
        thirdPartyRequests.push(url);
      }
    });

    // Test on Home page
    await page.goto("/");
    const homeCookies = await context.cookies();
    expect(homeCookies).toHaveLength(0);

    const homeStorageEmpty = await page.evaluate(
      () => localStorage.length === 0 && sessionStorage.length === 0
    );
    expect(homeStorageEmpty).toBe(true);
    expect(thirdPartyRequests).toHaveLength(0);

    // Test on 404 page
    await page.goto("/unknown-privacy-test-route");
    const notFoundCookies = await context.cookies();
    expect(notFoundCookies).toHaveLength(0);

    const notFoundStorageEmpty = await page.evaluate(
      () => localStorage.length === 0 && sessionStorage.length === 0
    );
    expect(notFoundStorageEmpty).toBe(true);
    expect(thirdPartyRequests).toHaveLength(0);
  });

  // 8. Pure Playwright Accessibility Compliance on / and 404
  test("8. accessibility structure compliance on / and 404", async ({
    page,
  }) => {
    // Check Home page landmarks & heading hierarchy
    await page.goto("/");
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer").last()).toBeVisible();

    const homeH1 = page.locator("h1");
    await expect(homeH1).toHaveCount(1);
    await expect(homeH1).not.toBeEmpty();

    // Check 404 page structure & heading hierarchy
    await page.goto("/unknown-a11y-check-404");
    const notFoundH1 = page.locator("h1");
    await expect(notFoundH1).toHaveCount(1);
    await expect(notFoundH1).toHaveText("Không tìm thấy trang này");
  });
});
