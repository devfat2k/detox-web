import { test, expect } from "@playwright/test";

test.describe("UI Review - Home Page", () => {
  test("loads page and captures screenshots at current viewport", async ({ page }, testInfo) => {
    await page.goto("/");

    // Verify main elements are present
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Lắng nghe cơ thể");

    const ctaButton = page.getByRole("link", { name: "Xem lộ trình của tôi" });
    await expect(ctaButton).toBeVisible();

    // Take screenshot for visual inspection
    const viewportName = testInfo.project.name;
    await page.screenshot({
      path: `tests/screenshots/home-${viewportName}.png`,
      fullPage: true,
    });
  });
});
