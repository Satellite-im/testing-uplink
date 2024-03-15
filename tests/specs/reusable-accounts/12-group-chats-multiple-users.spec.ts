require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import {
  activateFirstApplication,
  activateThirdApplication,
  closeFirstApplication,
  closeSecondApplication,
  closeThirdApplication,
  getUserKey,
  launchFirstApplication,
  launchSecondApplication,
  launchThirdApplication,
} from "@helpers/commands";
const chatsSidebar = new ChatsSidebar();
const friendsScreen = new FriendsScreen();
const welcomeScreen = new WelcomeScreen();

export default async function groupChatMultipleUsersTests() {
  before(async () => {
    await launchFirstApplication();
    await launchSecondApplication();
    await launchThirdApplication();
  });

  it("Chat User C - Send friend request to User A", async () => {
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);

    // Obtain did key from Chat User A
    const friendDidKey = await getUserKey("ChatUserA");
    await friendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User C and go to chat button", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Go to Friends List
    await chatsSidebar.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();

    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.waitUntilFriendRequestIsReceived();
    await friendsScreen.acceptIncomingRequest("ChatUserB");

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User C
    await friendsScreen.goToChatWithFriend();
  });

  it("Chat User C - Validate friend request was accepted", async () => {
    // Switch control to User C
    await activateThirdApplication();

    // With User C - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsNotEmpty();
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
    await closeThirdApplication();
  });
}
