import { getUserKey } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../../screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "../../../screenobjects/chats/ContextMenuSidebar";
import InputBar from "../../../screenobjects/chats/InputBar";
import Messages from "../../../screenobjects/chats/Messages";
import Topbar from "../../../screenobjects/chats/Topbar";
import FilesScreen from "../../../screenobjects/files/FilesScreen";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function sidebarWithUserA() {
  it("Unblock Chat User A", async () => {
    // Unblock Chat User B and go to Friends List to send a new friend request
    await FriendsScreen.removeOrCancelUser("ChatUserB");
    await FriendsScreen.goToAllFriendsList();
  });

  it("Send friend request again to Chat User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Wait until Chat User B accepts friend request and sends a message", async () => {
    // Wait until user B accepts the friend request
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Go to another part of the app
    await FriendsScreen.goToMainScreen();

    // Wait until message is received
    await ChatsSidebar.waitForReceivingMessageOnSidebar(60000);
  });

  it("Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await ChatsSidebar.validateUsernameDisplayed("ChatUserB");

    // Validate last message contents
    await ChatsSidebar.validateLastMessageDisplayed("Hello...");

    // Validate number of unread messages is displayed on sidebar
    await ChatsSidebar.validateNumberOfUnreadMessages("1");

    // Validate time ago displayed on sidebar
    await ChatsSidebar.validateLastMessageTimeAgo();
  });

  it("Sidebar - Context Menu - Clear Unreads", async () => {
    await ChatsSidebar.openContextOnFirstSidebarChat();
    await ContextMenuSidebar.selectChatsClearUnreads();
    await ChatsSidebar.validateNoUnreadMessages();
  });

  it("Sidebar - Context Menu - Hide chat", async () => {
    await ChatsSidebar.openContextOnFirstSidebarChat();
    await ContextMenuSidebar.selectChatsHideChat();
    await ChatsSidebar.validateNoSidebarChatsAreDisplayed();
  });

  it("Sidebar - Send a message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await WelcomeScreen.goToFriends();
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("Hi...");
    await InputBar.clickOnSendMessage();
    const latestMessage = await Messages.getLastMessageSentText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Sidebar - Persists between different sections of the app", async () => {
    // Validate on Files Screen that sidebar is displayed
    await ChatsLayout.goToFiles();
    await FilesScreen.waitForIsShown(true);
    await ChatsSidebar.sidebarChatsUser.waitForExist();

    // Validate on Friends Screen that sidebar is displayed
    await FilesScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await ChatsSidebar.sidebarChatsUser.waitForExist();

    // Return to chat
    await ChatsSidebar.goToSidebarFirstChat();
  });

  it("Sidebar - Validate Hamburger button and back buttons can hide or display the sidebar", async () => {
    // Click on hamburger button and validate that Sidebar is hidden
    await ChatsLayout.clickOnHamburgerButton();

    // Click on back button and validate that Sidebar is displayed again
    await ChatsLayout.clickOnBackButton();
    await ChatsSidebar.waitForIsShown(true);
  });

  it("Sidebar - Context Menu - Delete chat", async () => {
    // Open context menu and right click on Delete chat
    await ChatsSidebar.openContextOnFirstSidebarChat();
    await ContextMenuSidebar.selectChatsDeleteConversation();
    await WelcomeScreen.waitForIsShown(true);
  });

  it("Chat User B - Sidebar without messages sent displays No messages yet, sent one", async () => {
    await WelcomeScreen.goToFriends();
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await expect(ChatsSidebar.sidebarChatsUserNameValue).toHaveTextContaining(
      "ChatUserB"
    );
    await expect(ChatsSidebar.sidebarChatsUserStatusValue).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
  });

  after(async () => {
    await browser.pause(30000);
  });
}
