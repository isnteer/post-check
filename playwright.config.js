const { defineConfig, devices } = require('@playwright/test');

const port = Number(process.env.PORT || 4173);

module.exports = defineConfig({
  testDir: 'tests',
  testMatch: '*.spec.js',
  use: { baseURL: `http://127.0.0.1:${port}/` },
  webServer: {
    command: 'node tests/server.js',
    url: `http://127.0.0.1:${port}/`,
    env: { PORT: String(port) },
    reuseExistingServer: false,
  },
  projects: [
    { name: 'handy', use: { ...devices['Pixel 5'], viewport: { width: 375, height: 812 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
