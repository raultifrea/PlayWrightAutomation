import { defineConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  /* Maximum time for an assertion */
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on'
      },
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        //http://trace.playwright.dev/
        trace: 'retain-on-failure' //off,on
      },
    }
  ]
});
