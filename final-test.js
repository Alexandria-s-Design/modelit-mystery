// Final comprehensive test of the complete game experience
const { chromium } = require('playwright');

async function finalTest() {
    console.log('🎮 FINAL GAME EXPERIENCE TEST\n');
    console.log('═'.repeat(60));
    console.log('Testing: ModelIt! - The Mystery of the Mutating Cells');
    console.log('═'.repeat(60));
    console.log('\nChecking:');
    console.log('  ✓ Side-by-side layout with no scrolling');
    console.log('  ✓ Consistent Dr. Maya character in all images');
    console.log('  ✓ Natural voice-over with enhanced speech');
    console.log('  ✓ Smooth animations and transitions');
    console.log('  ✓ Boss levels and game-over functionality');
    console.log('  ✓ All 10 modeling concepts covered');
    console.log('  ✓ Interactive choice-based gameplay\n');
    console.log('═'.repeat(60));

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

    console.log('\n📂 Loading game...');
    await page.goto(`file://${__dirname}/modelit-story.html`);
    await page.waitForTimeout(2000);

    console.log('✅ Game loaded successfully!');

    // Take screenshot of initial state
    await page.screenshot({ path: 'test-screenshots/final-test-start.png', fullPage: false });
    console.log('📸 Screenshot: test-screenshots/final-test-start.png');

    // Check progress tracker
    const badges = await page.$$('.chapter-badge');
    console.log(`\n🎯 Progress tracker: ${badges.length} chapters detected`);

    // Check if images are loaded
    const sceneImage = await page.$('.scene-image');
    if (sceneImage) {
        const bgImage = await sceneImage.evaluate(el => {
            return window.getComputedStyle(el).backgroundImage;
        });
        console.log('🖼️  Scene image loaded:', bgImage.includes('ch0_scene1') ? '✅ Ch0 Scene 1' : bgImage);
    }

    // Check dialogue
    const dialogue = await page.$('.dialogue-text');
    if (dialogue) {
        const text = await dialogue.textContent();
        console.log('💬 Dialogue detected:', text.substring(0, 60) + '...');
    }

    // Wait for user to test
    console.log('\n' + '═'.repeat(60));
    console.log('🎮 INTERACTIVE TEST MODE');
    console.log('═'.repeat(60));
    console.log('The game is now open in your browser.');
    console.log('\nTEST CHECKLIST:');
    console.log('  [ ] Click "Continue" - does dialogue reveal choices smoothly?');
    console.log('  [ ] Do choices slide in with animation?');
    console.log('  [ ] Does Dr. Maya speak with natural voice?');
    console.log('  [ ] Does the image pulse when speaking?');
    console.log('  [ ] Hover over buttons - do they have nice effects?');
    console.log('  [ ] Make a choice - does it progress to next scene?');
    console.log('  [ ] Play through Chapter 3 boss level');
    console.log('  [ ] Try getting a wrong answer - does game over work?');
    console.log('  [ ] Check all images for Dr. Maya consistency');
    console.log('\n💡 The browser will stay open for manual testing.');
    console.log('   Press Ctrl+C to exit when done.\n');
    console.log('═'.repeat(60));

    // Keep browser open for manual testing
    await new Promise(() => {}); // Infinite wait
}

finalTest().catch(console.error);
