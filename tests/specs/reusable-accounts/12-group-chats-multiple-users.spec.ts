require("module-alias/register");
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import {
  activateFirstApplication,
  activateThirdApplication,
  closeFirstApplication,
  closeThirdApplication,
  getUserKey,
  launchFirstApplication,
  launchThirdApplication,
} from "@helpers/commands";
const friendsScreen = new FriendsScreen();

export default async function groupChatMultipleUsersTests() {
  before(async () => {
    await launchFirstApplication();
    await launchThirdApplication();
  });

  it("Chat User C - Send friend request to User A", async () => {
    await friendsScreen.waitForIsShown(true);

    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA");
    await friendsScreen.sendFriendRequest(friendDidKey, "ChatUserA");

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User A - Accept friend request from User C and go to chat button", async () => {
    // Switch control to User A
    await activateFirstApplication();

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
    await closeThirdApplication();
  });
}
