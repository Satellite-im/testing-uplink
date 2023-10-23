import "module-alias/register";
import {
  createNewUser,
  createNewUserSecondInstance,
  getUserKey,
  maximizeWindow,
  saveTestKeys,
} from "@helpers/commands";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import EmojiSelector from "@screenobjects/chats/EmojiSelector";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Messages from "@screenobjects/chats/Messages";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessageGroupsSecondUser = new MessageGroup(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);
let createPinSecondUser = new CreatePinScreen(USER_B_INSTANCE);
let emojiSelectorFirstUser = new EmojiSelector(USER_A_INSTANCE);
let favoritesSidebarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let friendsScreenSecondUser = new FriendsScreen(USER_B_INSTANCE);
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);
let settingsGeneralSecondUser = new SettingsGeneralScreen(USER_B_INSTANCE);
let settingsNotificationsFirstUser = new SettingsNotificationsScreen(
  USER_A_INSTANCE
);
let settingsNotificationsSecondUser = new SettingsNotificationsScreen(
  USER_B_INSTANCE
);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let settingsProfileSecondUser = new SettingsProfileScreen(USER_B_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

export default async function createChatAccountsTests() {
  it("Chat User A - Create Account", async () => {
    // Create a new account and go to Settings Profile
    await createPinFirstUser.switchToOtherUserWindow();
    const username = "ChatUserA";
    await createNewUser(username);
    await maximizeWindow(USER_A_INSTANCE);
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();
    const didkey = await settingsProfileFirstUser.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey, USER_A_INSTANCE);
  });

  it("Chat User A - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfileFirstUser.goToGeneralSettings();

    // Wait for toast notification of Profile Updated to not exist
    await settingsGeneralFirstUser.waitUntilNotificationIsClosed();

    // Click on font scaling minus button
    await settingsGeneralFirstUser.settingsGeneral.waitForExist();
    await settingsGeneralFirstUser.clickOnFontScalingMinus();
  });

  it("Chat User A - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsGeneralFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.validateSettingsNotificationsIsShown();
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();

    // Go to Friends Screen
    await settingsNotificationsFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  xit("Chat User B - Create Account", async () => {
    // Create a new account and go to Settings Profile
    await createPinSecondUser.switchToOtherUserWindow();
    const username = "ChatUserB";
    await createNewUserSecondInstance(username);
    await maximizeWindow(USER_B_INSTANCE);
    await welcomeScreenSecondUser.goToSettings();
    await settingsProfileSecondUser.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileSecondUser.clickOnCopyIDButton();

    // Wait for toast notification of Copied To Clipboard to not exist
    await settingsProfileSecondUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileSecondUser.pasteUserKeyInStatus();
    const didkey =
      await settingsProfileSecondUser.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey, USER_B_INSTANCE);
  });

  it("Chat User B - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfileSecondUser.goToGeneralSettings();

    // Wait for toast notification of Profile Updated to not exist
    await settingsGeneralSecondUser.waitUntilNotificationIsClosed();

    // Click on font scaling minus
    await settingsGeneralSecondUser.validateSettingsGeneralIsShown();
    await settingsGeneralSecondUser.clickOnFontScalingMinus();
  });

  it("Chat User B - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsGeneralSecondUser.goToNotificationsSettings();
    await settingsNotificationsSecondUser.validateSettingsNotificationsIsShown();
    await settingsNotificationsSecondUser.clickOnFriendsNotifications();
    await settingsNotificationsSecondUser.clickOnMessagesNotifications();

    // Go to Friends Screen
    await settingsNotificationsSecondUser.goToFriends();
    await friendsScreenSecondUser.validateFriendsScreenIsShown();
  });

  xit("Chat User B - Send friend request to User A", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA", USER_B_INSTANCE);
    await friendsScreenSecondUser.enterFriendDidKey(friendDidKey);
    await friendsScreenSecondUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenSecondUser.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await friendsScreenSecondUser.hoverOnPendingListButton();
    await friendsScreenSecondUser.goToPendingFriendsList();
    await friendsScreenSecondUser.validateOutgoingListIsShown();
    await friendsScreenSecondUser.validateOutgoingListIsNotEmpty();

    await friendsScreenSecondUser.goToAllFriendsList();
    await friendsScreenSecondUser.validateAllFriendsListIsShown();
  });

  xit("Chat User A - Accept friend request from User A and go to chat button", async () => {
    // Switch control to User A
    await friendsScreenFirstUser.switchToOtherUserWindow();

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
  });

  xit("Chat User B - Validate friend request was accepted", async () => {
    // Switch control to User B
    await friendsScreenSecondUser.switchToOtherUserWindow();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenSecondUser.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreenSecondUser.goToAllFriendsList();
    await friendsScreenSecondUser.validateAllFriendsListIsShown();
    await friendsScreenSecondUser.validateAllFriendsListIsNotEmpty();
  });

  xit("Chat User A - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    // Switch control to User A
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText =
      await chatsLayoutFirstUser.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network."
    );
  });

  xit("Input Bar - Chars Counter on Input Bar displays 0/1024 before typing a text", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  xit("Input Bar - Chars Counter on Input Bar displays the number of chars of text entered", async () => {
    // Validate Char counter increases after typing a text
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await expect(inputCharCounter).toHaveTextContaining("10");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  xit("Input Bar - Add emoji to the message to be sent", async () => {
    // Add emoji to the message to be sent
    await chatsInputFirstUser.clickOnEmojiButton();
    await emojiSelectorFirstUser.clickOnEmoji("😀");

    // Validate Char counter increases after adding an emoji to input bar
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("11");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  xit("Input Bar - Click on send button will send the message to the other user", async () => {
    // Send message to the other user
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Testing...😀");

    const textFromMessage =
      await chatsMessagesFirstUser.getFirstMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("Testing...😀");
  });

  // Skipping test since there is an issue open ticket #1167 on uplink
  xit("Input Bar - Chars Counter on Input Bar displays 0/1024 after sending a message", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  xit("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  xit("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await chatsMessagesFirstUser.getFirstMessageSentText();
    await expect(messageText).toHaveTextContaining("Testing...😀");
  });

  xit("Chat User A - Validate Chat Message Group displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  xit("Chat User A - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await chatsTopbarFirstUser.validateTopbarUserImage();
    await chatsTopbarFirstUser.validateTopbarUserName("ChatUserB");
  });

  // Skipping test since there is a bug encountered on Uplink that needs fixing
  xit("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebarFirstUser.validateFavoritesUserImage("ChatUserB");
  });

  // Skipping test since there is a bug encountered on Uplink that needs fixing
  xit("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await chatsTopbarFirstUser.removeFromFavorites();
  });

  xit("Chat User B - Wait until the other user is connected", async () => {
    // Switch control to User B
    await friendsScreenSecondUser.switchToOtherUserWindow();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenSecondUser.chatWithFriendButton.waitForExist();
    await friendsScreenSecondUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenSecondUser.chatWithFriendButton.click();
    await chatsTopbarSecondUser.validateTopbarExists();
  });

  xit("Chat User B - Assert message received from Chat User A", async () => {
    // Validate message received from Chat User A
    await chatsMessagesSecondUser.waitForReceivingMessage("Testing...😀");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await chatsMessagesSecondUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Testing...😀");
  });

  xit("Chat User B - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsSecondUser.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  xit("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo =
      await chatsMessageGroupsSecondUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });
}
