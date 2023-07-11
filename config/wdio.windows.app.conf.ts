import { homedir } from "os";
import { join } from "path";
const fsp = require("fs").promises;
const { rmSync } = require("fs");

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
 
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
    specs: [join(process.cwd(), "./tests/suites/MainTests/02-UplinkWindows.suite.ts")],
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
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    port: 4723,
    path: '/',
    capabilities: {
      userA: {
        capabilities: {
          platformName: "windows",
          "appium:deviceName": "WindowsPC",
          "appium:automationName": "windows",
          "appium:app": join(process.cwd(), "\\apps\\uplink.exe"),
          "ms:waitForAppLaunch": 30,
          "appium:prerun": {
            command: 'If (Test-Path $home/.uplink/.user) {Remove-Item -Recurse -Force $home/.uplink/.user} Else { Break }',
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
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: 
      [
        ["appium", { 
          command: "appium", 
          args: {
            port: 4723,
            relaxedSecurity: true, 
            log: "./appium.log"
          },
        }], 
      ],
    
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [[
        "spec", 
        {
          showPreface: false,
        },
      ], ['junit', {
            outputDir: './test-report/',
            outputFileFormat: function (options) {
                return `test-results-windows-app-${options.cid}.xml`;
            }
      }],
      ['allure', 
      {
        outputDir: './allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      }
    ]
  ],  
    specFileRetries: 1,

    
    //
    // Options to be passed to Mocha.
    mochaOpts: {
        ui: "bdd",
        /**
         * NOTE: This has been increased for more stable Appium Native app
         * tests because they can take a bit longer.
         */
        timeout: 120000, // 2min
    },
    
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    onPrepare: async function() {
      const allureResultsFolder = join(process.cwd(), "\\allure-results")
      const cacheFolder = homedir() + "\\.uplink\\.user"
      const testReportFolder =  join(process.cwd(), "\\test-report")
      const testResultsFolder =  join(process.cwd(), "\\test-results")
      const sourceReusableData = join(process.cwd(), "\\tests\\fixtures\\users\\FriendsTestUser")
      const targetReusableData = join(process.cwd(), "\\tests\\fixtures\\users\\windows\\FriendsTestUser")
      await rmSync(allureResultsFolder, { recursive: true, force: true });
      await rmSync(cacheFolder, { recursive: true, force: true });
      await rmSync(testReportFolder, { recursive: true, force: true });
      await rmSync(testResultsFolder, { recursive: true, force: true });
      await fsp.mkdir(targetReusableData, { recursive: true });
      await fsp.cp(sourceReusableData, targetReusableData, { recursive: true });
    },
 
    afterTest: async function (test, describe, { error }) {
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
      }
}