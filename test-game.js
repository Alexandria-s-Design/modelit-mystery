// Headless browser testing for ModelIt! game
const { chromium } = require('playwright');
const fs = require('fs');

async function testGame() {
    console.log('🎮 Starting ModelIt! game tests...\n');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to game
    await page.goto(`file://${__dirname}/game-final.html`);

    // Test 1: Check if images load
    console.log('📸 Test 1: Checking if images load...');
    await page.waitForTimeout(2000);

    const sceneImg = await page.$('#scene-img');
    const bgImage = await sceneImg.evaluate(el => window.getComputedStyle(el).backgroundImage);

    if (bgImage && bgImage !== 'none') {
        console.log('✅ Images loaded successfully');
        console.log(`   Background: ${bgImage.substring(0, 50)}...`);
    } else {
        console.log('❌ Images failed to load');
    }

    // Test 2: Check dialogue text
    console.log('\n💬 Test 2: Checking dialogue text...');
    const dialogueText = await page.$eval('#dialogue-text', el => el.textContent);
    console.log(`   Dialogue: "${dialogueText}"`);

    if (dialogueText.includes('Dr. Maya')) {
        console.log('✅ Dr. Maya mentioned in dialogue');
    }

    // Test 3: Take screenshot
    console.log('\n📷 Test 3: Taking screenshot...');
    await page.screenshot({ path: 'test-screenshots/scene-1.png' });
    console.log('✅ Screenshot saved to test-screenshots/scene-1.png');

    // Test 4: Click continue button
    console.log('\n🖱️  Test 4: Testing continue button...');
    await page.click('.continue-hint');
    await page.waitForTimeout(1000);

    const dialogueText2 = await page.$eval('#dialogue-text', el => el.textContent);
    console.log(`   New dialogue: "${dialogueText2}"`);

    if (dialogueText2 !== dialogueText) {
        console.log('✅ Continue button works - dialogue changed');
    } else {
        console.log('❌ Continue button failed - dialogue same');
    }

    // Take screenshot of scene 2
    await page.screenshot({ path: 'test-screenshots/scene-2.png' });

    // Test 5: Click continue again
    console.log('\n🖱️  Test 5: Advancing to scene 3...');
    await page.click('.continue-hint');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-screenshots/scene-3.png' });

    // Test 6: Transition to gameplay
    console.log('\n🎯 Test 6: Testing transition to gameplay...');
    await page.click('.continue-hint');
    await page.waitForTimeout(1000);

    const gameplayVisible = await page.isVisible('#gameplay-panel');
    const storyVisible = await page.isVisible('#story-panel');

    if (gameplayVisible && !storyVisible) {
        console.log('✅ Successfully transitioned to gameplay');
    } else {
        console.log('❌ Transition failed');
        console.log(`   Gameplay visible: ${gameplayVisible}`);
        console.log(`   Story visible: ${storyVisible}`);
    }

    await page.screenshot({ path: 'test-screenshots/gameplay.png' });

    // Test 7: Check for console errors
    console.log('\n🐛 Test 7: Checking for console errors...');
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    if (errors.length === 0) {
        console.log('✅ No console errors detected');
    } else {
        console.log(`❌ Found ${errors.length} console errors:`);
        errors.forEach(err => console.log(`   - ${err}`));
    }

    console.log('\n✨ Testing complete!\n');

    await browser.close();
}

// Create screenshots directory
if (!fs.existsSync('test-screenshots')) {
    fs.mkdirSync('test-screenshots');
}

testGame().catch(console.error);
