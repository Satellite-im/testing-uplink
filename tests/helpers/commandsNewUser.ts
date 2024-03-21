import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import SaveRecoverySeedScreen from "@screenobjects/account-creation/SaveRecoverySeedScreen";
import CreateUserScreen from "@screenobjects/account-creation/CreateUserScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import { saveUserRecoverySeed } from "./commands";

// Login or Create Users Functions

export async function createNewUser(
  username: string,
  saveSeedWords: boolean = false,
) {
  await CreatePinScreen.unlockLayout.waitForExist();

  // Enter pin for test user
  await CreatePinScreen.enterPinOnCreateAccount("1234");
  await CreatePinScreen.createAccountButton.waitForEnabled();
  await CreatePinScreen.clickOnCreateAccount();

  // Bypass new Recovery Seed Screens
  await CreateOrImportScreen.waitForIsShown(true);
  await CreateOrImportScreen.clickOnCreateAccount();
  await SaveRecoverySeedScreen.waitForIsShown(true);
  if (saveSeedWords === true) {
    const recoverySeed = await SaveRecoverySeedScreen.getSeedWords();
    await saveUserRecoverySeed(username, recoverySeed);
  }
  await SaveRecoverySeedScreen.clickOnISavedItButton();

  // Enter Username and click on Create Account
  await CreateUserScreen.enterUsername(username);
  await CreateUserScreen.createAccountButton.waitForEnabled();
  await CreateUserScreen.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await WelcomeScreen.welcomeLayout.waitForExist({ timeout: 60000 });

  // Workaround to ensure that user clicks on Add Someone
  await WelcomeScreen.clickAddSomeone();
  await FriendsScreen.friendsBody.waitForExist();
}
