import {
  createNewUser,
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

describe("Windows Chats Tests", async () => {
  it("Chat User A - Create Account", async () => {
    const username = "ChatUserA";
    await a.createNewUser(username);
    await a.WelcomeScreen.goToSettings();
    await a.SettingsProfileScreen.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await a.SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await a.SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await a.SettingsProfileScreen.pasteUserKeyInStatus();
    const inputTextElement = await a.SettingsProfileScreen.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
  });

  it("Chat User A - Disable notifications", async () => {
    await a.SettingsProfileScreen.goToNotificationsSettings();
    await a.SettingsNotificationsScreen.waitForIsShown(true);
    await a.SettingsNotificationsScreen.clickOnFriendsNotifications();
    await a.SettingsNotificationsScreen.clickOnMessagesNotifications();
    await a.SettingsNotificationsScreen.goToFriends();
    await a.FriendsScreen.waitForIsShown(true);
  });

  it("Chat User B - Create Account", async () => {
    const username = "ChatUserB";
    await b.createNewUser(username);
  });

  it("Chat User B - Disable notifications", async () => {
    await b.WelcomeScreen.goToSettings();
    await b.SettingsProfileScreen.waitForIsShown(true);
    await b.SettingsProfileScreen.goToNotificationsSettings();
    await b.SettingsNotificationsScreen.waitForIsShown(true);
    await b.SettingsNotificationsScreen.clickOnFriendsNotifications();
    await b.SettingsNotificationsScreen.clickOnMessagesNotifications();
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Go to Friends
    await b.SettingsNotificationsScreen.goToFriends();
    await b.FriendsScreen.waitForIsShown(true);
    // Obtain did key from Chat User B
    const friendDidKey = await b.getUserKey("ChatUserA");
    await b.FriendsScreen.enterFriendDidKey(friendDidKey);
    await b.FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await b.FriendsScreen.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await b.FriendsScreen.goToPendingFriendsList();
    const pendingList = await b.FriendsScreen.getOutgoingList();
    const includesFriend = await pendingList.includes("ChatUserA");
    await expect(includesFriend).toEqual(true);
    await b.FriendsScreen.goToAllFriendsList();
  });

  it("Chat User A - Accept friend request from B", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await a.FriendsScreen.goToPendingFriendsList();
    await a.FriendsScreen.waitUntilFriendRequestIsReceived();
    await a.FriendsScreen.acceptIncomingRequest("ChatUserB");

    // Validate friend is now on all friends list
    await a.FriendsScreen.goToAllFriendsList();
    const friendsList = await a.FriendsScreen.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);
  });
});
