import {
  getUserKey,
  launchAppForChatUserA,
  launchAppForChatUserB,
} from "../../helpers/commands";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
import QuickProfile from "../../screenobjects/chats/QuickProfile";
import Topbar from "../../screenobjects/chats/Topbar";
import SettingsProfileScreen from "../../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";

export default async function quickProfileTests() {
  it("Chat User A - Validate contents from local quick profile", async () => {
    // Open quick profile from remote user
    await MessageGroup.openLocalQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Validate contents from quick profile
    await expect(QuickProfile.quickProfileUserImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileBannerImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileIndicatorOnline).toBeDisplayed();
    await expect(
      QuickProfile.quickProfileUserNameValueText
    ).toHaveTextContaining("ChatUserA");
    await expect(QuickProfile.quickProfileEditProfile).toBeDisplayed();
  });

  it("Chat User A - Click on Edit Profile", async () => {
    await QuickProfile.clickOnEditProfile();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToMainScreen();
  });

  it("Chat User A - Validate contents from remote quick profile", async () => {
    // Open quick profile from remote user
    await MessageGroup.openRemoteQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Validate contents from quick profile
    await expect(QuickProfile.quickProfileUserImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileBannerImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileIndicatorOnline).toBeDisplayed();
    await expect(
      QuickProfile.quickProfileUserNameValueText
    ).toHaveTextContaining("ChatUserB");
    await expect(QuickProfile.quickProfileRemoveFriend).toBeDisplayed();
    await expect(QuickProfile.quickProfileBlockUser).toBeDisplayed();

    // Click outside to close quick profile
    await Topbar.topbar.click();
  });

  it("Chat User A - Remove Friend", async () => {
    // Open quick profile from remote user
    await MessageGroup.openRemoteQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Click on Remove Friend from Quick Profile
    await QuickProfile.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await WelcomeScreen.waitForIsShown(true);
  });

  it("Chat User A - Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await WelcomeScreen.goToFriends();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
  });

  it("Chat User B - Wait until User A removes User B", async () => {
    await launchAppForChatUserB();
    // Go to Friends and wait for User A to remove friendship with User B
    await Topbar.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.waitUntilFriendIsRemoved("ChatUserA");
  });

  it("Chat User A - Send friend request again to User B", async () => {
    await launchAppForChatUserA();
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await FriendsScreen.goToPendingFriendsList();
    const pendingList = await FriendsScreen.getOutgoingList();
    const includesFriend = await pendingList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);
    await FriendsScreen.goToAllFriendsList();
  });

  it("Chat User B - Wait until User A sends friend request again User A and accept it", async () => {
    await launchAppForChatUserB();
    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    const friendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserA");
    await expect(includesFriend).toEqual(true);
  });

  it("Chat User A - Wait until friend request is accepted again", async () => {
    await launchAppForChatUserA();
    // Wait until user B accepts the friend request
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    const friendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);

    // Go to chat with User B
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();
  });

  it("Chat User B - Send message to User B", async () => {
    await launchAppForChatUserB();
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("Accepted...");
    await InputBar.clickOnSendMessage();
  });

  it("Chat User A - Go to chat with User B and wait for receiving a message", async () => {
    await launchAppForChatUserA();
    await Messages.waitForReceivingMessage("Accepted...");
  });

  it("Chat User A - Block Friend", async () => {
    // Open quick profile from remote user
    await MessageGroup.openRemoteQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Click on Block Friend from Quick Profile
    await QuickProfile.clickOnBlockUser();

    // Welcome Screen should be displayed
    await WelcomeScreen.waitForIsShown(true);
  });

  it("Chat User A - Ensure that Chat User B is in blocked list now", async () => {
    // Get current list of Blocked friends and ensure that it includes the blocked user
    await WelcomeScreen.goToFriends();
    await FriendsScreen.goToBlockedList();
    const blockedList = await FriendsScreen.getBlockedList();
    const includesFriend = await blockedList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);
  });

  it("Chat User B - Wait until User A blocks User B", async () => {
    await launchAppForChatUserB();
    // Go to Friends and wait for User A to remove friendship with User B
    await InputBar.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.waitUntilFriendIsRemoved("ChatUserA");
  });

  it("Chat User A - Unblock and send friend request again to User B", async () => {
    await launchAppForChatUserA();
    // Unblock user
    const username = "ChatUserB";
    await FriendsScreen.removeOrCancelUser(username);
    await FriendsScreen.goToAllFriendsList();

    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey(username);
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await FriendsScreen.goToPendingFriendsList();
    const pendingList = await FriendsScreen.getOutgoingList();
    const includesFriend = await pendingList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);
    await FriendsScreen.goToAllFriendsList();
  });

  it("Chat User B - Wait until User A sends friend request again User B and accept it", async () => {
    await launchAppForChatUserB();
    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();

    // Validate friend is now on all friends list
    const friendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserA");
    await expect(includesFriend).toEqual(true);
  });

  it("Chat User B - Return to conversation", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
  });

  it("Chat User A - Wait until friend request is accepted again", async () => {
    await launchAppForChatUserA();
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    const friendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await friendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);

    // Go to chat with User B
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
  });
}
