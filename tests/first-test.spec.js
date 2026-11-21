const { test, expect } = require('@playwright/test');

test('Get started opens the installation guide', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(
    page.getByRole('heading', { name: 'Installation', exact: true })
  ).toBeVisible();
});