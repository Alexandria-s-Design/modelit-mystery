// Quick manual test
const { chromium } = require('playwright');

async function quickTest() {
    console.log('🚀 Quick test starting...\n');

    const browser = await chromium.launch({ headless: false }); // Launch visible browser
    const page = await browser.newPage();

    await page.goto(`file://${__dirname}/modelit-story.html`);

    console.log('⏳ Waiting 5 seconds for page to load...');
    await page.waitForTimeout(5000);

    // Take screenshot
    await page.screenshot({ path: 'test-screenshots/quick-test.png', fullPage: true });
    console.log('📸 Screenshot saved!');

    // Check what's on the page
    const html = await page.content();
    console.log('Page title:', await page.title());
    console.log('Page loaded:', html.length, 'bytes');

    // Don't close - keep browser open for manual inspection
    console.log('\n✅ Browser staying open for inspection...');
    console.log('Press Ctrl+C to close when done.');
}

quickTest().catch(console.error);
