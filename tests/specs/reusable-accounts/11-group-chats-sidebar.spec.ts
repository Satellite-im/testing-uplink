require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "@screenobjects/chats/ContextMenuSidebar";
import EditGroup from "@screenobjects/chats/EditGroup";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/MessageLocal";
import Topbar from "@screenobjects/chats/Topbar";
import {
  activateFirstApplication,
  activateSecondApplication,
} from "@helpers/commands";
const chatsInputFirstUser = new InputBar();
const chatsMessagesFirstUser = new Messages();
const chatsSidebarFirstUser = new ChatsSidebar();
const chatsTopbarFirstUser = new Topbar();
const contextMenuSidebarFirstUser = new ContextMenuSidebar();
const editGroupFirstUser = new EditGroup();
const favoritesSidebarFirstUser = new FavoritesSidebar();
const filesScreenFirstUser = new FilesScreen();
const friendsScreenFirstUser = new FriendsScreen();

export default async function groupChatSidebarTests() {
  it("Group Chat - Add group to favorites", async () => {
    // Return control of execution to User A and leave Participants List screen
    await activateFirstApplication();
    await chatsTopbarFirstUser.clickOnTopbar();

    // Click on Favorites button for Group Chat
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar should be displayed and showing the name of the group added to Favorites
    // Favorites Sidebar User bubble should be displayed
    await favoritesSidebarFirstUser.validateFavoritesUserImage("X");
  });

  it("Group Chat - Remove group from favorites", async () => {
    // Remove user from favorites and ensure that Favorites bar is hidden now
    await chatsTopbarFirstUser.removeFromFavorites();
  });

  it("Group Chats Testing - Go to another chat conversation", async () => {
    // Go to another chat conversation
    await chatsTopbarFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.clickOnChatWithFriend();
    await chatsTopbarFirstUser.validateTopbarExists();
  });

  it("Group Chat - Send message to the group with User B", async () => {
    // Switch test execution control to User B and send message to the group
    await activateSecondApplication();
    await chatsInputFirstUser.typeMessageOnInput("HelloGroup");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("HelloGroup");
  });

  it("Group Chat - Sidebar - Any new messages received in group should appear in Sidebar", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // Validate Sidebar shows Group Name
    await chatsSidebarFirstUser.validateUsernameDisplayed("X");

    // Validate last message content from group is displayed on sidebar
    await chatsSidebarFirstUser.validateLastMessageDisplayed("HelloGroup");

    // Validate number of unread messages from the group is displayed on sidebar
    await chatsSidebarFirstUser.validateNumberOfUnreadMessages("1");

    // Validate time ago is displayed on sidebar for group chat
    await chatsSidebarFirstUser.validateLastMessageTimeAgo();
  });

  it("Group Chat - Sidebar - Context Menu - Clear Unreads", async () => {
    // Open context menu on group chat and select Clear Unreads
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("X");
    await contextMenuSidebarFirstUser.selectChatsClearUnreads();
    await chatsSidebarFirstUser.validateNoUnreadMessages();
  });

  it("Group Chat - Sidebar - Context Menu - Hide chat", async () => {
    // Open context menu on group chat and select Hide Chat
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("X");
    await contextMenuSidebarFirstUser.selectChatsHideChat();
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("X");
  });

  it("Group Chat - Send another message to show again the group chat", async () => {
    // Switch test execution control to User B and send message to the group
    await activateSecondApplication();
    await chatsInputFirstUser.typeMessageOnInput("Hey!");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Hey!");
  });

  it("Group Chat - Validate remote user received the message", async () => {
    // Switch control to User A and validate that message was received
    await activateFirstApplication();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    await chatsSidebarFirstUser.goToSidebarGroupChat("X");
    await chatsTopbarFirstUser.validateTopbarExists();
  });

  it("Group Chat - Sidebar - Leave group", async () => {
    // Switch control to User B and leave group chat
    await activateSecondApplication();
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("X");
    await contextMenuSidebarFirstUser.selectChatsLeaveGroup();
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("X");
  });

  it("Group Chat - Sidebar - If a user leaves a group, remote user will see the number of group members decreased", async () => {
    // Switch control to User A and go to settings to refresh screen
    await activateFirstApplication();

    // Now, go to the Group Chat and validate that User B is not part of it anymore
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarUserName).toHaveTextContaining("X");

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (1)");
  });

  it("Group Chat - Add Chat User B again to the group", async () => {
    // Go to Edit Group and then add again Chat User B to the group
    await chatsTopbarFirstUser.openEditGroup();
    await editGroupFirstUser.validateEditGroupIsShown();
    await editGroupFirstUser.clickOnAddMembers();
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.clickOnFirstAddButton();
    await editGroupFirstUser.validateNothingHereIsDisplayed();

    // Validate topbar contents has correct number of participants
    await chatsTopbarFirstUser.exitEditGroup();
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });

  it("Group Chat - Ensure in remote side that user was added again to the group", async () => {
    // Switch execution to User B and ensure that user was added again to the group
    await activateSecondApplication();
    await chatsSidebarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await filesScreenFirstUser.goToMainScreen();
    await chatsSidebarFirstUser.validateSidebarChatsIsShown();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    await chatsSidebarFirstUser.goToSidebarGroupChat("X");
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarUserName).toHaveTextContaining("X");
  });

  it("Group Chat - Sidebar - Delete group", async () => {
    // Switch execution to User A and delete the group
    await activateFirstApplication();
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("X");
    await contextMenuSidebarFirstUser.selectChatsDeleteGroup();

    // Ensure that group was removed on local side
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("X");
  });

  it("Group Chat - Sidebar - Deleted group is not shown on remote side", async () => {
    // Switch execution to remote user and ensure that group was removed on this side too
    await activateSecondApplication();
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("X");
  });
}
