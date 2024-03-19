require("module-alias/register");
import { createNewUser } from "./commandsNewUser";
import {
  getUserKey,
  launchSecondApplication,
  saveTestKeys,
  activateFirstApplication,
  activateSecondApplication,
} from "./commands";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

export async function setupBeforeCreateGroupTests() {
  // Create a new account and go to Settings Profile
  await CreatePinScreen.waitForIsShown(true);
  const usernameA = "ChatUserA";
  await createNewUser(usernameA);
  await WelcomeScreen.goToSettings();
  await SettingsProfileScreen.validateSettingsProfileIsShown();

  // Click on Copy ID button and assert Toast Notification is displayed
  await SettingsProfileScreen.openCopyIDContextMenu();
  await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

  // Wait for toast notification to be closed
  await SettingsProfileScreen.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await SettingsProfileScreen.pasteUserKeyInStatus();
  const didkeyA = await SettingsProfileScreen.getCopiedDidFromStatusInput();

  // Grab cache folder and restart
  await saveTestKeys(usernameA, didkeyA);

  // Go to General Settings and reduce Font Size by 0.5
  await SettingsProfileScreen.goToGeneralSettings();

  // Wait for toast notification of Profile Updated to not exist
  await SettingsGeneralScreen.waitUntilNotificationIsClosed();

  // Click on font scaling minus button
  await SettingsGeneralScreen.settingsGeneral.waitForExist();
  await SettingsGeneralScreen.clickOnFontScalingMinus();

  // Go to Notifications Settings and disable all notifications
  await SettingsGeneralScreen.goToNotificationsSettings();
  await SettingsNotificationsScreen.validateSettingsNotificationsIsShown();
  await SettingsNotificationsScreen.clickOnFriendsNotifications();
  await SettingsNotificationsScreen.clickOnMessagesNotifications();

  // Go to Friends Screen
  await SettingsNotificationsScreen.goToFriends();
  await FriendsScreen.validateFriendsScreenIsShown();

  // Launch second application
  await launchSecondApplication(false);

  // Create a new account and go to Settings Profile
  await CreatePinScreen.waitForIsShown(true);
  const usernameB = "ChatUserB";
  await createNewUser(usernameB);
  await WelcomeScreen.goToSettings();
  await SettingsProfileScreen.validateSettingsProfileIsShown();

  // Click on Copy ID button and assert Toast Notification is displayed
  await SettingsProfileScreen.openCopyIDContextMenu();
  await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

  // Wait for toast notification of Copied To Clipboard to not exist
  await SettingsProfileScreen.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await SettingsProfileScreen.pasteUserKeyInStatus();
  const didkeyB = await SettingsProfileScreen.getCopiedDidFromStatusInput();

  // Grab cache folder and restart
  await saveTestKeys(usernameB, didkeyB);

  // Go to General Settings and reduce Font Size by 0.5
  await SettingsProfileScreen.goToGeneralSettings();

  // Wait for toast notification of Profile Updated to not exist
  await SettingsGeneralScreen.waitUntilNotificationIsClosed();

  // Click on font scaling minus
  await SettingsGeneralScreen.waitForIsShown(true);
  await SettingsGeneralScreen.clickOnFontScalingMinus();

  // Go to Notifications Settings and disable all notifications
  await SettingsGeneralScreen.goToNotificationsSettings();
  await SettingsNotificationsScreen.validateSettingsNotificationsIsShown();
  await SettingsNotificationsScreen.clickOnFriendsNotifications();
  await SettingsNotificationsScreen.clickOnMessagesNotifications();

  // Go to Friends Screen
  await SettingsNotificationsScreen.goToFriends();
  await FriendsScreen.validateFriendsScreenIsShown();

  // Obtain did key from Chat User B
  const friendDidKey = await getUserKey("ChatUserA");
  await FriendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

  // Go to All Friends List
  await FriendsScreen.goToAllFriendsList();
  await FriendsScreen.validateAllFriendsListIsShown();

  // Switch control to User A
  await activateFirstApplication();

  // With User A - Go to pending requests list, wait for receiving the friend request and accept it
  await FriendsScreen.hoverOnPendingListButton();
  await FriendsScreen.goToPendingFriendsList();
  await FriendsScreen.validateIncomingListIsShown();
  await FriendsScreen.waitUntilFriendRequestIsReceived();
  await FriendsScreen.acceptIncomingRequest("ChatUserB");

  // Validate friend is now on all friends list
  await FriendsScreen.goToAllFriendsList();
  await FriendsScreen.validateAllFriendsListIsShown();
  await FriendsScreen.validateAllFriendsListIsNotEmpty();

  // Go to Chat with User B
  await FriendsScreen.chatWithFriendButton.click();

  // Switch control to User B
  await activateSecondApplication();

  // With User B - Go to pending requests list, wait for receiving the friend request and accept it
  await FriendsScreen.waitUntilUserAcceptedFriendRequest();

  // Validate friend is now on all friends list
  await FriendsScreen.goToAllFriendsList();
  await FriendsScreen.validateAllFriendsListIsShown();
  await FriendsScreen.validateAllFriendsListIsNotEmpty();

  // Switch control to User A
  await activateFirstApplication();
  await Topbar.validateTopbarExists();
}

export async function setupBeforeSettingsTests() {
  await createNewUser("Test123");
  await FriendsScreen.goToSettings();
  await SettingsProfileScreen.waitForIsShown(true);
}
