import EditGroup from "../../screenobjects/chats/EditGroup";
import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import FilesScreen from "../../screenobjects/files/FilesScreen";
import ParticipantsList from "../../screenobjects/chats/ParticipantsList";
import Topbar from "../../screenobjects/chats/Topbar";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsSidebarSecondUser = new ChatsSidebar(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let editGroupFirstUser = new EditGroup(USER_A_INSTANCE);
let filesScreenSecondUser = new FilesScreen(USER_B_INSTANCE);
let participantsListFirstUser = new ParticipantsList(USER_A_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

export default async function groupChatEditTests() {
  it("Chat User A - Edit Group Chat button tooltip", async () => {
    await chatsTopbarFirstUser.hoverOnEditGroupButton();
    await chatsTopbarFirstUser.topbarEditGroupTooltip.waitForDisplayed();
    await expect(
      chatsTopbarFirstUser.topbarEditGroupTooltipText
    ).toHaveTextContaining("Edit Group");
  });

  it("Chat User A - Click on Edit Group Chat and close modal", async () => {
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.editGroupSection.waitForDisplayed({
      reverse: true,
    });
  });

  it("Chat User B - You are not the group creator tooltip is displayed", async () => {
    await chatsTopbarSecondUser.switchToOtherUserWindow();
    await chatsTopbarSecondUser.hoverOnEditGroupButton();
    await chatsTopbarSecondUser.topbarEditGroupTooltip.waitForDisplayed();
    await expect(
      chatsTopbarSecondUser.topbarEditGroupTooltipText
    ).toHaveTextContaining("You're not the group creator");
  });

  it("Edit Group - Group Name Edit - Contents displayed", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.waitForIsShown(true);
    await editGroupFirstUser.groupNameInput.waitForDisplayed();
    await editGroupFirstUser.addParticipantsWithSidebarButton.waitForDisplayed();
    await editGroupFirstUser.removeParticipantsWithSidebarButton.waitForDisplayed();
    await editGroupFirstUser.userInput.waitForDisplayed();
  });

  it("Edit Group - Add and Remove middle buttons are displayed when sidebar is hidden", async () => {
    await editGroupFirstUser.clickOnHamburgerButton();
    await editGroupFirstUser.backButton.waitForDisplayed();
    await editGroupFirstUser.addParticipantsWithoutSidebarButton.waitForDisplayed();
    await editGroupFirstUser.removeParticipantsWithoutSidebarButton.waitForDisplayed();
    await editGroupFirstUser.clickOnBackButton();
    await editGroupFirstUser.hamburgerButton.waitForDisplayed();
  });

  it("Edit Group - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    await editGroupFirstUser.typeOnGroupNameInput("$#");
    await editGroupFirstUser.groupNameInputError.waitForDisplayed();
    await expect(
      editGroupFirstUser.groupNameInputErrorText
    ).toHaveTextContaining("Only alphanumeric characters are accepted");
    await editGroupFirstUser.clearGroupNameInput();
  });

  it("Edit Group - Attempt to change Group Name for a name with more than 64 characters", async () => {
    await editGroupFirstUser.groupNameInput.click();
    await editGroupFirstUser.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678"
    );
    await editGroupFirstUser.groupNameInputError.waitForDisplayed();
    await expect(
      editGroupFirstUser.groupNameInputErrorText
    ).toHaveTextContaining("Maximum of 64 characters exceeded.");
    await editGroupFirstUser.clearGroupNameInput();
  });

  it("Edit Group - Change Group Name for a valid name", async () => {
    await editGroupFirstUser.typeOnGroupNameInput("NewNameGroup");
    await editGroupFirstUser.clickOnGroupNameHeader();
    await chatsTopbarFirstUser.editGroup();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("NewNameGroup");
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "NewNameGroup"
    );
    await chatsSidebarFirstUser.waitForGroupToBeCreated("NewNameGroup");

    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.waitForGroupToBeCreated("NewNameGroup");
    await expect(chatsTopbarSecondUser.topbarUserName).toHaveTextContaining(
      "NewNameGroup"
    );
  });

  it("Edit Group - Contents displayed in add list are correct", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.waitForIsShown(true);
    await editGroupFirstUser.clickOnAddWithSidebarButton();
    const currentList = await editGroupFirstUser.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual([]);
  });

  it("Edit Group - Contents displayed in remove list are correct", async () => {
    await editGroupFirstUser.clickOnRemoveWithSidebarButton();
    const currentList = await editGroupFirstUser.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
    const indicatorOnlineUserB =
      await editGroupFirstUser.getParticipantIndicatorOnline("ChatUserB");
    await indicatorOnlineUserB.waitForDisplayed();
  });

  it("Edit Group - Look for non existing user in Remove Users List", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("z");
    const currentList = await editGroupFirstUser.getParticipantsList();
    await expect(currentList).toEqual([]);
    await editGroupFirstUser.clearSearchUserInput();
  });

  it("Edit Group - Remove someone from the group", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.selectUserFromList("ChatUserB");
    await editGroupFirstUser.clickOnRemoveButtonBelow();
    await editGroupFirstUser.editGroupSection.waitForDisplayed({
      reverse: true,
    });
    await chatsTopbarFirstUser.topbar.waitForDisplayed();
    await expect(chatsTopbarFirstUser.topbarUserStatus).toHaveTextContaining(
      "Members (1)"
    );

    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.waitForGroupToBeDeleted("NewNameGroup");
    await welcomeScreenSecondUser.waitForIsShown(true);
  });

  it("Edit Group - Add Users List - Chat User B appears now in list", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.waitForIsShown(true);
    await editGroupFirstUser.clickOnAddWithSidebarButton();
    const currentList = await editGroupFirstUser.getParticipantsList();
    await expect(currentList).toEqual(["ChatUserB"]);
  });

  it("Edit Group - Look for non existing user in Add Users List", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("z");
    const currentList = await editGroupFirstUser.getParticipantsList();
    await expect(currentList).toEqual([]);
    await editGroupFirstUser.clearSearchUserInput();
  });

  it("Edit Group - Add someone to the group - Add Chat User B again", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.selectUserFromList("ChatUserB");
    await editGroupFirstUser.clickOnAddButtonBelow();
    await editGroupFirstUser.editGroupSection.waitForDisplayed({
      reverse: true,
    });

    await chatsTopbarFirstUser.clickOnTopbar();
    await participantsListFirstUser.waitForIsShown(true);
    await participantsListFirstUser.participantsUserInput.waitForDisplayed();
    const currentList = await participantsListFirstUser.getPartipantsList();
    const expectedList = ["ChatUserA", "ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Edit Group - Ensure that Chat User B was added back to the group", async () => {
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
}
