import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import InputBar from "../../../screenobjects/chats/InputBar";
import Messages from "../../../screenobjects/chats/Messages";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");

export default async function sidebarWithUserB() {
  it("Chat User B - Wait until receiving a friend request again", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    await friendsScreenFirstUser.friendsButtonBadge.waitForDisplayed();
    await expect(
      friendsScreenFirstUser.friendsButtonBadgeText
    ).toHaveTextContaining("1");
  });

  it("Chat User B - Accept incoming request", async () => {
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
  });

  it("Send message to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);

    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Hello...");
    await chatsInputFirstUser.clickOnSendMessage();

    const latestMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(latestMessage).toHaveTextContaining("Hello...");
  });

  it("Sidebar - Wait for receiving a a new message", async () => {
    // Wait until message is received
    await chatsMessagesFirstUser.waitForReceivingMessage("Hi...", 180000);

    const latestMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await chatsMessagesFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  after(async () => {
    await browser.pause(30000);
  });
}
