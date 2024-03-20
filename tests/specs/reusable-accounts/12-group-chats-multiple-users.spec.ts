require("module-alias/register");
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsDeveloperScreen from "@screenobjects/settings/SettingsDeveloperScreen";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import { createNewUser } from "@helpers/commandsNewUser";
import {
  activateFirstApplication,
  activateThirdApplication,
  closeFirstApplication,
  closeThirdApplication,
  getUserKey,
  saveTestKeys,
  scrollDown,
  launchFirstApplication,
  launchThirdApplication,
} from "@helpers/commands";

export default async function groupChatMultipleUsersTests() {
  before(async () => {
    await launchFirstApplication();
  });

  it("Chat User C - Create Account", async () => {
    // Launch third application
    await launchThirdApplication();

    // Create a new account and go to Settings Profile
    await CreatePinScreen.waitForIsShown(true);
    const username = "ChatUserC";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification of Copied To Clipboard to not exist
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();

    // Wait for toast notification of Profile Updated to not exist
    await SettingsGeneralScreen.waitUntilNotificationIsClosed();

    // Grab cache folder and restart
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();
    await saveTestKeys(username, didkey);
    await SettingsProfileScreen.deleteStatus();
  });

  it("Chat User C - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // Click on font scaling minus
    await SettingsGeneralScreen.clickOnFontScalingMinus();
  });

  it("Chat User C - Settings Developer - Enable Save Logs In A File", async () => {
    // Go to Settings About and click 10 times on Version Number to Unlock Developer Settings
    await SettingsGeneralScreen.goToAboutSettings();
    await SettingsAboutScreen.waitForIsShown(true);
    await SettingsAboutScreen.unlockDeveloperSettings();

    // Validate Developer Settings button is unlocked
    const developerSettingsButton = await SettingsAboutScreen.developerButton;
    await developerSettingsButton.waitForDisplayed();

    // Go to Menu from the left and Scroll Down
    const settingsAboutButton = await SettingsAboutScreen.aboutButton;
    await SettingsAboutScreen.hoverOnElement(settingsAboutButton);
    await scrollDown(1000);

    // Go to Settings Developer and Enable Save Logs in a File
    await SettingsAboutScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.waitForIsShown(true);
    await SettingsDeveloperScreen.clickOnSaveLogs();
    await SettingsDeveloperScreen.validateSaveLogsIsEnabled();
  });

  it("Chat User C - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await SettingsDeveloperScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.validateSettingsNotificationsIsShown();
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Go to Friends Screen
    await SettingsNotificationsScreen.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User C - Send friend request to User A", async () => {
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Obtain did key from Chat User A
    const friendDidKey = await getUserKey("ChatUserA");
    await FriendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User C and go to chat button", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Go to Friends List
    await ChatsSidebar.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.hoverOnPendingListButton();
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserC");

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User C
    await FriendsScreen.goToChatWithFriend();
  });

  it("Chat User C - Validate friend request was accepted", async () => {
    // Switch control to User C
    await activateThirdApplication();

    // With User C - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
  });

  after(async () => {
    await closeFirstApplication();
    await closeThirdApplication();
  });
}
