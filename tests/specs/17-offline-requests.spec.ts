require("module-alias/register");
import { createNewUser } from "@helpers/commandsNewUser";
import {
  getUserKey,
  grabCacheFolder,
  resetApp,
  resetAndLoginWithCache,
  saveTestKeys,
} from "@helpers/commands";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
const userA: string = "UserA";
const userB: string = "UserB";

export default async function offlineRequestsTests() {
  it("Offline Friend Requests - Create test account #1", async () => {
    // Create New User and go to Settings Profile Screen
    await resetApp();
    await createNewUser(userA, true);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });

  it("Offline Friend Requests - Save test account #1 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userA, didkey);

    // Update profile picture from user A

    // Update banner picture from user A
    await grabCacheFolder(userA);
  });

  // Wait until toast notification is closed
  it("Offline Friend Requests - Create account user #2", async () => {
    // Create New User and go to Settings Profile Screen
    await resetApp();
    await createNewUser(userB, true);
    await WelcomeScreen.goToFriends();
  });

  it("Offline Friend Requests - Send Friend Request to user #1", async () => {
    // Obtain did key from User #1
    const friendDidKey = await getUserKey(userA);
    await FriendsScreen.sendFriendRequest(friendDidKey, userA);

    // Go to All Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Offline Friend Requests - Save test account #2 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await FriendsScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userB, didkey);
    await grabCacheFolder(userB);
  });

  it("Offline Friend Requests - User #1 accepts offline friend request received", async () => {
    // Clear cache and reset app
    await resetAndLoginWithCache("UserA");

    // Go to Friends Screen
    await CreatePinScreen.loginWithTestUser();
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.hoverOnPendingListButton();
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("UserB");

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User #2
    await FriendsScreen.chatWithFriendButton.click();
    await FriendsScreen.validateSpinnerIsNotShown();
  });

  it("Offline Friend Requests - Validate offline friend request was accepted", async () => {
    // Clear cache and reset app
    await resetAndLoginWithCache(userB);

    // Go to Friends Screen
    await CreatePinScreen.loginWithTestUser();
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();
  });
}
