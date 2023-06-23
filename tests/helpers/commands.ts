import CreatePinScreen from "../screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "../screenobjects/account-creation/CreateUserScreen";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { homedir } from "os";
import { join } from "path";
import {
  MACOS_BUNDLE_ID,
  MACOS_DRIVER,
  USER_A_INSTANCE,
  USER_B_INSTANCE,
  WINDOWS_APP,
  WINDOWS_DRIVER,
} from "./constants";
const { readFileSync, rmSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const fsp = require("fs").promises;
const robot = require("robotjs");
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);
let createPinSecondUser = new CreatePinScreen(USER_B_INSTANCE);
let createUserFirstUser = new CreateUserScreen(USER_A_INSTANCE);
let createUserSecondUser = new CreateUserScreen(USER_B_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let friendsScreenSecondUser = new FriendsScreen(USER_B_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

// Users cache helper functions

export async function deleteCache() {
  const target = homedir() + "/.uplink/.user";
  await rmSync(target, { recursive: true, force: true });
}

export async function grabCacheFolder(username: string, instance: string) {
  const source = homedir() + "/.uplink";
  const currentDriver = await driver[instance].capabilities.automationName;
  const target = "./tests/fixtures/users/" + currentDriver + "/" + username;
  await fsp.mkdir(target, { recursive: true });
  try {
    await fsp.cp(source, target, { recursive: true });
    console.log("Copied user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`
    );
  }
}

export async function loadTestUserData(user: string, instance: string) {
  // Move files
  const currentDriver = await driver[instance].capabilities.automationName;
  const source = "./tests/fixtures/users/" + currentDriver + "/" + user;
  const target = homedir() + "/.uplink";
  try {
    await deleteCache();
    await fsp.cp(source, target, { recursive: true }, { force: true });
    console.log("Copied user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`
    );
  }
}

// DidKeys and username handling functions

export async function getUserKey(username: string, instance: string) {
  // Read user data and store variable with DID Key from JSON file
  const currentDriver = await driver[instance].capabilities.automationName;
  const source =
    "./tests/fixtures/users/" + currentDriver + "/" + username + ".json";
  const jsonFile = readFileSync(source);
  const jsonFileParsed = JSON.parse(jsonFile);
  const didkey = jsonFileParsed.key;
  return didkey;
}

export async function saveTestKeys(
  username: string,
  didkey: string,
  instance: string
) {
  // Save JSON file with keys
  const currentDriver = await driver[instance].capabilities.automationName;
  const target = "./tests/fixtures/users/" + currentDriver;
  const filepath = target + "/" + username + ".json";
  await fsp.mkdir(target, { recursive: true });
  const userData = { username: username, key: didkey };
  try {
    writeFileSync(filepath, JSON.stringify(userData, null, 2), "utf8");
    console.log("Data successfully saved");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

// Login or Create Users Functions

export async function createNewUser(username: string) {
  // Enter pin for test user
  await createPinFirstUser.waitForIsShown(true);
  await createPinFirstUser.enterPin("1234");
  await createPinFirstUser.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await createUserFirstUser.enterUsername(username);
  await createUserFirstUser.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await welcomeScreenFirstUser.waitForIsShown(true);

  // Workaround to ensure that user clicks on Add Someone
  await welcomeScreenFirstUser.clickAddSomeone();
  await friendsScreenFirstUser.waitForIsShown(true);
}

export async function createNewUserSecondInstance(username: string) {
  // Enter pin for test user
  await createPinSecondUser.waitForIsShown(true);
  await createPinSecondUser.enterPin("1234");
  await createPinSecondUser.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await createUserSecondUser.enterUsername(username);
  await createUserSecondUser.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await welcomeScreenSecondUser.waitForIsShown(true);

  // Workaround to ensure that user clicks on Add Someone
  await welcomeScreenSecondUser.clickAddSomeone();
  await friendsScreenSecondUser.waitForIsShown(true);
}
export async function loginWithTestUser() {
  // Enter pin for test user
  await createPinFirstUser.waitForIsShown(true);
  await createPinFirstUser.enterPin("1234");

  // Ensure Main Screen is displayed
  await welcomeScreenFirstUser.waitForIsShown(true);

  // Only maximize if current driver is windows
  const currentDriver = await welcomeScreenFirstUser.getCurrentDriver();
  if (currentDriver === WINDOWS_DRIVER) {
    await maximizeWindow(USER_A_INSTANCE);
  }
}

export async function loginWithTestUserSecondInstance() {
  // Enter pin for test user
  await createPinSecondUser.waitForIsShown(true);
  await createPinSecondUser.enterPin("1234");

  // Ensure Main Screen is displayed
  await welcomeScreenSecondUser.waitForIsShown(true);

  // Only maximize if current driver is windows
  const currentDriver = await welcomeScreenSecondUser.getCurrentDriver();
  if (currentDriver === WINDOWS_DRIVER) {
    await maximizeWindow(USER_B_INSTANCE);
  }
}

export async function resetApp(instance: string) {
  await closeApplication(instance);
  await deleteCache();
  await launchApplication(instance);
}

export async function resetAndLoginWithCache(user: string) {
  await closeApplication(USER_A_INSTANCE);
  await deleteCache();
  await loadTestUserData(user, USER_A_INSTANCE);
  await launchApplication(USER_A_INSTANCE);
  await loginWithTestUser();
}

// Application Manage Functions

export async function launchApplication(instance: string) {
  const currentOS = await driver[instance].capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver[instance].executeScript("windows: launchApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver[instance].executeScript("macos: launchApp", [
      {
        bundleId: MACOS_BUNDLE_ID,
      },
    ]);
  }
}

export async function closeApplication(instance: string) {
  const currentOS = await driver[instance].capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver[instance].executeScript("windows: closeApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver[instance].executeScript("macos: terminateApp", [
      {
        bundleId: MACOS_BUNDLE_ID,
      },
    ]);
  }
}

export async function maximizeWindow(instance: string) {
  const currentOS = await driver[instance].capabilities.automationName;
  const currentInstance = await browser.getInstance(instance);
  if (currentOS === WINDOWS_DRIVER) {
    await currentInstance.$('[name="square-button"]').click();
  } else if (currentOS === MACOS_DRIVER) {
    await currentInstance.$("~_XCUI:FullScreenWindow").click();
  }
}

// MacOS driver helper functions

export async function clickOnSwitchMacOS(
  element: WebdriverIO.Element,
  instance: string
) {
  const currentInstance = await browser.getInstance(instance);
  const elementLocator = await currentInstance.$(element);

  // Get X and Y coordinates to hover on from element
  const elementX = await elementLocator.getLocation("x");
  const elementY = await elementLocator.getLocation("y");

  // Hover on X and Y coordinates previously retrieved
  await driver[instance].executeScript("macos: click", [
    {
      x: elementX,
      y: elementY,
    },
  ]);
}

export async function getClipboardMacOS() {
  const clipboard = await execSync("pbpaste", { encoding: "utf8" });
  return clipboard;
}

export async function hoverOnMacOS(
  locator: WebdriverIO.Element,
  instance: string
) {
  // Hover on X and Y coordinates previously retrieved
  await driver[instance].executeScript("macos: hover", [
    {
      elementId: locator,
    },
  ]);
}

export async function saveFileOnMacOS(filename: string, instance: string) {
  const currentInstance = await browser.getInstance(instance);

  // Wait for Save Dialog to be displayed
  await currentInstance.$("~save-panel").waitForDisplayed();

  // Type the new file name
  await currentInstance.$("~saveAsNameTextField").setValue(filename);

  // Click on OK Button to save into Downloads folder
  await currentInstance.$("~OKButton").click();

  // Wait until Save Dialog is closed
  await currentInstance.$("~save-panel").waitForExist({ reverse: true });

  // Delete file from local files
  const target = join(process.cwd(), "/tests/fixtures/", filename);
  rmSync(target, { force: true });
}

export async function selectFileOnMacos(
  relativePath: string,
  instance: string
) {
  const currentInstance = await browser.getInstance(instance);

  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);

  // Wait for Open Panel to be displayed
  await currentInstance.$("~open-panel").waitForDisplayed();

  // Open Go To File
  await driver[instance].executeScript("macos: keys", [
    {
      keys: [
        {
          key: "/",
        },
      ],
    },
  ]);

  //Ensure that Go To File is displayed on screen
  await currentInstance.$("~GoToWindow").waitForDisplayed();

  // Remove the / and type filepath into go to file section and ensure that it contains the filepath expected
  await currentInstance
    .$("~GoToWindow")
    .$("-ios class chain:**/XCUIElementTypeTextField")
    .clearValue();
  await currentInstance
    .$("~GoToWindow")
    .$("-ios class chain:**/XCUIElementTypeTextField")
    .addValue(filepath + "\n");

  // Hit Enter and then click on OK to close open panel
  await currentInstance.$("~OKButton").click();

  // Wait until Dialog is closed
  await currentInstance.$("~open-panel").waitForExist({ reverse: true });
}

export async function rightClickOnMacOS(
  locator: WebdriverIO.Element,
  instance: string
) {
  await driver[instance].executeScript("macos: rightClick", [
    {
      elementId: locator,
    },
  ]);
}

// Windows driver helper functions

export async function hoverOnWindows(
  locator: WebdriverIO.Element,
  instance: string
) {
  await driver[instance].moveToElement(locator.elementId);
}

export async function rightClickOnWindows(
  locator: WebdriverIO.Element,
  instance: string
) {
  await driver[instance].touchAction([{ action: "press", element: locator }]);
  await robot.mouseClick("right");
}

export async function saveFileOnWindows(
  filename: string,
  uplinkContext: string,
  instance: string
) {
  // Get the filepath to select on browser
  const currentInstance = await browser.getInstance(instance);
  const filepath = join(process.cwd(), "\\tests\\fixtures\\", filename);

  // Pause for one second until explorer window is displayed and switch to it
  const windows = await driver[instance].getWindowHandles();
  let explorerWindow;
  if (windows[0] === uplinkContext) {
    explorerWindow = windows[1];
  } else {
    explorerWindow = windows[0];
  }

  await driver[instance].switchToWindow(explorerWindow);

  // Wait for Save Panel to be displayed
  await currentInstance.$("~TitleBar").waitForDisplayed();

  // Type file location and hit enter
  await currentInstance.$("/Window/Pane[1]/ComboBox[1]/Edit").clearValue();

  await currentInstance
    .$("/Window/Pane[1]/ComboBox[1]/Edit")
    .setValue(filename + "\uE007");

  // Wait for Save Panel not to be displayed
  await currentInstance.$("~TitleBar").waitForExist({ reverse: true });

  await driver[instance].switchToWindow(uplinkContext);

  // Delete file from local files
  await rmSync(filepath, { force: true });
  return;
}

export async function selectFileOnWindows(relativePath: string) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);
  await browser.pause(1000);
  await robot.typeString(filepath);
  await robot.keyTap("enter");
  await browser.pause(1000);
}
