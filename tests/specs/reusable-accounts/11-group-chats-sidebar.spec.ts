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
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import chatsTests from "@specs/02-chats.spec";

export default async function groupChatSidebarTests() {
  before(async () => {
    await launchSecondApplication();
    await CreatePinScreen.loginWithTestUser();
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Group Chat - Add group to favorites", async () => {
    // Return control of execution to User A and leave Participants List screen
    await ChatsSidebar.goToSidebarGroupChat("renamed");
    await Topbar.clickOnTopbar();

    // Click on Favorites button for Group Chat
    await Topbar.addToFavorites();
    await FavoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar should be displayed and showing the name of the group added to Favorites
    // Favorites Sidebar User bubble should be displayed
    await FavoritesSidebar.validateFavoritesUserImage("renamed");
  });

  it("Group Chat - Remove group from favorites", async () => {
    // Remove user from favorites and ensure that Favorites bar is hidden now
    await Topbar.removeFromFavorites();
  });

  it("Group Chats Testing - Go to another chat conversation", async () => {
    // Go to another chat conversation
    await ChatsSidebar.goToSidebarChat("ChatUserB");
    await Topbar.validateTopbarUserName("ChatUserB");
  });

  it("Group Chat - Send message to the group with User B", async () => {
    // Switch test execution control to User B and send message to the group
    await activateSecondApplication();
    await ChatsSidebar.goToSidebarGroupChat("renamed");
    await InputBar.typeMessageOnInput("HelloGroup");
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("HelloGroup");
  });

  it("Group Chat - Sidebar - Any new messages received in group should appear in Sidebar", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Validate Sidebar shows Group Name
    await ChatsSidebar.validateUsernameIsDisplayed("renamed");

    // Validate last message content from group is displayed on sidebar
    await ChatsSidebar.validateLastMessageDisplayed("HelloGroup", "renamed");

    // Validate number of unread messages from the group is displayed on sidebar
    await ChatsSidebar.validateNumberOfUnreadMessages("1", "renamed");

    // Validate time ago is displayed on sidebar for group chat
    await ChatsSidebar.validateLastMessageTimeAgo("renamed");
  });

  it("Group Chat - Sidebar - Context Menu - Clear Unreads", async () => {
    // Open context menu on group chat and select Clear Unreads
    await ChatsSidebar.openContextMenuOnGroupChat("renamed");
    await ContextMenuSidebar.selectChatsClearUnreads();
    await ChatsSidebar.validateNoUnreadMessages("renamed");
  });

  it("Group Chat - Sidebar - Context Menu - Hide chat", async () => {
    // Open context menu on group chat and select Hide Chat
    await ChatsSidebar.openContextMenuOnGroupChat("renamed");
    await ContextMenuSidebar.selectChatsHideChat();
    await ChatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  it("Group Chat - Send another message to show again the group chat", async () => {
    // Switch test execution control to User B and send message to the group
    await activateSecondApplication();
    await InputBar.typeMessageOnInput("Hey!");
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("Hey!");
  });

  it("Group Chat - Validate remote user received the message", async () => {
    // Switch control to User A and validate that message was received
    await activateFirstApplication();
    await ChatsSidebar.waitForGroupToBeCreated("renamed");
    await ChatsSidebar.goToSidebarGroupChat("renamed");
    await Topbar.validateTopbarExists();
  });

  it("Group Chat - Sidebar - Leave group", async () => {
    // Switch control to User B and leave group chat
    await activateSecondApplication();
    await ChatsSidebar.openContextMenuOnGroupChat("renamed");
    await ContextMenuSidebar.selectChatsLeaveGroup();
    await ChatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  it("Group Chat - Sidebar - If a user leaves a group, remote user will see the number of group members decreased", async () => {
    // Switch control to User A and go to settings to refresh screen
    await activateFirstApplication();

    // Now, go to the Group Chat and validate that User B is not part of it anymore
    await Topbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await Topbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("renamed");

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (1)");
  });

  it("Group Chat - Add Chat User B again to the group", async () => {
    // Go to Manage Members and then add again Chat User B to the group
    await Topbar.openManageMembers();
    await ManageMembers.validateManageMembersIsShown();
    await ManageMembers.clickOnAddMembers();
    await ManageMembers.typeOnSearchUserInput("ChatUserB");
    await ManageMembers.clickOnFirstAddButton();

    await ManageMembers.validateNothingHereIsDisplayed();

    // Close Manage Members and validate topbar contents has correct number of participants
    await Topbar.exitManageMembers();

    await ChatsSidebar.validateNoModalIsOpen();
    await Topbar.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("Group Chat - Ensure in remote side that user was added again to the group", async () => {
    // Switch execution to User B and ensure that user was added again to the group
    await activateSecondApplication();
    await ChatsSidebar.goToFiles();
    await FilesScreen.validateFilesScreenIsShown();
    await FilesScreen.goToMainScreen();
    await ChatsSidebar.validateSidebarChatsIsShown();
    await ChatsSidebar.waitForGroupToBeCreated("renamed");
    await ChatsSidebar.goToSidebarGroupChat("renamed");
    await Topbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await Topbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("renamed");
  });

  it("Group Chat - Sidebar - Delete group", async () => {
    // Switch execution to User A and delete the group
    await activateFirstApplication();
    await ChatsSidebar.openContextMenuOnGroupChat("renamed");
    await ContextMenuSidebar.selectChatsDeleteGroup();

    // Ensure that group was removed on local side
    await ChatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  it("Group Chat - Sidebar - Deleted group is not shown on remote side", async () => {
    // Switch execution to remote user and ensure that group was removed on this side too
    await activateSecondApplication();
    await ChatsSidebar.validateSidebarChatIsNotDisplayed("renamed");
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}
