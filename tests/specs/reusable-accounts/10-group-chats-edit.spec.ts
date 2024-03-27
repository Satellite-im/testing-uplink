require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import GroupSettings from "@screenobjects/chats/GroupSettings";
import ManageMembers from "@screenobjects/chats/ManageMembers";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import {
  activateFirstApplication,
  activateSecondApplication,
  grabCacheFolder,
  resetAndLoginWithCacheFirstApp,
  resetAndLoginWithCacheSecondApp,
} from "@helpers/commands";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";

describe("MacOS Chats - Group Chats Edit Tests", function () {
  this.retries(2);

  before(async () => {
    await resetAndLoginWithCacheSecondApp("ChatUserB");
    await CreatePinScreen.loginWithTestUser();
    await resetAndLoginWithCacheFirstApp("ChatUserA");
    await CreatePinScreen.loginWithTestUser();
  });

  it("Group Chat Creator - Manage Members button tooltip", async () => {
    // Hover on Manage Members button and validate tooltip is shown
    await Topbar.hoverOnManageMembersButton();

    const tooltipText = await Topbar.topbarManageMembersTooltipText;
    await expect(tooltipText).toHaveText("Manage Members");
  });

  it("Group Chat Creator - Click on Manage Members, validate contents and close modal", async () => {
    // Open modal for Manage Members
    await Topbar.openManageMembers();
    await ManageMembers.validateManageMembersIsShown();
    await ManageMembers.validateManageMembersUserInputIsShown();

    // Close Manage Members modal
    await Topbar.exitManageMembers();
    await ChatsSidebar.validateNoModalIsOpen();
  });

  it("Group Chat Creator - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    // Type on group name input an invalid name and validate error message
    await Topbar.openNameContextMenu();
    await Topbar.selectRenameGroup();
    await Topbar.typeOnGroupNameInput("@");
    await Topbar.validateGroupNameInputErrorIsShown();

    const inputErrorText = await Topbar.groupNameInputErrorText;
    await expect(inputErrorText).toHaveText("Not allowed character(s): @");
    await Topbar.clearGroupNameInput();
  });

  it("Group Chat Creator - Attempt to change Group Name for a name with more than 64 characters", async () => {
    // Type on group name input a name with more than 64 characters and validate error message
    await Topbar.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678",
    );

    // Validate error message
    await Topbar.validateGroupNameInputErrorIsShown();
    const inputErrorText = await Topbar.groupNameInputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 64 characters exceeded.",
    );
    await Topbar.clearGroupNameInput();
  });

  it("Group Chat Creator - Change Group Name for a valid name", async () => {
    // Type on group name input a valid name and validate group name is changed correctly
    await Topbar.typeOnGroupNameInput("X");
    await Topbar.closeGroupNameInput();
    await ChatsSidebar.waitForGroupToBeCreated("X");

    // Validate group name was changed correctly on local side
    const topbarFirstUserName = await Topbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveText("X");
    await ChatsSidebar.waitForGroupToBeCreated("X");
  });

  it("Group Chat Invited User - Validate group name was changed correctly on remote side", async () => {
    // Switch control to second user
    await activateSecondApplication();

    // Validate group name was changed correctly on remote side
    await ChatsSidebar.waitForGroupToBeCreated("X");
    const topbarFirstUserName = await Topbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveText("X");
  });

  it("Group Chat Creator - Contents displayed in add list are correct", async () => {
    // Switch control to first user and then open Manage Members modal. Validate contents displayed in add list are correct
    await activateFirstApplication();

    await Topbar.openManageMembers();
    await ManageMembers.validateManageMembersIsShown();
    await ManageMembers.clickOnAddMembers();
    await ManageMembers.validateNothingHereIsDisplayed();
  });

  it("Group Chat Creator - Contents displayed in remove list are correct", async () => {
    // Validate contents displayed in remove list are correct
    await ManageMembers.clickOnCurrentMembers();
    const currentList = await ManageMembers.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Group Chat Creator - Look for non existing user in Remove Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await ManageMembers.typeOnSearchUserInput("z");
    await ManageMembers.validateNothingHereIsDisplayed();
    await ManageMembers.clearSearchUserInput();
  });

  it("Group Chat Creator - Remove someone from the group", async () => {
    // Type on search user input a valid user and then remove it from the group
    await ManageMembers.typeOnSearchUserInput("ChatUserB");
    await ManageMembers.clickOnFirstRemoveButton();

    await ManageMembers.validateNothingHereIsDisplayed();
    await Topbar.exitManageMembers();

    await ChatsSidebar.validateNoModalIsOpen();
    await Topbar.validateTopbarExists();

    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (1)");
  });

  it("Group Chat Invited User - Validate remote user was correctly removed from the group chat", async () => {
    // Validate that remote user was removed from the group correctly
    await activateSecondApplication();
    await ChatsSidebar.waitForGroupToBeDeleted("X");
    await WelcomeScreen.validateWelcomeScreenIsShown(30000);
  });

  it("Group Chat Creator - Add Users List - Chat User B appears now in list", async () => {
    // Switch control to first user and then open Manage Members modal. Validate contents displayed in add list are correct
    await activateFirstApplication();
    await Topbar.openManageMembers();
    await ManageMembers.validateManageMembersIsShown();
    await ManageMembers.clickOnAddMembers();
    const currentList = await ManageMembers.getParticipantsList();
    await expect(currentList).toEqual(["ChatUserB"]);
  });

  it("Group Chat Creator - Look for non existing user in Add Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await ManageMembers.typeOnSearchUserInput("z");
    await ManageMembers.validateNothingHereIsDisplayed();
    await ManageMembers.clearSearchUserInput();
  });

  it("Group Chat Creator - Add someone to the group - Add Chat User B again", async () => {
    // Type on search user input a valid user and then add it to the group
    await ManageMembers.typeOnSearchUserInput("ChatUserB");
    await ManageMembers.clickOnFirstAddButton();

    await ManageMembers.validateNothingHereIsDisplayed();
    await Topbar.exitManageMembers();

    await ChatsSidebar.validateNoModalIsOpen();
    await Topbar.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("Group Chat Invited User - Ensure that Chat User B was added back to the group", async () => {
    // Validate that User B was added back to the group chat
    await activateSecondApplication();
    await ChatsSidebar.goToFiles();
    await FilesScreen.validateFilesScreenIsShown();
    await FilesScreen.goToMainScreen();
    await ChatsSidebar.validateSidebarChatsIsShown();
    await ChatsSidebar.waitForGroupToBeCreated("X");
    await ChatsSidebar.goToSidebarGroupChat("X");
    await Topbar.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserStatus = await Topbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveText("Members (2)");
  });

  it("Group Chat Invited User - Manage Members is not displayed by default", async () => {
    // Validate Manage Members is not shown by default on invited user
    await Topbar.validateManageMembersButtonIsNotShown();
  });

  it("Group Chat Creator - Can add permissions to invited users to change name and add/remove users", async () => {
    // Open Manage Members modal and validate that invited user has permissions to change name and add/remove users
    await activateFirstApplication();
    await Topbar.openGroupSettings();
    await GroupSettings.validateGroupSettingsIsShown();
    await GroupSettings.clickOnAllowMembersToAddOthersSwitch();
    await GroupSettings.clickOnAllowMembersToAddEditNameSwitch();
    await Topbar.exitGroupSettings();
  });

  it("Group Chat Invited User - Manage Members is displayed after enabling allow to add users", async () => {
    // Validate that User B was added back to the group chat
    await activateSecondApplication();

    // Validate Manage Members is visible on invited user now
    await Topbar.openManageMembers();
    await ManageMembers.validateManageMembersIsShown();
    await ManageMembers.validateManageMembersUserInputIsShown();

    // Close Manage Members modal
    await Topbar.exitManageMembers();
    await ChatsSidebar.validateNoModalIsOpen();
  });

  it("Group Chat Invited User - Can rename group after enabling allow to rename group", async () => {
    // Open Context Menu to Rename Group
    await Topbar.openNameContextMenu();
    await Topbar.selectRenameGroup();

    // Type on group name input a valid name and validate group name is changed correctly
    await Topbar.typeOnGroupNameInput("renamed");
    await Topbar.closeGroupNameInput();
    await ChatsSidebar.waitForGroupToBeCreated("renamed");

    // Validate group name was changed correctly on local side
    const topbarFirstUserName = await Topbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveText("renamed");
    await ChatsSidebar.waitForGroupToBeCreated("renamed");
  });

  it("Group Chat Creator - Validate group name was changed correctly on remote side", async () => {
    // Switch control to first user
    await activateFirstApplication();

    // Validate group name was changed correctly on group creator side
    await ChatsSidebar.waitForGroupToBeCreated("renamed");
    const topbarFirstUserName = await Topbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveText("renamed");
  });

  after(async () => {
    await grabCacheFolder("ChatUserA");
    await grabCacheFolder("ChatUserB", "/.uplinkUserB");
  });
});
