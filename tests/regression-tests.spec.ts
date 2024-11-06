import { test } from '@playwright/test';
import { chromium } from 'playwright';

const url = 'https://demosanddonnuts.online';

test('has certificate', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: false // Ensure SSL errors are not ignored
  });
  const page = await context.newPage();

  try {
    await page.goto(url);
    console.log('Website has a valid certificate.');
    
    // Capture a screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log('Screenshot saved as screenshot.png');
        
  } catch (error) {
    console.error('Failed to load the website:', error);
    throw new Error('Website does not have a valid certificate.');
  } finally {
    await browser.close();
  }
});