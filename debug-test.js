// Debug test with console output
const { chromium } = require('playwright');

async function debugTest() {
    console.log('🐛 Debug test starting...\n');

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Capture console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

    await page.goto(`file://${__dirname}/modelit-story.html`);
    await page.waitForTimeout(3000);

    // Check if STORY_DATA loaded
    const storyDataExists = await page.evaluate(() => {
        return {
            hasSTORY_DATA: typeof window.STORY_DATA !== 'undefined',
            hasChapters: window.STORY_DATA?.chapters?.length || 0,
            storyPanelExists: !!document.getElementById('story-panel'),
            storyPanelHTML: document.getElementById('story-panel')?.innerHTML || 'NOT FOUND'
        };
    });

    console.log('\n📊 Debug Info:');
    console.log(JSON.stringify(storyDataExists, null, 2));

    console.log('\n✅ Browser staying open - check console for errors...');
}

debugTest().catch(console.error);
