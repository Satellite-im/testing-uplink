import "module-alias/register";
import allureReporter from '@wdio/allure-reporter'
import { config as sharedConfig } from '@config/wdio.shared.conf';
import { homedir } from "os";
import { join } from "path";
import { USER_A_INSTANCE, MACOS_DRIVER, MACOS_USER_A_BUNDLE_ID, MACOS_USER_B_BUNDLE_ID } from "@helpers/constants";
const fsp = require("fs").promises;
const { readFileSync, rmSync } = require("fs");

// @ts-expect-error
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
    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 2,
    //
    // Delay in seconds between the spec file retry attempts
    specFileRetriesDelay: 30,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    specFileRetriesDeferred: false,
    specs: [join(process.cwd(), "./tests/suites/Chats/01-Chats.suite.ts")],
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
    capabilities: {
      userA: {
        capabilities: {
          platformName: "mac",
          "appium:automationName": MACOS_DRIVER,
          "appium:bundleId": MACOS_USER_A_BUNDLE_ID,
          "appium:arguments": ["--path", homedir() + "/.uplink"],
          "appium:systemPort": 4725,
          "appium:prerun": {
            command: 'do shell script "rm -rf ~/.uplink && rm -rf ~/.uplinkUserB"',
          },  
        }
      },
    },
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
      ["spec", 
        {
          showPreface: false,
        },
      ], 
      ['allure', 
        {
          outputDir: './allure-results',
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: false,
        }
      ],
      ['junit', 
        {
          outputDir: './test-report/',
          outputFileFormat: function (options) {
            return `test-results-macos-multiremote-${options.cid}.xml`;
          }
        }
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
    onPrepare: async function() {
      const cacheFolderUserA = homedir() + "/.uplink/.user";
      const cacheFolderUserB = homedir() + "/.uplinkUserB/.user";
      const allureResultsFolder = join(process.cwd(), "./allure-results");
      const testReportFolder =  join(process.cwd(), "./test-report");
      const testResultsFolder =  join(process.cwd(), "./test-results");
      try {
        await rmSync(allureResultsFolder, { recursive: true, force: true });
        await rmSync(testReportFolder, { recursive: true, force: true });
        await rmSync(testResultsFolder, { recursive: true, force: true });
        console.log("Deleted Artifacts Folders Successfully!");
      } catch (error) {
        console.error(
            `Got an error trying to delete artifacts folders: ${error.message}`
        );
      }
      try {
        await rmSync(cacheFolderUserA, { recursive: true, force: true });
        await rmSync(cacheFolderUserB, { recursive: true, force: true });
        console.log("Deleted Cache Folder Successfully!");
      } catch (error) {
        console.error(
          `Got an error trying to delete Cache Folder: ${error.message}`
        );
      }
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: async function (test, describe, { error }) {
        if (error) {
          let imageFile = await driver.takeScreenshot();
          const imageFolder = join(process.cwd(), "./test-results/macos-multiremote", test.parent);
          const imageTitle = test.title + " - Failed.png";
          await fsp.mkdir(imageFolder, {recursive: true});
          await fsp.writeFile(
            imageFolder + "/" + imageTitle,
            imageFile,
            "base64"
          );

          // Add to Screenshot to Allure Reporter
          const data = await readFileSync(`${imageFolder}/${imageTitle}`);
          allureReporter.addAttachment(imageTitle, data, 'image/png')

          // Close second application if open
          await driver[USER_A_INSTANCE].executeScript("macos: terminateApp", [
            {
              bundleId: MACOS_USER_B_BUNDLE_ID,
            },
          ]);
        }
      }
  },

  afterSuite: async function (suite) {
    // Close second application if open
    await driver[USER_A_INSTANCE].executeScript("macos: terminateApp", [
      {
        bundleId: MACOS_USER_B_BUNDLE_ID,
      },
    ]);
  },
}