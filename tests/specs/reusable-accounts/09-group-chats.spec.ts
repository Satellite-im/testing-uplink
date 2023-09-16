import "module-alias/register";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import CreateGroupChat from "@screenobjects/chats/CreateGroupChat";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import SidebarSearch from "@screenobjects/chats/SidebarSearch";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
let chatsLayoutSecondUser = new ChatsLayout(USER_B_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsSidebarSecondUser = new ChatsSidebar(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let createGroupFirstUser = new CreateGroupChat(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let sidebarSearchFirstUser = new SidebarSearch(USER_A_INSTANCE);

export default async function groupChatTests() {
  it("Chat User A - Create Group Chat button tooltip", async () => {
    await chatsSidebarFirstUser.hoverOnCreateGroupButton();
    await chatsSidebarFirstUser.sidebarCreateGroupChatTooltip.waitForExist();
  });

  it("Chat User A - Click on Create Group Chat and close modal", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForExist();

    // Click again on create group chat and modal will be closed
    await chatsTopbarFirstUser.clickOnTopbar();
    await createGroupFirstUser.createGroupChatSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Create Group Chat Modal contents", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForExist();

    // Validate contents
    await createGroupFirstUser.groupNameInput.waitForExist();
    await createGroupFirstUser.userSearchInput.waitForExist();
    await createGroupFirstUser.friendsList.waitForExist();
    await createGroupFirstUser.createGroupChatButton.waitForExist();
  });

  it("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    await createGroupFirstUser.typeOnGroupName("@");
    await expect(
      createGroupFirstUser.createGroupInputErrorText
    ).toHaveTextContaining("Not allowed character(s): @");
    await createGroupFirstUser.createGroupInputError.waitForExist();
    await createGroupFirstUser.clearGroupNameInput();
  });

  // Skipping test that sometimes fail in CI because Appium randomly jumps when typing into a different input field
  xit("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    await createGroupFirstUser.typeLongerTextInGroupName();
    await createGroupFirstUser.createGroupInputError.waitForExist();
    await expect(
      createGroupFirstUser.createGroupInputErrorText
    ).toHaveTextContaining("Maximum of 64 characters exceeded.");
    await createGroupFirstUser.clearGroupNameInput();
  });

  it("Chat User A - Search bar - Look for non existing user", async () => {
    await createGroupFirstUser.typeOnUsersSearchInput("z");
    const numberOfUsersInList =
      await createGroupFirstUser.getNumberOfUsersInListFromCreateGroup();
    await expect(numberOfUsersInList).toEqual(0);
    await createGroupFirstUser.clearUserSearchInput();
  });

  it("Chat User A - Create group chat with a valid participant", async () => {
    await createGroupFirstUser.typeOnGroupName("Test");
    await createGroupFirstUser.typeOnUsersSearchInput("Ch");
    await createGroupFirstUser.selectUserFromList("ChatUserB");
    await createGroupFirstUser.clickOnCreateGroupChat();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("Test");
  });

  it("Chat User A - Group Chat is displayed on local user sidebar", async () => {
    const statusFromGroup = await chatsSidebarFirstUser.getSidebarGroupStatus(
      "Test"
    );
    await expect(statusFromGroup).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
    await chatsSidebarFirstUser.goToSidebarGroupChat("Test");
    await chatsTopbarFirstUser.topbar.waitForExist();
    await expect(chatsTopbarFirstUser.topbarUserNameValue).toHaveTextContaining(
      "Test"
    );
    await expect(
      chatsTopbarFirstUser.topbarUserStatusValue
    ).toHaveTextContaining("Members (2)");
    await chatsSidebarSecondUser.switchToOtherUserWindow();
  });

  it("User B - Group Chat is displayed on remote participant users sidebar", async () => {
    await chatsSidebarSecondUser.waitForGroupToBeCreated("Test");
    const statusFromGroupOnUserB =
      await chatsSidebarSecondUser.getSidebarGroupStatus("Test");
    await expect(statusFromGroupOnUserB).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
    await chatsSidebarSecondUser.goToSidebarGroupChat("Test");
    await chatsTopbarSecondUser.topbar.waitForExist();
    await expect(
      chatsTopbarSecondUser.topbarUserNameValue
    ).toHaveTextContaining("Test");
    await expect(
      chatsTopbarSecondUser.topbarUserStatusValue
    ).toHaveTextContaining("Members (2)");
    await chatsSidebarSecondUser.goToSidebarChat("ChatUserA");
    await chatsTopbarSecondUser.topbar.waitForExist();
  });

  it("Group Chat - User A sends a message in group chat", async () => {
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.typeMessageOnInput("HiGroup");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("HiGroup");
    await chatsInputFirstUser.typeMessageOnInput("test");
    await chatsInputFirstUser.clearInputBar();

    // Validate text from message sent to the group
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("HiGroup");
  });

  it("Group Chat - User B receives the message in group chat", async () => {
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.goToSidebarGroupChat("Test");
    await chatsMessagesSecondUser.waitForReceivingMessage("HiGroup");
  });

  it("Sidebar - Search string matching username and group and go to first result", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.goToFiles();
    await filesScreenFirstUser.filesBody.waitForExist();
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

    await sidebarSearchFirstUser.clickOnUserResultFromSidebarSearch(0);
    await chatsTopbarFirstUser.topbar.waitForExist();
    await expect(chatsTopbarFirstUser.topbarUserNameValue).toHaveTextContaining(
      "ChatUserB"
    );
  });

  it("Sidebar - Search Bar - Search for a string matching a single group chat", async () => {
    await chatsTopbarFirstUser.goToFiles();
    await filesScreenFirstUser.filesBody.waitForExist();
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("Te");
    const searchResults =
      await sidebarSearchFirstUser.getSidebarSearchResultsGroupsMatchingName();
    await expect(searchResults).toEqual(["Test"]);
    await chatsSidebarFirstUser.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Not matching results and then redirect to a group", async () => {
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("z");
    await chatsSidebarFirstUser.clearSidebarSearchInput();
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("Te");
    await sidebarSearchFirstUser.clickOnGroupResultFromSidebarSearch(0);
    await chatsTopbarSecondUser.topbar.waitForExist();
    await expect(
      chatsTopbarSecondUser.topbarUserNameValue
    ).toHaveTextContaining("Test");
  });
}
