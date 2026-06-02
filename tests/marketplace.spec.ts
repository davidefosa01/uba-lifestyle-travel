import { test, expect } from '@playwright/test';

test.describe('UBA Lifestyle Travel Marketplace', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('full customer booking and payment journey with FlexPay', async ({ page }) => {
    await expect(page.getByText('Discover your next escape')).toBeVisible();
    await page.getByText('The Azure Sanctuary Resort').first().click();
    await page.getByRole('button', { name: 'Confirm Availability' }).click();
    await page.getByRole('button', { name: 'View My Bookings' }).click();

    const bookingRow = page.locator('div.bg-white.rounded-2xl').first();
    await expect(bookingRow.getByText('PENDING')).toBeVisible();

    await page.getByRole('combobox').selectOption('MERCHANT');
    await page.getByRole('button', { name: 'Confirm' }).first().click();

    await page.getByRole('combobox').selectOption('CUSTOMER');
    await page.getByRole('button', { name: 'Bookings' }).click();
    await page.getByRole('button', { name: 'Pay Now' }).click();

    await page.getByText('FlexPay Installments').click();
    await page.getByRole('button', { name: 'Check Eligibility' }).click();

    await expect(page.getByText('FlexPay Approved!')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: '6 Months' }).click();
    await page.getByRole('button', { name: 'Confirm FlexPay Schedule' }).click();

    await expect(page.getByText('PAID')).toBeVisible();
  });
});
