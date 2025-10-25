// Test the branching story adventure
const { chromium } = require('playwright');
const fs = require('fs');

async function testStory() {
    console.log('📖 Testing ModelIt! Story Adventure...\n');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`file://${__dirname}/modelit-story.html`);
    await page.waitForTimeout(2000);

    // Test 1: Initial scene
    console.log('📸 Scene 1: The Discovery');
    await page.screenshot({ path: 'test-screenshots/story-scene-1.png', fullPage: true });

    const dialogue = await page.$eval('.dialogue-text', el => el.textContent);
    console.log(`   ✅ Dialogue: "${dialogue.substring(0, 60)}..."`);

    // Test 2: Click continue
    console.log('\n🖱️  Clicking continue...');
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-screenshots/story-scene-2.png', fullPage: true });

    // Test 3: Another continue
    console.log('🖱️  Clicking continue again...');
    await page.click('.continue-button', { force: true });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-screenshots/story-scene-3.png', fullPage: true });

    // Test 4: Check for choices
    console.log('\n🎯 Checking for choice buttons...');
    const choiceButtons = await page.$$('.choice-button');
    console.log(`   Found ${choiceButtons.length} choice buttons`);

    if (choiceButtons.length > 0) {
        const choice1Text = await choiceButtons[0].textContent();
        const choice2Text = await choiceButtons[1].textContent();
        console.log(`   Choice 1: "${choice1Text}"`);
        console.log(`   Choice 2: "${choice2Text}"`);

        // Test 5: Make a choice
        console.log('\n✨ Making choice 1...');
        await page.click('.choice-button:first-child', { force: true });
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'test-screenshots/story-choice-feedback.png', fullPage: true });

        // Test 6: Continue to next chapter
        console.log('🚀 Continuing to Chapter 2...');
        await page.click('.continue-button', { force: true });
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'test-screenshots/story-chapter-2.png', fullPage: true });

        const newDialogue = await page.$eval('.dialogue-text', el => el.textContent);
        console.log(`   ✅ Chapter 2 dialogue: "${newDialogue.substring(0, 60)}..."`);
    }

    // Test 7: Check chapter badges
    console.log('\n🏆 Checking chapter progress badges...');
    const badges = await page.$$('.chapter-badge');
    console.log(`   Total chapters: ${badges.length}`);

    const completedBadges = await page.$$('.chapter-badge.completed');
    const currentBadge = await page.$$('.chapter-badge.current');
    console.log(`   Completed: ${completedBadges.length}`);
    console.log(`   Current: ${currentBadge.length}`);

    console.log('\n✨ Story test complete!\n');

    await browser.close();
}

if (!fs.existsSync('test-screenshots')) {
    fs.mkdirSync('test-screenshots');
}

testStory().catch(console.error);
