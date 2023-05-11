import config from "./wdio.shared.windows.appium.conf";
import { join } from "path";


const fsp = require("fs").promises;

// ============
// Specs
// ============
config.specs = [join(process.cwd(), "./tests/specs/reusable-accounts/SendMultipleMessages/04-send-several-messages-X.spec.ts")];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: "windows",
    "appium:deviceName": "WindowsPC",
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    "appium:automationName": "windows",
    "appium:app": join(process.cwd(), "\\apps\\uplink.exe"),
  },
];

//
// ======
// Mocha
// ======
//

config.mochaOpts = {
    ui: "bdd",
    /**
     * NOTE: This has been increased for more stable Appium Native app
     * tests because they can take a bit longer.
     */
    timeout: 300000, // 5min
  },

// Change spec file retries to zero
config.specFileRetries = 0;

//
// ======
// Reporters
// ======
//

// Setup reporters dot and JUnit with correct xml report names
config.reporters = [[
  "spec", 
  {
    showPreface: false,
  },
], ['junit', {
  outputDir: './test-report/',
  outputFileFormat: function (options) {
    return `test-results-windows-chatA-${options.cid}.xml`;
  }
}]]

//
// ======
// Appium
// ======
//
config.services = (config.services ? config.services : []).concat([
  [
    "appium",
    {
      // This will use the globally installed version of Appium
      command: "appium",
      args: {
        // This is needed to tell Appium that we can execute local ADB commands
        // and to automatically download the latest version of ChromeDriver
        relaxedSecurity: true,
        // Write the Appium logs to a file in the root of the directory
        log: "./appium-chats.log",
      },
    },
  ],
]);

config.afterTest = async function (test, describe, { error }) {
  if (error) {
    let imageFile = await driver.takeScreenshot();
    let imageFolder = join(process.cwd(), "./test-results/windows-chatA", test.parent);
    await fsp.mkdir(imageFolder, {recursive: true});
    await fsp.writeFile(
      imageFolder + "/" + test.title + " - Failed.png",
      imageFile,
      "base64"
    );
  }
};

exports.config = config;
