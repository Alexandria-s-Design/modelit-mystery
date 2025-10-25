// Test boss levels and game flow
const { chromium } = require('playwright');

async function testBossLevels() {
    console.log('⚔️ Testing Boss Levels...\n');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`file://${__dirname}/modelit-story.html`);
    await page.waitForTimeout(2000);

    // Screenshot 1: Start screen
    await page.screenshot({ path: 'test-screenshots/01-start.png' });
    console.log('📸 Screenshot 1: Start screen');

    // Click continue to get to first choice
    await page.waitForTimeout(1000);
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);

    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);

    // Screenshot 2: First choice
    await page.screenshot({ path: 'test-screenshots/02-first-choice.png' });
    console.log('📸 Screenshot 2: First choice');

    // Make choices to reach Boss Level 1 (Chapter 3)
    // Choose first option in chapter 0
    await page.click('.choice-button:first-child', { force: true });
    await page.waitForTimeout(2000);

    // Continue through feedback
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(2000);

    // Navigate through chapters 1 and 2 to reach boss
    // Chapter 1
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);
    await page.click('.choice-button:first-child', { force: true });
    await page.waitForTimeout(1500);
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(2000);

    // Chapter 2
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);
    await page.click('.choice-button:first-child', { force: true });
    await page.waitForTimeout(1500);
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(2000);

    // Screenshot 3: BOSS LEVEL 1 (Chapter 3)
    await page.screenshot({ path: 'test-screenshots/03-boss1.png' });
    console.log('📸 Screenshot 3: BOSS LEVEL 1');

    // Continue through boss scenes
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1000);

    // Screenshot 4: Boss question
    await page.screenshot({ path: 'test-screenshots/04-boss1-question.png' });
    console.log('📸 Screenshot 4: Boss 1 question');

    // Test WRONG answer first - should trigger game over
    await page.click('.choice-button:first-child', { force: true });
    await page.waitForTimeout(2000);

    // Screenshot 5: Game Over screen
    await page.screenshot({ path: 'test-screenshots/05-game-over.png' });
    console.log('📸 Screenshot 5: GAME OVER screen');

    await browser.close();
    console.log('\n✅ Boss level test complete!');
    console.log('   Screenshots saved in test-screenshots/');
}

testBossLevels().catch(console.error);
