import "module-alias/register";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function groupChatEditTestsUserB() {
  it("Chat User B - You are not the group creator tooltip is displayed", async () => {
    // Validate tooltip is shown
    await chatsTopbarFirstUser.hoverOnEditGroupButton();

    const tooltipText = await chatsTopbarFirstUser.viewGroupTooltipText;
    await expect(tooltipText).toHaveTextContaining("View Group");
  });

  it("Edit Group - Validate group name was changed correctly on remote side", async () => {
    // Validate group name was changed correctly on remote side
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    const topbarSecondUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarSecondUserName).toHaveTextContaining("X");
  });

  it("Edit Group - Validate remote user was correctly removed from the group chat", async () => {
    // Validate that remote user was removed from the group correctly
    await chatsSidebarFirstUser.waitForGroupToBeDeleted("X");
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
  });

  it("Edit Group - Ensure that Chat User B was added back to the group", async () => {
    // Validate that User B was added back to the group chat
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
