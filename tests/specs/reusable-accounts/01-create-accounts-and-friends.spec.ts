require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  createNewUser,
  getUserKey,
  launchSecondApplication,
  saveTestKeys,
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
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const chatsInputFirstUser = new InputBar();
const chatsLayoutFirstUser = new ChatsLayout();
const messageGroupLocalFirstUser = new MessageGroupLocal();
const messageGroupRemoteFirstUser = new MessageGroupRemote();
const messageLocalFirstUser = new MessageLocal();
const messageRemoteFirstUser = new MessageRemote();
const chatsTopbarFirstUser = new Topbar();
const createPinFirstUser = new CreatePinScreen();
const emojiSelectorFirstUser = new EmojiSelector();
const favoritesSidebarFirstUser = new FavoritesSidebar();
const friendsScreenFirstUser = new FriendsScreen();
const settingsGeneralFirstUser = new SettingsGeneralScreen();
const settingsNotificationsFirstUser = new SettingsNotificationsScreen();
const settingsProfileFirstUser = new SettingsProfileScreen();
const welcomeScreenFirstUser = new WelcomeScreen();

export default async function createChatAccountsTests() {
  it("Chat User A - Create Account", async () => {
    // Create a new account and go to Settings Profile
    await createPinFirstUser.waitForIsShown(true);
    const username = "ChatUserA";
    await createNewUser(username);
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.openCopyIDContextMenu();
    await settingsProfileFirstUser.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();
    const didkey = await settingsProfileFirstUser.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
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

  it("Chat User B - Create Account", async () => {
    // Launch second application
    await launchSecondApplication();

    // Create a new account and go to Settings Profile
    await createPinFirstUser.waitForIsShown(true);
    const username = "ChatUserB";
    await createNewUser(username);
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.validateSettingsProfileIsShown();

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.openCopyIDContextMenu();
    await settingsProfileFirstUser.clickOnContextMenuCopyDidKey();

    // Wait for toast notification of Copied To Clipboard to not exist
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();
    const didkey = await settingsProfileFirstUser.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
  });

  it("Chat User B - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfileFirstUser.goToGeneralSettings();

    // Wait for toast notification of Profile Updated to not exist
    await settingsGeneralFirstUser.waitUntilNotificationIsClosed();

    // Click on font scaling minus
    await settingsGeneralFirstUser.validateSettingsGeneralIsShown();
    await settingsGeneralFirstUser.clickOnFontScalingMinus();
  });

  it("Chat User B - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsGeneralFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.validateSettingsNotificationsIsShown();
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();

    // Go to Friends Screen
    await settingsNotificationsFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA");
    await friendsScreenFirstUser.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User A and go to chat button", async () => {
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
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    // Switch control to User B
    await activateSecondApplication();

    // With User B - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User A - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    // Switch control to User A
    await activateFirstApplication();
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText =
      await chatsLayoutFirstUser.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network.",
    );
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 before typing a text", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Chars Counter on Input Bar displays the number of chars of text entered", async () => {
    // Validate Char counter increases after typing a text
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await expect(inputCharCounter).toHaveTextContaining("10");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Add emoji to the message to be sent", async () => {
    // Add emoji to the message to be sent
    await chatsInputFirstUser.clickOnEmojiButton();
    await emojiSelectorFirstUser.clickOnEmoji("😀");

    // Validate Char counter increases after adding an emoji to input bar
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("11");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Click on send button will send the message to the other user", async () => {
    // Send message to the other user
    await chatsInputFirstUser.clickOnSendMessage();
    await messageLocalFirstUser.waitForMessageSentToExist("Testing...😀");

    const textFromMessage =
      await messageLocalFirstUser.getFirstMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("Testing...😀");
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 after sending a message", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await messageGroupLocalFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await messageLocalFirstUser.getFirstMessageSentText();
    await expect(messageText).toHaveTextContaining("Testing...😀");
  });

  it("Chat User A - Validate Chat Message Group displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await messageGroupLocalFirstUser.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await chatsTopbarFirstUser.validateTopbarUserImage();
    await chatsTopbarFirstUser.validateTopbarUserName("ChatUserB");
  });

  it("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebarFirstUser.validateFavoritesUserImage("ChatUserB");
  });

  it("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await chatsTopbarFirstUser.removeFromFavorites();
  });

  it("Chat User B - Wait until the other user is connected", async () => {
    // Switch control to User B
    await activateSecondApplication();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsTopbarFirstUser.validateTopbarExists();
  });

  it("Chat User B - Assert message received from Chat User A", async () => {
    // Validate message received from Chat User A
    await messageRemoteFirstUser.waitForReceivingMessage("Testing...😀");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await messageRemoteFirstUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Testing...😀");
  });

  it("Chat User B - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await messageGroupRemoteFirstUser.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo =
      await messageGroupRemoteFirstUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });
}
