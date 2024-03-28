require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  grabCacheFolder,
  resetAndLoginWithCacheFirstApp,
  resetAndLoginWithCacheSecondApp,
} from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "@screenobjects/chats/ContextMenuSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import Topbar from "@screenobjects/chats/Topbar";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";

describe("MacOS Chats - Sidebar Chats Tests", function () {
  this.retries(2);

  before(async () => {
    await resetAndLoginWithCacheFirstApp("ChatUserA");
    await CreatePinScreen.loginWithTestUser();
    await resetAndLoginWithCacheSecondApp("ChatUserB");
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User B - Send message with markdown to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.validateChatWithFriendButtonIsShown();
    await FriendsScreen.hoverOnChatWithFriendButton("ChatUserA");
    await FriendsScreen.clickOnChatWithFriend();
    await ChatsLayout.validateChatLayoutIsShown();

    // Send message with markdown to Chat User B
    await InputBar.typeMessageOnInput("__hello__");
    await InputBar.clickOnSendMessage();

    // Message is formatted with markdown on chat conversation
    await MessageLocal.waitForMessageSentToExist("__hello__");

    // Validate last message on Sidebar is not formatted with markdown
    await ChatsSidebar.validateLastMessageDisplayed("__hello__", "ChatUserA");
  });

  it("Chat User A - Wait until Chat User B accepts friend request and sends a message", async () => {
    // With User A - Wait until user B accepts the friend request
    await activateFirstApplication();
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.validateAllFriendsListIsShown();
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Go to another part of the app
    await FriendsScreen.goToMainScreen();

    // Wait until message is received
    await ChatsSidebar.waitForReceivingMessageOnSidebar();
  });

  it("Chat User A - Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await ChatsSidebar.validateUsernameIsDisplayed("ChatUserB");

    // Validate number of unread messages is displayed on sidebar
    await ChatsSidebar.validateNumberOfUnreadMessages("1", "ChatUserB");

    // Validate time ago displayed on sidebar
    await ChatsSidebar.validateLastMessageTimeAgo("ChatUserB");
  });

  it("Sidebar - Message preview on Sidebar should not display the message with markdown", async () => {
    // Validate last message contents on Sidebar displays hello __hello__ without applying the markdown
    await ChatsSidebar.validateLastMessageDisplayed("__hello__", "ChatUserB");
  });

  it("Chat User A - Sidebar - Context Menu - Clear Unreads", async () => {
    // Open context menu and right click on Clear Unreads
    await ChatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await ContextMenuSidebar.selectChatsClearUnreads();
    await ChatsSidebar.validateNoUnreadMessages("ChatUserB");
  });

  it("Chat User A - Sidebar - Context Menu - Hide chat", async () => {
    // Open context menu and right click on Hide chat
    await ChatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await ContextMenuSidebar.selectChatsHideChat();
    await ChatsSidebar.validateSidebarChatIsNotDisplayed("ChatUserB");
  });

  it("Chat User A - Sidebar - Send a message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await WelcomeScreen.goToFriends();
    await FriendsScreen.validateChatWithFriendButtonIsShown();
    await FriendsScreen.hoverOnChatWithFriendButton("ChatUserB");
    await FriendsScreen.clickOnChatWithFriend();
    await ChatsLayout.validateChatLayoutIsShown();

    // Send message to Chat User B
    await InputBar.typeMessageOnInput("Hi...");
    await InputBar.clickOnSendMessage();
  });

  it("Chat User B - Validate message was received", async () => {
    // With User B - Wait until message is received
    await activateSecondApplication();
    await ChatsSidebar.waitForIsShown(true);
    await MessageRemote.waitForReceivingMessage("Hi...");
  });

  it("Chat User A - Sidebar - Persists between different sections of the app - Files Screen", async () => {
    // Validate on Files Screen that sidebar is displayed
    await activateFirstApplication();
    await ChatsLayout.waitForIsShown(true);
    await ChatsLayout.goToFiles();
    await FilesScreen.validateFilesScreenIsShown();
    await ChatsSidebar.validateSidebarChatsIsShown();
  });

  it("Chat User A - Chats Sidebar is hidden when entering to Settings Screen", async () => {
    // Go to Settings Profile Screen
    await FilesScreen.goToSettings();
    await SettingsProfileScreen.validateSettingsProfileIsShown();

    // Validate that Chats Sidebar is not displayed on Settings Screen
    await ChatsSidebar.sidebarChatsSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Chats Sidebar is displayed again when opening Friends Screen", async () => {
    // Validate on Friends Screen that sidebar is displayed
    await SettingsProfileScreen.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
    await ChatsSidebar.validateSidebarChatsIsShown();

    // Return to chat
    await ChatsSidebar.goToSidebarFirstChat();
  });

  it("Chat User A - Sidebar - Validate Hamburger button and back buttons can hide or display the sidebar", async () => {
    // Click on hamburger button and validate that Sidebar is hidden
    await ChatsLayout.clickOnHamburgerButton();

    // Click on back button and validate that Sidebar is displayed again
    await ChatsLayout.clickOnBackButton();
    await ChatsSidebar.validateSidebarChatsIsShown();
  });

  it("Chat User B - Sidebar - Wait for receiving a a new message", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    await InputBar.waitForIsShown(true);

    // With User B - Wait until message is received
    await MessageRemote.waitForReceivingMessage("Hi...");
    const latestMessage = await MessageRemote.getCustomMessageContents("Hi...");
    await expect(latestMessage).toHaveText("Hi...");
  });

  it("Chat User A - Sidebar - Context Menu - Delete chat", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();
    await ChatsSidebar.waitForIsShown(true);

    // Open context menu and right click on Delete chat
    await ChatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await ContextMenuSidebar.selectChatsDeleteConversation();
    await WelcomeScreen.validateWelcomeScreenIsShown(30000);
  });

  it("Chat User B - Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await WelcomeScreen.waitForIsShown(true);
  });

  it("Chat User A - Sidebar without messages sent displays No messages yet, sent one", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();
    await WelcomeScreen.waitForIsShown(true);

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await WelcomeScreen.goToFriends();
    await FriendsScreen.validateChatWithFriendButtonIsShown();
    await FriendsScreen.hoverOnChatWithFriendButton("ChatUserB");
    await FriendsScreen.clickOnChatWithFriend();
    await ChatsLayout.validateChatLayoutIsShown();

    // Validate that sidebar record is displayed with correct username and status
    const sidebarChatUsername = await ChatsSidebar.sidebarChatsUserNameValue;
    await expect(sidebarChatUsername).toHaveText("ChatUserB");

    const sidebarChatStatus = await ChatsSidebar.sidebarChatsUserStatusValue;
    await expect(sidebarChatStatus).toHaveText(
      "No messages sent yet, send one!",
    );
  });

  it("Sidebar - Favorites - Add user to Favorites", async () => {
    // Add user to favorites
    await Topbar.addToFavorites();
    await FavoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await FavoritesSidebar.validateFavoritesUserImage("ChatUserB");
  });

  it("Sidebar - Favorites - Context Menu - Chat with user", async () => {
    // Open context menu and right click on Chat with user
    await FavoritesSidebar.goToFiles();
    await FilesScreen.validateFilesScreenIsShown();
    await FavoritesSidebar.openContextMenuOnFavoritesUser("ChatUserB");
    await FavoritesSidebar.clickOnContextMenuFavoritesChat();
    await ChatsLayout.validateChatLayoutIsShown();
    await InputBar.typeMessageOnInput("Hi...");
    await InputBar.clearInputBar();
  });

  it("Sidebar - Favorites - Context Menu - Remove user from Favorites", async () => {
    // Open context menu and right click on Remove user from Favorites
    await FavoritesSidebar.openContextMenuOnFavoritesUser("ChatUserB");
    await FavoritesSidebar.clickOnContextMenuFavoriteRemove();
  });

  after(async () => {
    await grabCacheFolder("ChatUserA");
    await grabCacheFolder("ChatUserB", "/.uplinkUserB");
  });
});
