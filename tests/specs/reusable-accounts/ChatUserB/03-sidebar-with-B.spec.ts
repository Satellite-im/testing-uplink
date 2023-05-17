import { loginWithTestUser } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../../screenobjects/chats/ChatsSidebar";
import InputBar from "../../../screenobjects/chats/InputBar";
import Topbar from "../../../screenobjects/chats/Topbar";
import FilesScreen from "../../../screenobjects/files/FilesScreen";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function sidebarWithUserB() {
  it("Chat User B - Wait until receiving a friend request again", async () => {
    // Temp functions
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

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
    await expect(ChatsSidebar.sidebarChatsUserNameValue).toHaveTextContaining(
      "ChatUserA"
    );
    await expect(ChatsSidebar.sidebarChatsUserStatusValue).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
  });

  it("Send message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("Hello again...");
    await InputBar.clickOnSendMessage();
  });

  it("Sidebar - Persists between different sections of the app", async () => {
    // Validate on Files Screen that sidebar is displayed
    await ChatsLayout.goToFiles();
    await FilesScreen.waitForIsShown(true);
    await ChatsSidebar.waitForIsShown(true);

    // Validate on Friends Screen that sidebar is displayed
    await FilesScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await ChatsSidebar.waitForIsShown(true);

    // Return to chat
    await ChatsSidebar.goToSidebarChat("ChatUserA");
  });

  it("Send another message to User B", async () => {
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("New message...");
    await InputBar.clickOnSendMessage();
  });

  after(async () => {
    await browser.pause(60000);
  });
}
