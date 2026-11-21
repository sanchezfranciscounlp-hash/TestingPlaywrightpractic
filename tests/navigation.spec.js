const { test, expect } = require('@playwright/test');

test('API link opens the Playwright API reference', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'API', exact: true }).click();

  await expect(page).toHaveURL(/\/docs\/api\/class-playwright\/?$/);
  await expect(
    page.getByRole('heading', { name: 'Playwright Library', exact: true })
  ).toBeVisible();
});
