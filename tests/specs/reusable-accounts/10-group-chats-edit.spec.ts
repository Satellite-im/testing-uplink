require("module-alias/register");
import ManageMembers from "@screenobjects/chats/ManageMembers";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import {
  launchFirstApplication,
  launchSecondApplication,
} from "@helpers/commands";
const chatsSidebar = new ChatsSidebar();
const chatsTopbar = new Topbar();
const manageMembers = new ManageMembers();
const filesScreen = new FilesScreen();
const welcomeScreen = new WelcomeScreen();

export default async function groupChatEditTests() {
  it("Group Chat Creator - Manage Members button tooltip", async () => {
    // Hover on Manage Members button and validate tooltip is shown
    await chatsTopbar.hoverOnManageMembersButton();

    const tooltipText = await chatsTopbar.topbarManageMembersTooltipText;
    await expect(tooltipText).toHaveText("Manage Members");
  });

  it("Group Chat Creator - Click on Manage Members, validate contents and close modal", async () => {
    // Open modal for Manage Members
    await chatsTopbar.openManageMembers();
    await manageMembers.validateManageMembersIsShown();
    await manageMembers.validateManageMembersUserInputIsShown();

    // Close Manage Members modal
    await chatsTopbar.exitManageMembers();
    await chatsSidebar.validateNoModalIsOpen();
  });

  it("Group Chat Creator - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    // Type on group name input an invalid name and validate error message
    await chatsTopbar.openNameContextMenu();
    await chatsTopbar.selectRenameGroup();
    await chatsTopbar.typeOnGroupNameInput("@");
    await chatsTopbar.validateGroupNameInputErrorIsShown();

    const inputErrorText = await chatsTopbar.groupNameInputErrorText;
    await expect(inputErrorText).toHaveText("Not allowed character(s): @");
    await chatsTopbar.clearGroupNameInput();
  });

  it("Group Chat Creator - Attempt to change Group Name for a name with more than 64 characters", async () => {
    // Type on group name input a name with more than 64 characters and validate error message
    await chatsTopbar.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678",
    );

    // Validate error message
    await chatsTopbar.validateGroupNameInputErrorIsShown();
    const inputErrorText = await chatsTopbar.groupNameInputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 64 characters exceeded.",
    );
    await chatsTopbar.clearGroupNameInput();
  });

  it("Group Chat Creator - Change Group Name for a valid name", async () => {
    // Type on group name input a valid name and validate group name is changed correctly
    await chatsTopbar.typeOnGroupNameInput("X");
    await chatsTopbar.closeGroupNameInput();
    await chatsSidebar.waitForGroupToBeCreated("X");

    // Validate group name was changed correctly on local side
    const topbarFirstUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveText("X");
    await chatsSidebar.waitForGroupToBeCreated("X");
  });

  it("Group Chat Invited User - Validate group name was changed correctly on remote side", async () => {
    // Switch control to second user
    await launchSecondApplication();

    // Validate group name was changed correctly on remote side
    await chatsSidebar.waitForGroupToBeCreated("X");
    const topbarFirstUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveText("X");
  });

  it("Group Chat Creator - Contents displayed in add list are correct", async () => {
    // Switch control to first user and then open Manage Members modal. Validate contents displayed in add list are correct
    await launchFirstApplication();

    await chatsTopbar.openManageMembers();
    await manageMembers.validateManageMembersIsShown();
    await manageMembers.clickOnAddMembers();
    await manageMembers.validateNothingHereIsDisplayed();
  });

  it("Group Chat Creator - Contents displayed in remove list are correct", async () => {
    // Validate contents displayed in remove list are correct
    await manageMembers.clickOnCurrentMembers();
    const currentList = await manageMembers.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Group Chat Creator - Look for non existing user in Remove Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await manageMembers.typeOnSearchUserInput("z");
    await manageMembers.validateNothingHereIsDisplayed();
    await manageMembers.clearSearchUserInput();
  });

  it("Group Chat Creator - Remove someone from the group", async () => {
    // Type on search user input a valid user and then remove it from the group
    await manageMembers.typeOnSearchUserInput("ChatUserB");
    await manageMembers.clickOnFirstRemoveButton();
    await manageMembers.validateNothingHereIsDisplayed();

    // Close Manage Members modal
    await chatsTopbar.exitManageMembers();
    await chatsSidebar.validateNoModalIsOpen();
    await chatsTopbar.validateTopbarExists();

    const topbarUserStatus = chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (1)");
  });

  it("Group Chat Invited User - Validate remote user was correctly removed from the group chat", async () => {
    // Validate that remote user was removed from the group correctly
    await launchSecondApplication();
    await chatsSidebar.waitForGroupToBeDeleted("X");
    await welcomeScreen.validateWelcomeScreenIsShown();
  });

  it("Group Chat Creator - Add Users List - Chat User B appears now in list", async () => {
    // Switch control to first user and then open Manage Members modal. Validate contents displayed in add list are correct
    await launchFirstApplication();
    await chatsTopbar.openManageMembers();
    await manageMembers.validateManageMembersIsShown();
    await manageMembers.clickOnAddMembers();
    const currentList = await manageMembers.getParticipantsList();
    await expect(currentList).toEqual(["ChatUserB"]);
  });

  it("Group Chat Creator - Look for non existing user in Add Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await manageMembers.typeOnSearchUserInput("z");
    await manageMembers.validateNothingHereIsDisplayed();
    await manageMembers.clearSearchUserInput();
  });

  it("Group Chat Creator - Add someone to the group - Add Chat User B again", async () => {
    // Type on search user input a valid user and then add it to the group
    await manageMembers.typeOnSearchUserInput("ChatUserB");
    await manageMembers.clickOnFirstAddButton();
    await manageMembers.validateNothingHereIsDisplayed();

    // Close Manage Members modal
    await chatsTopbar.exitManageMembers();
    await chatsSidebar.validateNoModalIsOpen();
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("Group Chat Invited User - Ensure that Chat User B was added back to the group", async () => {
    // Validate that User B was added back to the group chat
    await launchSecondApplication();
    await chatsSidebar.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await filesScreen.goToMainScreen();
    await chatsSidebar.validateSidebarChatsIsShown();
    await chatsSidebar.waitForGroupToBeCreated("X");
    await chatsSidebar.goToSidebarGroupChat("X");
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserStatus = await chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });
}
