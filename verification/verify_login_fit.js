const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 } // iPhone 12/13 Pro size
  });

  await page.goto('http://localhost:5173/login');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'verification/screenshots/login_fit.png', fullPage: false });

  const viewportHeight = 844;
  const bodyHeight = await page.evaluate(() => document.documentElement.scrollHeight);

  console.log(`Viewport Height: ${viewportHeight}`);
  console.log(`Body Scroll Height: ${bodyHeight}`);

  if (bodyHeight <= viewportHeight + 1) { // 1px buffer
    console.log('SUCCESS: Login page fits within the screen height.');
  } else {
    console.log('WARNING: Login page exceeds the screen height by ' + (bodyHeight - viewportHeight) + 'px');
  }

  await browser.close();
})();
