import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { faker } from "@faker-js/faker";
import { homedir } from "os";
import { join } from "path";
const { readFileSync, rmSync, writeFileSync } = require("fs");
const fsp = require("fs").promises;
const mkdirp = require("mkdirp");

// Users cache helper functions

export async function deleteCache() {
  const target = homedir() + "/.uplink";
  rmSync(target, { recursive: true, force: true });
}

export async function getUserKey(username: string) {
  // Read user data and store variable with DID Key from JSON file
  const source = "./tests/fixtures/users/" + username + "/state.json";
  const jsonFile = readFileSync(source);
  const jsonFileParsed = JSON.parse(jsonFile);
  const didkey = jsonFileParsed.account.identity.identity.did_key;
  return didkey;
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

export async function resetApp() {
  await driver.executeScript("macos: terminateApp", [
    {
      bundleId: "im.satellite.uplink",
    },
  ]);
  await deleteCache();
  await driver.executeScript("macos: launchApp", [
    {
      bundleId: "im.satellite.uplink",
    },
  ]);
}

export async function saveTestKeys(username: string) {
  // Read user data and store variable with DID Key from JSON file
  const source = "./tests/fixtures/users/" + username + "/state.json";
  const jsonFile = readFileSync(source);
  const jsonFileParsed = JSON.parse(jsonFile);
  const didkey = jsonFileParsed.account.identity.identity.did_key;

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

  // Click on Add Someone to show Main Menu
  await WelcomeScreen.clickAddSomeone();

  // Validate Friends Screen is displayed
  await FriendsScreen.waitForIsShown(true);
}

export async function maximizeWindow() {
  const currentOS = await driver.capabilities.automationName;
  if (currentOS === "windows") {
    await $("//Document/Group/Button[2]").click();
  } else if (currentOS === "mac2") {
    await $("~_XCUI:FullScreenWindow").click();
  }
}

export async function showMainMenu() {
  // Get current OS
  const currentOS = await driver.capabilities.automationName;

  // Ensure Main Screen is displayed
  await WelcomeScreen.waitForIsShown(true);

  // Click on Add Someone to show Main Menu only on MacOS. On Windows, go To Friends
  if (currentOS === "mac2") {
    await WelcomeScreen.clickAddSomeone();
  } else if (currentOS === "windows") {
    await maximizeWindow();
    await WelcomeScreen.goToFriends();
  }

  // Validate Friends Screen is displayed
  await FriendsScreen.waitForIsShown(true);
}

// UI Locators Helper Functions

export function customPredicateString(
  elementType: string,
  attribute: string,
  value: string,
  comparisonOperator: string
) {
  const predicateString: string = `-ios predicate string:elementType == ${elementType} AND ${attribute} ${comparisonOperator} '${value}'`;
  return predicateString;
}

export function getPredicateForTextValueEqual(value: string) {
  const predicateString: string = `-ios predicate string:elementType == 48 AND value == '${value}'`;
  return predicateString;
}

// MacOS driver helper functions

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
}
