import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    viewport: { width: 1600, height: 1024 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: "http://localhost:3000",
    browserName: "firefox",
    launchOptions: {
      slowMo: 50,
      headless: false,
      timeout: 10000,
    },
    actionTimeout: 10000,
    navigationTimeout: 10000,
  },
};
export default config;
