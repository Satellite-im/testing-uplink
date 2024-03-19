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
import {
  activateFirstApplication,
  activateThirdApplication,
  closeFirstApplication,
  closeThirdApplication,
  createNewUser,
  getUserKey,
  saveTestKeys,
  scrollDown,
  launchFirstApplication,
  launchThirdApplication,
} from "@helpers/commands";
const chatsSidebar = new ChatsSidebar();
const createPin = new CreatePinScreen();
const friendsScreen = new FriendsScreen();
const settingsAbout = new SettingsAboutScreen();
const settingsDeveloper = new SettingsDeveloperScreen();
const settingsGeneral = new SettingsGeneralScreen();
const settingsNotifications = new SettingsNotificationsScreen();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();

export default async function groupChatMultipleUsersTests() {
  before(async () => {
    await launchFirstApplication();
  });

  it("Chat User C - Create Account", async () => {
    // Launch third application
    await launchThirdApplication(false);

    // Create a new account and go to Settings Profile
    await createPin.waitForIsShown(true);
    const username = "ChatUserC";
    await createNewUser(username);
    await welcomeScreen.goToSettings();
    await settingsProfile.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification of Copied To Clipboard to not exist
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();

    // Wait for toast notification of Profile Updated to not exist
    await settingsGeneral.waitUntilNotificationIsClosed();

    // Grab cache folder and restart
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();
    await saveTestKeys(username, didkey);
    await settingsProfile.deleteStatus();
  });

  it("Chat User C - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfile.goToGeneralSettings();
    await settingsGeneral.waitForIsShown(true);

    // Click on font scaling minus
    await settingsGeneral.clickOnFontScalingMinus();
  });

  it("Chat User C - Settings Developer - Enable Save Logs In A File", async () => {
    // Go to Settings About and click 10 times on Version Number to Unlock Developer Settings
    await settingsGeneral.goToAboutSettings();
    await settingsAbout.waitForIsShown(true);
    await settingsAbout.unlockDeveloperSettings();

    // Validate Developer Settings button is unlocked
    const developerSettingsButton = await settingsAbout.developerButton;
    await developerSettingsButton.waitForDisplayed();

    // Go to Menu from the left and Scroll Down
    const settingsAboutButton = await settingsAbout.aboutButton;
    await settingsAbout.hoverOnElement(settingsAboutButton);
    await scrollDown(1000);

    // Go to Settings Developer and Enable Save Logs in a File
    await settingsAbout.goToDeveloperSettings();
    await settingsDeveloper.waitForIsShown(true);
    await settingsDeveloper.clickOnSaveLogs();
    await settingsDeveloper.validateSaveLogsIsEnabled();
  });

  it("Chat User C - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsDeveloper.goToNotificationsSettings();
    await settingsNotifications.validateSettingsNotificationsIsShown();
    await settingsNotifications.clickOnFriendsNotifications();
    await settingsNotifications.clickOnMessagesNotifications();

    // Go to Friends Screen
    await settingsNotifications.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User C - Send friend request to User A", async () => {
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);

    // Obtain did key from Chat User A
    const friendDidKey = await getUserKey("ChatUserA");
    await friendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User C and go to chat button", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Go to Friends List
    await chatsSidebar.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.waitUntilFriendRequestIsReceived();
    await friendsScreen.acceptIncomingRequest("ChatUserC");

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User C
    await friendsScreen.goToChatWithFriend();
  });

  it("Chat User C - Validate friend request was accepted", async () => {
    // Switch control to User C
    await activateThirdApplication();

    // With User C - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();
  });

  after(async () => {
    await closeFirstApplication();
    await closeThirdApplication();
  });
}
