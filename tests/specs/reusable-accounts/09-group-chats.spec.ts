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
const chatsInput = new InputBar();
const chatsSidebar = new ChatsSidebar();
const chatsTopbar = new Topbar();
const createGroup = new CreateGroupChat();
const filesScreen = new FilesScreen();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();
const sidebarSearch = new SidebarSearch();

export default async function groupChatTests() {
  before(async () => {
    await launchSecondApplication();
    await launchFirstApplication();
  });

  it("Chat User A - Create Group Chat button tooltip", async () => {
    // Hover on create group chat button and validate tooltip is shown
    await chatsSidebar.hoverOnCreateGroupButton();
  });

  it("Chat User A - Click on Create Group Chat and close modal", async () => {
    // Open modal to create group chat
    await chatsSidebar.clickOnCreateGroupChat();
    await createGroup.validateCreateGroupChatsIsShown();

    // Click again on create group chat and modal will be closed
    await chatsTopbar.clickOnTopbar();
  });

  it("Chat User A - Create Group Chat Modal contents", async () => {
    // Open modal to create group chat
    await chatsSidebar.clickOnCreateGroupChat();
    await createGroup.validateCreateGroupChatsIsShown();

    // Validate contents
    await createGroup.validateCreateGroupChatButtonIsShown();
    await createGroup.validateCreateGroupChatFriendsListIsShown();
    await createGroup.validateCreateGroupChatNameInputIsShown();
    await createGroup.validateCreateGroupChatUserSearchInputIsShown();
  });

  it("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    // Open modal to create group chat and type alphanumeric chars in name
    await createGroup.typeOnGroupName("@");
    await createGroup.validateCreateGroupChatInputErrorIsShown();
    const inputErrorText = await createGroup.createGroupInputErrorText;
    await expect(inputErrorText).toHaveText("Not allowed character(s): @");
    await createGroup.clearGroupNameInput();
  });

  it("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    // Open modal to create group chat and type more than 64 chars in name
    await createGroup.typeLongerTextInGroupName();
    await createGroup.validateCreateGroupChatInputErrorIsShown();
    const inputErrorText = await createGroup.createGroupInputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 64 characters exceeded.",
    );
    await createGroup.clearGroupNameInput();
  });

  it("Chat User A - Search bar - Look for non existing user", async () => {
    // Open modal to create group chat and type non existing user
    await createGroup.typeOnUsersSearchInput("z");
    const numberOfUsersInList =
      await createGroup.getNumberOfUsersInListFromCreateGroup();
    await expect(numberOfUsersInList).toEqual(0);
    await createGroup.clearUserSearchInput();
  });

  it("Chat User A - Create group chat with a valid participant", async () => {
    // Open modal to create group chat and type valid participant and then create group chat
    await createGroup.typeOnGroupName("Test");
    await createGroup.typeOnUsersSearchInput("Ch");
    await createGroup.selectUserFromList("ChatUserB");
    await createGroup.clickOnCreateGroupChat();
    await chatsSidebar.waitForGroupToBeCreated("Test");
  });

  it("Chat User A - Group Chat is displayed on local user sidebar", async () => {
    // Validate group chat is displayed on local user sidebar and then go to group chat
    const statusFromGroup = await chatsSidebar.getSidebarGroupStatus("Test");
    await expect(statusFromGroup).toHaveText("No messages sent yet, send one!");
    await chatsSidebar.goToSidebarGroupChat("Test");
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = chatsTopbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("Test");

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("User B - Group Chat is displayed on remote participant users sidebar", async () => {
    // Switch to user B and validate group chat is displayed on remote participant users sidebar and then go to group chat
    await activateSecondApplication();
    await chatsSidebar.waitForGroupToBeCreated("Test");
    const statusFromGroupOnUserB =
      await chatsSidebar.getSidebarGroupStatus("Test");
    await expect(statusFromGroupOnUserB).toHaveText(
      "No messages sent yet, send one!",
    );
    await chatsSidebar.goToSidebarGroupChat("Test");

    await chatsTopbar.validateTopbarExists();

    const topbarUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("Test");

    const topbarUserStatus = await chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
    await chatsSidebar.goToSidebarChat("ChatUserA");

    await chatsTopbar.validateTopbarExists();
  });

  it("Group Chat - User A sends a message in group chat", async () => {
    // Switch to user A and send a message in group chat
    await activateFirstApplication();
    await chatsInput.typeMessageOnInput("Sup");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Sup");
    await chatsInput.typeMessageOnInput("test");
    await chatsInput.clearInputBar();

    // Validate text from message sent to the group
    const textMessage = await messageLocal.getCustomMessageContents("Sup");
    await expect(textMessage).toHaveText("Sup");
  });

  it("Group Chat - User B receives the message in group chat", async () => {
    // Switch to user B and validate message is received in group chat
    await activateSecondApplication();
    await chatsSidebar.goToSidebarGroupChat("Test");
    await messageRemote.waitForReceivingMessage("Sup");
  });

  it("Sidebar - Search string matching username and group and go to first result", async () => {
    // Switch to user A and validate search results for a string matching a single user and a single group
    await activateFirstApplication();
    await chatsTopbar.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await chatsSidebar.typeOnSidebarSearchInput("Ch");
    const searchResultsUsers =
      await sidebarSearch.getSidebarSearchResultsUsers();
    const searchResultsGroupsNotMatchingName =
      await sidebarSearch.getSidebarSearchResultsGroupsNotMatchingName();
    const searchResultsParticipantsInGroups =
      await sidebarSearch.getSidebarSearchResultsParticipantsInGroups();
    await expect(searchResultsUsers).toEqual(["ChatUserB"]);
    await expect(searchResultsGroupsNotMatchingName).toEqual(["Test"]);
    await expect(searchResultsParticipantsInGroups).toEqual(["ChatUserB"]);
    await chatsSidebar.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Search for a string matching a single group chat", async () => {
    // Validate search results for a string matching a single group chat
    await chatsTopbar.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await chatsSidebar.typeOnSidebarSearchInput("Te");
    const searchResults =
      await sidebarSearch.getSidebarSearchResultsGroupsMatchingName();
    await expect(searchResults).toEqual(["Test"]);
    await chatsSidebar.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Not matching results and then go to the group", async () => {
    // Validate search results for a string not matching any group chat or user
    await chatsSidebar.typeOnSidebarSearchInput("z");
    await chatsSidebar.clearSidebarSearchInput();
    await chatsSidebar.goToSidebarGroupChat("Test");
    await chatsTopbar.validateTopbarExists();

    const topbarUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarUserName).toHaveText("Test");
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}
