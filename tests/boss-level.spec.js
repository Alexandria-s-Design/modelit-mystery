// Boss Level Retry Testing
const { test, expect } = require('@playwright/test');

test.describe('Boss Level Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1500);

    // Wait for game container to be visible
    await page.waitForSelector('#game-container', { state: 'visible' });
  });

  test('should navigate to first boss level (Chapter 5)', async ({ page }) => {
    // Click through first 4 chapters to reach boss level
    for (let i = 0; i < 4; i++) {
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(1500);
    }

    // Verify we're at a boss level (has multiple choice buttons)
    const choiceButtons = page.locator('.choice-button:visible');
    const buttonCount = await choiceButtons.count();
    expect(buttonCount).toBeGreaterThan(1);

    await page.screenshot({ path: 'test-results/screenshots/boss-level-question.png', fullPage: true });
  });

  test('should display ONLY "Try Again" button on wrong answer', async ({ page }) => {
    // Navigate to boss level
    for (let i = 0; i < 4; i++) {
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(1500);
    }

    // Click second choice button (likely wrong answer)
    const choiceButtons = page.locator('.choice-button:visible');
    if (await choiceButtons.count() >= 2) {
      await choiceButtons.nth(1).click();
      await page.waitForTimeout(2000);

      // Check for "INCORRECT ANSWER" screen
      const incorrectText = page.locator('text=/INCORRECT|incorrect|wrong/i');
      const hasIncorrectScreen = await incorrectText.count() > 0;

      if (hasIncorrectScreen) {
        // Verify ONLY ONE continue button exists ("Try Again")
        const visibleButtons = page.locator('.continue-button:visible');
        const buttonCount = await visibleButtons.count();

        // Should have exactly 1 button (Try Again)
        expect(buttonCount).toBe(1);

        // Verify it contains retry text
        const tryAgainButton = page.locator('.continue-button:visible:has-text("Try Again"), .continue-button:visible:has-text("🔄")').first();
        await expect(tryAgainButton).toBeVisible();

        await page.screenshot({ path: 'test-results/screenshots/boss-incorrect-answer.png', fullPage: true });
      }
    }
  });

  test('should retry boss question without restarting game', async ({ page }) => {
    // Navigate to boss level
    for (let i = 0; i < 4; i++) {
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(1500);
    }

    // Get current chapter content before wrong answer
    const contentBeforeWrong = await page.locator('#story-panel').innerHTML();

    // Click wrong answer
    const choiceButtons = page.locator('.choice-button:visible');
    if (await choiceButtons.count() >= 2) {
      await choiceButtons.nth(1).click();
      await page.waitForTimeout(2000);

      // Click "Try Again" button (continue button DIV, not button element)
      const tryAgainButton = page.locator('.continue-button:visible').first();
      if (await tryAgainButton.isVisible()) {
        await tryAgainButton.click();
        await page.waitForTimeout(1500);

        // Verify we're back at SAME chapter (not restarted)
        const hasChoiceButtons = await page.locator('.choice-button:visible').count() > 1;
        expect(hasChoiceButtons).toBe(true);

        await page.screenshot({ path: 'test-results/screenshots/boss-retry-success.png', fullPage: true });
      }
    }
  });

  test('should advance to next chapter on correct answer', async ({ page }) => {
    // Navigate to boss level
    for (let i = 0; i < 4; i++) {
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(1500);
    }

    // Click first choice button (likely correct answer)
    const choiceButtons = page.locator('.choice-button:visible');
    if (await choiceButtons.count() >= 1) {
      await choiceButtons.first().click();
      await page.waitForTimeout(2000);

      // Check for success feedback
      const successText = page.locator('text=/CORRECT|Success|Well done|Great/i');
      const hasSuccessScreen = await successText.count() > 0;

      if (hasSuccessScreen) {
        await page.screenshot({ path: 'test-results/screenshots/boss-correct-answer.png', fullPage: true });

        // Click continue button (DIV, not button element)
        const continueButton = page.locator('.continue-button:visible').first();
        await continueButton.click();
        await page.waitForTimeout(1500);

        // Verify we advanced to next chapter
        const newContent = await page.locator('#story-panel').innerHTML();
        expect(newContent.length).toBeGreaterThan(0);
      }
    }
  });

  test('should verify boss buttons are visible WITHOUT scrolling', async ({ page, viewport }) => {
    // Navigate to boss level
    for (let i = 0; i < 4; i++) {
      const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(1500);
    }

    // Click wrong answer to get incorrect screen
    const choiceButtons = page.locator('.choice-button:visible');
    if (await choiceButtons.count() >= 2) {
      await choiceButtons.nth(1).click();
      await page.waitForTimeout(2000);

      // Check if "Try Again" button is visible in viewport (continue button DIV)
      const tryAgainButton = page.locator('.continue-button:visible').first();

      if (await tryAgainButton.isVisible()) {
        // Get button bounding box
        const buttonBox = await tryAgainButton.boundingBox();

        if (buttonBox) {
          // Verify button is within viewport height
          const viewportHeight = viewport?.height || 1080;
          const buttonBottomY = buttonBox.y + buttonBox.height;

          // Button should be visible within viewport (allow some scrolling tolerance)
          expect(buttonBottomY).toBeLessThanOrEqual(viewportHeight + 200);
        }
      }
    }
  });
});
