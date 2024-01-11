require("module-alias/register");
import EditGroup from "@screenobjects/chats/EditGroup";
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
const editGroup = new EditGroup();
const filesScreen = new FilesScreen();
const welcomeScreen = new WelcomeScreen();

export default async function groupChatEditTests() {
  it("Chat User A - Edit Group Chat button tooltip", async () => {
    // Hover on edit group chat button and validate tooltip is shown
    await chatsTopbar.hoverOnEditGroupButton();

    const tooltipText = await chatsTopbar.topbarEditGroupTooltipText;
    await expect(tooltipText).toHaveTextContaining("Edit Group");
  });

  it("Chat User A - Click on Edit Group Chat and close modal", async () => {
    // Open modal to edit group chat
    await chatsTopbar.openEditGroup();
    await editGroup.validateEditGroupIsShown();
    await chatsTopbar.exitEditGroup();
  });

  it("Edit Group - Group Name Edit - Contents displayed", async () => {
    // Open edit group modal. Validate contents displayed
    await chatsTopbar.openEditGroup();
    await editGroup.validateEditGroupIsShown();

    await editGroup.validateEditGroupNameInputIsShown();
    await editGroup.validateEditGroupUserInputIsShown();
  });

  it("Edit Group - Attempt to change Group Name for a name containing non-alphanumeric characters", async () => {
    // Type on group name input an invalid name and validate error message
    await editGroup.typeOnGroupNameInput("@");
    await editGroup.validateEditGroupInputErrorIsShown();

    const inputErrorText = await editGroup.groupNameInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): @",
    );

    await editGroup.clearGroupNameInput();
  });

  it("Edit Group - Attempt to change Group Name for a name with more than 64 characters", async () => {
    // Type on group name input a name with more than 64 characters and validate error message
    await editGroup.clickOnGroupNameInput();
    await editGroup.typeOnGroupNameInput(
      "12345678901234567890123456789012345678901234567890123456789012345678",
    );

    // Validate error message
    await editGroup.validateEditGroupInputErrorIsShown();
    const inputErrorText = await editGroup.groupNameInputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 64 characters exceeded.",
    );
    await editGroup.clearGroupNameInput();
  });

  it("Edit Group - Change Group Name for a valid name", async () => {
    // Type on group name input a valid name and validate group name is changed correctly
    await editGroup.typeOnGroupNameInput("X");
    await chatsTopbar.exitEditGroup();
    await chatsSidebar.waitForGroupToBeCreated("X");

    // Validate group name was changed correctly on local side
    const topbarFirstUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveTextContaining("X");
    await chatsSidebar.waitForGroupToBeCreated("X");
  });

  it("Edit Group - Validate group name was changed correctly on remote side", async () => {
    // Switch control to second user
    await launchSecondApplication();

    // Validate group name was changed correctly on remote side
    await chatsSidebar.waitForGroupToBeCreated("X");
    const topbarFirstUserName = await chatsTopbar.topbarUserNameValue;
    await expect(topbarFirstUserName).toHaveTextContaining("X");
  });

  it("Edit Group - Contents displayed in add list are correct", async () => {
    // Switch control to first user and then open edit group modal. Validate contents displayed in add list are correct
    await launchFirstApplication();

    await chatsTopbar.openEditGroup();
    await editGroup.validateEditGroupIsShown();
    await editGroup.clickOnAddMembers();
    await editGroup.validateNothingHereIsDisplayed();
  });

  it("Edit Group - Contents displayed in remove list are correct", async () => {
    // Validate contents displayed in remove list are correct
    await editGroup.clickOnCurrentMembers();
    const currentList = await editGroup.getParticipantsList();
    const expectedList = ["ChatUserB"];
    await expect(currentList).toEqual(expectedList);
  });

  it("Edit Group - Look for non existing user in Remove Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await editGroup.typeOnSearchUserInput("z");
    await editGroup.validateNothingHereIsDisplayed();
    await editGroup.clearSearchUserInput();
  });

  it("Edit Group - Remove someone from the group", async () => {
    // Type on search user input a valid user and then remove it from the group
    await editGroup.typeOnSearchUserInput("ChatUserB");
    await editGroup.clickOnFirstRemoveButton();
    await editGroup.validateNothingHereIsDisplayed();
    await chatsTopbar.exitEditGroup();
    await chatsTopbar.validateTopbarExists();

    const topbarUserStatus = chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (1)");
  });

  it("Edit Group - Validate remote user was correctly removed from the group chat", async () => {
    // Validate that remote user was removed from the group correctly
    await launchSecondApplication();
    await chatsSidebar.waitForGroupToBeDeleted("X");
    await welcomeScreen.validateWelcomeScreenIsShown();
  });

  it("Edit Group - Add Users List - Chat User B appears now in list", async () => {
    // Switch control to first user and then open edit group modal. Validate contents displayed in add list are correct
    await launchFirstApplication();
    await chatsTopbar.openEditGroup();
    await editGroup.validateEditGroupIsShown();
    await editGroup.clickOnAddMembers();
    const currentList = await editGroup.getParticipantsList();
    await expect(currentList).toEqual(["ChatUserB"]);
  });

  it("Edit Group - Look for non existing user in Add Users List", async () => {
    // Type on search user input a non existing user and validate nothing here is displayed
    await editGroup.typeOnSearchUserInput("z");
    await editGroup.validateNothingHereIsDisplayed();
    await editGroup.clearSearchUserInput();
  });

  it("Edit Group - Add someone to the group - Add Chat User B again", async () => {
    // Type on search user input a valid user and then add it to the group
    await editGroup.typeOnSearchUserInput("ChatUserB");
    await editGroup.clickOnFirstAddButton();
    await editGroup.validateNothingHereIsDisplayed();
    await chatsTopbar.exitEditGroup();
    await chatsTopbar.validateTopbarExists();

    // Validate topbar contents has correct number of participants
    const topbarUserStatus = await chatsTopbar.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });

  it("Edit Group - Ensure that Chat User B was added back to the group", async () => {
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
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
  });
}
