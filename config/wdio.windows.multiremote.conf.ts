import "module-alias/register";
import allureReporter from '@wdio/allure-reporter'
import { config as sharedConfig } from '@config/wdio.shared.conf';
import { join } from "path";
import { USER_A_INSTANCE } from "@helpers/constants";
const fsp = require("fs").promises;
const userACacheFolder = join(process.cwd(), "./apps/ChatUserA/.user")
const userBCacheFolder = join(process.cwd(), "./apps/ChatUserB/.user")
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
          platformName: "windows",
          "appium:deviceName": "WindowsPC",
          "appium:automationName": "windows",
          "appium:app": join(process.cwd(), "\\apps\\bin\\uplink.exe"),
          "appium:systemPort": 4725,
          "appium:createSessionTimeout": 40000,
          "ms:waitForAppLaunch": 50,
          "appium:appArguments": "--path " + join(process.cwd(), "\\apps\\ChatUserA"),
          "appium:prerun": {
            command: `If (Test-Path ${userACacheFolder}) {Remove-Item -Recurse -Force ${userACacheFolder}} Else { Break }`,
          },
        }
      },
      userB: {
        capabilities: {
          platformName: "windows",
          "appium:deviceName": "WindowsPC",
          "appium:automationName": "windows",
          "appium:app": join(process.cwd(), "\\apps\\bin\\uplink2.exe"),
          "appium:systemPort": 4726,
          "appium:createSessionTimeout": 40000,
          "ms:waitForAppLaunch": 50,
          "appium:appArguments": "--path " + join(process.cwd(), "\\apps\\ChatUserB"),
          "appium:prerun": {
            command: `If (Test-Path ${userBCacheFolder}) {Remove-Item -Recurse -Force ${userBCacheFolder}} Else { Break }`,
          },
        }
      },
    },
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
            return `test-results-windows-chats-${options.cid}.xml`;
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
      const cacheFolderUserA = join(process.cwd(), "\\apps\\ChatUserB")
      const cacheFolderUserB = join(process.cwd(), "\\apps\\ChatUserB")
      const allureResultsFolder = join(process.cwd(), "\\allure-results");
      const testReportFolder =  join(process.cwd(), "\\test-report");
      const testResultsFolder =  join(process.cwd(), "\\test-results");
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

    beforeTest: async function (test) {
      // Start video recording for each test and instance
      await driver[USER_A_INSTANCE].executeScript("windows: startRecordingScreen", [
        {
          deviceId: 1
        },
      ]);
    },

    afterTest: async function (test, describe, { error }) {
        // Stop video recording for both instances and save video into base64 format
        const base64VideoUserA = await driver[USER_A_INSTANCE].executeScript("windows: stopRecordingScreen", [
          {
            remotePath: ""
          },
        ]);
        if (error) {
          let imageFile = await driver.takeScreenshot();
          let imageFolder = join(process.cwd(), "./test-results/windows-chats", test.parent);
          const imageTitle = test.title + " - Failed.png";
          const videoTitleUserA = test.title + " - User A - Failed.mp4"
          await fsp.mkdir(imageFolder, {recursive: true});
          await fsp.writeFile(
            imageFolder + "/" + imageTitle,
            imageFile,
            "base64"
          );

           // Write Video File if test fails and add it to failed screenshots folder
           await fsp.writeFile(
            imageFolder + "/" + videoTitleUserA,
            base64VideoUserA,
            "base64"
          );

          // Add to Screenshot and Video to Allure Reporter
          const data = await readFileSync(`${imageFolder}/${imageTitle}`);
          const dataVideoUserA = await readFileSync(`${imageFolder}/${videoTitleUserA}`);
          allureReporter.addAttachment(imageTitle, data, 'image/png')
          allureReporter.addAttachment(videoTitleUserA, dataVideoUserA, 'video/mp4')
        }
      }
  }
}