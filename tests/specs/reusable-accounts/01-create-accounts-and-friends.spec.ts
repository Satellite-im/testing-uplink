require("module-alias/register");
import { createNewUser } from "@helpers/commandsNewUser";
import {
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  getUserKey,
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

export default async function createChatAccountsTests() {
  it("Chat User A - Create Account", async () => {
    // Create a new account and go to Settings Profile
    await CreatePinScreen.waitForIsShown(true);
    const username = "ChatUserA";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();

    // Wait for toast notification of Profile Updated to not exist
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Grab cache folder and restart
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();
    await saveTestKeys(username, didkey);
    await SettingsProfileScreen.deleteStatus();
  });

  it("Chat User A - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // Click on font scaling minus button
    await SettingsGeneralScreen.clickOnFontScalingMinus();
  });

  it("Chat User A - Settings Developer - Enable Save Logs In A File", async () => {
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

  it("Chat User A - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await SettingsDeveloperScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.validateSettingsNotificationsIsShown();
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Go to Friends Screen
    await SettingsNotificationsScreen.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User B - Create Account", async () => {
    // Launch second application
    await launchSecondApplication();

    // Create a new account and go to Settings Profile
    await CreatePinScreen.waitForIsShown(true);
    await createNewUser("ChatUserB");
  });

  it("Chat User B - Save Did Key from User", async () => {
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
    await saveTestKeys("ChatUserB", didkey);
    await SettingsProfileScreen.deleteStatus();
  });

  it("Chat User B - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // Click on font scaling minus
    await SettingsGeneralScreen.clickOnFontScalingMinus();
  });

  it("Chat User B - Settings Developer - Enable Save Logs In A File", async () => {
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

  it("Chat User B - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await SettingsDeveloperScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.validateSettingsNotificationsIsShown();
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Go to Friends Screen
    await SettingsNotificationsScreen.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA");
    await FriendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User A and go to chat button", async () => {
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
    await FriendsScreen.goToChatWithFriend();
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    // Switch control to User B
    await activateSecondApplication();

    // With User B - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User A - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    // Switch control to User A
    await activateFirstApplication();
    await Topbar.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText = await ChatsLayout.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveText(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network.",
    );
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 before typing a text", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await InputBar.inputCharCounterText;
    const inputCharMaxText = await InputBar.inputCharMaxText;
    await expect(inputCharCounter).toHaveText("0");
    await expect(inputCharMaxText).toHaveText("/1024");
  });

  it("Input Bar - Chars Counter on Input Bar displays the number of chars of text entered", async () => {
    // Validate Char counter increases after typing a text
    const inputCharCounter = await InputBar.inputCharCounterText;
    const inputCharMaxText = await InputBar.inputCharMaxText;
    await InputBar.typeMessageOnInput("Testing...");
    await expect(inputCharCounter).toHaveText("10");
    await expect(inputCharMaxText).toHaveText("/1024");
  });

  it("Input Bar - Add emoji to the message to be sent", async () => {
    // Add emoji to the message to be sent
    await InputBar.clickOnEmojiButton();
    await EmojiSelector.clickOnEmoji("😀");

    // Validate Char counter increases after adding an emoji to input bar
    const inputCharCounter = await InputBar.inputCharCounterText;
    const inputCharMaxText = await InputBar.inputCharMaxText;
    await expect(inputCharCounter).toHaveText("11");
    await expect(inputCharMaxText).toHaveText("/1024");
  });

  it("Input Bar - Click on send button will send the message to the other user", async () => {
    // Send message to the other user
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("Testing...😀");

    const textFromMessage =
      await MessageLocal.getCustomMessageContents("Testing...😀");
    await expect(textFromMessage).toHaveText("Testing...😀");
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 after sending a message", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await InputBar.inputCharCounterText;
    const inputCharMaxText = await InputBar.inputCharMaxText;
    await expect(inputCharCounter).toHaveText("0");
    await expect(inputCharMaxText).toHaveText("/1024");
  });

  it("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroupLocal.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveText(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveText("ChatUserA");
  });

  it("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText =
      await MessageLocal.getCustomMessageContents("Testing...😀");
    await expect(messageText).toHaveText("Testing...😀");
  });

  it("Chat User A - Validate Chat Message Group displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroupLocal.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await Topbar.validateTopbarUserImage();
    await Topbar.validateTopbarUserName("ChatUserB");
  });

  it("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await Topbar.addToFavorites();
    await FavoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await FavoritesSidebar.validateFavoritesUserImage("ChatUserB");
  });

  it("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await Topbar.removeFromFavorites();
  });

  it("Chat User B - Wait until the other user is connected", async () => {
    // Switch control to User B
    await activateSecondApplication();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.hoverOnChatWithFriendButton("ChatUserA");
    await FriendsScreen.chatWithFriendButton.click();
    await FriendsScreen.validateSpinnerIsNotShown();
    await Topbar.validateTopbarExists();
  });

  it("Chat User B - Assert message received from Chat User A", async () => {
    // Validate message received from Chat User A
    await MessageRemote.waitForReceivingMessage("Testing...😀");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await MessageRemote.getCustomMessageContents("Testing...😀");
    await expect(textFromMessage).toHaveText("Testing...😀");
  });

  it("Chat User B - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroupRemote.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await MessageGroupRemote.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveText(
      expect.stringMatching(/- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/),
    );
    await expect(timeAgo).toHaveText("ChatUserA");
  });

  it("Chat User A - Change user status to Idle", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Change User A to Idle
    await Topbar.goToSettings();
    await SettingsNotificationsScreen.goToProfileSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Maximize Window
    await SettingsProfileScreen.clickOnStatusInput();
    await scrollDown(1000);

    // Change Status to Idle
    await SettingsProfileScreen.selectIdleStatus();

    // Validate status is Idle now
    const currentOnlineStatus =
      await SettingsProfileScreen.selectorCurrentValue;
    await expect(currentOnlineStatus).toHaveText("Idle");

    // Return to chat and validate Local User Status is Idle
    await SettingsProfileScreen.goToMainScreen();
    await InputBar.waitForIsShown(true);
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}
