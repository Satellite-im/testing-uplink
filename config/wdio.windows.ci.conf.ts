import config from "./wdio.shared.windows.appium.conf";
import { join } from "path";

const fsp = require("fs").promises;
const mkdirp = require("mkdirp");

// ============
// Specs
// ============
config.specs = [join(process.cwd(), "./tests/suites/*.ts")];

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
    "appium:app": join(process.cwd(), "\\apps\\ui.exe"),
    "ms:waitForAppLaunch": 60,
  },
];

config.mochaOpts = {
  ui: "bdd",
  /**
   * NOTE: This has been increased for more stable Appium Native app
   * tests because they can take a bit longer.
   */
  timeout: 300000, // 5min
},

config.afterTest = async function (test, describe, { error }) {
  if (error) {
    let imageFile = await driver.takeScreenshot();
    let imageFolder = join(process.cwd(), "./test-results/windows", test.parent);
    await mkdirp(imageFolder);
    await fsp.writeFile(
      imageFolder + "/" + test.title + " - Failed.png",
      imageFile,
      "base64"
    );
  }
};

exports.config = config;
