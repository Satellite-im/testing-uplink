require("module-alias/register");
const allureReporter = require("@wdio/allure-reporter").default;
const sharedConfig = require("@config/wdio.shared.conf.ts").config;
const homedir = require("os").homedir;
const join = require("path").join;
const MACOS_BUNDLE_ID = require("@helpers/constants").MACOS_BUNDLE_ID;
const MACOS_DRIVER = require("@helpers/constants").MACOS_DRIVER;
const fsp = require("fs").promises;
const { readFileSync, rmSync } = require("fs");

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
      join(process.cwd(), "./tests/suites/MainTests/01-UplinkTests.suite.ts"),
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
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    port: 4723,
    path: "/",
    capabilities: [
      {
        platformName: "mac",
        "appium:automationName": MACOS_DRIVER,
        "appium:bundleId": MACOS_BUNDLE_ID,
        "appium:arguments": ["--path", homedir() + "/.uplink"],
        "appium:systemPort": 4724,
        "appium:prerun": {
          command:
            'do shell script "rm -rf ~/.uplink && rm -rf ~/.uplinkUserB"',
        },
      },
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    reporters: [
      [
        "spec",
        {
          showPreface: false,
        },
      ],
      [
        "allure",
        {
          outputDir: "./allure-results",
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: true,
        },
      ],
      [
        "junit",
        {
          outputDir: "./test-report/",
          outputFileFormat: function (options) {
            return `test-results-macos-app-${options.cid}.xml`;
          },
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
      const cacheFolder = homedir() + "/.uplink/.user";
      const allureResultsFolder = join(process.cwd(), "./allure-results");
      const testReportFolder = join(process.cwd(), "./test-report");
      const testResultsFolder = join(process.cwd(), "./test-results");
      try {
        await rmSync(allureResultsFolder, { recursive: true, force: true });
        await rmSync(testReportFolder, { recursive: true, force: true });
        await rmSync(testResultsFolder, { recursive: true, force: true });
      } catch (error) {
        console.error(
          `Got an error trying to delete artifacts folders: ${error.message}`,
        );
      }
      try {
        await rmSync(cacheFolder, { recursive: true, force: true });
      } catch (error) {
        console.error(
          `Got an error trying to delete Cache Folder: ${error.message}`,
        );
      }
    },

    afterTest: async function (test, describe, { error }) {
      if (error) {
        let imageFile = await driver.takeScreenshot();
        const imageFolder = join(
          process.cwd(),
          "./test-results/macos-app",
          test.parent,
        );
        const imageTitle = test.title + " - Failed.png";
        await fsp.mkdir(imageFolder, { recursive: true });
        await fsp.writeFile(
          imageFolder + "/" + imageTitle,
          imageFile,
          "base64",
        );

        // Add to Screenshot to Allure Reporter
        const data = await readFileSync(`${imageFolder}/${imageTitle}`);
        allureReporter.addAttachment(imageTitle, data, "image/png");

        // Close application if still open
        await terminateApplication(MACOS_BUNDLE_ID);
      }
    },
  },
};

export async function terminateApplication(bundle: string) {
  const appState = await queryAppStateMacOS(bundle);
  if (appState !== 1) {
    await driver.executeScript("macos: terminateApp", [
      {
        bundleId: bundle,
      },
    ]);
  }
}

export async function queryAppStateMacOS(bundle: string) {
  const queryAppState = await driver.executeScript("macos: queryAppState", [
    {
      bundleId: bundle,
    },
  ]);
  return queryAppState;
}
