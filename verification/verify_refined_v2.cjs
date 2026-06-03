const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });

  // 1. Verify Login Page (No DE, fits screen)
  await page.goto('http://localhost:5173/login');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/screenshots/refined_v2_login.png' });

  const loginBodyHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Login Body Height: ${loginBodyHeight}`);

  // 2. Login and verify Dashboard (fits screen, has back button)
  const buttons = await page.locator('button:text("1"), button:text("2"), button:text("3"), button:text("4"), button:text("5"), button:text("6")');
  // Just type 123456
  await page.click('button:text("1")');
  await page.click('button:text("2")');
  await page.click('button:text("3")');
  await page.click('button:text("4")');
  await page.click('button:text("5")');
  await page.click('button:text("6")');

  await page.waitForURL('**/dashboard');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/screenshots/refined_v2_dashboard.png' });

  const dashBodyHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Dashboard Body Height: ${dashBodyHeight}`);

  const backBtn = await page.locator('span:text("arrow_back")');
  if (await backBtn.isVisible()) {
    console.log('SUCCESS: Back button is visible on Dashboard.');
    await backBtn.click();
    await page.waitForURL('**/login');
    console.log('SUCCESS: Navigated back to login.');
  } else {
    console.log('FAILURE: Back button not found on Dashboard.');
  }

  await browser.close();
})();
