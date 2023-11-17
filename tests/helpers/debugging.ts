import "module-alias/register";
import {
  activateFirstApplication,
  activateSecondApplication,
  createNewUser,
  getUserKey,
  launchSecondApplication,
  saveTestKeys,
} from "./commands";
import { USER_A_INSTANCE } from "./constants";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);
let settingsNotificationsFirstUser = new SettingsNotificationsScreen(
  USER_A_INSTANCE,
);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export async function setupBeforeCreateGroupTests() {
  // Create a new account and go to Settings Profile
  await createPinFirstUser.waitForIsShown(true);
  const usernameA = "ChatUserA";
  await createNewUser(usernameA);
  await welcomeScreenFirstUser.goToSettings();
  await settingsProfileFirstUser.validateSettingsProfileIsShown();

  // Click on Copy ID button and assert Toast Notification is displayed
  await settingsProfileFirstUser.clickOnCopyIDButton();

  // Wait for toast notification to be closed
  await settingsProfileFirstUser.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await settingsProfileFirstUser.pasteUserKeyInStatus();
  const didkeyA = await settingsProfileFirstUser.getCopiedDidFromStatusInput();

  // Grab cache folder and restart
  await saveTestKeys(usernameA, didkeyA, USER_A_INSTANCE);

  // Go to General Settings and reduce Font Size by 0.5
  await settingsProfileFirstUser.goToGeneralSettings();

  // Wait for toast notification of Profile Updated to not exist
  await settingsGeneralFirstUser.waitUntilNotificationIsClosed();

  // Click on font scaling minus button
  await settingsGeneralFirstUser.settingsGeneral.waitForExist();
  await settingsGeneralFirstUser.clickOnFontScalingMinus();

  // Go to Notifications Settings and disable all notifications
  await settingsGeneralFirstUser.goToNotificationsSettings();
  await settingsNotificationsFirstUser.validateSettingsNotificationsIsShown();
  await settingsNotificationsFirstUser.clickOnFriendsNotifications();
  await settingsNotificationsFirstUser.clickOnMessagesNotifications();

  // Go to Friends Screen
  await settingsNotificationsFirstUser.goToFriends();
  await friendsScreenFirstUser.validateFriendsScreenIsShown();

  // Launch second application
  await launchSecondApplication();

  // Create a new account and go to Settings Profile
  await createPinFirstUser.waitForIsShown(true);
  const usernameB = "ChatUserB";
  await createNewUser(usernameB);
  await welcomeScreenFirstUser.goToSettings();
  await settingsProfileFirstUser.validateSettingsProfileIsShown();

  // Click on Copy ID button and assert Toast Notification is displayed
  await settingsProfileFirstUser.clickOnCopyIDButton();

  // Wait for toast notification of Copied To Clipboard to not exist
  await settingsProfileFirstUser.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await settingsProfileFirstUser.pasteUserKeyInStatus();
  const didkeyB = await settingsProfileFirstUser.getCopiedDidFromStatusInput();

  // Grab cache folder and restart
  await saveTestKeys(usernameB, didkeyB, USER_A_INSTANCE);

  // Go to General Settings and reduce Font Size by 0.5
  await settingsProfileFirstUser.goToGeneralSettings();

  // Wait for toast notification of Profile Updated to not exist
  await settingsGeneralFirstUser.waitUntilNotificationIsClosed();

  // Click on font scaling minus button
  await settingsGeneralFirstUser.settingsGeneral.waitForExist();
  await settingsGeneralFirstUser.clickOnFontScalingMinus();

  // Go to Notifications Settings and disable all notifications
  await settingsGeneralFirstUser.goToNotificationsSettings();
  await settingsNotificationsFirstUser.validateSettingsNotificationsIsShown();
  await settingsNotificationsFirstUser.clickOnFriendsNotifications();
  await settingsNotificationsFirstUser.clickOnMessagesNotifications();

  // Go to Friends Screen
  await settingsNotificationsFirstUser.goToFriends();
  await friendsScreenFirstUser.validateFriendsScreenIsShown();

  // Obtain did key from Chat User B
  const friendDidKey = await getUserKey("ChatUserA", USER_A_INSTANCE);
  await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
  await friendsScreenFirstUser.clickOnAddSomeoneButton();

  // Wait for toast notification to be closed
  await friendsScreenFirstUser.waitUntilNotificationIsClosed();

  // Validate friend request appears on pending list
  await friendsScreenFirstUser.hoverOnPendingListButton();
  await friendsScreenFirstUser.goToPendingFriendsList();
  await friendsScreenFirstUser.validateOutgoingListIsShown();
  await friendsScreenFirstUser.validateOutgoingListIsNotEmpty();

  await friendsScreenFirstUser.goToAllFriendsList();
  await friendsScreenFirstUser.validateAllFriendsListIsShown();

  // Switch control to User A
  await activateFirstApplication();

  // With User A - Go to pending requests list, wait for receiving the friend request and accept it
  await friendsScreenFirstUser.hoverOnPendingListButton();
  await friendsScreenFirstUser.goToPendingFriendsList();
  await friendsScreenFirstUser.validateIncomingListIsShown();
  await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
  await friendsScreenFirstUser.acceptIncomingRequest("ChatUserB");

  // Validate friend is now on all friends list
  await friendsScreenFirstUser.goToAllFriendsList();
  await friendsScreenFirstUser.validateAllFriendsListIsShown();
  await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();

  // Go to Chat with User B
  await friendsScreenFirstUser.chatWithFriendButton.click();

  // Switch control to User B
  await activateSecondApplication();

  // With User A - Go to pending requests list, wait for receiving the friend request and accept it
  await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

  // Validate friend is now on all friends list
  await friendsScreenFirstUser.goToAllFriendsList();
  await friendsScreenFirstUser.validateAllFriendsListIsShown();
  await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();

  // Switch control to User A
  await activateFirstApplication();
  await chatsTopbarFirstUser.validateTopbarExists();

  // Switch control to User B
  await activateSecondApplication();

  // Go to the current list of All friends and then open a Chat conversation with ChatUserA
  await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
  await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
  await friendsScreenFirstUser.chatWithFriendButton.click();
  await chatsTopbarFirstUser.validateTopbarExists();

  // Switch control to User A
  await activateFirstApplication();
}
