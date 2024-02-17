import { defineConfig, devices } from '@playwright/test';

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
        trace: 'on',
        video: 'retain-on-failure',
        // viewport: {width:720, height:720},
        // ...devices['iPhone 11'],
      },
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        //http://trace.playwright.dev/
        trace: 'retain-on-failure', //off,on
        // ...devices['Galaxy S8 landscape']
      },
    }
  ]
});
