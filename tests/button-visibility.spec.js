// Button Visibility Verification Tests
const { test, expect } = require('@playwright/test');

test.describe('Button Visibility & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1500);
    await page.waitForSelector('#game-container', { state: 'visible' });
  });

  test('should verify all buttons have adequate spacing', async ({ page }) => {
    const buttons = page.locator('.continue-button:visible, .choice-button:visible');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          // Button should have minimum height (not cut off)
          expect(box.height).toBeGreaterThan(30);

          // Button should have reasonable width
          expect(box.width).toBeGreaterThan(50);
        }
      }
    }
  });

  test('should verify buttons are clickable in viewport', async ({ page }) => {
    const buttons = page.locator('.continue-button:visible, .choice-button:visible');
    const firstButton = buttons.first();

    if (await firstButton.isVisible()) {
      // Click button
      await firstButton.click();
      await page.waitForTimeout(1000);

      // Verify navigation occurred
      const newButtons = page.locator('.continue-button:visible, .choice-button:visible');
      expect(await newButtons.count()).toBeGreaterThan(0);
    }
  });

  test('should verify button text is readable', async ({ page }) => {
    const buttons = page.locator('.continue-button:visible, .choice-button:visible');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const buttonText = await button.textContent();

        // Button should have some text
        expect(buttonText?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('should verify scrolling works for long content', async ({ page }) => {
    // Navigate through several chapters to get longer content
    for (let i = 0; i < 3; i++) {
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      await continueButton.click();
      await page.waitForTimeout(1500);
    }

    // Get content wrapper
    const contentWrapper = page.locator('.scene-content-wrapper').first();

    if (await contentWrapper.isVisible()) {
      // Check if scrollable (has overflow-y: auto)
      const overflowY = await contentWrapper.evaluate(el =>
        window.getComputedStyle(el).overflowY
      );

      // Should be auto or scroll
      expect(['auto', 'scroll']).toContain(overflowY);
    }
  });

  test('should verify bottom padding prevents button cutoff', async ({ page }) => {
    const contentWrapper = page.locator('.scene-content-wrapper').first();

    if (await contentWrapper.isVisible()) {
      const paddingBottom = await contentWrapper.evaluate(el =>
        window.getComputedStyle(el).paddingBottom
      );

      // Should have at least 50px bottom padding
      const paddingValue = parseInt(paddingBottom);
      expect(paddingValue).toBeGreaterThanOrEqual(50);
    }
  });

  test('should take screenshot showing button positions', async ({ page }) => {
    await page.screenshot({
      path: 'test-results/screenshots/button-positions.png',
      fullPage: true
    });
  });
});
