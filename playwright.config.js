const { existsSync } = require('node:fs');
const path = require('node:path');

const localChromium = path.join(
  __dirname,
  '.playwright-browsers/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
);

module.exports = {
  testDir: './tests',
  use: {
    browserName: 'chromium',
    launchOptions: {
      executablePath: existsSync(localChromium) ? localChromium : undefined,
    },
  },
};
