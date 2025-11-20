// Responsive Design Testing
const { test, expect } = require('@playwright/test');

const resolutions = [
  { name: 'Desktop Full HD', width: 1920, height: 1080 },
  { name: 'Laptop', width: 1366, height: 768 },
  { name: 'HD 720p', width: 1280, height: 720 },
  { name: 'Tablet', width: 1024, height: 768 },
  { name: 'Small Laptop', width: 1024, height: 600 },
];

test.describe('Responsive Design Validation', () => {
  resolutions.forEach(({ name, width, height }) => {
    test(`should display correctly at ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Start game
      const startButton = page.locator('.start-button').first();
      await startButton.click();
      await page.waitForTimeout(1500);
      await page.waitForSelector('#game-container', { state: 'visible' });

      // Check scene container exists
      const sceneContainer = page.locator('.scene-container').first();
      await expect(sceneContainer).toBeVisible();

      // Take screenshot
      await page.screenshot({
        path: `test-results/screenshots/responsive-${width}x${height}.png`,
        fullPage: true
      });
    });

    test(`should show buttons at ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Start game
      const startButton = page.locator('.start-button').first();
      await startButton.click();
      await page.waitForTimeout(1500);
      await page.waitForSelector('#game-container', { state: 'visible' });

      // Verify buttons are visible
      const buttons = page.locator('.continue-button:visible, .choice-button:visible').first();
      await expect(buttons).toBeVisible();

      // Get button position
      const buttonBox = await buttons.boundingBox();
      if (buttonBox) {
        // Button should be within viewport or slightly below (scrollable)
        expect(buttonBox.y).toBeLessThan(height + 300);
      }
    });

    test(`should display full images at ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Start game
      const startButton = page.locator('.start-button').first();
      await startButton.click();
      await page.waitForTimeout(1500);
      await page.waitForSelector('#game-container', { state: 'visible' });

      // Check for scene image
      const sceneImage = page.locator('.scene-image').first();
      if (await sceneImage.isVisible()) {
        const imageBox = await sceneImage.boundingBox();
        if (imageBox) {
          // Image should have reasonable dimensions
          expect(imageBox.width).toBeGreaterThan(100);
          expect(imageBox.height).toBeGreaterThan(100);
        }
      }

      // Take screenshot of image display
      await page.screenshot({
        path: `test-results/screenshots/images-${width}x${height}.png`,
        fullPage: false,
        timeout: 10000  // 10 second timeout instead of 30
      });
    });
  });

  test('should handle dynamic window resize', async ({ page }) => {
    await page.goto('/');

    // Start with large viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('#game-container', { state: 'visible' });

    // Resize to smaller viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);

    // Verify buttons still visible
    const buttons = page.locator('.continue-button:visible, .choice-button:visible').first();
    await expect(buttons).toBeVisible();

    // Take screenshot after resize
    await page.screenshot({ path: 'test-results/screenshots/after-resize.png', fullPage: true });
  });
});
