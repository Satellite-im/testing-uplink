require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "@screenobjects/chats/ContextMenuSidebar";
import ManageMembers from "@screenobjects/chats/ManageMembers";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import Topbar from "@screenobjects/chats/Topbar";
import {
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  launchFirstApplication,
  launchSecondApplication,
} from "@helpers/commands";
const chatsInput = new InputBar();
const chatsSidebar = new ChatsSidebar();
const chatsTopbar = new Topbar();
const contextMenuSidebar = new ContextMenuSidebar();
const manageMembers = new ManageMembers();
const favoritesSidebar = new FavoritesSidebar();
const filesScreen = new FilesScreen();
const friendsScreen = new FriendsScreen();
const messageLocal = new MessageLocal();

export default async function groupChatSidebarTests() {
  before(async () => {
    await launchSecondApplication();
    await launchFirstApplication();
  });

  it("Group Chat - Add group to favorites", async () => {
    // Return control of execution to User A and leave Participants List screen
    await chatsSidebar.goToSidebarGroupChat("renamed");
    await chatsTopbar.clickOnTopbar();

    // Click on Favorites button for Group Chat
    await chatsTopbar.addToFavorites();
    await favoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar should be displayed and showing the name of the group added to Favorites
    // Favorites Sidebar User bubble should be displayed
    await favoritesSidebar.validateFavoritesUserImage("renamed");
  });

  it("Group Chat - Remove group from favorites", async () => {
    // Remove user from favorites and ensure that Favorites bar is hidden now
    await chatsTopbar.removeFromFavorites();
  });

  it("Group Chats Testing - Go to another chat conversation", async () => {
    // Go to another chat conversation
    await chatsTopbar.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
    await friendsScreen.validateChatWithFriendButtonIsShown();
    await friendsScreen.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreen.clickOnChatWithFriend();
    await chatsTopbar.validateTopbarExists();
  });

  it("Group Chat - Send message to the group with User B", async () => {
    // Switch test execution control to User B and send message to the group
    await activateSecondApplication();
    await chatsSidebar.goToSidebarGroupChat("renamed");
    await chatsInput.typeMessageOnInput("HelloGroup");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("HelloGroup");
  });

  it("Group Chat - Sidebar - Any new messages received in group should appear in Sidebar", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Validate Sidebar shows Group Name
    await chatsSidebar.validateUsernameDisplayed("renamed");

    // Validate last message content from group is displayed on sidebar
    await chatsSidebar.validateLastMessageDisplayed("HelloGroup");

    // Validate number of unread messages from the group is displayed on sidebar
    await chatsSidebar.validateNumberOfUnreadMessages("1");

    // Validate time ago is displayed on sidebar for group chat
    await chatsSidebar.validateLastMessageTimeAgo();
  });

  it("Group Chat - Sidebar - Context Menu - Clear Unreads", async () => {
    // Open context menu on group chat and select Clear Unreads
    await chatsSidebar.openContextMenuOnGroupChat("renamed");
    await contextMenuSidebar.selectChatsClearUnreads();
    await chatsSidebar.validateNoUnreadMessages();
  });

  it("Group Chat - Sidebar - Context Menu - Hide chat", async () => {
    // Open context menu on group chat and select Hide Chat
    await chatsSidebar.openContextMenuOnGroupChat("renamed");
    await contextMenuSidebar.selectChatsHideChat();
    await chatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  it("Group Chat - Send another message to show again the group chat", async () => {
    // Switch test execution control to User B and send message to the group
    await activateSecondApplication();
    await chatsInput.typeMessageOnInput("Hey!");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Hey!");
  });

  it("Group Chat - Validate remote user received the message", async () => {
    // Switch control to User A and validate that message was received
    await activateFirstApplication();
    await chatsSidebar.waitForGroupToBeCreated("renamed");
    await chatsSidebar.goToSidebarGroupChat("renamed");
    await chatsTopbar.validateTopbarExists();
  });

  it("Group Chat - Sidebar - Leave group", async () => {
    // Switch control to User B and leave group chat
    await activateSecondApplication();
    await chatsSidebar.openContextMenuOnGroupChat("renamed");
    await contextMenuSidebar.selectChatsLeaveGroup();
    await chatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  it("Group Chat - Sidebar - If a user leaves a group, remote user will see the number of group members decreased", async () => {
    // Switch control to User A and go to settings to refresh screen
    await activateFirstApplication();

    // Now, go to the Group Chat and validate that User B is not part of it anymore
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("renamed");

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (1)");
  });

  it("Group Chat - Add Chat User B again to the group", async () => {
    // Go to Manage Members and then add again Chat User B to the group
    await chatsTopbar.openManageMembers();
    await manageMembers.validateManageMembersIsShown();
    await manageMembers.clickOnAddMembers();
    await manageMembers.typeOnSearchUserInput("ChatUserB");
    await manageMembers.clickOnFirstAddButton();

    await manageMembers.validateNothingHereIsDisplayed();

    // Close Manage Members and validate topbar contents has correct number of participants
    await chatsTopbar.exitManageMembers();

    await chatsSidebar.validateNoModalIsOpen();
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("Group Chat - Ensure in remote side that user was added again to the group", async () => {
    // Switch execution to User B and ensure that user was added again to the group
    await activateSecondApplication();
    await chatsSidebar.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await filesScreen.goToMainScreen();
    await chatsSidebar.validateSidebarChatsIsShown();
    await chatsSidebar.waitForGroupToBeCreated("renamed");
    await chatsSidebar.goToSidebarGroupChat("renamed");
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("renamed");
  });

  it("Group Chat - Sidebar - Delete group", async () => {
    // Switch execution to User A and delete the group
    await activateFirstApplication();
    await chatsSidebar.openContextMenuOnGroupChat("renamed");
    await contextMenuSidebar.selectChatsDeleteGroup();

    // Ensure that group was removed on local side
    await chatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  it("Group Chat - Sidebar - Deleted group is not shown on remote side", async () => {
    // Switch execution to remote user and ensure that group was removed on this side too
    await activateSecondApplication();
    await chatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}
