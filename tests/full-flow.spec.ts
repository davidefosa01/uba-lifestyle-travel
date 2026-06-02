import { test, expect } from '@playwright/test';

test('Full user flow - login and book hotel', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByText('Lifestyle Travel', { exact: false }).click();
  await expect(page).toHaveURL('http://localhost:5173/');

  // Wait for listings to be visible
  await expect(page.locator('h4').first()).toBeVisible();

  // Click on the first featured listing title
  await page.locator('h4').first().click();
  await expect(page.url()).toContain('/listing/');
  await expect(page.getByText('About this place')).toBeVisible();

  // Click Book Now (Confirm Availability)
  await page.getByRole('button', { name: 'Confirm Availability' }).click();
  await expect(page).toHaveURL(/.*booking-submitted/);

  // Go to Bookings
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL('http://localhost:5173/bookings');
});

test('Role switching - Merchant', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByText('Lifestyle Travel', { exact: false }).click();

  // Switch to Merchant
  await page.getByRole('combobox').selectOption('MERCHANT');
  await expect(page.getByText('Merchant Dashboard')).toBeVisible();
});

test('Role switching - Admin', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByText('Lifestyle Travel', { exact: false }).click();

  // Switch to Admin
  await page.getByRole('combobox').selectOption('ADMIN');
  await expect(page.getByText('Admin Overview')).toBeVisible();
});

test('FlexPay Flow', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByText('Lifestyle Travel', { exact: false }).click();

  // 1. Customer books
  const firstListing = page.locator('h4').first();
  const listingName = await firstListing.innerText();
  await firstListing.click();
  await page.getByRole('button', { name: 'Confirm Availability' }).click();

  // 2. Switch to Merchant to confirm
  await page.getByRole('combobox').selectOption('MERCHANT');
  // Find the booking for the listing we just booked
  const bookingCard = page.locator('.bg-white', { hasText: listingName }).first();
  await bookingCard.getByRole('button', { name: 'Confirm' }).click();

  // 3. Switch to Customer to pay
  await page.getByRole('combobox').selectOption('CUSTOMER');
  await page.goto('http://localhost:5173/bookings');

  // Find the booking card in "My Bookings"
  const myBookingCard = page.locator('.bg-white', { hasText: listingName }).first();
  await expect(myBookingCard.getByRole('button', { name: 'Pay Now' })).toBeVisible({ timeout: 10000 });
  await myBookingCard.getByRole('button', { name: 'Pay Now' }).click();

  await expect(page.getByText('Secure Payment')).toBeVisible();

  // 4. Select FlexPay
  await page.getByText('FlexPay Installments').click();
  await page.getByRole('button', { name: 'Check Eligibility' }).click();

  // Wait for processing
  await expect(page.getByText('FlexPay Approved!')).toBeVisible({ timeout: 10000 });

  // Select 6 Months
  await page.getByRole('button', { name: '6 Mo' }).click();

  // Confirm
  await page.getByRole('button', { name: 'Confirm Installment Plan' }).click();
  await expect(page).toHaveURL('http://localhost:5173/bookings');
  await expect(myBookingCard.getByText('PAID')).toBeVisible();
});
