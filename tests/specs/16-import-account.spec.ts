require("module-alias/register");
import {
  createNewUser,
  getUserKey,
  getUserRecoverySeed,
  grabCacheFolder,
  resetApp,
  saveTestKeys,
} from "@helpers/commands";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import EnterRecoverySeedScreen from "@screenobjects/account-creation/EnterRecoverySeedScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const createOrImport = new CreateOrImportScreen();
const createPin = new CreatePinScreen();
const enterRecoverySeed = new EnterRecoverySeedScreen();
const friendsScreen = new FriendsScreen();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();

export default async function importAccountTests() {
  // Wait until toast notification is closed
  it("Offline Friend Requests - Create reusable account for User B", async () => {
    // Clear cache and reset app
    await resetApp();

    // Create New User and go to Settings Profile Screen
    const username = "UserB";
    await createNewUser(username, true);
    await welcomeScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
  });

  it("Offline Friend Requests - Save test account for User B", async () => {
    const username = "UserB";
    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
    await grabCacheFolder(username);
  });

  it("Import Account - Clear cache, reset app and enter a valid pin", async () => {
    // Clear cache and reset app
    await resetApp();

    // Validate Enter Pin Screen is displayed and enter a valid pin
    await createPin.waitForIsShown(true);
    await createPin.enterPin("1234");
    await createPin.waitUntilCreateAccountButtonIsEnabled();
    await createPin.clickOnCreateAccount();
  });

  it("Import Account - Validate Screen Contents", async () => {
    // Validate Create or Import Account is displayed
    await createOrImport.waitForIsShown(true);

    // Click on Import Account
    await createOrImport.clickOnImportAccount();

    // Validate contents of Enter Recovery Seed Screen
    await enterRecoverySeed.waitForIsShown(true);
    const helperText = await enterRecoverySeed.recoverySeedHelperText;
    const screenTitle = await enterRecoverySeed.recoverySeedTitleText;
    await expect(helperText).toHaveTextContaining(
      "Type your recovery seed here. You may either enter one word at a time or all at once separated by spaces.",
    );
    await expect(screenTitle).toHaveTextContaining("RECOVERY SEED");
  });

  it("Import Account - Enter valid recovery seed and continue", async () => {
    const recoverySeed = await getUserRecoverySeed("Test123");
    await enterRecoverySeed.typeOnRecoverySeedInput(recoverySeed);
    await enterRecoverySeed.clickOnRecoverAccountButton();
    await welcomeScreen.waitForIsShown(true);
  });

  it("Offline Friend Request - Send Friend Request to UserB", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("UserB");
    await friendsScreen.sendFriendRequest(friendDidKey, "UserB");

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Offline Friend Request - Accept offline friend request received", async () => {
    // Clear cache and reset app
    await resetApp();

    // Restore account from UserB
    await createPin.waitForIsShown(true);
    await createPin.enterPin("1234");
    await createPin.waitUntilCreateAccountButtonIsEnabled();
    await createPin.clickOnCreateAccount();

    // Validate Create or Import Account is displayed
    await createOrImport.waitForIsShown(true);

    // Click on Import Account
    await createOrImport.clickOnImportAccount();

    // Validate contents of Enter Recovery Seed Screen
    await enterRecoverySeed.waitForIsShown(true);

    // Enter Recovery Seed and Continue
    const recoverySeed = await getUserRecoverySeed("UserB");
    await enterRecoverySeed.typeOnRecoverySeedInput(recoverySeed);
    await enterRecoverySeed.clickOnRecoverAccountButton();
    await welcomeScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.waitUntilFriendRequestIsReceived();
    await friendsScreen.acceptIncomingRequest("Test123");

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with Test123
    await friendsScreen.chatWithFriendButton.click();
  });

  it("Offline Friend Request - Validate offline friend request was accepted", async () => {
    // Clear cache and reset app
    await resetApp();

    // Restore account from UserB
    await createPin.waitForIsShown(true);
    await createPin.enterPin("1234");
    await createPin.waitUntilCreateAccountButtonIsEnabled();
    await createPin.clickOnCreateAccount();

    // Validate Create or Import Account is displayed
    await createOrImport.waitForIsShown(true);

    // Click on Import Account
    await createOrImport.clickOnImportAccount();

    // Validate contents of Enter Recovery Seed Screen
    await enterRecoverySeed.waitForIsShown(true);

    // Enter Recovery Seed and Continue
    const recoverySeed = await getUserRecoverySeed("Test123");
    await enterRecoverySeed.typeOnRecoverySeedInput(recoverySeed);
    await enterRecoverySeed.clickOnRecoverAccountButton();
    await welcomeScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();
  });
}
