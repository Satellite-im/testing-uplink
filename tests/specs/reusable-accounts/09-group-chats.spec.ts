import Messages from "../../screenobjects/chats/Messages";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import CreateGroupChat from "../../screenobjects/chats/CreateGroupChat";
import InputBar from "../../screenobjects/chats/InputBar";
import ParticipantsList from "../../screenobjects/chats/ParticipantsList";
import Topbar from "../../screenobjects/chats/Topbar";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsLayoutSecondUser = new ChatsLayout(USER_B_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsSidebarSecondUser = new ChatsSidebar(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let createGroupFirstUser = new CreateGroupChat(USER_A_INSTANCE);
let participantsListFirstUser = new ParticipantsList(USER_A_INSTANCE);

export default async function groupChatTests() {
  it("Chat User A - Create Group Chat button tooltip", async () => {
    await chatsSidebarFirstUser.hoverOnCreateGroupButton();
    await chatsSidebarFirstUser.sidebarCreateGroupChatTooltip.waitForDisplayed();
  });

  it("Chat User A - Click on Create Group Chat and close modal", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForDisplayed();

    // Click again on create group chat and modal will be closed
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Create Group Chat Modal contents", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForDisplayed();

    // Validate contents
    await createGroupFirstUser.groupNameInput.waitForDisplayed();
    await createGroupFirstUser.userSearchInput.waitForDisplayed();
    await createGroupFirstUser.friendsList.waitForDisplayed();
    await createGroupFirstUser.createGroupChatButton.waitForDisplayed();
  });

  it("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    await createGroupFirstUser.typeOnGroupName("@");
    await expect(
      createGroupFirstUser.createGroupInputErrorText
    ).toHaveTextContaining("Only alphanumeric characters are accepted.");
    await createGroupFirstUser.createGroupInputError.waitForDisplayed();
    await createGroupFirstUser.clearGroupNameInput();
  });

  // Skipping test that sometimes fail in CI because Appium randomly jumps when typing into a different input field
  xit("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    await createGroupFirstUser.typeLongerTextInGroupName();
    await createGroupFirstUser.createGroupInputError.waitForDisplayed();
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
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.waitForIsShown(true);
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "Test"
    );
    await expect(chatsTopbarFirstUser.topbarUserStatus).toHaveTextContaining(
      "Members (2)"
    );
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
    await chatsLayoutSecondUser.waitForIsShown(true);
    await chatsTopbarSecondUser.waitForIsShown(true);
    await expect(chatsTopbarSecondUser.topbarUserName).toHaveTextContaining(
      "Test"
    );
    await expect(chatsTopbarSecondUser.topbarUserStatus).toHaveTextContaining(
      "Members (2)"
    );
    await chatsSidebarSecondUser.goToSidebarChat("ChatUserA");
    await chatsLayoutSecondUser.waitForIsShown(true);
  });

  it("Group Chat - User A sends a message in group chat", async () => {
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.typeMessageOnInput("HiGroup");
    await chatsInputFirstUser.clickOnSendMessage();
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

  it("Sidebar - Return to conversation with ChatUserB", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsSidebarFirstUser.goToSidebarChat("ChatUserB");
    await chatsTopbarFirstUser.topbar.waitForDisplayed();
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "ChatUserB"
    );
  });

  it("Sidebar - Search Bar - Search for a string matching a single username", async () => {
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("Chat");
    const searchResults = await chatsSidebarFirstUser.getSidebarSearchResults();
    await expect(searchResults).toEqual(["ChatUserB"]);
    await chatsSidebarFirstUser.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Search for a string matching a single group chat", async () => {
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("Test");
    const searchResults = await chatsSidebarFirstUser.getSidebarSearchResults();
    await expect(searchResults).toEqual(["Test"]);
    await chatsSidebarFirstUser.clearSidebarSearchInput();
  });

  // Skipped since it is a pending test to add
  xit("Sidebar - Search Bar - Search for a string matching both username and group chat", async () => {});

  xit("Sidebar - Search Bar - Search for a string not matching any result", async () => {
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("z");
    await chatsSidebarFirstUser.validateSidebarSearchResultsIsEmpty();
    await chatsSidebarFirstUser.clearSidebarSearchInput();
  });

  it("Sidebar - Search Bar - Search bar result will redirect to the Chat Conversation", async () => {
    await chatsSidebarFirstUser.typeOnSidebarSearchInput("ChatUserB");
    await chatsSidebarFirstUser.sidebarSearchDropdown.waitForDisplayed();
    await chatsSidebarFirstUser.clickOnResultFromSidebarSearch("ChatUserB");
  });

  it("Group Chat - Show participants list - Contents", async () => {
    await chatsTopbarFirstUser.clickOnTopbar();
    await participantsListFirstUser.waitForIsShown(true);
    await participantsListFirstUser.participantsUserInput.waitForDisplayed();
    const currentList = await participantsListFirstUser.getPartipantsList();
    const expectedList = ["ChatUserA", "ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Group Chat - Show participants list - Search bar - Valid input", async () => {
    await participantsListFirstUser.typeOnParticipantsUserInput("ChatUserB");
    const currentList = await participantsListFirstUser.getPartipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
    await participantsListFirstUser.clearParticipantsUserInput();
  });

  it("Group Chat - Show participants list - Search bar - Non existing user on input", async () => {
    await participantsListFirstUser.typeOnParticipantsUserInput("z");
    const currentList = await participantsListFirstUser.getPartipantsList();
    await expect(currentList).toEqual([]);
    await participantsListFirstUser.clearParticipantsUserInput();
    await chatsTopbarFirstUser.clickOnTopbar();
    await chatsLayoutFirstUser.waitForIsShown(true);
  });
}
