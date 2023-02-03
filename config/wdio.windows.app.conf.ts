const fsp = require("fs").promises;
const mkdirp = require("mkdirp");

import config from "./wdio.shared.local.appium.conf";
import { join } from "path";

// ============
// Specs
// ============
config.specs = ["./tests/specs/**/*.spec.ts"];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: "windows",
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    "appium:automationName": "windows",
    "appium:app": join(process.cwd(), "./apps/Uplink-Windows/ui.exe"),
    // @ts-ignore
    "appium:postrun": {
      script: 'cd $home; Remove-Item .uplink -Recurse -Force',
    },
  },
];

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
