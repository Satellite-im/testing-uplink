require("module-alias/register");
import {
  createNewUser,
  getUserKey,
  grabCacheFolder,
  resetApp,
  resetAndLoginWithCache,
  saveTestKeys,
} from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const chatsInput = new InputBar();
const chatsLayout = new ChatsLayout();
const chatsTopbar = new Topbar();
const friendsScreen = new FriendsScreen();
const messageGroupLocal = new MessageGroupLocal();
const messageGroupRemote = new MessageGroupRemote();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();
const userA: string = "UserA";
const userB: string = "UserB";

export default async function offlineRequestsTests() {
  it("Offline Friend Requests - Create test account #1", async () => {
    // Create New User and go to Settings Profile Screen
    await resetApp();
    await createNewUser(userA, true);
    await welcomeScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
  });

  it("Offline Friend Requests - Save test account #1 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await welcomeScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userA, didkey);

    // Update profile picture from user A

    // Update banner picture from user A
    await grabCacheFolder(userA);
  });

  // Wait until toast notification is closed
  it("Offline Friend Requests - Create account user #2", async () => {
    // Create New User and go to Settings Profile Screen
    await resetApp();
    await createNewUser(userB, true);
    await welcomeScreen.goToFriends();
  });

  it("Offline Friend Requests - Send Friend Request to user #1", async () => {
    // Obtain did key from User #1
    const friendDidKey = await getUserKey(userA);
    await friendsScreen.sendFriendRequest(friendDidKey, userA);

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Offline Friend Requests - Save test account #2 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await friendsScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);
    await settingsProfile.openCopyIDContextMenu();
    await settingsProfile.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfile.pasteUserKeyInStatus();
    const didkey = await settingsProfile.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userB, didkey);
    await grabCacheFolder(userB);
  });

  it("Offline Friend Requests - User #1 accepts offline friend request received", async () => {
    // Clear cache and reset app
    await resetAndLoginWithCache("UserA");

    // Go to Friends Screen
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.waitUntilFriendRequestIsReceived();
    await friendsScreen.acceptIncomingRequest("UserB");

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User #2
    await friendsScreen.chatWithFriendButton.click();
    await friendsScreen.validateSpinnerIsNotShown();

    await grabCacheFolder(userA);
  });

  it("Offline Friend Requests - Validate offline friend request was accepted", async () => {
    // Clear cache and reset app
    await resetAndLoginWithCache(userB);

    // Go to Friends Screen
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();
    await friendsScreen.waitUntilUserAcceptedFriendRequest();
  });

  it("Offline Messages - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    // Go to Chat with User A
    await friendsScreen.goToChatWithFriend();
    await chatsTopbar.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText = await chatsLayout.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network.",
    );
  });

  it("Offline Messages - Send a message to offline user", async () => {
    // Send message to the other user
    await chatsInput.typeMessageOnInput("Testing...");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Testing...");

    const textFromMessage =
      await messageLocal.getCustomMessageContents("Testing...");
    await expect(textFromMessage).toHaveText("Testing...");
  });

  it("Offline Messages - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await messageGroupLocal.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("UserB");
  });

  it("Offline Messages - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText =
      await messageLocal.getCustomMessageContents("Testing...");
    await expect(messageText).toHaveText("Testing...");
  });

  it("Offline Messages - Validate Chat Message displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await messageGroupLocal.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Offline Messages - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await chatsTopbar.validateTopbarUserImage();
    await chatsTopbar.validateTopbarUserName("UserA");

    // Grab Cache Folder UserB
    await grabCacheFolder(userB);
  });

  it("Offline Messages - Assert user can receive messages while being offline", async () => {
    // Switch control to User A
    await resetAndLoginWithCache(userA);

    // Go to the current list of All friends and then open a Chat conversation with UserB
    await friendsScreen.chatWithFriendButton.waitForExist();
    await friendsScreen.hoverOnChatWithFriendButton("UserB");
    await friendsScreen.chatWithFriendButton.click();
    await friendsScreen.validateSpinnerIsNotShown();
    await chatsTopbar.validateTopbarExists();
  });

  it("Offline Messages - Assert message received from UserB", async () => {
    // Validate message received from Chat User A
    await messageRemote.waitForReceivingMessage("Testing...");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await messageRemote.getCustomMessageContents("Testing...");
    await expect(textFromMessage).toHaveText("Testing...");
  });

  it("Offline Messages - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await messageGroupRemote.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Offline Messages - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await messageGroupRemote.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("UserB");

    // Grab cache folder
    await grabCacheFolder(userA);
  });
}
