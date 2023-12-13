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
  USER_A_INSTANCE,
  USER_B_INSTANCE,
  WINDOWS_APP,
  WINDOWS_DRIVER,
} from "./constants";
const { readFileSync, rmSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const fsp = require("fs").promises;
const {
  clipboard,
  mouse,
  straightTo,
  Point,
  Button,
} = require("@nut-tree/nut-js");
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
  try {
    await rmSync(target, { recursive: true, force: true });
    console.log("Deleted user cache successfully");
  } catch (error) {
    console.error(
      `Got an error trying to delete the user cache files: ${error.message}`,
    );
  }
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
      `Got an error trying to copy the user cache files: ${error.message}`,
    );
  }
}

export async function loadTestUserData(user: string, instance: string) {
  // Move files
  const currentDriver = await driver[instance].capabilities.automationName;
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

export async function getUserKey(username: string, instance: string) {
  // Read user data and store variable with DID Key from JSON file
  const currentDriver = await driver[instance].capabilities.automationName;
  const source =
    "./tests/fixtures/users/" + currentDriver + "/" + username + ".json";
  const jsonFile = await readFileSync(source);
  const jsonFileParsed = await JSON.parse(jsonFile);
  const didkey = await jsonFileParsed.key;
  return didkey;
}

export async function saveTestKeys(
  username: string,
  didkey: string,
  instance: string,
) {
  // Save JSON file with keys
  const currentDriver = await driver[instance].capabilities.automationName;
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
  await createPinFirstUser.unlockLayout.waitForExist();

  // Enter pin for test user
  await createPinFirstUser.enterPin("1234");
  await createPinFirstUser.createAccountButton.waitForEnabled();
  await createPinFirstUser.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await createUserFirstUser.enterUsername(username);
  await createUserFirstUser.createAccountButton.waitForEnabled();
  await createUserFirstUser.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await welcomeScreenFirstUser.welcomeLayout.waitForExist();

  // Workaround to ensure that user clicks on Add Someone
  await welcomeScreenFirstUser.clickAddSomeone();
  await friendsScreenFirstUser.friendsBody.waitForExist();
}

export async function createNewUserSecondInstance(username: string) {
  // Reset Pin before creating new user
  await createPinSecondUser.unlockLayout.waitForExist();
  await createPinSecondUser.openHelpButtonMenu();
  await createPinSecondUser.clickOnResetAccount();

  // Enter pin for test user
  await createPinSecondUser.enterPin("1234");
  await createPinSecondUser.createAccountButton.waitForEnabled();
  await createPinSecondUser.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await createUserSecondUser.enterUsername(username);
  await createUserSecondUser.createAccountButton.waitForEnabled();
  await createUserSecondUser.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await welcomeScreenSecondUser.welcomeLayout.waitForExist();

  // Workaround to ensure that user clicks on Add Someone
  await welcomeScreenSecondUser.clickAddSomeone();
  await friendsScreenSecondUser.friendsBody.waitForExist();
}

export async function loginWithTestUser() {
  // Enter pin for test user
  const unlockScreen = await createPinFirstUser.unlockLayout;
  await unlockScreen.waitForExist();
  await createPinFirstUser.enterPin("1234");

  // Ensure Main Screen is displayed
  const welcomeLayout = await welcomeScreenFirstUser.welcomeLayout;
  await welcomeLayout.waitForExist();

  // Only maximize if current driver is windows
  const currentDriver = await welcomeScreenFirstUser.getCurrentDriver();
  if (currentDriver === WINDOWS_DRIVER) {
    await maximizeWindow(USER_A_INSTANCE);
  }
}

export async function loginWithTestUserSecondInstance() {
  // Enter pin for test user
  const unlockLayout = await createPinSecondUser.unlockLayout;
  await unlockLayout.waitForExist();
  await createPinSecondUser.enterPin("1234");

  // Ensure Main Screen is displayed
  const welcomeLayout = await welcomeScreenSecondUser.welcomeLayout;
  await welcomeLayout.waitForExist();

  // Only maximize if current driver is windows
  const currentDriver = await welcomeScreenSecondUser.getCurrentDriver();
  if (currentDriver === WINDOWS_DRIVER) {
    await maximizeWindow(USER_B_INSTANCE);
  }
}

export async function resetApp(instance: string) {
  await closeApplication(instance);
  await deleteCache();
  await launchApplication(instance, MACOS_BUNDLE_ID, WINDOWS_APP);
}

export async function resetAndLoginWithCache(user: string) {
  await closeApplication(USER_A_INSTANCE);
  await deleteCache();
  await loadTestUserData(user, USER_A_INSTANCE);
  await launchApplication(USER_A_INSTANCE, MACOS_BUNDLE_ID, WINDOWS_APP);
  await loginWithTestUser();
}

// Application Manage Functions

export async function launchApplication(
  instance: string = USER_A_INSTANCE,
  bundle: string = MACOS_BUNDLE_ID,
  appLocation: string = WINDOWS_APP,
) {
  const currentOS = await driver[instance].capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver[instance].executeScript("windows: launchApp", [
      {
        app: join(process.cwd(), appLocation),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver[instance].executeScript("macos: launchApp", [
      {
        bundleId: bundle,
      },
    ]);
  }
}

export async function launchSecondApplication() {
  await driver[USER_A_INSTANCE].executeScript("macos: launchApp", [
    {
      bundleId: MACOS_USER_B_BUNDLE_ID,
      arguments: ["--path", homedir() + "/.uplinkUserB"],
    },
  ]);
  await browser.pause(5000);
}

export async function activateFirstApplication(
  instance: string = USER_A_INSTANCE,
) {
  const currentOS = await driver[instance].capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver[instance].executeScript("windows: activateApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver[instance].executeScript("macos: activateApp", [
      {
        bundleId: MACOS_USER_A_BUNDLE_ID,
      },
    ]);
  }
}

export async function activateSecondApplication(
  instance: string = USER_A_INSTANCE,
) {
  const currentOS = await driver[instance].capabilities.automationName;
  if (currentOS === WINDOWS_DRIVER) {
    await driver[instance].executeScript("windows: activateApp", [
      {
        app: join(process.cwd(), WINDOWS_APP),
      },
    ]);
  } else if (currentOS === MACOS_DRIVER) {
    await driver[instance].executeScript("macos: activateApp", [
      {
        bundleId: MACOS_USER_B_BUNDLE_ID,
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
    const button = await currentInstance.$('[name="square-button"]');
    await button.click();
  } else if (currentOS === MACOS_DRIVER) {
    const button = await currentInstance.$("~_XCUI:FullScreenWindow");
    await button.click();
  }
}

// MacOS driver helper functions

export async function clickOnSwitchMacOS(
  element: WebdriverIO.Element,
  instance: string,
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

export async function getClipboardValue() {
  const clipboardValue = await clipboard.getContent();
  return clipboardValue;
}

export async function saveFileOnMacOS(filename: string, instance: string) {
  const currentInstance = await browser.getInstance(instance);

  // Wait for Save Dialog to be displayed
  const savePanel = await currentInstance.$("~save-panel");
  await savePanel.waitForExist();

  // Type the new file name
  const saveAsInputField = await currentInstance.$("~saveAsNameTextField");
  await saveAsInputField.setValue(filename);

  // Click on OK Button to save into Downloads folder
  const okButton = await currentInstance.$("~OKButton");
  await okButton.click();

  // Wait until Save Dialog is closed
  await savePanel.waitForExist({ reverse: true });

  // Delete file from local files
  const target = join(process.cwd(), "/tests/fixtures/", filename);
  rmSync(target, { force: true });
}

export async function selectFileOnMacos(
  relativePath: string,
  instance: string,
) {
  const currentInstance = await browser.getInstance(instance);

  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);

  // Wait for Open Panel to be displayed
  const openPanel = await currentInstance.$("~open-panel");
  await openPanel.waitForExist();

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
  const goToWindow = await currentInstance.$("~GoToWindow");
  await goToWindow.waitForExist();

  // Remove the / and type filepath into go to file section and ensure that it contains the filepath expected
  const textField = await currentInstance
    .$("~GoToWindow")
    .$("-ios class chain:**/XCUIElementTypeTextField");
  await textField.clearValue();
  await textField.addValue(filepath + "\n");

  // Hit Enter and then click on OK to close open panel
  const okButton = await currentInstance.$("~OKButton");
  await okButton.click();

  // Wait until Dialog is closed
  await openPanel.waitForExist({ reverse: true });
}

// Windows driver helper functions

export async function hoverOnWindows(
  locator: WebdriverIO.Element,
  instance: string,
) {
  await driver[instance].moveToElement(locator.elementId);
}

export async function rightClickOnWindows(
  locator: WebdriverIO.Element,
  instance: string,
) {
  await driver[instance].moveToElement(locator.elementId);
  await mouse.click(Button.RIGHT);
}

export async function saveFileOnWindows(
  filename: string,
  uplinkContext: string,
  instance: string,
) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), "\\tests\\fixtures\\", filename);

  // Pause for 5 seconds until explorer window is displayed and switch to it
  await browser.pause(5000);
  const windows = await driver[instance].getWindowHandles();
  let explorerWindow;
  windows[0] === uplinkContext
    ? (explorerWindow = windows[1])
    : (explorerWindow = windows[0]);
  await driver[instance].switchToWindow(explorerWindow);

  // Wait for Save Panel to be displayed
  const titleBar = await driver[instance].$("~TitleBar");
  await titleBar.waitForExist();

  // Type file location and hit enter
  const editInput = await driver[instance].$(
    "/Window/Pane[1]/ComboBox[1]/Edit",
  );
  await editInput.clearValue();
  await editInput.setValue(filename + "\uE007");

  // Wait for Save Panel not to be displayed
  await titleBar.waitForExist({ reverse: true });

  await driver[instance].switchToWindow(uplinkContext);
}

export async function selectFileOnWindows(
  relativePath: string,
  uplinkContext: string,
  instance: string,
) {
  // Get the filepath to select on browser
  const filepath = join(process.cwd(), relativePath);
  await browser.pause(5000);
  const windows = await driver[instance].getWindowHandles();
  let explorerWindow;
  windows[0] === uplinkContext
    ? (explorerWindow = windows[1])
    : (explorerWindow = windows[0]);
  await driver[instance].switchToWindow(explorerWindow);

  // Wait for Save Panel to be displayed
  const listView = await driver[instance].$("~listview");
  await listView.waitForExist({ timeout: 25000 });

  // Type file location and hit enter
  const editField = await driver[instance].$("//Window/ComboBox/Edit");
  await editField.clearValue();
  await editField.setValue(filepath + "\uE007");

  // Wait for Save Panel not to be displayed
  await listView.waitForExist({ reverse: true });
  await driver[instance].switchToWindow(uplinkContext);
}

export async function getUplinkWindowHandle(instance: string) {
  // Do a for loop that will try to do the next lines for 3 times
  for (let i = 0; i < 3; i++) {
    try {
      const uplinkContext = await driver[instance].getWindowHandle();
      if (typeof uplinkContext !== "undefined") {
        return uplinkContext.toString();
      }
    } catch (error) {
      console.log("Error trying to get current Window Handle: ", error);
    }
  }
}
