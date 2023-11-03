import "module-alias/register";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import CreateGroupChat from "@screenobjects/chats/CreateGroupChat";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import SidebarSearch from "@screenobjects/chats/SidebarSearch";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let createGroupFirstUser = new CreateGroupChat(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let sidebarSearchFirstUser = new SidebarSearch(USER_A_INSTANCE);

export default async function groupChatTestsUserA() {
  it("Chat User A - Create Group Chat button tooltip", async () => {
    // Hover on create group chat button and validate tooltip is shown
    await chatsSidebarFirstUser.hoverOnCreateGroupButton();
  });

  it("Chat User A - Click on Create Group Chat and close modal", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.validateCreateGroupChatsIsShown();

    // Click again on create group chat and modal will be closed
    await chatsTopbarFirstUser.clickOnTopbar();
    await createGroupFirstUser.createGroupChatSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Create Group Chat Modal contents", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.validateCreateGroupChatsIsShown();

    // Validate contents
    await createGroupFirstUser.createGroupChatButton.waitForExist();
    await createGroupFirstUser.friendsList.waitForExist();
    await createGroupFirstUser.groupNameInput.waitForExist();
    await createGroupFirstUser.userSearchInput.waitForExist();
  });

  it("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    // Open modal to create group chat and type alphanumeric chars in name
    await createGroupFirstUser.typeOnGroupName("@");
    await createGroupFirstUser.createGroupInputError.waitForExist();
    const inputErrorText = await createGroupFirstUser.createGroupInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): @",
    );
    await createGroupFirstUser.clearGroupNameInput();
  });

  // Skipping test that sometimes fail in CI because Appium randomly jumps when typing into a different input field
  xit("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    // Open modal to create group chat and type more than 64 chars in name
    await createGroupFirstUser.typeLongerTextInGroupName();
    await createGroupFirstUser.createGroupInputError.waitForExist();
    const inputErrorText = await createGroupFirstUser.createGroupInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 64 characters exceeded.",
    );
    await createGroupFirstUser.clearGroupNameInput();
  });

  it("Chat User A - Search bar - Look for non existing user", async () => {
    // Open modal to create group chat and type non existing user
    await createGroupFirstUser.typeOnUsersSearchInput("z");
    const numberOfUsersInList =
      await createGroupFirstUser.getNumberOfUsersInListFromCreateGroup();
    await expect(numberOfUsersInList).toEqual(0);
    await createGroupFirstUser.clearUserSearchInput();
  });

  it("Chat User A - Create group chat with a valid participant", async () => {
    // Open modal to create group chat and type valid participant and then create group chat
    await createGroupFirstUser.typeOnGroupName("Test");
    await createGroupFirstUser.typeOnUsersSearchInput("Ch");
    await createGroupFirstUser.selectUserFromList("ChatUserB");
    await createGroupFirstUser.clickOnCreateGroupChat();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("Test");
  });

  it("Chat User A - Group Chat is displayed on local user sidebar", async () => {
    // Validate group chat is displayed on local user sidebar and then go to group chat
    const statusFromGroup =
      await chatsSidebarFirstUser.getSidebarGroupStatus("Test");
    await expect(statusFromGroup).toHaveTextContaining(
      "No messages sent yet, send one!",
    );
    await chatsSidebarFirstUser.goToSidebarGroupChat("Test");
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarUserName).toHaveTextContaining("Test");

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });

  it("Group Chat - User A sends a message in group chat", async () => {
    // Send a message in group chat
    await chatsInputFirstUser.typeMessageOnInput("Sup");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Sup");
    await chatsInputFirstUser.typeMessageOnInput("test");
    await chatsInputFirstUser.clearInputBar();

    // Validate text from message sent to the group
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Sup");
  });

  it("Sidebar - Search string matching username and group and go to first result", async () => {
    // Validate search results for a string matching a single user and a single group
    await chatsTopbarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("Ch");
    const searchResultsUsers =
      await sidebarSearchFirstUser.getSidebarSearchResultsUsers();
    const searchResultsGroupsNotMatchingName =
      await sidebarSearchFirstUser.getSidebarSearchResultsGroupsNotMatchingName();
    const searchResultsParticipantsInGroups =
      await sidebarSearchFirstUser.getSidebarSearchResultsParticipantsInGroups();
    await expect(searchResultsUsers).toEqual(["ChatUserB"]);
    await expect(searchResultsGroupsNotMatchingName).toEqual(["Test"]);
    await expect(searchResultsParticipantsInGroups).toEqual(["ChatUserB"]);
    await chatsSidebarFirstUser.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Search for a string matching a single group chat", async () => {
    // Validate search results for a string matching a single group chat
    await chatsTopbarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("Te");
    const searchResults =
      await sidebarSearchFirstUser.getSidebarSearchResultsGroupsMatchingName();
    await expect(searchResults).toEqual(["Test"]);
    await chatsSidebarFirstUser.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Not matching results and then go to the group", async () => {
    // Validate search results for a string not matching any group chat or user
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("z");
    await chatsSidebarFirstUser.clearSidebarSearchInput();
    await chatsSidebarFirstUser.goToSidebarGroupChat("Test");
  });
}
