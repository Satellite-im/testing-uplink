require("module-alias/register");
import {
  launchFirstApplication,
  createNewUser,
  getUserKey,
  launchSecondApplication,
  saveTestKeys,
} from "./commands";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsTopbar = new Topbar();
let createPin = new CreatePinScreen();
let friendsScreen = new FriendsScreen();
let settingsGeneral = new SettingsGeneralScreen();
let settingsNotifications = new SettingsNotificationsScreen();
let settingsProfile = new SettingsProfileScreen();
let welcomeScreen = new WelcomeScreen();

export async function setupBeforeCreateGroupTests() {
  // Create a new account and go to Settings Profile
  await createPin.waitForIsShown(true);
  const usernameA = "ChatUserA";
  await createNewUser(usernameA);
  await welcomeScreen.goToSettings();
  await settingsProfile.validateSettingsProfileIsShown();

  // Click on Copy ID button and assert Toast Notification is displayed
  await settingsProfile.openCopyIDContextMenu();
  await settingsProfile.clickOnContextMenuCopyDidKey();

  // Wait for toast notification to be closed
  await settingsProfile.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await settingsProfile.pasteUserKeyInStatus();
  const didkeyA = await settingsProfile.getCopiedDidFromStatusInput();

  // Grab cache folder and restart
  await saveTestKeys(usernameA, didkeyA);

  // Go to General Settings and reduce Font Size by 0.5
  await settingsProfile.goToGeneralSettings();

  // Wait for toast notification of Profile Updated to not exist
  await settingsGeneral.waitUntilNotificationIsClosed();

  // Click on font scaling minus button
  await settingsGeneral.settingsGeneral.waitForExist();
  await settingsGeneral.clickOnFontScalingMinus();

  // Go to Notifications Settings and disable all notifications
  await settingsGeneral.goToNotificationsSettings();
  await settingsNotifications.validateSettingsNotificationsIsShown();
  await settingsNotifications.clickOnFriendsNotifications();
  await settingsNotifications.clickOnMessagesNotifications();

  // Go to Friends Screen
  await settingsNotifications.goToFriends();
  await friendsScreen.validateFriendsScreenIsShown();

  // Launch second application
  await launchSecondApplication();

  // Create a new account and go to Settings Profile
  await createPin.waitForIsShown(true);
  const usernameB = "ChatUserB";
  await createNewUser(usernameB);
  await welcomeScreen.goToSettings();
  await settingsProfile.validateSettingsProfileIsShown();

  // Click on Copy ID button and assert Toast Notification is displayed
  await settingsProfile.openCopyIDContextMenu();
  await settingsProfile.clickOnContextMenuCopyDidKey();

  // Wait for toast notification of Copied To Clipboard to not exist
  await settingsProfile.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await settingsProfile.pasteUserKeyInStatus();
  const didkeyB = await settingsProfile.getCopiedDidFromStatusInput();

  // Grab cache folder and restart
  await saveTestKeys(usernameB, didkeyB);

  // Go to General Settings and reduce Font Size by 0.5
  await settingsProfile.goToGeneralSettings();

  // Wait for toast notification of Profile Updated to not exist
  await settingsGeneral.waitUntilNotificationIsClosed();

  // Click on font scaling minus
  await settingsGeneral.waitForIsShown(true);
  await settingsGeneral.clickOnFontScalingMinus();

  // Go to Notifications Settings and disable all notifications
  await settingsGeneral.goToNotificationsSettings();
  await settingsNotifications.validateSettingsNotificationsIsShown();
  await settingsNotifications.clickOnFriendsNotifications();
  await settingsNotifications.clickOnMessagesNotifications();

  // Go to Friends Screen
  await settingsNotifications.goToFriends();
  await friendsScreen.validateFriendsScreenIsShown();

  // Obtain did key from Chat User B
  const friendDidKey = await getUserKey("ChatUserA");
  await friendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

  // Go to All Friends List
  await friendsScreen.goToAllFriendsList();
  await friendsScreen.validateAllFriendsListIsShown();

  // Switch control to User A
  await launchFirstApplication();

  // With User A - Go to pending requests list, wait for receiving the friend request and accept it
  await friendsScreen.hoverOnPendingListButton();
  await friendsScreen.goToPendingFriendsList();
  await friendsScreen.validateIncomingListIsShown();
  await friendsScreen.waitUntilFriendRequestIsReceived();
  await friendsScreen.acceptIncomingRequest("ChatUserB");

  // Validate friend is now on all friends list
  await friendsScreen.goToAllFriendsList();
  await friendsScreen.validateAllFriendsListIsShown();
  await friendsScreen.validateAllFriendsListIsNotEmpty();

  // Go to Chat with User B
  await friendsScreen.chatWithFriendButton.click();

  // Switch control to User B
  await launchSecondApplication();

  // With User B - Go to pending requests list, wait for receiving the friend request and accept it
  await friendsScreen.waitUntilUserAcceptedFriendRequest();

  // Validate friend is now on all friends list
  await friendsScreen.goToAllFriendsList();
  await friendsScreen.validateAllFriendsListIsShown();
  await friendsScreen.validateAllFriendsListIsNotEmpty();

  // Switch control to User A
  await launchFirstApplication();
  await chatsTopbar.validateTopbarExists();
}

export async function setupBeforeSettingsTests() {
  await createNewUser("Test123");
  await friendsScreen.goToSettings();
  await settingsProfile.waitForIsShown(true);
}
