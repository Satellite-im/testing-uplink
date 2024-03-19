require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import CreateGroupChat from "@screenobjects/chats/CreateGroupChat";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import SidebarSearch from "@screenobjects/chats/SidebarSearch";
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

export default async function groupChatTests() {
  before(async () => {
    await launchSecondApplication();
    await CreatePinScreen.loginWithTestUser();
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User A - Create Group Chat button tooltip", async () => {
    // Hover on create group chat button and validate tooltip is shown
    await ChatsSidebar.hoverOnCreateGroupButton();
  });

  it("Chat User A - Click on Create Group Chat and close modal", async () => {
    // Open modal to create group chat
    await ChatsSidebar.clickOnCreateGroupChat();
    await CreateGroupChat.validateCreateGroupChatsIsShown();

    // Click again on create group chat and modal will be closed
    await Topbar.clickOnTopbar();
  });

  it("Chat User A - Create Group Chat Modal contents", async () => {
    // Open modal to create group chat
    await ChatsSidebar.clickOnCreateGroupChat();
    await CreateGroupChat.validateCreateGroupChatsIsShown();

    // Validate contents
    await CreateGroupChat.validateCreateGroupChatButtonIsShown();
    await CreateGroupChat.validateCreateGroupChatFriendsListIsShown();
    await CreateGroupChat.validateCreateGroupChatNameInputIsShown();
    await CreateGroupChat.validateCreateGroupChatUserSearchInputIsShown();
  });

  it("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    // Open modal to create group chat and type alphanumeric chars in name
    await CreateGroupChat.typeOnGroupName("@");
    await CreateGroupChat.validateCreateGroupChatInputErrorIsShown();
    const inputErrorText = await CreateGroupChat.createGroupInputErrorText;
    await expect(inputErrorText).toHaveText("Not allowed character(s): @");
    await CreateGroupChat.clearGroupNameInput();
  });

  // Needs rework
  xit("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    // Open modal to create group chat and type more than 64 chars in name
    await CreateGroupChat.typeLongerTextInGroupName();
    await CreateGroupChat.validateCreateGroupChatInputErrorIsShown();
    const inputErrorText = await CreateGroupChat.createGroupInputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 64 characters exceeded.",
    );
    await CreateGroupChat.clearGroupNameInput();
  });

  it("Chat User A - Search bar - Look for non existing user", async () => {
    // Open modal to create group chat and type non existing user
    await CreateGroupChat.typeOnUsersSearchInput("z");
    const numberOfUsersInList =
      await CreateGroupChat.getNumberOfUsersInListFromCreateGroup();
    await expect(numberOfUsersInList).toEqual(0);
    await CreateGroupChat.clearUserSearchInput();
  });

  it("Chat User A - Create group chat with a valid participant", async () => {
    // Open modal to create group chat and type valid participant and then create group chat
    await CreateGroupChat.typeOnGroupName("Test");
    await CreateGroupChat.typeOnUsersSearchInput("Ch");
    await CreateGroupChat.selectUserFromList("ChatUserB");
    await CreateGroupChat.clickOnCreateGroupChat();
    await ChatsSidebar.waitForGroupToBeCreated("Test");
  });

  it("Chat User A - Group Chat is displayed on local user sidebar", async () => {
    // Validate group chat is displayed on local user sidebar and then go to group chat
    const statusFromGroup = await ChatsSidebar.getSidebarGroupStatus("Test");
    await expect(statusFromGroup).toHaveText("No messages sent yet, send one!");
    await ChatsSidebar.goToSidebarGroupChat("Test");
    await Topbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await Topbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("Test");

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("User B - Group Chat is displayed on remote participant users sidebar", async () => {
    // Switch to user B and validate group chat is displayed on remote participant users sidebar and then go to group chat
    await activateSecondApplication();
    await ChatsSidebar.waitForGroupToBeCreated("Test");
    const statusFromGroupOnUserB =
      await ChatsSidebar.getSidebarGroupStatus("Test");
    await expect(statusFromGroupOnUserB).toHaveText(
      "No messages sent yet, send one!",
    );
    await ChatsSidebar.goToSidebarGroupChat("Test");

    await Topbar.validateTopbarExists();

    const topbarUserName = await Topbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("Test");

    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
    await ChatsSidebar.goToSidebarChat("ChatUserA");

    await Topbar.validateTopbarExists();
  });

  it("Group Chat - User A sends a message in group chat", async () => {
    // Switch to user A and send a message in group chat
    await activateFirstApplication();
    await InputBar.typeMessageOnInput("Sup");
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("Sup");
    await InputBar.typeMessageOnInput("test");
    await InputBar.clearInputBar();

    // Validate text from message sent to the group
    const textMessage = await MessageLocal.getCustomMessageContents("Sup");
    await expect(textMessage).toHaveText("Sup");
  });

  it("Group Chat - User B receives the message in group chat", async () => {
    // Switch to user B and validate message is received in group chat
    await activateSecondApplication();
    await ChatsSidebar.goToSidebarGroupChat("Test");
    await MessageRemote.waitForReceivingMessage("Sup");
  });

  it("Sidebar - Search string matching username and group and go to first result", async () => {
    // Switch to user A and validate search results for a string matching a single user and a single group
    await activateFirstApplication();
    await Topbar.goToFiles();
    await FilesScreen.validateFilesScreenIsShown();
    await ChatsSidebar.typeOnSidebarSearchInput("Ch");
    const searchResultsUsers =
      await SidebarSearch.getSidebarSearchResultsUsers();
    const searchResultsGroupsNotMatchingName =
      await SidebarSearch.getSidebarSearchResultsGroupsNotMatchingName();
    const searchResultsParticipantsInGroups =
      await SidebarSearch.getSidebarSearchResultsParticipantsInGroups();
    await expect(searchResultsUsers).toEqual(["ChatUserB"]);
    await expect(searchResultsGroupsNotMatchingName).toEqual(["Test"]);
    await expect(searchResultsParticipantsInGroups).toEqual(["ChatUserB"]);
    await ChatsSidebar.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Search for a string matching a single group chat", async () => {
    // Validate search results for a string matching a single group chat
    await Topbar.goToFiles();
    await FilesScreen.validateFilesScreenIsShown();
    await ChatsSidebar.typeOnSidebarSearchInput("Te");
    const searchResults =
      await SidebarSearch.getSidebarSearchResultsGroupsMatchingName();
    await expect(searchResults).toEqual(["Test"]);
    await ChatsSidebar.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Not matching results and then go to the group", async () => {
    // Validate search results for a string not matching any group chat or user
    await ChatsSidebar.typeOnSidebarSearchInput("z");
    await ChatsSidebar.clearSidebarSearchInput();
    await ChatsSidebar.goToSidebarGroupChat("Test");
    await Topbar.validateTopbarExists();

    const topbarUserName = await Topbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("Test");
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}
