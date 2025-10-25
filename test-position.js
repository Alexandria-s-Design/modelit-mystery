// Test character position
const { chromium } = require('playwright');

async function testPosition() {
    console.log('🎨 Testing character position...\n');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`file://${__dirname}/modelit-story.html`);
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: 'test-screenshots/position-test.png', fullPage: false });
    console.log('📸 Screenshot saved to test-screenshots/position-test.png');

    await browser.close();
    console.log('✅ Test complete!');
}

testPosition().catch(console.error);
