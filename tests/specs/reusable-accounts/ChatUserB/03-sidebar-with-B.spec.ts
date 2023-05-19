import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../../screenobjects/chats/ChatsSidebar";
import InputBar from "../../../screenobjects/chats/InputBar";
import Messages from "../../../screenobjects/chats/Messages";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function sidebarWithUserB() {
  it("Chat User B - Wait until receiving a friend request again", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    await FriendsScreen.friendsButtonBadge.waitForDisplayed();
    await expect(FriendsScreen.friendsButtonBadgeText).toHaveTextContaining(
      "1"
    );
  });

  it("Chat User B - Accept incoming request", async () => {
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });

  it("Send message to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);

    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("Hello...");
    await InputBar.clickOnSendMessage();
  });

  it("Sidebar - Wait for receiving a a new message", async () => {
    // Wait until message is received
    await Messages.waitForReceivingMessage("Hi...", 60000);
  });

  it("Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await WelcomeScreen.welcomeImage.waitForExist({
      timeout: 30000,
    });
  });
}
