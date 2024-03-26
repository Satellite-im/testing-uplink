require("module-alias/register");
import { createNewUser } from "@helpers/commandsNewUser";
import {
  getUserKey,
  resetApp,
  saveTestKeys,
  closeApplication,
  launchSecondApplication,
  launchApplication,
  closeSecondApplication,
} from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const userA: string = "UserA";
const userB: string = "UserB";

export default async function offlineRequestsTests() {
  it("Offline Friend Requests - Create test account #1", async () => {
    // Create New User and go to Settings Profile Screen
    await resetApp();
    await createNewUser(userA, true);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });

  it("Offline Friend Requests - Save test account #1 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userA, didkey);
    await closeApplication();
  });

  // Wait until toast notification is closed
  it("Offline Friend Requests - Create account user #2", async () => {
    // Create New User and go to Settings Profile Screen
    await launchSecondApplication();
    await createNewUser(userB, true);
    await WelcomeScreen.goToFriends();
  });

  it("Offline Friend Requests - Send Friend Request to user #1", async () => {
    // Obtain did key from User #1
    const friendDidKey = await getUserKey(userA);
    await FriendsScreen.sendFriendRequest(friendDidKey, userA);

    // Go to All Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Offline Friend Requests - Save test account #2 data", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await FriendsScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(userB, didkey);
    await closeSecondApplication();
  });

  it("Offline Friend Requests - User #1 accepts offline friend request received", async () => {
    // Clear cache and reset app
    await launchApplication();
    await CreatePinScreen.loginWithTestUser();

    // Go to Friends Screen
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // With UserB - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.hoverOnPendingListButton();
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("UserB");

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
    await closeApplication();
  });

  it("Offline Friend Requests - Validate offline friend request was accepted", async () => {
    // Launch second app
    await launchSecondApplication();
    await CreatePinScreen.loginWithTestUser();

    // Go to Friends Screen
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();
  });

  it("Offline Messages - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    // Go to Chat with User A
    await FriendsScreen.goToChatWithFriend();
    await Topbar.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText = await ChatsLayout.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveText(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network.",
    );
  });

  it("Offline Messages - Send a message to offline user", async () => {
    // Send message to the other user
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("Testing...");

    const textFromMessage =
      await MessageLocal.getCustomMessageContents("Testing...");
    await expect(textFromMessage).toHaveText("Testing...");
  });

  it("Offline Messages - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroupLocal.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveText(
      expect.stringMatching(/- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/),
    );
    await expect(timeAgo).toHaveText(expect.stringContaining("UserB"));
  });

  it("Offline Messages - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText =
      await MessageLocal.getCustomMessageContents("Testing...");
    await expect(messageText).toHaveText("Testing...");
  });

  it("Offline Messages - Validate Chat Message displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroupLocal.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Offline Messages - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await Topbar.validateTopbarUserImage();
    await Topbar.validateTopbarUserName("UserA");

    // Terminate Second Application
    await closeSecondApplication();
  });

  it("Offline Messages - Assert user can receive messages while being offline", async () => {
    // Open first application
    await launchApplication();
    await CreatePinScreen.loginWithTestUser();

    // Go to the current list of All friends and then open a Chat conversation with UserB
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.hoverOnChatWithFriendButton("UserB");
    await FriendsScreen.chatWithFriendButton.click();
    await FriendsScreen.validateSpinnerIsNotShown();
    await Topbar.validateTopbarExists();
  });

  it("Offline Messages - Assert message received from UserB", async () => {
    // Validate message received from Chat User A
    await MessageRemote.waitForReceivingMessage("Testing...");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await MessageRemote.getCustomMessageContents("Testing...");
    await expect(textFromMessage).toHaveText("Testing...");
  });

  it("Offline Messages - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroupRemote.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Offline Messages - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await MessageGroupRemote.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveText(
      expect.stringMatching(/- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/),
    );
    await expect(timeAgo).toHaveText(expect.stringContaining("UserB"));

    // Grab cache folder
    await closeApplication();
  });
}
