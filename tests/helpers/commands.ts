require("module-alias/register");
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "@screenobjects/account-creation/CreateUserScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import { homedir } from "os";
import { join } from "path";
import {
  MACOS_BUNDLE_ID,
  MACOS_DRIVER,
  MACOS_USER_A_BUNDLE_ID,
  MACOS_USER_B_BUNDLE_ID,
  WINDOWS_APP,
  WINDOWS_DRIVER,
} from "./constants";
const { readFileSync, rmSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const fsp = require("fs").promises;
const { clipboard, mouse, Button } = require("@nut-tree/nut-js");
let createPin = new CreatePinScreen();
let createUser = new CreateUserScreen();
let friendsScreen = new FriendsScreen();
let welcomeScreen = new WelcomeScreen();

// Users cache helper functions

export async function deleteCache() {
  const target = homedir() + "/.uplink/.user";
  try {
    await rmSync(target, { recursive: true, force: true });
    console.log("Deleted user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to delete the user cache files: ${error.message}`,
    );
  }
}

export async function grabCacheFolder(username: string) {
  const source = homedir() + "/.uplink";
  const currentDriver = await driver.capabilities.automationName;
  const target = "./tests/fixtures/users/" + currentDriver + "/" + username;
  await fsp.mkdir(target, { recursive: true });
  try {
    await fsp.cp(source, target, { recursive: true });
    console.log("Copied user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`,
    );
  }
}

export async function loadTestUserData(user: string) {
  // Move files
  const currentDriver = await driver.capabilities.automationName;
  let source, target;
  source = "./tests/fixtures/users/" + currentDriver + "/" + user;
  target = homedir() + "/.uplink";
  await deleteCache();
  try {
    await fsp.cp(source, target, { recursive: true }, { force: true });
    console.log("Copied user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`,
    );
  }
}

// DidKeys and username handling functions

export async function getUserKey(username: string) {
  // Read user data and store variable with DID Key from JSON file
  const currentDriver = await driver.capabilities.automationName;
  const source =
    "./tests/fixtures/users/" + currentDriver + "/" + username + ".json";
  const jsonFile = await readFileSync(source);
  const jsonFileParsed = await JSON.parse(jsonFile);
  const didkey = await jsonFileParsed.key;
  return didkey;
}

export async function saveTestKeys(username: string, didkey: string) {
  // Save JSON file with keys
  const currentDriver = await driver.capabilities.automationName;
  const target = "./tests/fixtures/users/" + currentDriver;
  const filepath = target + "/" + username + ".json";
  await fsp.mkdir(target, { recursive: true });
  const userData = { username: username, key: didkey };
  try {
    await writeFileSync(filepath, JSON.stringify(userData, null, 2), "utf8");
    console.log("Data successfully saved");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

// Login or Create Users Functions

export async function createNewUser(username: string) {
  await createPin.unlockLayout.waitForExist();

  // Enter pin for test user
  await createPin.enterPin("1234");
  await createPin.createAccountButton.waitForEnabled();
  await createPin.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await createUser.enterUsername(username);
  await createUser.createAccountButton.waitForEnabled();
  await createUser.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await welcomeScreen.welcomeLayout.waitForExist();

  // Workaround to ensure that user clicks on Add Someone
  await welcomeScreen.clickAddSomeone();
  await friendsScreen.friendsBody.waitForExist();
}

export async function loginWithTestUser() {
  // Enter pin for test user
  const unlockScreen = await createPin.unlockLayout;
  await unlockScreen.waitForExist();
  await createPin.enterPin("1234");
  await createPin.unlockLayout.waitForExist({ reverse: true });
}

export async function resetApp() {
  await closeApplication();
  await deleteCache();
  await launchApplication(MACOS_BUNDLE_ID, WINDOWS_APP);
}

export async function resetAndLoginWithCache(user: string) {
  await closeApplication();
  await deleteCache();
  await loadTestUserData(user);
  await launchApplication(MACOS_BUNDLE_ID, WINDOWS_APP);
  await loginWithTestUser();
}

// Application Manage Functions

export async function launchApplication(
  bundle: string = MACOS_BUNDLE_ID,
  appLocation: string = WINDOWS_APP,
) {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver.executeScript("windows: launchApp", [
      {
        app: join(process.cwd(), appLocation),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver.executeScript("macos: launchApp", [
      {
        bundleId: MACOS_BUNDLE_ID,
        arguments: ["--discovery", "disable", "--path", homedir() + "/.uplink"],
      },
    ]);
    await browser.pause(5000);
  }
}

export async function launchFirstApplication() {
  await driver.executeScript("macos: launchApp", [
    {
      bundleId: MACOS_USER_A_BUNDLE_ID,
      arguments: ["--discovery", "disable", "--path", homedir() + "/.uplink"],
    },
  ]);
  await browser.pause(5000);
}

export async function launchSecondApplication() {
  await driver.executeScript("macos: launchApp", [
    {
      bundleId: MACOS_USER_B_BUNDLE_ID,
      arguments: [
        "--discovery",
        "disable",
        "--path",
        homedir() + "/.uplinkUserB",
      ],
    },
  ]);
  await browser.pause(5000);
}

export async function activateFirstApplication() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver.executeScript("windows: activateApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver.executeScript("macos: activateApp", [
      {
        bundleId: MACOS_USER_A_BUNDLE_ID,
      },
    ]);
  }
}

export async function activateSecondApplication() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver.executeScript("windows: activateApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver.executeScript("macos: activateApp", [
      {
        bundleId: MACOS_USER_B_BUNDLE_ID,
      },
    ]);
  }
}

export async function closeApplication() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver.executeScript("windows: closeApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver.executeScript("macos: terminateApp", [
      {
        bundleId: MACOS_BUNDLE_ID,
      },
    ]);
  }
}

export async function closeFirstApplication() {
  await driver.executeScript("macos: terminateApp", [
    {
      bundleId: MACOS_USER_A_BUNDLE_ID,
    },
  ]);
}

export async function closeSecondApplication() {
  await driver.executeScript("macos: terminateApp", [
    {
      bundleId: MACOS_USER_B_BUNDLE_ID,
    },
  ]);
}

export async function maximizeWindow() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    const button = await $('[name="square-button"]');
    await button.click();
  } else if (currentOS === MACOS_DRIVER) {
    const button = await $("~_XCUI:FullScreenWindow");
    await button.click();
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

export async function getClipboardValue() {
  const clipboardValue = await clipboard.getContent();
  return clipboardValue;
}

export async function hoverOnMacOS(locator: WebdriverIO.Element) {
  const elementId = await locator.elementId;
  await driver.executeScript("macos: hover", [
    {
      elementId: elementId,
    },
  ]);
}

export async function saveFileOnMacOS(filename: string) {
  // Wait for Save Dialog to be displayed
  const savePanel = await $("~save-panel");
  await savePanel.waitForExist();

  // Type the new file name
  const saveAsInputField = await $("~saveAsNameTextField");
  await saveAsInputField.setValue(filename);

  // Click on OK Button to save into Downloads folder
  const okButton = await $("~OKButton");
  await okButton.click();

  // Wait until Save Dialog is closed
  await savePanel.waitForExist({ reverse: true });

  // Delete file from local files
  const target = join(process.cwd(), "/tests/fixtures/", filename);
  rmSync(target, { force: true });
}

export async function selectFileOnMacos(relativePath: string) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);

  // Wait for Open Panel to be displayed
  const openPanel = await $("~open-panel");
  await openPanel.waitForExist();

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
  const goToWindow = await $("~GoToWindow");
  await goToWindow.waitForExist();

  // Remove the / and type filepath into go to file section and ensure that it contains the filepath expected
  const textField = await $("~GoToWindow").$(
    "-ios class chain:**/XCUIElementTypeTextField",
  );
  await textField.clearValue();
  await textField.addValue(filepath + "\n");

  // Hit Enter and then click on OK to close open panel
  const okButton = await $("~OKButton");
  await okButton.click();

  // Wait until Dialog is closed
  await openPanel.waitForExist({ reverse: true });
}

export async function rightClickOnMacOS(locator: WebdriverIO.Element) {
  const elementId = await locator.elementId;
  await driver.executeScript("macos: rightClick", [
    {
      elementId: elementId,
    },
  ]);
  await mouse.click(Button.RIGHT);
}

// Windows driver helper functions

export async function hoverOnWindows(locator: WebdriverIO.Element) {
  await driver.moveToElement(locator.elementId);
}

export async function rightClickOnWindows(locator: WebdriverIO.Element) {
  await driver.moveToElement(locator.elementId);
  await mouse.click(Button.RIGHT);
}

export async function saveFileOnWindows(
  filename: string,
  uplinkContext: string,
) {
  // Pause for 5 seconds until explorer window is displayed and switch to it
  await browser.pause(5000);
  const windows = await driver.getWindowHandles();
  let explorerWindow;
  windows[0] === uplinkContext
    ? (explorerWindow = windows[1])
    : (explorerWindow = windows[0]);
  await driver.switchToWindow(explorerWindow);

  // Wait for Save Panel to be displayed
  const titleBar = await $("~TitleBar");
  await titleBar.waitForExist();

  // Type file location and hit enter
  const editInput = await $("/Window/Pane[1]/ComboBox[1]/Edit");
  await editInput.clearValue();
  await editInput.setValue(filename + "\uE007");

  // Wait for Save Panel not to be displayed
  await titleBar.waitForExist({ reverse: true });

  await driver.switchToWindow(uplinkContext);
}

export async function selectFileOnWindows(
  relativePath: string,
  uplinkContext: string,
) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);
  await browser.pause(5000);
  const windows = await driver.getWindowHandles();
  let explorerWindow;
  windows[0] === uplinkContext
    ? (explorerWindow = windows[1])
    : (explorerWindow = windows[0]);
  await driver.switchToWindow(explorerWindow);

  // Wait for Save Panel to be displayed
  const listView = await $("~listview");
  await listView.waitForExist({ timeout: 25000 });

  // Type file location and hit enter
  const editField = await $("//Window/ComboBox/Edit");
  await editField.clearValue();
  await editField.setValue(filepath + "\uE007");

  // Wait for Save Panel not to be displayed
  await listView.waitForExist({ reverse: true });
  await driver.switchToWindow(uplinkContext);
}

export async function getUplinkWindowHandle() {
  // Do a for loop that will try to do the next lines for 3 times
  for (let i = 0; i < 3; i++) {
    try {
      const uplinkContext = await driver.getWindowHandle();
      if (typeof uplinkContext !== "undefined") {
        return uplinkContext.toString();
      }
    } catch (error) {
      console.log("Error trying to get current Window Handle: ", error);
    }
  }
}
