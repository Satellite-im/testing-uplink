import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import InputBar from "../../../screenobjects/chats/InputBar";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";

export default async function quickProfileUserB() {
  it("Ensure that User A is still online before proceeding with tests", async () => {
    // Tests start in Chat Screen with User A
    await Topbar.waitUntilRemoteUserIsOnline();
  });

  it("Wait until User A removes User B", async () => {
    // Go to Friends and wait for User A to remove friendship with User B
    await Topbar.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.waitUntilFriendIsRemoved("ChatUserA");
  });

  it("Wait until User A sends friend request again User B and accept it", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });

  it("Send message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("accepted...");
    await InputBar.clickOnSendMessage();
  });

  it("Wait until User A blocks User B", async () => {
    // Go to Friends and wait for User A to remove friendship with User B
    await InputBar.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.waitUntilFriendIsRemoved("ChatUserA");
  });

  it("Wait until User A sends friend request again User B and accept it", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });
}
