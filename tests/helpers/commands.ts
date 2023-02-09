import * as users from "../fixtures/users/testkeys.json";
import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { faker } from "@faker-js/faker";
import { homedir } from "os";
import { join } from "path";
const extract = require("extract-zip");
const fs = require("fs").promises;

export async function copyCacheFolder(source: string, target: string) {
  try {
    await extract(source, { dir: target });
    console.log("Extraction of User Datacomplete");
  } catch (error) {
    console.error(
      `Got an error trying to move and extract the file: ${error.message}`
    );
  }
}

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

export async function getUserKeys(username: string) {
  let userkey: string = "";
  users.forEach((user) => {
    if (user.username === username) {
      userkey = user.key;
    }
  });
  return userkey;
}

export async function loadTestUserData(user: string) {
  // Move files
  const source = "./tests/fixtures/users/" + user + "/.uplink.zip";
  const destination = homedir();
  const filePath = destination + "/.uplink/state.json";
  await copyCacheFolder(source, destination);

  // Read file and console log it
  const data = await fs.readFile(filePath);
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

export async function showMainMenu() {
  // Ensure Main Screen is displayed
  await WelcomeScreen.waitForIsShown(true);

  // Click on Add Someone to show Main Menu
  await WelcomeScreen.clickAddSomeone();

  // Validate Friends Screen is displayed
  await FriendsScreen.waitForIsShown(true);
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
}
