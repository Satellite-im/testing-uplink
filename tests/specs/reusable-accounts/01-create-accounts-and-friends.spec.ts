require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  createNewUser,
  getUserKey,
  grabCacheFolder,
  launchSecondApplication,
  saveTestKeys,
  scrollDown,
} from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import EmojiSelector from "@screenobjects/chats/EmojiSelector";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsDeveloperScreen from "@screenobjects/settings/SettingsDeveloperScreen";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const chatsInput = new InputBar();
const chatsLayout = new ChatsLayout();
const chatsTopbar = new Topbar();
const createPin = new CreatePinScreen();
const emojiSelector = new EmojiSelector();
const favoritesSidebar = new FavoritesSidebar();
const friendsScreen = new FriendsScreen();
const messageGroupLocal = new MessageGroupLocal();
const messageGroupRemote = new MessageGroupRemote();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();
const settingsAbout = new SettingsAboutScreen();
const settingsDeveloper = new SettingsDeveloperScreen();
const settingsGeneral = new SettingsGeneralScreen();
const settingsNotifications = new SettingsNotificationsScreen();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();

describe("Create Accounts for Chats Tests", function () {
  it("Chat User A - Create Account", async () => {
    // Create a new account and go to Settings Profile
    await createPin.waitForIsShown(true);
    const username = "ChatUserA";
    await createNewUser(username);
    await welcomeScreen.goToSettings();
    await settingsProfile.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();

    // Wait for toast notification of Profile Updated to not exist
    await settingsProfile.waitUntilNotificationIsClosed();

    // Grab cache folder and restart
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();
    await saveTestKeys(username, didkey);
    await settingsProfile.deleteStatus();
  });

  it("Chat User A - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfile.goToGeneralSettings();
    await settingsGeneral.waitForIsShown(true);

    // Click on font scaling minus button
    await settingsGeneral.clickOnFontScalingMinus();
  });

  it("Chat User A - Settings Developer - Enable Save Logs In A File", async () => {
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

  it("Chat User A - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsDeveloper.goToNotificationsSettings();
    await settingsNotifications.validateSettingsNotificationsIsShown();
    await settingsNotifications.clickOnFriendsNotifications();
    await settingsNotifications.clickOnMessagesNotifications();

    // Go to Friends Screen
    await settingsNotifications.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User B - Create Account", async () => {
    // Launch second application
    await launchSecondApplication(false);

    // Create a new account and go to Settings Profile
    await createPin.waitForIsShown(true);
    const username = "ChatUserB";
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

  it("Chat User B - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfile.goToGeneralSettings();
    await settingsGeneral.waitForIsShown(true);

    // Click on font scaling minus
    await settingsGeneral.clickOnFontScalingMinus();
  });

  it("Chat User B - Settings Developer - Enable Save Logs In A File", async () => {
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

  it("Chat User B - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsDeveloper.goToNotificationsSettings();
    await settingsNotifications.validateSettingsNotificationsIsShown();
    await settingsNotifications.clickOnFriendsNotifications();
    await settingsNotifications.clickOnMessagesNotifications();

    // Go to Friends Screen
    await settingsNotifications.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA");
    await friendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User A and go to chat button", async () => {
    // Switch control to User A
    await activateFirstApplication();

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
    await friendsScreen.goToChatWithFriend();
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    // Switch control to User B
    await activateSecondApplication();

    // With User B - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User A - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    // Switch control to User A
    await activateFirstApplication();
    await chatsTopbar.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText = await chatsLayout.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network.",
    );
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 before typing a text", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInput.inputCharCounterText;
    const inputCharMaxText = await chatsInput.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Chars Counter on Input Bar displays the number of chars of text entered", async () => {
    // Validate Char counter increases after typing a text
    const inputCharCounter = await chatsInput.inputCharCounterText;
    const inputCharMaxText = await chatsInput.inputCharMaxText;
    await chatsInput.typeMessageOnInput("Testing...");
    await expect(inputCharCounter).toHaveTextContaining("10");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Add emoji to the message to be sent", async () => {
    // Add emoji to the message to be sent
    await chatsInput.clickOnEmojiButton();
    await emojiSelector.clickOnEmoji("😀");

    // Validate Char counter increases after adding an emoji to input bar
    const inputCharCounter = await chatsInput.inputCharCounterText;
    const inputCharMaxText = await chatsInput.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("11");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Click on send button will send the message to the other user", async () => {
    // Send message to the other user
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Testing...😀");

    const textFromMessage =
      await messageLocal.getCustomMessageContents("Testing...😀");
    await expect(textFromMessage).toHaveText("Testing...😀");
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 after sending a message", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInput.inputCharCounterText;
    const inputCharMaxText = await chatsInput.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await messageGroupLocal.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText =
      await messageLocal.getCustomMessageContents("Testing...😀");
    await expect(messageText).toHaveText("Testing...😀");
  });

  it("Chat User A - Validate Chat Message Group displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await messageGroupLocal.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await chatsTopbar.validateTopbarUserImage();
    await chatsTopbar.validateTopbarUserName("ChatUserB");
  });

  it("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await chatsTopbar.addToFavorites();
    await favoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebar.validateFavoritesUserImage("ChatUserB");
  });

  it("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await chatsTopbar.removeFromFavorites();
  });

  it("Chat User B - Wait until the other user is connected", async () => {
    // Switch control to User B
    await activateSecondApplication();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreen.chatWithFriendButton.waitForExist();
    await friendsScreen.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreen.chatWithFriendButton.click();
    await friendsScreen.validateSpinnerIsNotShown();
    await chatsTopbar.validateTopbarExists();
  });

  it("Chat User B - Assert message received from Chat User A", async () => {
    // Validate message received from Chat User A
    await messageRemote.waitForReceivingMessage("Testing...😀");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await messageRemote.getCustomMessageContents("Testing...😀");
    await expect(textFromMessage).toHaveText("Testing...😀");
  });

  it("Chat User B - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await messageGroupRemote.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await messageGroupRemote.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Change user status to Idle", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Change User A to Idle
    await chatsTopbar.goToSettings();
    await settingsNotifications.goToProfileSettings();
    await settingsProfile.waitForIsShown(true);

    // Maximize Window
    await settingsProfile.clickOnStatusInput();
    await scrollDown(1000);

    // Change Status to Idle
    await settingsProfile.selectIdleStatus();

    // Validate status is Idle now
    const currentOnlineStatus = await settingsProfile.selectorCurrentValue;
    await expect(currentOnlineStatus).toHaveText("Idle");

    // Return to chat and validate Local User Status is Idle
    await settingsProfile.goToMainScreen();
    await chatsInput.waitForIsShown(true);
  });

  after(async () => {
    await grabCacheFolder("ChatUserA");
    await grabCacheFolder("ChatUserB");
  });
});
