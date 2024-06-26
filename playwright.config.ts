import { defineConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  /* number of parallel test specs to execute */
  // workers: 3,
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  /* Maximum time for an assertion */
  expect: {
    timeout: 5000
  },
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    //http://trace.playwright.dev/
    trace: 'retain-on-failure' //off,on
  },
});
