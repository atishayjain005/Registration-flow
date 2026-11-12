import { test, expect } from '@playwright/test';
test('renders the registration entry point', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Personal Info' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
});

test('rejects empty and malformed details, then accepts keyboard submission', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('   ');
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByText('Name is required.', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeFocused();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Demo Tester');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('invalid');
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('abc');
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  await expect(page.getByText('Enter a phone number with 7–15 digits.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('demo@example.com');
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('+1 202 555 0100');
  await page.getByRole('textbox', { name: 'Phone Number' }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Select your plan' })).toBeVisible();
});
