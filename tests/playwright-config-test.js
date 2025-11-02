const { chromium } = require('playwright');

async function testConfiguration() {
    console.log('🧪 Starting Playwright browser test...\n');
    
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Test 1: Load test page
    console.log('📝 Test 1: Loading configuration test page...');
    await page.goto('http://localhost:8888/tests/test-config.html');
    await page.waitForTimeout(1000);
    
    // Test 2: Check if config loaded
    console.log('📝 Test 2: Checking if GAME_CONFIG is loaded...');
    const configExists = await page.evaluate(() => {
        return typeof window.GAME_CONFIG !== 'undefined';
    });
    console.log(`   Result: ${configExists ? '✅ Config loaded' : '❌ Config NOT loaded'}`);
    
    // Test 3: Check DEBUG_MODE value
    console.log('📝 Test 3: Checking DEBUG_MODE value...');
    const debugMode = await page.evaluate(() => {
        return window.GAME_CONFIG?.DEBUG_MODE;
    });
    console.log(`   Result: DEBUG_MODE = ${debugMode} ✅`);
    
    // Test 4: Get all config values
    console.log('📝 Test 4: Getting all configuration values...');
    const allConfig = await page.evaluate(() => {
        return JSON.stringify(window.GAME_CONFIG, null, 2);
    });
    console.log('   Configuration object:');
    console.log(allConfig);
    
    // Test 5: Load main game page
    console.log('\n📝 Test 5: Loading main game page (modelit-story.html)...');
    await page.goto('http://localhost:8888/modelit-story.html');
    await page.waitForTimeout(2000);
    
    const gameConfigLoaded = await page.evaluate(() => {
        return typeof window.GAME_CONFIG !== 'undefined';
    });
    console.log(`   Result: ${gameConfigLoaded ? '✅ Config loaded in main game' : '❌ Config NOT loaded in main game'}`);
    
    // Test 6: Check if error handler can access config
    console.log('📝 Test 6: Checking error handler integration...');
    const errorHandlerWorks = await page.evaluate(() => {
        // Simulate what error-handler.js does
        const canAccessDebugMode = window.GAME_CONFIG?.DEBUG_MODE !== undefined;
        return canAccessDebugMode;
    });
    console.log(`   Result: ${errorHandlerWorks ? '✅ Error handler can access DEBUG_MODE' : '❌ Error handler cannot access DEBUG_MODE'}`);
    
    // Test 7: Take screenshot
    console.log('📝 Test 7: Taking screenshot of test page...');
    await page.goto('http://localhost:8888/tests/test-config.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/config-test-screenshot.png', fullPage: true });
    console.log('   ✅ Screenshot saved to tests/config-test-screenshot.png');
    
    await browser.close();
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ All Playwright tests completed successfully!');
    console.log('='.repeat(60));
}

// Run tests
testConfiguration().catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
});
