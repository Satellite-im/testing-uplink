require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  getUserKey,
} from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Messages from "@screenobjects/chats/Messages";
import QuickProfile from "@screenobjects/chats/QuickProfile";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import chats from "@specs/02-chats.spec";

const chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
const chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
const chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
const chatsQuickProfileFirstUser = new QuickProfile(USER_A_INSTANCE);
const chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
const friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
const settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
const welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

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
    // Click on Edit Profile from Quick Profile
    await chatsQuickProfileFirstUser.clickOnEditProfile();
    await settingsProfileFirstUser.validateSettingsProfileIsShown();
    await settingsProfileFirstUser.goToMainScreen();
  });

  it("Chat User B - Validate contents from remote quick profile", async () => {
    // With User B - Validate that message was received
    await activateSecondApplication();
    await chatsInputFirstUser.waitForIsShown(true);
    await chatsInputFirstUser.clickOnInputBar();

    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();

    // Validate quick profile is displayed
    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Validate contents from quick profile
    await chatsQuickProfileFirstUser.quickProfileUserImage.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileBannerImage.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileRemoveFriend.waitForExist();
    await chatsQuickProfileFirstUser.quickProfileBlockUser.waitForExist();

    // Validate username from quick profile
    const quickProfileUsername =
      await chatsQuickProfileFirstUser.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserA");

    // Click outside to close quick profile
    await chatsInputFirstUser.clickOnInputBar();
  });

  it("Chat User A - Remove Friend", async () => {
    // Open quick profile from remote user
    await activateFirstApplication();
    await chatsInputFirstUser.waitForIsShown(true);
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Click on Remove Friend from Quick Profile
    await chatsQuickProfileFirstUser.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
  });

  it("Chat User A - Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await welcomeScreenFirstUser.goToFriends();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
  });

  it("Chat User B - Validate friendship was removed", async () => {
    // Switch control to User B
    await activateSecondApplication();
    await welcomeScreenFirstUser.waitForIsShown(true);

    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Chat User A - Send friend request again to User B", async () => {
    // Obtain did key from Chat User B
    await activateFirstApplication();
    await friendsScreenFirstUser.waitForIsShown(true);
    const friendDidKey = await getUserKey("ChatUserB", USER_A_INSTANCE);

    // Send friend request to Chat User B
    await friendsScreenFirstUser.sendFriendRequest(friendDidKey, "ChatUserB");

    // Go to All Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User B - Validate that User A is now a friend", async () => {
    // Switch control to User B
    await activateSecondApplication();
    await friendsScreenFirstUser.waitForIsShown(true);

    // With User B - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.hoverOnFriendsButton();
    await friendsScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User A - Wait until friend request is accepted again", async () => {
    // Validate friend is now on all friends list
    await activateFirstApplication();
    await friendsScreenFirstUser.waitForIsShown(true);

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

    // Go to chat with User B
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.clickOnChatWithFriend();

    // Validate that Topbar is displayed
    await chatsTopbarFirstUser.validateTopbarExists();
  });

  it("Chat User B - Send message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await activateSecondApplication();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenFirstUser.clickOnChatWithFriend();

    // Validate that Topbar is displayed
    await chatsTopbarFirstUser.validateTopbarExists();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Accepted...");
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Chat User A - Block Friend", async () => {
    // Switch control to User A
    await activateFirstApplication();
    await chatsInputFirstUser.waitForIsShown(true);

    // With User A - Validate that message was received
    await chatsMessagesFirstUser.waitForReceivingMessage("Accepted...");

    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.quickProfile.waitForExist();

    // Click on Block Friend from Quick Profile
    await chatsQuickProfileFirstUser.clickOnBlockUser();

    // Welcome Screen should be displayed
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
  });

  it("Chat User A - Ensure that Chat User B is in blocked list now", async () => {
    // Get current list of Blocked friends and ensure that it includes the blocked user
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.validateBlockedListIsShown();
    await friendsScreenFirstUser.validateBlockedListIsNotEmpty();

    // Validate that blocked user is on blocked list
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User B - Validate that User A blocked User B", async () => {
    // Switch control to User B
    await activateSecondApplication();
    await chatsInputFirstUser.waitForIsShown(true);

    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await chatsInputFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.waitUntilFriendIsRemoved("ChatUserA");
  });
}
