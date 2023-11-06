import allureReporter from '@wdio/allure-reporter'
import { homedir } from "os";
import { join } from "path";
const fsp = require("fs").promises;
const { readFileSync, rmSync } = require("fs");
const os = require('os')
const path = require('path')
const { spawn, spawnSync } = require('child_process')

// keep track of the `tauri-driver` child process
let tauriDriver;

export const config: WebdriverIO.Config = {
    specs: [join(process.cwd(), "./tests/specs/tauri/**.spec.ts")],
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    maxInstances: 1,
    capabilities: [
    {
      maxInstances: 1,
      'tauri:options': {
        application: './Uplink/target/release/uplink',
      },
    },
  ],
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
          return `test-results-tauri-app-${options.cid}.xml`;
        }
      }
    ],
  ],
  framework: 'mocha',
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  specFileRetriesDelay: 10,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: false,
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000, // 2min
    bail: true,
  },

  // ensure the rust project is built since we expect this binary to exist for the webdriver sessions
  onPrepare: async function() {
    // Declare constants for folder locations
    const cacheFolder = homedir() + "/.uplink/.user"
    const allureResultsFolder = join(process.cwd(), "/allure-results");
    const testReportFolder =  join(process.cwd(), "/test-report");
    const testResultsFolder =  join(process.cwd(), "/test-results");
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
    // Execute the actions to clean up folders and copy required data
    try {
      await rmSync(cacheFolder, { recursive: true, force: true });
      console.log("Deleted Cache Folder Successfully!");
    } catch (error) {
      console.error(
        `Got an error trying to delete Cache Folder: ${error.message}`
      );
    }
    // Run cargo build release before starting
    await spawnSync('cargo', ['build', '--release'])
  }, 

  // ensure we are running `tauri-driver` before the session starts so that we can proxy the webdriver requests
  beforeSession: async function() {
    (tauriDriver = await spawn(
        path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
        [],
        { stdio: [null, process.stdout, process.stderr] }
      ))
  }, 
    
  // clean up the `tauri-driver` process we spawned at the start of the session
  afterSession: async function() {
    await tauriDriver.kill();
  },

  afterTest: async function (test, describe, { error }) {
    if (error) {
      let imageFile = await driver.takeScreenshot();
      let imageFolder = join(process.cwd(), "./test-results/tauri-app", test.parent);
      const imageTitle = test.title + " - Failed.png"
      await fsp.mkdir(imageFolder, {recursive: true});
      await fsp.writeFile(
        imageFolder + "/" + imageTitle,
        imageFile,
        "base64"
      );

      // Add to Screenshot to Allure Reporter
      const data = await readFileSync(`${imageFolder}/${imageTitle}`);
      allureReporter.addAttachment(imageTitle, data, 'image/png')
    }
  }
}


  
