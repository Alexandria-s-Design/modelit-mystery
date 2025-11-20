// Playwright Configuration for ModelIt Mystery Testing
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Full HD',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Laptop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: 'HD 720p',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Tablet',
      use: {
        browserName: 'chromium',
        viewport: { width: 1024, height: 768 },
      },
    },
  ],
  webServer: {
    command: 'npx http-server -p 8000',
    port: 8000,
    reuseExistingServer: true,
  },
});
