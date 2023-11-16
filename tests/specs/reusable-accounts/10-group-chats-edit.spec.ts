import "module-alias/register";
import EditGroup from "@screenobjects/chats/EditGroup";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
import {
  activateFirstApplication,
  activateSecondApplication,
} from "@helpers/commands";
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let editGroupFirstUser = new EditGroup(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function groupChatEditTests() {
  it("Chat User A - Edit Group Chat button tooltip", async () => {
    // Hover on edit group chat button and validate tooltip is shown
    await chatsTopbarFirstUser.hoverOnEditGroupButton();

    const tooltipText = await chatsTopbarFirstUser.topbarEditGroupTooltipText;
    await expect(tooltipText).toHaveTextContaining("Edit Group");
  });

  it("Chat User A - Click on Edit Group Chat and close modal", async () => {
    // Open modal to edit group chat
    await chatsTopbarFirstUser.openEditGroup();
    await editGroupFirstUser.validateEditGroupIsShown();
    await chatsTopbarFirstUser.exitEditGroup();
  });

  it("Chat User B - You are not the group creator tooltip is displayed", async () => {
    // Switch control to second user and validate tooltip is shown
    await activateSecondApplication();
    await chatsTopbarFirstUser.hoverOnEditGroupButton();

    const tooltipText = await chatsTopbarFirstUser.viewGroupTooltipText;
    await expect(tooltipText).toHaveTextContaining("View Group");
  });

  it("Edit Group - Group Name Edit - Contents displayed", async () => {
    // Switch control to first user and then open edit group modal. Validate contents displayed
    await activateFirstApplication();
    await chatsTopbarFirstUser.openEditGroup();
    await editGroupFirstUser.validateEditGroupIsShown();

    await editGroupFirstUser.validateEditGroupNameInputIsShown();
    await editGroupFirstUser.validateEditGroupUserInputIsShown();
  });

  it("Edit Group - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    // Type on group name input an invalid name and validate error message
    await editGroupFirstUser.typeOnGroupNameInput("@");
    await editGroupFirstUser.validateEditGroupInputErrorIsShown();

    const inputErrorText = await editGroupFirstUser.groupNameInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): @",
    );

    await editGroupFirstUser.clearGroupNameInput();
  });

  it("Edit Group - Attempt to change Group Name for a name with more than 64 characters", async () => {
    // Type on group name input a name with more than 64 characters and validate error message
    await editGroupFirstUser.clickOnGroupNameInput();
    await editGroupFirstUser.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678",
    );

    // Validate error message
    await editGroupFirstUser.validateEditGroupInputErrorIsShown();
    const inputErrorText = await editGroupFirstUser.groupNameInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 64 characters exceeded.",
    );
    await editGroupFirstUser.clearGroupNameInput();
  });

  it("Edit Group - Change Group Name for a valid name", async () => {
    // Type on group name input a valid name and validate group name is changed correctly
    await editGroupFirstUser.typeOnGroupNameInput("X");
    await chatsTopbarFirstUser.exitEditGroup();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");

    // Validate group name was changed correctly on local side
    const topbarFirstUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveTextContaining("X");
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
  });

  it("Edit Group - Validate group name was changed correctly on remote side", async () => {
    // Switch control to second user
    await activateSecondApplication();

    // Validate group name was changed correctly on remote side
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    const topbarFirstUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveTextContaining("X");
  });

  it("Edit Group - Contents displayed in add list are correct", async () => {
    // Switch control to first user and then open edit group modal. Validate contents displayed in add list are correct
    await activateFirstApplication();

    await chatsTopbarFirstUser.openEditGroup();
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
    await chatsTopbarFirstUser.exitEditGroup();
    await chatsTopbarFirstUser.validateTopbarExists();

    const topbarUserStatus = chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (1)");
  });

  it("Edit Group - Validate remote user was correctly removed from the group chat", async () => {
    // Validate that remote user was removed from the group correctly
    await activateSecondApplication();
    await chatsSidebarFirstUser.waitForGroupToBeDeleted("X");
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
  });

  it("Edit Group - Add Users List - Chat User B appears now in list", async () => {
    // Switch control to first user and then open edit group modal. Validate contents displayed in add list are correct
    await activateFirstApplication();
    await chatsTopbarFirstUser.openEditGroup();
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
    await chatsTopbarFirstUser.exitEditGroup();
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });

  it("Edit Group - Ensure that Chat User B was added back to the group", async () => {
    // Validate that User B was added back to the group chat
    await activateSecondApplication();
    await chatsSidebarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await filesScreenFirstUser.goToMainScreen();
    await chatsSidebarFirstUser.validateSidebarChatsIsShown();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    await chatsSidebarFirstUser.goToSidebarGroupChat("X");
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserStatus = await chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });
}
