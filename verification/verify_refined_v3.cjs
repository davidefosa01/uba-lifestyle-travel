const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });

  await page.goto('http://localhost:5173/login');
  await page.waitForTimeout(1000);

  // Login
  await page.click('button:text("1")');
  await page.click('button:text("2")');
  await page.click('button:text("3")');
  await page.click('button:text("4")');
  await page.click('button:text("5")');
  await page.click('button:text("6")');

  await page.waitForURL('**/dashboard');
  console.log('On Dashboard');
  await page.screenshot({ path: 'verification/screenshots/refined_v3_dashboard.png' });

  // Enter Travel
  await page.click('text=Lifestyle Travel');
  await page.waitForURL('http://localhost:5173/');
  console.log('On Travel Home');
  await page.screenshot({ path: 'verification/screenshots/refined_v3_travel_home.png' });

  // Check back button on Travel Home
  const backBtn = await page.locator('header button span:text("arrow_back")');
  if (await backBtn.isVisible()) {
    console.log('SUCCESS: Back button visible on Travel Home');
    await backBtn.click();
    await page.waitForURL('**/dashboard');
    console.log('SUCCESS: Navigated back to Dashboard from Travel Home');
  }

  await browser.close();
})();
