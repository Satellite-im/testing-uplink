require("module-alias/register");
import {
  createNewUser,
  getUserKey,
  grabCacheFolder,
  resetApp,
  resetAndLoginWithCache,
  saveTestKeys,
} from "@helpers/commands";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const friendsScreen = new FriendsScreen();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();
const userA: string = "UserA";
const userB: string = "UserB";

export default async function offlineRequestsTests() {
  it("Offline Friend Requests - Create test account #1", async () => {
    // Create New User and go to Settings Profile Screen
    await resetApp();
    await createNewUser(userA, true);
    await welcomeScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
  });

  it("Offline Friend Requests - Save test account #1 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await welcomeScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();

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
    await welcomeScreen.goToFriends();
  });

  it("Offline Friend Requests - Send Friend Request to user #1", async () => {
    // Obtain did key from User #1
    const friendDidKey = await getUserKey(userA);
    await friendsScreen.sendFriendRequest(friendDidKey, userA);

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Offline Friend Requests - Save test account #2 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await friendsScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userB, didkey);
    await grabCacheFolder(userB);
  });

  it("Offline Friend Requests - User #1 accepts offline friend request received", async () => {
    // Clear cache and reset app
    await resetAndLoginWithCache("UserA");

    // Go to Friends Screen
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.waitUntilFriendRequestIsReceived();
    await friendsScreen.acceptIncomingRequest("UserB");

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User #2
    await friendsScreen.chatWithFriendButton.click();
    await friendsScreen.validateSpinnerIsNotShown();
  });

  it("Offline Friend Requests - Validate offline friend request was accepted", async () => {
    // Clear cache and reset app
    await resetAndLoginWithCache(userB);

    // Go to Friends Screen
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();
  });
}
