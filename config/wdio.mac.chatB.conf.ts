import { config } from "./wdio.shared.conf";
import { join } from "path";

const fsp = require("fs").promises;
const mkdirp = require("mkdirp");

// ============
// Specs
// ============
config.specs = [join(process.cwd(), "./tests/specs/reusable-accounts/02-chats-userB.spec.ts")];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: "mac",
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    "appium:automationName": "mac2",
    // @ts-ignore
    "appium:bundleId": "im.satellite.uplink",
    "appium:serverStartupTimeout": 240000,
    "appium:systemPort": 10101,
  },
];

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
          log: "./appium.log",
          port: 4724
        },
      },
    ],
  ]);

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
    let imageFolder = join(process.cwd(), "./test-results/macos", test.parent);
    await mkdirp(imageFolder);
    await fsp.writeFile(
      imageFolder + "/" + test.title + " - Failed.png",
      imageFile,
      "base64"
    );
  }
};

exports.config = config;