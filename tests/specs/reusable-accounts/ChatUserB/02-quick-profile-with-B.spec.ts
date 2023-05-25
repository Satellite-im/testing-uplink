import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import InputBar from "../../../screenobjects/chats/InputBar";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");

export default async function quickProfileUserB() {
  it("Ensure that User A is still online before proceeding with tests", async () => {
    // Tests start in Chat Screen with User A
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();
  });

  it("Wait until User A removes User B", async () => {
    // Go to Friends and wait for User A to remove friendship with User B
    await chatsTopbarFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.waitUntilFriendIsRemoved("ChatUserA");
  });

  it("Wait until User A sends friend request again User B and accept it", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
  });

  it("Send message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Accepted...");
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Wait until User A blocks User B", async () => {
    // Go to Friends and wait for User A to remove friendship with User B
    await chatsInputFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.waitUntilFriendIsRemoved("ChatUserA");
  });
}
