require("module-alias/register");
const sharedConfig = require("@config/wdio.shared.conf.ts").config;
const homedir = require("os").homedir;
const join = require("path").join;
const fsp = require("fs").promises;
const { rmSync } = require("fs");

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: [
      join(process.cwd(), "./tests/specs/scripts/01-multiple-logins.spec.ts"),
    ],
    // Patterns to exclude.
    exclude: [
      // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    port: 4723,
    path: "/",
    capabilities: [
      {
        platformName: "windows",
        "appium:deviceName": "WindowsPC",
        "appium:automationName": "windows",
        "appium:app": "C:\\Program Files\\Uplink\\uplink.exe",
        "appium:appArguments":
          "--discovery disable --path " +
          join(process.cwd(), "\\apps\\onetimescript2") +
          " trace2",
        "appium:prerun": {
          command:
            "If (Test-Path $home/.uplink/.user) {Remove-Item -Recurse -Force $home/.uplink/.user} Else { Break }",
        },
      },
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
      [
        "spec",
        {
          showPreface: false,
        },
      ],
    ],
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    onPrepare: async function () {
      // Declare constants for folder locations
      const cacheFolder = homedir() + "\\.uplink\\.user";
      const sourceReusableData = join(
        process.cwd(),
        "\\tests\\fixtures\\users\\FriendsTestUser",
      );
      const targetReusableData = join(
        process.cwd(),
        "\\tests\\fixtures\\users\\windows\\FriendsTestUser",
      );
      const allureResultsFolder = join(process.cwd(), "\\allure-results");
      const testReportFolder = join(process.cwd(), "\\test-report");
      const testResultsFolder = join(process.cwd(), "\\test-results");
      try {
        await rmSync(allureResultsFolder, { recursive: true, force: true });
        await rmSync(testReportFolder, { recursive: true, force: true });
        await rmSync(testResultsFolder, { recursive: true, force: true });
        console.log("Deleted Artifacts Folders Successfully!");
      } catch (error) {
        console.error(
          `Got an error trying to delete artifacts folders: ${error.message}`,
        );
      }
      // Execute the actions to clean up folders and copy required data
      try {
        await rmSync(cacheFolder, { recursive: true, force: true });
        console.log("Deleted Cache Folder Successfully!");
      } catch (error) {
        console.error(
          `Got an error trying to delete Cache Folder: ${error.message}`,
        );
      }
      try {
        await fsp.mkdir(targetReusableData, { recursive: true });
        await fsp.cp(sourceReusableData, targetReusableData, {
          recursive: true,
          force: true,
        });
        console.log("Copied Friends Test User Data successfully!");
      } catch (error) {
        console.error(
          `Got an error trying to copy Friends Test Folder: ${error.message}`,
        );
      }
    },

    afterTest: async function (test, describe, { error }) {
      if (error) {
        let imageFile = await driver.takeScreenshot();
        let imageFolder = join(
          process.cwd(),
          "./test-results/windows-app",
          test.parent,
        );
        const imageTitle = test.title + " - Failed.png";
        await fsp.mkdir(imageFolder, { recursive: true });
        await fsp.writeFile(
          imageFolder + "/" + imageTitle,
          imageFile,
          "base64",
        );
      }
    },
  },
};
