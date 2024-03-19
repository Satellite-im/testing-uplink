require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import {
  activateFirstApplication,
  activateThirdApplication,
  closeFirstApplication,
  closeThirdApplication,
  getUserKey,
  launchFirstApplication,
  launchThirdApplication,
} from "@helpers/commands";

export default async function groupChatMultipleUsersTests() {
  before(async () => {
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
    await launchThirdApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User C - Send friend request to User A", async () => {
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Obtain did key from Chat User A
    const friendDidKey = await getUserKey("ChatUserA");
    await FriendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User C and go to chat button", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Go to Friends List
    await ChatsSidebar.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.hoverOnPendingListButton();
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserC");

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User C
    await FriendsScreen.goToChatWithFriend();
  });

  it("Chat User C - Validate friend request was accepted", async () => {
    // Switch control to User C
    await activateThirdApplication();

    // With User C - Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
  });

  after(async () => {
    await closeFirstApplication();
    await closeThirdApplication();
  });
}
