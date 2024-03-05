require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  launchFirstApplication,
  launchSecondApplication,
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
const chatsInput = new InputBar();
const chatsLayout = new ChatsLayout();
const chatsSidebar = new ChatsSidebar();
const chatsTopbar = new Topbar();
const contextMenuSidebar = new ContextMenuSidebar();
const favoritesSidebar = new FavoritesSidebar();
const filesScreen = new FilesScreen();
const friendsScreen = new FriendsScreen();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();

export default async function sidebarChatsTests() {
  before(async () => {
    await launchFirstApplication();
    await launchSecondApplication();
  });

  it("Chat User B - Send message with markdown to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);
    await friendsScreen.validateChatWithFriendButtonIsShown();
    await friendsScreen.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreen.clickOnChatWithFriend();
    await chatsLayout.validateChatLayoutIsShown();

    // Send message with markdown to Chat User B
    await chatsInput.typeMessageOnInput("__hello__");
    await chatsInput.clickOnSendMessage();

    // Message is formatted with markdown on chat conversation
    await messageLocal.waitForMessageSentToExist("__hello__");

    // Validate last message on Sidebar is not formatted with markdown
    await chatsSidebar.validateLastMessageDisplayed("__hello__");
  });

  it("Chat User A - Wait until Chat User B accepts friend request and sends a message", async () => {
    // With User A - Wait until user B accepts the friend request
    await activateFirstApplication();
    await welcomeScreen.goToFriends();
    await friendsScreen.waitForIsShown(true);
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.validateAllFriendsListIsShown();
    await friendsScreen.waitUntilUserAcceptedFriendRequest();

    // Go to another part of the app
    await friendsScreen.goToMainScreen();

    // Wait until message is received
    await chatsSidebar.waitForReceivingMessageOnSidebar();
  });

  it("Chat User A - Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await chatsSidebar.validateUsernameDisplayed("ChatUserB");

    // Validate number of unread messages is displayed on sidebar
    await chatsSidebar.validateNumberOfUnreadMessages("1");

    // Validate time ago displayed on sidebar
    await chatsSidebar.validateLastMessageTimeAgo();
  });

  it("Sidebar - Message preview on Sidebar should not display the message with markdown", async () => {
    // Validate last message contents on Sidebar displays hello __hello__ without applying the markdown
    await chatsSidebar.validateLastMessageDisplayed("__hello__");
  });

  it("Chat User A - Sidebar - Context Menu - Clear Unreads", async () => {
    // Open context menu and right click on Clear Unreads
    await chatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebar.selectChatsClearUnreads();
    await chatsSidebar.validateNoUnreadMessages();
  });

  it("Chat User A - Sidebar - Context Menu - Hide chat", async () => {
    // Open context menu and right click on Hide chat
    await chatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebar.selectChatsHideChat();
    await chatsSidebar.validateSidebarChatIsNotDisplayed("ChatUserB");
  });

  it("Chat User A - Sidebar - Send a message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreen.goToFriends();
    await friendsScreen.validateChatWithFriendButtonIsShown();
    await friendsScreen.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreen.clickOnChatWithFriend();
    await chatsLayout.validateChatLayoutIsShown();

    // Send message to Chat User B
    await chatsInput.typeMessageOnInput("Hi...");
    await chatsInput.clickOnSendMessage();
  });

  it("Chat User B - Validate message was received", async () => {
    // With User B - Wait until message is received
    await activateSecondApplication();
    await chatsSidebar.waitForIsShown(true);
    await messageRemote.waitForReceivingMessage("Hi...");
  });

  it("Chat User A - Sidebar - Persists between different sections of the app - Files Screen", async () => {
    // Validate on Files Screen that sidebar is displayed
    await activateFirstApplication();
    await chatsLayout.waitForIsShown(true);
    await chatsLayout.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await chatsSidebar.validateSidebarChatsIsShown();
  });

  it("Chat User A - Chats Sidebar is hidden when entering to Settings Screen", async () => {
    // Go to Settings Profile Screen
    await filesScreen.goToSettings();
    await settingsProfile.validateSettingsProfileIsShown();

    // Validate that Chats Sidebar is not displayed on Settings Screen
    await chatsSidebar.sidebarChatsSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Chats Sidebar is displayed again when opening Friends Screen", async () => {
    // Validate on Friends Screen that sidebar is displayed
    await settingsProfile.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
    await chatsSidebar.validateSidebarChatsIsShown();

    // Return to chat
    await chatsSidebar.goToSidebarFirstChat();
  });

  it("Chat User A - Sidebar - Validate Hamburger button and back buttons can hide or display the sidebar", async () => {
    // Click on hamburger button and validate that Sidebar is hidden
    await chatsLayout.clickOnHamburgerButton();

    // Click on back button and validate that Sidebar is displayed again
    await chatsLayout.clickOnBackButton();
    await chatsSidebar.validateSidebarChatsIsShown();
  });

  it("Chat User B - Sidebar - Wait for receiving a a new message", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    await chatsInput.waitForIsShown(true);

    // With User B - Wait until message is received
    await messageRemote.waitForReceivingMessage("Hi...");
    const latestMessage = await messageRemote.getLastMessageReceivedText();
    await expect(latestMessage).toHaveText("Hi...");
  });

  it("Chat User A - Sidebar - Context Menu - Delete chat", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();
    await chatsSidebar.waitForIsShown(true);

    // Open context menu and right click on Delete chat
    await chatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await contextMenuSidebar.selectChatsDeleteConversation();
    await welcomeScreen.validateWelcomeScreenIsShown();
  });

  it("Chat User B - Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await welcomeScreen.waitForIsShown(true);
  });

  it("Chat User A - Sidebar without messages sent displays No messages yet, sent one", async () => {
    // Switch to Chat User A window
    await activateFirstApplication();
    await welcomeScreen.waitForIsShown(true);

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await welcomeScreen.goToFriends();
    await friendsScreen.validateChatWithFriendButtonIsShown();
    await friendsScreen.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreen.clickOnChatWithFriend();
    await chatsLayout.validateChatLayoutIsShown();

    // Validate that sidebar record is displayed with correct username and status
    const sidebarChatUsername = await chatsSidebar.sidebarChatsUserNameValue;
    await expect(sidebarChatUsername).toHaveText("ChatUserB");

    const sidebarChatStatus = await chatsSidebar.sidebarChatsUserStatusValue;
    await expect(sidebarChatStatus).toHaveText(
      "No messages sent yet, send one!",
    );
  });

  it("Sidebar - Favorites - Add user to Favorites", async () => {
    // Add user to favorites
    await chatsTopbar.addToFavorites();
    await favoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebar.validateFavoritesUserImage("ChatUserB");
  });

  it("Sidebar - Favorites - Context Menu - Chat with user", async () => {
    // Open context menu and right click on Chat with user
    await favoritesSidebar.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await favoritesSidebar.openContextMenuOnFavoritesUser("ChatUserB");
    await favoritesSidebar.clickOnContextMenuFavoritesChat();
    await chatsLayout.validateChatLayoutIsShown();
    await chatsInput.typeMessageOnInput("Hi...");
    await chatsInput.clearInputBar();
  });

  it("Sidebar - Favorites - Context Menu - Remove user from Favorites", async () => {
    // Open context menu and right click on Remove user from Favorites
    await favoritesSidebar.openContextMenuOnFavoritesUser("ChatUserB");
    await favoritesSidebar.clickOnContextMenuFavoriteRemove();
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}
