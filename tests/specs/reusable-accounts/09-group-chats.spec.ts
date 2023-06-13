import Messages from "../../screenobjects/chats/Messages";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import CreateGroupChat from "../../screenobjects/chats/CreateGroupChat";
import InputBar from "../../screenobjects/chats/InputBar";
import ParticipantsList from "../../screenobjects/chats/ParticipantsList";
import Topbar from "../../screenobjects/chats/Topbar";
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsLayoutSecondUser = new ChatsLayout("userB");
let chatsInputFirstUser = new InputBar("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessagesSecondUser = new Messages("userB");
let chatsSidebarFirstUser = new ChatsSidebar("userA");
let chatsSidebarSecondUser = new ChatsSidebar("userB");
let chatsTopbarFirstUser = new Topbar("userA");
let chatsTopbarSecondUser = new Topbar("userB");
let createGroupFirstUser = new CreateGroupChat("userA");
let participantsListFirstUser = new ParticipantsList("userA");

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
    await expect(createGroupFirstUser.groupNameInput).toBeDisplayed();
    await expect(createGroupFirstUser.userSearchInput).toBeDisplayed();
    await expect(createGroupFirstUser.friendsList).toBeDisplayed();
    await expect(createGroupFirstUser.createGroupChatButton).toBeDisplayed();
  });

  // Skipping test failing on CI because Appium starts typing in correct field but suddenly jumps to other input field throwing issues
  xit("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    await createGroupFirstUser.typeOnGroupName("&!");
    await createGroupFirstUser.createGroupInputError.waitForDisplayed();
    await createGroupFirstUser.clearGroupNameInput();
  });

  // Skipping test failing on CI because Appium starts typing in correct field but suddenly jumps to other input field throwing issues
  xit("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    await createGroupFirstUser.typeOnGroupName(
      "01234567890123456789012345678901234567890123456789012345678912345"
    );
    await createGroupFirstUser.createGroupInputError.waitForDisplayed();
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
    await createGroupFirstUser.typeOnGroupName("FirstGroup");
    await createGroupFirstUser.typeOnUsersSearchInput("Ch");
    await createGroupFirstUser.selectUserFromList("ChatUserB");
    await createGroupFirstUser.clickOnCreateGroupChat();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("FirstGroup");
  });

  it("Chat User A - Group Chat is displayed on local user sidebar", async () => {
    const statusFromGroup = await chatsSidebarFirstUser.getSidebarGroupStatus(
      "FirstGroup"
    );
    await expect(statusFromGroup).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
    await chatsSidebarFirstUser.goToSidebarGroupChat("FirstGroup");
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.waitForIsShown(true);
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "FirstGroup"
    );
    await chatsSidebarSecondUser.switchToOtherUserWindow();
  });

  it("User B - Group Chat is displayed on remote participant users sidebar", async () => {
    await chatsSidebarSecondUser.waitForGroupToBeCreated("FirstGroup");
    const statusFromGroupOnUserB =
      await chatsSidebarSecondUser.getSidebarGroupStatus("FirstGroup");
    await expect(statusFromGroupOnUserB).toHaveTextContaining(
      "No messages sent yet, send one!"
    );
    await chatsSidebarSecondUser.goToSidebarGroupChat("FirstGroup");
    await chatsLayoutSecondUser.waitForIsShown(true);
    await chatsTopbarSecondUser.waitForIsShown(true);
    await expect(chatsTopbarSecondUser.topbarUserName).toHaveTextContaining(
      "FirstGroup"
    );
    await chatsInputFirstUser.switchToOtherUserWindow();
  });

  it("Group Chat - User A sends a message in group chat", async () => {
    await chatsInputFirstUser.typeMessageOnInput("Hi Group!");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Hi Group!");
    await chatsMessagesSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingMessage("Hi Group!");
  });

  // One validation is skipped since header states a wrong number of participants in list (1 PARTICIPANT instead of 2 PARTICIPANTS)
  it("Group Chat - Show participants list - Contents", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.clickOnTopbar();
    await participantsListFirstUser.waitForIsShown(true);
    await participantsListFirstUser.participantsUserInput.waitForDisplayed();
    const currentList = await participantsListFirstUser.getPartipantsList();
    const expectedList = ["ChatUserA", "ChatUserB"];
    await expect(currentList).toEqual(expectedList);
    /*await expect(
      participantsListFirstUser.numberOfParticipantsHeader
    ).toHaveTextContaining("2 PARTICIPANTS");*/
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
