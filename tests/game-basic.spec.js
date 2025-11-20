// Basic Game Functionality Tests
const { test, expect } = require('@playwright/test');

test.describe('Basic Game Functionality', () => {
  test('should load the game homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ModelIt.*Mutating Cells/i);

    // Check for main game title
    const title = page.locator('h1, .game-title');
    await expect(title).toBeVisible();
  });

  test('should display start button and begin game', async ({ page }) => {
    await page.goto('/');

    // Look for start button
    const startButton = page.locator('.start-button').first();
    await expect(startButton).toBeVisible();

    // Click start button
    await startButton.click();

    // Wait for cover page to hide and game container to appear
    await page.waitForTimeout(1500);
    await page.waitForSelector('#game-container', { state: 'visible' });

    const gameContent = page.locator('#game-container');
    await expect(gameContent).toBeVisible();
  });

  test('should display Dr. Maya character and dialogue', async ({ page }) => {
    await page.goto('/');

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1500);
    await page.waitForSelector('#game-container', { state: 'visible' });

    // Check for dialogue container
    const dialogue = page.locator('.dialogue-container, .speaker-name');
    await expect(dialogue.first()).toBeVisible();
  });

  test('should display continue/choice buttons', async ({ page }) => {
    await page.goto('/');

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1500);
    await page.waitForSelector('#game-container', { state: 'visible' });

    // Check for interactive buttons (continue buttons are DIVs, not buttons)
    const buttons = page.locator('.continue-button:visible, .choice-button:visible');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should navigate to next chapter on button click', async ({ page }) => {
    await page.goto('/');

    // Start game
    const startButton = page.locator('.start-button').first();
    await startButton.click();
    await page.waitForTimeout(1500);
    await page.waitForSelector('#game-container', { state: 'visible' });

    // Get initial content
    const initialContent = await page.locator('#story-panel').innerHTML();

    // Click first visible continue button (DIV, not button element)
    const continueButton = page.locator('.continue-button:visible, .choice-button:visible').first();
    await continueButton.click();
    await page.waitForTimeout(1500);

    // Verify content changed
    const newContent = await page.locator('#story-panel').innerHTML();
    expect(newContent).not.toBe(initialContent);
  });

  test('should take screenshot of initial game state', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: 'test-results/screenshots/initial-state.png', fullPage: true });
  });
});
