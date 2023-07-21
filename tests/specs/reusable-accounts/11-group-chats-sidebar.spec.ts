import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "../../screenobjects/chats/ContextMenuSidebar";
import EditGroup from "../../screenobjects/chats/EditGroup";
import FilesScreen from "../../screenobjects/files/FilesScreen";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
import ParticipantsList from "../../screenobjects/chats/ParticipantsList";
import SettingsProfileScreen from "../../screenobjects/settings/SettingsProfileScreen";
import Topbar from "../../screenobjects/chats/Topbar";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsSidebarSecondUser = new ChatsSidebar(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let contextMenuSidebarFirstUser = new ContextMenuSidebar(USER_A_INSTANCE);
let contextMenuSidebarSecondUser = new ContextMenuSidebar(USER_B_INSTANCE);
let editGroupFirstUser = new EditGroup(USER_A_INSTANCE);
let filesScreenSecondUser = new FilesScreen(USER_B_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let participantsListFirstUser = new ParticipantsList(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);

export default async function groupChatSidebarTests() {
  it("Group Chat - Add group to favorites", async () => {
    // Return control of execution to User A and leave Participants List screen
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.clickOnTopbar();

    // Click on Favorites button for Group Chat
    await chatsTopbarFirstUser.addToFavorites();
    await chatsTopbarFirstUser.favorites.waitForExist();

    // Favorites Sidebar should be displayed and showing the name of the group added to Favorites
    await expect(chatsTopbarFirstUser.favoritesUserImage).toBeDisplayed();
    await expect(
      chatsTopbarFirstUser.favoritesUserIndicatorOnline
    ).toBeDisplayed();
    await expect(chatsTopbarFirstUser.favoritesUserName).toHaveTextContaining(
      "NEWNAMEGROUP"
    );
  });

  it("Group Chat - Remove group from favorites", async () => {
    // Remove user from favorites and ensure that Favorites bar is hidden now
    await chatsTopbarFirstUser.removeFromFavorites();
    await chatsTopbarFirstUser.favorites.waitForExist({ reverse: true });

    // Go to another chat conversation
    await chatsTopbarFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  it("Group Chat - Send message to the group with User B", async () => {
    // Switch test execution control to User B and send message to the group
    await chatsTopbarSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.typeMessageOnInput("HelloGroup");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("HelloGroup");

    // Switch control to User A
    await chatsLayoutFirstUser.switchToOtherUserWindow();
  });

  it("Group Chat - Sidebar - Any new messages received in group should appear in Sidebar", async () => {
    // Validate Sidebar shows Group Name
    await chatsSidebarFirstUser.validateUsernameDisplayed("NewNameGroup");

    // Validate last message content from group is displayed on sidebar
    await chatsSidebarFirstUser.validateLastMessageDisplayed("HelloGroup");

    // Validate number of unread messages from the group is displayed on sidebar
    await chatsSidebarFirstUser.validateNumberOfUnreadMessages("1");

    // Validate time ago is displayed on sidebar for group chat
    await chatsSidebarFirstUser.validateLastMessageTimeAgo();
  });

  it("Group Chat - Sidebar - Context Menu - Clear Unreads", async () => {
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("NewNameGroup");
    await contextMenuSidebarFirstUser.selectChatsClearUnreads();
    await chatsSidebarFirstUser.validateNoUnreadMessages();
  });

  it("Group Chat - Sidebar - Context Menu - Hide chat", async () => {
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("NewNameGroup");
    await contextMenuSidebarFirstUser.selectChatsHideChat();
    await chatsSidebarFirstUser.validateNoSidebarGroupChatsAreDisplayed();
  });

  it("Group Chat - Send another message to show again the group chat", async () => {
    // Switch test execution control to User B and send message to the group
    await chatsInputSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.typeMessageOnInput("Hey!");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("Hey!");

    // Switch control to User A
    await chatsLayoutFirstUser.switchToOtherUserWindow();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("NewNameGroup");
    await chatsSidebarFirstUser.goToSidebarGroupChat("NewNameGroup");
    await chatsTopbarFirstUser.topbar.waitForDisplayed();
  });

  it("Group Chat - Sidebar - Leave group", async () => {
    // Switch control to User B
    await chatsSidebarSecondUser.openContextMenuOnGroupChat("NewNameGroup");
    await contextMenuSidebarSecondUser.selectChatsLeaveGroup();
    await chatsSidebarSecondUser.validateNoSidebarGroupChatsAreDisplayed();
  });

  it("Group Chat - Sidebar - If a user leaves a group, remote user will see the number of group members decreased", async () => {
    // Switch control to User A and go to settings to refresh screen
    await chatsTopbarFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToMainScreen();

    // Now, go to the Group Chat and validate that User B is not part of it
    await chatsSidebarFirstUser.waitForIsShown(true);
    await chatsSidebarFirstUser.goToSidebarGroupChat("NewNameGroup");
    await chatsTopbarFirstUser.waitForIsShown(true);
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "NewNameGroup"
    );
    await expect(chatsTopbarFirstUser.topbarUserStatus).toHaveTextContaining(
      "Members (1)"
    );
  });

  it("Group Chat - Add Chat User B again to the group", async () => {
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.waitForIsShown(true);
    await editGroupFirstUser.clickOnAddWithSidebarButton();
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.selectUserFromList("ChatUserB");
    await editGroupFirstUser.clickOnAddButtonBelow();
    await editGroupFirstUser.editGroupSection.waitForDisplayed({
      reverse: true,
    });
  });

  it("Group Chat - Ensure in local side that User B was added again to the group", async () => {
    await chatsTopbarFirstUser.clickOnTopbar();
    await participantsListFirstUser.waitForIsShown(true);
    await participantsListFirstUser.participantsUserInput.waitForDisplayed();
    const currentList = await participantsListFirstUser.getPartipantsList();
    const expectedList = ["ChatUserA", "ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Group Chat - Ensure in remote side that user was added again to the group", async () => {
    // Switch execution to User B and ensure that user was added again to the group
    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.goToFiles();
    await filesScreenSecondUser.waitForIsShown(true);
    await filesScreenSecondUser.goToMainScreen();
    await chatsSidebarSecondUser.waitForIsShown(true);
    await chatsSidebarSecondUser.waitForGroupToBeCreated("NewNameGroup");
    await chatsSidebarSecondUser.goToSidebarGroupChat("NewNameGroup");
    await chatsTopbarSecondUser.topbar.waitForDisplayed();
    await expect(chatsTopbarSecondUser.topbarUserName).toHaveTextContaining(
      "NewNameGroup"
    );
  });

  it("Group Chat - Sidebar - Delete group", async () => {
    // Switch execution to User A and delete the group
    await chatsSidebarFirstUser.switchToOtherUserWindow();
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("NewNameGroup");
    await contextMenuSidebarFirstUser.selectChatsDeleteGroup();

    // Ensure that group was removed on local side
    await chatsSidebarFirstUser.validateNoSidebarGroupChatsAreDisplayed();

    // Switch execution to remote user and ensure that group was removed on this side too
    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.validateNoSidebarGroupChatsAreDisplayed();
  });
}
