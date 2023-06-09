import { getUserKey } from "../../helpers/commands";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "../../screenobjects/chats/ContextMenuSidebar";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
import Topbar from "../../screenobjects/chats/Topbar";
import FilesScreen from "../../screenobjects/files/FilesScreen";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar("userA");
let chatsInputSecondUser = new InputBar("userB");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsLayoutSecondUser = new ChatsLayout("userB");
let chatsMessagesSecondUser = new Messages("userB");
let chatsSidebarFirstUser = new ChatsSidebar("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let chatsTopbarSecondUser = new Topbar("userB");
let contextMenuSidebarFirstUser = new ContextMenuSidebar("userA");
let filesScreenFirstUser = new FilesScreen("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let friendsScreenSecondUser = new FriendsScreen("userB");
let welcomeScreenFirstUser = new WelcomeScreen("userA");
let welcomeScreenSecondUser = new WelcomeScreen("userB");

export default async function sidebarChatsTests() {
  it("Chat User A - Unblock the other Chat User", async () => {
    // Unblock Chat User B and go to Friends List to send a new friend request
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.blockedList.waitForDisplayed();
    await friendsScreenFirstUser.removeOrCancelUser("ChatUserB");
    await friendsScreenFirstUser.removeOrDenyFriendButton.waitForExist({
      reverse: true,
    });
    await friendsScreenFirstUser.goToAllFriendsList();
  });

  it("Chat User A - Send friend request again to Chat User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB", "userA");
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();

    // Validate that friend request was sent
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.removeOrDenyFriendButton.waitForDisplayed();
    await friendsScreenFirstUser.goToAllFriendsList();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenSecondUser.goToFriends();
    await friendsScreenSecondUser.waitForIsShown(true);
    await friendsScreenSecondUser.goToPendingFriendsList();
    await friendsScreenSecondUser.incomingRequestsList.waitForDisplayed();
    await friendsScreenSecondUser.waitUntilFriendRequestIsReceived();
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    await friendsScreenSecondUser.friendsButtonBadge.waitForDisplayed();
    await expect(
      friendsScreenSecondUser.friendsButtonBadgeText
    ).toHaveTextContaining("1");
  });

  it("Chat User B - Accept incoming request", async () => {
    await friendsScreenSecondUser.acceptIncomingRequest("ChatUserA");
    await friendsScreenSecondUser.acceptFriendRequestButton.waitForExist({
      reverse: true,
    });

    // Return to Friends List
    await friendsScreenSecondUser.goToAllFriendsList();
  });

  it("Chat User B - Send message to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenSecondUser.chatWithFriendButton.waitForExist();
    await friendsScreenSecondUser.chatWithFriendButton.click();
    await chatsLayoutSecondUser.waitForIsShown(true);

    await chatsTopbarSecondUser.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await chatsInputSecondUser.typeMessageOnInput("Hello...");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("Hello...");

    // With User A - Wait until user B accepts the friend request
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();
  });

  it("Chat User A - Wait until Chat User B accepts friend request and sends a message", async () => {
    // Go to another part of the app
    await friendsScreenFirstUser.goToMainScreen();

    // Wait until message is received
    await chatsSidebarFirstUser.waitForReceivingMessageOnSidebar(60000);
  });

  it("Chat User A - Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await chatsSidebarFirstUser.validateUsernameDisplayed("ChatUserB");

    // Validate last message contents
    await chatsSidebarFirstUser.validateLastMessageDisplayed("Hello...");

    // Validate number of unread messages is displayed on sidebar
    await chatsSidebarFirstUser.validateNumberOfUnreadMessages("1");

    // Validate time ago displayed on sidebar
    await chatsSidebarFirstUser.validateLastMessageTimeAgo();
  });

  it("Chat User A - Sidebar - Context Menu - Clear Unreads", async () => {
    await chatsSidebarFirstUser.openContextOnFirstSidebarChat();
    await contextMenuSidebarFirstUser.selectChatsClearUnreads();
    await chatsSidebarFirstUser.validateNoUnreadMessages();
  });

  it("Chat User A - Sidebar - Context Menu - Hide chat", async () => {
    await chatsSidebarFirstUser.openContextOnFirstSidebarChat();
    await contextMenuSidebarFirstUser.selectChatsHideChat();
    await chatsSidebarFirstUser.validateNoSidebarChatsAreDisplayed();
  });

  it("Chat User A - Sidebar - Send a message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Hi...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("Hi...");
  });

  it("Chat User A - Sidebar - Persists between different sections of the app", async () => {
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

  it("Chat User A - Sidebar - Validate Hamburger button and back buttons can hide or display the sidebar", async () => {
    // Click on hamburger button and validate that Sidebar is hidden
    await chatsLayoutFirstUser.clickOnHamburgerButton();

    // Click on back button and validate that Sidebar is displayed again
    await chatsLayoutFirstUser.clickOnBackButton();
    await chatsSidebarFirstUser.waitForIsShown(true);

    // With User B - Wait until message is received
    await chatsMessagesSecondUser.waitForReceivingMessage("Hi...", 180000);
  });

  it("Chat User B - Sidebar - Wait for receiving a a new message", async () => {
    const latestMessage =
      await chatsMessagesSecondUser.getLastMessageReceivedText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Chat User A - Sidebar - Context Menu - Delete chat", async () => {
    // Open context menu and right click on Delete chat
    await chatsSidebarFirstUser.openContextOnFirstSidebarChat();
    await contextMenuSidebarFirstUser.selectChatsDeleteConversation();
    await welcomeScreenFirstUser.waitForIsShown(true);
  });

  it("Chat User B - Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await welcomeScreenSecondUser.waitForIsShown(true);
  });

  it("Chat User A - Sidebar without messages sent displays No messages yet, sent one", async () => {
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
}
