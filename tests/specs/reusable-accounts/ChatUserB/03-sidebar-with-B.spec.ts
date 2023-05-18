import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../../screenobjects/chats/ChatsSidebar";
import ContextMenu from "../../../screenobjects/chats/ContextMenu";
import ContextMenuSidebar from "../../../screenobjects/chats/ContextMenuSidebar";
import InputBar from "../../../screenobjects/chats/InputBar";
import MessageGroup from "../../../screenobjects/chats/MessageGroup";
import Messages from "../../../screenobjects/chats/Messages";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function sidebarWithUserB() {
  it("Chat User B - Wait until receiving a friend request again", async () => {
    // Open context menu and right click on Delete chat
    await ChatsSidebar.openContextMenuOnSidebar("ChatUserA");
    await ContextMenuSidebar.selectChatsDeleteConversation();

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

  it("Chat User B - Sidebar without messages sent displays No messages yet, sent one", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);

    await expect(ChatsSidebar.sidebarChatsUserNameValue).toHaveTextContaining(
      "ChatUserA"
    );
    await expect(ChatsSidebar.sidebarChatsUserStatusValue).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
  });

  it("Send message to User A", async () => {
    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("Hello again...");
    await InputBar.clickOnSendMessage();
  });

  it("Sidebar - Wait for receiving a a new message", async () => {
    // Wait until message is received
    await Messages.waitForReceivingMessage("Hi again...");
  });

  it("Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await ChatsSidebar.sidebarChatsUserInfo.waitForExist({
      reverse: true,
    });
  });
}
