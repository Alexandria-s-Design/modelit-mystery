// Image Display Validation Tests
const { test, expect } = require('@playwright/test');

test.describe('Image Display Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1500);
    await page.waitForSelector('#game-container', { state: 'visible' });
  });

  test('should display scene images without cropping', async ({ page }) => {
    const sceneImage = page.locator('.scene-image').first();

    if (await sceneImage.isVisible()) {
      // Check background-size property
      const backgroundSize = await sceneImage.evaluate(el =>
        window.getComputedStyle(el).backgroundSize
      );

      // Should be 'contain' (not 'cover' which crops images)
      expect(backgroundSize).toBe('contain');

      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/image-display-check.png',
        fullPage: false
      });
    }
  });

  test('should verify image column has proper height', async ({ page }) => {
    const sceneImage = page.locator('.scene-image').first();

    if (await sceneImage.isVisible()) {
      const box = await sceneImage.boundingBox();

      if (box) {
        // Image should have minimum height of 400px
        expect(box.height).toBeGreaterThanOrEqual(400);
      }
    }
  });

  test('should verify images maintain aspect ratio', async ({ page }) => {
    const sceneImage = page.locator('.scene-image').first();

    if (await sceneImage.isVisible()) {
      const backgroundRepeat = await sceneImage.evaluate(el =>
        window.getComputedStyle(el).backgroundRepeat
      );

      // Should be 'no-repeat'
      expect(backgroundRepeat).toBe('no-repeat');
    }
  });

  test('should verify images are centered', async ({ page }) => {
    const sceneImage = page.locator('.scene-image').first();

    if (await sceneImage.isVisible()) {
      const backgroundPosition = await sceneImage.evaluate(el =>
        window.getComputedStyle(el).backgroundPosition
      );

      // Should be 'center center' or '50% 50%'
      expect(backgroundPosition).toMatch(/center|50%/);
    }
  });

  test('should verify both image and content columns align', async ({ page }) => {
    const sceneImage = page.locator('.scene-image').first();
    const contentWrapper = page.locator('.scene-content-wrapper').first();

    if (await sceneImage.isVisible() && await contentWrapper.isVisible()) {
      const imageBox = await sceneImage.boundingBox();
      const contentBox = await contentWrapper.boundingBox();

      if (imageBox && contentBox) {
        // Heights should be similar (within 50px tolerance)
        const heightDiff = Math.abs(imageBox.height - contentBox.height);
        expect(heightDiff).toBeLessThan(50);
      }
    }
  });

  test('should take full page screenshot showing image layout', async ({ page }) => {
    await page.screenshot({
      path: 'test-results/screenshots/full-layout-with-images.png',
      fullPage: true
    });
  });

  test('should verify images load successfully', async ({ page }) => {
    // Navigate through chapters and verify images
    for (let i = 0; i < 3; i++) {
      const sceneImage = page.locator('.scene-image').first();

      if (await sceneImage.isVisible()) {
        // Check if background-image is set
        const backgroundImage = await sceneImage.evaluate(el =>
          window.getComputedStyle(el).backgroundImage
        );

        // Should have a background image (not 'none')
        expect(backgroundImage).not.toBe('none');
      }

      // Navigate to next chapter
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      if (await continueButton.isVisible()) {
        await continueButton.click();
        await page.waitForTimeout(1500);
      }
    }
  });
});
