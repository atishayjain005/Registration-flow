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
async function enterDetails(page) {
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Demo Tester');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('demo@example.com');
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('+1 202 555 0100');
  await page.getByRole('button', { name: 'Next Step' }).click();
}


test('requires a plan and preserves billing changes across navigation', async ({ page }) => {
  await page.goto('/');
  await enterDetails(page);
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByRole('alert')).toHaveText('Choose a plan to continue.');
  await page.getByRole('radio', { name: /Arcade/ }).check();
  await page.getByRole('checkbox', { name: 'Yearly billing' }).check();
  await expect(page.getByText('$90/yr', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await page.getByRole('button', { name: 'Go Back' }).click();
  await expect(page.getByRole('checkbox', { name: 'Yearly billing' })).toBeChecked();
  await expect(page.getByRole('radio', { name: /Arcade/ })).toBeChecked();
  await page.getByRole('checkbox', { name: 'Yearly billing' }).uncheck();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByRole('heading', { name: 'Arcade (monthly)' })).toBeVisible();
});

test('reviews prices, completes the demo, and clears details on restart', async ({ page }) => {
  await page.goto('/');
  await enterDetails(page);
  await page.getByRole('radio', { name: /Advanced/ }).check();
  await page.getByRole('checkbox', { name: 'Yearly billing' }).check();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await page.getByRole('checkbox', { name: /Online service/ }).check();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByText('Total: $121/yr', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Go Back' }).click();
  await page.getByRole('checkbox', { name: /Online service/ }).uncheck();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByText('Total: $120/yr', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Demo complete' })).toBeVisible();
  await page.getByRole('button', { name: 'Start again' }).click();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toHaveValue('');
  await expect(page.getByRole('textbox', { name: 'Email Address' })).toHaveValue('');
  await expect(page.getByRole('textbox', { name: 'Phone Number' })).toHaveValue('');
});
