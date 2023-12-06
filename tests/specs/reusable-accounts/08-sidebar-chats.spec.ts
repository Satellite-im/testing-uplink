require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  getUserKey,
} from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
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
const chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
const chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
const chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
const chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
const chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
const contextMenuSidebarFirstUser = new ContextMenuSidebar(USER_A_INSTANCE);
const favoritesSidebarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
const filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
const friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
const settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
const welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function sidebarChatsTests() {
  it("Chat User A - Unblock the other Chat User", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();

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

    // Send Friend Request to Chat User B
    await friendsScreenFirstUser.sendFriendRequestWithRetry(
      friendDidKey,
      "ChatUserB",
    );
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();

    // Validate that button badge displays the number of incoming requests
    await friendsScreenFirstUser.validateFriendsButtonBadgeIsShown;
    const friendsButtonBadgeText =
      await friendsScreenFirstUser.getValueFromFriendsButtonBadge();
    await expect(friendsButtonBadgeText).toEqual("1");
  });

  it("Chat User B - Accept incoming request", async () => {
    // Accept incoming request
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");
    await friendsScreenFirstUser.acceptFriendRequestButton.waitForExist({
      reverse: true,
    });

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User B - Send message with markdown to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenFirstUser.clickOnChatWithFriend();
    await chatsLayoutFirstUser.validateChatLayoutIsShown();

    // Send message with markdown to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("__hello__");
    await chatsInputFirstUser.clickOnSendMessage();

    // Message is formatted with markdown on chat conversation
    await chatsMessagesFirstUser.waitForMessageSentToExist("hello");

    // Validate last message on Sidebar is not formatted with markdown
    await chatsSidebarFirstUser.validateLastMessageDisplayed("__hello__");
  });

  it("Chat User A - Wait until Chat User B accepts friend request and sends a message", async () => {
    // With User A - Wait until user B accepts the friend request
    await activateFirstApplication();
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

  it("Sidebar - Message preview on Sidebar should not display the message with markdown", async () => {
    // Validate last message contents on Sidebar displays hello __hello__ without applying the markdown
    await chatsSidebarFirstUser.validateLastMessageDisplayed("__hello__");
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
  });

  it("Chat User B - Validate message was received", async () => {
    // With User B - Wait until message is received
    await activateSecondApplication();
    await chatsMessagesFirstUser.waitForReceivingMessage("Hi...");
  });

  it("Chat User A - Sidebar - Persists between different sections of the app - Files Screen", async () => {
    // Validate on Files Screen that sidebar is displayed
    await activateFirstApplication();
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
    await activateSecondApplication();

    // With User B - Wait until message is received
    await chatsMessagesFirstUser.waitForReceivingMessage("Hi...");
    const latestMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Chat User A - Sidebar - Context Menu - Delete chat", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();

    // Open context menu and right click on Delete chat
    await chatsSidebarFirstUser.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebarFirstUser.selectChatsDeleteConversation();
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
  });

  it("Chat User B - Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();

    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
  });

  it("Chat User A - Sidebar without messages sent displays No messages yet, sent one", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();

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
      "No messages sent yet, send one!",
    );
  });

  it("Sidebar - Favorites - Add user to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebarFirstUser.validateFavoritesUserImage("ChatUserB");
  });

  it("Sidebar - Favorites - Context Menu - Chat with user", async () => {
    // Open context menu and right click on Chat with user
    await favoritesSidebarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await favoritesSidebarFirstUser.openContextMenuOnFavoritesUser("ChatUserB");
    await favoritesSidebarFirstUser.clickOnContextMenuFavoritesChat();
    await chatsLayoutFirstUser.validateChatLayoutIsShown();
    await chatsInputFirstUser.typeMessageOnInput("Hi...");
    await chatsInputFirstUser.clearInputBar();
  });

  it("Sidebar - Favorites - Context Menu - Remove user from Favorites", async () => {
    // Open context menu and right click on Remove user from Favorites
    await favoritesSidebarFirstUser.openContextMenuOnFavoritesUser("ChatUserB");
    await favoritesSidebarFirstUser.clickOnContextMenuFavoriteRemove();
  });
}
