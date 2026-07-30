import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  //In4Suite default configuration started--------------------------------
  // Test location
  testDir: './tests', // Folder containing test files

  // Timeouts
  timeout:1200000, // Maximum time allowed for one test
  //expect:{timeout:6000}, // Maximum wait time for expect()

  //Execute specific tests -grouping
  //grep:/@WorkOrder/, // Runs only matching tests
  //grepInvert:/@Payment/, // Skips matching tests

  // Execution
  fullyParallel:false, // Runs tests sequentially
  workers:2, // Number of parallel workers
  retries:0, // Retries failed tests

  // Stop execution
  //maxFailures: 10, // Stop after 5 failures

  // Reporters
  reporter:[['html', {open: 'on-failure', outputFolder: './playwright-report'}], ['dot'],['allure-playwright']],

  // Detect accidental test.only
  forbidOnly: !!process.env.CI,    // Prevents test.only in CI
  
  //In4Suite default configuration ended----------------------------------
  
  /*timeout: 30000,
  testDir: './tests',
  //Run tests in files in parallel
  fullyParallel: true,
  //Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  //Retry on CI only
  retries: process.env.CI ? 2 : 0,
  //Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  //Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html',
  //Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {

    //In4Suite use configuration started--------------------------------
    // Development
    headless:false, //Opens actual browser UI

    // Application URL
    baseURL:"https://vm-in4qa.in4suite.com/", //Common application URL

    // Desktop application
    viewport:null, //Removes fixed browser size
    isMobile:false, //Runs as desktop browser
    hasTouch:false, //Disables touch events

    // Browser
    //browserName:"chromium", //Uses Chromium engine
    colorScheme:'light', //Sets browser preferred theme
    launchOptions:{args:["--start-maximized"]}, //Opens Chrome maximized

    // Failure analysis
    screenshot:"only-on-failure", //Takes screenshot every test
    video:"retain-on-failure", //Takes video every test
    trace:"retain-on-failure", //Captures detailed execution history: https://trace.playwright.dev/

    // Timing
    //actionTimeout:15000, //wait for actions like a click, fill etc..
    //navigationTimeout:30000, //wait for navigation like a page.goto()

    //In4Suite use configuration ended--------------------------------
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {  //...devices['Desktop Chrome'],
        browserName: 'chromium',
       },
    },

/*    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
