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
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsSidebarFirstUser = new ChatsSidebar("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let contextMenuSidebarFirstUser = new ContextMenuSidebar("userA");
let filesScreenFirstUser = new FilesScreen("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function sidebarWithUserA() {
  it("Unblock Chat User A", async () => {
    // Unblock Chat User B and go to Friends List to send a new friend request
    await friendsScreenFirstUser.removeOrCancelUser("ChatUserB");
    await friendsScreenFirstUser.goToAllFriendsList();
  });

  it("Send friend request again to Chat User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB", "userA");
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Wait until Chat User B accepts friend request and sends a message", async () => {
    // Wait until user B accepts the friend request
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

    // Go to another part of the app
    await friendsScreenFirstUser.goToMainScreen();

    // Wait until message is received
    await chatsSidebarFirstUser.waitForReceivingMessageOnSidebar(60000);
  });

  it("Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await chatsSidebarFirstUser.validateUsernameDisplayed("ChatUserB");

    // Validate last message contents
    await chatsSidebarFirstUser.validateLastMessageDisplayed("Hello...");

    // Validate number of unread messages is displayed on sidebar
    await chatsSidebarFirstUser.validateNumberOfUnreadMessages("1");

    // Validate time ago displayed on sidebar
    await chatsSidebarFirstUser.validateLastMessageTimeAgo();
  });

  it("Sidebar - Context Menu - Clear Unreads", async () => {
    await chatsSidebarFirstUser.openContextOnFirstSidebarChat();
    await contextMenuSidebarFirstUser.selectChatsClearUnreads();
    await chatsSidebarFirstUser.validateNoUnreadMessages();
  });

  it("Sidebar - Context Menu - Hide chat", async () => {
    await chatsSidebarFirstUser.openContextOnFirstSidebarChat();
    await contextMenuSidebarFirstUser.selectChatsHideChat();
    await chatsSidebarFirstUser.validateNoSidebarChatsAreDisplayed();
  });

  it("Sidebar - Send a message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Hi...");
    await chatsInputFirstUser.clickOnSendMessage();
    const latestMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Sidebar - Persists between different sections of the app", async () => {
    // Validate on Files Screen that sidebar is displayed
    await chatsLayoutFirstUser.goToFiles();
    await filesScreenFirstUser.waitForIsShown(true);
    await chatsSidebarFirstUser.sidebarChatsUser.waitForExist();

    // Validate on Friends Screen that sidebar is displayed
    await filesScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await chatsSidebarFirstUser.sidebarChatsUser.waitForExist();

    // Return to chat
    await chatsSidebarFirstUser.goToSidebarFirstChat();
  });

  it("Sidebar - Validate Hamburger button and back buttons can hide or display the sidebar", async () => {
    // Click on hamburger button and validate that Sidebar is hidden
    await chatsLayoutFirstUser.clickOnHamburgerButton();

    // Click on back button and validate that Sidebar is displayed again
    await chatsLayoutFirstUser.clickOnBackButton();
    await chatsSidebarFirstUser.waitForIsShown(true);
  });

  it("Sidebar - Context Menu - Delete chat", async () => {
    // Open context menu and right click on Delete chat
    await chatsSidebarFirstUser.openContextOnFirstSidebarChat();
    await contextMenuSidebarFirstUser.selectChatsDeleteConversation();
    await welcomeScreenFirstUser.waitForIsShown(true);
  });

  it("Chat User B - Sidebar without messages sent displays No messages yet, sent one", async () => {
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await expect(
      chatsSidebarFirstUser.sidebarChatsUserNameValue
    ).toHaveTextContaining("ChatUserB");
    await expect(
      chatsSidebarFirstUser.sidebarChatsUserStatusValue
    ).toHaveTextContaining("No messages sent yet, send one!");
  });

  after(async () => {
    await browser.pause(30000);
  });
}
