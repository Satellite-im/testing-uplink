import {
  createNewUser,
  createNewUserSecondInstance,
  getUserKey,
  saveTestKeys,
} from "../../helpers/commands";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import FavoritesSidebar from "../../screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
import Topbar from "../../screenobjects/chats/Topbar";
import SettingsExtensionsScreen from "../../screenobjects/settings/SettingsExtensionsScreen";
import SettingsGeneralScreen from "../../screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../../screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "../../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsLayoutSecondUser = new ChatsLayout(USER_B_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessageGroupsSecondUser = new MessageGroup(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let favoritesSidebarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let friendsScreenSecondUser = new FriendsScreen(USER_B_INSTANCE);
let settingsExtensionsFirstUser = new SettingsExtensionsScreen(USER_A_INSTANCE);
let settingsExtensionsSecondUser = new SettingsExtensionsScreen(
  USER_B_INSTANCE
);
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
    const username = "ChatUserA";
    await createNewUser(username);
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();
    const inputTextElement =
      await settingsProfileFirstUser.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey, USER_A_INSTANCE);
  });

  it("Chat User A - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfileFirstUser.goToGeneralSettings();
    await settingsGeneralFirstUser.waitForIsShown(true);
    await settingsGeneralFirstUser.clickOnFontScalingMinus();
  });

  it("Chat User A - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsGeneralFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.waitForIsShown(true);
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();
  });

  it("Chat User A - Settings Extensions - Enable Emoji Selector extension", async () => {
    // Go to Extensions Settings
    await settingsNotificationsFirstUser.goToExtensionsSettings();
    await settingsExtensionsFirstUser.waitForIsShown(true);

    // Click on Switch from Emoji Selector to activate it
    await settingsExtensionsFirstUser.clickOnEmojiSelectorCheckbox();

    // Go to Friends Screen
    await settingsExtensionsFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Chat User B - Create Account", async () => {
    const username = "ChatUserB";
    await createNewUserSecondInstance(username);
    await welcomeScreenSecondUser.goToSettings();
    await settingsProfileSecondUser.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileSecondUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileSecondUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileSecondUser.pasteUserKeyInStatus();
    const inputTextElement =
      await settingsProfileSecondUser.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey, USER_B_INSTANCE);
  });

  it("Chat User B - Settings General - Reduce font size", async () => {
    // Go to General Settings and reduce Font Size by 0.5
    await settingsProfileSecondUser.goToGeneralSettings();
    await settingsGeneralSecondUser.waitForIsShown(true);
    await settingsGeneralSecondUser.clickOnFontScalingMinus();
  });

  it("Chat User B - Settings Notifications - Disable notifications", async () => {
    // Go to Notifications Settings and disable all notifications
    await settingsGeneralSecondUser.goToNotificationsSettings();
    await settingsNotificationsSecondUser.waitForIsShown(true);
    await settingsNotificationsSecondUser.clickOnFriendsNotifications();
    await settingsNotificationsSecondUser.clickOnMessagesNotifications();
  });

  it("Chat User B - Settings Extensions - Enable Emoji Selector extension", async () => {
    // Go to Extensions Settings
    await settingsNotificationsSecondUser.goToExtensionsSettings();
    await settingsExtensionsSecondUser.waitForIsShown(true);

    // Click on Switch from Emoji Selector to activate it
    await settingsExtensionsSecondUser.clickOnEmojiSelectorCheckbox();

    // Go to Friends Screen
    await settingsExtensionsSecondUser.goToFriends();
    await friendsScreenSecondUser.waitForIsShown(true);
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA", USER_B_INSTANCE);
    await friendsScreenSecondUser.enterFriendDidKey(friendDidKey);
    await friendsScreenSecondUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenSecondUser.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await friendsScreenSecondUser.hoverOnPendingListButton();
    await friendsScreenSecondUser.goToPendingFriendsList();
    const pendingList = await friendsScreenSecondUser.getOutgoingList();
    const includesFriend = await pendingList.includes("ChatUserA");
    await expect(includesFriend).toEqual(true);
    await friendsScreenSecondUser.goToAllFriendsList();
    await friendsScreenFirstUser.switchToOtherUserWindow();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserB");
  });

  it("Chat User A - Validate Chat User B is now a friend", async () => {
    // Validate friend is now on all friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    const friendsList = await friendsScreenFirstUser.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);

    // Go to Chat with User B
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await friendsScreenSecondUser.switchToOtherUserWindow();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenSecondUser.waitUntilUserAcceptedFriendRequest();
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    // Validate friend is now on all friends list
    await friendsScreenSecondUser.goToAllFriendsList();
    const friendsList = await friendsScreenSecondUser.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserA");
    await expect(includesFriend).toEqual(true);
    await chatsTopbarFirstUser.switchToOtherUserWindow();
  });

  it("Chat User A - Go to chat with friend and wait until user is online", async () => {
    await chatsTopbarFirstUser.validateTopbarExists();

    // Wait until Chat User B is online
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();
  });

  it("Chat User A - Validate Messages secured text displayed on top of conversation", async () => {
    await chatsLayoutFirstUser.encryptedMessagesText.waitForDisplayed();
    await expect(
      chatsLayoutFirstUser.encryptedMessagesText
    ).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network."
    );
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 before typing a text", async () => {
    await expect(chatsInputFirstUser.inputCharCounterText).toHaveTextContaining(
      "0/1024"
    );
  });

  it("Input Bar - Chars Counter on Input Bar displays the number of chars of text entered", async () => {
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await expect(chatsInputFirstUser.inputCharCounterText).toHaveTextContaining(
      "10/1024"
    );
  });

  it("Input Bar - Click on send button will send the message to the other user", async () => {
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Testing...");

    const textFromMessage =
      await chatsMessagesFirstUser.getFirstMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("Testing...");
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 after sending a message", async () => {
    await expect(chatsInputFirstUser.inputCharCounterText).toHaveTextContaining(
      "0/1024"
    );
  });

  it("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await chatsMessagesFirstUser.getFirstMessageSentText();
    await expect(messageText).toHaveTextContaining("Testing...");
  });

  it("Chat User A - Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chat User A - Topbar information", async () => {
    // Validate user image, username and online indicator are displayed on Chat Topbar
    await chatsTopbarFirstUser.topbarUserImage.waitForDisplayed();
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "ChatUserB"
    );
    await chatsTopbarFirstUser.topbarIndicatorOnline.waitForDisplayed();
  });

  it("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.favorites.waitForExist();

    // Favorites Sidebar should be displayed
    await expect(favoritesSidebarFirstUser.favoritesUserImage).toBeDisplayed();
    await expect(
      favoritesSidebarFirstUser.favoritesUserIndicatorOnline
    ).toBeDisplayed();
    await expect(
      favoritesSidebarFirstUser.favoritesUserName
    ).toHaveTextContaining("CHATUSERB");
  });

  it("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await chatsTopbarFirstUser.removeFromFavorites();
    await favoritesSidebarFirstUser.favorites.waitForExist({
      reverse: true,
    });
    await friendsScreenSecondUser.switchToOtherUserWindow();
  });

  it("Chat User B - Wait until the other user is online", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenSecondUser.chatWithFriendButton.waitForExist();
    await friendsScreenSecondUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenSecondUser.chatWithFriendButton.click();
    await chatsLayoutSecondUser.waitForIsShown(true);

    // Wait until Chat User A is online
    await chatsTopbarSecondUser.topbarIndicatorOnline.waitForDisplayed({
      timeout: 90000,
    });
  });

  it("Chat User B - Assert message received from Chat User A", async () => {
    await chatsMessagesSecondUser.waitForReceivingMessage("Testing...");
  });

  it("Chat User B - Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await chatsMessagesSecondUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Testing...");
  });

  it("Chat User B - Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsSecondUser.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsSecondUser.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo =
      await chatsMessageGroupsSecondUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });
}
