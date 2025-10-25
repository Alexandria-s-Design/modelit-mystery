// Screenshot all 3 layout options for comparison
const { chromium } = require('playwright');

async function screenshotAll() {
    console.log('📸 Creating comparison screenshots...\n');

    const browser = await chromium.launch({ headless: true });

    // Option 1: Bigger Image
    console.log('1️⃣  Option 1: Bigger Image (360px)');
    const page1 = await browser.newPage();
    await page1.goto(`file://${__dirname}/option1-bigger-image.html`);
    await page1.waitForTimeout(2000);
    await page1.screenshot({ path: 'test-screenshots/option1-bigger-image.png' });
    console.log('   ✅ Saved: option1-bigger-image.png\n');
    await page1.close();

    // Option 2: Create fullscreen overlay version on the fly
    console.log('2️⃣  Option 2: Fullscreen with Text Overlay');
    const page2 = await browser.newPage();
    await page2.goto(`file://${__dirname}/modelit-story.html`);
    await page2.waitForTimeout(1000);

    // Inject CSS for fullscreen overlay
    await page2.addStyleTag({
        content: `
            .scene-image {
                height: calc(100vh - 80px) !important;
                margin-bottom: 0 !important;
            }
            .dialogue-container, .learning-moment {
                position: absolute !important;
                bottom: 20px !important;
                left: 40px !important;
                right: 40px !important;
                z-index: 10 !important;
                background: rgba(10, 30, 40, 0.95) !important;
                backdrop-filter: blur(10px) !important;
            }
            .scene-overlay {
                top: 0 !important;
                background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%) !important;
            }
        `
    });

    await page2.waitForTimeout(1000);
    await page2.screenshot({ path: 'test-screenshots/option2-fullscreen-overlay.png' });
    console.log('   ✅ Saved: option2-fullscreen-overlay.png\n');
    await page2.close();

    // Option 3: Create side-by-side version
    console.log('3️⃣  Option 3: Side-by-Side Layout');
    const page3 = await browser.newPage();
    await page3.goto(`file://${__dirname}/modelit-story.html`);
    await page3.waitForTimeout(1000);

    // Inject CSS for side-by-side
    await page3.addStyleTag({
        content: `
            #story-panel {
                max-width: 100% !important;
            }
            .scene-container {
                flex-direction: row !important;
                gap: 20px !important;
            }
            .scene-image {
                width: 50% !important;
                height: calc(100vh - 120px) !important;
                margin-bottom: 0 !important;
                flex-shrink: 0 !important;
            }
            .scene-content-wrapper {
                width: 50% !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                overflow-y: auto !important;
            }
            .dialogue-container, .learning-moment, .choices-container {
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
        `
    });

    // Wrap dialogue content
    await page3.evaluate(() => {
        const containers = document.querySelectorAll('.dialogue-container, .learning-moment, .choices-container, .continue-button');
        if (containers.length > 0) {
            const wrapper = document.createElement('div');
            wrapper.className = 'scene-content-wrapper';
            const parent = containers[0].parentElement;
            parent.insertBefore(wrapper, containers[0]);
            containers.forEach(el => wrapper.appendChild(el));
        }
    });

    await page3.waitForTimeout(1000);
    await page3.screenshot({ path: 'test-screenshots/option3-side-by-side.png' });
    console.log('   ✅ Saved: option3-side-by-side.png\n');
    await page3.close();

    await browser.close();

    console.log('═'.repeat(50));
    console.log('✅ All 3 options screenshotted!');
    console.log('   Check test-screenshots/ folder');
}

screenshotAll().catch(console.error);
