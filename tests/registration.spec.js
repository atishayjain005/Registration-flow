import { test, expect } from '@playwright/test';
test('renders the registration entry point', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Personal Info' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
});
