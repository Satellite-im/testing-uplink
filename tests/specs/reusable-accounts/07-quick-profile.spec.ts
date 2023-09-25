import "module-alias/register";
import { getUserKey } from "@helpers/commands";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Messages from "@screenobjects/chats/Messages";
import QuickProfile from "@screenobjects/chats/QuickProfile";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsQuickProfileFirstUser = new QuickProfile(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let friendsScreenSecondUser = new FriendsScreen(USER_B_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

export default async function quickProfileTests() {
  it("Chat User A - Validate contents from local quick profile", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openLocalQuickProfile();
    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Validate contents from quick profile
    await chatsQuickProfileFirstUser.quickProfileUserImage.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileBannerImage.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileEditProfile.waitForExist();
    const quickProfileUsername =
      await chatsQuickProfileFirstUser.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Click on Edit Profile", async () => {
    await chatsQuickProfileFirstUser.clickOnEditProfile();
    await settingsProfileFirstUser.validateSettingsProfileIsShown();
    await settingsProfileFirstUser.goToMainScreen();
  });

  it("Chat User B - Send message to User A", async () => {
    await chatsInputSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.clickOnInputBar();
    await chatsInputSecondUser.typeMessageOnInput("click...");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("click...");

    // With User A - Validate that message was received
    await chatsMessagesFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsMessagesFirstUser.waitForReceivingMessage("click...");
  });

  it("Chat User A - Validate contents from remote quick profile", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();

    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Validate contents from quick profile
    await chatsQuickProfileFirstUser.quickProfileUserImage.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileBannerImage.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileRemoveFriend.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileBlockUser.waitForExist();

    const quickProfileUsername =
      await chatsQuickProfileFirstUser.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserB");

    // Click outside to close quick profile
    await chatsInputFirstUser.clickOnInputBar();
  });

  it("Chat User A - Remove Friend", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Click on Remove Friend from Quick Profile
    await chatsQuickProfileFirstUser.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await welcomeScreenFirstUser.skeletalUser.waitForExist();
  });

  it("Chat User A - Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await welcomeScreenFirstUser.goToFriends();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
    await welcomeScreenSecondUser.switchToOtherUserWindow();

    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await welcomeScreenSecondUser.goToFriends();
    await friendsScreenSecondUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.switchToOtherUserWindow();
  });

  it("Chat User A - Send friend request again to User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB", USER_A_INSTANCE);
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateOutgoingListIsShown();
    await friendsScreenFirstUser.validateOutgoingListIsNotEmpty();

    await friendsScreenFirstUser.removeOrDenyFriendButton.waitForExist();

    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenSecondUser.switchToOtherUserWindow();

    // With User B - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenSecondUser.hoverOnFriendsButton();
    await friendsScreenSecondUser.goToFriends();
    await friendsScreenSecondUser.validateFriendsScreenIsShown();
    await friendsScreenSecondUser.hoverOnPendingListButton();
    await friendsScreenSecondUser.goToPendingFriendsList();
    await friendsScreenSecondUser.validateIncomingListIsShown();
    await friendsScreenSecondUser.acceptIncomingRequest("ChatUserA");
  });

  it("Chat User B - Validate that User A is now a friend", async () => {
    // Return to Friends List
    await friendsScreenSecondUser.goToAllFriendsList();
    await friendsScreenSecondUser.validateAllFriendsListIsShown();

    // Validate friend is now on all friends list
    await friendsScreenSecondUser.validateAllFriendsListIsNotEmpty();
    await friendsScreenFirstUser.switchToOtherUserWindow();
  });

  it("Chat User A - Wait until friend request is accepted again", async () => {
    // Wait until user B accepts the friend request
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();

    // Go to chat with User B
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.chatWithFriendButton.click();

    await chatsTopbarFirstUser.topbar.waitForExist();
    await friendsScreenSecondUser.switchToOtherUserWindow();
  });

  it("Chat User B - Send message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenSecondUser.chatWithFriendButton.waitForExist();
    await friendsScreenSecondUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenSecondUser.chatWithFriendButton.click();

    await chatsTopbarSecondUser.topbar.waitForExist();

    // Send message to Chat User B
    await chatsInputSecondUser.typeMessageOnInput("Accepted...");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("Accepted...");
    await chatsMessagesFirstUser.switchToOtherUserWindow();

    // With User A - Validate that message was received
    await chatsMessagesFirstUser.waitForReceivingMessage("Accepted...");
  });

  it("Chat User A - Block Friend", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Click on Block Friend from Quick Profile
    await chatsQuickProfileFirstUser.clickOnBlockUser();

    // Welcome Screen should be displayed
    await welcomeScreenFirstUser.welcomeLayout.waitForExist();
  });

  it("Chat User A - Ensure that Chat User B is in blocked list now", async () => {
    // Get current list of Blocked friends and ensure that it includes the blocked user
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.validateBlockedListIsShown();
    await friendsScreenFirstUser.validateBlockedListIsNotEmpty();

    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenFirstUser.friendsList.waitForExist();
    await chatsInputSecondUser.switchToOtherUserWindow();

    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await chatsInputSecondUser.goToFriends();
    await friendsScreenSecondUser.validateFriendsScreenIsShown();
    await friendsScreenSecondUser.waitUntilFriendIsRemoved("ChatUserA");
    await friendsScreenFirstUser.switchToOtherUserWindow();
  });
}
