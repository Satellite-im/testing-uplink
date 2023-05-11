import config from "./wdio.shared.windows.appium.conf";
import { join } from "path";


const fsp = require("fs").promises;

// ============
// Specs
// ============
config.specs = [join(process.cwd(), "./tests/suites/MainTests/*.suite.ts")];

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
    "ms:waitForAppLaunch": 30,
    "appium:prerun": {
      command: 'If (Test-Path $home/.uplink/.user) {Remove-Item -Recurse -Force $home/.uplink/.user} Else { Break }',
    },
  },
];

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
    return `test-results-windows-app-${options.cid}.xml`;
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
        log: "./appium-app.log",
      },
    },
  ],
]);

config.afterTest = async function (test, describe, { error }) {
  if (error) {
    let imageFile = await driver.takeScreenshot();
    let imageFolder = join(process.cwd(), "./test-results/windows-app", test.parent);
    await fsp.mkdir(imageFolder, {recursive: true});
    await fsp.writeFile(
      imageFolder + "/" + test.title + " - Failed.png",
      imageFile,
      "base64"
    );
  }
};

exports.config = config;
