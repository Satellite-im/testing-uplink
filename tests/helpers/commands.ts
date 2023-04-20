import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { faker } from "@faker-js/faker";
import { homedir } from "os";
import { join } from "path";
const { readFileSync, rmSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const fsp = require("fs").promises;
const mkdirp = require("mkdirp");
const robot = require("robotjs");

// Users cache helper functions

export async function deleteCache() {
  const target = homedir() + "/.uplink";
  rmSync(target, { recursive: true, force: true });
}

export async function grabCacheFolder(username: string) {
  const source = homedir() + "/.uplink";
  const target = "./tests/fixtures/users/" + username;
  await mkdirp(target);
  try {
    await fsp.cp(source, target, { recursive: true });
    console.log("Copied user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`
    );
  }
}

export async function loadTestUserData(user: string) {
  // Move files
  const source = "./tests/fixtures/users/" + user;
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

export async function getUserKey(username: string) {
  // Read user data and store variable with DID Key from JSON file
  const source = "./tests/fixtures/users/" + username + ".json";
  const jsonFile = readFileSync(source);
  const jsonFileParsed = JSON.parse(jsonFile);
  const didkey = jsonFileParsed.key;
  return didkey;
}

export async function saveTestKeys(username: string, didkey: string) {
  // Save JSON file with keys
  const target = "./tests/fixtures/users/" + username + ".json";
  const userData = { username: username, key: didkey };
  try {
    writeFileSync(target, JSON.stringify(userData, null, 2), "utf8");
    console.log("Data successfully saved");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

// Login or Create Users Functions

export async function createNewUser(username: string) {
  // Enter pin for test user
  await CreatePinScreen.waitForIsShown(true);
  await CreatePinScreen.enterPin("1234");
  await CreatePinScreen.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await CreateUserScreen.enterUsername(username);
  await CreateUserScreen.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await WelcomeScreen.waitForIsShown(true);

  // Workaround to ensure that user clicks on Add Someone
  await WelcomeScreen.clickAddSomeone();
  await FriendsScreen.waitForIsShown(true);
  return username;
}

export async function loginWithRandomUser() {
  const randomPin = await faker.internet.password(4, true);
  const randomUser = await faker.internet.password(12, true);

  // Enter Pin and click on Create Account
  await CreatePinScreen.enterPin(randomPin);
  await CreatePinScreen.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await CreateUserScreen.enterUsername(randomUser);
  await CreateUserScreen.clickOnCreateAccount();
}

export async function loginWithTestUser() {
  // Enter pin for test user
  await CreatePinScreen.waitForIsShown(true);
  await CreatePinScreen.enterPin("1234");

  // Ensure Main Screen is displayed
  await WelcomeScreen.waitForIsShown(true);

  // Only maximize if current driver is windows
  const currentDriver = await WelcomeScreen.getCurrentDriver();
  if (currentDriver === "windows") {
    await maximizeWindow();
  }
}

export async function resetApp() {
  await closeApplication();
  await deleteCache();
  await launchApplication();
}

export async function resetAndLoginWithCache(user: string) {
  await closeApplication();
  await deleteCache();
  await loadTestUserData(user);
  await launchApplication();
  await loginWithTestUser();
}

// Application Manage Functions

export async function launchApplication() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === "windows") {
    await driver.executeScript("windows: launchApp", [
      {
        app: join(process.cwd(), "\\apps\\ui.exe"),
      },
    ]);
  } else if (currentOS === "mac2") {
    await driver.executeScript("macos: launchApp", [
      {
        bundleId: "im.satellite.uplink",
      },
    ]);
  }
}

export async function closeApplication() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === "windows") {
    await driver.executeScript("windows: closeApp", [
      {
        app: join(process.cwd(), "\\apps\\ui.exe"),
      },
    ]);
  } else if (currentOS === "mac2") {
    await $("~_XCUI:CloseWindow").click();
  }
}

export async function maximizeWindow() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === "windows") {
    await $('[name="square-button"]').click();
  } else if (currentOS === "mac2") {
    await $("~_XCUI:FullScreenWindow").click();
  }
}

export async function minimizeWindow() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === "windows") {
    await $('[name="minimize-button"]').click();
  } else if (currentOS === "mac2") {
    await $("~_XCUI:MinimizeWindow").click();
  }
}
// MacOS driver helper functions

export async function clickOnSwitchMacOS(element: WebdriverIO.Element) {
  const elementLocator = await $(element);

  // Get X and Y coordinates to hover on from element
  const elementX = await elementLocator.getLocation("x");
  const elementY = await elementLocator.getLocation("y");

  // Hover on X and Y coordinates previously retrieved
  await driver.executeScript("macos: click", [
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

export async function hoverOnMacOS(locator: WebdriverIO.Element) {
  // Hover on X and Y coordinates previously retrieved
  await driver.executeScript("macos: hover", [
    {
      elementId: locator,
    },
  ]);
}

export async function saveFileOnMacOS(filename: string) {
  // Wait for Save Dialog to be displayed
  await $("~save-panel").waitForDisplayed();

  // Type the new file name
  await (await $("~saveAsNameTextField")).setValue(filename);

  // Click on OK Button to save into Downloads folder
  await $("~OKButton").click();

  // Wait until Save Dialog is closed
  await $("~save-panel").waitForExist({ reverse: true });

  // Delete file from local files
  const target = join(process.cwd(), "/tests/fixtures/", filename);
  rmSync(target, { force: true });
}

export async function selectFileOnMacos(relativePath: string) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);

  // Wait for Open Panel to be displayed
  await $("~open-panel").waitForDisplayed();

  // Open Go To File
  await driver.executeScript("macos: keys", [
    {
      keys: [
        {
          key: "/",
        },
      ],
    },
  ]);

  //Ensure that Go To File is displayed on screen
  await $("~GoToWindow").waitForDisplayed();

  // Remove the / and type filepath into go to file section and ensure that it contains the filepath expected
  await $("~GoToWindow")
    .$("-ios class chain:**/XCUIElementTypeTextField")
    .clearValue();
  await $("~GoToWindow")
    .$("-ios class chain:**/XCUIElementTypeTextField")
    .addValue(filepath + "\n");

  // Hit Enter and then click on OK to close open panel
  await $("~OKButton").click();

  // Wait until Dialog is closed
  await $("~open-panel").waitForExist({ reverse: true });
}

export async function rightClickOnMacOS(locator: WebdriverIO.Element) {
  await driver.executeScript("macos: rightClick", [
    {
      elementId: locator,
    },
  ]);
}

// Windows driver helper functions

export async function hoverOnWindows(locator: WebdriverIO.Element) {
  await driver.moveToElement(locator.elementId);
}

export async function rightClickOnWindows(locator: WebdriverIO.Element) {
  await driver.touchAction([{ action: "press", element: locator }]);
  robot.mouseClick("right");
}

export async function saveFileOnWindows(
  filename: string,
  uplinkContext: string
) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), "\\tests\\fixtures\\", filename);

  // Pause for one second until explorer window is displayed and switch to it
  const windows = await driver.getWindowHandles();
  let explorerWindow;
  if (windows[0] === uplinkContext) {
    explorerWindow = windows[1];
  } else {
    explorerWindow = windows[0];
  }

  await driver.switchToWindow(explorerWindow);

  // Wait for Save Panel to be displayed
  await $("~TitleBar").waitForDisplayed();

  // Type file location and hit enter
  await $("/Window/Pane[1]/ComboBox[1]/Edit").clearValue();
  await (
    await $("/Window/Pane[1]/ComboBox[1]/Edit")
  ).setValue(filename + "\uE007");

  // Wait for Save Panel not to be displayed
  await $("~TitleBar").waitForExist({ reverse: true });

  await driver.switchToWindow(uplinkContext);

  // Delete file from local files
  await rmSync(filepath, { force: true });
  return;
}

export async function selectFileOnWindows(relativePath: string) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);

  await robot.typeString(filepath);
  await robot.keyTap("enter");
  await browser.pause(1000);
}
