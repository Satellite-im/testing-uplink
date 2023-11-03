import "module-alias/register";
import EditGroup from "@screenobjects/chats/EditGroup";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let editGroupFirstUser = new EditGroup(USER_A_INSTANCE);

export default async function groupChatEditTestsUserA() {
  it("Chat User A - Edit Group Chat button tooltip", async () => {
    // Hover on edit group chat button and validate tooltip is shown
    await chatsTopbarFirstUser.hoverOnEditGroupButton();

    const tooltipText = await chatsTopbarFirstUser.topbarEditGroupTooltipText;
    await expect(tooltipText).toHaveTextContaining("Edit Group");
  });

  it("Chat User A - Click on Edit Group Chat and close modal", async () => {
    // Open modal to edit group chat
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.validateEditGroupIsShown();
    await chatsTopbarFirstUser.editGroup();
  });

  it("Edit Group - Group Name Edit - Contents displayed", async () => {
    // Open edit group modal. Validate contents displayed
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.validateEditGroupIsShown();

    await editGroupFirstUser.groupNameInput.waitForExist();
    await editGroupFirstUser.userInput.waitForExist();
  });

  it("Edit Group - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    // Type on group name input an invalid name and validate error message
    await editGroupFirstUser.typeOnGroupNameInput("@");
    await editGroupFirstUser.groupNameInputError.waitForExist();

    const inputErrorText = await editGroupFirstUser.groupNameInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): @",
    );

    await editGroupFirstUser.clearGroupNameInput();
  });

  // Skipping test due to input issue changing the cursor to a different input field
  xit("Edit Group - Attempt to change Group Name for a name with more than 64 characters", async () => {
    // Type on group name input a name with more than 64 characters and validate error message
    await editGroupFirstUser.clickOnGroupNameInput();
    await editGroupFirstUser.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678",
    );

    // Validate error message
    await editGroupFirstUser.groupNameInputError.waitForExist();
    const inputErrorText = await editGroupFirstUser.groupNameInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 64 characters exceeded.",
    );
    await editGroupFirstUser.clearGroupNameInput();
  });

  it("Edit Group - Change Group Name for a valid name", async () => {
    // Type on group name input a valid name and validate group name is changed correctly
    await editGroupFirstUser.typeOnGroupNameInput("X");
    await chatsTopbarFirstUser.editGroup();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");

    // Validate group name was changed correctly on local side
    const topbarFirstUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveTextContaining("X");
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
  });

  it("Edit Group - Contents displayed in add list are correct", async () => {
    // Open edit group modal. Validate contents displayed in add list are correct
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.validateEditGroupIsShown();
    await editGroupFirstUser.clickOnAddMembers();
    await editGroupFirstUser.validateNothingHereIsDisplayed();
  });

  it("Edit Group - Contents displayed in remove list are correct", async () => {
    // Validate contents displayed in remove list are correct
    await editGroupFirstUser.clickOnCurrentMembers();
    const currentList = await editGroupFirstUser.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Edit Group - Look for non existing user in Remove Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await editGroupFirstUser.typeOnSearchUserInput("z");
    await editGroupFirstUser.validateNothingHereIsDisplayed();
    await editGroupFirstUser.clearSearchUserInput();
  });

  it("Edit Group - Remove someone from the group", async () => {
    // Type on search user input a valid user and then remove it from the group
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.clickOnFirstRemoveButton();
    await editGroupFirstUser.validateNothingHereIsDisplayed();
    await chatsTopbarFirstUser.editGroup();
    await chatsTopbarFirstUser.validateTopbarExists();

    const topbarUserStatus = chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (1)");
  });

  it("Edit Group - Add Users List - Chat User B appears now in list", async () => {
    // Open edit group modal. Validate contents displayed in add list are correct
    await chatsTopbarFirstUser.editGroup();
    await editGroupFirstUser.validateEditGroupIsShown();
    await editGroupFirstUser.clickOnAddMembers();
    const currentList = await editGroupFirstUser.getParticipantsList();
    await expect(currentList).toEqual(["ChatUserB"]);
  });

  it("Edit Group - Look for non existing user in Add Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await editGroupFirstUser.typeOnSearchUserInput("z");
    await editGroupFirstUser.validateNothingHereIsDisplayed();
    await editGroupFirstUser.clearSearchUserInput();
  });

  it("Edit Group - Add someone to the group - Add Chat User B again", async () => {
    // Type on search user input a valid user and then add it to the group
    await editGroupFirstUser.typeOnSearchUserInput("ChatUserB");
    await editGroupFirstUser.clickOnFirstAddButton();
    await editGroupFirstUser.validateNothingHereIsDisplayed();
    await chatsTopbarFirstUser.editGroup();
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });
}
