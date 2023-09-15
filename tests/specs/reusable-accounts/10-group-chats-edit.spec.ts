import "module-alias/register";
import EditGroup from "@screenobjects/chats/EditGroup";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsSidebarSecondUser = new ChatsSidebar(USER_B_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let editGroupFirstUser = new EditGroup(USER_A_INSTANCE);
let filesScreenSecondUser = new FilesScreen(USER_B_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

export default async function groupChatEditTests() {
  it("Chat User A - Edit Group Chat button tooltip", async () => {
    await chatsTopbarFirstUser.hoverOnEditGroupButton();
    await chatsTopbarFirstUser.topbarEditGroupTooltip.waitForExist();
    await expect(
      chatsTopbarFirstUser.topbarEditGroupTooltipText
    ).toHaveTextContaining("Edit Group");
  });

  it("Chat User A - Click on Edit Group Chat and close modal", async () => {
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.editGroupSection.waitForExist();
    await chatsTopbarFirstUser.editGroup();
  });

  it("Chat User B - You are not the group creator tooltip is displayed", async () => {
    await chatsTopbarSecondUser.switchToOtherUserWindow();
    await chatsTopbarSecondUser.hoverOnEditGroupButton();
    await chatsTopbarSecondUser.viewGroupTooltip.waitForExist();
    await expect(
      chatsTopbarSecondUser.viewGroupTooltipText
    ).toHaveTextContaining("View Group");
  });

  it("Edit Group - Group Name Edit - Contents displayed", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.editGroupSection.waitForExist();
    await editGroupFirstUser.groupNameInput.waitForExist();
    await editGroupFirstUser.userInput.waitForExist();
  });

  it("Edit Group - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    await editGroupFirstUser.typeOnGroupNameInput("@");
    await editGroupFirstUser.groupNameInputError.waitForExist();
    await expect(
      editGroupFirstUser.groupNameInputErrorText
    ).toHaveTextContaining("Not allowed character(s): @");
    await editGroupFirstUser.clearGroupNameInput();
  });

  // Skipping test due to input issue changing the cursor to a different input field
  xit("Edit Group - Attempt to change Group Name for a name with more than 64 characters", async () => {
    await editGroupFirstUser.groupNameInput.click();
    await editGroupFirstUser.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678"
    );
    await editGroupFirstUser.groupNameInputError.waitForExist();
    await expect(
      editGroupFirstUser.groupNameInputErrorText
    ).toHaveTextContaining("Maximum of 64 characters exceeded.");
    await editGroupFirstUser.clearGroupNameInput();
  });

  it("Edit Group - Change Group Name for a valid name", async () => {
    await editGroupFirstUser.typeOnGroupNameInput("X");
    await chatsTopbarFirstUser.editGroup();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    await expect(chatsTopbarFirstUser.topbarUserNameValue).toHaveTextContaining(
      "X"
    );
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");

    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.waitForGroupToBeCreated("X");
    await expect(
      chatsTopbarSecondUser.topbarUserNameValue
    ).toHaveTextContaining("X");
  });

  it("Edit Group - Contents displayed in add list are correct", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.editGroupSection.waitForExist();
    await editGroupFirstUser.clickOnAddMembers();
    await editGroupFirstUser.nothingHereText.waitForExist();
  });

  it("Edit Group - Contents displayed in remove list are correct", async () => {
    await editGroupFirstUser.clickOnCurrentMembers();
    const currentList = await editGroupFirstUser.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
    const indicatorOnlineUserB =
      await editGroupFirstUser.getParticipantIndicatorOnline("ChatUserB");
    await indicatorOnlineUserB.waitForExist();
  });

  it("Edit Group - Look for non existing user in Remove Users List", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("z");
    await editGroupFirstUser.nothingHereText.waitForExist();
    await editGroupFirstUser.clearSearchUserInput();
  });

  it("Edit Group - Remove someone from the group", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.selectUserFromList("ChatUserB");
    await editGroupFirstUser.clickOnFirstRemoveButton();
    await editGroupFirstUser.nothingHereText.waitForExist();
    await chatsTopbarFirstUser.editGroup();
    await chatsTopbarFirstUser.topbar.waitForExist();
    await expect(
      chatsTopbarFirstUser.topbarUserStatusValue
    ).toHaveTextContaining("Members (1)");

    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.waitForGroupToBeDeleted("X");
    await welcomeScreenSecondUser.welcomeLayout.waitForExist();
  });

  it("Edit Group - Add Users List - Chat User B appears now in list", async () => {
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.editGroupSection.waitForExist();
    await editGroupFirstUser.clickOnAddMembers();
    const currentList = await editGroupFirstUser.getParticipantsList();
    await expect(currentList).toEqual(["ChatUserB"]);
  });

  it("Edit Group - Look for non existing user in Add Users List", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("z");
    await editGroupFirstUser.nothingHereText.waitForExist();
    await editGroupFirstUser.clearSearchUserInput();
  });

  it("Edit Group - Add someone to the group - Add Chat User B again", async () => {
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.selectUserFromList("ChatUserB");
    await editGroupFirstUser.clickOnFirstAddButton();
    await editGroupFirstUser.nothingHereText.waitForExist();
    await chatsTopbarFirstUser.editGroup();
    await chatsTopbarFirstUser.topbar.waitForExist();
    await expect(
      chatsTopbarFirstUser.topbarUserStatusValue
    ).toHaveTextContaining("Members (2)");
  });

  it("Edit Group - Ensure that Chat User B was added back to the group", async () => {
    await chatsSidebarSecondUser.switchToOtherUserWindow();
    await chatsSidebarSecondUser.goToFiles();
    await filesScreenSecondUser.filesBody.waitForExist();
    await filesScreenSecondUser.goToMainScreen();
    await chatsSidebarSecondUser.sidebarChatsSection.waitForExist();
    await chatsSidebarSecondUser.waitForGroupToBeCreated("X");
    await chatsSidebarSecondUser.goToSidebarGroupChat("X");
    await chatsTopbarSecondUser.topbar.waitForExist();
    await expect(
      chatsTopbarSecondUser.topbarUserNameValue
    ).toHaveTextContaining("X");
  });
}
