import {
  createNewUser,
  discardNotificationsAlert,
  getUserKey,
  launchAppForChatUserA,
  launchAppForChatUserB,
  saveTestKeys,
} from "../../helpers/commands";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
import Topbar from "../../screenobjects/chats/Topbar";
import SettingsNotificationsScreen from "../../screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "../../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";

export default async function createChatAcountsTests() {
  it("Chat User A - Create Account", async () => {
    await launchAppForChatUserA();
    const username = "ChatUserA";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const inputTextElement = await SettingsProfileScreen.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
  });

  it("Chat User A - Disable notifications", async () => {
    await SettingsProfileScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();
    await SettingsNotificationsScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Chat User B - Create Account", async () => {
    await launchAppForChatUserB();
    const username = "ChatUserB";
    await createNewUser(username);
  });

  it("Chat User B - Disable notifications", async () => {
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Go to Friends
    await SettingsNotificationsScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Chat User A - Accept friend request from B", async () => {
    await launchAppForChatUserA();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserB");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    await launchAppForChatUserB();
    await discardNotificationsAlert();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();
  });

  it("Chat User A - Go to chat with friend and wait until user is online", async () => {
    await launchAppForChatUserA();
    await FriendsScreen.chatWithFriendButton.click();
    await Topbar.validateTopbarExists();

    // Wait until Chat User B is online
    await Topbar.waitUntilRemoteUserIsOnline();
  });

  it("Chat User A - Validate Messages secured text displayed on top of conversation", async () => {
    await ChatsLayout.encryptedMessagesText.waitForDisplayed();
    await expect(ChatsLayout.encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network."
    );
  });

  it("Chat User A - Send a message to the other user", async () => {
    await InputBar.typeMessageOnInput("testing...");
    await InputBar.clickOnSendMessage();

    const textFromMessage = await Messages.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("testing...");
  });

  it("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroup.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await Messages.getLastMessageSentText();
    await expect(messageText).toHaveTextContaining("testing...");
  });

  it("Chat User A - Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroup.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await MessageGroup.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chat User A - Topbar information", async () => {
    // Validate user image, username and online indicator are displayed on Chat Topbar
    await expect(Topbar.topbarUserImage).toBeDisplayed();
    await expect(Topbar.topbarUserName).toHaveTextContaining("ChatUserB");
    await expect(Topbar.topbarIndicatorOnline).toBeDisplayed();
  });

  it("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await Topbar.addToFavorites();
    await Topbar.favorites.waitForExist();

    // Favorites Sidebar should be displayed
    await expect(Topbar.favoritesUserImage).toBeDisplayed();
    await expect(Topbar.favoritesUserIndicatorOnline).toBeDisplayed();
    await expect(Topbar.favoritesUserName).toHaveTextContaining("CHATUSERB");
  });

  it("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await Topbar.removeFromFavorites();
    await Topbar.favorites.waitForExist({ reverse: true });
  });

  it("Chat User B - Wait until the other user is online", async () => {
    await launchAppForChatUserB();
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);

    // Wait until Chat User A is online
    await Topbar.topbarIndicatorOnline.waitForDisplayed({
      timeout: 240000,
    });
  });

  it("Chat User B - Assert message received from Chat User A", async () => {
    await discardNotificationsAlert();
    await Messages.waitForReceivingMessage("testing...");
  });

  it("Chat User B - Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage = await Messages.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("testing...");
  });

  it("Chat User B - Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroup.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await MessageGroup.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await MessageGroup.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });
}
