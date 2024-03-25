require("module-alias/register");
import { homedir } from "os";
import { join } from "path";
import {
  MACOS_BUNDLE_ID,
  MACOS_DRIVER,
  MACOS_USER_A_BUNDLE_ID,
  MACOS_USER_B_BUNDLE_ID,
  MACOS_USER_C_BUNDLE_ID,
  WINDOWS_APP,
  WINDOWS_DRIVER,
} from "./constants";
const { readFileSync, rmSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const fsp = require("fs").promises;
const { clipboard, keyboard, mouse, Button } = require("@nut-tree/nut-js");

// Users cache helper functions

export async function deleteCache() {
  const target = homedir() + "/.uplink/.user";
  try {
    await rmSync(target, { recursive: true, force: true });
  } catch (error) {
    console.error(
      `Got an error trying to delete the user cache files: ${error.message}`,
    );
  }
}

export async function grabCacheFolder(username: string) {
  const source = homedir() + "/.uplink";
  const currentDriver = process.env.DRIVER;
  const target = "./tests/fixtures/users/" + currentDriver + "/" + username;
  await fsp.mkdir(target, { recursive: true });
  try {
    await fsp.cp(source, target, { recursive: true });
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`,
    );
  }
}

export async function loadTestUserData(user: string) {
  // Move files
  const currentDriver = process.env.DRIVER;
  let source, target;
  source = "./tests/fixtures/users/" + currentDriver + "/" + user;
  target = homedir() + "/.uplink";
  await deleteCache();
  try {
    await fsp.cp(source, target, { recursive: true }, { force: true });
  } catch (error) {
    console.error(
      `Got an error trying to copy the user cache files: ${error.message}`,
    );
  }
}

// DidKeys and username handling functions

export async function getUserKey(username: string) {
  // Read user data and store variable with DID Key from JSON file
  const currentDriver = process.env.DRIVER;
  const source =
    "./tests/fixtures/users/" + currentDriver + "/" + username + ".json";
  const jsonFile = await readFileSync(source);
  const jsonFileParsed = await JSON.parse(jsonFile);
  const didkey = await jsonFileParsed.key;
  return didkey;
}

export async function saveTestKeys(username: string, didkey: string) {
  // Save JSON file with keys
  const currentDriver = process.env.DRIVER;
  const target = "./tests/fixtures/users/" + currentDriver;
  const filepath = target + "/" + username + ".json";
  await fsp.mkdir(target, { recursive: true });
  const userData = { username: username, key: didkey };
  try {
    await writeFileSync(filepath, JSON.stringify(userData, null, 2), "utf8");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

// Login or Create Users Functions

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
}

export async function saveUserRecoverySeed(username: string, data: string[]) {
  // Save JSON file with keys
  const currentDriver = process.env.DRIVER;
  const target = "./tests/fixtures/users/" + currentDriver;
  const filepath = target + "/" + username + "-seed.txt";
  await fsp.mkdir(target, { recursive: true });
  let recoverySeedWords = "";
  for (let word of data) {
    recoverySeedWords += word + " ";
  }
  recoverySeedWords = recoverySeedWords.slice(0, -1);
  try {
    await writeFileSync(filepath, recoverySeedWords, "utf8");
  } catch (error) {
    console.log("An error has occurred while saving recovery seed", error);
  }
}

export async function getUserRecoverySeed(username: string) {
  // Read user data from JSON file
  const currentDriver = process.env.DRIVER;
  const source =
    "./tests/fixtures/users/" + currentDriver + "/" + username + "-seed.txt";
  const file = await readFileSync(source, { encoding: "utf8", flag: "r" });
  return file;
}

// Application Manage Functions

export async function launchApplication(
  bundle: string = MACOS_BUNDLE_ID,
  appLocation: string = WINDOWS_APP,
) {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await launchAppWindows(appLocation);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    await launchAppMacOS(bundle);
    await browser.pause(5000);
  }
}

export async function launchFirstApplication() {
  await launchAppMacOS(MACOS_USER_A_BUNDLE_ID);
  await browser.pause(5000);
}

export async function launchSecondApplication() {
  const customPath = ".uplinkUserB";
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await launchAppWindows(WINDOWS_APP, customPath);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    await launchAppMacOS(
      MACOS_USER_B_BUNDLE_ID,
      "/" + customPath,
      "/Applications/Uplink2.app",
    );
  }
  await browser.pause(5000);
}

export async function launchThirdApplication() {
  await launchAppMacOS(
    MACOS_USER_C_BUNDLE_ID,
    "/.uplinkUserC",
    "/Applications/Uplink3.app",
  );
  await browser.pause(5000);
}

export async function activateFirstApplication() {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await activateAppWindows(WINDOWS_APP);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    const appState = await queryAppStateMacOS(MACOS_USER_A_BUNDLE_ID);
    if (appState === 1) {
      await launchFirstApplication();
    } else {
      await activateAppMacOS(MACOS_USER_A_BUNDLE_ID);
    }
  }
}

export async function activateSecondApplication() {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await activateAppWindows(WINDOWS_APP);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    const appState = await queryAppStateMacOS(MACOS_USER_B_BUNDLE_ID);
    if (appState === 1) {
      await launchSecondApplication();
    } else {
      await activateAppMacOS(MACOS_USER_B_BUNDLE_ID);
    }
  }
}

export async function activateThirdApplication() {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await activateAppWindows(WINDOWS_APP);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    const appState = await queryAppStateMacOS(MACOS_USER_C_BUNDLE_ID);
    if (appState === 1) {
      await launchThirdApplication();
    } else {
      await activateAppMacOS(MACOS_USER_C_BUNDLE_ID);
    }
  }
}

export async function closeApplication() {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await closeAppWindows(WINDOWS_APP);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    await closeAppMacOS(MACOS_BUNDLE_ID);
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
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await closeAppWindows(WINDOWS_APP);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    await closeAppMacOS(MACOS_USER_B_BUNDLE_ID);
  }
}

export async function closeThirdApplication() {
  await closeAppMacOS(MACOS_USER_C_BUNDLE_ID);
}

export async function maximizeWindow() {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await $('[name="square-button"]').click();
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    (await $("~_XCUI:FullScreenWindow")).click();
  }
}

export async function activateAppMacOS(bundle: string) {
  await driver.executeScript("macos: activateApp", [
    {
      bundleId: bundle,
    },
  ]);
}

export async function activateAppWindows(appPath: string) {
  await driver.executeScript("windows: activateApp", [
    {
      app: appPath,
    },
  ]);
}

export async function closeAppWindows(appPath: string) {
  await driver.executeScript("windows: closeApp", [
    {
      app: appPath,
    },
  ]);
}

export async function closeAppMacOS(bundle: string) {
  await driver.executeScript("macos: terminateApp", [
    {
      bundleId: bundle,
    },
  ]);
}

export async function launchAppMacOS(
  bundle: string,
  relativePathUserData: string = "/.uplink",
  appPath: string = "/Applications/Uplink.app",
) {
  await driver.executeScript("macos: launchApp", [
    {
      bundleId: bundle,
      path: appPath,
      arguments: ["--path", homedir() + relativePathUserData],
    },
  ]);
}

export async function launchAppWindows(appLocation: string, path: string = "") {
  if (path === "") {
    await driver.executeScript("windows: launchApp", [
      {
        app: join(process.cwd(), appLocation),
      },
    ]);
  } else {
    await driver.executeScript("windows: launchApp", [
      {
        app: join(process.cwd(), appLocation),
        "appium:appArguments": "--path " + join(process.cwd(), path),
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

// MacOS driver helper functions

export async function clickOnSwitchMacOS(
  element: WebdriverIO.Element | undefined,
) {
  const elementLocator = await element;

  // Get X and Y coordinates to hover on from element
  const elementX = await elementLocator?.getLocation("x");
  const elementY = await elementLocator?.getLocation("y");

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

export async function hoverOnMacOS(locator: WebdriverIO.Element | undefined) {
  const elementId = await locator?.elementId;
  await driver.executeScript("macos: hover", [
    {
      elementId: elementId,
    },
  ]);
}

export async function setClipboardValue(value: string) {
  await clipboard.setContent(value);
}

export async function scrollUp(deltaX: number) {
  await mouse.scrollUp(deltaX);
}

export async function scrollDown(deltaX: number) {
  await mouse.scrollDown(deltaX);
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

export async function leftClickOnMacOS(locator: WebdriverIO.Element) {
  const elementId = await locator.elementId;
  await driver.executeScript("macos: hover", [
    {
      elementId: elementId,
    },
  ]);
  await mouse.click(Button.LEFT);
}

export async function rightClickOnMacOS(
  locator: WebdriverIO.Element | undefined,
) {
  const elementId = await locator?.elementId;
  await driver.executeScript("macos: hover", [
    {
      elementId: elementId,
    },
  ]);
  await mouse.click(Button.RIGHT);
}

// Windows driver helper functions

export async function hoverOnWindows(locator: WebdriverIO.Element | undefined) {
  await driver.moveToElement(locator?.elementId);
}

export async function leftClickOnWindows(locator: WebdriverIO.Element) {
  await driver.moveToElement(locator.elementId);
  await mouse.click(Button.LEFT);
}

export async function rightClickOnWindows(
  locator: WebdriverIO.Element | undefined,
) {
  await driver.moveToElement(locator?.elementId);
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
      return undefined;
    }
  }
}

// Key Combinations Commands

export async function keyboardShortcutPaste() {
  if (process.env.DRIVER === WINDOWS_DRIVER) {
    await keyboard.type(4, 66);
  } else if (process.env.DRIVER === MACOS_DRIVER) {
    await keyboard.type(129, 66);
  }
}

export async function keyboardShiftEnter() {
  await keyboard.pressKey(7);
  await keyboard.type(101);
  await keyboard.releaseKey(7);
}

export async function pressEnterKey() {
  await keyboard.type(101);
}

export async function pressEscKey() {
  await keyboard.type(1);
}

export async function sendCustomKeybinds(...keys: number[]) {
  // To find the number associated for each key to send on keybind, refer to node_modules/@nut-tree/nut-js/dist/lib/key.enum.d.ts
  for (let i = 0; i < keys.length - 1; i++) {
    await keyboard.pressKey(keys[i]);
  }

  await keyboard.type(keys[keys.length - 1]);

  for (let i = keys.length - 2; i >= 0; i--) {
    await keyboard.releaseKey(keys[i]);
  }
}
