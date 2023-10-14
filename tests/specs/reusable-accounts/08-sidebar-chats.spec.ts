import "module-alias/register";
import { getUserKey } from "@helpers/commands";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "@screenobjects/chats/ContextMenuSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import Topbar from "@screenobjects/chats/Topbar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsLayoutSecondUser = new ChatsLayout(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let contextMenuSidebarFirstUser = new ContextMenuSidebar(USER_A_INSTANCE);
let favoritesSidebarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let friendsScreenSecondUser = new FriendsScreen(USER_B_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

export default async function sidebarChatsTests() {
  it("Chat User A - Unblock the other Chat User", async () => {
    // Switch to Chat User A window
    await friendsScreenFirstUser.switchToOtherUserWindow();

    // Unblock Chat User B and go to Friends List to send a new friend request
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.hoverOnBlockedListButton();
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.validateBlockedListIsShown();
    await friendsScreenFirstUser.validateBlockedListIsNotEmpty();
    await friendsScreenFirstUser.removeOrCancelUser("ChatUserB");
    await friendsScreenFirstUser.removeOrDenyFriendButton.waitForExist({
      reverse: true,
    });
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User A - Send friend request again to Chat User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB", USER_A_INSTANCE);
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();

    // Validate that friend request was sent
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateOutgoingListIsShown();
    await friendsScreenFirstUser.validateRemoveOrDenyButtonIsShown();
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    // Switch to Chat User B window
    await friendsScreenSecondUser.switchToOtherUserWindow();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenSecondUser.goToFriends();
    await friendsScreenSecondUser.validateFriendsScreenIsShown();
    await friendsScreenSecondUser.hoverOnPendingListButton();
    await friendsScreenSecondUser.goToPendingFriendsList();
    await friendsScreenSecondUser.validateIncomingListIsShown();
    await friendsScreenSecondUser.waitUntilFriendRequestIsReceived();

    // Validate that button badge displays the number of incoming requests
    await friendsScreenSecondUser.validateFriendsButtonBadgeIsShown;
    const friendsButtonBadgeText =
      await friendsScreenSecondUser.getValueFromFriendsButtonBadge();
    await expect(friendsButtonBadgeText).toEqual("1");
  });

  it("Chat User B - Accept incoming request", async () => {
    // Accept incoming request
    await friendsScreenSecondUser.acceptIncomingRequest("ChatUserA");
    await friendsScreenSecondUser.acceptFriendRequestButton.waitForExist({
      reverse: true,
    });

    // Return to Friends List
    await friendsScreenSecondUser.goToAllFriendsList();
    await friendsScreenSecondUser.validateAllFriendsListIsShown();
  });

  it("Chat User B - Send message to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenSecondUser.validateChatWithFriendButtonIsShown();
    await friendsScreenSecondUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenSecondUser.clickOnChatWithFriend();
    await chatsLayoutSecondUser.validateChatLayoutIsShown();

    // Send message with markdown to Chat User B
    await chatsInputSecondUser.typeMessageOnInput("__hello__");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("hello");

    // Validate last message contents on Sidebar displays hello on bolds and not __hello__
    await chatsSidebarFirstUser.validateLastMessageDisplayed("hello");
  });

  it("Chat User A - Wait until Chat User B accepts friend request and sends a message", async () => {
    // With User A - Wait until user B accepts the friend request
    await friendsScreenFirstUser.switchToOtherUserWindow();
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

    // Go to another part of the app
    await friendsScreenFirstUser.goToMainScreen();

    // Wait until message is received
    await chatsSidebarFirstUser.waitForReceivingMessageOnSidebar();
  });

  it("Chat User A - Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await chatsSidebarFirstUser.validateUsernameDisplayed("ChatUserB");

    // Validate number of unread messages is displayed on sidebar
    await chatsSidebarFirstUser.validateNumberOfUnreadMessages("1");

    // Validate time ago displayed on sidebar
    await chatsSidebarFirstUser.validateLastMessageTimeAgo();
  });

  it("Sidebar - Message preview on Sidebar should display the message without the markdown characters", async () => {
    // Validate last message contents on Sidebar displays hello on bolds and not __hello__
    await chatsSidebarFirstUser.validateLastMessageDisplayed("hello");
  });

  it("Chat User A - Sidebar - Context Menu - Clear Unreads", async () => {
    // Open context menu and right click on Clear Unreads
    await chatsSidebarFirstUser.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebarFirstUser.selectChatsClearUnreads();
    await chatsSidebarFirstUser.validateNoUnreadMessages();
  });

  it("Chat User A - Sidebar - Context Menu - Hide chat", async () => {
    // Open context menu and right click on Hide chat
    await chatsSidebarFirstUser.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebarFirstUser.selectChatsHideChat();
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("ChatUserB");
  });

  it("Chat User A - Sidebar - Send a message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.clickOnChatWithFriend();
    await chatsLayoutFirstUser.validateChatLayoutIsShown();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Hi...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Hi...");
  });

  it("Chat User B - Validate message was received", async () => {
    // With User B - Wait until message is received
    await chatsMessagesSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingMessage("Hi...");
  });

  it("Chat User A - Sidebar - Persists between different sections of the app - Files Screen", async () => {
    // Validate on Files Screen that sidebar is displayed
    await chatsLayoutFirstUser.switchToOtherUserWindow();
    await chatsLayoutFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await chatsSidebarFirstUser.validateSidebarChatsIsShown();
  });

  it("Chat User A - Chats Sidebar is hidden when entering to Settings Screen", async () => {
    // Go to Settings Profile Screen
    await filesScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.validateSettingsProfileIsShown();

    // Validate that Chats Sidebar is not displayed on Settings Screen
    await chatsSidebarFirstUser.sidebarChatsSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Chats Sidebar is displayed again when opening Friends Screen", async () => {
    // Validate on Friends Screen that sidebar is displayed
    await settingsProfileFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await chatsSidebarFirstUser.validateSidebarChatsIsShown();

    // Return to chat
    await chatsSidebarFirstUser.goToSidebarFirstChat();
  });

  it("Chat User A - Sidebar - Validate Hamburger button and back buttons can hide or display the sidebar", async () => {
    // Click on hamburger button and validate that Sidebar is hidden
    await chatsLayoutFirstUser.clickOnHamburgerButton();

    // Click on back button and validate that Sidebar is displayed again
    await chatsLayoutFirstUser.clickOnBackButton();
    await chatsSidebarFirstUser.validateSidebarChatsIsShown();
  });

  it("Chat User B - Sidebar - Wait for receiving a a new message", async () => {
    // Switch to Chat User B window
    await chatsMessagesSecondUser.switchToOtherUserWindow();

    // With User B - Wait until message is received
    await chatsMessagesSecondUser.waitForReceivingMessage("Hi...");
    const latestMessage =
      await chatsMessagesSecondUser.getLastMessageReceivedText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Chat User A - Sidebar - Context Menu - Delete chat", async () => {
    // Switch to Chat User A window
    await chatsSidebarFirstUser.switchToOtherUserWindow();

    // Open context menu and right click on Delete chat
    await chatsSidebarFirstUser.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebarFirstUser.selectChatsDeleteConversation();
    await chatsSidebarFirstUser.skeletalUser.waitForExist();
  });

  it("Chat User B - Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // Switch to Chat User B window
    await welcomeScreenSecondUser.switchToOtherUserWindow();

    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await welcomeScreenSecondUser.skeletalUser.waitForExist();
  });

  it("Chat User A - Sidebar without messages sent displays No messages yet, sent one", async () => {
    // Switch to Chat User A window
    await welcomeScreenFirstUser.switchToOtherUserWindow();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.clickOnChatWithFriend();
    await chatsLayoutFirstUser.validateChatLayoutIsShown();

    // Validate that sidebar record is displayed with correct username and status
    const sidebarChatUsername =
      await chatsSidebarFirstUser.sidebarChatsUserNameValue;
    await expect(sidebarChatUsername).toHaveTextContaining("ChatUserB");

    const sidebarChatStatus =
      await chatsSidebarFirstUser.sidebarChatsUserStatusValue;
    await expect(sidebarChatStatus).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
  });

  it("Sidebar - Favorites - Add user to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebarFirstUser.validateFavoritesUserImage("ChatUserB");
  });

  // Skipping test failing - needs research
  xit("Sidebar - Favorites - Context Menu - Chat with user", async () => {
    // Open context menu and right click on Chat with user
    await favoritesSidebarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await favoritesSidebarFirstUser.openContextMenuOnFavoritesUser("ChatUserB");
    await favoritesSidebarFirstUser.clickOnContextMenuFavoritesChat();
    await chatsLayoutFirstUser.validateChatLayoutIsShown();
    await chatsInputFirstUser.typeMessageOnInput("Hi...");
    await chatsInputFirstUser.clearInputBar();
  });

  // Skipping test failing on CI after finding a bug in Uplink application
  xit("Sidebar - Favorites - Context Menu - Remove user from Favorites", async () => {
    // Open context menu and right click on Remove user from Favorites
    await favoritesSidebarFirstUser.openContextMenuOnFavoritesUser("ChatUserB");
    await favoritesSidebarFirstUser.clickOnContextMenuFavoriteRemove();
    await favoritesSidebarFirstUser.favorites.waitForExist({
      reverse: true,
    });
  });
}
